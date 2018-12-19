import { parseString } from 'xml2js';
import { toCamelCase, castValue } from '../../helpers/formatHelpers';
import {
  ISaleStatusResponse,
  IBalanceResponse
} from '../../models/interfaces/IResponse';

export function getErrorMessageFromRCode(rcode: string): string {
  switch (rcode) {
    case '01':
      return 'Usuario no esta registrado.';
    case '02':
      return 'Llave secreta invalida.';
    case '03':
      return 'Usuario destino no esta registrado';
    case '04':
      return 'Monto invalido.';
    case '05':
      return 'Saldo insuficiente, intente por un monto menor.';
    case '06':
      return 'Usuario desconocido.';
    case '07':
      return 'No se puede registrar al usuario.';
    case '08':
      return 'Usuario ya esta registrado.';
    case '09':
      return 'Cambio externo en los datos.';
    case '10':
      return 'La nueva clave es identica a la anterior.';
    case '11':
      return 'No se permite la venta a si mismo.';
    case '12':
      return 'No se permite la transferencia a si mismo.';
    case '13':
      return 'No se puede realizar la recarga.';
    case '14':
      return 'Operacion no permitida.';
    case '15':
      return 'Usuario esta bloqueado.';
    case '16':
      return 'Limite de transferencia excedido.';
    case '17':
      return 'Ningun cargador ha autorizado.';
    case '18':
      return 'Ningun cargador ha respondido la llamada.';
    case '19':
      return 'No tiene cargadores registrados.';
    case '20':
      return 'El servidor de prepago no responde.';
    case '21':
      return 'El servidor de prepago no esta disponible.';
    case '22':
      return 'Destino no es un telefono de prepago.';
    case '23':
      return 'Telefono en uso.';
    case '24':
      return 'Telefono Destino en uso.';
    case '25':
      return 'El usuario destino esta bloqueado.';
    case '26':
      return 'Venta reciente de este punto a ese destino.';
    case '27':
      return 'El maximo de compras diarias ha sido realizado.';
    case '28':
      return 'Limite de credito excedido.';
    case '29':
      return 'El producto solicitado esta agotado.';
    case '30':
      return 'Transaccion fuera de horario.';
    case '31':
      return 'Codigo de proveedor invalido.';
    case '32':
      return 'No se puede revertir este producto.';
    case '33':
      return 'Producto no asignado.';
    case '34':
      return 'Producto temporalmente no disponible.';
    case '35':
      return 'Servicio no disponible.';
    case '36':
      return 'Comision invalida para el producto seleccionado, contacte al distribuidor.';
    case '37':
      return 'Producto seleccionado no tiene comision, contacte al distribuidor.';
    case '38':
      return 'Demasiados documentos.';
    case '39':
      return 'Petición duplicada.';
    case '40':
      return 'Tiene una suscripción vigente, espere 24h.';
    case '50':
      return 'Error interno. Favor de notificar al operador.';
    case '51':
      return 'Base de datos no disponible.';
    case '52':
      return 'No ha pasado el periodo minimo de activacion.';
    case '53':
      return 'El destino no ha pasado el periodo minimo de activacion.';
    case '54':
      return 'Ya no puede hacer mas peticiones de este tipo.';
    case '55':
      return 'Producto no disponible por el momento.';
    case '56':
      return 'El cliente tiene compras demasiado recientes.';
    case '60':
      return 'Retener tarjeta del cliente.';
    case '61':
      return 'Por favor llamar a la emisora de la tarjeta.';
    case '62':
      return 'Código de seguridad inválido.';
    case '63':
      return 'Operación denegada.';
    case '64':
      return 'Terminal inválida.';
    case '86':
      return 'Operacion fue revertida.';
    case '87':
      return 'Operacion no fue procesada.';
    case '88':
      return 'Operacion en progreso.';
    case '89':
      return 'Operacion no encontrada.';
    case '90':
      return 'El mensaje no pudo ser recibido en su totalidad.';
    case '91':
      return 'El mensaje no tiene todos los datos necesarios.';
    case '92':
      return 'El mensaje contiene informacion de sobra.';
    case '93':
      return 'No se puede enviar la respuesta.';
    case '94':
      return 'Por favor intente de nuevo en 5 minutos.';
    case '95':
      return 'Cuenta con una suscripicion vigente, espere 24hrs.';
    case '99':
      return 'Mensaje invalido.';
    case '102':
      return 'Limite de intentos de PIN erroneo; usuario ha sido bloqueado.';
    case '103':
      return 'Su saldo ha expirado.';
    case '104':
      return 'Datos no coinciden con lo indicado en la petición.';
    case '105':
      return 'La pérdida ya ha sido reportada.';
    case '2029':
      return 'Punto de venta no tiene Region Telcel configurada.';
    case '9900':
      return 'Respuesta de concurso ACERTADA.';
    case '9901':
      return 'Respuesta de concurso ERRONEA.';
    case '9995':
      return 'Chiste enviado.';
    case '9996':
      return 'Tip de Amor enviado.';
    case '9997':
      return 'Tarot enviado.';
    case '9999':
      return 'Aviso enviado al proveedor.';
    default:
      return 'Error desconocido';
  }
}

