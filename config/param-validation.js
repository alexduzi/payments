const Joi = require('joi');

module.exports = {
  client: {
    body: {
      name: Joi.string().required(),
      companyName: Joi.string().required(),
      cnpj: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      address: Joi.string().required(),
      email: Joi.string().required()
    }
  },
  paymentCreate: {
    body: {
      amount: Joi.number().required(),
      paymentType: Joi.string().required()
    }
  },
  paymentUpdate: {
    body: {
      amount: Joi.number().required(),
      paymentType: Joi.string().required(),
      status: Joi.string().required()
    }
  },
  buyer: {
    body: {
      name: Joi.string().required(),
      email: [Joi.string().required(), Joi.string().email()],
      cpf: Joi.string().required()
    }
  },
  card: {
    body: {
      holderName: Joi.string().required(),
      number: Joi.string().required(),
      expirationDate: Joi.string().required(),
      verificationValue: Joi.number().required()
    }
  }
};
