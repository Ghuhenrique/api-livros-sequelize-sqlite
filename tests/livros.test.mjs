import request from "supertest";
import sequelize from "../src/config/database.mjs";
import app from "../src/app.mjs";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("API de Livros", () => {

  test("Listar livros com banco vazio", async () => {
    const res = await request(app).get("/livros");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("Cadastrar livro válido", async () => {
    const res = await request(app)
      .post("/livros")
      .send({
        titulo: "Livro Teste",
        autor: "Autor Teste",
        ano: 2000,
        paginas: 100
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  test("Erro ao cadastrar sem título", async () => {
    const res = await request(app)
      .post("/livros")
      .send({
        autor: "Autor",
        ano: 2000,
        paginas: 100
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.erros).toBeDefined();
  });

  test("Erro ao cadastrar ano como string", async () => {
    const res = await request(app)
      .post("/livros")
      .send({
        titulo: "Livro",
        autor: "Autor",
        ano: "abc",
        paginas: 100
      });

    expect(res.statusCode).toBe(400);
  });

  test("Erro ao cadastrar páginas negativas", async () => {
    const res = await request(app)
      .post("/livros")
      .send({
        titulo: "Livro",
        autor: "Autor",
        ano: 2000,
        paginas: -5
      });

    expect(res.statusCode).toBe(400);
  });

  test("Buscar por ID existente", async () => {
    const create = await request(app).post("/livros").send({
      titulo: "Livro A",
      autor: "Autor A",
      ano: 2001,
      paginas: 120
    });

    const res = await request(app).get(`/livros/${create.body.id}`);

    expect(res.statusCode).toBe(200);
  });

  test("Buscar por ID inexistente", async () => {
    const res = await request(app).get("/livros/999");

    expect(res.statusCode).toBe(404);
  });

  test("Atualizar livro", async () => {
    const create = await request(app).post("/livros").send({
      titulo: "Livro B",
      autor: "Autor B",
      ano: 2002,
      paginas: 150
    });

    const res = await request(app)
      .put(`/livros/${create.body.id}`)
      .send({
        titulo: "Atualizado",
        autor: "Autor B",
        ano: 2002,
        paginas: 200
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe("Atualizado");
  });

  test("Deletar livro", async () => {
    const create = await request(app).post("/livros").send({
      titulo: "Livro C",
      autor: "Autor C",
      ano: 2003,
      paginas: 180
    });

    const res = await request(app).delete(`/livros/${create.body.id}`);

    expect(res.statusCode).toBe(204);
  });

});