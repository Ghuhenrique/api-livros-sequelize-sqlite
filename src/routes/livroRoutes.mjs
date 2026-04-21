import { Router } from "express";
import {
  listarLivros,
  buscarLivro,
  criarLivro,
  atualizarLivro,
  deletarLivro
} from "../controllers/livroController.mjs";

import validarLivro from "../middlewares/validarLivro.mjs";

const router = Router();

router.get("/livros", listarLivros);
router.get("/livros/:id", buscarLivro);
router.post("/livros", validarLivro, criarLivro);
router.put("/livros/:id", validarLivro, atualizarLivro);
router.delete("/livros/:id", deletarLivro);

export default router;