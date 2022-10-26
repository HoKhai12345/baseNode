var sql = require(' ../../../db/db');

module.exports = {

index: async(limit , skip) => {
try{

  sql.query(`SELECT * FROM posts LIMIT ${limit} OFFSET ${skip}`, function (err, res) {

    if(err) {
        console.log("error: ", err);
        // result(err, null);
    }
    else{
        console.log("res" , res);
        // result(null, res);
    }
});  

}catch(e){
console.log("FAILS")
}


}

}