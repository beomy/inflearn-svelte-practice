import crypto from 'crypto'
import config from '../constants/config';

export function pbkdf2Sync (password) {
  const key = crypto.pbkdf2Sync(password, config.cryptoKey, 100000, 64, 'sha512');
  return key.toString('hex');
}