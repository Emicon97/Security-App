import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';

import userRoutes from './routes/user';
import todosRoutes from './routes/toDos'

const app = express();

app.set('port', config.PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(userRoutes);
app.use(todosRoutes);

export default app;