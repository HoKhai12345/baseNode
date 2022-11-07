const coreModels = require('../models/index');
const productsModel = coreModels.Products
const postsModel = coreModels.Posts
const usersModel = coreModels.User
const catgoryModel = coreModels.Categories
const fs = require('fs')

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
        // check tồn tại của param status
        if (typeof options.status !== 'undefined') {
            where.status = options.status
        }
        // querry lấy tất cả bản ghi với điều kiện where
        const posts = await postsModel.findAll(
            {
                where: where,
                offset: offset,
                limit: limit,
                include: [
                    {                    // cái này là inner join
                        model: usersModel,
                        as: "creator",
                        required: true
                    },
                    {
                        model: catgoryModel,
                        as: 'categories',
                        where: {
                            status: 1
                        }
                    }
                ]
            },
        );

        return posts
    },
    insert: async (params) => {
        try {
            console.log("params", params);
            const posts = await postsModel.create(
                params
            )
            return posts
        } catch (error) {
            return false
        }
    },
    update: async (params, id, oldThumbnail) => {
        try {
            const posts = await postsModel.update(
                params,
                {
                    where: { id: id }
                }
            );
            // Xóa ảnh 
            console.log("thumbnail", oldThumbnail);
            fs.unlink(__dirname + `../../../../storage/img/news/${oldThumbnail}`, function (err) {
                if (err) throw err;
                console.log('Xóa ảnh thành công !');
            });
            return posts
        } catch (error) {
            console.log("error", error);
            return false
        }
    },

    checkExists: async (id) => {
        try {
            const post = await postsModel.findOne({
                where: {
                    id: id
                }
            })
            if (post) {
                return post
            } else {
                return false
            }
        } catch (err) {
            return false
        }
    },

    deleteById: async (id, thumbnail) => {
        try {
            const cate = await postsModel.destroy({
                where: {
                    id: id
                },
            }
            );
            // Xóa ảnh 
            console.log("thumbnail", thumbnail);
            fs.unlink(__dirname + `../../../../storage/img/news/${thumbnail}`, function (err) {
                if (err) throw err;
                console.log('Xóa ảnh thành công !');
            });
            return true
        } catch (error) {
            console.log("error", error);
            return false
        }
    },
    getRecordById: async (id) => {
        try {
            const post = await postsModel.findOne({
                where: {
                    id: id
                }
            })
            if (post) {
                return post
            } else {
                return false
            }
        } catch (err) {
            return false
        }
    }
}

module.exports = postsService