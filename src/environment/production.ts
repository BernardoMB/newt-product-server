export const environment = {
  env: 'test',
  db: process.env.MLAB || process.env.MONGODB_URI,
  soapUrl: 'https://produccion.movivendor.com/wschan',
  port: process.env.PORT || 3000,
  jwtHash: 'bF7vkfcvE3xPYP8ZM1NygmHWLFOjG6'
};
