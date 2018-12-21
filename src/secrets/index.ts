import { ICredentials } from '../models/interfaces/ICredentials';

const env = process.env.NODE_ENV || 'development';
console.log('Environment', env);
export const { credentials }: { credentials: ICredentials } = require(`./${env}`);
