import express, { Application } from 'express';

import surveyRoutes from './routes/survey.route';
import userRoutes from './routes/user.route';
import questionRoutes from './routes/question.route';
import responseRoutes from './routes/response.route';
import authRoutes from './routes/auth.route';

import errorHandler from './helpers/errorHandler';

const app: Application = express();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api', questionRoutes);
app.use('/api', responseRoutes);

// error handler
app.use(errorHandler)

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
