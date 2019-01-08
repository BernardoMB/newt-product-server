//Routes
/**
 * @api {get} /api/balance GET
 * @apiName GetExternalBalance
 * @apiGroup Balance
 *
 * @apiDescription Gets the external balance for the channel (Newt) in the third party account (NewVision).
 *
 * @apiSuccess (200) {Object} balance       The current balance, limit, and date of the request.
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "balance": {
 *     "balance": 478299.5,
 *     "limit": 999999,
 *     "date": "2019-01-08T16:46:25.538Z"
 *   }
 * }
 */
