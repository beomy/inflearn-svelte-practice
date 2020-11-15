import express from 'express';
import * as users from './users';

const router = express.Router();

router.post('/users', users.join);
router.get('/users/valid', users.valid);

export default router;
