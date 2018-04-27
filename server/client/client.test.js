const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const app = require('../../index');
const Client = require('./client.model');

const expect = chai.expect;
chai.config.includeStack = true;

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Client endpoints', () => {
  let client = {
    name: 'Moip',
    companyName: 'Moip',
    email: 'moip@moip.com',
    cnpj: '62.229.022/0001-85',
    phoneNumber: '(11) 3181-8180',
    address: 'Av. Brg. Faria Lima, 3064 - Itaim Bibi, São Paulo - SP, 01451-001'
  };

  describe('# POST /api/client', () => {
    it('should create a new client', (done) => {
      request(app)
        .post('/api/client')
        .send(client)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(client.name);
          expect(res.body.companyName).to.equal(client.companyName);
          expect(res.body.email).to.equal(client.email);
          expect(res.body.cnpj).to.equal(client.cnpj);
          expect(res.body.phoneNumber).to.equal(client.phoneNumber);
          expect(res.body.address).to.equal(client.address);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/client', () => {
    it('should get client', (done) => {
      Client.findOne({ name: 'Moip' })
        .then((clientFounded) => {
          request(app)
            .get(`/api/client/${clientFounded._id}`)
            // .send(user)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(client.name);
              expect(res.body.companyName).to.equal(client.companyName);
              expect(res.body.email).to.equal(client.email);
              expect(res.body.cnpj).to.equal(client.cnpj);
              expect(res.body.phoneNumber).to.equal(client.phoneNumber);
              expect(res.body.address).to.equal(client.address);
              done();
            })
            .catch(done);
        });
    });
  });

  describe('# PUT /api/client', () => {
    it('should updte client', (done) => {
      Client.findOne({ name: 'Moip' })
       .then((clientFounded) => {
         client.companyName = 'MoipUpdate';

         request(app)
           .put(`/api/client/${clientFounded._id}`)
           .send(client)
           .expect(httpStatus.OK)
           .then((res) => {
             expect(res.body.name).to.equal(client.name);
             expect(res.body.companyName).to.equal(client.companyName);
             expect(res.body.email).to.equal(client.email);
             expect(res.body.cnpj).to.equal(client.cnpj);
             expect(res.body.phoneNumber).to.equal(client.phoneNumber);
             expect(res.body.address).to.equal(client.address);
             done();
           })
           .catch(done);
       });
    });
  });

  describe('# DELETE /api/buyer', () => {
    it('should delete client', (done) => {
      Client.findOne({ name: 'Moip' })
       .then((clientFounded) => {
         request(app)
           .delete(`/api/client/${clientFounded._id}`)
           // .send(client)
           .expect(httpStatus.OK)
           .then((res) => {
             expect(res.body.name).to.equal(client.name);
             expect(res.body.companyName).to.equal(client.companyName);
             expect(res.body.email).to.equal(client.email);
             expect(res.body.cnpj).to.equal(client.cnpj);
             expect(res.body.phoneNumber).to.equal(client.phoneNumber);
             expect(res.body.address).to.equal(client.address);
             done();
           })
           .catch(done);
       });
    });
  });
});
