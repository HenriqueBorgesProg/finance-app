# Roadmap Técnico — App Fullstack de Acompanhamento Financeiro Pessoal

## 1. Visão geral do projeto

O objetivo do projeto é desenvolver um sistema fullstack de acompanhamento financeiro pessoal, permitindo que o usuário registre manualmente receitas, despesas, contas, categorias, ativos de investimento, operações de compra/venda e preços manuais dos ativos.

Nesta primeira versão, o sistema será um **MVP de uso pessoal**, sem autenticação completa e sem integração automática com APIs externas de cotação. A estrutura, porém, deve ser criada de forma preparada para evoluir futuramente para login, múltiplos usuários e atualização automática de preços.

---

## 2. Stack definida

### Frontend

* React
* TypeScript
* React Router
* Axios ou TanStack Query
* Chart.js com react-chartjs-2
* CSS Modules, TailwindCSS ou styled-components

### Backend

* Node.js
* Fastify
* TypeScript
* TypeORM
* PostgreSQL

### Banco de dados

* PostgreSQL

### Ferramentas auxiliares

* Docker e Docker Compose
* Insomnia ou Postman
* Git e GitHub
* ESLint
* Prettier
* Migrations com TypeORM

---

## 3. Escopo do MVP

### Funcionalidades incluídas no MVP

* Cadastro de usuário fixo
* Cadastro de contas financeiras
* Cadastro de categorias
* Cadastro de receitas e despesas
* Cadastro de ativos de investimento
* Cadastro de operações de investimento
* Cadastro manual de preços dos ativos
* Dashboard financeiro básico
* Dashboard de investimentos básico
* Gráficos com Chart.js

### Funcionalidades fora do MVP

* Login com JWT
* Cadastro público de usuários
* Recuperação de senha
* Integração automática com APIs de cotação
* Importação de extrato bancário
* Integração Open Finance
* Controle avançado de cartão de crédito
* Cálculo avançado de imposto de renda
* Notificações
* Aplicativo mobile

---

# 4. Arquitetura geral

## 4.1 Estrutura macro

```text
finance-app/
├── backend/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
└── README.md
```

---

## 4.2 Fluxo geral

```text
React
  ↓
Fastify API
  ↓
TypeORM
  ↓
PostgreSQL
```

---

# 5. Modelagem inicial do banco

## 5.1 Entidades principais

O MVP terá as seguintes entidades:

```text
User
Account
Category
Transaction
Asset
InvestmentOperation
AssetPriceHistory
```

---

## 5.2 Responsabilidade de cada entidade

### User

Representa o dono dos dados.

No MVP, haverá apenas um usuário fixo.

### Account

Representa onde o dinheiro está.

Exemplos:

* Nubank
* Itaú
* Carteira física
* Conta investimento
* Corretora

### Category

Representa categorias de receitas e despesas.

Exemplos:

* Salário
* Freelance
* Alimentação
* Transporte
* Faculdade
* Saúde
* Lazer
* Investimentos

### Transaction

Representa movimentações financeiras comuns.

Exemplos:

* Receita
* Despesa
* Transferência
* Ajuste manual

### Asset

Representa um ativo de investimento.

Exemplos:

* PETR4
* VALE3
* MXRF11
* IVVB11
* AAPL
* BTC
* Caixinha Nubank
* CDB manual

### InvestmentOperation

Representa movimentações de investimento.

Exemplos:

* Compra
* Venda
* Dividendo
* Juros
* Aporte
* Resgate

### AssetPriceHistory

Representa o histórico manual de preços de um ativo.

Exemplo:

* PETR4 em 07/06/2026 = R$ 38,40

---

# 6. Roadmap de desenvolvimento

---

# Fase 0 — Preparação do ambiente

## Objetivo

Preparar o ambiente base do projeto para desenvolvimento local.

## Tasks

### TASK 0.1 — Criar repositório no GitHub

**Descrição:**
Criar um repositório chamado `finance-app` ou nome semelhante.

**Checklist:**

* [ ] Criar repositório no GitHub
* [ ] Clonar repositório localmente
* [ ] Criar branch principal `main`
* [ ] Criar arquivo `.gitignore`
* [ ] Criar `README.md`

**Critério de aceite:**

* O repositório deve estar criado e acessível.
* O projeto deve conter um `README.md` inicial.

---

### TASK 0.2 — Criar estrutura de pastas

**Descrição:**
Criar a estrutura inicial separando frontend e backend.

**Estrutura esperada:**

```text
finance-app/
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
```

**Critério de aceite:**

* O projeto deve estar organizado em frontend e backend.
* O `docker-compose.yml` deve ficar na raiz.

---

### TASK 0.3 — Configurar Docker com PostgreSQL

**Descrição:**
Criar um container PostgreSQL para desenvolvimento local.

**Exemplo de `docker-compose.yml`:**

