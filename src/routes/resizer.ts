import express from "express";

import controller from "../controllers/resizer";
import resizerValidators from "../middlewares/validators/resizer";

const route = express.Router();

route.get("/images", resizerValidators, controller.resizer);

export = route;
