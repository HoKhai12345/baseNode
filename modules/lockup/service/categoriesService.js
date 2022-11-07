const coreModels = require('../models/index');
const { Op } = require('sequelize');
const postsModel = coreModels.Posts
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
        // check tồn tại của param path
        if (typeof options.path !== 'undefined') {
            where = {
                path: options.path
            }
        }
        // check tồn tại của param status
        if (typeof options.status !== 'undefined') {
            where = {
                status: options.status
            }
        }
        // querry lấy tất cả bản ghi với điều kiện where
        const cate = await cateModel.findAndCountAll({
            where: where,
            offset: offset,
            limit: limit,
            // include: [{                       // cái này là right join
            //     model: postsModel,
            //     as: "posts",
            //     right: true
            // }]
            // include: {                    // cái này là inner join
            //     model: postsModel,
            //     as: "posts",
            //     required: true
            // }

            include: ['products']   // cái là left join
        },
        );
        return cate
    },
    insert: async (params) => {
        try {
            console.log("params", params);
            const cate = await cateModel.create(
                params
            )
            return cate
        } catch (error) {
            console.log("error", error);
            return false
        }
    },

    update: async (params, id) => {
        try {
            const cate = await cateModel.update(
                params,
                {
                    where: { id: id }
                }
            );
            return cate
        } catch (error) {
            return false
        }
    },

    checkExists: async (id) => {
        try {
            const cate = await cateModel.findOne({
                where: {
                    id: id
                }
            })
            if (cate) {
                return true
            } else {
                return false
            }
        } catch (err) {
            return false
        }
    },

    deleteById: async (id) => {
        try {
            const cate = await cateModel.update(
                {
                    status: 0
                },
                {
                    where: { id: id }
                }
            )
            return cate
        } catch (error) {
            return false
        }

    }
}

module.exports = categoryService