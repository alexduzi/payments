const Buyer = require('./buyer.model');

const moment = require('moment');

/**
 * @property {string} req.body.name
 * @property {string} req.body.email
 * @property {string} req.body..cpf
 * @returns {Buyer}
 */
const create = (req, res, next) => {
  const { name, email, cpf } = req.body;

  const createdAt = moment();

  const buyer = new Buyer({ name, email, cpf, createdAt });

  buyer.save()
    .then(savedBuyer => res.json(savedBuyer))
    .catch(e => next(e));
};

/**
 * @property {string} req.body.name
 * @property {string} req.body.email
 * @property {string} req.body.cpf
 * @returns {Buyer}
 */
const update = (req, res, next) => {
  const { name, email, cpf } = req.body;
  const { buyerId } = req.params;

  Buyer.findByIdAndUpdate(buyerId,
    { name, email, cpf },
    { new: true })
    .then(savedBuyer => res.json(savedBuyer))
    .catch(e => next(e));
};

/**
 *
 * @property {number} req.query.skip
 * @property {number} req.query.limit
 * @returns {Buyer[]}
 */
const list = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;

  Buyer.find({})
    .populate('payments')
    .populate('card')
    .skip(skip)
    .limit(limit)
    .then(buyers => res.json(buyers))
    .catch(e => next(e));
};

/**
 *
 * @property {buyerId} req.params.buyerId
 * @returns {Buyer}
 */
const findOne = (req, res, next) => {
  const { buyerId } = req.params;

  Buyer.findOne({ _id: buyerId })
    .populate('payments')
    .populate('card')
    .then(buyers => res.json(buyers))
    .catch(e => next(e));
};

/**
 * @property {buyerId} req.params.buyerId
 * @returns {Buyer}
 */
const remove = (req, res, next) => {
  const { buyerId } = req.params;

  Buyer.findByIdAndRemove(buyerId)
    .then(deletedBuyer => res.json(deletedBuyer))
    .catch(e => next(e));
};

module.exports = { create, update, list, findOne, remove };
