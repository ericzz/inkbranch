var express = require('express');
var fs = require('fs');
var app =  express.createServer();

// Initialize main server
app.use(express.bodyParser());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', function(req, res){
  res.render('index');
});

app.get('/home', function(req, res){
  res.render('index', {page: 'home'});
});

app.get('/designs', function(req, res){
  res.render('designs', {page: 'designs'});
});

var port = process.env.PORT || 8084
app.listen(port);


