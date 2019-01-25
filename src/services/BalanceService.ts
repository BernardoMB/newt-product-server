const soapRequest = require('easy-soap-request');

import { getBalanceEnvelope, getSaleEnvelope } from './base/envelopes';
import { parseBalanceResponse, parseSaleStatusResponse } from './base/parsers';
import { getUrl, getHeaders } from './base/headers';
import { IPurchaseRequest } from '../models/interfaces/IServiceRequest';

export async function getBalance({ channelId, channelPassword }) {
  const xml = getBalanceEnvelope(channelId, channelPassword);
  const {
    response: { body, statusCode }
  } = await soapRequest(getUrl(), getHeaders('saldo'), xml, 30000);
  if (statusCode != 200) throw new Error(`Soap service error: [${statusCode}]`);
  return await parseBalanceResponse(body);
}

export async function getExternalBalance({ channelId, channelPassword }, purchaseInfo: IPurchaseRequest) {
  const xml = getSaleEnvelope(channelId, channelPassword, purchaseInfo, true);
  const {
    response: { body, statusCode }
  } = await soapRequest(getUrl(), getHeaders('saldoExterno'), xml, 30000);
  if (statusCode != 200) throw new Error(`Soap service error: [${statusCode}]`);
  return await parseSaleStatusResponse(body);
}