export function parseExtraString(extra) {
  let obj = {};
  extra.split('|').forEach(el => {
    const kvp = el.split(':');
    if (kvp.length == 1) obj['pin'] = kvp[0];
    else obj[toCamelCase(kvp[0])] = castValue(kvp[1]);
  });
  return obj;
}

export function parseBalanceResponse(xml): Promise<IBalanceResponse> {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) reject(err);
      const almostResult =
        result['S:Envelope']['S:Body'][0]['ns2:respSaldo'][0];
      if (
        !!almostResult['$']['xsi:nil'] ||
        !almostResult['saldo'] ||
        almostResult['saldo'].length == 0 ||
        !almostResult['limite'] ||
        almostResult['limite'].length == 0
      )
        reject(new Error('Response does not include required fields'));
      else
        resolve({
          balance: parseFloat(almostResult['saldo'][0]),
          limit: parseFloat(almostResult['limite'][0])
        });
    });
  });
}

export function parseReversalResponse(xml): Promise<ISaleStatusResponse> {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) reject(err);
      const almostResult = result['S:Envelope']['S:Body'][0]['ns2:resp'][0];
      resolve({
        id: almostResult['id'][0],
        amount: parseFloat(almostResult['monto'][0]),
        rcode: almostResult['rcode'][0],
        date:
          !!almostResult['fecha'] && almostResult['fecha'].length > 0
            ? new Date(almostResult['fecha'][0])
            : undefined,
        confirmationCode:
          !!almostResult['confirma'] && almostResult['confirma'].length > 0
            ? almostResult['confirma'][0]
            : undefined,
        extra:
          !!almostResult['extra'] && almostResult['extra'].length > 0
            ? parseExtraString(almostResult['extra'][0])
            : undefined
      });
    });
  });
}

export function parseSaleStatusResponse(xml): Promise<ISaleStatusResponse> {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) reject(err);
      const almostResult = result['S:Envelope']['S:Body'][0]['ns2:resp'][0];
      resolve({
        id: almostResult['id'][0],
        amount: parseFloat(almostResult['monto'][0]),
        rcode: almostResult['rcode'][0],
        date:
          !!almostResult['fecha'] && almostResult['fecha'].length > 0
            ? new Date(almostResult['fecha'][0])
            : undefined,
        confirmationCode:
          !!almostResult['confirma'] && almostResult['confirma'].length > 0
            ? almostResult['confirma'][0]
            : undefined,
        extra:
          !!almostResult['extra'] && almostResult['extra'].length > 0
            ? parseExtraString(almostResult['extra'][0])
            : undefined
      });
    });
  });
}
