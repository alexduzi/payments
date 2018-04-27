const Client = require('./client.model');

/**
 * @property {string} req.body.name
 * @property {string} req.body.companyName
 * @property {string} req.body.cnpj
 * @property {string} req.body.phoneNumber
 * @property {string} req.body.address
 * @returns {Client}
 */
const create = (req, res, next) => {
  const { name, companyName, cnpj, phoneNumber, address, email } = req.body;

  const client = new Client({ name, companyName, cnpj, phoneNumber, address, email });

  client.save()
    .then(savedClient => res.json(savedClient))
    .catch(e => next(e));
};

/**
 * @property {string} req.body.name
 * @property {string} req.body.companyName
 * @property {string} req.body.cnpj
 * @property {string} req.body.phoneNumber
 * @property {string} req.body.address
 * @returns {Client}
 */
const update = (req, res, next) => {
  const { name, companyName, cnpj, phoneNumber, address, email } = req.body;
  const { clientId } = req.params;

  Client.findByIdAndUpdate(clientId,
    { name, companyName, cnpj, phoneNumber, address, email },
    { new: true })
    .then(savedClient => res.json(savedClient))
    .catch(e => next(e));
};

/**
 *
 * @property {number} req.query.skip
 * @property {number} req.query.limit
 * @returns {Client[]}
 */
const list = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;

  Client.find({})
    .populate('payments')
    .skip(skip)
    .limit(limit)
    .then(clients => res.json(clients))
    .catch(e => next(e));
};

/**
 *
 * @property {clientId} req.params.clientId
 * @returns {Client}
 */
const findOne = (req, res, next) => {
  const { clientId } = req.params;

  Client.findOne({ _id: clientId })
    .populate('payments')
    .then(client => res.json(client))
    .catch(e => next(e));
};

/**
 * @property {clientId} req.params.clientId
 * @returns {Client}
 */
const remove = (req, res, next) => {
  const { clientId } = req.params;

  Client.findByIdAndRemove(clientId)
    .then(deletedClient => res.json(deletedClient))
    .catch(e => next(e));
};

module.exports = { create, update, list, findOne, remove };
