import { Request, Response, NextFunction } from 'express';

import { IBaseController } from './interfaces/base/BaseController';
import { IProduct } from './../models/interfaces/IProduct';
import { ProductBusiness } from '../business/ProductBusiness';
import { handleError } from './helps/handle-error';

export class ProductController implements IBaseController<ProductBusiness> {
  /**
   * @api {post} /api/product CREATE
   * @apiPrivate
   * @apiName CreateProduct
   * @apiGroup Product
   *
   * @apiDescription Creates the product provided as a payload.
   *
   * @apiParam {Object} product The new product data to update the product with the given <code>id</code>.
   * @apiParamExample {json} Create product Request-Example:
   * {
   *   "name": "MOVISTAR",
   *   "productId": "A",
   *   "kind": 0,
   *   "amounts": [
   *     {
   *       "amount": 10,
   *       "description": ""
   *     },
   *     {
   *       "amount": 30,
   *       "description": ""
   *     },
   *     {
   *       "amount": 60,
   *       "description": ""
   *     },
   *     {
   *       "amount": 80,
   *       "description": ""
   *     },
   *     {
   *       "amount": 120,
   *       "description": ""
   *     },
   *     {
   *       "amount": 200,
   *       "description": ""
   *     },
   *     {
   *       "amount": 300,
   *       "description": ""
   *     }
   *   ],
   *   "providerId": "NEW-VISION",
   *   "paymentCurrency": "MXN",
   *   "icon": "BASE64ICON OR URL",
   *   "extra": {},
   *   "timeout": 60000,
   *   "supportsReversal": false,
   *   "supportsCheckStatus": false,
   *   "observation": "Original comment",
   * }
   *
   * @apiSuccess (200) {Object} product       The product that was inserted in the database.
   * @apiSuccessExample {json} Create product Success-Response:
   * {
   *   "_id": "5c1996e35e015bc3483c153b",
   *   "name": "MOVISTAR",
   *   "productId": "A",
   *   "kind": 0,
   *   "amounts": [
   *     {
   *       "amount": 10,
   *       "description": ""
   *     },
   *     {
   *       "amount": 30,
   *       "description": ""
   *     },
   *     {
   *       "amount": 60,
   *       "description": ""
   *     },
   *     {
   *       "amount": 80,
   *       "description": ""
   *     },
   *     {
   *       "amount": 120,
   *       "description": ""
   *     },
   *     {
   *       "amount": 200,
   *       "description": ""
   *     },
   *     {
   *       "amount": 300,
   *       "description": ""
   *     }
   *   ],
   *   "providerId": "NEW-VISION",
   *   "paymentCurrency": "MXN",
   *   "icon": "BASE64ICON OR URL",
   *   "extra": {},
   *   "timeout": 60000,
   *   "supportsReversal": false,
   *   "supportsCheckStatus": false,
   *   "observation": "Original comment",
   * }
   *
   * @apiUse ProductFieldsError
   */
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product: IProduct = <IProduct>req.body;
      const productBusiness = new ProductBusiness();
      const result: IProduct = await productBusiness.create(product);
      res.json({ product: result });
    } catch (error) {
      handleError(error, 'Error creating product', next);
    }
  }

  /**
   * @api {put} /api/product/:id UPDATE
   * @apiPrivate
   * @apiName UpdateProduct
   * @apiGroup Product
   *
   * @apiDescription Overrides the product with the specified <code>id</code> field with the payload.
   *
   * @apiParam {string} id Product unique <code>id</code>.
   * @apiParam {Object} product The new product data to update the product with the given <code>id</code>.
   * @apiParamExample {json} Update product Request-Example:
   * {
   *   "_id": "5c1996e35e015bc3483c153b",
   *   "name": "MOVISTAR",
   *   "productId": "A",
   *   "kind": 0,
   *   "amounts": [
   *     {
   *       "amount": 10,
   *       "description": ""
   *     },
   *     {
   *       "amount": 30,
   *       "description": ""
   *     },
   *     {
   *       "amount": 60,
   *       "description": ""
   *     },
   *     {
   *       "amount": 80,
   *       "description": ""
   *     },
   *     {
   *       "amount": 120,
   *       "description": ""
   *     },
   *     {
   *       "amount": 200,
   *       "description": ""
   *     },
   *     {
   *       "amount": 300,
   *       "description": ""
   *     }
   *   ],
   *   "providerId": "NEW-VISION",
   *   "paymentCurrency": "MXN",
   *   "icon": "BASE64ICON OR URL",
   *   "extra": {},
   *   "timeout": 60000,
   *   "supportsReversal": false,
   *   "supportsCheckStatus": false,
   *   "observation": "Updated comment",
   * }
   *
   * @apiSuccess (201) {Object} product       The updated product.
   * @apiSuccessExample {json} Succes-Response:
   * {
   *  "product": {
   *     "_id": "5c1996e35e015bc3483c153b",
   *     "name": "MOVISTAR",
   *     "productId": "A",
   *     "kind": 0,
   *     "amounts": [
   *       {
   *         "amount": 10,
   *         "description": ""
   *       },
   *       {
   *         "amount": 30,
   *         "description": ""
   *       },
   *       {
   *         "amount": 60,
   *         "description": ""
   *       },
   *       {
   *         "amount": 80,
   *         "description": ""
   *       },
   *       {
   *         "amount": 120,
   *         "description": ""
   *       },
   *       {
   *         "amount": 200,
   *         "description": ""
   *       },
   *       {
   *         "amount": 300,
   *         "description": ""
   *       }
   *     ],
   *     "providerId": "NEW-VISION",
   *     "paymentCurrency": "MXN",
   *     "icon": "BASE64ICON OR URL",
   *     "extra": {},
   *     "timeout": 60000,
   *     "supportsReversal": false,
   *     "supportsCheckStatus": false,
   *     "observation": "Updated comment"
   *   }
   * }
   *
   * @apiUse MongoIdError
   * @apiUse ProductNotFoundError
   * @apiUse ProductFieldsError
   */
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const update: IProduct = <IProduct>req.body;
      const {
        params: { id }
      } = req;
      const productBusiness = new ProductBusiness();
      const product = await productBusiness.update(id, update);
      res.status(201).json({ product });
    } catch (error) {
      handleError(error, ' Error updating product', next);
    }
  }

  /**
   * @api {delete} /api/product/:id DELETE
   * @apiPrivate
   * @apiName DeleteProduct
   * @apiGroup Product
   *
   * @apiDescription Deletes the product with the specified <code>id</code> field.
   *
   * @apiParam {string} id Product unique <code>id</code>.
   *
   * @apiSuccess (200) {string} id       The <code>id</code> of the product that was deleted.
   *
   * @apiUse MongoIdError
   * @apiUse ProductNotFoundError
   */
  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        params: { id }
      } = req;
      const productBusiness = new ProductBusiness();
      await productBusiness.delete(id);
      res.json({ id });
    } catch (error) {
      handleError(error, ' Error deleting product', next);
    }
  }

  /**
   * @api {get} /api/product GETALL
   * @apiName GetProducts
   * @apiGroup Product
   *
   * @apiDescription Gets all products in the catalogue.
   *
   * @apiSuccess (200) {Object[]} products       List of products in the catalogue.
   */
  public async retrieve(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productBusiness = new ProductBusiness();
      const products: IProduct[] = await productBusiness.retrieve();
      res.json({ products });
    } catch (error) {
      handleError(error, 'Error retrieving products', next);
    }
  }

  /**
   * @api {get} /api/product/:id GET
   * @apiName GetProductById
   * @apiGroup Product
   *
   * @apiDescription Gets the product with the specified <code>id</code>.
   *
   * @apiParam {string} id Product unique <code>id</code>.
   *
   * @apiSuccess (200) {Object} product       The product with the specified <code>id</code>.
   * @apiSuccessExample {json} Success-Response:
   * {
   *  "product": {
   *    "_id": "5c1996e35e015bc3483c153b",
   *    "name": "MOVISTAR",
   *    "productId": "A",
   *    "kind": 0,
   *    "amounts": [
   *      {
   *        "amount": 10,
   *        "description": ""
   *      },
   *      {
   *        "amount": 30,
   *        "description": ""
   *      },
   *      {
   *        "amount": 60,
   *        "description": ""
   *      },
   *      {
   *        "amount": 80,
   *        "description": ""
   *      },
   *      {
   *        "amount": 120,
   *        "description": ""
   *      },
   *      {
   *        "amount": 200,
   *        "description": ""
   *      },
   *      {
   *        "amount": 300,
   *        "description": ""
   *      }
   *    ],
   *    "providerId": "NEW-VISION",
   *    "paymentCurrency": "MXN",
   *    "icon": "BASE64ICON OR URL",
   *    "extra": {},
   *    "timeout": 60000,
   *    "supportsReversal": false,
   *    "supportsCheckStatus": false,
   *    "observation": "Alcanzando 30s se declina la recarga",
   *  }
   * }
   *
   * @apiUse MongoIdError
   * @apiUse ProductNotFoundError
   */
  public async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        params: { id }
      } = req;
      const productBusiness = new ProductBusiness();
      const product = await productBusiness.findById(id);
      res.json({ product });
    } catch (error) {
      handleError(error, 'Error finding product', next);
    }
  }
}
