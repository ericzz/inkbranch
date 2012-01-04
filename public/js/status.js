$(document).ready(function() {
  $('#zipgroup').formative('Your five digit zip code', function(val){
    if(val.length == 5) {
      return true;
    } else {
      return 'Invalid zip code';
    }
  });
  $('#ordergroup').formative('Your ten digit order number');
});