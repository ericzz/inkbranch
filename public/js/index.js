$(document).ready(function(){
	
	//var $active = $("#homepage");
	
	$("#blokus").hover(function(){
		$("#iceskates").stop().animate( { 
			"margin-left":  "0px",
			borderLeftColor : "#26444D"
		}, 300);	
	});
	$("#tetris").hover(function(){
		$("#iceskates").stop().animate( { 
			"margin-left": "226px",
			borderLeftColor : "#86B23A"
		}, 300);		
	});
	$("#jenga").hover(function(){
		$("#iceskates").stop().animate( { 
			"margin-left":  "451px",
			borderLeftColor : "#C5E6E7"
		}, 300);		
	});
	$("#tangrams").hover(function(){
		$("#iceskates").stop().animate( { 
			"margin-left": "676px",
			borderLeftColor : "#B20321"
		}, 300);
	});

/*	
	$("#home").click(function(){

		$active.css({"display": "none"});
		$active = $("#homepage");
		$("#homepage").slideToggle("slow");
		
	});
	$("#photos").click(function(){
		$active.css({"display": "none"});
		$active = $("#pics");
		$("#pics").slideToggle("slow");
		
	});
	$("#proj").click(function(){
		$active.css({"display": "none"});
		$active = $("#projects");
		$("#projects").slideToggle("slow");
		
	});
	$("#other").click(function(){
		$active.css({"display": "none"});
		$active = $("#link");
		$("#link").slideToggle("slow");
		
	});*/
	
});
