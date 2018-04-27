const mongoose = require('mongoose');
const { Schema } = mongoose;

const CardSchema = new Schema({
  holderName: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  verificationValue: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  buyer: { type: Schema.Types.ObjectId, ref: 'buyer' }
});

module.exports = mongoose.model('card', CardSchema);
