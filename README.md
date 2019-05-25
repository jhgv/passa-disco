# Intruções

## Ambiente

- Nodejs (>=8.12.0)
- npm (>= 6.9.0)
- MySQL (>= 8.0.16) rodando na porta default
  - Nome do banco de dados: pd
  - Usuario: root
  - Senha: (sem senha)

## Inicializando o banco de dados

1. Rodar script de criação de tabelas no projecto `backend`

```bash
node backend/scripts/create-tables.js
```

2. Apertar CTRL + C para sair

## Inicializando o backend

1. Ir para pasta backend
2. Instalar dependências
3. Rodar comando node para inicializar o server

```bash
npm install
node server.js
```

Optionalmente, pode-se utilizar o `nodemon`

```bash
npm install --save-dev nodemon
nodemon server.js
```

## Inicializando o frontend

1. Ir para pasta frontend
2. Instalar dependências
3. Rodar servidor local

```bash
npm install
npm start
```

## Pronto!

A aplicação frontend estará rodando em localhost:3000
