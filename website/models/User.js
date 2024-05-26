const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    default: ""
  },
  emails: [{
    value: {
      type: String,
      required: true
    }
  }],
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

module.exports = model('User', userSchema);