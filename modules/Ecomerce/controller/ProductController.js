const { validationResult } = require('express-validator');
const moment = require('moment');
const db = require('../models/index');
const productService = require('../service/productService');
const productRequest = require('../requests/productRequest');
const Cate = db.Categories;
const Post = db.Products;
module.exports = {

    index: async(req, res) => {
        // Find all posts
        console.log("req.query" , req.query);
        // khai báo khởi tạo đối tượng options
        var options = {};
        // check lọc trường name
        if (req.query.name != "undefined"){
            options.name = req.query.name
        }
        // khai báo limit
        const limit = req.query.limit ? req.query.limit : 10;
        // khai báo offset
        const offset = req.query.offset ? req.query.offset : 0;
        // truyền param vào productService để xử lý 
        const products = await productService.getAll(options, parseInt(limit) , parseInt(offset));
        // Trả về kết quả 
        return res.json({
            status: 1,
            code: 200,
            data: [products]
        });
    },

    store: async(req, res) => {
        // Khai báo bắt các errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                status: 0,
                code: 400,
                errors: errors.array()
            })
        }
        // Khai báo params
        var params = {};
        const name = req.body.name ;
        const categoryId = req.body.categoryId;
        const thumbnail = req.body.thumbnail ? req.body.thumbnail : null;
        params = {
            name: name,
            thumbnail: thumbnail,
            categoryId: parseInt(categoryId),
        }
        const product = await productService.insert(params);
        // Nếu trường hợp trả về là false thì trả ra thống báo lỗi 
        if(product == false){
            return res.json({
                status: 0,
                code: 400,
                message: "Đã xảy ra lỗi"
            });
        }
        // Còn lại thì trả về response ok
        return res.json({
            status: 1,
            code: 200,
            data: product
        });
    },

    update: async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                status: 0,
                code: 400,
                errors: errors.array()
            })
        }
        const id = req.params.id;
         // Khai báo params
         var params = {};
         const name = req.body.name ;
         const categoryId = req.body.categoryId;
         const thumbnail = req.body.thumbnail;
         if (typeof name != 'undefined') {
            params.name = name;
         }
         if (typeof categoryId != 'undefined') {
            params.categoryId = categoryId
         }
         if (typeof thumbnail != 'undefined') {
            params.thumbnail = thumbnail
         }
        const products = await productService.update(params, id);

        return res.json({
            status: 1,
            code: 200,
            data: [products]
        });
    },
   
    delete: async(req, res) => {
        const id = req.params.id;

        const post = await Post.destroy({
            where: {
                id: id
            }
        });
        return res.json({
            status: 1,
            code: 200,
            data: [post]
        });
    },
    deleteAll: async(req, res) => {
        const post = await Post.destroy({
            where: {},
            truncate: true
        });
        return res.json({
            status: 1,
            code: 200,
            data: [post]
        });
    },
}