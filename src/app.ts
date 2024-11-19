import express, { Application } from 'express';
const app: Application = express();
import cors from 'cors';
import { studentRoute } from './app/modules/student/student.route';

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students',studentRoute);



export default app;
