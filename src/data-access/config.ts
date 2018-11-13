import * as Mongoose from 'mongoose';

let DB_NAME;
if (process.env.NODE_ENV !== 'production') {
  //Local Database
  DB_NAME = 'mongodb://localhost/newt';
} else {
  //MLab Hosted Database
  DB_NAME = process.env.MLAB;
}

export class Db {
  private auth: boolean;

  constructor(auth: boolean) {
    this.auth = auth;
    (<any>Mongoose).Promise = global.Promise;
  }

  //method for connecting to the DB via mongoose
  async connect() {
    try {
      if (this.auth) {
        await Mongoose.connect(
          DB_NAME,
          { useNewUrlParser: true, user: 'newt', pass: 'mimaamakim' }
        );
      } else {
        await Mongoose.connect(
          DB_NAME,
          { useNewUrlParser: true }
        );
      }
      console.log(`Connected to db: ${DB_NAME}`);
    } catch (e) {
      console.error(`Error connecting to db: ${e}`);
    }
  }

  async disconnect() {
    try {
      await Mongoose.connection.close();
      console.log(`Disconnected from db: ${DB_NAME}`);
    } catch (e) {
      console.error(`Error disconnecting from db: ${e}`);
    }
  }
}
