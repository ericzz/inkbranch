
// Connect to db
var mongoose = require('mongoose');
mongoose.connect('mongodb://inkbranch:j*iw2i@staff.mongohq.com:10063/inkbranch');

// Database schemas
require('./schemas.js');
//
var Address = mongoose.model('Address');
var Order = mongoose.model('Order');
var Item = mongoose.model('Item');
var Style = mongoose.model('Style');
var User = mongoose.model('User');

// Utils
var util = require('./util.js');

// Setup Express
var express = require('express');
var app =  express.createServer();
// Initialize main server
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: "COMPLETELY DIFFERENT" }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.dynamicHelpers({
  session: function(req, res){
    return req.session;
  },
  info: function(req, res) {
    return req.flash('info');
  }
});

// Normal routes
app.get('/', init, function(req, res){
  res.render('index', {page: 'home'});
});

app.get('/home', init, function(req, res){
  res.render('index', {page: 'home'});
});

app.get('/designs', init, function(req, res){
  res.render('designs', {page: 'designs'});
});

app.get('/cart', init, function(req, res){
  res.render('cart', {page: 'cart'});
});

app.get('/payment', init, function(req, res){

  if (req.session.cart.length <= 0) {
    req.flash('info', 'You don\t have any items in your cart!');
    res.redirect('/cart');
    return;
  }

  if (req.session.user) {
    res.render('payment', {page: 'payment'});
  } else {
    req.flash('info', 'Sign in or register an account to complete payment');
    res.redirect('/login/payment');
  }
});

app.get('/account', init, function(req, res) {
  if(req.session.user) {
    res.render('account', {page: 'account'});
  } else {
    // User not logged in
    req.flash('info', 'Sign in or register an account to access your account dashboard');
    res.redirect('/login');
  }
});
 
app.get('/login/:redir?', init, function(req, res) {
  res.render('login', {page: 'login'});
});


// Attemp to log in or register account
app.post('/login/:redir?', init, function(req, res) {

  var email = req.body.email;
  var password = req.body.password;
  if(req.body.register) {
    if (password.length < 6) {
      res.render('login', {page: 'login', register: {email: email, error: 'badpassword'}});
      return;
    }
    if (util.validateEmail(email)) {
      User.findOne({email: email}, function(err, doc){
        if (doc) {
          res.render('login', {page: 'login', register: {email: email, error: 'userexists'}});
        } else {
          var user = new User();
          user.email = email;
          user.password = util.hash(password);
          user.save();
          req.session.user = user;
          if(req.params.redir) {
            res.redirect('/' + req.params.redir);
          } else {
            res.redirect('/account');
          }
        }
      });
    } else {
      res.render('login', {page: 'login', register: {email: email, error: 'invalidemail'}});
    }
  } else {
    // try log in
    User.findOne({email: email, password: util.hash(password)}, function(err, doc){
      if (err || !doc) {
        res.render('login', {page: 'login', login: {email: email, error: 'nouser'}});
      } else {
        req.session.user = doc;
        if(req.params.redir) {
          res.redirect('/' + req.params.redir);
        } else {
          res.redirect('/account');
        }
      }
    });
  }
});


// AJAX routes
app.get('/register/verify', init, function(req, res) {
  var email = req.query.email;
  if (util.validateEmail(email)) {
    User.findOne({email: email}, function(err, doc){
      if (doc) {
        res.send({error: 'Email is taken'});
      } else {
        res.send({});
      }
    });
  } else {
    res.send({error: 'Invalid email'});
  }
});


app.get('/cart/add', init, function(req, res) {
  if(req.params.products && req.params.qty && req.params.style) {
    req.sessions.cart.push({product: req.params.products, qty: req.params.qty, style: req.params.style});
    res.send({cart: req.sessions.cart});
  } else {
    res.send({error: 'incomplete'});
  }
});

app.get('/cart/update', init, function(req, res) {
  if (req.sessions.cart[i]) {
    if (req.params.qty > 0) {
      req.sessions.cart[i] = req.params.qty;
    } else {
      req.sessions.cart.splice(i, 1);
    }
    res.send({cart: req.sessions.cart});
  } else {
    res.send({error: 'incomplete'});
  }
});

function init(req, res, next) {
  
  if (!req.session.cart) {
    req.session.cart = [];
  }
  
  next();
}


var port = process.env.PORT || 8084
app.listen(port);