import express, { Application } from 'express';
const app: Application = express();
import cors from 'cors';
import { studentRoute } from './app/modules/student/student.route';
import { userRoutes } from './app/modules/user/user.route';
import globalErrorHan from './app/middlware/globalErrorHan';
import notFound from './app/middlware/notFound';
import router from './app/routes';



// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);



// global error handle
app.use(globalErrorHan);

// Not Found
app.use(notFound);

export default app;
