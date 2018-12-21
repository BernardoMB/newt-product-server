import { checkSchema } from 'express-validator/check';

/**
 * @apiDefine ProductFieldsError
 *
 * @apiError (422) ProductFieldsInvalid The fields for the product payload are missing or incorrect.
 *
 * @apiErrorExample {json} ProductFieldsInvalid (1):
 * HTTP/1.1 422 Unprocessable Entity
 * {
 *     "message": "(POST) /api/product | Invalid request: 8 errors occured",
 *     "errors": [
 *         "body[name] = undefined | Name field must be present",
 *         "body[code] = undefined | Product code field must be present",
 *         "body[amounts] = undefined | Must be an array of {amount(number), description(string)}",
 *         "body[providerId] = undefined | A provider id must be included",
 *         "body[paymentCurrency] = undefined | A valid currency must be specified",
 *         "body[timeout] = undefined | A timeout must be specified",
 *         "body[supportsReversal] = undefined | SupportsReversal field must be included",
 *         "body[supportsCheckStatus] = undefined | SupportsCheckStatus field must be included"
 *     ],
 *     "code": 422
 * }
 * @apiErrorExample {json} ProductFieldsInvalid (2):
 * HTTP/1.1 422 Unprocessable Entity
 * {
 *    "message": "(POST) /api/product | Invalid request: 7 errors occured",
 *    "errors": [
 *        "body[code] = 0 | Product code field must be a valid non whitespace string",
 *        "body[kind] = 55 | Product kind must be an int: 0, 1 or 2",
 *        "body[amounts[0].amount] = -1 | Amount must be a valid, positive number: e.g. 25,000 or 256.78",
 *        "body[providerId] = undefined | A provider id must be included",
 *        "body[paymentCurrency] = Wrong | PaymentCurrency field must be uppercase",
 *        "body[timeout] = -1 | Timeout field must be a positive integer",
 *        "body[observation] = 0 | Oservation field must be a valid string"
 *    ],
 *    "code": 422
 * }
 */
export const productFieldsValidator = checkSchema({
  name: {
    in: ['body'],
    exists: {
      errorMessage: 'Name field must be present'
    },
    isString: {
      errorMessage: 'Name field must be a valid non whitespace string'
    },
    trim: true
  },
  code: {
    in: ['body'],
    exists: {
      errorMessage: 'Product code field must be present'
    },
    isString: {
      errorMessage: 'Product code field must be a valid non whitespace string'
    },
    trim: true
  },
  kind: {
    in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'Product kind must be an int 0, 1 or 2',
      options: {
        min: 0,
        max: 2
      }
    },
    toInt: true
  },
  amounts: {
    in: ['body'],
    errorMessage: 'Must be an array of {amount(number), description(string)}',
    isArray: true
  },
  'amounts.*.amount': {
    in: ['body'],
    errorMessage: 'Amount must be a valid, positive number: e.g. 25,000 or 256.78',
    isCurrency: {
      options: {
        allow_negatives: false
      }
    },
    toFloat: true
  },
  'amounts.*.description': {
    in: ['body'],
    errorMessage: 'Description must be a valid string',
    isString: true,
    trim: true
  },
  providerId: {
    in: ['body'],
    exists: {
      errorMessage: 'A provider id must be included'
    },
    isString: {
      errorMessage: 'ProviderId field must be a valid non whitespace string'
    },
    trim: true
  },
  paymentCurrency: {
    in: ['body'],
    errorMessage: 'PaymentCurrency field must be a valid number, e.g "MXN", "USD", "CAD"',
    exists: {
      errorMessage: 'A valid currency must be specified'
    },
    isString: {
      errorMessage: 'A valid currency must be non whitespace string'
    },
    isUppercase: {
      errorMessage: 'PaymentCurrency field must be uppercase'
    },
    isLength: {
      errorMessage: 'PaymentCurrency field must only contain 3 characters',
      options: { min: 3, max: 3 }
    },
    trim: true
  },
  timeout: {
    in: ['body'],
    exists: {
      errorMessage: 'A timeout must be specified'
    },
    isInt: {
      errorMessage: 'Timeout field must be a positive integer',
      options: {
        gt: 0
      }
    },
    toInt: true
  },
  supportsReversal: {
    in: ['body'],
    errorMessage: 'SupportsReversal field must be a valid boolean',
    exists: {
      errorMessage: 'SupportsReversal field must be included'
    },
    isBoolean: true,
    toBoolean: true
  },
  supportsCheckStatus: {
    in: ['body'],
    errorMessage: 'SupportsCheckStatus field must be a valid boolean',
    exists: {
      errorMessage: 'SupportsCheckStatus field must be included'
    },
    isBoolean: true,
    toBoolean: true
  },
  observation: {
    in: ['body'],
    errorMessage: 'Oservation field must be a valid string',
    optional: true,
    isString: true,
    trim: true
  }
});
