const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  username: {
    type: String, 
    required: true
  },
  date: { 
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentSchema);