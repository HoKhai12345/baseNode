const db = require('../../../db/db.json');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecomerce"
});


module.exports = {

index: async(limit , skip) => {
try{
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(`SELECT *
        FROM users
        LIMIT ${limit}`, function (err, result) {
          if (err) throw err;

        
          console.log("result" , result);
        return result
        });
      });
//    const data = postData.find();
//    console.log("data" , data);
}catch(e){
console.log("FAILS")
}


}

}