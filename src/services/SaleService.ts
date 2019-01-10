const soapRequest = require('easy-soap-request');

import { parseSaleStatusResponse } from './base/parsers';
import { getSaleEnvelope } from './base/envelopes';
import { url, getHeaders } from './base/headers';
import { IPurchaseRequest } from '../models/interfaces/IServiceRequest';

export async function doSale({ channelId, channelPassword }, purchaseInfo: IPurchaseRequest) {
  const xml = getSaleEnvelope(channelId, channelPassword, purchaseInfo);
  const {
    response: { body, statusCode }
  } = await soapRequest(url, getHeaders('venta'), xml);
  if (statusCode != 200) throw new Error(`Soap Service Error [${statusCode}]`);
  return await parseSaleStatusResponse(body);
}

export async function getSaleStatus({ channelId, channelPassword }, purchaseInfo: IPurchaseRequest) {
  const xml = getSaleEnvelope(channelId, channelPassword, purchaseInfo);
  const {
    response: { body, statusCode }
  } = await soapRequest(url, getHeaders('statusVenta'), xml);
  if (statusCode != 200) throw new Error(`Soap Service Error [${statusCode}]`);
  return await parseSaleStatusResponse(body);
}
