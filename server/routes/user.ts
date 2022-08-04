import express from 'express';

import User from '../controllers/user';

import Auth from '../middleware/auth';
import Upload from '../middleware/multer';

const router = express.Router();

router.post('/', Upload.single('photo'), User.create);
router.get('/me', Auth, User.me);

export default router;
