import express from 'express';
import userController from '../controllers/userController';
import Validation from '../middlewares/validations/userValidation';
import headers from '../middlewares/headers';
import check from '../middlewares/check';

const { createUser, loginUser } = userController;
const { generateToken, clientKey } = headers;
const {
  checkIfEmailExist,
  checkIfUsernameExist,
  checkIfEmailDontExist
} = check;
const { userSignupValidation, userLoginValidation } = Validation;

const router = express.Router();

router.post(
  '/register',
  clientKey,
  userSignupValidation,
  checkIfUsernameExist,
  checkIfEmailExist,
  generateToken,
  createUser
);
router.post(
  '/login',
  clientKey,
  userLoginValidation,
  checkIfEmailDontExist,
  generateToken,
  loginUser
);

export default router;
