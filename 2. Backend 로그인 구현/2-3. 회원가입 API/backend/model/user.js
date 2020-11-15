import mongoose from 'mongoose';
import { pbkdf2Sync } from '../utils/crypto';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  created: { type: Date, default: Date.now }
});

userSchema.statics.create = function ({ email, password }) {
  const encoded = pbkdf2Sync(password);
  const user = new this({ email, password: encoded });
  return user.save();
}

export default mongoose.model('users', userSchema);