```yml
version: "3.8"

services:
  postgres:
    image: postgres:16
    container_name: finance_postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: finance_app
    ports:
      - "5432:5432"
    volumes:
      - finance_postgres_data:/var/lib/postgresql/data

volumes:
  finance_postgres_data:
```

**Checklist:**

* [ ] Criar `docker-compose.yml`
* [ ] Subir banco com Docker
* [ ] Testar conexão com DBeaver, TablePlus ou terminal
* [ ] Confirmar banco `finance_app`

**Critério de aceite:**

* PostgreSQL deve estar rodando localmente.
* Banco `finance_app` deve estar criado.

---

# Fase 1 — Backend base

## Objetivo

Criar a API base com Fastify, TypeScript, TypeORM e PostgreSQL.

---

### TASK 1.1 — Criar projeto backend

**Descrição:**
Inicializar o projeto Node.js com TypeScript dentro da pasta `backend`.

**Comandos sugeridos:**

```bash
cd backend
npm init -y
npm install fastify typeorm reflect-metadata pg dotenv
npm install -D typescript ts-node-dev @types/node
npx tsc --init
```

**Checklist:**

* [ ] Criar projeto Node
* [ ] Instalar Fastify
* [ ] Instalar TypeORM
* [ ] Instalar driver PostgreSQL
* [ ] Configurar TypeScript
* [ ] Criar script de desenvolvimento

**Script sugerido:**

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
  }
}
```

**Critério de aceite:**

* O backend deve iniciar com `npm run dev`.
* Deve existir uma rota `/health`.

---

### TASK 1.2 — Criar servidor Fastify

**Descrição:**
Criar servidor básico com rota de saúde.

**Arquivo sugerido:**

```text
backend/src/server.ts
```

**Rota esperada:**

```http
GET /health
```

**Resposta esperada:**

```json
{
  "status": "ok"
}
```

**Critério de aceite:**

* A rota `/health` deve responder corretamente.
* O servidor deve rodar sem erros.

---

### TASK 1.3 — Configurar variáveis de ambiente

**Descrição:**
Criar arquivo `.env` para dados sensíveis e configuração do banco.

**Exemplo:**

```env
PORT=3333

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=finance_app
```

**Checklist:**

* [ ] Criar `.env`
* [ ] Criar `.env.example`
* [ ] Ignorar `.env` no Git
* [ ] Usar `dotenv` no projeto

**Critério de aceite:**

* O backend deve ler as configurações via `.env`.
* O `.env` não deve ser versionado.

---

### TASK 1.4 — Configurar TypeORM

**Descrição:**
Criar configuração centralizada do TypeORM.

**Arquivo sugerido:**

```text
backend/src/database/data-source.ts
```

**Critério de aceite:**

* TypeORM deve conectar ao PostgreSQL.
* A aplicação deve iniciar sem erro de conexão.
* `synchronize` deve ficar como `false`.

---

# Fase 2 — Entidades e migrations

## Objetivo

Criar as entidades principais do banco e suas migrations.

---

### TASK 2.1 — Criar enums do domínio financeiro

**Descrição:**
Criar os enums usados pelas entidades.

**Arquivo sugerido:**

```text
backend/src/enums/finance.enums.ts
```

**Enums esperados:**

```ts
export enum AccountType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS",
  CASH = "CASH",
  INVESTMENT = "INVESTMENT",
  CREDIT_CARD = "CREDIT_CARD",
}

export enum CategoryType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  BOTH = "BOTH",
}

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  TRANSFER = "TRANSFER",
  ADJUSTMENT = "ADJUSTMENT",
}

export enum AssetType {
  STOCK = "STOCK",
  FII = "FII",
  ETF = "ETF",
  BDR = "BDR",
  REIT = "REIT",
  CRYPTO = "CRYPTO",
  FIXED_INCOME = "FIXED_INCOME",
  CASH_BOX = "CASH_BOX",
  OTHER = "OTHER",
}

