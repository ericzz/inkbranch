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

    // prevent the form from submitting with the default action
    return false;
  });
});