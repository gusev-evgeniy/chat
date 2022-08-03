import express from 'express';

import User from '../controllers/user';

import Auth from '../middleware/auth';

const router = express.Router();

router.post('/', User.create);
router.get('/me', Auth, User.me);

export default router;
