const mongoose = require('mongoose');

const { Schema } = mongoose;

const PaymentSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  paymentType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  card: {
    type: Schema.Types.ObjectId,
    ref: 'card'
  },
  client: {
    type: String,
    ref: 'client'
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'buyer'
  }
});

module.exports = mongoose.model('payment', PaymentSchema);
