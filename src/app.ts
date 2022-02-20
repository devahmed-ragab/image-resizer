import express from "express";
import apiRoutes from "./routes/api";

const port = 3000;

const app = express();

app.use("/api", apiRoutes);

app.use("/", (req: express.Request, res: express.Response) => {
  console.log("home: redir to api/images");
  res.redirect("/api/images");
});

app.listen(port, (): void => {
  console.log("server is working...");  
});

