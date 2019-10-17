var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

 var app = express();

 app.use(express.static('static'));
 app.use(express.static('res'));

 app.use(bodyParser.urlencoded({ extended: true}));

 app.get('/', function(req, res){
     res.set('Access-Control-Allow-Origin', '*');
     res.sendFile(path.join(__dirname + '/index.html'));
 });

 app.listen(process.env.PORT ||3000);