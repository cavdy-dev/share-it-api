import express from 'express';
import authController from '../controllers/authController';
import authValidation from '../validations/authValidation';

const {
  signupValidation,
  loginValidation
} = authValidation;

const router = express.Router();

router.post(
  '/register',
  signupValidation,
  authController.register
);
router.post(
  '/login',
  loginValidation,
  authController.login
);

export default router;
