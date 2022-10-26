module.exports = {

index : async(req, res) => {
            return res.status(200).json({
                status: 0,
                code: 200,
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

}

}