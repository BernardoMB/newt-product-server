export const environment = {
  env: 'test',
  db: process.env.MLAB || 'mongodb://localhost/newtTest',
  soapUrl: 'https://desarrollo.movivendor.com/wschan',
  port: process.env.PORT || 3000
};
