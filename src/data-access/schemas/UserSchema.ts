//User Model (Users of a Business)

import { Model, Schema, model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { genSalt, hash } from 'bcryptjs';
import { IUser } from '../../models/interfaces/IUser';

const schema: Schema = new Schema({

    name: String,
    username: { type: String, unique:true, required: true },
    password: { type: String, required: true },
    token : String,
    //providerId: {type : Schema.Types.ObjectId, ref: 'Provider'} //todo: have collection for providers (such as NV)
    },
    {
      timestamps: true,
    }
);

schema.pre("save", function(next) {
  let user : any = this;
  if(user.isModified('password')){
    genSalt(10, (err,salt)=>{
      hash(user.password, salt, (err,hash)=>{
        user.password = hash;
        next();
      });
    });
  }
  else{
    next();
  }
});

schema.methods.generateToken = function() {
  let user = this;
  const auth = {
    id : this._id,
    access : 'auth'
  }
  let token = sign(auth, process.env.JWT_HASH, {expiresIn : 30000});
  user.token = token;
  return user.save().then(()=>{
      return token;
  });
}

export const UserSchema: Model<IUser> = model<IUser>("User", schema);
