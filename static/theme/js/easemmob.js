$(document).ready(function () {
	$('.nav-inner li').hover(
		function () {
			$('ul', this).fadeIn();
		},
		function () {
			$('ul', this).fadeOut();
		}
	);
	$('.ico-2d').hover(
		function () {
			$('.wx-ico').fadeIn();
		},
		function () {
			$('.wx-ico').fadeOut();
		}
	);
	$('#intro_hype_container').height(
		$(window).height()-74
	);

//Slider
	var $slider = $('.slider ul');
	var $slider_child_l = $('.slider ul li').length;
	var $slider_width = $('.slider ul li').width();
	$slider.width($slider_child_l * $slider_width);
	var slider_count = 0;

	if ($slider_child_l < 6) {
		$('#btn-right').removeClass("dasabled");
	}

	$('#btn-right').click(function() {
		if ($slider_child_l < 6 || slider_count >= $slider_child_l - 6) {
			return false;
		}
		slider_count++;
		$slider.animate({left: '-=' + $slider_width + 'px'}, 'slow');
		slider_pic();
	});

	$('#btn-left').click(function() {
		if (slider_count <= 0) {
			return false;
		}
		slider_count--;
		$slider.animate({left: '+=' + $slider_width + 'px'}, 'slow');
		slider_pic();
	});

	function slider_pic() {
		if (slider_count >= $slider_child_l - 6) {
			$('#btn-right').addClass("dasabled");
		}
		else if (slider_count > 0 && slider_count <= $slider_child_l - 6) {
			$('#btn-left').removeClass("dasabled");
			$('#btn-right').removeClass("dasabled");
		}
		else if (slider_count <= 0) {
			$('#btn-left').addClass("dasabled");
		}
	}
	$('.slider a').hover(function() {
		if ($(this).find('img:animated').length) return;
		$(this).animate({marginTop: '0'}, 300);
		$(this).find('img').animate({width: '80%'}, 300);
	}, function() {
		$(this).animate({marginTop: '16%'}, 200);
		$(this).find('img').animate({width: '50%'}, 200);
	});
});