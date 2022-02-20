import express from "express";

const route = express.Router();

route.get("/images", async (req: express.Request, res: express.Response) => {
  res.send("test  ..");
});

export = route;
