//Errors

/**
 * @apiDefine ProductNotFoundError
 *
 * @apiError (404) ProductNotFound No product with the <code>id</code> could be found.
 *
 * @apiErrorExample {json} ProductNotFound:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "(PUT) /api/product/5beb714fdf45f6e56009a24b |  Error updating product: Product not found",
 *   "code": 404
 * }
 */

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
 *         "body[productId] = undefined | Product productId field must be present",
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
 *        "body[productId] = 0 | Product productId field must be a valid non whitespace string",
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

//Routes

/**
 * @api {post} /api/product CREATE
 * @apiPrivate
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiPermission admin
 *
 * @apiDescription Creates the product provided as a payload.
 *
 * @apiHeader {String} Authorization Admin user unique access jwt token.
 * @apiParam {Object} product The new product data to update the product with the given <code>id</code>.
 * @apiParamExample {json} Create product Request-Example:
 * {
 *   "name": "MOVISTAR",
 *   "productId": "A",
 *   "kind": 0,
 *   "amounts": [
 *     {
 *       "amount": 10,
 *       "description": ""
 *     },
 *     {
 *       "amount": 30,
 *       "description": ""
 *     },
 *     {
 *       "amount": 60,
 *       "description": ""
 *     },
 *     {
 *       "amount": 80,
 *       "description": ""
 *     },
 *     {
 *       "amount": 120,
 *       "description": ""
 *     },
 *     {
 *       "amount": 200,
 *       "description": ""
 *     },
 *     {
 *       "amount": 300,
 *       "description": ""
 *     }
 *   ],
 *   "providerId": "NEW-VISION",
 *   "paymentCurrency": "MXN",
 *   "icon": "BASE64ICON OR URL",
 *   "extra": {},
 *   "timeout": 60000,
 *   "supportsReversal": false,
 *   "supportsCheckStatus": false,
 *   "observation": "Original comment",
 * }
 *
 * @apiSuccess (200) {Object} product       The product that was inserted in the database.
 * @apiSuccessExample {json} Create product Success-Response:
 * {
 *   "_id": "5c1996e35e015bc3483c153b",
 *   "name": "MOVISTAR",
 *   "productId": "A",
 *   "kind": 0,
 *   "amounts": [
 *     {
 *       "amount": 10,
 *       "description": ""
 *     },
 *     {
 *       "amount": 30,
 *       "description": ""
 *     },
 *     {
 *       "amount": 60,
 *       "description": ""
 *     },
 *     {
 *       "amount": 80,
 *       "description": ""
 *     },
 *     {
 *       "amount": 120,
 *       "description": ""
 *     },
 *     {
 *       "amount": 200,
 *       "description": ""
 *     },
 *     {
 *       "amount": 300,
 *       "description": ""
 *     }
 *   ],
 *   "providerId": "NEW-VISION",
 *   "paymentCurrency": "MXN",
 *   "icon": "BASE64ICON OR URL",
 *   "extra": {},
 *   "timeout": 60000,
 *   "supportsReversal": false,
 *   "supportsCheckStatus": false,
 *   "observation": "Original comment",
 * }
 *
 * @apiUse AuthenticationHeaderError
 * @apiUse AuthenticationError
 * @apiUse ProductFieldsError
 */

