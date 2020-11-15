import createError from 'http-errors';
import User from '../../model/user';
import * as jwt from '../../utils/jwt';

export function authMiddleware (req, res, next) {
  const authorization = req.get('Authorization');
  try {
    if (!authorization) {
      throw createError(401, '토큰 없음');
    }
    const type = authorization.split(' ')[0];
    if (type !== 'Bearer') {
      throw createError(401, '토큰 타입 오류');
    }
    const token = authorization.split(' ')[1];
    req.token = jwt.verify(token);
    next();
  } catch (err) {
    next(err);
  }
}
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

export async function login (req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOneForEncoded({ email, password });
    if (!user) {
      throw createError(500, '로그인 실패');
    }
    const token = jwt.sign({
      _id: user._id,
      email: user.email,
      created: user.created,
    });
    res.send({ token });
  } catch (err) {
    res.status(err.status || 500)
       .send(err);
  }
}