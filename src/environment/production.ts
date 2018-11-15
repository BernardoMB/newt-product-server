export const environment = {
  env: 'test',
  db: process.env.MLAB || process.env.MONGODB_URI,
  port: process.env.PORT || 3000
};
