const coreModels = require('../models/index');
const productsModel = coreModels.Products
const postsModel = coreModels.Posts
const usersModel = coreModels.User
const catgoryModel = coreModels.Categories

const postsService = {
    cachePrefix: 'PRODUCT_',
    getAll: async (options, limit, offset) => {
        // khai báo đối tượng where
        let where = {}
        // check tồn tại của param title
        if (typeof options.title !== 'undefined') {
            where.name = options.title

        }
        // check tồn tại của param slug
        if (typeof options.name !== 'undefined') {
            where.slug = options.slug
        }
        // check tồn tại của param slug
        if (typeof options.name !== 'undefined') {
            where.slug = options.slug
        }
        // check tồn tại của param categoryId
        if (typeof options.categoryId !== 'undefined') {
            where.categoryId = options.categoryId
        }
        // check tồn tại của param creatorId
        if (typeof options.creatorId !== 'undefined') {
            where.creatorId = options.creatorId
        }
        // querry lấy tất cả bản ghi với điều kiện where
        const posts = await postsModel.findAll(
            {
                where: where,
                offset: offset,
                limit: limit,
                include: [{
                    model: usersModel,
                    as: 'creator'
                  },
                  {
                    model: catgoryModel,
                    as: 'categories'
                  }
                ]
            },
        );

        return posts
    },
    insert: async (params) => {
        try {
            const products = await productsModel.create(
                params
            )
            return products
        } catch (error) {
            return false
        }
    },
    update: async (params, id) => {
        try {
            const products = await productsModel.update(
                params,
                {
                    where: { id: id }
                }
            );
            return products
        } catch (error) {
            return false
        }
    }
}

module.exports = postsService