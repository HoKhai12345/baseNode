const { validationResult } = require('express-validator');
const productService = require('../service/productService');
module.exports = {

    login: async (req, res) => {
        console.log("REQ" , req.body);
        // Trả về kết quả 
        return res.json({
            status: 1,
            code: 200,
        });
    },
}