export enum InvestmentOperationType {
  BUY = "BUY",
  SELL = "SELL",
  DIVIDEND = "DIVIDEND",
  INTEREST = "INTEREST",
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
}
```

**Critério de aceite:**

* Enums devem estar centralizados.
* Entidades devem importar os enums desse arquivo.

---

### TASK 2.2 — Criar entidade User

**Descrição:**
Criar entidade de usuário.

**Campos:**

```text
id
name
email
createdAt
updatedAt
```

**Critério de aceite:**

* Entidade `User` deve estar mapeada para tabela `users`.
* Deve conter relacionamentos com contas, categorias, transações, ativos e operações.

---

### TASK 2.3 — Criar entidade Account

**Descrição:**
Criar entidade para contas financeiras.

**Campos:**

```text
id
userId
name
type
initialBalance
currentBalance
currency
active
createdAt
updatedAt
```

**Critério de aceite:**

* A tabela deve se chamar `accounts`.
* Deve ter relacionamento com `users`.
* Deve permitir contas em BRL e USD futuramente.

---

### TASK 2.4 — Criar entidade Category

**Descrição:**
Criar entidade de categorias financeiras.

**Campos:**

```text
id
userId
name
type
color
icon
active
createdAt
updatedAt
```

**Critério de aceite:**

* A tabela deve se chamar `categories`.
* Deve permitir categorias de receita, despesa ou ambas.
* Deve estar vinculada a um usuário.

---

### TASK 2.5 — Criar entidade Transaction

**Descrição:**
Criar entidade de movimentações financeiras.

**Campos:**

```text
id
userId
accountId
categoryId
description
amount
type
transactionDate
paymentMethod
notes
createdAt
updatedAt
```

**Critério de aceite:**

* A tabela deve se chamar `transactions`.
* Deve permitir receitas e despesas.
* Deve estar vinculada a uma conta.
* Categoria pode ser opcional.

---

### TASK 2.6 — Criar entidade Asset

**Descrição:**
Criar entidade para ativos de investimento.

**Campos:**

```text
id
userId
symbol
name
type
market
currency
sourceSymbol
active
createdAt
updatedAt
```

**Critério de aceite:**

* A tabela deve se chamar `assets`.
* Deve permitir ações brasileiras, FIIs, ETFs, ações externas, cripto e outros.
* Deve possuir índice único por `userId + symbol`.

---

### TASK 2.7 — Criar entidade InvestmentOperation

**Descrição:**
Criar entidade para operações de investimento.

**Campos:**

```text
id
userId
assetId
accountId
operationType
quantity
unitPrice
totalAmount
fees
taxes
operationDate
notes
createdAt
updatedAt
```

**Critério de aceite:**

* A tabela deve se chamar `investment_operations`.
* Deve permitir compras, vendas, dividendos, juros, aportes e resgates.
* Deve estar vinculada a um ativo.
* Conta pode ser opcional.

---

### TASK 2.8 — Criar entidade AssetPriceHistory

**Descrição:**
Criar entidade para histórico manual de preços dos ativos.

**Campos:**

```text
id
assetId
price
priceDate
source
createdAt
```

**Critério de aceite:**

* A tabela deve se chamar `asset_price_history`.
* Deve permitir preço manual.
* Deve possuir índice único por `assetId + priceDate + source`.

---

### TASK 2.9 — Criar migrations

**Descrição:**
Criar migrations para todas as tabelas.

**Checklist:**

* [ ] Migration de `users`
* [ ] Migration de `accounts`
* [ ] Migration de `categories`
* [ ] Migration de `transactions`
* [ ] Migration de `assets`
* [ ] Migration de `investment_operations`
* [ ] Migration de `asset_price_history`

**Critério de aceite:**

* Todas as migrations devem rodar com sucesso.
* O banco deve refletir corretamente as entidades.
* Não usar `synchronize: true`.

---

### TASK 2.10 — Criar seed inicial

**Descrição:**
Criar dados iniciais para uso no MVP.

**Dados iniciais:**

```text
Usuário:
- Henrique

Contas:
- Nubank
- Carteira física
- Conta investimento

