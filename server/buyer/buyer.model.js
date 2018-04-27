const mongoose = require('mongoose');

const { Schema } = mongoose;

const BuyerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'The value ({VALUE}) is not a valid email string.']
  },
  cpf: {
    type: String,
    required: true,
    match: [/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'The value ({VALUE}) is not a valid CPF number.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  payments: [{ type: Schema.Types.ObjectId, ref: 'payment' }],
  card: { type: Schema.Types.ObjectId, ref: 'card' }
},
  {
    usePushEach: true
  });

module.exports = mongoose.model('buyer', BuyerSchema);
