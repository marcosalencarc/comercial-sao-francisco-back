import { Router } from 'express';
import usersRouter from './users.routes';
import productsRouter from './products.routes';
import categoriesRouter from './categories.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/products', productsRouter);
routes.use('/categories', categoriesRouter);

export default routes;
