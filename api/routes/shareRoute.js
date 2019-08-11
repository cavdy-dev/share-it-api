import express from 'express';
import shareController from '../controllers/shareController';
import jwt from '../middleware/jwt';
import validate from '../middleware/validate';

const router = express.Router();

const { createIdea, updateIdea, deleteIdea } = shareController;
const { checkToken, verifyToken } = jwt;
const { checkifIdeaExist, checkifUser } = validate;

router.post('/idea', checkToken, verifyToken, createIdea);
router.patch(
  '/idea/:ideaId',
  checkToken,
  verifyToken,
  checkifIdeaExist,
  checkifUser,
  updateIdea
);
router.delete(
  '/idea/:ideaId',
  checkToken,
  verifyToken,
  checkifIdeaExist,
  checkifUser,
  deleteIdea
);

export default router;
