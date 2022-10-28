var express = require('express');
const { body } = require('express-validator');
const ProductRequest = require('./requests/ProductRequest');
const PostController = require('./controller/PostController');
const ProductController = require('./controller/ProductController');
module.exports = (router) => {
        router.get('/api/ecomerce/index' ,  PostController.index);
        router.post('/api/ecomerce/store' ,  PostController.store);
        router.put('/api/ecomerce/update/:id' ,  PostController.update);
        router.delete('/api/ecomerce/delete/:id' ,  PostController.delete);
        // route của products
        router.get('/api/ecomerce/products/index', ProductController.index);
        router.post('/api/ecomerce/products/store', ProductRequest.create , ProductController.store);
}
