export const environment = {
  env: 'test',
  db: process.env.MLAB || 'mongodb://localhost/newtTest',
  soapUrl: 'https://desarrollo.movivendor.com/wschan',
  port: process.env.PORT || 3000,
  jwtHash: 'bF7vkfcvE3xPYP8ZM1NygmHWLFOjG6',
  adminMiddlewareKey: process.env.ADMIN_MIDDLEWARE
};