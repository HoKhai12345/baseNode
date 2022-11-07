var multer = require('multer');


module.exports = {

    uploadFile: async function (req, res) {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "storage/img/news");
            },
            filename: async function (req, file, cb) {

                const typeNameFile = file.originalname.split(".")[1];
                if (typeNameFile != 'jpg' && typeNameFile != 'png') {
                    console.log("Không đúng định dạng ảnh");
                    return res.json({
                        status: 1,
                        code: 400,
                        message: "Không đúng định dạng ảnh"
                    });
                } else {
                    cb(null, file.originalname.split(".")[0] + "-" + Date.now() + '.' + typeNameFile);
                    var upload = multer({ storage: storage });
                    
                    return upload.single('thumbnail')
                }
            },
        });
    },

    upImg: async function (typeName) {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "storage/img/news");
            },
            filename: async function (req, file, cb) {
                    cb(null, typeName);
                    var upload = multer({ storage: storage });
            },
        });
    }


}
