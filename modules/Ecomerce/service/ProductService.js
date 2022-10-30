const coreModels = require('../models/index');
const {Op} = require('sequelize');
const { param } = require('express-validator');
const productsModel = coreModels.Products
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
        const products = await productsModel.findAll(
        {
            where: where,
            offset: offset,
            limit: limit
        },
        // { include: ['cate']}
        );

        return products
    },
    insert: async (params) => {
        try {
            const products = await productsModel.create(
                params
            )
            return products
        }catch(error){
            return false
        }
    },
    update: async (params , id) => {
        try {
            const products = await productsModel.update(
                params,
                {
                    where: { id: id }
                }
            );
            return products
        }catch(error){
            return false
        }
    }
}

module.exports = ProductService