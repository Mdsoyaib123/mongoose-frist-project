import express, { Application } from 'express';
const app: Application = express();
import cors from 'cors';
import { studentRoute } from './app/modules/student/student.route';
import { userRoutes } from './app/modules/user/user.route';

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students',studentRoute);
app.use('/api/v1/users',userRoutes);



export default app;
