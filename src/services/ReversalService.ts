const soapRequest = require('easy-soap-request');

import {
  getErrorMessageFromRCode,
  parseSaleStatusResponse
} from './base/parsers';
import { getReversalEnvelope } from './base/envelopes';
import { getUrl, getHeaders } from './base/headers';

export async function doReversal({ channelId, channelPassword }, purchaseInfo) {
  const xml = getReversalEnvelope(channelId, channelPassword, purchaseInfo);
  const {
    response: { body, statusCode }
  } = await soapRequest(getUrl(), getHeaders('reverso'), xml);
  if (statusCode != 200) throw new Error(`Soap Service Error [${statusCode}]`);
  const result = await parseSaleStatusResponse(body);
  if (result.rcode !== '00')
    throw new Error(`NewUision: "${getErrorMessageFromRCode(result.rcode)}"`);
  return result;
}
