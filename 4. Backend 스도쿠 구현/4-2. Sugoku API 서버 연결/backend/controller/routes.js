import express from 'express';
import * as users from './users';
import * as sudoku from './sudoku';

const router = express.Router();

router.post('/users', users.join);
router.get('/users/valid', users.valid);
router.post('/users/login', users.login);

router.get('/sudoku/sugoku', sudoku.getSugoku);
router.post('/sudoku/sugoku/solve', sudoku.getSolve);

export default router;
