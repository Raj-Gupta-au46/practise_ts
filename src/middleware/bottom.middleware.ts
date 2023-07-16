import { Application, NextFunction, Request, Response } from "express";
import { NotFound } from "http-errors";

class BottomMiddleware {
  constructor(app: Application) {
    app.use(this.routeNotFoundErrorHandler);
    app.use(this.fromRouteErrorHandler);
  }
  public routeNotFoundErrorHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    next(new NotFound("No route found, Please check your urls."));
  }
  public fromRouteErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.status(err.status || 500);
    const errorMessage = err.errors
      ? Object.entries(err.errors)
          .map((error: any) => error[1].message)
          .join()
      : err.message?.includes("duplicate")
      ? `${Object.entries(err.keyValue)[0][0]
          .toString()
          .split(/(?=[A-Z])/)
          .join(" ")
          .split(".")
          .join(" ")
          .replace(/^\w/, (c) => c.toUpperCase())} is already exist!`
      : err?.message || err?.error?.description || "Something went wrong";
    res.json({
      error: {
        message: errorMessage,
      },
    });
  }
}

//
export default BottomMiddleware;
