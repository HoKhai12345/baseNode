const { validationResult } = require('express-validator');
const moment = require('moment');
const db = require('../models/index');
const ProductService = require('../service/ProductService');
const ProductRequest = require('../requests/ProductRequest');
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
        const products = await ProductService.getAll(options, parseInt(limit) , parseInt(offset));
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
        var params = {};
        const name = req.body.name ;
        const categoryId = req.body.categoryId;
        const thumbnail = req.body.thumbnail ? req.body.thumbnail : null;

        params = {
            name: name,
            categoryId: parseInt(categoryId),
            thumbnail: thumbnail,
            createdAt: moment().format('MMMM Do YYYY, HH:mm:ss'),
            updatedAt: moment().format('MMMM Do YYYY, HH:mm:ss')
        }
        ProductService.insert(params);
        return res.json({
            status: 1,
            code: 200,
   
        });
    },
    findAll: async(req, res) => {
        // Find all posts
        const posts = await Post.findAll();

        return res.json({
            status: 1,
            code: 200,
            data: [posts]
        });
    },
    getSlug: async(req, res) => {
        // Get All data in user Table by slug
        const slug = req.params.slug;
        var condition = slug ? { slug: {
                [Op.like]: `%${slug}%` } } : null;
        const posts = await Post.findAll({ where: condition });
        if (posts.length < 0) {
            res.status(200).json({ message: "Connection failed", data: [] })
        }
        return res.json({
            status: 1,
            code: 200,
            data: [posts]
        });
    },
    findOne: async(req, res) => {
        const id = req.params.id;

        const post = await Post.findByPk(id)
        if (post === null) {
            res.status(404).send({
                message: `Cannot find post with id=${id}.`
            });
        }
        return res.json({
            status: 1,
            code: 200,
            data: [post]
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

        const post = await Post.update({
            title: req.body.title,
            slug: stringHelper.slug(req.body.title, '-'),
            description: req.body.description,
            cateId: req.body.cateId,
            shortDesc: req.body.shortDesc,
            image: req.body.image
        }, {
            where: { id: id }
        })
        return res.json({
            status: 1,
            code: 200,
            data: [post]
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