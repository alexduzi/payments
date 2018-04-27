const Card = require('./card.model');
const moment = require('moment');
require('mongodb-moment')(moment);

/**
 * @property {string} req.body.holderName
 * @property {string} req.body.number
 * @property {string} req.body.expirationDate
 * @property {string} req.body.verificationValue
 * @returns {Card}
 */
const create = (req, res, next) => {
  const { holderName, number, expirationDate, verificationValue } = req.body;

  const card = new Card({
    holderName,
    number,
    expirationDate: moment.utc(expirationDate),
    verificationValue
  });

  card.save()
    .then(savedCard => res.json(savedCard))
    .catch(e => next(e));
};

/**
 * @property {string} req.body.holderName
 * @property {string} req.body.number
 * @property {string} req.body.expirationDate
 * @property {string} req.body.verificationValue
 * @property {cardId} req.params.cardId
 * @returns {Card}
 */
const update = (req, res, next) => {
  const { holderName, number, expirationDate, verificationValue } = req.body;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId,
    { holderName, number, expirationDate: moment.utc(expirationDate), verificationValue },
    { new: true })
    .then(savedCard => res.json(savedCard))
    .catch(e => next(e));
};

/**
 *
 * @property {number} req.query.skip
 * @property {number} req.query.limit
 * @returns {Card[]}
 */
const list = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;

  Card.find({})
    .populate('buyer')
    .skip(skip)
    .limit(limit)
    .then(cards => res.json(cards))
    .catch(e => next(e));
};

/**
 *
 * @property {cardId} req.params.cardId
 * @returns {Card}
 */
const findOne = (req, res, next) => {
  const { cardId } = req.params;

  Card.findOne({ _id: cardId })
    .populate('buyer')
    .populate('card')
    .then(card => res.json(card))
    .catch(e => next(e));
};

/**
 * @property {cardId} req.params.cardId
 * @returns {Card}
 */
const remove = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then(deletedCard => res.json(deletedCard))
    .catch(e => next(e));
};

module.exports = { create, update, list, findOne, remove };
