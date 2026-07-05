# Conversor Hormonal

Web app para conversão de dosagens hormonais — pensado para auxiliar praticantes de musculação a calcular corretamente a aplicação de compostos injetáveis e orais, evitando erros de cálculo manual.

⚠️ **Aviso:** esta é uma ferramenta de cálculo auxiliar e não substitui orientação médica profissional. O uso de esteroides anabolizantes sem acompanhamento médico pode causar sérios danos à saúde.

## Funcionalidades

- **Conversor de Injetáveis (mg ↔ ml):** informe a concentração do composto (mg/ml) e converta nos dois sentidos — quantos ml aplicar para uma dose desejada em mg, ou quantos mg equivalem a um volume em ml.
- **Conversor de Orais (mg → comprimidos):** informe a dosagem por comprimido/cápsula e a dose-alvo; o app calcula quantos comprimidos tomar, incluindo frações comuns (¼, ½, ¾).
- **Lista de compostos pré-nomeados**, injetáveis e orais, com apelidos populares (Test E, Deca, Anavar, Dbol, etc.) e opção de composto livre.
- **Tema claro/escuro** com toggle na interface.
- **PT-BR / EN** — interface totalmente traduzida via i18next.
- **Sem login, sem backend, sem histórico:** tudo roda no navegador; nenhum dado é armazenado ou enviado a servidores.

## Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [i18next](https://www.i18next.com/) / [react-i18next](https://react.i18next.com/)
- [lucide-react](https://lucide.dev/) para ícones

## Desenvolvimento

```bash
npm install
npm run dev        # servidor de desenvolvimento (http://localhost:5173)
npm run build      # type-check (tsc) + build de produção (Vite)
npm run lint       # ESLint
npm run preview    # serve o build de produção localmente
```

## Estrutura do projeto

```
src/
├── data/compounds.ts       # fonte única dos compostos (injetáveis e orais)
├── i18n/                   # configuração i18next e locales (pt-BR, en)
├── hooks/useTheme.ts       # estado do tema claro/escuro
├── components/
│   ├── ui/                 # componentes de UI genéricos (Input, Select, Button, ...)
│   ├── InjectableConverter.tsx
│   ├── OralConverter.tsx
│   ├── ResultCard.tsx
│   ├── Disclaimer.tsx
│   ├── ThemeToggle.tsx
│   └── LanguageToggle.tsx
└── App.tsx
```

Adicionar um novo composto requer uma entrada em `src/data/compounds.ts` e as chaves correspondentes em `src/i18n/locales/pt-BR.json` e `en.json`.

## Deploy

Hospedado na [Vercel](https://vercel.com/):

```bash
vercel deploy --prod --scope felipevadaos-projects
```
