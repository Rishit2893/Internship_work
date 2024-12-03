const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const sinon = require('sinon');
const loginFunction = require('./login');

const mockUserDb = {
  findByEmail: sinon.stub(),
};

const randomUUID = sinon.stub().returns('mock-session-id');
const createUserHash = sinon.stub();

const login = loginFunction({
  userDb: mockUserDb,
  createUserHash,
  Joi: require('joi'),
  randomUUID,
});

let requestData;
let response;
let error;

Given('an existing user with the following data:', async function (dataTable) {
  const users = dataTable.hashes();
  mockUserDb.findByEmail.callsFake(({ email }) =>
    Promise.resolve(users.find((u) => u.email === email))
  );
  createUserHash.callsFake(({ data }) => (data === 'password123' ? 'hashedpassword' : 'wronghash'));
});

Given('no existing user', async function () {
  mockUserDb.findByEmail.resolves(null);
});

When('I send a POST request to {string} with:', async function (endpoint, dataTable) {
  requestData = dataTable.hashes()[0];
  try {
    response = await login({
      email: requestData.email,
      password: requestData.password,
      oldSessionId: null,
      logger: mockLogger,
    });
    error = null;
  } catch (err) {
    error = err;
  }
});

Then('the response status code should be {int}', function (statusCode) {
  if (error) {
    expect(error).to.have.property('statusCode', statusCode);
  } else {
    expect(response).to.not.be.undefined;
  }
});

Then('the response should contain:', function (docString) {
  const expectedResponse = JSON.parse(docString);
  if (error) {
    expect(error.message).to.equal(expectedResponse.error);
  } else {
    expect(response).to.deep.include(expectedResponse);
  }
});
