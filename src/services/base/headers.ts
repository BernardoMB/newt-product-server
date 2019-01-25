export function getHeaders(method: string) {
  return {
    'user-agent': 'sampleTest',
    'Content-Type': 'text/xml;charset=UTF-8',
    soapAction: `${process.env.SOAP_URL}.wsdl#${method}`
  };
}

export function getUrl() {
  return process.env.SOAP_URL + '/';
}