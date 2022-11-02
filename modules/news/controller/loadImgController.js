const fs = require('fs');
module.exports = {

    loadImg : (req, res) => {
        console.log("IMG" , req.params.imgName);
        const imgName = req.params.imgName;
        fs.readFile(__dirname + '../../../../storage/img/news/' + imgName, function (err, data) {
            if (err) {
                console.error(err);
                return res.status(404).json({
                    status: 0,
                    code: 404,
                    message: "Không tìm thấy ảnh !"
                })
            }
            res.write(data);
            res.end();
         });
    }

}