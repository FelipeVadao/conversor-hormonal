# Conversor Hormonal — Especificação Técnica (as-built)

> Este documento descreve o sistema **como implementado** na v1. Para o documento de definição original (produto/negócio), veja [PROJETO.md](PROJETO.md). Para orientação de desenvolvimento, veja [CLAUDE.md](CLAUDE.md).

## 1. Visão Geral

SPA React + TypeScript, 100% client-side, sem backend. Converte dosagens de compostos hormonais entre unidades:

- **Injetáveis**: mg ↔ ml, dada uma concentração (mg/ml).
- **Orais**: mg desejados → número de comprimidos/cápsulas, dado mg por comprimido.

Sem autenticação, sem persistência de histórico, sem coleta ou envio de dados a servidores.

## 2. Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + Vite 8 |
| Linguagem | TypeScript (`tsc -b` no build) |
| Estilo | Tailwind CSS v4 (`@tailwindcss/vite`), dark mode via classe `.dark` |
| i18n | i18next + react-i18next (`pt-BR`, `en`) |
| Ícones | lucide-react |
| Lint | ESLint (flat config), typescript-eslint |
| Deploy | Vercel (`vercel deploy --prod --scope felipevadaos-projects`) |

Sem router, sem state management externo (apenas `useState`/hooks locais), sem testes automatizados no repositório atual.

## 3. Estrutura de Componentes

```
App.tsx                        — shell: header (logo, título, toggles), tabs, painel
├── Disclaimer.tsx              — aviso fixo (não é modal)
├── LanguageToggle.tsx          — alterna i18n.language entre 'pt-BR' e 'en'
├── ThemeToggle.tsx             — alterna classe `dark` em <html>
├── SegmentedControl<Tab>       — abas Injetável / Oral
└── Panel
    ├── InjectableConverter.tsx
    └── OralConverter.tsx

ui/
├── Banner.tsx        — aviso inline (variants: warning, danger)
├── Button.tsx         — variants: primary (submit), secondary (clear)
├── CornerBrackets.tsx — decoração visual do Panel
├── Input.tsx          — input numérico/texto estilizado
├── Label.tsx
├── Panel.tsx           — card com bordas/cantos
├── SegmentedControl.tsx — genérico, tipado por union de valores
└── Select.tsx
```

## 4. Modelo de Dados

`src/data/compounds.ts` é a fonte única de compostos:

```ts
type CompoundType = 'injectable' | 'oral'

interface Compound {
  id: string
  nameKey: string        // chave i18n do nome técnico
  popularName: string    // nome popular, não traduzido (ex.: "Test E")
  type: CompoundType
  noteKey?: string        // chave i18n de nota de frequência (só injetáveis)
  sideEffectsKey?: string // chave i18n de efeitos colaterais
}
```

- 16 compostos injetáveis (incluindo `custom` — nome livre) + 11 orais (incluindo opção `custom` adicionada manualmente no `<Select>` do OralConverter, mas **não presente no array `compounds`** — ver §8, inconsistência conhecida).
- Adicionar um composto = 1 entrada em `compounds.ts` + chaves correspondentes em `src/i18n/locales/pt-BR.json` e `en.json`.

## 5. Funcionalidades

### 5.1 Conversor de Injetáveis (`InjectableConverter.tsx`)

**Entradas:** composto (select), nome customizado (se `custom`), concentração (mg/ml), direção (`mg→ml` | `ml→mg`), valor de entrada.

**Fórmulas:**
- `mg → ml`: `resultado = valorInformado / concentração`
- `ml → mg`: `resultado = valorInformado × concentração`

**Validação:** botão "Converter" habilitado apenas se `concentração > 0` e `valorInformado > 0` (ambos parseados como float; `NaN`/`≤0` bloqueiam).

**Comportamento:**
- Trocar de direção limpa o valor de entrada e o resultado.
- Trocar composto ou editar concentração/valor limpa o resultado atual (força nova conversão).
- Resultado formatado com até 2 casas decimais, sem zeros à direita (`formatNumber`).
- Ao converter, exibe um ícone de check por 600ms no botão (feedback visual, `justConverted`).
- Se o composto selecionado tiver `noteKey`, mostra `Banner variant="warning"` com nota de frequência.
- Se tiver `sideEffectsKey`, mostra `Banner variant="danger"` com efeitos colaterais.
- Botão "Limpar" (secondary) aparece quando há composto selecionado; reseta todo o formulário.

