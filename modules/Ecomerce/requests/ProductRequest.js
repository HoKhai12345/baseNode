const { body } = require('express-validator')

module.exports = {
    create: [
        body('categoryId', 'Không được để trống trường categoryId').exists(),
        body('name', 'Không được để trống trường name').exists(),
        body('name', 'Tối thiểu 3 ký tự').isLength({ min: 3 })
    ],
    update: [
        body('name', 'Không được để trống trường name').exists(),
        body('name', 'Tối thiểu 3 ký tự').isLength({ min: 3 }),
        body('categoryId', 'Không được để trống trường categoryId').exists(),
        body('thumbnail', 'Không được để trống trường thumbnail').exists(),
    ]
}