import { Router } from "express";
import TambulaController from "../controllers/tambula.controller";
import ProtectedMiddleware from "../middleware/protected.middleware";

class TambulaRoutes extends ProtectedMiddleware {
  public router: Router;
  private tambulaController: TambulaController;
  public path = "tambula"; // Fix here
  private protectedMiddleware: ProtectedMiddleware;

  constructor() {
    super();
    this.router = Router();
    this.tambulaController = new TambulaController(); // Fix here
    this.createTambulaRoute();
    this.fetchTambulaRoute();
    this.protectedMiddleware = new ProtectedMiddleware();
  }

  private createTambulaRoute(): void {
    this.router.post(
      "/createTambula",
      // this.protectedMiddleware.protected,
      this.tambulaController.createTicket
    );
  }

  private fetchTambulaRoute(): void {
    this.router.get(
      "tambula/:userId",
      // super.protected,
      this.tambulaController.fetchTickets
    );
  }
}

export default TambulaRoutes;
