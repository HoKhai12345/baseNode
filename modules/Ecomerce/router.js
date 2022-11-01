var express = require('express');
const productRequest = require('./requests/productRequest');
const productController = require('./controller/productController');
const categoriesController = require('./controller/categoryController');
const userController = require('./controller/userController');
module.exports = (router) => {
        // route của products
        router.get('/api/ecomerce/products/index', productController.index);
        router.post('/api/ecomerce/products/store', [productRequest.create], productController.store);
        router.put('/api/ecomerce/products/update/:id', [productRequest.update], productController.update);
        // route cua cate
        router.get('/api/ecomerce/categories/index', categoriesController.index);
        //route của users
        router.get('/api/ecomerce/users/index', userController.index);
}
