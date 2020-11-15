import jwt from 'jsonwebtoken';
import config from '../constants/config';

export function sign (payload) {
  return jwt.sign(payload, config.jwtKey, {
    expiresIn: '1d'
  });
}