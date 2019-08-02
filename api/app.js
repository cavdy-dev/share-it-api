import express from 'express';
import bodyParser from 'body-parser';
import authRoute from './routes/authRoute';

const app = express();
const PORT = process.env.PORT || 8500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// USE ROUTES
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
