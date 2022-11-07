const { validationResult } = require('express-validator');
const postsService = require('../service/postsService');
const uploadImg = require('../config/uploadImg');
const helper = require('../helper/index');
var multer = require('multer');
const fs = require('fs')

module.exports = {

    index: async (req, res) => {
        // khai báo khởi tạo đối tượng options
        var options = {};
        // check lọc trường slug
        if (req.query.slug != "undefined") {
            options.slug = req.query.slug
        }
        // check lọc trường title
        if (req.query.title != "undefined") {
            options.title = req.query.title
        }
        // check lọc trường creatorId
        if (req.query.creatorId != "undefined") {
            options.creatorId = req.query.creatorId
        }
        // check lọc trường categoryId
        if (req.query.categoryId != "undefined") {
            options.categoryId = req.query.categoryId
        }
        // check lọc trường status
        if (req.query.status != "undefined") {
            options.status = req.query.status
        }
        // khai báo limit
        const limit = req.query.limit ? req.query.limit : 10;
        // khai báo offset
        const offset = req.query.offset ? req.query.offset : 0;
        // truyền param vào productService để xử lý 
        const posts = await postsService.getAll(options, parseInt(limit), parseInt(offset));
        // Trả về kết quả 
        return res.json({
            status: 1,
            code: 200,
            data: posts
        });
    },

    store: async (req, res, cb) => {
        // Khai báo bắt các errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                status: 0,
                code: 400,
                errors: errors.array()
            })
        }
       
        // Khai báo params
        var params = {};
        console.log("req.body" , req.body , req.query , req.params , req.file , req.file.path);
        const typeNameFile = req.file.originalname.slice(-3);
        console.log("typeNameFile" , typeNameFile);
        const nameImgUpload = req.file.path.split("\\")[3];
        // const nameImgUpload = req.file.originalname.split(".")[0] + '.' + typeNameFile;
        if (typeNameFile != 'jpg' && typeNameFile != 'png') {
            console.log("Không đúng định dạng ảnh");
            fs.unlink(__dirname + `../../../../storage/img/news/${nameImgUpload}`, function (err) {
                if (err) throw err;
                console.log('Xóa ảnh thành công !');
            });
              return res.json({
                status: 1,
                code: 400,
                message: "Không đúng định dạng ảnh"
            });
        }
        const title = req.body.title;
        const categoryId = req.body.categoryId;
        const creatorId = req.body.creatorId;
        const content = req.body.content;
        const status = req.body.status ? req.body.status : 1;
        const slug = req.body.slug ? req.body.slug : helper.string_to_slug(title)
        console.log("nameImgUpload" , nameImgUpload);
        params = {
            title: title,
            creatorId: parseInt(creatorId),
            categoryId: parseInt(categoryId),
            slug: slug,
            thumbnail: nameImgUpload,
            status: status,
            content: content
        }
        const posts = await postsService.insert(params);
        // Nếu trường hợp trả về là false thì trả ra thống báo lỗi 
        if (posts == false) {
            return res.json({
                status: 0,
                code: 400,
                message: "Đã xảy ra lỗi"
            });
        }
        // Còn lại thì trả về response ok
        return res.json({
            status: 1,
            code: 200,
            data: [posts]
        });
    },

    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                status: 0,
                code: 400,
                errors: errors.array()
            })
        }
        const id = req.params.id;
        // Khai báo params
        let params = {};
        const title = req.body.title;
        const categoryId = req.body.categoryId;
        const creatorId = req.body.creatorId;
        const content = req.body.content;
        const status = req.body.status ? req.body.status : 1;
        const slug = req.body.slug ? req.body.slug : helper.string_to_slug(title)
        const thumbnail = req.file.filename ? req.file.filename : null;
        params = {
            title: title,
            creatorId: parseInt(creatorId),
            categoryId: parseInt(categoryId),
            slug: slug,
            thumbnail: thumbnail,
            status: status,
            content: content
        }
        const recordPost = await postsService.getRecordById(id);
        if (!recordPost || recordPost === false) {
            return res.json({
                status: 0,
                code: 400,
                message: "Tham số truyền không hợp lệ"
            });
            
        }
        const oldThumbnail = recordPost.thumbnail;
        const posts = await postsService.update(params, id , oldThumbnail);
         console.log("postsposts",posts);
        if (!params || posts === false || posts === 0) {
            return res.json({
                status: 1,
                code: 400,
                message: "Update không thành công , kiểm tra lại các tham số"
            });
        }
        return res.json({
            status: 1,
            code: 200,
            message: "Update bản ghi thành công"
        });
    },

    delete: async (req , res) => {
        const id = req.params.id ? req.params.id : null;
        // check Id xem có tồn tại hay ko
        const posts = await postsService.checkExists(id)
        if (!id || posts === false) {
            return res.json({
                status: 0,
                code: 400,
                message: "Không tìm thấy id phù hợp"
            });
        }
        // Lấy ra thumbnail để sẽ xử lý khi xóa ảnh 
        const thumbnailName = posts.thumbnail;
        const deletePosts = await postsService.deleteById(id , thumbnailName);
        if (deletePosts == true) {
            return res.json({
                status: 1,
                code: 200,
                message: "Xóa bài viết thành công"
            });
        } else {
            return res.json({
                status: 0,
                code: 500,
                message: "Đã có lỗi hệ thống xảy ra"
            });
        }
    }
}