### 5.2 Conversor de Orais (`OralConverter.tsx`)

**Entradas:** composto (select, com opção `custom`), nome customizado, mg por comprimido, dose desejada (mg).

**Fórmula:** `comprimidos = doseDesejada / mgPorComprimido`

**Validação:** idêntica ao injetável (ambos os valores `> 0`).

**Formatação de resultado (`formatTablets`):**
- Parte fracionária arredondada para o fracionamento comum mais próximo:
  - `[0.20, 0.45)` → ¼
  - `[0.45, 0.55)` → ½
  - `[0.55, 0.80)` → ¾
  - fora dessas faixas → número decimal puro (2 casas)
- Parte inteira exibida junto à fração (ex.: `2 ½ comprimidos`).
- Pluralização de "comprimido"/"comprimidos" via i18n (`results.tablet` / `results.tablets`).

**Comportamento:** mesmos padrões de reset, feedback de conversão e banner de efeitos colaterais do conversor injetável (não há banner de nota de frequência para orais).

### 5.3 Tema (dark/light)

- Detecção inicial **antes do React montar**: script inline em `index.html` lê `localStorage['theme']`; se ausente, usa `prefers-color-scheme` (padrão é dark, a menos que o SO explicitamente prefira light) e aplica a classe `dark` em `<html>` imediatamente (evita flash de tema errado).
- `useTheme.ts` sincroniza o estado React com essa classe e persiste a escolha do usuário em `localStorage['theme']` ao alternar (falha silenciosa em modo privado).

### 5.4 Idioma

- Idioma inicial sempre `pt-BR` (`lng: 'pt-BR'` fixo em `i18n/index.ts`) — **não** persiste escolha entre sessões nem detecta idioma do navegador.
- `LanguageToggle` alterna entre `pt-BR` e `en` via `i18n.changeLanguage`.
- Todo texto visível vem de `src/i18n/locales/{pt-BR,en}.json`; únicas strings hardcoded no código são símbolos de unidade (`mg`, `ml`) e frações Unicode (¼ ½ ¾).

### 5.5 Disclaimer

Componente fixo (não fecha, não é modal) renderizado no topo do conteúdo principal, acima das abas.

## 6. Responsividade & Layout

- Container principal: `max-w-lg mx-auto` (largura máxima ~32rem), mobile-first.
- Breakpoint único `sm:` (≥640px) ajusta paddings/gaps para telas maiores.
- Header sticky com blur (`backdrop-blur`) e borda inferior.

## 7. Requisitos Não-Funcionais

- **Sem rede em runtime**: nenhuma chamada de API própria. Única dependência externa é o carregamento de fontes do Google Fonts via `<link>` no `index.html`.
- **Sem armazenamento de dados do usuário**: único uso de `localStorage` é a preferência de tema (`theme`); nenhuma dosagem, nome ou histórico é salvo.
- **Sem cookies, sem analytics.**
- **Acessibilidade parcial**: `aria-label` em `SegmentedControl`, `focus-visible` em toggles, `motion-reduce` respeitado nas transições dos toggles. Não auditado formalmente (sem testes de a11y automatizados).

## 8. Divergências / Débitos Técnicos Conhecidos

1. **Opção "custom" duplicada em Orais**: `OralConverter.tsx` renderiza uma `<option value="custom">` manual (linha 78) além de iterar `orals` — mas `compounds.ts` não tem uma entrada `{id: 'custom', type: 'oral'}` como tem para injetáveis. Funciona porque a lógica de `isCustom`/`selectedCompound` não depende do array para o valor `'custom'`, mas é uma inconsistência de modelagem entre os dois conversores.
2. **CLAUDE.md desatualizado**: descreve o tema como "não persistido", mas a implementação atual persiste em `localStorage`.
3. **`README.md`** ainda é o boilerplate padrão do template Vite (não descreve o projeto).
4. Sem suíte de testes (unitários ou e2e) no repositório.

## 9. Fora de Escopo (v1)

Herdado de [PROJETO.md](PROJETO.md#fora-do-escopo-v1): outros formatos de administração (gel, patch, pellet), modo ciclo multi-composto, histórico de cálculos, login/perfis, backend/banco de dados.

## 10. Comandos

```bash
npm run dev        # servidor de desenvolvimento (Vite)
npm run build      # tsc -b && vite build
npm run lint       # ESLint
npm run preview    # build de produção localmente
vercel deploy --prod --scope felipevadaos-projects   # deploy
```
