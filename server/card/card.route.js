const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const cardController = require('./card.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(cardController.list)
  .post(validate(paramValidation.card), cardController.create);

router.route('/:cardId')
  .get(cardController.findOne)
  .put(validate(validate(paramValidation.card)), cardController.update)
  .delete(cardController.remove);

module.exports = router;
