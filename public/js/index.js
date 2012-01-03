$(document).ready(function(){
	
  $(".scroll").click(function(event){
    event.preventDefault();
 
    var full_url = this.href;
 
    var parts = full_url.split("#");
    var trgt = parts[1];
 
    var target_offset = $("#"+trgt).offset();
    var target_top = target_offset.top;
 
    $('html, body').animate({scrollTop:target_top}, 500);
  });
  
  $("#tophatbow a").mouseenter(function() {
    $("#ink").stop().animate({
      "margin-left" : $(this).position().left - $("#ink").position().left - 50,
    });
  });

	
	var $active = $("#desc");
	
	$("#blokus").click(function(){
		$("#iceskates").stop().animate( { 
			"margin-left":  "0px",
			borderLeftColor : "#26444D"
		}, 300);	
		$active.css({"display": "none"});
		$active = $("#desc");
		$("#desc").fadeToggle("slow");
		
	});
	$("#tetris").click(function(){
		$("#iceskates").stop().animate( { 
			"margin-left": "225px",
			borderLeftColor : "#86B23A"
		}, 300);		
		$active.css({"display": "none"});
		$active = $("#pic1");
		$("#pic1").fadeToggle("slow");
		
	});
	$("#jenga").click(function(){
		$("#iceskates").stop().animate( { 
			"margin-left":  "450px",
			borderLeftColor : "#C5E6E7"
		}, 300);	
		$active.css({"display": "none"});
		$active = $("#pic2");
		$("#pic2").fadeToggle("slow");
		
	});
	$("#tangrams").click(function(){
		$("#iceskates").stop().animate( { 
			"margin-left": "675px",
			borderLeftColor : "#B20321"
		}, 300);
		$active.css({"display": "none"});
		$active = $("#pic3");
		$("#pic3").fadeToggle("slow");
		
	});
	
});





// Login page

$(document).ready(function(){

  $("#registeremail, #registerpassword, #registerverify").blur(function(){
    validate();
  });
  

});

var validate = function() {
  var password = $("#registerpassword").val();
  var verify = $("#registerverify").val();
  $.getJSON('/register/verify', {email: $("#registeremail").val()}, function(res){
    if(res.error) {
      $("#registerribbon").removeClass("green").addClass("red").text(res.error);
      return;
    }
    if(password !== verify) {
      $("#registerribbon").removeClass("green").addClass("red").text("Passwords do not match");
      return;
    }
    
    if(password.length < 6) {
      $("#registerribbon").removeClass("green").addClass("red").text("Password must be at least 6 characters");
      return;
    }
    
    $("#registerribbon").removeClass("red").addClass("green").text("");
    
  });  
};

  