var express = require('express');
var path = require('path');
var app = express();
var fs = require("fs");
var session = require('express-session')
var multer = require('multer');
// require();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// Load file tĩnh trong thư mục storage
app.use(express.static('storage'))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var bodyParser = require('body-parser');

// Put these statements before you define any routes.
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

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
  cookie: { maxAge: 60000 }
}));


fs.readdir(path.join('modules'), (err, data) => {
  return data.forEach(module => {
    // console.log("module" , module);
    require(`./modules/${module}/router`)(app)
  })
})

var server = app.listen(port, function () {
  // var host = server.address().address
  var host = process.env.HOST || "localhost"
  var ports = server.address().port
  console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, ports)
})
