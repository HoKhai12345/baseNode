const coreModels = require('../models/index');
const { Op, sequelize, fn } = require('sequelize');
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

    },

    insertNestedList: async (name, path, status) => {
        try {
            // Lấy ra right lơn nhất 
            const cateMax = await cateModel.findOne({
                attributes: [[cateModel.sequelize.fn('max', cateModel.sequelize.col('rgt')), 'rgt']
                ],
            });
            // Insert data với nút cha cao nhất
            const insertCate = await cateModel.create(
                {
                    name: name,
                    path: path,
                    status: status,
                    lft: cateMax.dataValues.rgt + 1,
                    rgt: cateMax.dataValues.rgt + 2
                }
            )
            return insertCate
        } catch (err) {
            console.log("ERR", err);
            return false
        }
    },

    deleteParentNestedList: async (id) => {
        try {
            console.log("id", id);
            const cateRecordById = await cateModel.findOne(
                {
                    where: {
                        id: id
                    }
                }
            );
            console.log("cateRecordById", cateRecordById);
            const widthSize = parseInt(cateRecordById.rgt - cateRecordById.lft + 1);
            // Xóa bản ghi cha và cả con
            const deleteParentAndChild = await cateModel.destroy(
                {
                    where: {
                        [Op.and]: [{
                            lft: { [Op.gte]: cateRecordById.lft, },
                        },
                        {
                            lft: { [Op.lte]: cateRecordById.rgt, }
                        }
                        ]

                    }
                }
            );
            console.log("deleteParentAndChild", deleteParentAndChild);
            // Update các bản ghi về đúng vị trí nodes
            const updateNodesRight = await cateModel.update(
                {
                    lft: this.lft - widthSize
                },
                {
                    where: {
                        rgt: {
                            [Op.gt]: cateRecordById.rgt,
                        }
                    }
                }

            );
            const updateNodesLeft = await cateModel.update(

                {
                    rgt: this.rgt - widthSize
                },
                {
                    where: {
                        lft: {
                            [Op.gt]: cateRecordById.rgt,
                        }
                    }
                }

            );
            return true
        } catch (err) {
            console.log("ERR", err);
            return false
        }

    },

    deleteParentAndUpdateChildNestedList: async (id) => {
        try {
            const cateRecordById = await cateModel.findOne(
                {
                    where: {
                        id: id
                    }
                }
            );
            console.log("cateRecordById", cateRecordById);
            const widthSize = parseInt(cateRecordById.rgt - cateRecordById.lft + 1);
            // Xóa bản ghi cha
            const deleteParentAndChild = await cateModel.destroy(
                {
                    where: {
                        id: cateRecordById.id
                    }
                }
            );
            // Update level cho các con lên vị trí của cha
            const updateNodesChildUpLevel = await cateModel.update(
                {
                    lft: this.lft -1,
                    rgt: this.rgt -1 
                },
                {
                    where: {
                        [Op.and]: [{
                            lft: { [Op.gt]: cateRecordById.lft, },
                        },
                        {
                            rgt: { [Op.lt]: cateRecordById.rgt, }
                        }
                        ]
                    }
                }
            );
        
            console.log("DELETEE SAU",updateNodesChildUpLevel);
            const updateRightNodes = await cateModel.update(
                {
                    lft: this.lft -2,
                    rgt: this.rgt -2
                },
                {
                    where: {
                        [Op.and]: [{
                            lft: { [Op.gt]: cateRecordById.rgt, },
                        },
                        {
                            rgt: { [Op.gt]: cateRecordById.rgt, }
                        }
                        ]
                    }
                }
            );
            return true
        } catch (err) {
            console.log("ERR", err);
            return false
        }
    },

    updateNodesNestedList: async (id, name, path, status, idParentNew) => {
        try {
            console.log("idParentNew", idParentNew);
       // Không cập nhật nodes
       if (!idParentNew) {
        const cate = await cateModel.update(
         {
             name: name,
             path: path,
             status: status
         },
         {
             where: {
                 id: id
             }
         }
        );
     }
     let nodesRightParent = 0
     // Trường hợp muốn update lên bậc root cha lớn nhất 
     if (idParentNew == 'root') {
        // Lấy ra right lớn nhất 
        const cateMax = await cateModel.findOne({
            attributes: [[cateModel.sequelize.fn('max', cateModel.sequelize.col('rgt')), 'rgt']
            ],
        });
        nodesRightParent = cateMax.dataValues.rgt
    }else {
        const parentNewsRecord = await cateModel.findOne({
            where: {
                id: idParentNew
            }
        });
        nodesRightParent = parentNewsRecord.dataValues.rgt
    }
        // Lấy ra bản ghi với id cha 
        const cateRecordById = await cateModel.findOne(
            {
                where: {
                    id: id
                }
            }
        );
        console.log("cateRecordById" , cateRecordById);
        // Lấy ra khối cần di chuyển
        const cateMoveUpdate = await cateModel.findAll({
                where: {
                    [Op.and]: [{
                        lft: { [Op.gte]: cateRecordById.lft, },
                    },
                    {
                        rgt: { [Op.lte]: cateRecordById.rgt, }
                    }
                    ]
                }
            
        });
        // Lấy ra size của khối 
        const widthSizeNodes = cateRecordById.rgt - cateRecordById.lft + 1;
        // Update di chuyển khối sang 1 hệ số lft rgt ảo
        const sessionNodes = await cateModel.update(
            {
                name: name,
                path: path,
                status: status,
                lft: (nodesRightParent - cateRecordById.lft) + this.lft,
                rgt: (nodesRightParent - cateRecordById.lft) + this.rgt
            },
            {
                where: {
                    [Op.and]: [{
                        lft: { [Op.gte]: cateRecordById.lft, },
                    },
                    {
                        rgt: { [Op.lte]: cateRecordById.rgt, }
                    }
                    ]
                }
            }
        );
        // Update cập nhật lại các nút cho đúng lft , rgt
        console.log("widthSizeNodes" , widthSizeNodes);
        const updateNodes = await cateModel.update(
            {
                lft: this.lft - widthSizeNodes,
                rgt: this.rgt - widthSizeNodes
            },
            {
                where: {
                    [Op.and]: [{
                        lft: { [Op.gte]: cateRecordById.rgt, },
                    },
                    {
                        rgt: { [Op.gte]: cateRecordById.rgt, }
                    }
                    ]
                }
            }
        );

        return true;
        } catch (err) {
            console.log("ERR" , err);
            return false
        }
    }

}

module.exports = categoryService