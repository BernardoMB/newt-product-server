const soapRequest = require('easy-soap-request');

import { getBalanceEnvelope } from './base/envelopes';
import { parseBalanceResponse } from './base/parsers';
import { url, getHeaders } from './base/headers';

export async function getBalance({ channelId, channelPassword }) {
  const xml = getBalanceEnvelope(channelId, channelPassword);
  const {
    response: { body, statusCode }
  } = await soapRequest(url, getHeaders('saldo'), xml);
  if (statusCode != 200) throw new Error(`Soap service error: [${statusCode}]`);
  return await parseBalanceResponse(body);
}
