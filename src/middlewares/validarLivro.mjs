const anoAtual = new Date().getFullYear();

export default function validarLivro(req, res, next) {
  const { titulo, autor, ano, paginas } = req.body;

  const erros = [];

  // =========================
  // VALIDAÇÃO DE PRESENÇA
  // =========================
  if (titulo === undefined) {
    erros.push("O campo 'titulo' é obrigatório");
  }

  if (autor === undefined) {
    erros.push("O campo 'autor' é obrigatório");
  }

  if (ano === undefined) {
    erros.push("O campo 'ano' é obrigatório");
  }

  if (paginas === undefined) {
    erros.push("O campo 'paginas' é obrigatório");
  }

  // =========================
  // VALIDAÇÃO DE TIPO
  // =========================
  if (titulo !== undefined && typeof titulo !== "string") {
    erros.push("O campo 'titulo' deve ser uma string");
  }

  if (autor !== undefined && typeof autor !== "string") {
    erros.push("O campo 'autor' deve ser uma string");
  }

  if (ano !== undefined && typeof ano !== "number") {
    erros.push("O campo 'ano' deve ser um número");
  }

  if (paginas !== undefined && !Number.isInteger(paginas)) {
    erros.push("O campo 'paginas' deve ser um número inteiro");
  }

  // =========================
  // REGRAS DE NEGÓCIO
  // =========================
  if (titulo && titulo.length < 2) {
    erros.push("O título deve ter no mínimo 2 caracteres");
  }

  if (autor && autor.length < 2) {
    erros.push("O autor deve ter no mínimo 2 caracteres");
  }

  if (typeof ano === "number") {
    if (ano < 1450 || ano > anoAtual) {
      erros.push(`O ano deve estar entre 1450 e ${anoAtual}`);
    }
  }

  if (Number.isInteger(paginas)) {
    if (paginas < 1) {
      erros.push("O número de páginas deve ser no mínimo 1");
    }
  }

  // =========================
  // RETORNO DE ERRO
  // =========================
  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }

  next();
}