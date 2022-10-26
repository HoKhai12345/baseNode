var express = require('express');
// var router = express.Router();
var PostController = require('./controller/PostController');

module.exports = (router) => {
    router.get('/api/ecomerce', PostController.index);
    router.post('/api/ecomerce', PostController.store);

}
