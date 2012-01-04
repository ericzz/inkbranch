(function( $ ) {
  $.fn.formative = function(hint, validator) {
  
    var group = this;
    var input = this.children('input');
    var caption = $('<div></div>').addClass('inputcaption').text('hint');
    var triangle = $('<div></div>').addClass('inputcaptiontriangle');
  
    group.append(triangle, caption, $('<div></div>').addClass('clear'));
  
    if(!validator) {validator = function(){return null;}}
 
    input.focus(function(){
      input.removeClass('green red');
      caption.empty();
      caption.append(hint);
      triangle.animate({opacity: 1}, 150);
      caption.animate({opacity: 1}, 150);
    }).blur(function(){
    
      var result = function(valid){
        if(valid === true) {
          input.addClass('green');
          triangle.animate({opacity: 0}, 150);
          caption.animate({opacity: 0}, 150);
        } else if(valid === null){
          triangle.animate({opacity: 0}, 150);
          caption.animate({opacity: 0}, 150);
        } else {
          input.addClass('red');
          caption.text(valid);
        }
      }
    
      var valid = validator(input.val(), result);
      if(valid !== undefined) {
        result(valid);
      }
    });
  

    return this;

  };
})( jQuery );