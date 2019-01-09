import { Router } from 'express';
//Controllers
import { UserController } from '../controllers/UserController';

//Validators
import RequestValidator from './middlewares/validators/RequestValidator';
import { userFieldsValidator } from './middlewares/validators/UserValidator';
import { superAdmin } from './middlewares/auth';

const router = Router();

export class UserRoutes {
  private _userController: UserController;

  constructor() {
    this._userController = new UserController();
  }

  routes(): Router {
    const controller = this._userController;
    router.post('', RequestValidator.validateWith([...userFieldsValidator]), superAdmin, controller.create);
    router.post('/login', RequestValidator.validateWith([...userFieldsValidator]), controller.login);
    return router;
  }
}
