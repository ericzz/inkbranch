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

	
	var $active = $("#desc");
	
	$("#blokus").click(function(){
		$("#iceskates").stop().animate( { 
			"margin-left":  "0px",
			borderLeftColor : "#26444D"
		}, 300);	
	});
	$("#tetris").click(function(){
		$("#iceskates").stop().animate( { 
			"margin-left": "226px",
			borderLeftColor : "#86B23A"
		}, 300);		
	});
	$("#jenga").click(function(){
		$("#iceskates").stop().animate( { 
			"margin-left":  "451px",
			borderLeftColor : "#C5E6E7"
		}, 300);		
	});
	$("#tangrams").click(function(){
		$("#iceskates").stop().animate( { 
			"margin-left": "676px",
			borderLeftColor : "#B20321"
		}, 300);
	});
	
	$("#blokus").click(function(){
		$active.css({"display": "none"});
		$active = $("#desc");
		$("#desc").fadeToggle("slow");
		
	});
	$("#tetris").click(function(){
		$active.css({"display": "none"});
		$active = $("#pic1");
		$("#pic1").fadeToggle("slow");
		
	});
	$("#jenga").click(function(){
		$active.css({"display": "none"});
		$active = $("#pic2");
		$("#pic2").fadeToggle("slow");
		
	});
	$("#tangrams").click(function(){
		$active.css({"display": "none"});
		$active = $("#pic3");
		$("#pic3").fadeToggle("slow");
		
	});
	
});
