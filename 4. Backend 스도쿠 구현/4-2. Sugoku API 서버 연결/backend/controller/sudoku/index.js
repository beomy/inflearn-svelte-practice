import * as sugoku from './sugoku';

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