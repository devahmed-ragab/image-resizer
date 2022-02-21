import { Request, Response, NextFunction } from "express";

const attributes: string[] = ["name", "width", "height"];

function quiryExists(req: Request, res: Response, next: NextFunction): void {
  const quiryKeys = Object.keys(req.query);
  if (quiryKeys.length == 0) {
    res
      .status(200)
      .send(
        'url should be like : "domainName:3000/api/images?name=ImageName&width=100&height=100"'
      );
  } else {
    next();
  }
}

function lowerCase(req: Request, res: Response, next: NextFunction): void {
  // convert res.query heys to lowerCase
  for (const attr in req.query) {
    const keyTemp = attr.toLowerCase();
    const valTemp = (req.query[attr] as string).toLowerCase();
    delete req.query[attr];
    req.query[keyTemp] = valTemp;
  }
  next();
}

function missingAttr(req: Request, res: Response, next: NextFunction): void {
  // check for missing attributes
  const missingAttr: string[] = [];
  for (const attr of attributes) {
    if (!Object.prototype.hasOwnProperty.call(req.query, attr)) {
      missingAttr.push(attr);
    }
  }

  missingAttr.length > 0
    ? res.status(400).send(`missing attributes: ${missingAttr.toString()}.`)
    : next();
}

function missingValues(req: Request, res: Response, next: NextFunction): void {
  // check for missing attributes
  const query = req.query;
  if (!(query.name && query.width && query.height)) {
    res.status(400).send(`some or all attributes' values are missing.`);
  } else {
    next();
  }
}

function parseNumbers(req: Request, res: Response, next: NextFunction): void {
  const missingValues: string[] = [];
  const { width, height } = req.query;

  if (isNaN(parseInt(width as string))) missingValues.push("width");

  if (isNaN(parseInt(height as string))) missingValues.push("height");

  missingValues.length > 0
    ? res
        .status(400)
        .send(`values for "${missingValues.toString()}" must be numbers.`)
    : next();
}

export default [
  quiryExists,
  lowerCase,
  missingAttr,
  missingValues,
  parseNumbers,
];
