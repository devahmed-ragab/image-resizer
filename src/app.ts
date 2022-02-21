import express from "express";
import apiRoutes from "./routes/resizer";
import loger from "./middlewares/logs/loger";

const port = 3000;

const app = express();

app.use(loger);

app.use("/api", apiRoutes);

app.use("/", (req: express.Request, res: express.Response) => {
  res.status(301).redirect("/api/images");
});

app.listen(port, (): void => {
  console.log("server is working...");
});
