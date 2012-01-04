$(document).ready(function() {
  $("#payment-form").submit(function(event) {
  
    // disable the submit button to prevent repeated clicks
    $('.submit-button').attr("disabled", "disabled");

    var amount = 1000; //amount you want to charge in cents
    Stripe.createToken({
        number: $('.card-number').val(),
        cvc: $('.card-cvc').val(),
        exp_month: $('.card-expiry-month').val(),
        exp_year: $('.card-expiry-year').val()
    }, amount, stripeResponseHandler);

    return false;
  });
  
  $('#cardgroup').formative('<img src="/images/logos.gif" height="21">', function(val) {
    var number = val.replace(/\s+/g, '') ;
    if(number.match(/\D/) || val.length < 3){
      return "Invalid card number" ;
    }
    number = number.split('').reverse().join('') ;
    var digits = '';
    for(var i = 0; i < number.length; i++){
      digits += '' + ((i%2) ?
        number.charAt(i) * 2 :
        number.charAt(i)) ;
    }
    var sum = 0 ;
    for (var i = 0; i < digits.length; i++){
      sum += (digits.charAt(i) * 1) ;
    }
    return (sum % 10) ? "Invalid card number" : true ;
  });
  $('#cvcgroup').formative('<img src="/images/back.gif" height="21" align="top"> 3 or 4 digit verification code', function(cvc){
    if(!isNaN(cvc)) {
      return true;
    } else {
      return 'Enter a valid CVC'
    }
  });
});

function stripeResponseHandler(){};