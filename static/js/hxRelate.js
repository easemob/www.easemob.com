
$(document).ready(function() {
	
	(function() {
		// 放在头部迁移过来的代码
		var sliderObj = $("#slider");

		if (sliderObj.length > 0) {	
			sliderObj.easySlider({
				auto: true, 
				continuous: true
			});
		}
	})();

	(function() {
		// 一级导航选中
		// 还不太熟悉这个框架，先恶心点写在这吧
		var linkStr = window.location.href,
		//	subLink = linkStr.substring(23),
		//	listTag = subLink.split('/'),
			listTagObj = linkStr.match( /http:\/\/[^/]+(.*)/ ),
			listTag = listTagObj[1].split('/'),
			selectFlag = 0,
			navList = $("#menu_topmenu .menu-item-one");

		if (navList.length > 0) {
			
	    	if (listTag[1] == 'docs') {
	    		// 文档
	    		selectFlag = 1;
	    	}else if (listTag[1] == 'sdk' || listTag[1] == 'demo') {	
	    		// "下载"被选中
	    		selectFlag = 2;
	    	} else if (listTag[1] == 'faq') {
	    		// “FAQ”被选中
	    		selectFlag = 3;
	    	} else if (listTag[1] == 'price') {
	    		// 价格
	    		selectFlag = 5;
	    	} else if (listTag[1] == '404') {
	    		return ;
	    	}

	    	// 给选中的导航加class
	        $(navList[selectFlag]).addClass("current-menu-item");	
		}
	})();


	(function() {
		// 左侧导航选中
		// 还不太熟悉这个框架，先恶心点写在这吧
		var linkStr = window.location.href,
		//	subLink = linkStr.substring(23),
		//	listTag = subLink.split('/'),
			listTagObj = linkStr.match( /http:\/\/[^/]+(.*)/ ),
			listTag = listTagObj[1].split('/'),
			selectFlag = 0,
			leftNavList = $('#about_nav a');

		if (leftNavList.length > 0) {
	    	
	    	if (listTag[1] == 'docs') {
	    		// 文档
	    		selectFlag = 1;
	    	}else if (listTag[2] && listTag[2] == 'joinus') {
	    		// "下载"被选中
	    		selectFlag = 1;
	    	} else if (listTag[2] && listTag[2] == 'contactus') {
	    		// “FAQ”被选中
	    		selectFlag = 2;
	    	} else if (listTag[2] && listTag[2] == 'terms') {
	    		// 价格
	    		selectFlag = 3;
	    	} else if (listTag[2] && listTag[2] == 'mediaReport') {
	    		// 价格
	    		selectFlag = 4;
	    	} else if (listTag[2] && listTag[2] == 'partner') {
	    		// 价格
	    		selectFlag = 5;
	    	}

	    	// 给选中的导航加class
	        $(leftNavList[selectFlag]).addClass("selected");
		}
	})();

});