var moveSection;
var headerStop;

$overlayRemove = function(){
	if( $(this).parent().hasClass("left-section") ){
		$("#topImageLeft").removeClass("grayscale");
	}else{
		$("#topImageRight").removeClass("grayscale");
	}
}
$overlayAdd = function(){
	if( $(this).parent().hasClass("left-section") ){
		$("#topImageLeft").addClass("grayscale");
	}else{
		$("#topImageRight").addClass("grayscale");
	}
}

$leftSectionMove = function(){
	if (moveSection){
		$('.overlay').off('mouseenter');
		$('.overlay').off('mouseleave');
		$(".overlay").hide();
		$("#topImageLeft").removeClass("grayscale");
		$(this).css({
			left: 0,
			width: "100%"
		});
		$("#topImageLeft").css({
			width: "100%"
		});
		$(".right-section").css({
			width: "0%"
		});
		$(".left-section .sectionDetail").fadeIn(1500);
		$(".left-section .under-section").show();
		$('.left-section').off('click');
		$('.leftBack').on('click', $leftBackFunction);
		moveSection = false;
		setTimeout(function(){
			headerStop = $("header").offset().top;
		}, 1000);
		
	}
}

$rightSectionMove = function(){
	if (moveSection){
		$('.overlay').off('mouseenter');
		$('.overlay').off('mouseleave');
		$(".overlay").hide();
		$("#topImageRight").removeClass("grayscale");
		$(this).css({
			width: "100%",
			right: 0,
		});
		$("#topImageRight").css({
			width: "100%"
		});
		$(".left-section").css({
			width: "0%"
		});
		$(".right-section .under-section").show();
		$('.right-section').off('click');
		$('.rightBack').on('click', $rightBackFunction);
		moveSection = false;
	}
}

$leftBackFunction = function(){
	$(".overlay").show();
	$("#topImageLeft").addClass("grayscale");
	$(".left-section .under-section").hide();
	$(".left-section .sectionDetail").hide();
	$(".left-section").css({
		width: "50%"
	});
	$("#topImageLeft").css({
		height: "100%",
		width: "auto"
	});
	$(".right-section").css({
		width: "50%"
	});
	setTimeout(function(){
		$('.overlay').on('mouseenter', $overlayRemove);
		$('.overlay').on('mouseleave', $overlayAdd);
		$('.left-section').on('click', $leftSectionMove);
		moveSection = true;
	}, 500);
}

$rightBackFunction = function(){
	$(".overlay").show();
	$("#topImageRight").addClass("grayscale");
	$(".right-section .under-section").hide();
	$(".right-section").css({
		width: "50%"
	});
	$("#topImageRight").css({
		height: "100%",
		width: "auto"
	});
	$(".left-section").css({
		width: "50%"
	});
	setTimeout(function(){
		$('.overlay').on('mouseenter', $overlayRemove);
		$('.overlay').on('mouseleave', $overlayAdd);
		$('.right-section').on('click', $rightSectionMove);
		moveSection = true;
	}, 500);
}

$initEvents = function(){
	$(".overlay").on('mouseenter', $overlayRemove);
	$(".overlay").on('mouseleave', $overlayAdd);
	$(".left-section").on('click', $leftSectionMove);
	$(".right-section").on('click', $rightSectionMove);
}

/*$advanceSliders = function(){
	var curSlide = $(".activeSlide");
	var slideshow = $(curSlide).parent();
	var numSlides = $(slideshow).children().length;
	var nextSlide;
	if( curSlide == $(slideshow).children().last() ){
		console.log("no more nexts");
		nextSlide = slideshow.children().first();
	}else{
		console.log("next!");
		nextSlide = curSlide.next();
	}
	$(curSlide).removeClass("activeSlide");
	$(nextSlide).addClass("activeSlide");
}*/

$(document).ready(function(){
	$initEvents();
	moveSection = true;

	$(".replace-header").css({height: $("header").height, width: $("header").width});

	$(window).scroll(function(){
		if($(window).scrollTop() > headerStop){
			$(".replace-header").toggle();
			$("header").css({position: "fixed", top: "0"});
		}else if( $(window).scrollTop() <= headerStop){
			$(".replace-header").toggle();
			$("header").css({position: "static"})
		}
	});

	/* reference this only for the specific active slider */
	window.setInterval($advanceSliders, 2000);

	$("#actingSection .projects li").click(function(){
		$("#actingSection .fullProject").fadeOut();
		var selectorID = $(this).attr("id");
		var displayID = selectorID.replace("actingSelect","actingDisplay");
		$("#actingSection #"+displayID).fadeIn();
	});
	$("#directingSection .projects li").click(function(){
		$("#directingSection .fullProject").fadeOut();
		var selectorID = $(this).attr("id");
		var displayID = selectorID.replace("directingSelect","directingDisplay");
		$("#directingSection #"+displayID).fadeIn();
	});

	/* This enables smooth scrolling */
	$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      var targetOffset = target.offset().top - $("#menu-icon").outerHeight(true);
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: targetOffset
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});
});

/* 

	check that the jQuery version of the grayscale effects are truly cross-browser, add more rules maybe? 
	check that all effects work with touch and click

*/