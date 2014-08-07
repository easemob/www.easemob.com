(function($){
	$.extend(jQuery.easing,{
		easeOutQuint: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		}
	});

	$.fn.hScrollPane=function(settings){
		settings=$.extend(true,{},$.fn.hScrollPane.defaults,settings);
		this.each(function(){
			var container=$(this),
				mover=container.find(settings.mover),
				w=container.width(),
				c=settings.moverW || mover.width(),
				dragbar=(container.find(".hScrollPane_dragbar").length==0 && c>w ) ? container.append('<div class="hScrollPane_dragbar"><div class="hScrollPane_draghandle"></div></div>').find(".hScrollPane_dragbar") : container.find(".hScrollPane_dragbar"),//避免多次初始化时的重复append;
				handle=dragbar.find(".hScrollPane_draghandle");
				dragbar.css("width",container.width());	
			
			mover.stop().css("left","0px");
			container.unbind();//避免多次初始化时的事件重复绑定;
			handle.unbind();
			dragbar.unbind();
			
			handle.stop().css({
				width:(w/c)*w >settings.handleMinWidth ? (w/c)*w : settings.handleMinWidth,
				left:0
			});
			
			if(c<w){
				dragbar.hide();
				return false;
			}else{
				dragbar.show();	
			}
			
			var maxlen=parseInt(dragbar.width())-parseInt(handle.outerWidth());
			
			dragbar.bind("click",function(e){
				var flag=e.pageX>handle.offset().left+handle.outerWidth() ? -1 : 1;
				$.fn.hScrollPane.move(settings,mover,handle,w,c,maxlen,flag);
			});
			
			handle.bind("mousedown",function(e){
				var x=e.pageX;
				var hx=parseInt(handle.css("left"));
				if(settings.handleCssAlter){$(this).addClass(settings.handleCssAlter);}
				
				$(document).bind("mousemove",function(e){
					var left=e.pageX-x+hx<0?0:(e.pageX-x+hx>=maxlen?maxlen:e.pageX-x+hx);
					handle.stop().css({left:left});
					if(settings.easing){
						mover.stop().animate({
							left:-left/maxlen*(c-w)			
						},{duration:1500,easing:'easeOutQuint',queue:false});
					}else{
						mover.css({left:-left/maxlen*(c-w)});
					}
					
					return false;
				});
				$(document).bind("mouseup",function(){
					if(settings.handleCssAlter){handle.removeClass(settings.handleCssAlter);}
					$(this).unbind("mousemove");
				})
				return false;
			}).click(function(){
				return false;	
			})
			
			if(settings.dragable){
				mover.bind("mousedown",function(e){
					var x=e.pageX;
					$(this).bind("mousemove",function(e){
						$.fn.hScrollPane.move(settings,mover,handle,w,c,maxlen,x,e.pageX);
						return false;
					})
					$(document).bind("mouseup",function(){
						mover.unbind("mousemove");
					})
				})
			}
			
			if(settings.mousewheel.bind){
				container.bind("mousewheel",function(event, delta){
					$.fn.hScrollPane.move(settings,mover,handle,w,c,maxlen,delta);
					return false;
				});
			}
			
			if(settings.showArrow){
				leftArrow.click(function(){
					$.fn.hScrollPane.move(settings,mover,handle,w,c,maxlen,1);
					return false;
				}).focus(function(){this.blur();});
				
				rightArrow.click(function(){
					$.fn.hScrollPane.move(settings,mover,handle,w,c,maxlen,-1);
					return false;
				}).focus(function(){this.blur();});
			}
			
			this.ondragstart=function(){return false;}
			this.onselectstart=function(){return false;}
		
		})
	}
	
	$.fn.hScrollPane.defaults = {
		showArrow:false,
		handleMinWidth:0,
		dragable:true,
		easing:true,
		mousewheel:{bind:true,moveLength:300}
	};
	
	$.fn.hScrollPane.move=function(settings,mover,handle,w,c,maxlen,x,nx){
		if(arguments.length==7){
			var left=parseInt(mover.css("left"))+x*settings.mousewheel.moveLength;
		}else{
			var left=parseInt(mover.css("left"))+((nx-x)/w)*(c-w);
		}
		left=left.toFixed(0);
		left=left>0?0:left<w-c?w-c:left;
		var handle_left=(left/(w-c))*maxlen;
		
		if(settings.easing){
			mover.stop().animate({
				left:left			
			},{duration:1500,easing:'easeOutQuint',queue:false});
			
			handle.stop().animate({
				left:handle_left			
			},{duration:1500,easing:'easeOutQuint',queue:false});
		}else{
			mover.stop().animate({
				left:left			
			},{duration:5,queue:false});
			
			handle.css({left:handle_left});
		}
	}
})(jQuery);