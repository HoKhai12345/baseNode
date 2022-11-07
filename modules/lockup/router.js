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
        // route của login
        router.post('/api/nested_list/create', categoryController.storeNestedList);
}
