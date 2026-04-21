import sequelize from "./src/config/database.mjs";
import app from "./src/app.mjs";

const PORT = 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Banco conectado");

    await sequelize.sync();
    console.log("Tabelas OK");

    app.listen(PORT, () => {
      console.log(`Servidor em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();