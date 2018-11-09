import * as Mongoose from "mongoose";

let DB_NAME;
if (process.env.NODE_ENV !== "production") {
  //Local Database
  DB_NAME = "mongodb://localhost/newt";
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
  public connect(): void {
    if (this.auth) {
      Mongoose.connect(
        DB_NAME,
        { useNewUrlParser: true, user: "newt", pass: "mimaamakim" }
      )
        .then(() => console.log(`Connected to db: ${DB_NAME}`))
        .catch(err => console.log(`Error connecting to db: ${err}`));
    } else {
      Mongoose.connect(
        DB_NAME,
        { useNewUrlParser: true }
      )
        .then(() => console.log(`Connected to db: ${DB_NAME}`))
        .catch(err => console.log(`Error connecting to db: ${err}`));
    }
  }

  public disconnect(): void {
    Mongoose.connection.close();
  }
}
