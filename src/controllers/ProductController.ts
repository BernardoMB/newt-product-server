import { Request, Response, NextFunction } from 'express';
import { param, checkSchema } from 'express-validator/check';
import { Types } from 'mongoose';

import { IBaseController } from './interfaces/base/BaseController';
import { IProduct } from './../models/interfaces/IProduct';
import { ProductBusiness } from '../business/ProductBusiness';

export class ProductController implements IBaseController<ProductBusiness> {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product: IProduct = <IProduct>req.body;
      const productBusiness = new ProductBusiness();
      const result: IProduct = await productBusiness.create(product);
      res.json({ product: result });
    } catch (error) {
      handleError(error, 'Error creating product', next);
    }
  }

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

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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

  public async retrieve(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productBusiness = new ProductBusiness();
      const products: IProduct[] = await productBusiness.retrieve();
      res.json({ products });
    } catch (error) {
      handleError(error, 'Error retrieving products', next);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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

  public productFieldsValidator = checkSchema({
    name: {
      in: ['body'],
      exists: {
        errorMessage: 'Name field must be present'
      },
      isString: {
        errorMessage: 'Name field must be a valid non whitespace string'
      },
      trim: true
    },
    code: {
      in: ['body'],
      exists: {
        errorMessage: 'Product code field must be present'
      },
      isString: {
        errorMessage: 'Product code field must be a valid non whitespace string'
      },
      trim: true
    },
    kind: {
      in: ['body'],
      optional: true,
      isInt: {
        errorMessage: 'Product kind must be an int',
        options: {
          min: 0,
          max: 2
        }
      },
      toInt: true
    },
    amounts: {
      in: ['body'],
      errorMessage: 'Must be an array of {amount(number), description(string)}',
      isArray: true
    },
    'amounts.*.amount': {
      in: ['body'],
      errorMessage:
        'Amount must be a valid, positive number: e.g. 25,000 or 256.78',
      isCurrency: {
        options: {
          allow_negatives: false
        }
      },
      toFloat: true
    },
    'amounts.*.description': {
      in: ['body'],
      errorMessage: 'Description must be a valid string',
      isString: true,
      trim: true
    },
    providerId: {
      in: ['body'],
      exists: {
        errorMessage: 'A provider id must be included'
      },
      isString: {
        errorMessage: 'ProviderId field must be a valid non whitespace string'
      },
      trim: true
    },
    paymentCurrency: {
      in: ['body'],
      errorMessage:
        'PaymentCurrency field must be a valid number, e.g "MXN", "USD", "CAD"',
      exists: {
        errorMessage: 'A valid currency must be specified'
      },
      isString: {
        errorMessage: 'A valid currency must be non whitespace string'
      },
      isUppercase: {
        errorMessage: 'PaymentCurrency field must be uppercase'
      },
      isLength: {
        errorMessage: 'PaymentCurrency field must only contain 3 characters',
        options: { min: 3, max: 3 }
      },
      trim: true
    },
    timeout: {
      in: ['body'],
      exists: {
        errorMessage: 'A timeout must be specified'
      },
      isInt: {
        errorMessage: 'Timeout field must be a positive integer',
        options: {
          gt: 0
        }
      },
      toInt: true
    },
    supportsReversal: {
      in: ['body'],
      errorMessage: 'SupportsReversal field must be a valid boolean',
      exists: {
        errorMessage: 'SupportsReversal field must be included'
      },
      isBoolean: true,
      toBoolean: true
    },
    supportsCheckStatus: {
      in: ['body'],
      errorMessage: 'SupportsCheckStatus field must be a valid boolean',
      exists: {
        errorMessage: 'SupportsCheckStatus field must be included'
      },
      isBoolean: true,
      toBoolean: true
    },
    observation: {
      in: ['body'],
      errorMessage: 'Oservation field must be a valid string',
      optional: true,
      isString: true,
      trim: true
    }
  });

  public productExistsValidator = param('id')
    .exists()
    .withMessage('Param id is not provided')
    .isMongoId()
    .withMessage('Specified param Id is invalid, must be ObjectId')
    .custom(async value => {
      const productBusiness = new ProductBusiness();
      if (!Types.ObjectId.isValid(value)) return true;
      if (!(await productBusiness.findById(value))) {
        throw new Error('Product with id ${value} not found in collection');
      } else {
        return true;
      }
    });
}

function handleError(error, message: string, next: NextFunction) {
  next({
    message: `${message}: ${error.message}`,
    code: !!error.code ? error.code : 500
  });
}
