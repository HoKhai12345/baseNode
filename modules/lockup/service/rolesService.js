const coreModels = require('../models/index');
const { Op } = require('sequelize');
const { sequelize } = require('../models/index');
const roleModel = coreModels.Roles
const userRolesModel = coreModels.Users_Roles
const userModel = coreModels.User

const rolesService = {
    cachePrefix: 'ROLES_',
    getAll: async (options, limit, offset) => {
        // khai báo đối tượng where
        let where = {}
        // check tồn tại của param name
        if (typeof options.name !== 'undefined') {
            where = {
                name: options.name
            }
        }
        const roles = await roleModel.findAndCountAll({
            where: where,
            offset: offset,
            limit: limit,
            include: {                                     // inner join
                model: userModel,
                as: 'user',
                require: true
            }
        },
        )
        return roles
    },
    insert: async (params) => {
        try {
            // thêm role vào database
            const role = await roleModel.create(
                params
            );
            return role
        } catch (error) {
            return false
        }
    },
    checkExists: async (id) => {
        try {
            const role = await roleModel.findOne({
                where: {
                    id: id
                }
            })
            if (role) {
                return true
            } else {
                return false
            }
        } catch (err) {
            return false
        }
    },
    update: async (params, id) => {
        try {
            const role = roleModel.update(params, {
                where: { id: id }
            })
            return role;
        } catch (err) {
            console.log("ERR", err);
            return false
        }
    },
    deleteRoleById: async (roleId) => {
        // Xử lý xóa bên bảng phụ trước , rồi xóa bên role
        const t = await sequelize.transaction();
        try {

            const usersRoles = await userRolesModel.destroy({
                where: {
                    roleId: roleId
                },
                force: true
            }, { transaction: t });

            await roleModel.destroy({
                where: {
                    id: roleId
                },
                force: true

            }, { transaction: t });

            await t.commit();
            return true
        } catch (error) {
            await t.rollback();
            return false
        }

    }
}

module.exports = rolesService