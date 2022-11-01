var express = require('express');
const authRequest = require('./requests/authRequest');
const loginController = require('./controller/loginController');
module.exports = (router) => {
        // route của login
        router.post('/api/login', [authRequest.login], loginController.login);
}
