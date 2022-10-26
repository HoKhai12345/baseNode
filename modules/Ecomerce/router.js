var express = require('express');
// var router = express.Router();
var checkAgeMiddleware = require('../../middleware/checkAgeMiddleware');
var authTokenMiddleware = require('../../middleware/authTokenMiddleware');
var PostController = require('./controller/PostController');
var LoginController = require('./controller/LoginController');

module.exports = (router) => {
        router.get('/api/ecomerce/index' ,  PostController.index);
        router.get('/api/ecomerce/store' ,  PostController.store);
        router.get('/api/ecomerce/update' ,  PostController.update);
        router.get('/api/ecomerce/delete' ,  PostController.delete);
}
