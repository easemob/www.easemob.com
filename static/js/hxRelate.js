
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
			subLink = linkStr.substring(23),
			listTag = subLink.split('/'),
			selectFlag = 0,
			navList = $("#menu_topmenu .menu-item-one");

		if (navList.length > 0) {
	    	// "下载"被选中
	    	if (listTag[0] == 'downloads' || listTag[0] == 'demo') {
	    		selectFlag = 2;
	    	} else if (listTag[0] == 'faq') {
	    		// “FAQ”被选中
	    		selectFlag = 3;
	    	} else if (listTag[0] == 'price') {
	    		// 价格
	    		selectFlag = 5;
	    	}

	    	// 给选中的导航加class
	        $(navList[selectFlag]).addClass("current-menu-item");	
		}
	})();


	(function() {
		// 左侧导航选中
		// 还不太熟悉这个框架，先恶心点写在这吧
		var linkStr = window.location.href,
			subLink = linkStr.substring(23),
			listTag = subLink.split('/'),
			selectFlag = 0,
			leftNavList = $('#about_nav a');

		if (leftNavList.length > 0) {
	    	// "下载"被选中
	    	if (listTag[1] && listTag[1] == 'joinus') {
	    		selectFlag = 1;
	    	} else if (listTag[1] && listTag[1] == 'contactus') {
	    		// “FAQ”被选中
	    		selectFlag = 2;
	    	} else if (listTag[1] && listTag[1] == 'terms') {
	    		// 价格
	    		selectFlag = 3;
	    	} else if (listTag[1] && listTag[1] == 'mediaReport') {
	    		// 价格
	    		selectFlag = 4;
	    	}

	    	// 给选中的导航加class
	        $(leftNavList[selectFlag]).addClass("selected");
		}
	})();

});