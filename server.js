var express = require('express');
var userRouters = require('./Post/router');
var path = require('path');
var app = express();
var fs = require("fs");
var session = require('express-session')
var app = express()
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var storage = require('node-persist');
require('dotenv').config()

var port = process.env.PORT || 8088
app.get('/', function (req, res) {
  console.log("Nhan mot POST Request ve Homepage");
  res.send('Hello POST');
})
app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'somesecret', 
  cookie: { maxAge: 60000 }}));
// Lưu ý: userRouters và index.js phải ở cùng 1 thư mục
app.use('/post', userRouters);


fs.readdir(path.join('modules'), (err, data) => { 
  return data.forEach(module => { 
    console.log("module" , module);
    require(`./modules/${module}/router`)(app) 
  })
})
var server = app.listen(port, function () {
  // var host = server.address().address
  var host = process.env.HOST || "localhost"
  var ports = server.address().port
  console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, ports)
})