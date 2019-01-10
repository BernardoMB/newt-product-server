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
 * @apiDefine AuthenticationHeaderError
 *
 * @apiError (422) AuthenticationHeaderError The <code>Authentication</code> header for the request is not present or invalid.
 *
 * @apiErrorExample {json} AuthenticationHeaderError:
 * HTTP/1.1 422 Unprocessable Entity
 * {
 *     "message": "(POST) /api/product | Invalid request: 1 error occured",
 *     "errors": [
 *         "headers[authorization] = undefined | [Authentication] header is not present or invalid"
 *     ],
 *     "code": 422
 * }
 */

/**
 * @apiDefine IntIdError
 *
 * @apiError (422) IntIdInvalid The <code>id</code> for the request is not a correct integer id.
 */

/**
 * @apiDefine AuthenticationError
 *
 * @apiError (401) AuthenticationError The provided jwt <code>token</code> does not match any authenticated users.
 *
 * @apiErrorExample {json} AuthenticationError:
 * HTTP/1.1 401 Unauthorized
 * {
 *    "message": "(POST) /api/product | Invalid request: User is not authenticated",
 *    "code": 401
 * }
 */
