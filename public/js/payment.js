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
    if(validCreditCard(val)) {
      return true;
    } else {
      return "Invalid card number";
    }
  });
  $('#cvcgroup').formative('<img src="/images/back.gif" height="21" align="top"> 3 or 4 digit verification code', function(cvc){
    if(!isNaN(cvc) && cvc.length > 2) {
      return true;
    } else {
      return 'Enter a valid CVC'
    }
  });
  
  $('#shipstreetgroup').formative('Street address to ship your items to', function(val){
    if(val.length > 1) {
      return true;
    } else {
      return 'Enter a valid street address'
    }
  });
  
  $('#shipzipgroup').formative('Five digit zip code', function(val){
    if(!isNaN(val) && val.length == 5) {
      return true;
    } else {
      return 'Enter a valid five digit zip code'
    }
  });
  
  $('#phonegroup').formative('Phone number in case there are questions about your order', function(val){
    if(validatePhoneNumber(val)) {
      return true;
    } else {
      return 'Enter a valid US phone number'
    }
  });
  
  $('#emailgroup').formative('Email address for order updates (we\'ll never spam!)', function(val){
    if(validateEmail(val)) {
      return true;
    } else {
      return 'Enter a valid email address'
    }
  });
  
});

function stripeResponseHandler(){};

function validatePhoneNumber(elementValue){  
  var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;  
  return phoneNumberPattern.test(elementValue);  
}  

function validCreditCard(val) {
	// replace any white space in the card number
	var number = val.replace(/\s+/g, '') ;

  // Check length
  if(number.length < 5) {
    return false;
  }
  
	//replace if contains non-numbers
	if(number.match(/\D/)){
		return false ;
	}

	// convert to array and reverse the number
	number = number.split('').reverse().join('') ;

	// loop through the number one digit at a time
	// double the value of every second digit starting
	// from the right, and concatenate the new values 
	// with the unaffected digits
	var digits = '';
	for(var i = 0; i < number.length; i++){
		digits += '' + ((i%2) ?
			number.charAt(i) * 2 :
			number.charAt(i)) ;
	}

	// add all of the single digits together
	var sum = 0 ;
	for (var i = 0; i < digits.length; i++){
		sum += (digits.charAt(i) * 1) ;
	}
	//alert(sum) ;

	// valid card numbers will be transformed into
	// a multiple of 10
	return (sum % 10) ? false : true ;
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 