var express = require('express');
const authRequest = require('./requests/authRequest');
const loginController = require('./controller/loginController');
const usersController = require('./controller/userController');
const authMiddleware = require('../../middleware/authTokenMiddleware');
module.exports = (router) => {
        // route của login
        router.post('/api/login', [authRequest.login], loginController.login);
        // route của users
        router.get('/api/news/users/index' , [authMiddleware] , usersController.index );
}
