import express from "express";

const port = 3000;

const app = express();

app.use("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("<h1>Hellow</h1>");
});

app.listen(port, (): void => {
  console.log("server is working...");
});
  