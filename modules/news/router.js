var express = require('express');
const authRequest = require('./requests/authRequest');
const usersRequest = require('./requests/usersRequest');
const rolesRequest = require('./requests/rolesRequest');
const loginController = require('./controller/loginController');
const usersController = require('./controller/userController');
const rolesController = require('./controller/rolesController');
const authMiddleware = require('../../middleware/authTokenMiddleware');
const loadImgController = require('../news/controller/loadImgController');
const postsController = require('../news/controller/postsController');
const categoryController = require('../news/controller/categoryController');
const configUploadImg = require('../news/config/uploadImg');
const postsRequest = require('./requests/postsRequest');
const cateRequest = require('./requests/cateRequest');
const multer = require('multer');
const categoryService = require('./service/usersService');
// SET STORAGE
var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'storage/img/news')
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname.split(".")[0] + Date.now() +'.' + file.originalname.slice(-3))
        }
      })  
      var upload = multer({ storage: storage })
module.exports = (router) => {
        // route load ảnh 
        // router.get('/storage/news/img/:imgName', loadImgController.loadImg);
        // route của login
        router.post('/api/login', [authRequest.login], loginController.login);
        // route của users
        router.get('/api/news/users/index', [authMiddleware], usersController.index);
        router.post('/api/news/users/store', [authMiddleware], usersRequest.store, usersController.store);
        router.put('/api/news/users/update/:id', [authMiddleware], usersRequest.update, usersController.update);
        // route của roles
        router.get('/api/news/roles/index', [authMiddleware], rolesController.index);
        router.post('/api/news/roles/store', [authMiddleware], rolesRequest.store, rolesController.store);
        router.put('/api/news/roles/update/:id', [authMiddleware], rolesRequest.update, rolesController.update);
        router.delete('/api/news/roles/delete/:id', [authMiddleware], rolesController.delete);
        // route của post
        router.get('/api/news/posts/index', [authMiddleware], postsController.index);
        router.post('/api/news/posts/store', [authMiddleware], upload.single('thumbnail'), postsRequest.store, postsController.store);
        router.put('/api/news/posts/update/:id', [authMiddleware], upload.single('thumbnail'), postsRequest.update, postsController.update);
        router.delete('/api/news/posts/delete/:id', [authMiddleware], postsController.delete);
        // route của categories
        router.get('/api/news/categories/index', [authMiddleware], categoryController.index);
        router.post('/api/news/categories/store', [authMiddleware], cateRequest.store, categoryController.store);
        router.put('/api/news/categories/update/:id', [authMiddleware], cateRequest.update, categoryController.update);
        router.delete('/api/news/categories/delete/:id', [authMiddleware], categoryController.delete);

        // Nested
        router.post('/api/nested_list/create', categoryController.storeNestedList);
        router.delete('/api/nested_list/delete/:id', categoryController.deleteNestedList);
        router.put('/api/nested_list/update/:id', categoryController.updateNestedList);

}
