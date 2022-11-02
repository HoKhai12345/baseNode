const userService = require('../service/usersService');
const rolesService = require('../service/rolesService');
const { validationResult } = require('express-validator');
const md5 = require('md5');
module.exports = {

    index: async (req, res) => {
        // Find all roles
        console.log("req.query", req.query);
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
        // truyền param vào categoryService để xử lý 
        const roles = await rolesService.getAll(options, parseInt(limit), parseInt(offset));
        // Trả về kết quả 
        return res.json({
            status: 1,
            code: 200,
            data: [roles]
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
        params = {
            name: name,
        }
        const roles = await rolesService.insert(params);
        if (roles === false) {
            return res.status(500).json({
                status: 0,
                code: 500,
                message: "Đã xảy ra lỗi hệ thống , hãy thử lại"
            })
        } else {
            return res.status(200).json({
                status: 1,
                code: 200,
                message: "Đã thêm thành công role"
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
        const checkIdExists = await rolesService.checkExists(id)
        if (!id || checkIdExists === false) {
            return res.json({
                status: 0,
                code: 400,
                message: "Không tìm thấy id phù hợp"
            });
        }
        // Khai báo params
        var params = {};
        const name = req.body.name;
        if (typeof name != 'undefined') {
            params.name = name;
        }
        const role = await rolesService.update(params, parseInt(id));
        console.log("params", params);
        if (!params || Object.keys(params).length === 0 || role === false || role.length === 0) {
            return res.json({
                status: 1,
                code: 400,
                message: "Tham số truyền không hợp lệ"
            });
        }
        return res.json({
            status: 1,
            code: 200,
            message: "Update quyền thành công"
        });

    },
    delete: async (req, res) => {
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
        const checkIdExists = await rolesService.checkExists(id)
        if (!id || checkIdExists === false || id == 1 || id == 2) {
            return res.json({
                status: 0,
                code: 400,
                message: "Không tìm thấy id phù hợp"
            });
        }
        const deleteRole = await rolesService.deleteRoleById(id);
        if (deleteRole == true) {
            return res.json({
                status: 1,
                code: 200,
                message: "Xóa quyền thành công"
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