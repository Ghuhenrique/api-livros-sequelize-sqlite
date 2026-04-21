import Livro from "../models/Livro.mjs";

// GET /livros
export const listarLivros = async (req, res) => {
  const livros = await Livro.findAll();
  res.json(livros);
};

// GET /livros/:id
export const buscarLivro = async (req, res) => {
  const { id } = req.params;
  const livro = await Livro.findByPk(id);

  if (!livro) {
    return res.status(404).json({ erro: "Livro não encontrado" });
  }

  res.json(livro);
};

// POST /livros
export const criarLivro = async (req, res) => {
  const livro = await Livro.create(req.body);
  res.status(201).json(livro);
};

// PUT /livros/:id
export const atualizarLivro = async (req, res) => {
  const { id } = req.params;
  const livro = await Livro.findByPk(id);

  if (!livro) {
    return res.status(404).json({ erro: "Livro não encontrado" });
  }

  await livro.update(req.body);
  res.json(livro);
};

// DELETE /livros/:id
export const deletarLivro = async (req, res) => {
  const { id } = req.params;
  const livro = await Livro.findByPk(id);

  if (!livro) {
    return res.status(404).json({ erro: "Livro não encontrado" });
  }

  await livro.destroy();
  res.status(204).send();
};