# API de Livros — Node.js + Sequelize + SQLite

API RESTful para gerenciamento de livros, desenvolvida com **Node.js**, **Express**, **Sequelize** e **SQLite**, incluindo validações completas, middleware de logging e testes automatizados com **Jest** e **Supertest**.

---

## Objetivo

Este projeto foi desenvolvido como atividade da disciplina de **Programação Back-End**, com os seguintes requisitos:

* Persistência de dados com SQLite
* CRUD completo de livros
* Validações em múltiplas camadas
* Middleware de logging
* Inicialização segura do servidor
* Testes automatizados cobrindo todos os cenários

---

## Tecnologias Utilizadas

* Node.js
* Express
* Sequelize (ORM)
* SQLite
* Jest (testes)
* Supertest (testes HTTP)
* Nodemon (desenvolvimento)

---

## Estrutura do Projeto

```
api-livros-sequelize-sqlite/
│
├── src/
│   ├── config/
│   │   └── database.mjs
│   ├── controllers/
│   │   └── livroController.mjs
│   ├── middlewares/
│   │   ├── logger.mjs
│   │   └── validarLivro.mjs
│   ├── models/
│   │   └── Livro.mjs
│   ├── routes/
│   │   └── livroRoutes.mjs
│   └── app.mjs
│
├── tests/
│   └── livros.test.mjs
│
├── teste.http
├── app.mjs
├── package.json
└── database.sqlite
```

---

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/api-livros-sequelize-sqlite.git
cd api-livros-sequelize-sqlite
```

### 2. Instalar dependências

```bash
npm install
```

---

## Executando a aplicação

```bash
npm run dev
```

Servidor disponível em:

```
http://localhost:3000
```

---

## Endpoints da API

| Método | Rota        | Descrição              |
| ------ | ----------- | ---------------------- |
| GET    | /livros     | Listar todos os livros |
| GET    | /livros/:id | Buscar livro por ID    |
| POST   | /livros     | Cadastrar novo livro   |
| PUT    | /livros/:id | Atualizar livro        |
| DELETE | /livros/:id | Deletar livro          |

---

## Exemplo de requisição

### Criar livro

```json
POST /livros
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "ano": 1899,
  "paginas": 256
}
```

---

## Validações implementadas

Cada campo possui três níveis de validação:

### Presença

* Todos os campos são obrigatórios

### Tipo

* `titulo` e `autor`: string
* `ano`: número
* `paginas`: inteiro

### Regras de negócio

* `titulo` e `autor`: mínimo 2 caracteres
* `ano`: entre 1450 e ano atual
* `paginas`: mínimo 1

---

## Middleware de Logger

Todas as requisições são registradas no terminal:

```
[2026-04-20T19:00:00.000Z] GET /livros 200 2ms
```

---

## Testes Automatizados

### Executar testes

```bash
npm test
```

### Cobertura dos testes

* Listagem com banco vazio
* Criação de livro válido
* Validações (erros 400)
* Busca por ID (existente e inexistente)
* Atualização de livro
* Exclusão de livro
* Persistência dos dados

---

## Testes manuais

Arquivo disponível:

```
teste.http
```

Pode ser usado com a extensão **REST Client** no VS Code.

---

## Banco de Dados

* SQLite (arquivo local)
* Persistência automática
* Ambiente de teste usa banco em memória (`:memory:`)

---

## Inicialização segura

O servidor só inicia após:

1. Conexão com banco (`authenticate`)
2. Sincronização (`sync`)

Caso ocorra erro:

```
process.exit(1)
```

---

## Boas práticas aplicadas

* Arquitetura MVC
* Separação de responsabilidades
* Middleware para validação e logging
* Testes automatizados
* Ambiente de teste isolado
* Uso de ES Modules

---

## Autor

Gustavo Henrique Costa Pinto
Disciplina: Programação Back-End
Universidade Estadual de Goiás

