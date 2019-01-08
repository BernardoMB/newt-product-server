//Errors

/**
 * @apiDefine MongoIdError
 *
 * @apiError (422) ObjectIdInvalid The <code>id</code> for the request is not a correct MongoDb ObjectId.
 *
 * @apiErrorExample {json} ObjectIdInvalid:
 * HTTP/1.1 422 Unprocessable Entity
 * {
 *   "message": "(PUT) /api/product/asd | Invalid request: 1 error occured",
 *   "errors": [
 *    "params[id] = asd | Specified param Id is invalid, must be an ObjectId",
 *   ],
 *   "code": 422
 * }
 */

/**
 * @apiDefine IntIdError
 *
 * @apiError (422) IntIdInvalid The <code>id</code> for the request is not a correct integer id.
 */
