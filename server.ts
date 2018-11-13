import * as express from 'express';
import { Db } from './src/data-access/config';
import { Api } from './src/routes/base/Api';
const db = new Db(false);

const PORT = process.env.PORT || 3000;
const app = express();

//Connect to the mongodb database
db.connect().then(() => {
  //Initialize all API routes
  Api.initialize(app);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
