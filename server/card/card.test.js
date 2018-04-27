const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const Card = require('./card.model');
const app = require('../../index');
const moment = require('moment');

require('mongodb-moment')(moment);
const expect = chai.expect;
chai.config.includeStack = true;

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Card endpoints', () => {
  let card = {
    holderName: 'MoipPayment',
    number: '5473680668067552',
    expirationDate: moment().utc().format(),
    verificationValue: 567
  };

  describe('# POST /api/card', () => {
    it('should create a new card', (done) => {
      request(app)
        .post('/api/card')
        .send(card)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.holderName).to.equal(card.holderName);
          expect(res.body.number).to.equal(card.number);
          expect(moment(res.body.expirationDate).utc().format()).to.equal(card.expirationDate);
          expect(res.body.verificationValue).to.equal(card.verificationValue);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/card', () => {
    it('should get card', (done) => {
      Card.findOne({ number: '5473680668067552' })
        .then((foundedCard) => {
          request(app)
            .get(`/api/card/${foundedCard._id}`)
            // .send(buyer)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.holderName).to.equal(card.holderName);
              expect(res.body.number).to.equal(card.number);
              expect(res.body.verificationValue).to.equal(card.verificationValue);
              done();
            })
            .catch(done);
        });
    });
  });

  describe('# PUT /api/card', () => {
    it('should updte card', (done) => {
      Card.findOne({ number: '5473680668067552' })
        .then((foundedCard) => {
          card.holderName = 'MoipPayment2';
          request(app)
            .put(`/api/card/${foundedCard._id}`)
            .send(card)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.holderName).to.equal(card.holderName);
              expect(res.body.number).to.equal(card.number);
              expect(moment(res.body.expirationDate).utc().format()).to.equal(card.expirationDate);
              expect(res.body.verificationValue).to.equal(card.verificationValue);
              done();
            })
            .catch(done);
        });
    });
  });

  describe('# DELETE /api/card', () => {
    it('should delete card', (done) => {
      Card.findOne({ number: '5473680668067552' })
        .then((foundedCard) => {
          request(app)
            .delete(`/api/card/${foundedCard._id}`)
            // .send(buyer)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.holderName).to.equal(card.holderName);
              expect(res.body.number).to.equal(card.number);
              expect(moment(res.body.expirationDate).utc().format()).to.equal(card.expirationDate);
              expect(res.body.verificationValue).to.equal(card.verificationValue);
              done();
            })
            .catch(done);
        });
    });
  });
});
