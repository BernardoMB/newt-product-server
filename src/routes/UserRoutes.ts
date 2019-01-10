import { Router } from 'express';
//Controllers
import { UserController } from '../controllers/UserController';

//Validators
import RequestValidator from './middlewares/validators/RequestValidator';
import { userFieldsValidator } from './middlewares/validators/UserValidator';
import { AuthenticateSuperAdmin } from './middlewares/authenticators/AdminAuthenticator';
import { AuthenticationHeaderValidator } from './middlewares/validators/HeaderValidator';

const router = Router();

export class UserRoutes {
  private _userController: UserController;

  constructor() {
    this._userController = new UserController();
  }

  routes(): Router {
    const controller = this._userController;
    router.post(
      '',
      RequestValidator.validateWith([...userFieldsValidator, AuthenticationHeaderValidator]),
      AuthenticateSuperAdmin,
      controller.create
    );
    router.post('/login', RequestValidator.validateWith([...userFieldsValidator]), controller.login);
    return router;
  }
}
