const { body } = require('express-validator')

module.exports = {
    login: [
        body('username', 'Không được để trống trường username').exists(),
        body('password', 'Không được để trống trường password').exists(),
        body('password', 'Tối thiểu 6 ký tự').isLength({ min: 6 })
    ],
}