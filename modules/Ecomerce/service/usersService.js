const coreModels = require('../models/index');
const { Op } = require('sequelize');
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
}

module.exports = categoryService