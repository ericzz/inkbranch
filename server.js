
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


// Utils
var util = require('./util.js');

// Stripe
var api_key = 'pk_F56u4OJSBqDz79RcMBLNVNIciEVqX';  // secret stripe API key
var stripe = require('stripe')(api_key);

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

  /*if (req.session.cart.length <= 0) {
    req.flash('info', 'You don\t have any items in your cart!');
    res.redirect('/cart');
    return;
  }*/

    res.render('payment', {page: 'payment'});
});

// Paying
app.post('/payment/submit', init, function(req, res) {
  stripe.charges.create({
    amount: req.body.amount,
    currency: 'usd',
    card: req.body.token,
    description: req.session.cart
  }, function(err, response) {
    if (!response.error) {
      console.log(response.id);
      
      var address = new Address({
        addr1: req.body.shipstreet,
        addr2: req.body.shipstreet2,
        city: req.body.shipcity,
        state: req.body.shipstate,
        zip: req.body.shipzip,
        phone: req.body.phone
      });
      
      var order = new Order({
        date: new Date(), // TODO: time zone handling.
        address: address._id,
        status: "paid", // TODO: admin panel for status handling/viewing?
        items: req.session.cart,
        payment: response.id,
        email: req.body.email
      });
      
      order.save(function(err) {
        log(err);
      });
      
      address.save(function(err) {
        log(err);
      });
      
      req.flash('info', 'Payment successful!');
      res.redirect('/payment/success');
    } else {
      console.log(response.error.message);
      req.flash('error', 'Payment unsuccessful.');
      res.redirect('/payment');
    }
  });
});

app.post('/status', init, function(req, res){
   var order = req.body.order;
   var zip = req.body.zip;
   Order.findOne({zip: zip, order: order}, function(err, doc){
    if (doc) {
      res.render('orderstatus', {page: 'status', order: doc});
    } else {
      req.flash('info', 'We couldn\'t find an order #' + order + ' with billing zip ' + zip);
      res.redirect('/status');
    }
  });
});

app.get('/payment', init, function(req, res){

  if (req.session.cart.length <= 0) {
    req.flash('info', 'You don\'t have any items in your cart!');
 //   res.redirect('/cart');
 //   return;
  }

  res.render('payment', {page: 'payment'});
  
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


var port = process.env.PORT || 8088
app.listen(port);