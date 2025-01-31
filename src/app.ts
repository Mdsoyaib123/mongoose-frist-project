import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHan from './app/middlware/globalErrorHan';
import notFound from './app/middlware/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {};
app.get('/', test);

// global error handle
app.use(globalErrorHan);

// Not Found
app.use(notFound);

export default app;
