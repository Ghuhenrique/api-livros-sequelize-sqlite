import express from "express";
import livroRoutes from "./routes/livroRoutes.mjs";
import logger from "./middlewares/logger.mjs";

const app = express();

app.use(express.json());
app.use(logger);
app.use(livroRoutes);

export default app;