//Errors

/**
 * @apiDefine PurchaseProductNotFoundError
 * @apiError (404) PurchaseProductNotFound No product for the purchase with the <code>productId</code> could be found.
 *
 * @apiErrorExample {json} PurchaseProductNotFound:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "(POST) /api/purchase | Error creating purchase: Product XKXKXK for purchase not found",
 *   "code": 404
 * }
 */

/**
 * @apiDefine PurchaseProductDoesNotSupportAmountError
 * @apiError (400) PurchaseProductDoesNotSupportAmount The specified <code>amount</code> is not supported by the product with <code>productId</code>.
 *
 * @apiErrorExample {json} PurchaseProductDoesNotSupportAmount:
 * HTTP/1.1 400 Bad Request
 * {
 *  "message": "(POST) /api/purchase | Error creating purchase: Specified amount: 20 for purchase not supported by product AIL",
 *  "code": 400
 * }
 */

/**
 * @apiDefine PurchaseNotFoundError
 *
 * @apiError (404) PurchaseNotFound No purchase with the specified identifier could be found.
 *
 * @apiErrorExample {json} PurchaseIdNotFound:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "(PUT) /api/product/5beb714fdf45f6e56009a24b |  Error finding purchase: Purchase item not found",
 *   "code": 404
 * }
 *
 * @apiErrorExample {json} PurchaseExternalIdNotFound:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "(PUT) /api/product/externalId/000000000007 |  Error finding purchase: Purchase item not found",
 *   "code": 404
 * }
 */

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

//Routes

/**
 * @api {post} /api/purchase CREATE
 * @apiName CreatePurchase
 * @apiGroup Purchase
 *
 * @apiDescription Creates a new purchase and forwards the purchase request to the thid party provider.
 * If the third party provider returns an error a new product is still returned, but with an error status
 * in its <code>statusLog</code>.
 *
 * @apiParam {Object} purchase The new purchse data to carry out the purchase operation with the third party.
 * @apiParamExample {json} Create product Request-Example:
 * {
 *	 "productId": "AIL",
 *	 "user": "5c1996e35e015bc3483c153b",
 *	 "amount": 300,
 *	 "destination": "5511829394",
 *	 "comment": "This should result in a succesful purchase object with a succesful status (1)"
 * }
 * @apiParamExample {json} Create product with third party error Request-Example:
 * {
 * 	 "productId": "AIL",
 * 	 "user": "5c1996e35e015bc3483c153b",
 * 	 "amount": 60,
 * 	 "destination": 5500000094,
 * 	 "comment": "This should result a response 200 but with an error status due to a NV error: rcode 03 'Usuario destino no esta registrado'"
 * }
 * @apiSuccess (200) {Object} product       The product that was inserted in the database.
 * @apiSuccessExample {json} Create product Success-Response:
 * {
 *  "purchase": {
 *      "_id": "5c1bfa07818aa0b36885534d",
 *      "productId": "AIL",
 *      "user": "5c1996e35e015bc3483c153b",
 *      "destination": "5511829394",
 *      "amount": 300,
 *      "comment": "This should result in a succesful purchase object with a succesful status (1)",
 *      "statusLog": [
 *          {
 *              "updatedAt": "2018-12-20T20:22:31.856Z",
 *              "code": 0,
 *              "message": "INIT_PURCHASE"
 *          },
 *          {
 *              "updatedAt": "2018-12-20T20:22:32.210Z",
 *              "code": 1,
 *              "message": "PURCHASE_SUCCEEDED"
 *          }
 *      ],
 *      "createdAt": "2018-12-20T20:22:31.868Z",
 *      "updatedAt": "2018-12-20T20:22:32.211Z",
 *      "externalId": "000000000009",
 *      "__v": 0
 *  }
 * }
 * @apiSuccessExample {json} Create purchase with third party error Response:
 * {
 *    "purchase": {
 *        "_id": "5c1bfcce818aa0b36885534e",
 *        "productId": "AIL",
 *        "user": "5c1996e35e015bc3483c153b",
 *        "destination": "5500000094",
 *        "amount": 60,
 *        "comment": "This should result a response 200 but with an error status due to a NV error: rcode 03 'Usuario destino no esta registrado'",
 *        "statusLog": [
 *            {
 *                "updatedAt": "2018-12-20T20:34:22.522Z",
 *                "code": 0,
 *                "message": "INIT_PURCHASE"
 *            },
 *            {
 *                "updatedAt": "2018-12-20T20:34:22.727Z",
 *                "code": 3,
 *                "message": "PURCHASE_FAILED: NewUision: \"Usuario destino no esta registrado\""
 *            }
 *        ],
 *        "createdAt": "2018-12-20T20:34:22.525Z",
 *        "updatedAt": "2018-12-20T20:34:22.727Z",
 *        "externalId": "000000000010",
 *        "__v": 0
 *    }
 * }
 *
 * @apiUse NewPurchaseFieldsError
 * @apiUse PurchaseProductNotFoundError
 * @apiUse PurchaseProductDoesNotSupportAmountError
 */