Categorias:
- Salário
- Freelance
- Alimentação
- Transporte
- Faculdade
- Saúde
- Lazer
- Assinaturas
- Investimentos
```

**Critério de aceite:**

* Após rodar seed, o sistema deve ter dados básicos para teste.
* O usuário fixo deve ter `id = 1` ou ser facilmente identificável.

---

# Fase 3 — CRUDs do backend

## Objetivo

Criar os endpoints principais da API.

---

# 3.1 Módulo de contas

## TASK 3.1.1 — Criar CRUD de accounts

**Endpoints esperados:**

```http
GET /accounts
GET /accounts/:id
POST /accounts
PUT /accounts/:id
DELETE /accounts/:id
```

**Regras:**

* `DELETE` deve ser lógico, alterando `active` para `false`.
* Não permitir nome vazio.
* Não permitir saldo inicial nulo.
* Moeda padrão deve ser `BRL`.

**Critério de aceite:**

* Deve ser possível criar, listar, atualizar e inativar contas.
* Contas inativas não devem aparecer na listagem padrão.

---

# 3.2 Módulo de categorias

## TASK 3.2.1 — Criar CRUD de categories

**Endpoints esperados:**

```http
GET /categories
GET /categories/:id
POST /categories
PUT /categories/:id
DELETE /categories/:id
```

**Regras:**

* `DELETE` deve ser lógico.
* Categoria deve ter nome e tipo.
* Tipo deve ser `INCOME`, `EXPENSE` ou `BOTH`.

**Critério de aceite:**

* Deve ser possível criar categorias para receitas e despesas.
* Categorias inativas não devem aparecer na listagem padrão.

---

# 3.3 Módulo de transações

## TASK 3.3.1 — Criar CRUD de transactions

**Endpoints esperados:**

```http
GET /transactions
GET /transactions/:id
POST /transactions
PUT /transactions/:id
DELETE /transactions/:id
```

**Regras:**

* Transação deve ter conta, descrição, valor, tipo e data.
* Valor deve ser maior que zero.
* Tipo deve ser `INCOME`, `EXPENSE`, `TRANSFER` ou `ADJUSTMENT`.
* Ao criar receita, somar no saldo da conta.
* Ao criar despesa, subtrair do saldo da conta.
* Ao editar transação, recalcular impacto no saldo.
* Ao deletar transação, desfazer impacto no saldo.

**Critério de aceite:**

* Receita aumenta o saldo da conta.
* Despesa diminui o saldo da conta.
* Alteração de valor atualiza corretamente o saldo.
* Exclusão remove corretamente o impacto financeiro.

---

## TASK 3.3.2 — Criar filtros de transactions

**Endpoint:**

```http
GET /transactions?startDate=2026-06-01&endDate=2026-06-30&type=EXPENSE&categoryId=1&accountId=1
```

**Filtros esperados:**

* Data inicial
* Data final
* Tipo
* Categoria
* Conta
* Texto da descrição

**Critério de aceite:**

* Deve ser possível listar transações por mês.
* Deve ser possível filtrar despesas por categoria.
* Deve ser possível filtrar transações por conta.

---

# 3.4 Módulo de ativos

## TASK 3.4.1 — Criar CRUD de assets

**Endpoints esperados:**

```http
GET /assets
GET /assets/:id
POST /assets
PUT /assets/:id
DELETE /assets/:id
```

**Regras:**

* Ativo deve ter símbolo, nome, tipo e moeda.
* Não permitir símbolos duplicados para o mesmo usuário.
* `DELETE` deve ser lógico usando `active = false`.

**Critério de aceite:**

* Deve ser possível cadastrar PETR4, MXRF11, AAPL, BTC e outros.
* Ativos inativos não devem aparecer na listagem padrão.

---

# 3.5 Módulo de operações de investimento

## TASK 3.5.1 — Criar CRUD de investment_operations

**Endpoints esperados:**

```http
GET /investment-operations
GET /investment-operations/:id
POST /investment-operations
PUT /investment-operations/:id
DELETE /investment-operations/:id
```

**Regras:**

* Operação deve ter ativo, tipo, quantidade, preço unitário e data.
* Quantidade deve ser maior que zero.
* Preço unitário deve ser maior ou igual a zero.
* `totalAmount` deve ser calculado automaticamente:

  * `quantity * unitPrice`
* Permitir taxas e impostos.
* Para dividendos, permitir `unitPrice` como valor por cota/ação.

**Critério de aceite:**

* Deve ser possível cadastrar compra de ativo.
* Deve ser possível cadastrar venda de ativo.
* Deve ser possível cadastrar dividendo.
* O valor total deve ser calculado corretamente.

---

# 3.6 Módulo de preços dos ativos

## TASK 3.6.1 — Criar CRUD de asset_price_history

**Endpoints esperados:**

```http
GET /asset-prices
GET /asset-prices/:assetId
POST /asset-prices
PUT /asset-prices/:id
DELETE /asset-prices/:id
```

**Regras:**

* Preço deve ter ativo, data e valor.
* Não permitir duplicidade de preço para mesmo ativo, data e fonte.
* Fonte padrão deve ser `MANUAL`.

**Critério de aceite:**

* Deve ser possível cadastrar preço manual de um ativo.
* Deve ser possível consultar histórico de preços de um ativo.
* Deve ser possível buscar o último preço cadastrado.

---

# Fase 4 — Serviços de cálculo

## Objetivo

Criar serviços responsáveis por cálculos financeiros e de investimentos.

---

## TASK 4.1 — Criar serviço de saldo das contas

**Descrição:**
Criar um serviço para calcular saldo real das contas com base nas transações.

**Cálculos:**

```text
Saldo = saldo inicial + receitas - despesas ± ajustes
```

**Critério de aceite:**

* O saldo calculado deve bater com as transações cadastradas.
* O sistema deve conseguir recalcular saldo se necessário.

---

## TASK 4.2 — Criar serviço de resumo mensal

**Descrição:**
Criar endpoint de resumo financeiro mensal.

**Endpoint sugerido:**

```http
GET /dashboard/monthly-summary?year=2026&month=6
```

**Resposta esperada:**

```json
{
  "income": 3000,
  "expense": 1800,
  "balance": 1200
}
```

**Critério de aceite:**

* Deve retornar total de receitas do mês.
* Deve retornar total de despesas do mês.
* Deve retornar saldo do mês.

---

## TASK 4.3 — Criar serviço de gastos por categoria

**Endpoint sugerido:**

```http
GET /dashboard/expenses-by-category?year=2026&month=6
```

**Resposta esperada:**

```json
[
  {
    "category": "Alimentação",
    "total": 600
  },
  {
    "category": "Transporte",
    "total": 220
  }
]
```

**Critério de aceite:**

* Deve agrupar despesas por categoria.
* Deve ordenar da maior despesa para a menor.

---

## TASK 4.4 — Criar serviço de evolução mensal

**Endpoint sugerido:**

```http
GET /dashboard/monthly-evolution?year=2026
```

**Resposta esperada:**

```json
[
  {
    "month": "Jan",
    "income": 3000,
    "expense": 1700,
    "balance": 1300
  }
]
```

**Critério de aceite:**

* Deve retornar os 12 meses do ano.
* Meses sem dados devem retornar zero.

---

## TASK 4.5 — Criar serviço de posição dos investimentos

**Descrição:**
Calcular a posição atual por ativo.

**Cálculos esperados:**

```text
Quantidade atual = compras - vendas
Total investido = soma das compras - soma das vendas
Preço médio = total investido / quantidade atual
Último preço = último preço cadastrado manualmente
Valor atual = quantidade atual * último preço
Lucro/prejuízo = valor atual - total investido
Rentabilidade % = lucro/prejuízo / total investido * 100
```

**Endpoint sugerido:**

```http
GET /investments/positions
```

**Resposta esperada:**

```json
[
  {
    "assetId": 1,
    "symbol": "PETR4",
    "name": "Petrobras PN",
    "quantity": 10,
    "averagePrice": 35.2,
    "investedAmount": 352,
    "currentPrice": 38.4,
    "currentAmount": 384,
    "profitLoss": 32,
    "profitLossPercentage": 9.09
  }
]
```

**Critério de aceite:**

* Deve calcular quantidade atual corretamente.
* Deve calcular preço médio corretamente.
* Deve usar o último preço manual disponível.
* Deve retornar lucro/prejuízo em valor e percentual.

---

## TASK 4.6 — Criar resumo geral dos investimentos

**Endpoint sugerido:**

```http
GET /investments/summary
```

**Resposta esperada:**

```json
{
  "investedAmount": 5000,
  "currentAmount": 5600,
  "profitLoss": 600,
  "profitLossPercentage": 12
}
```

**Critério de aceite:**

* Deve somar todas as posições.
* Deve retornar total investido.
* Deve retornar valor atual.
* Deve retornar lucro/prejuízo.

---

## TASK 4.7 — Criar distribuição da carteira

**Endpoint sugerido:**

```http
GET /investments/allocation
```

**Resposta esperada:**

```json
[
  {
    "type": "STOCK",
    "total": 3000,
    "percentage": 60
  },
  {
    "type": "FII",
    "total": 1500,
    "percentage": 30
  },
  {
    "type": "CRYPTO",
    "total": 500,
    "percentage": 10
  }
]
```

**Critério de aceite:**

* Deve agrupar investimentos por tipo de ativo.
* Deve calcular percentual sobre a carteira total.

---

# Fase 5 — Frontend base

## Objetivo

Criar a base visual do sistema em React.

---

## TASK 5.1 — Criar projeto React

**Descrição:**
Criar projeto frontend com React e TypeScript.

**Sugestão com Vite:**

```bash
npm create vite@latest frontend -- --template react-ts
```

**Checklist:**

* [ ] Criar projeto React
* [ ] Instalar React Router
* [ ] Instalar Axios ou TanStack Query
* [ ] Instalar Chart.js
* [ ] Configurar estrutura de pastas

**Dependências sugeridas:**

```bash
npm install react-router-dom axios chart.js react-chartjs-2
```

**Critério de aceite:**

* Frontend deve rodar com `npm run dev`.
* Deve existir uma tela inicial simples.

---

## TASK 5.2 — Criar layout base

**Descrição:**
Criar layout principal do sistema.

**Componentes esperados:**

```text
Sidebar
Header
PageContainer
Card
Button
Input
Select
Table
Modal
```

**Rotas esperadas:**

```text
/dashboard
/accounts
/categories
/transactions
/assets
/investments
/asset-prices
```

**Critério de aceite:**

* Deve existir navegação lateral.
* Todas as rotas principais devem estar acessíveis.
* Layout deve ser reaproveitável.

---

## TASK 5.3 — Criar camada de API no frontend

**Descrição:**
Criar configuração centralizada para comunicação com backend.

**Arquivo sugerido:**

```text
frontend/src/services/api.ts
```

**Critério de aceite:**

* Todas as chamadas HTTP devem usar a instância centralizada.
* Base URL deve vir de variável de ambiente.

---

# Fase 6 — Telas do módulo financeiro

## Objetivo

Criar telas para controle de contas, categorias e transações.

---

## TASK 6.1 — Tela de contas

**Rota:**

```text
/accounts
```

**Funcionalidades:**

* Listar contas
* Criar conta
* Editar conta
* Inativar conta
* Exibir saldo atual
* Exibir tipo e moeda

**Critério de aceite:**

* Deve consumir endpoints de accounts.
* Deve permitir criar e editar conta.
* Deve mostrar saldo formatado em reais.

---

## TASK 6.2 — Tela de categorias

**Rota:**

```text
/categories
```

**Funcionalidades:**

* Listar categorias
* Criar categoria
* Editar categoria
* Inativar categoria
* Diferenciar receita/despesa visualmente

**Critério de aceite:**

* Deve consumir endpoints de categories.
* Deve permitir criar categorias do tipo receita, despesa ou ambas.

---

## TASK 6.3 — Tela de transações

**Rota:**

```text
/transactions
```

**Funcionalidades:**

* Listar transações
* Criar receita
* Criar despesa
* Editar transação
* Excluir transação
* Filtrar por mês
* Filtrar por tipo
* Filtrar por categoria
* Filtrar por conta

**Critério de aceite:**

* Deve consumir endpoints de transactions.
* Deve permitir cadastrar receitas e despesas.
* Deve atualizar a listagem após criar, editar ou excluir.
* Valores devem ser exibidos formatados.

---

# Fase 7 — Telas do módulo de investimentos

## Objetivo

Criar telas para ativos, operações de investimento e preços manuais.

---

## TASK 7.1 — Tela de ativos

**Rota:**

```text
/assets
```

**Funcionalidades:**

* Listar ativos
* Criar ativo
* Editar ativo
* Inativar ativo
* Filtrar por tipo
* Filtrar por mercado

**Critério de aceite:**

* Deve ser possível cadastrar ativos como PETR4, MXRF11, AAPL e BTC.
* Não deve permitir símbolo duplicado para o mesmo usuário.

---

## TASK 7.2 — Tela de operações de investimento

**Rota:**

```text
/investments/operations
```

**Funcionalidades:**

* Listar operações
* Criar compra
* Criar venda
* Criar dividendo
* Editar operação
* Excluir operação
* Filtrar por ativo
* Filtrar por tipo
* Filtrar por período

**Critério de aceite:**

* Deve consumir endpoints de investment operations.
* Deve calcular total automaticamente no formulário.
* Deve permitir quantidade fracionada.

---

## TASK 7.3 — Tela de preços manuais

**Rota:**

```text
/asset-prices
```

**Funcionalidades:**

* Selecionar ativo
* Cadastrar preço manual
* Listar histórico de preços
* Editar preço
* Excluir preço

**Critério de aceite:**

* Deve permitir registrar preço atual de um ativo.
* Deve impedir duplicidade de preço para o mesmo ativo e data.

---

## TASK 7.4 — Tela de posições

**Rota:**

```text
/investments
```

**Funcionalidades:**

* Exibir ativos em carteira
* Quantidade atual
* Preço médio
* Preço atual
* Valor investido
* Valor atual
* Lucro/prejuízo
* Rentabilidade percentual

**Critério de aceite:**

* Deve consumir endpoint `/investments/positions`.
* Deve formatar valores monetários corretamente.
* Deve destacar lucro e prejuízo visualmente.

---

# Fase 8 — Dashboard e gráficos

## Objetivo

Criar dashboard visual com indicadores e gráficos.

---

## TASK 8.1 — Dashboard financeiro

**Rota:**

```text
/dashboard
```

**Cards esperados:**

```text
Receitas do mês
Despesas do mês
Saldo do mês
Saldo total em contas
Total investido
Valor atual da carteira
Lucro/prejuízo dos investimentos
```

**Critério de aceite:**

* Deve consumir endpoints de dashboard.
* Deve exibir os principais indicadores em cards.

---

## TASK 8.2 — Gráfico de receitas x despesas

**Tipo de gráfico:**

```text
Bar chart ou line chart
```

**Dados esperados:**

```text
Mês
Receitas
Despesas
Saldo
```

**Critério de aceite:**

* Deve mostrar os meses do ano.
* Deve comparar receitas e despesas.
* Deve usar Chart.js.

---

## TASK 8.3 — Gráfico de gastos por categoria

**Tipo de gráfico:**

```text
Doughnut chart
```

**Dados esperados:**

```text
Categoria
Total gasto
Percentual
```

**Critério de aceite:**

* Deve mostrar distribuição das despesas por categoria.
* Deve usar dados do mês selecionado.

---

## TASK 8.4 — Gráfico de evolução patrimonial

**Tipo de gráfico:**

```text
Line chart
```

**Dados esperados:**

```text
Mês
Saldo total
Valor investido
Patrimônio estimado
```

**Critério de aceite:**

* Deve mostrar evolução mês a mês.
* Deve permitir visualizar crescimento ou queda patrimonial.

---

## TASK 8.5 — Gráfico de distribuição da carteira

**Tipo de gráfico:**

```text
Doughnut chart
```

**Dados esperados:**

```text
Tipo de ativo
Valor atual
Percentual da carteira
```

**Critério de aceite:**

* Deve mostrar quanto da carteira está em ações, FIIs, ETFs, cripto etc.
* Deve consumir endpoint `/investments/allocation`.

---

# Fase 9 — Melhorias de qualidade

## Objetivo

Melhorar confiabilidade, organização e manutenção do projeto.

---

## TASK 9.1 — Padronizar validações no backend

**Descrição:**
Criar validações para entradas da API.

**Sugestões:**

* Zod
* TypeBox
* Validação manual com schemas do Fastify

**Regras importantes:**

* Não aceitar valores negativos em receitas/despesas.
* Não aceitar quantidade negativa em investimentos.
* Não aceitar data inválida.
* Não aceitar tipo fora dos enums.
* Não aceitar campos obrigatórios vazios.

**Critério de aceite:**

* APIs devem retornar erro claro para dados inválidos.
* Erros devem seguir padrão único.

---

## TASK 9.2 — Criar padrão de resposta de erro

**Formato sugerido:**

```json
{
  "message": "Descrição do erro",
  "statusCode": 400,
  "details": []
}
```

**Critério de aceite:**

* Todos os erros devem seguir formato consistente.
* Erros inesperados não devem expor stack trace para o frontend.

---

## TASK 9.3 — Criar paginação

**Endpoints prioritários:**

```text
/transactions
/investment-operations
/asset-prices
```

**Parâmetros sugeridos:**

```http
?page=1&limit=20
```

**Critério de aceite:**

* Listagens grandes devem ser paginadas.
* Resposta deve informar total de registros.

---

## TASK 9.4 — Criar ordenação

**Ordenações úteis:**

```text
Data mais recente
Data mais antiga
Maior valor
Menor valor
Descrição
```

**Critério de aceite:**

* Usuário deve conseguir ordenar transações e operações.

---

## TASK 9.5 — Criar formatação monetária no frontend

**Descrição:**
Criar funções utilitárias para formatação de moeda.

**Arquivo sugerido:**

```text
frontend/src/utils/formatters.ts
```

**Funções esperadas:**

```ts
formatCurrency(value, currency)
formatPercent(value)
formatDate(value)
```

**Critério de aceite:**

* Valores em BRL devem aparecer como `R$ 1.000,00`.
* Valores em USD devem aparecer como `US$ 1,000.00` ou padrão escolhido.

---

# Fase 10 — Testes manuais e estabilização

## Objetivo

Garantir que o MVP funcione de ponta a ponta.

---

## TASK 10.1 — Criar roteiro de testes manuais

**Cenários mínimos:**

```text
Criar conta
Criar categoria
Criar receita
Criar despesa
Validar saldo
Criar ativo
Criar compra de ativo
Cadastrar preço atual
Validar posição de investimento
Validar dashboard
```

**Critério de aceite:**

* Todos os fluxos principais devem funcionar sem erro.
* Dados exibidos no dashboard devem bater com os dados cadastrados.

---

## TASK 10.2 — Testar cálculo de saldo

**Cenário:**

```text
Saldo inicial Nubank: R$ 100,00
Receita: R$ 1.000,00
Despesa: R$ 250,00
Saldo esperado: R$ 850,00
```

**Critério de aceite:**

* Saldo da conta deve ser R$ 850,00.

---

## TASK 10.3 — Testar cálculo de investimento

**Cenário:**

```text
Compra PETR4:
Quantidade: 10
Preço unitário: R$ 35,00
Total investido: R$ 350,00

