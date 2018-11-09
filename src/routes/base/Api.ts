import * as express from "express";

import { ProductRoutes } from "../ProductRoutes";

export class Api {
  //Global route handling for when matching the desired address
  public static initialize(app: express.Application): void {
    app.use("/api/product", new ProductRoutes().routes);
  }
}
