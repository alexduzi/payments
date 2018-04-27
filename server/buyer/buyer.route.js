const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const buyerController = require('./buyer.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(buyerController.list)
  .post(validate(paramValidation.buyer), buyerController.create);

router.route('/:buyerId')
  .get(buyerController.findOne)
  .put(validate(paramValidation.buyer), buyerController.create)
  .delete(buyerController.remove);

module.exports = router;
