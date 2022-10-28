var sql = require(' ../../../db/db');
var Post = function(posts){
  // console.log(posts);
  // this.name = posts.name;
  // this.title = post.title;
};

// Get dữ liệu
Post.getAllPost = function getAllPost(limit , skip , title , result) {
  let queryString = "";
  if(title){
    queryString = "where title LIKE '%" + title + "%'"
  }
  sql.query(`Select * from posts ${queryString} LIMIT ${limit} OFFSET ${skip}`, function (err, res) {

      if(err) {
          console.log("error: ", err);
          result(null, err);
      }
      else{
          result(null, res);
      }
  });
};
// Post dữ liệu
Post.insertPost = function insertPost(title , slug , result) {
  
  console.log("INSERT INTO `ecomerce`.`posts` (`title` , `slug`) VALUES ('"+title+"' , '"+ slug +"')");
  sql.query("INSERT INTO `ecomerce`.`posts` (`title` , `slug`) VALUES ('"+title+"' , '"+ slug +"')", function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(null, err);
      }
      else{
          result(null, "Insert thành công");
      }
  });
}; 
// Update dữ liệu
Post.updatePost = function updatePost(id ,dataPost , result) {
  // tạo ra chuỗi để nối string
  let stringquery = "";
  const title = dataPost.title ? dataPost.title : null;
  const slug = dataPost.slug ? dataPost.slug: null;
  var arrayQuerry = [];
  if (title) {
    arrayQuerry.push("title = '"+title + "'");
  }
  if (slug) {
    arrayQuerry.push("slug = '"+slug + "'");
  }
  stringquery = arrayQuerry.toString()
  console.log("UPDATE posts SET "+stringquery+" WHERE id="+id);
  sql.query("UPDATE posts SET "+stringquery+" WHERE id="+id, function (err, res) {
      if (err) {
          console.log("error: ", err);
          result(null, null);
      } else {
          result(null, "Insert thành công");
      }
  });
};
// Delete dữ liệu
Post.deletePost = (id , result) => {
  console.log("DELETE FROM posts WHERE id="+id);
  sql.query("DELETE FROM posts WHERE id="+id, function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(null, null);
      }
      else{
          result(null, "Delete thành công");
      }
  });
};

module.exports = Post