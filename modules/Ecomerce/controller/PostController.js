const { data } = require('node-persist');
const dbUser = require('../../../db/db.json');
const PostService = require('../../Ecomerce/service/PostService');
module.exports = {

index : async(req, res) => {
    const limit = req.query.limit ? req.query.limit : 10 ;
    const skip = req.query.skip ? req.query.skip : 0;
    const data = PostService.index(1,10);
            return res.status(200).json({
                status: 0,
                code: 200,
                data:data,
                message: "Thành công truy cập api "
            })
 
},

store : async(req, res) => {
    let errors = [];
    const params = req.body;
    console.log("PARAMS" , params);
            return res.status(200).json({
                status: 0,
                code: 200,
                params: params,
                message: "Thành công truy cập api post"
            })

},

update : async(req , res)=>{

},

delete : async(req , res)=>{

}

}