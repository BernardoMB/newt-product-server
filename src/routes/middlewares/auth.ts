import { Request, Response } from 'express';
import { verify, TokenExpiredError } from 'jsonwebtoken';
import { NextFunction } from 'connect';

import { environment } from '../../environment';
import { UserSchema } from '../../data-access/schemas/UserSchema';
import { handleError } from '../../controllers/helps/handle-error';
const JWT_HASH = environment.jwtHash;
const ADMIN_MIDDLEWARE_KEY = environment.adminMiddlewareKey;

export function authenticate (req: Request, res: Response, next: NextFunction) {

    let token = req.header('Authorization');
    let decoded = undefined;
    try {
        decoded = verify(token, JWT_HASH);
    } catch (err) {
        decoded = '0';
        if (err instanceof TokenExpiredError) {
            // do something
            console.log('TokenExpired');
        }
    }
    UserSchema.findOne({_id:decoded.id, token}, (err,user)=>{
        if(err) handleError(err, 'Error on retrieve', next);
        if(!user) {
            return next({
                message: `Invalid request: User is not authenticated`,
                code: 401
            });
        }
        return next();
    });
}

export function superAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if(token === ADMIN_MIDDLEWARE_KEY) {
        return next();
    }
    return res.status(401).send('https://www.youtube.com/watch?v=3xYXUeSmb-Y');
}