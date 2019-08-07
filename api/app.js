import express from 'express';
import bodyParser from 'body-parser';
import authRoute from './routes/authRoute';
import shareRoute from './routes/shareRoute';

const app = express();
const PORT = process.env.PORT || 8500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// USE ROUTES
app.use('/api/auth', authRoute);
app.use('/api', shareRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
