import express, { Application, NextFunction, Request, Response } from "express";
class TopMiddleware {
  constructor(app: Application) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(this.allowCrossDomain);
    app.use(this.cacheClear);
  }
  private allowCrossDomain(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*"); //all domain request allowed

    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
    ); //all headers allowed

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
      ); //all method allowed
      return res.status(200).json({});
    }

    next();
  }
  private cacheClear(req: Request, res: Response, next: NextFunction) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", "0");
    next();
  }
}
export default TopMiddleware;
