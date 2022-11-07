
module.exports = async (req, res, next) => {
  
    try {
        const checkAge = req.query.age ? req.query.age : 20
      
        if(checkAge > 20){
               next();
        }else{
            res.status(200).json({
                status: 1,
                code: 200,
                message: "Tuổi nhỏ hơn 20 , không hợp lệ"
            });
        }
        
    } catch (error) {
        res.status(401).json({
            status: 0,
            code: 401,
            message: "Fail , redirect"
        });
    }
}