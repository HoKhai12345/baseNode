const { body } = require('express-validator')
const rolesService = require('../../news/service/rolesService')
module.exports = {
    store: [
        body('name', 'Không được để trống trường name').exists(),
        body('name', 'Tối thiểu 3 ký tự').isLength({ min: 3 }),
    ],
    update: [
        // body('status', 'Không được để trống status').exists()
    ]
}