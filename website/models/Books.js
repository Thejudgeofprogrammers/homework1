const { Schema, model } = require('mongoose');

// Схема книги
const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  authors: {
    type: String,
    default: ""
  },
  favorite: {
    type: Boolean,
    default: false
  },
  fileName: {
    type: String,
    default: ""
  },
  fileCover: {
    type: String,
    default: ""
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  }
});


module.exports = model('Book', bookSchema);