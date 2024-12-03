const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');
const sinon = require('sinon');
const app = require('../../../src/app');
const userDb = require('../../../src/data-access/userdb');
const assert = require('chai').assert;

let response;
let stub;

sinon.stub(userDb, 'findByEmail').callsFake(async ({ email }) => {
  
  return null;
});

sinon.stub(userDb, 'insert').callsFake(async (user) => {
  return {
    id: 1,
    email: user.email,
    name: user.name,
    password: "hashedpassword",
  };
});
let userData;
Given('the following user data:', (dataTable) => {
  const data = dataTable.rowsHash();
  userData=data;
  stub = sinon.stub(createUserHash).callsFake(({ data }) => {
    return "hashedPassword";
  });
});

When('I send a POST request to {string} with the user data', async (route) => {
  response = await request(app).post(route).send(userData);
});

Then('the response status should be {int}', (statusCode) => {
  assert.strictEqual(response.status, statusCode);
});

Then('the response should contain:', (jsonString) => {
  const expected = JSON.parse(jsonString);
  const actual = response.body;

  assert.strictEqual(
    userDb.insert.getCall(0).args[0].password,
    'hashedpassword'
  );
  assert.include(actual, expected);
});