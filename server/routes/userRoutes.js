import express from 'express';
import userController from '../controllers/userController';
import userValidation from '../middlewares/validations/userValidation';
import headers from '../middlewares/headers';
import check from '../middlewares/check';

const { createUser, loginUser } = userController;
const { generateToken, clientKey } = headers;
const { checkIfEmailExist, checkIfEmailDontExist } = check;

const router = express.Router();

router.post(
  '/register',
  clientKey,
  userValidation,
  checkIfEmailExist,
  generateToken,
  createUser
);
router.post(
  '/login',
  clientKey,
  userValidation,
  checkIfEmailDontExist,
  generateToken,
  loginUser
);

export default router;
