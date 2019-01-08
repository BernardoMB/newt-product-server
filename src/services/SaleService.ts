const soapRequest = require('easy-soap-request');

import { getErrorMessageFromRCode, parseSaleStatusResponse } from './base/parsers';
import { getSaleEnvelope } from './base/envelopes';
import { url, getHeaders } from './base/headers';
import { IPurchaseRequest } from '../models/interfaces/IServiceRequest';

export async function doSale({ channelId, channelPassword }, purchaseInfo: IPurchaseRequest) {
  const xml = getSaleEnvelope(channelId, channelPassword, purchaseInfo);
  const {
    response: { body, statusCode }
  } = await soapRequest(url, getHeaders('venta'), xml);
  if (statusCode != 200) throw new Error(`Soap Service Error [${statusCode}]`);
  const result = await parseSaleStatusResponse(body);
  if (result.rcode !== '00') throw new Error(`NewUision: "${getErrorMessageFromRCode(result.rcode)}"`);
  return result;
}

export async function getSaleStatus({ channelId, channelPassword }, purchaseInfo: IPurchaseRequest) {
  const xml = getSaleEnvelope(channelId, channelPassword, purchaseInfo);
  const {
    response: { body, statusCode }
  } = await soapRequest(url, getHeaders('statusVenta'), xml);
  if (statusCode != 200) throw new Error(`Soap Service Error [${statusCode}]`);
  const result = await parseSaleStatusResponse(body);
  if (result.rcode !== '00') throw new Error(`NewUision: "${getErrorMessageFromRCode(result.rcode)}"`);
  return result;
}
