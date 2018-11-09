import { Request, Response } from "express";

import { IBaseController } from "./interfaces/base/BaseController";
import { IProduct } from "./../models/interfaces/IProduct";
import { ProductBusiness } from "../business/ProductBusiness";

export class ProductController implements IBaseController<ProductBusiness> {
  public create(req: Request, res: Response): void {
    try {
      const product: IProduct = <IProduct>req.body;
      const productBusiness = new ProductBusiness();
      productBusiness.create(product, (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: "ERROR_CREATING[product]", error });
        } else {
          res.json({ product: result });
        }
      });
    } catch (error) {
      console.error("Error creating product", error);
      res.status(400).json({ message: "ERROR_CREATING[product]", error });
    }
  }

  public update(req: Request, res: Response): void {
    try {
      const product: IProduct = <IProduct>req.body;
      const _id: string = req.params.id;
      const productBusiness = new ProductBusiness();
      productBusiness.update(_id, product, (error, result) => {
        if (error) {
          res.status(500).json({ message: "ERROR_UPDATING[product]", error });
        }
        if (!result) {
          return res.status(404).json({
            message: "NOT_FOUND[product]",
            error: new Error("product not found")
          });
        }
        res.json({ product });
      });
    } catch (error) {
      console.error("Error updating product", error);
      res.status(400).json({ message: "ERROR_UPDATING[product]", error });
    }
  }

  public delete(req: Request, res: Response): void {
    try {
      const _id: string = req.params.id;
      const productBusiness = new ProductBusiness();
      productBusiness.delete(_id, (error, result) => {
        if (error) {
          res.status(500).json({ message: "ERROR_DELETING[product]", error });
        } else {
          res.json({ id: _id });
        }
      });
    } catch (error) {
      console.error("Error deleting product", error);
      res.status(500).json({ message: "ERROR_DELETING[product]", error });
    }
  }

  public retrieve(req: Request, res: Response): void {
    try {
      const productBusiness = new ProductBusiness();
      productBusiness.retrieve((error, result) => {
        if (error) {
          res.status(500).json({ message: "ERROR_RETRIEVING[product]", error });
        } else {
          res.json({ products: result });
        }
      });
    } catch (error) {
      console.error("Error retrieving product", error);
      res.status(400).json({ message: "ERROR_RETRIEVING[product]", error });
    }
  }

  public findById(req: Request, res: Response): void {
    try {
      const _id: string = req.params.id;
      const productBusiness = new ProductBusiness();
      productBusiness.findById(_id, (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "ERROR_GETTING[product]", error });
        }
        if (!result) {
          return res.status(404).json({
            message: "NOT_FOUND[product]",
            error: new Error("product not found")
          });
        }
        res.json({ product: result });
      });
    } catch (error) {
      console.error("Error getting product", error);
      res.status(400).json({ message: "ERROR_GETTING[product]", error });
    }
  }
}
