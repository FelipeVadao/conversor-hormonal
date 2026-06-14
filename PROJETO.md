# Conversor Hormonal — Documento de Definição do Projeto

## Visão Geral

Aplicativo web responsivo para conversão de dosagens hormonais, voltado a bodybuilders que realizam a administração de esteróides anabolizantes. O app auxilia na conversão entre unidades (mg ↔ ml para injetáveis; mg → nº de comprimidos para orais), eliminando erros de cálculo manual.

---

## Nome

**Conversor Hormonal**

---

## Público-alvo

Usuários adultos praticantes de musculação que utilizam esteróides anabolizantes. O app é de uso geral (público amplo), sem necessidade de cadastro ou autenticação.

---

## Plataforma

- Web app acessível por navegador
- Responsivo para mobile, tablet e desktop
- Sem app nativo — funciona via browser em qualquer tamanho de tela

---

## Funcionalidades

### 1. Conversor para Injetáveis (ml ↔ mg)

O usuário seleciona ou informa o composto e digita a concentração. O app realiza a conversão nos dois sentidos:

- **mg → ml**: "Quero tomar X mg. Quantos ml devo aplicar?"
  - Fórmula: `ml = mg desejados ÷ concentração (mg/ml)`
- **ml → mg**: "Vou aplicar X ml. Quantos mg estarei tomando?"
  - Fórmula: `mg = ml informados × concentração (mg/ml)`

### 2. Conversor para Orais (comprimidos/cápsulas)

O usuário seleciona o composto, informa a dosagem por comprimido e a dose-alvo. O app retorna:

- **mg → nº de comprimidos**: "Quero tomar X mg. Quantos comprimidos são?"
  - Fórmula: `comprimidos = mg desejados ÷ mg por comprimido`

### 3. Uma substância por vez

Cada cálculo é feito para um único composto. Não há modo "ciclo" multi-substância na versão inicial.

---

## Lista de Compostos Pré-nomeados

O usuário seleciona o composto por nome em uma lista. A concentração **não** é pré-preenchida — o usuário digita manualmente. A lista é genérica e expansível em versões futuras.

### Injetáveis

| Composto | Nome popular |
|---|---|
| Testosterona Enantato | Test E |
| Testosterona Cipionato | Test C |
| Testosterona Propionato | Test P |
| Testosterona Suspensão | Test Susp |
| Sustanon 250 | Sust |
| Decanoato de Nandrolona | Deca |
| Fenilpropionato de Nandrolona | NPP |
| Boldenona Undecilênato | Equipoise / EQ |
| Trembolona Acetato | Tren A |
| Trembolona Enantato | Tren E |
| Drostanolona Propionato | Masteron P |
| Drostanolona Enantato | Masteron E |
| Estanozolol Injetável | Winstrol Depot |
| Metenolona Enantato | Primobolan Inj. |
| Hormônio do Crescimento | GH / HGH |

### Orais

| Composto | Nome popular |
|---|---|
| Oxandrolona | Anavar |
| Estanozolol oral | Winstrol oral |
| Metandrostenolona | Dianabol / Dbol |
| Oximetolona | Anadrol |
| Turinabol | Tbol |
| Metenolona Acetato | Primobolan oral |
| Mesterolona | Proviron |
| Anastrozol | Arimidex |
| Letrozol | Femara |
| Tamoxifeno | Nolvadex |
| HCG | Gonadotrofina |

> **Nota:** Campo de nome livre também disponível — o usuário pode digitar um composto que não esteja na lista.

---

## Sessão e Dados

- **Sem login / sem cadastro**
- **Sem histórico persistente** — cada sessão é independente
- Nenhum dado do usuário é armazenado ou enviado a servidores

---

## Interface

### Tema
- Tema claro e tema escuro disponíveis
- Toggle de alternância visível na interface (sem detecção automática forçada)

### Idioma
- Português (PT-BR) e Inglês (EN)
- Seletor de idioma na interface
- Toda a UI, listas de compostos e mensagens traduzidas

### Disclaimer (Aviso)
- Aviso fixo e permanente na tela (não é popup nem modal)
- Texto sugerido:

> **Aviso:** Este aplicativo é uma ferramenta de cálculo auxiliar e não substitui orientação médica profissional. O uso de esteróides anabolizantes sem acompanhamento médico pode causar sérios danos à saúde.

---

## Stack Tecnológica Sugerida

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Framework | React + Vite | Componentização, build rápido, ecossistema amplo |
| Linguagem | TypeScript | Segurança nos cálculos, menos bugs |
| Estilo | Tailwind CSS | Responsividade rápida, suporte a dark/light mode nativo |
| i18n | react-i18next | Solução padrão para bilinguismo em React |
| Deploy | Vercel ou GitHub Pages | Gratuito, zero configuração de servidor |

---

## Fora do Escopo (v1)

- Outros formatos além de injetáveis e orais (gel, patches, pellets)
- Modo ciclo (múltiplos compostos simultâneos)
- Histórico de cálculos
- Login / perfis de usuário
- Banco de dados / backend

---

## Versões Futuras (Backlog)

- Adicionar novos compostos à lista
- Modo ciclo (calcular múltiplas substâncias de um protocolo)
- Exportar/compartilhar cálculo
- PWA (instalável no celular como app)

---

*Documento criado em: 2026-06-11*
*Status: Definição inicial aprovada — pronto para início do desenvolvimento*
