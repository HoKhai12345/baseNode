const PostService = require('../../Ecomerce/service/PostService');

// get post
exports.index = async function(req, res) {    
    const limit = req.query.limit ? req.query.limit : 10 ;
    const skip = req.query.skip ? req.query.skip : 0;
    const title = req.query.title ? req.query.title : null;
    PostService.getAllPost( limit , skip , title , function( err, post) {
        res.send({
            status: 0,
            code: 200,
            data:post,
            message: "Get data thành công"
        });
    });
}
exports.store = async function(req, res) {    
    const dataTitle = req.body.title ? req.body.title : null;
    const dataSlug = req.body.slug ? req.body.slug : null;
    if(!dataTitle && !dataSlug){
        return res.send({
            status:1,
            code:400,
            message:"INSERT ko thành công"
        })
    }
 
    PostService.insertPost( dataTitle , dataSlug,function( err, result) {
    if(result == null){
    res.send({
        status:1,
        code:500,
        message:"INSERT ko thành công"
    })
    }
    res.send(
        {
                status: 0,
                code: 200,
                message: "INSERT thành công"
        }
    );
});
}
// update post 
exports.update = async function(req, res) {    
    const id = req.params.id ? req.params.id : null;
    const dataUpdate = req.body
PostService.updatePost( id , dataUpdate ,function( err, result) {
    if(result == null){
    res.send({
        status:1,
        code:500,
        message:"Update ko thành công"
    })
    }
    res.send(
        {
                status: 0,
                code: 200,
                message: "Update thành công"
        }
    );
});
}
// Xóa 1 post
exports.delete = async function(req, res) {
    // Lấy id của bản ghi    
    const id = req.params.id ? req.params.id : null;
    PostService.deletePost( id ,function( err, result) {
    if(result == null){
    res.send({
        status:1,
        code:500,
        message:"Delete ko thành công"
    })
    }
    res.send(
        {
                status: 0,
                code: 200,
                message: "Delete thành công"
        }
    );
});
}