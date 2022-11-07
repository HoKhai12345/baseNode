const coreModels = require('../models/index');
const { Op } = require('sequelize');
var jwt = require('jsonwebtoken');
var md5 = require('md5');
const roleModel = coreModels.Roles
const userRolesModel = coreModels.Users_Roles
const userModel = coreModels.User

const categoryService = {
    cachePrefix: 'USER_',
    getAll: async (options, limit, offset) => {
        // khai báo đối tượng where
        let where = {}
        // check tồn tại của param name
        if (typeof options.name !== 'undefined') {
            where.name = options.name
        }
        // check tồn tại của param username
        if (typeof options.username !== 'undefined') {
            where.username = options.username
        }
        // check tồn tại của param age
        if (typeof options.age !== 'undefined') {
            where.age = options.age
        }

        const user = await userModel.findAndCountAll({
            where: where,
            offset: offset,
            limit: limit,
            // include: {                                     // right join
            //     model: roleModel,
            //     as: 'roles',
            //     right: true,
            // }
            include: {                                 // inner join
                model: roleModel,
                as: 'roles',
                require: true
            }
            // include:                                   // left join
            // [{                              
            //     model: roleModel,
            //     as: 'roles',
            // }
            // ]


        },
        )

        return user
    },
    checkLogin: async (username, password) => {
        try {
            console.log("username", username);
            let where = {}
            // check tồn tại của param name
            if (typeof username !== 'undefined') {
                where.username = username
            }
            if (typeof password !== 'undefined') {
                where.password = md5(password)
            }
            console.log("WHERE", where);
            const users = await userModel.findOne({
                where: where
            });
            console.log("users", users.length);
            if (users.length = 1) {
                return users;
            } else {
                return false;
            }
        } catch (err) {
            console.log("ERR", err);
            return false
        }
    },
    endCodeJwt: async (params) => {
        try {
            const userId = params.id;
            const username = params.username;
            const name = params.name;
            const age = params.age;
            // encode jwt
            const token = jwt.sign({ username: username, userId: userId }, process.env.PRIVATE_KEY, { expiresIn: '2h' });
            console.log("TOKEN", token);
            return token
        } catch (err) {
            console.log("ERR", err);
            return false
        }
    },
    checkRole: async (userId) => {
        try {
            // khai báo đối tượng where
            let where = {}
            // check tồn tại của userId
            if (typeof userId !== 'undefined') {
                where = {
                    id: userId
                }
            }
            const users = await userModel.findOne(
                {
                    where: where,
                    include: [{                                     // left join
                        model: roleModel,
                        as: 'roles',
                    }]
                }
            );
            return users
        } catch (err) {
            console.log("ERR", err);
            return false
        }
    },
    findByUser: async (username) => {
        try {
            const user = userModel.findOne({
                where: {
                    username: username
                }
            });
            return user
        } catch (err) {
            console.log("ERROR", err);
        }
    },
    insert: async (params) => {
        try {
            // Nhận params và xử lý thêm user và thêm quyền mặc định cho user mới
            const user = await userModel.create(
                params
            );
            // Thêm quyền mặc định là quyền content
            await userRolesModel.create(
                {
                    UserId: user.id,
                    RoleId: 2
                }
            );
            return user
        } catch (error) {
            return false
        }
    },
    update: async (params, id) => {
        try {
            const users = userModel.update(params, {
                where: { id: id }
            })
            return users;
        } catch (err) {
            console.log("ERR", err);
            return false
        }
    },
    checkExists: async (id) => {
        try {
            const user = await userModel.findOne({
                where: {
                    id: id
                }
            })
            if (user) {
                return true
            } else {
                return false
            }
        } catch (err) {
            return false
        }
    }
}

module.exports = categoryService