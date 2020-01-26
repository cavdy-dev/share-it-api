import express from 'express';
import userController from '../controllers/userController';
import userValidation from '../middlewares/validations/userValidation';

const { createUser } = userController;

const router = express.Router();

router.post('/register', userValidation, createUser);

export default router;
