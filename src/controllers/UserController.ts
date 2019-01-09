import { Request, Response, NextFunction } from 'express';
import { handleError } from './helps/handle-error';
import { UserBusiness } from '../business/UserBusiness';
import { IUser } from '../models/interfaces/IUser';

export class UserController {
    

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const user: IUser = <IUser>req.body;
          const userBusiness = new UserBusiness();
          const result: IUser = await userBusiness.create(user);
          res.json({ user: result });
        } catch (error) {
          handleError(error, 'Error creating user', next);
        }
    }
    
    public async login(req: Request, res: Response, next: NextFunction): Promise<any> {
      try{
         const user : IUser=  <IUser>req.body;
         const userBusiness = new UserBusiness();
         const result: IUser = await userBusiness.login(user);
         if(!result) return res.status(400).send('Wrong credentials');
         delete result.password;
         return res.json({user: result});
      }
      catch(error) {
        handleError(error, 'Error logging in', next);
      }
    }
    

}
