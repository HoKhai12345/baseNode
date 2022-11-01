const userService = require('../service/usersService');
module.exports = {

    index: async(req, res) => {
        // Find all posts
        console.log("req.query" , req.query);
        // khai báo khởi tạo đối tượng options
        var options = {};
        // check lọc trường name
        if (req.query.name != "undefined"){
            options.name = req.query.name
        }
        // khai báo limit
        const limit = req.query.limit ? req.query.limit : 10;
        // khai báo offset
        const offset = req.query.offset ? req.query.offset : 0;
        // truyền param vào categoryService để xử lý 
        const users = await userService.getAll(options, parseInt(limit) , parseInt(offset));
        // Trả về kết quả 
        return res.json({
            status: 1,
            code: 200,
            data: [users]
        });
    },
}