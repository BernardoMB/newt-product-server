import { checkSchema, param } from 'express-validator/check';

/**
 * @apiDefine NewPurchaseFieldsError
 *
 * @apiError (422) NewPurchaseFieldsInvalid The fields for the new purchase payload are missing or incorrect.
 *
 * @apiErrorExample {json} NewPurchaseFieldsInvalid (1):
 * HTTP/1.1 422 Unprocessable Entity
 * {
 *     "message": "(POST) /api/purchase | Invalid request: 4 errors occured",
 *     "errors": [
 *         "body[productId] = undefined | Product productId field must be present",
 *         "body[user] = undefined | User id must be present",
 *         "body[destination] = undefined | Must be a valid positive number",
 *         "body[amount] = undefined | Amount must be a valid positive number"
 *     ],
 *     "code": 422
 * }
 * @apiErrorExample {json} NewPurchaseFieldsInvalid (2):
 * HTTP/1.1 422 Unprocessable Entity
 * {
 *   "message": "(POST) /api/purchase | Invalid request: 4 errors occured",
 *   "errors": [
 *       "body[user] = invalidobjectid | User id must be a valid mongoId",
 *       "body[destination] = ffffff | Must be a valid positive number",
 *       "body[amount] = -4 | Amount must be a valid positive number",
 *       "body[comment] = 0 | Comment must be a valid string"
 *   ],
 *   "code": 422
 * }
 */
export const newPurchaseFieldsValidator = checkSchema({
  productId: {
    in: ['body'],
    exists: {
      errorMessage: 'Product productId field must be present'
    },
    isString: {
      errorMessage: 'Product productId field must be a valid non whitespace string'
    },
    trim: true
  },
  user: {
    in: ['body'],
    exists: {
      errorMessage: 'User id must be present'
    },
    isMongoId: {
      errorMessage: 'User id must be a valid mongoId'
    }
  },
  destination: {
    in: ['body'],
    errorMessage: 'Must be a valid string identifier',
    isString: true,
    trim: true
  },
  amount: {
    in: ['body'],
    errorMessage: 'Amount must be a valid positive number',
    isCurrency: {
      options: {
        allow_negatives: false
      }
    },
    toFloat: true
  },
  comment: {
    in: ['body'],
    errorMessage: 'Comment must be a valid string',
    optional: true,
    isString: true,
    trim: true
  }
});

/**
 * @apiDefine ExternalIdError
 *
 * @apiError (422) ExternalIdInvalid The <code>id</code> for the request is not a external id.
 *
 * @apiErrorExample {json} ExternalIdInvalid:
 * HTTP/1.1 422 Unprocessable Entity
 * {
 *     "message": "(GET) /api/purchase/externalId/56 | Invalid request: 1 error occured",
 *     "errors": [
 *         "params[externalId] = 56 | Specified param extenralId is invalid, must be a 12 digit number as a string"
 *     ],
 *     "code": 422
 * }
 */
export const externalIdValidator = param(
  'externalId',
  'Specified param extenralId is invalid, must be a 12 digit number as a string'
)
  .isString()
  .isLength({ min: 12, max: 12 });
