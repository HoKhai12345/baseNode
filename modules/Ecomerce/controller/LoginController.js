var storage = require('node-persist');
var path = require('path');
const dirPath = path.join(__dirname, '../../../storage/session');
const session = require('express-session');
storage.init('/auth');
module.exports = {

    login : async(req, res) => {
        console.log(req.body);
        const username = req.body.username ? req.body.username : null
        const password = req.body.password ? req.body.password : null


        console.log("console.log(__dirname)",dirPath);
        storage.setItem('auth', {id:1,name:"Hồ Khải"});
        var auth = storage.getItem('auth');
        try{
            console.log("auth" , auth);
            return res.status(200).json({
                status: 0,
                code: 200,
                message: "Bạn sẽ login"
            })
        }catch(e){
            return res.status(401).json({
                status: 0,
                code: 200,
                message: "Đã xảy ra lỗi không mong muốn , hãy thử đăng nhập lại"
            })
        }
                
     
    },
    
    register : async(req, res) => {
        
                return res.status(200).json({
                    status: 0,
                    message: "Đang phát triển chức năng này"
                })
    
    }
    
    }