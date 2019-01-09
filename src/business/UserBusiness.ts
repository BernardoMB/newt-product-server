import { IUserBusiness } from "./interfaces/IUserBusiness";
import { UserRepository } from "../repository/UserRepository";
import { compareSync } from "bcryptjs";
import { IUser } from "../models/interfaces/IUser";

export class UserBusiness implements IUserBusiness {

    private _userRepository: UserRepository;

    constructor() {
        this._userRepository = new UserRepository();
    }

    async create(item: IUser): Promise<IUser> {
        return await (<Promise<IUser>>this._userRepository.create(item));
    }

    async login(credentials : {username: string, password: string}) {
        const user = await this._userRepository.login(credentials);
        if(!user || !compareSync(credentials.password, user.password)){
            return null;
        }
        if(compareSync(credentials.password, user.password)){
            user.generateToken();
            return user;
        }
    }

}
