import * as express from 'express';
import { Db } from './data-access/config';
import { Api } from './routes/base/Api';
import { environment } from './environment';

export const app = express();

function listen(): Promise<express.Express> {
  //Initialize all API routes
  Api.initialize(app);
  //Get environment variables
  const { port } = environment;
  return new Promise((resolve, reject) => {
    app.listen(port, err => {
      if (err) reject(err);
      console.log(`Server running on port \x1b[34m${port}\x1b[0m`);
      resolve(app);
    });
  });
}

export async function init() {
  const db = new Db(false);
  //Connect to the mongodb database
  const dbConnection = await db.connect();
  //Wait for the server to start listening
  const app = await listen();
  return [dbConnection, app];
}
