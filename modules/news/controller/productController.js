const { validationResult } = require('express-validator');
const productService = require('../service/productService');
module.exports = {

    index: async (req, res) => {
        // khai báo khởi tạo đối tượng options
        var options = {};
        // check lọc trường name
        if (req.query.name != "undefined") {
            options.name = req.query.name
        }
        // khai báo limit
        const limit = req.query.limit ? req.query.limit : 10;
        // khai báo offset
        const offset = req.query.offset ? req.query.offset : 0;
        // truyền param vào productService để xử lý 
        const products = await productService.getAll(options, parseInt(limit), parseInt(offset));
        // Trả về kết quả 
        return res.json({
            status: 1,
            code: 200,
            data: [products]
        });
    },

    store: async (req, res) => {
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
        const name = req.body.name;
        const categoryId = req.body.categoryId;
        const thumbnail = req.body.thumbnail ? req.body.thumbnail : null;
        params = {
            name: name,
            thumbnail: thumbnail,
            categoryId: parseInt(categoryId),
        }
        const product = await productService.insert(params);
        // Nếu trường hợp trả về là false thì trả ra thống báo lỗi 
        if (product == false) {
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
            data: [product]
        });
    },

    update: async (req, res) => {
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
        const name = req.body.name;
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

        if (!params || products === false || products === 0) {
            return res.json({
                status: 1,
                code: 400,
                message: "Update không thành công"
            });
        }
        return res.json({
            status: 1,
            code: 200,
            message: "Update bản ghi thành công"
        });
    },
}