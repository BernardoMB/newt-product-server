import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as expressValidator from 'express-validator';

import { ErrorHandler } from '../middlewares/ErrorHandler';
import { ProductRoutes } from '../ProductRoutes';

export class Api {
  //Global route handling for when matching the desired address
  public static initialize(app: express.Application) {
    //Alter headers for security
    app.use(helmet());
    //Parse json requests
    app.use(bodyParser.json());
    //Log incomming requests
    app.use(morgan('dev'));
    //Validator middleware
    app.use(expressValidator());
    //Application routes
    app.use('/api/product', new ProductRoutes().routes());
    app.use(ErrorHandler);
  }
}
