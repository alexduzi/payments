const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const paymentController = require('./payment.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(paymentController.list)
  .post(validate(paramValidation.paymentCreate), paymentController.create);

router.route('/:paymentId')
  .get(paymentController.findOne)
  .put(validate(paramValidation.paymentUpdate), paymentController.update)
  .delete(paymentController.remove);

module.exports = router;
