const env = process.env.NODE_ENV || 'development';
export const { environment } = require(`./${env}`);
