const { validationResult, check } = require('express-validator');
const userService = require('../service/usersService');
module.exports = {

    login: async (req, res) => {
        // Khai báo bắt các errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                status: 0,
                code: 400,
                errors: errors.array()
            })
        }
        // Khai báo biến
        const username = req.body.username;
        const password = req.body.password;
        const users = await userService.checkLogin(username, password);
        if (users === false) {
            return res.json({
                status: 0,
                code: 400,
                message: "Sai thông tin đăng nhập"
            });
        } else {
            const token = await userService.endCodeJwt(users);
            if (token === false) {
                return res.json({
                    status: 0,
                    code: 400,
                    message: "Đã xảy ra lỗi"
                });
            } else {
                return res.json({
                    status: 1,
                    code: 200,
                    accessToken: token
                });
            }
        }
    },
}