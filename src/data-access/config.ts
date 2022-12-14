import * as Mongoose from 'mongoose';
export class Db {
  private auth: boolean;

  constructor(auth: boolean) {
    this.auth = auth;
    (<any>Mongoose).Promise = global.Promise;
  }

  //Connect to the mongodb database corresponding to the current environment
  async connect() {
    try {
      const db = process.env.DB;
      let connection: typeof Mongoose;
      if (this.auth) {
        connection = await Mongoose.connect(
          db,
          { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, user: 'newt', pass: 'mimaamakim' }
        );
      } else {
        connection = await Mongoose.connect(
          db,
          { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }
        );
      }
      console.log(`Running on environment: \x1b[34m${process.env.NODE_ENV}\x1b[0m`);
      console.log(`Connected to db: \x1b[34m${db}\x1b[0m`);
      return connection;
    } catch (e) {
      console.error(`Error connecting to db: \x1b[31m${e}\x1b[0m`);
    }
  }
  //Disconnect from the mongodb database
  async disconnect() {
    try {
      const db = process.env.DB;
      await Mongoose.connection.close();
      console.log(`Disconnected from db: \x1b[34m${db}\x1b[0m`);
    } catch (e) {
      console.error(`Error disconnecting from db: \x1b[31m${e}\x1b[0m`);
    }
  }
}
