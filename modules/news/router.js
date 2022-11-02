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
module.exports = (router) => {
        // route load ảnh 
        router.get('/storage/new/img/:imgName' , loadImgController.loadImg );
        // route của login
        router.post('/api/login', [authRequest.login], loginController.login);
        // route của users
        router.get('/api/news/users/index' , [authMiddleware] , usersController.index );
        router.post('/api/news/users/store' , [authMiddleware , usersRequest.store] , usersController.store );
        router.put('/api/news/users/update/:id', [authMiddleware , usersRequest.update] , usersController.update );
        // route của roles
        router.get('/api/news/roles/index' , [authMiddleware] , rolesController.index );
        router.post('/api/news/roles/store' , [authMiddleware , rolesRequest.store] , rolesController.store );
        router.put('/api/news/roles/update/:id' , [authMiddleware , rolesRequest.update] , rolesController.update );
        router.delete('/api/news/roles/delete/:id' , [authMiddleware] , rolesController.delete );
        // route của post
        router.get('/api/news/posts/index' , [authMiddleware] , postsController.index );
}
