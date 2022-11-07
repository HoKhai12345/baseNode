const { body } = require('express-validator')
module.exports = {
    store: [
        body('name', 'Không được để trống trường name').exists(),
        body('name', 'Trường name tối thiểu 3 ký tự').isLength({ min: 3 }),
        body('name', 'Trường name tối đa 255 ký tự').isLength({ max: 255 }),
        body('path', 'Không được để trống trường path').exists(),
    ],
    update: [
        body('name', 'Không được để trống trường name').exists(),
        body('name', 'Trường name tối thiểu 3 ký tự').isLength({ min: 3 }),
        body('name', 'Trường name tối đa 255 ký tự').isLength({ max: 255 }),
        body('path', 'Không được để trống trường path').exists(),
    ]
}