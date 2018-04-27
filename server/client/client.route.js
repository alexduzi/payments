const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const clientController = require('./client.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(clientController.list)
  .post(validate(paramValidation.client), clientController.create);

router.route('/:clientId')
  .get(clientController.findOne)
  .put(validate(paramValidation.client), clientController.update)
  .delete(clientController.remove);

module.exports = router;
