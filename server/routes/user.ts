import express from 'express';
import User from '../controllers/user';
const router = express.Router();

router.post('/', User.create)