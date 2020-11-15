import express from 'express';
import * as users from './users';
import * as sudoku from './sudoku';

const router = express.Router();

router.post('/users', users.join);
router.get('/users/valid', users.valid);
router.post('/users/login', users.login);

router.get('/sudoku/sugoku', users.authMiddleware, sudoku.getSugoku);
router.post('/sudoku/sugoku/solve', users.authMiddleware, sudoku.getSolve);
router.post('/sudoku', users.authMiddleware, sudoku.createSudoku)
      .get('/sudoku', users.authMiddleware, sudoku.getSudoku)
      .put('/sudoku', users.authMiddleware, sudoku.updateSudoku);
router.get('/v2/sudoku/solution', sudoku.getSudokuSolutionV2);

export default router;
