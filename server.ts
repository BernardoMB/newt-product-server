import * as express from 'express';
import { Db } from './src/data-access/config';
import { Api } from './src/routes/base/Api';
import { environment } from './src/environment';

const db = new Db(false);
const app = express();

//Connect to the mongodb database
db.connect().then(() => {
  //Initialize all API routes
  Api.initialize(app);
  //Get environment variables
  const { port } = environment;
  app.listen(port, () => {
    console.log(`Server running on port \x1b[34m${port}\x1b[0m`);
  });
});
export default app;
