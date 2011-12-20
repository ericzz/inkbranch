$(document).ready(function(){
	
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
