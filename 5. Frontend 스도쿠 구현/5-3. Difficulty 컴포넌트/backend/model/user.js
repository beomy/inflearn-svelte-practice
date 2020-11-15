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

userSchema.statics.findOneForEncoded = function (query) {
  if (query.password) {
    query.password = pbkdf2Sync(query.password);
  }
  return this.findOne(query);
}

export default mongoose.model('users', userSchema);
