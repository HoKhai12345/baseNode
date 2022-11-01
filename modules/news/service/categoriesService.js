const coreModels = require('../models/index');
const { Op } = require('sequelize');
const productModel = coreModels.Products
const cateModel = coreModels.Categories

const categoryService = {
    cachePrefix: 'CATE_',
    getAll: async (options, limit, offset) => {
        // khai báo đối tượng where
        let where = {}
        // check tồn tại của param name
        if (typeof options.name !== 'undefined') {
            where = {
                name: options.name
            }
        }
        // querry lấy tất cả bản ghi với điều kiện where
        const cate = await cateModel.findAndCountAll({
            where: where,
            offset: offset,
            limit: limit,
            include: [{                       // cái này là right join
                model: productModel,
                as: "products",
                right: true
            }]
            // include: {                    // cái này là inner join
            //     model: productModel,
            //     as: "products",
            //     required: true
            // }

            // include: ['products']   // cái là left join
        },
        );
        return cate
    },
    insert: async (params) => {
        try {
            const products = await model.create(
                params
            )
            return products
        } catch (error) {
            return false
        }
    }
}

module.exports = categoryService