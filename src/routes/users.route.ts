import express from 'express';
import UserController from '../controllers/users.controller';

const router = express.Router();

// User Registration
router.post('/register', UserController.register);

// User Login
router.post('/login', UserController.login);

export default router;
