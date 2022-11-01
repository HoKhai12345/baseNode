const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {

    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(403).json({
            status: 0,
            code: 403,
            message: "Cần có token để xác thực"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        next();
    } catch (error) {
        res.status(401).json({
            status: 0,
            code: 401,
            message: "Không tìm thấy token"
        });
    }
}