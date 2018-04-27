const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'The value ({VALUE}) is not a valid email string.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  payments: [{
    type: Schema.Types.ObjectId,
    ref: 'payment'
  }]
},
  {
    usePushEach: true
  });

module.exports = mongoose.model('client', ClientSchema);
