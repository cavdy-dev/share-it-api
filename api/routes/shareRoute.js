import express from 'express';
import shareController from '../controllers/shareController';
import jwt from '../middleware/jwt';

const router = express.Router();

const { createIdea } = shareController;
const { checkToken, verifyToken } = jwt;

router.post('/idea', checkToken, verifyToken, createIdea);

export default router;
