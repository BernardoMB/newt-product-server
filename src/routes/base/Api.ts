import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as expressValidator from 'express-validator';
import { join } from 'path';

import { ErrorHandler } from '../middlewares/handlers/ErrorHandler';
import { ProductRoutes } from '../ProductRoutes';
import { PurchaseRoutes } from '../PurchaseRoutes';
import { BalanceRoutes } from '../BalanceRoutes';
import { UserRoutes } from '../UserRoutes';

const appInsights = require("applicationinsights");
const DOC_PATH = join(__dirname, '../../../documentation');

export class Api {
  //Global route handling for when matching the desired address
  public static initialize(app: express.Application) {
    //Alter headers for security
    app.use(helmet());
    //Parse json requests
    app.use(bodyParser.json());
    //Documentation routes
    app.use(express.static(DOC_PATH));
    app.get('/docs', (req, res) => res.sendFile(`${DOC_PATH}/index.html`));
    //Log incomming requests
    if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));
    //Validator middleware
    if(process.env.NODE_ENV === 'staging') appInsights.setup().start();
    app.use(expressValidator());
    //Application routes
    app.use('/api/product', new ProductRoutes().routes());
    app.use('/api/purchase', new PurchaseRoutes().routes());
    app.use('/api/balance', new BalanceRoutes().routes());
    app.use('/api/user', new UserRoutes().routes());
    //Middleware to handle all error messages
    app.use(ErrorHandler);
  }
}
