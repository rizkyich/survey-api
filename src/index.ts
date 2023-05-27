import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import surveyRoutes from './routes/survey.route';
import questionRoutes from './routes/question.route';
import responseRoutes from './routes/response.route';
import authRoutes from './routes/auth.route';

import errorHandler from './helpers/errorHandler';

dotenv.config();
const app: Application = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
  res.send("hello world")
})

app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/responses', responseRoutes);

// error handler
app.use(errorHandler)

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});
