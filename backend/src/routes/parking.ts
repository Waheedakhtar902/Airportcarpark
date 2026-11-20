import { Router } from 'express';
import { parseParkingQuery, ValidationError } from '../lib/validation.js';
import { getParkingProducts, UpstreamError } from '../services/qapClient.js';
import { sendError } from '../lib/respond.js';

export const parkingRouter = Router();

/**
 * GET /api/parking/products?airport=MAN&departure=dd-mm-YYYY hh:mm&arrival=…[&discount_code=…][&sku=…]
 * Returns the provider's response format: { success, response_code, message, data[] }.
 */
parkingRouter.get('/products', async (req, res) => {
  res.set('Cache-Control', 'no-store');

  let query;
  try {
    query = parseParkingQuery(req.query as Record<string, unknown>);
  } catch (err) {
    if (err instanceof ValidationError) return sendError(res, 400, err.message);
    throw err;
  }

  try {
    const result = await getParkingProducts(query);
    res.status(result.status).json(result.body);
  } catch (err) {
    if (err instanceof UpstreamError) return sendError(res, err.status, err.message);
    throw err;
  }
});
