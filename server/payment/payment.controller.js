const Promise = require('bluebird');
const Payment = require('./payment.model');
const Buyer = require('../buyer/buyer.model');
const Card = require('../card/card.model');
const Client = require('../client/client.model');
const { paymentStatus } = require('../helpers/paymentStatus');

/**
 * @property {string} req.body.clientId
 * @property {string} req.body.amount
 * @property {string} req.body.paymentType
 * @property {string} req.body.buyerId
 * @property {string} req.body.cardId
 * @returns {Payment}
 */
const create = async (req, res, next) => {
  const { clientId, amount, paymentType, buyerId, cardId } = req.body;

  let client = await Client.findOne({ _id: clientId }).populate('payments');
  let buyer = await Buyer.findOne({ _id: buyerId }).populate('payments').populate('card');

  let card;
  if (paymentType === 'card') {
    card = await Card.findOne({ _id: cardId }).populate('buyer');
    buyer.card = card;
    card.buyer = buyer;
    try {
      await card.save();
    } catch (e) {
      next(e);
    }
  }

  let payment = new Payment({
    amount,
    paymentType,
    client,
    buyer,
    card,
    status: paymentStatus.processing
  });


  try {
    payment.client = client;
    payment.buyer = buyer;
    payment.card = card;
    await payment.save();

    client.payments.push(payment._id);
    buyer.payments.push(payment._id);

    await buyer.save();
    await client.save();

    client = await Client.findOne({ _id: clientId }).populate('payments');

    res.json(client);
  } catch (e) {
    next(e);
  }
};

/**
 * @property {string} req.body.amount
 * @property {string} req.body.paymentType
 * @property {string} req.body.status
 * @property {paymentId} req.params.paymentId
 * @returns {Payment}
 */
const update = (req, res, next) => {
  const { amount, paymentType, status } = req.body;
  const { paymentId } = req.params;

  Payment.findByIdAndUpdate(paymentId,
    { amount, paymentType, status },
    { new: true })
    .then(savedPayment => res.json(savedPayment))
    .catch(e => next(e));
};

/**
 *
 * @property {number} req.query.skip
 * @property {number} req.query.limit
 * @returns {Payment[]}
 */
const list = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;

  Payment.find({})
    .populate('buyer')
    .populate('card')
    .populate('client')
    .skip(skip)
    .limit(limit)
    .then(payments => res.json(payments))
    .catch(e => next(e));
};

/**
 *
 * @property {paymentId} req.params.paymentId
 * @returns {Payment}
 */
const findOne = (req, res, next) => {
  const { paymentId } = req.params;

  Payment.findOne({ _id: paymentId })
    .populate('buyer')
    .populate('card')
    .populate('client')
    .then(payment => res.json(payment))
    .catch(e => next(e));
};

/**
 * @property {paymentId} req.params.paymentId
 * @returns {Payment}
 */
const remove = (req, res, next) => {
  const { paymentId } = req.params;

  Payment.findByIdAndRemove(paymentId)
    .then(deletedPayment => res.json(deletedPayment))
    .catch(e => next(e));
};

module.exports = { create, list, findOne, update, remove };
