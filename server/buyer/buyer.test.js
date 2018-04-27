const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const Buyer = require('./buyer.model');
const app = require('../../index');

const expect = chai.expect;
chai.config.includeStack = true;

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Buyer endpoints', () => {
  let buyer = {
    name: 'MoipPayment',
    email: 'moippayment@moip.com',
    cpf: '552.039.548-95'
  };

  describe('# POST /api/buyer', () => {
    it('should create a new buyer', (done) => {
      request(app)
        .post('/api/buyer')
        .send(buyer)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(buyer.name);
          expect(res.body.email).to.equal(buyer.email);
          expect(res.body.cpf).to.equal(buyer.cpf);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/buyer', () => {
    it('should get buyer', (done) => {
      Buyer.findOne({ email: 'moippayment@moip.com' })
        .then((foundedBuyer) => {
          request(app)
            .get(`/api/buyer/${foundedBuyer._id}`)
            // .send(buyer)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(buyer.name);
              expect(res.body.email).to.equal(buyer.email);
              expect(res.body.cpf).to.equal(buyer.cpf);
              done();
            })
            .catch(done);
        });
    });
  });

  describe('# PUT /api/buyer', () => {
    it('should updte buyer', (done) => {
      buyer.cpf = '253.531.460-69';
      Buyer.findOne({ email: 'moippayment@moip.com' })
        .then((foundedBuyer) => {

          request(app)
            .put(`/api/buyer/${foundedBuyer._id}`)
            .send(buyer)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(buyer.name);
              expect(res.body.email).to.equal(buyer.email);
              expect(res.body.cpf).to.equal(buyer.cpf);
              done();
            })
            .catch(done);
        });
    });
  });

  describe('# DELETE /api/buyer', () => {
    it('should delete a new buyer', (done) => {
      Buyer.findOne({ email: 'moippayment@moip.com' })
        .then((foundedBuyer) => {
          request(app)
            .delete(`/api/buyer/${foundedBuyer._id}`)
            // .send(buyer)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(buyer.name);
              expect(res.body.email).to.equal(buyer.email);
              done();
            })
            .catch(done);
        });
    });
  });
});
