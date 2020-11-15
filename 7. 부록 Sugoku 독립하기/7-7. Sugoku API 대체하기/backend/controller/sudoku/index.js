import * as sugoku from './sugoku';
import * as sudoku from './sudoku';
import Sudoku from '../../model/sudoku';
import createError from 'http-errors';

export async function getSugoku (req, res, next) {
  const { difficulty = 'easy' } = req.query;
  try {
    const result = await sugoku.getSudoku({ difficulty });
    res.send(result);
  } catch (err) {
    res.status(err.status || 500)
       .send(err);
  }
};

export async function getSolve (req, res, next) {
  const { board } = req.body;
  try {
    const result = await sugoku.getSolve({ board });
    res.send(result);
  } catch (err) {
    res.status(err.status || 500)
       .send(err);
  }
};

export async function createSudoku (req, res, next) {
  const userId = req.token._id;
  const { difficulty = 'easy' } = req.body;

  try {
    const board = await sugoku.getSudoku({ difficulty });
    const solution = await sugoku.getSolve(board);

    if (!board || !solution) throw createError(500, '스도쿠 생성 실패');

    const memo = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!memo[i]) memo[i] = [];
        if (!memo[i][j]) memo[i][j] = [];
      }
    }

    const filter = { userId };
    const doc = {
      userId,
      ...board,
      ...solution,
      answer: board.board,
      memo,
      remainHint: 3,
    };

    await Sudoku.replaceOne(filter, doc, { upsert: true });
    res.send(true);
  } catch (err) {
    res.status(err.status || 500)
       .send(err);
  }
}

export async function getSudoku (req, res, next) {
  const userId = req.token._id;
  try {
    const info = await Sudoku.findOne({ userId });
    res.send(info);
  } catch (err) {
    res.status(err.status || 500)
       .send(err);
  }
}

export async function updateSudoku (req, res, next) {
  const userId = req.token._id;
  try {
    await Sudoku.updateOne({ userId }, { ...req.body, updated: new Date() });
    res.send(true);
  } catch (err) {
    res.status(err.status || 500)
       .send(err);
  }
}

export async function getSudokuSolutionV2 (req, res, next) {
  res.send(sudoku.getSolution());
}

export function getSudokuSolveV2 (req, res, next) {
  const { board } = req.body;
  res.send(sudoku.solve(board));
}

export async function createSudokuV2 (req, res, next) {
  const userId = req.token._id;
  const { difficulty = 'easy' } = req.body;

  try {
    const { board, solution } = sudoku.getSudoku(difficulty);

    if (!board || !solution) throw createError(500, '스도쿠 생성 실패');

    const memo = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!memo[i]) memo[i] = [];
        if (!memo[i][j]) memo[i][j] = [];
      }
    }

    const filter = { userId };
    const doc = {
      userId,
      board,
      solution,
      answer: board,
      memo,
      remainHint: 3,
    };

    await Sudoku.replaceOne(filter, doc, { upsert: true });
    res.send(true);
  } catch (err) {
    res.status(err.status || 500)
       .send(err);
  }
}