const jwt = require("jsonwebtoken");
const usersService = require("../modules/news/service/usersService");
module.exports = async (req, res, next) => {

    let token = "";

    var stringUrl = req.originalUrl;
    // Tách chuỗi url thành mảng 
    var arrayUrl = stringUrl.split('/');
    const prefixPage = arrayUrl[3] ? arrayUrl[3] : 0;
    // Lấy ra được các chuyên mục muốn được vào thao tác 
    if (req.header('Authorization') != undefined) {
        token = req.header('Authorization').replace('Bearer ', '');
    }

    if (!token) {
        return res.status(403).json({
            status: 0,
            code: 403,
            message: "Cần có token để xác thực"
        });
    }
    try {
        const users = jwt.verify(token, process.env.PRIVATE_KEY);
        const roleUsers = await usersService.checkRole(users.userId);
        if (roleUsers === false) {
            return res.status(403).json({
                status: 0,
                code: 403,
                message: "Bạn không có quyền truy cập"
            });
        } else {
            arrayRoleUser = roleUsers.roles;
            // tìm quyền hợp lệ cho user
            var fillRoleAdmin = arrayRoleUser.filter(function (roles) {
                return roles.id == 1;
            });
            if (!fillRoleAdmin || fillRoleAdmin.length == 0) {
                if (prefixPage == 'posts') {
                    next();
                }
                else if (prefixPage == 'cate') {
                    next();
                } else {
                    return res.status(403).json({
                        status: 0,
                        code: 403,
                        message: "Bạn không có quyền truy cập"
                    });
                }
            } else {
                next();
            }
        }
    } catch (error) {
        return res.status(401).json({
            status: 0,
            code: 401,
            message: "Không tìm thấy token hợp lệ"
        });
    }
}