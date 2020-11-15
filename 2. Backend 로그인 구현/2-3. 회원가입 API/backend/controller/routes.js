import express from 'express';
import * as users from './users';

const router = express.Router();

router.post('/users', users.join);

export default router;
