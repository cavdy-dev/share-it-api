import express from 'express';
import userRoute from './userRoutes';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to our API'
  });
});

router.use('/api/v1/auth', userRoute);

router.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route Not Found'
  });
});

export default router;
