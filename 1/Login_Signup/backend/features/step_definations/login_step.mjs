const { Given, When, Then } = require('@cucumber/cucumber');
import { expect } from 'chai';
const mongoose = require('mongoose');
const User = require("../Models/users");

Given('a user exists with email "rishitkhadawala289@gmail.com" and password "Rishit@2893"', async function (email, password) {
    await User.create({ email, password }); 
});

When('the user logs in with email "rishitkhadawala289@gmail.com" and password "Rishit@2893"', async function (email, password) {
    const response = await this.request.post('/login').send({ email, password });
    this.response = response;
});

Then('the login should be successful', function () {
    expect(this.response.status).to.equal(200);
    expect(this.response.body.message).to.equal('Logged in successfully');
});
