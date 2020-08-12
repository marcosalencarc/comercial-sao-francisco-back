import { Router } from 'express';

const productsRouter = Router();

/**
 * Repositories
 * Services
 */

productsRouter.get('/', async (request, response) => {
  try {
    return response.json({ message: 'Hello' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});


export default productsRouter;