Preço atual:
R$ 40,00

Valor atual:
R$ 400,00

Lucro:
R$ 50,00

Rentabilidade:
14,28%
```

**Critério de aceite:**

* Sistema deve retornar os valores corretamente.

---

# Fase 11 — Refino visual

## Objetivo

Melhorar usabilidade e aparência do sistema.

---

## TASK 11.1 — Criar padrão visual

**Definir:**

```text
Cores principais
Fonte
Tamanho dos cards
Layout dos formulários
Layout das tabelas
Estilo dos botões
Estilo dos gráficos
```

**Critério de aceite:**

* Sistema deve ter aparência consistente.
* Telas não devem parecer desconectadas visualmente.

---

## TASK 11.2 — Melhorar experiência dos formulários

**Melhorias:**

* Máscara monetária
* Campo de data amigável
* Select para categorias
* Select para contas
* Select para ativos
* Mensagem de sucesso
* Mensagem de erro
* Loading ao salvar

**Critério de aceite:**

* Formulários devem ser simples de preencher.
* Usuário deve receber feedback claro.

---

## TASK 11.3 — Melhorar tabelas

**Melhorias:**

* Estado vazio
* Loading
* Paginação
* Botões de ação
* Confirmação antes de excluir
* Destaque para receitas e despesas

**Critério de aceite:**

* Tabelas devem ser legíveis.
* Deve ser fácil editar ou excluir registros.

---

# Fase 12 — Preparação para evolução futura

## Objetivo

Deixar o projeto pronto para próximas versões.

---

## TASK 12.1 — Preparar autenticação futura

**Descrição:**
Mesmo sem implementar login agora, garantir que todas as tabelas principais tenham `userId`.

**Critério de aceite:**

* Todas as queries devem filtrar por `userId`.
* No MVP, usar `userId = 1`.
* No futuro, substituir por usuário autenticado.

---

## TASK 12.2 — Preparar integração futura com cotações

**Descrição:**
Garantir que ativos tenham `sourceSymbol` e preços tenham `source`.

**Critério de aceite:**

* Ativo deve ter campo `sourceSymbol`.
* Histórico de preço deve ter campo `source`.
* O sistema deve permitir preços de origem `MANUAL`, `YAHOO`, `BRAPI` ou outra futura.

---

## TASK 12.3 — Documentar API

**Descrição:**
Criar documentação simples dos endpoints.

**Arquivo sugerido:**

```text
backend/API.md
```

**Conteúdo esperado:**

```text
Endpoint
Método
Body esperado
Resposta esperada
Possíveis erros
```

**Critério de aceite:**

* Cada endpoint principal deve estar documentado.
* Deve ser possível testar a API usando a documentação.

---

# 13. Ordem recomendada de implementação

A ordem abaixo deve ser seguida para evitar retrabalho:

```text
1. Docker + PostgreSQL
2. Backend Fastify básico
3. TypeORM configurado
4. Entidades
5. Migrations
6. Seeds
7. CRUD de contas
8. CRUD de categorias
9. CRUD de transações
10. Cálculo de saldo
11. CRUD de ativos
12. CRUD de operações de investimento
13. CRUD de preços manuais
14. Cálculo de posições
15. Dashboard backend
16. React base
17. Layout
18. Telas de contas
19. Telas de categorias
20. Telas de transações
21. Telas de ativos
22. Telas de investimentos
23. Telas de preços manuais
24. Dashboard frontend
25. Gráficos
26. Validações
27. Paginação
28. Ajustes visuais
29. Testes manuais
30. Documentação
```

---

# 14. Prioridade das entregas

## Prioridade Alta

Essas tasks formam o MVP real:

```text
Backend funcionando
Banco funcionando
CRUD de contas
CRUD de categorias
CRUD de transações
CRUD de ativos
CRUD de operações
CRUD de preços
Dashboard básico
Frontend com telas principais
```

## Prioridade Média

Essas tasks melhoram a experiência:

```text
Filtros
Paginação
Gráficos
Máscara monetária
Estados de loading
Mensagens de erro
```

## Prioridade Baixa

Essas tasks podem ficar para depois:

```text
Login
API de cotação
Importação automática
Cartão de crédito avançado
Relatórios exportáveis
Mobile
```

---

# 15. Padrões de commit sugeridos

Use commits pequenos e objetivos.

Exemplos:

```text
feat: create user entity
feat: create accounts crud
feat: add transaction balance calculation
feat: create investments position endpoint
fix: correct account balance after transaction update
refactor: organize dashboard services
docs: add api documentation
style: improve dashboard cards layout
```

---

# 16. Padrão de branches

Sugestão simples:

```text
main
develop
feature/accounts-crud
feature/categories-crud
feature/transactions-crud
feature/assets-crud
feature/investments-crud
feature/dashboard
```

Para uso pessoal, você pode trabalhar direto na `develop` e fazer merge na `main` quando estiver estável.

---

# 17. Definition of Done

Uma task só deve ser considerada finalizada quando:

```text
Código implementado
Sem erro no terminal
Endpoint testado no Insomnia/Postman
Dados persistindo no banco
Regra de negócio validada
Frontend consumindo corretamente, se aplicável
Commit realizado
```

---

# 18. MVP final esperado

Ao final do MVP, o sistema deve permitir:

```text
Cadastrar contas financeiras
Cadastrar categorias
Registrar receitas
Registrar despesas
Acompanhar saldo das contas
Cadastrar ativos
Registrar compras de ativos
Registrar vendas de ativos
Registrar dividendos
Cadastrar preço manual dos ativos
Visualizar posição atual da carteira
Visualizar lucro/prejuízo dos investimentos
Ver dashboard financeiro mensal
Ver gráficos de receitas, despesas, categorias e investimentos
```

---

# 19. Próximas evoluções após o MVP

Depois que o MVP estiver funcionando, as próximas melhorias naturais são:

```text
Login com JWT
Multiusuário real
Integração com Yahoo Finance ou outra fonte gratuita
Atualização automática diária dos preços
Importação de extrato CSV
Controle de cartão de crédito
Metas financeiras
Relatórios mensais
Exportação em PDF
Deploy em VPS ou Render/Railway
```

---

# 20. Observação final do Tech Lead

O foco do MVP não é criar o sistema financeiro perfeito.

O foco é criar uma base funcional, organizada e evolutiva.

A prioridade deve ser:

```text
1. Fazer funcionar
2. Garantir que os cálculos estejam corretos
3. Organizar o código
4. Melhorar a interface
5. Automatizar integrações somente depois
```

Não implemente integração com API de cotação agora.
Não implemente login agora.
Não implemente regra tributária avançada agora.

Primeiro entregue o fluxo manual completo de ponta a ponta.
