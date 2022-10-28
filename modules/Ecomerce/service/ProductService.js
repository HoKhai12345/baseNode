const coreModels = require('../models/index');
const {Op} = require('sequelize');
const model = coreModels.Products
const cateModel = coreModels.Categories

const ProductService = {
    cachePrefix: 'PRODUCT_', 
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
        const products = await model.findAll({
            where: where,
            offset: offset,
            limit: limit
        })
        return products
    },
    insert: async (params) => {
        const products = await model.create({
            params
        })
    }


}

module.exports = ProductService