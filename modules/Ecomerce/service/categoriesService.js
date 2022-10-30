const coreModels = require('../models/index');
const {Op} = require('sequelize');
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
        const cate = await cateModel.findAll({
            where: where,
            offset: offset,
            limit: limit
        },
        // {model: cateModel, include: [cateModel.products] })      
        { include: ['products']}
        );

        return cate
        //return products
    },
    insert: async (params) => {
        try {
            const products = await model.create(
                params
            )
            return products
        }catch(error){
            return false
        }
    }
}

module.exports = categoryService