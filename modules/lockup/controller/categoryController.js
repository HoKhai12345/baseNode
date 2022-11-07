const { validationResult } = require('express-validator');
const categoryService = require('../service/categoriesService');
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
        // check lọc trường path
        if (req.query.path != "undefined"){
            options.path = req.query.path
        }
        // check lọc trường status
        if (req.query.status != "undefined"){
            options.status = req.query.status
        }
        // khai báo limit
        const limit = req.query.limit ? req.query.limit : 10;
        // khai báo offset
        const offset = req.query.offset ? req.query.offset : 0;
        // truyền param vào categoryService để xử lý 
        const cate = await categoryService.getAll(options, parseInt(limit) , parseInt(offset));
        // Trả về kết quả 
        return res.json({
            status: 1,
            code: 200,
            data: [cate]
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
        const path = req.body.path;
        const status = req.body.status ? req.body.status : 1;
        params = {
            name: name,
            path: path,
            status: parseInt(status),
        }
        const cate = await categoryService.insert(params);
        // Nếu trường hợp trả về là false thì trả ra thống báo lỗi 
        if(cate == false){
            return res.json({
                status: 0,
                code: 400,
                message: "Tham số truyền vào không hợp lệ"
            });
        }
        // Còn lại thì trả về response ok
        return res.json({
            status: 1,
            code: 200,
            data: cate
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
        const path = req.body.path;
        const status = req.body.status;
        if (typeof name != 'undefined') {
            params.name = name;
        }
        if (typeof path != 'undefined') {
            params.path = path
        }
        if (typeof status != 'undefined') {
            params.status = status
        }
        const cate = await categoryService.update(params, id);

        if (!params || cate === false || cate === 0) {
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

    delete: async (req, res) => {
        const id = req.params.id ? req.params.id : null;
        // check Id xem có tồn tại hay ko
        const checkIdExists = await categoryService.checkExists(id)
        if (!id || checkIdExists === false) {
            return res.json({
                status: 0,
                code: 400,
                message: "Không tìm thấy id phù hợp"
            });
        }
        const deleteRole = await categoryService.deleteById(id);
        if (deleteRole == true) {
            return res.json({
                status: 1,
                code: 200,
                message: "Xóa chuyên mục thành công"
            });
        } else {
            return res.json({
                status: 0,
                code: 500,
                message: "Đã có lỗi hệ thống xảy ra"
            });
        }
    }
}