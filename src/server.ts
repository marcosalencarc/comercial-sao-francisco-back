import 'reflect-metadata';

import express, { json } from 'express';
import cors from 'cors';
import routes from './routes';

//import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Started on port 3333!');
});
