import { IPurchaseRequest } from '../../models/interfaces/IServiceRequest';

export function extraObjToString(extra: any): string {
  let str = '';
  for (let key in extra) {
    if (key === 'pin') str += `${extra[key]}|`;
    else str += `${key.toUpperCase()}:${extra[key]}|`;
  }
  if (str.substr(str.length - 1) == '|') str = str.substring(0, str.length - 1);
  return str;
}

export function getBalanceEnvelope(channelId: string, channelPassword: string) {
  return `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.chan.mx/">
        <soapenv:Header/>
        <soapenv:Body>
          <ws:datos>
            <claveCanal>${channelId}</claveCanal>
            <passCanal>${channelPassword}</passCanal>
          </ws:datos>
        </soapenv:Body>
      </soapenv:Envelope>
        `;
}

export function getSaleEnvelope(channelId: string, channelPassword: string, purchaseInfo: IPurchaseRequest, isExternalBalance: boolean = false) {
  const { id, terminalNo, productId, destination, amount, extra } = purchaseInfo;
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.chan.mx/">
      <soapenv:Header/>
      <soapenv:Body>
        ${isExternalBalance ? '<ws:consulta>' : '<ws:venta>'}
             <id>${id}</id>
             <claveCanal>${channelId}</claveCanal>
             <passCanal>${channelPassword}</passCanal>
             <terminal>${terminalNo}</terminal>
             <producto>${productId}</producto>
             <destino>${destination}</destino>
             <monto>${!!amount ? amount : ''}</monto>
             ${!!extra ? '<extra>' + extraObjToString(extra) + '</extra>' : '<extra/>'}
        ${isExternalBalance ? '</ws:consulta>' : '</ws:venta>'}
      </soapenv:Body>
    </soapenv:Envelope>`;
}

export function getReversalEnvelope(channelId: string, channelPassword: string, purchaseInfo: IPurchaseRequest) {
  let { id, terminalNo, productId, destination, amount, extra } = purchaseInfo;
  if ((!destination || destination === '0') && !!extra.pin) destination = extra.pin;
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.chan.mx/">
      <soapenv:Header/>
      <soapenv:Body>
        <ws:reverso>
             <id>${id}</id>
             <claveCanal>${channelId}</claveCanal>
             <passCanal>${channelPassword}</passCanal>
             <terminal>${terminalNo}</terminal>
             <producto>${productId}</producto>
             <destino>${destination}</destino>
             <monto>${amount}</monto>
             ${!!extra ? '<extra>' + extraObjToString(extra) + '</extra>' : '<extra/>'}
          </ws:reverso>
      </soapenv:Body>
    </soapenv:Envelope>`;
}
