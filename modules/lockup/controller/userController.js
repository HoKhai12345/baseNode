const userService = require('../service/usersService');
const { validationResult } = require('express-validator');
const md5 = require('md5');
module.exports = {

    index: async (req, res) => {
        // Find all posts
        console.log("req.query", req.query);
        // khai báo khởi tạo đối tượng options
        var options = {};
        // check lọc trường name
        if (req.query.name != "undefined") {
            options.name = req.query.name
        }
        // check lọc trường username
        if (req.query.username != "undefined") {
            options.username = req.query.username
        }
        // check lọc trường age
        if (req.query.age != "undefined") {
            options.age = req.query.age
        }
        // khai báo limit
        const limit = req.query.limit ? req.query.limit : 10;
        // khai báo offset
        const offset = req.query.offset ? req.query.offset : 0;
        // truyền param vào categoryService để xử lý 
        const users = await userService.getAll(options, parseInt(limit), parseInt(offset));
        // Trả về kết quả 
        return res.json({
            status: 1,
            code: 200,
            data: [users]
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
        const username = req.body.username;
        const password = req.body.password ? md5(req.body.password) : md5('123456');
        const age = req.body.age ? req.body.age : null;
        const status = req.body.status ? req.body.status : 1;
        params = {
            name: name,
            username: username,
            password: password,
            age: age,
            status: status
        }
        const users = await userService.insert(params);
        if (users === false) {
            return res.status(500).json({
                status: 0,
                code: 500,
                message: "Đã xảy ra lỗi hệ thống , hãy thử lại"
            })
        } else {
            return res.status(200).json({
                status: 1,
                code: 200,
                message: "Đã thêm thành công user"
            })
        }
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
        const id = req.params.id ? req.params.id : null;
        // check Id xem có tồn tại hay ko
        const checkIdExists = await userService.checkExists(id)
        if (!id || checkIdExists === false) {
            return res.json({
                status: 0,
                code: 400,
                message: "Không tìm thấy id phù hợp"
            });
        }
        // Khai báo params
        var params = {};
        const status = req.body.status;
        if (typeof status != 'undefined') {
            params.status = status;
        }
        const users = await userService.update(params, parseInt(id));
        console.log("users", users);
        if (!params || users === false || users.length === 0) {
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

    }
}