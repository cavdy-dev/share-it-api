import express from 'express';
import userController from '../controllers/userController';
import userValidation from '../middlewares/validations/userValidation';
import headers from '../middlewares/headers';
import check from '../middlewares/check';

const { createUser } = userController;
const { generateToken, clientKey } = headers;
const { checkIfEmailExist } = check;

const router = express.Router();

router.post(
  '/register',
  clientKey,
  userValidation,
  checkIfEmailExist,
  generateToken,
  createUser
);

export default router;
