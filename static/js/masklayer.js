//各种注册与登录之间的切换
var popWindows=$('.popWindow');
var register_user=$('.register_link'),header_sign=$('#header_sign'),free_reg=$('#free_reg');
var opMaskLayer=$('.opMaskLayer');
var popcolseBtn=$('.pop_colsebtn',popWindows);
var return_sign=$('.return_sign');
var showpopWindow=function(which){
	if(popWindows.filter(':visible').length){
	if(!opMaskLayer.is(':visible')){opMaskLayer.show()}
	popWindows.filter(':visible').animate({'opacity':'0'},300,'swing',function(){$(this).hide()});
	which.css({'display':'block','opacity':'0','top':$(window).height()/2+'px','margin-top':-which.outerHeight()/2+'px','margin-left':'0'});
	which.animate({'opacity':1},400,'swing');
	}else {
		opMaskLayer.show();
		which.css({'top':$(window).height()/2+'px','margin-top':-which.outerHeight()/2+'px',opacity:1}).fadeIn(200);
	}
}

/*登录*/
return_sign.add(header_sign).bind('click',function(){
	showpopWindow($('#sign'));
	return false;
});
/*注册*/

// header_register是原来就有的，不知道是做什么用的
// 当前线上就有报错，先增加个try catch
try {
	register_user.add(header_register).bind('click',function(){
		showpopWindow($('#register_user'));
		return false;
	});
} catch (e) {

}

/*其他*/
free_reg.add(free_reg).bind('click',function(){
	showpopWindow($('#register_user'));
	return false;
}); 
/*关闭*/
$('.pop_colsebtn',popWindows).bind('click',function(){
	$('.popWindow').hide();
	opMaskLayer.hide();
});
/*遮罩层*/
opMaskLayer.css({'height':$(document).height(),'position':'fixed'});
popWindows.css({'top':$(window).height()/2+'px','margin-top':-popWindows.filter(':visible').outerHeight()/2+'px'});
$(window).resize(function(){
	var current=popWindows.filter(':visible');
	if(current.length){
		opMaskLayer.css({'width':$(document).width(),'height':$(document).height()});
		current.css({'top':$(window).height()/2+'px','margin-top':-current.outerHeight()/2+'px'});
	}
});