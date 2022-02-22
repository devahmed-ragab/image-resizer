import { Request, Response, NextFunction } from "express"

function loger(req: Request, res: Response, next: NextFunction): void {
  const date = new Date().toLocaleString()
  // eslint-disable-next-line no-console
  console.log(
    `${date} :  "${req.url}" : requested by ${req.socket.remoteAddress}.`
  )
  next()
}

export default loger
