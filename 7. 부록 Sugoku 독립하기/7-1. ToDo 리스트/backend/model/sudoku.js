import mongoose from 'mongoose';

const sudokuSchema = new mongoose.Schema({
  userId: String,
  board: Array,
  solution: Array,
  answer: Array,
  memo: Array,
  remainHint: Number,
  difficulty: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

export default mongoose.model('sudokus', sudokuSchema);
