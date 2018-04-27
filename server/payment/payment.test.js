const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const Client = require('../client/client.model');
const Buyer = require('../buyer/buyer.model');
const Card = require('../card/card.model');
const Payment = require('../payment/payment.model');
const { paymentStatus } = require('../helpers/paymentStatus');
const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Payment endpoints', () => {
  let payment, card, client, buyer;

  before((done) => {

    client = new Client({
      name: 'Moip',
      companyName: 'Moip',
      email: 'moip@moip.com',
      cnpj: '62.229.022/0001-85',
      phoneNumber: '(11) 3181-8180',
      address: 'Av. Brg. Faria Lima, 3064 - Itaim Bibi, São Paulo - SP, 01451-001'
    });

    card = new Card({
      holderName: 'MoipPayment',
      number: '5473680668067552',
      expirationDate: '2018-08-08',
      verificationValue: 567
    });

    buyer = new Buyer({
      name: 'MoipPayment',
      email: 'moippayment@moip.com',
      cpf: '552.039.548-95',
      card
    });

    card.buyer = buyer;

    Promise.all([client.save(), buyer.save(), card.save()])
      .then(() => {

        payment = {
          clientId: client._id,
        	amount: 40,
        	paymentType: 'card',
        	buyerId: buyer._id,
        	cardId: card._id
        };
      })
      .then(done);
  });

  describe('# POST /api/payment', () => {
    it('should create a new payment', (done) => {
      request(app)
        .post('/api/payment')
        .send(payment)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(client.name);
          expect(res.body.payments[0].amount).to.equal(payment.amount);
          expect(res.body.payments[0].paymentType).to.equal(payment.paymentType);
          payment = res.body.payments[0];
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/payment/:paymentId', () => {
    it('should get payment details', (done) => {
      request(app)
        .get(`/api/payment/${payment._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body._id).to.equal(payment._id);
          expect(res.body.amount).to.equal(payment.amount);
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/payment/:paymentId', () => {
    it('should update payment details', (done) => {
      payment.amount = 90;
      request(app)
        .put(`/api/payment/${payment._id}`)
        .send(payment)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body._id).to.equal(payment._id);
          expect(res.body.amount).to.equal(payment.amount);
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/payment/', () => {
    it('should delete payment', (done) => {
      request(app)
        .delete(`/api/payment/${payment._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body._id).to.equal(payment._id);
          done();
        })
        .catch(done);
    });
  });
});
