# Passa Disco!

Aplicação web para catálogo de discos em React e Node.js.

# Intruções

## Ambiente

- Nodejs (>=8.12.0)
- npm (>= 6.9.0)
- MySQL (>= 8.0.16) rodando localmente na porta 3306
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

# Testes

## Testes do backend

Os testes foram criados utilizando [Mocha](https://mochajs.org/ "Mochajs's Homepage"), [Chai](http://www.chaijs.com/ "chaijs's Homepage") e [SuperTest](https://github.com/visionmedia/supertest/ "Mochajs's Homepage")

Para rodar os testes do backend, basta ir para a pasta `backend` e rodar o comando:

```bash
npm test
```

Por segurança, para evitar problemas com o banco principal, os testes devem ser rodados em uma base de teste. Por exemplo, um novo banco com nome 'pd_test' deve ser criado e em `backend/api/database.js`, mudar o nome do banco para 'pd_test'.