/**
 * @api {get} /api/purchase/:id GET
 * @apiName GetPurchaseById
 * @apiGroup Purchase
 *
 * @apiDescription Gets the purchase with the specified <code>id</code>.
 *
 * @apiParam {string} id Purchase unique <code>id</code>.
 *
 * @apiSuccess (200) {Object} purchase       The purchase with the specified <code>id</code>.
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "purchase": {
 *         "_id": "5c199729cfa9d647882640a9",
 *         "productId": "AIL",
 *         "user": "5c1996e35e015bc3483c153b",
 *         "destination": "5529714880",
 *         "amount": 200,
 *         "comment": "super padre",
 *         "statusLog": [
 *             {
 *                 "updatedAt": "2018-12-19T00:56:09.231Z",
 *                 "code": 0,
 *                 "message": "INIT_PURCHASE"
 *             }
 *         ],
 *         "createdAt": "2018-12-19T00:56:09.251Z",
 *         "updatedAt": "2018-12-19T00:56:09.251Z",
 *         "externalId": "000000000001",
 *         "__v": 0
 *     }
 * }
 *
 * @apiUse MongoIdError
 * @apiUse PurchaseNotFoundError
 */

/**
 * @api {get} /api/purchase/externalId/:externalId GET
 * @apiName GetPurchaseByExternalId
 * @apiGroup Purchase
 *
 * @apiDescription Gets the purchase with the specified <code>externalId</code>.
 *
 * @apiParam {string} externalId Purchase unique <code>externalId</code>.
 *
 * @apiSuccess (200) {Object} purchase       The purchase with the specified <code>externalId</code>.
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "purchase": {
 *         "_id": "5c199729cfa9d647882640a9",
 *         "productId": "AIL",
 *         "user": "5c1996e35e015bc3483c153b",
 *         "destination": "5529714880",
 *         "amount": 200,
 *         "comment": "super padre",
 *         "statusLog": [
 *             {
 *                 "updatedAt": "2018-12-19T00:56:09.231Z",
 *                 "code": 0,
 *                 "message": "INIT_PURCHASE"
 *             }
 *         ],
 *         "createdAt": "2018-12-19T00:56:09.251Z",
 *         "updatedAt": "2018-12-19T00:56:09.251Z",
 *         "externalId": "000000000001",
 *         "__v": 0
 *     }
 * }
 *
 * @apiUse ExternalIdError
 * @apiUse PurchaseNotFoundError
 */

/**
 * @api {get} /api/purchase/user/:id GET
 * @apiName GetPurchasesByClientId
 * @apiGroup Purchase
 *
 * @apiDescription Gets all the purchase associated to a specified client <code>id</code>.
 *
 * @apiParam {string} id Client unique <code>id</code>.
 *
 * @apiSuccess (200) {Object[]} purchases       The purchases with the specified client <code>id</code>.
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "purchases": [
 *      {
 *          "_id": "5c199729cfa9d647882640a9",
 *          "productId": "AIL",
 *          "user": "5c1996e35e015bc3483c153b",
 *          "destination": "5529714880",
 *          "amount": 200,
 *          "comment": "super great",
 *          "statusLog": [
 *              {
 *                  "updatedAt": "2018-12-19T00:56:09.231Z",
 *                  "code": 0,
 *                  "message": "INIT_PURCHASE"
 *              }
 *          ],
 *          "createdAt": "2018-12-19T00:56:09.251Z",
 *          "updatedAt": "2018-12-19T00:56:09.251Z",
 *          "externalId": "000000000001",
 *          "__v": 0
 *      },
 *      {
 *          "_id": "5c1a5522babc4291c8286293",
 *          "productId": "AYN",
 *          "user": "5c1996e35e015bc3483c153b",
 *          "destination": "5529714880",
 *          "amount": 20,
 *          "comment": "super nice",
 *          "statusLog": [
 *              {
 *                  "updatedAt": "2018-12-19T14:26:42.762Z",
 *                  "code": 0,
 *                  "message": "INIT_PURCHASE"
 *              },
 *              {
 *                  "updatedAt": "2018-12-19T14:26:43.155Z",
 *                  "code": 1,
 *                  "message": "PURCHASE_SUCCEEDED"
 *              }
 *          ],
 *          "createdAt": "2018-12-19T14:26:42.782Z",
 *          "updatedAt": "2018-12-19T14:26:43.159Z",
 *          "externalId": "000000000002",
 *          "__v": 0
 *      },
 *      {
 *          "_id": "5c1a6305babc4291c8286294",
 *          "productId": "ADA",
 *          "user": "5c1996e35e015bc3483c153b",
 *          "destination": "5500000099",
 *          "amount": 10,
 *          "comment": "super cool",
 *          "statusLog": [
 *              {
 *                  "updatedAt": "2018-12-19T15:25:57.248Z",
 *                  "code": 0,
 *                  "message": "INIT_PURCHASE"
 *              },
 *              {
 *                  "updatedAt": "2018-12-19T15:25:57.602Z",
 *                  "code": 3,
 *                  "message": "PURCHASE_FAILED: NewUision: \"Usuario destino no esta registrado\""
 *              }
 *          ],
 *          "createdAt": "2018-12-19T15:25:57.252Z",
 *          "updatedAt": "2018-12-19T15:25:57.602Z",
 *          "externalId": "000000000003",
 *          "__v": 0
 *      },
 *  ]
 * }
 *
 * @apiUse MongoIdError
 */
