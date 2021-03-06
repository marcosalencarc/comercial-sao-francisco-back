import { Router } from 'express';
import usersRouter from './users.routes';
import productsRouter from './products.routes';
import categoriesRouter from './categories.routes';
import providersRoutes from './providers.routes';
import brandsRouter from './brands.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/products', productsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/providers', providersRoutes);
routes.use('/brands', brandsRouter);

export default routes;
