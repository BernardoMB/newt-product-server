import * as Mongoose from 'mongoose';

import { environment } from '../environment';

export class Db {
  private auth: boolean;

  constructor(auth: boolean) {
    this.auth = auth;
    (<any>Mongoose).Promise = global.Promise;
  }

  //Connect to the mongodb database corresponding to the current environment
  async connect() {
    try {
      const { db } = environment;
      if (this.auth) {
        await Mongoose.connect(
          db,
          { useNewUrlParser: true, user: 'newt', pass: 'mimaamakim' }
        );
      } else {
        await Mongoose.connect(
          db,
          { useNewUrlParser: true }
        );
      }
      console.log(`Connected to db: \x1b[34m${db}\x1b[0m`);
    } catch (e) {
      console.error(`Error connecting to db: \x1b[31m${e}\x1b[0m`);
    }
  }
  //Disconnect from the mongodb database
  async disconnect() {
    try {
      const { db } = environment;
      await Mongoose.connection.close();
      console.log(`Disconnected from db: \x1b[34m${db}\x1b[0m`);
    } catch (e) {
      console.error(`Error disconnecting from db: \x1b[31m${e}\x1b[0m`);
    }
  }
}
