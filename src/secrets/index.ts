import { ICredentials } from '../models/interfaces/ICredentials';

const env = process.env.NODE_ENV || 'development';
export const { credentials }: { credentials: ICredentials } = require(`./${env}`);
