export default function logger(req, res, next) {
  const inicio = Date.now();

  res.on("finish", () => {
    const tempo = Date.now() - inicio;

    const data = new Date().toISOString();
    const metodo = req.method;
    const url = req.originalUrl;
    const status = res.statusCode;

    console.log(`[${data}] ${metodo} ${url} ${status} ${tempo}ms`);
  });

  next();
}