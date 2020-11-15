import createError from 'http-errors';
import User from '../../model/user';

export async function join (req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw createError(500, '회원가입 실패');
    }
    await User.create({ email, password });
    res.send(true);
  } catch (err) {
    res.status(err.status || 500)
       .send(err);
  }
}

export async function valid (req, res, next) {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    res.send({ isValid: !user });
  } catch (err) {
    res.status(err.status || 500)
       .send(err);
  }
}