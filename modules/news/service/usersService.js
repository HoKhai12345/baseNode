const coreModels = require('../models/index');
const { Op } = require('sequelize');
var jwt = require('jsonwebtoken');
var md5 = require('md5');
const roleModel = coreModels.Roles
const userRolesModel = coreModels.User_Roles
const userModel = coreModels.User

const categoryService = {
    cachePrefix: 'USER_',
    getAll: async (options, limit, offset) => {
        // khai báo đối tượng where
        let where = {}
        // check tồn tại của param name
        if (typeof options.name !== 'undefined') {
            where = {
                name: options.name
            }
        }

        const user = await userModel.findAndCountAll({
            where: where,
            offset: offset,
            limit: limit,
            include: {                                     // right join
                model: roleModel,
                as: 'roles',
                right: true,
            }
            // include: {                                 // inner join
            //     model: roleModel,
            //     as: 'roles',
            //     require: true
            // }
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
        } catch (err){
         console.log("ERR" , err);
         return false
        }
    }
}

module.exports = categoryService