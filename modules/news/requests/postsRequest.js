const { body , check} = require('express-validator')
const rolesService = require('../../news/service/rolesService')
module.exports = {
    store: [
        body('title', 'Không được để trống trường title').exists(),
        body('title', 'Tối thiểu 3 ký tự').isLength({ min: 3 }),
        body('title', 'Tối đa 255 ký tự').isLength({ max: 255 }),
        body('categoryId', 'Không được để trống trường categoryId').exists(),
        body('creatorId', 'Không được để trống trường creatorId').exists(),
        body('creatorId', 'Không được để trống trường creatorId').trim()
        .optional({ checkFalsy: true })
        .isNumeric().withMessage('Trường creatorId phải có giá trị là số').isLength({max: 11}).withMessage("Tối đa 11 kí tự"),
        body('categoryId').trim()
        .optional({ checkFalsy: true })
        .isNumeric().withMessage('Trường CategoryId phải có giá trị là số').isLength({max: 11}).withMessage("Tối đa 11 kí tự"),
        body('content', 'Không được để trống trường content').exists(),
    ],
    update: [
        body('title', 'Không được để trống trường title').exists(),
        body('title', 'Tối thiểu 3 ký tự').isLength({ min: 3 }),
        body('title', 'Tối đa 255 ký tự').isLength({ max: 255 }),
        body('categoryId', 'Không được để trống trường categoryId').exists(),
        body('creatorId', 'Không được để trống trường creatorId').exists(),
        body('creatorId', 'Không được để trống trường creatorId').trim()
        .optional({ checkFalsy: true })
        .isNumeric().withMessage('Trường creatorId phải có giá trị là số').isLength({max: 11}).withMessage("Tối đa 11 kí tự"),
        body('categoryId').trim()
        .optional({ checkFalsy: true })
        .isNumeric().withMessage('Trường CategoryId phải có giá trị là số').isLength({max: 11}).withMessage("Tối đa 11 kí tự"),
        body('content', 'Không được để trống trường content').exists(),
    ]
}