/**
 * @api {put} /api/product/:id UPDATE
 * @apiPrivate
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiPermission admin

 * @apiDescription Overrides the product with the specified <code>id</code> field with the payload.
 *
 * @apiHeader {String} Authorization Admin user unique access jwt token.
 * @apiParam {string} id Product unique <code>id</code>.
 * @apiParam {Object} product The new product data to update the product with the given <code>id</code>.
 * @apiParamExample {json} Update product Request-Example:
 * {
 *   "_id": "5c1996e35e015bc3483c153b",
 *   "name": "MOVISTAR",
 *   "productId": "A",
 *   "kind": 0,
 *   "amounts": [
 *     {
 *       "amount": 10,
 *       "description": ""
 *     },
 *     {
 *       "amount": 30,
 *       "description": ""
 *     },
 *     {
 *       "amount": 60,
 *       "description": ""
 *     },
 *     {
 *       "amount": 80,
 *       "description": ""
 *     },
 *     {
 *       "amount": 120,
 *       "description": ""
 *     },
 *     {
 *       "amount": 200,
 *       "description": ""
 *     },
 *     {
 *       "amount": 300,
 *       "description": ""
 *     }
 *   ],
 *   "providerId": "NEW-VISION",
 *   "paymentCurrency": "MXN",
 *   "icon": "BASE64ICON OR URL",
 *   "extra": {},
 *   "timeout": 60000,
 *   "supportsReversal": false,
 *   "supportsCheckStatus": false,
 *   "observation": "Updated comment",
 * }
 *
 * @apiSuccess (201) {Object} product       The updated product.
 * @apiSuccessExample {json} Succes-Response:
 * {
 *  "product": {
 *     "_id": "5c1996e35e015bc3483c153b",
 *     "name": "MOVISTAR",
 *     "productId": "A",
 *     "kind": 0,
 *     "amounts": [
 *       {
 *         "amount": 10,
 *         "description": ""
 *       },
 *       {
 *         "amount": 30,
 *         "description": ""
 *       },
 *       {
 *         "amount": 60,
 *         "description": ""
 *       },
 *       {
 *         "amount": 80,
 *         "description": ""
 *       },
 *       {
 *         "amount": 120,
 *         "description": ""
 *       },
 *       {
 *         "amount": 200,
 *         "description": ""
 *       },
 *       {
 *         "amount": 300,
 *         "description": ""
 *       }
 *     ],
 *     "providerId": "NEW-VISION",
 *     "paymentCurrency": "MXN",
 *     "icon": "BASE64ICON OR URL",
 *     "extra": {},
 *     "timeout": 60000,
 *     "supportsReversal": false,
 *     "supportsCheckStatus": false,
 *     "observation": "Updated comment"
 *   }
 * }
 * @apiUse AuthenticationHeaderError
 * @apiUse AuthenticationError
 * @apiUse MongoIdError
 * @apiUse ProductNotFoundError
 * @apiUse ProductFieldsError
 */

/**
 * @api {delete} /api/product/:id DELETE
 * @apiPrivate
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission admin
 *
 * @apiDescription Deletes the product with the specified <code>id</code> field.
 *
 * @apiHeader {String} Authorization Admin user unique access jwt token.
 * @apiParam {string} id Product unique <code>id</code>.
 *
 * @apiSuccess (200) {string} id       The <code>id</code> of the product that was deleted.
 *
 * @apiUse AuthenticationHeaderError
 * @apiUse AuthenticationError
 * @apiUse MongoIdError
 * @apiUse ProductNotFoundError
 */

/**
 * @api {get} /api/product GETALL
 * @apiName GetProducts
 * @apiGroup Product
 *
 * @apiDescription Gets all products in the catalogue.
 *
 * @apiSuccess (200) {Object[]} products       List of products in the catalogue.
 */

/**
 * @api {get} /api/product/:id GET
 * @apiName GetProductById
 * @apiGroup Product
 *
 * @apiDescription Gets the product with the specified <code>id</code>.
 *
 * @apiParam {string} id Product unique <code>id</code>.
 *
 * @apiSuccess (200) {Object} product       The product with the specified <code>id</code>.
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "product": {
 *    "_id": "5c1996e35e015bc3483c153b",
 *    "name": "MOVISTAR",
 *    "productId": "A",
 *    "kind": 0,
 *    "amounts": [
 *      {
 *        "amount": 10,
 *        "description": ""
 *      },
 *      {
 *        "amount": 30,
 *        "description": ""
 *      },
 *      {
 *        "amount": 60,
 *        "description": ""
 *      },
 *      {
 *        "amount": 80,
 *        "description": ""
 *      },
 *      {
 *        "amount": 120,
 *        "description": ""
 *      },
 *      {
 *        "amount": 200,
 *        "description": ""
 *      },
 *      {
 *        "amount": 300,
 *        "description": ""
 *      }
 *    ],
 *    "providerId": "NEW-VISION",
 *    "paymentCurrency": "MXN",
 *    "icon": "BASE64ICON OR URL",
 *    "extra": {},
 *    "timeout": 60000,
 *    "supportsReversal": false,
 *    "supportsCheckStatus": false,
 *    "observation": "Alcanzando 30s se declina la recarga",
 *  }
 * }
 *
 * @apiUse MongoIdError
 * @apiUse ProductNotFoundError
 */
