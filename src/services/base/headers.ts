import { environment } from './../../environment';

export const url = environment.soapUrl + '/';

export function getHeaders(method: string) {
  return {
    'user-agent': 'sampleTest',
    'Content-Type': 'text/xml;charset=UTF-8',
    soapAction: `${environment.soapUrl}.wsdl#${method}`
  };
}
