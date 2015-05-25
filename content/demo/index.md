---
title: 环信即时通讯云
layout: overview1
---

<!-- Intro -->
<section id="demo-intro">
	<div class="container content">
		<header><h2>环信Demo下载</h2></header>
		<div class="demo-wrap clearfix">
			<div class="demo-icon"><img src="/img/demo_icon.png" alt="环信logo"></div>
			<div class="demo-content">
				<a href="http://downloads.easemob.com/downloads/chatdemo-ui-2.1.9.apk" onclick="_hmt.push(['_trackEvent', 'IMDEMO', 'click', 'AndroidSDK_DEMO'])" class="demo_android">Android 下载</a><p>支持Android2.3及以上版本</p>
				<a href="http://downloads.easemob.com/downloads/ChatDemo-UI.ipa" onclick="_hmt.push(['_trackEvent', 'IMDEMO', 'click', 'iOSSDK_DEMO'])" class="demo_iphone">iPhone 下载</a><p>支持iPhone4、iTouch2及以上设备也可在手机的safari浏览器中打开链接安装：<a href="http://www.easemob.com/d.html">http://www.easemob.com/d.html</a></p>
			</div>
			<div class="demo-2d">
				<img src="/img/demo_wx_ico.png" alt="二维码">
			</div>
		</div>
		<p class="details">简介：环信demo是环信SDK的展示demo。包含了一个接近微信的完整的聊天app的所有功能, 包括发文字，表情，图片，语音，位置，群聊，登录，注册，退出登录等。环信demo源代码已在github上开源供开发者下载，以帮助开发者更好的学习了解环信SDK。更多关于环信demo的介绍请查看 <a href="http://www.easemob.com/docs/android/">环信Android Demo快速入门</a> 和 <a href="http://www.easemob.com/docs/ios/">环信iOS Demo快速入门</a>。</p>
	</div>
</section>

<section id="demo-list">
	<div id="zsgun">
		<a href="#" class="prenext zspre"></a>
		<a href="#" class="prenext zsnext"></a>
		<div id="gundiv" class="container2">
			<ul>
				<li><img src="/img/demo1.png" alt="" width="260" height="460"/></li>
				<li><img src="/img/demo2.png" alt="" width="260" height="460"/></li>
				<li><img src="/img/demo3.png" alt="" width="260" height="460"/></li>
				<li><img src="/img/demo4.png" alt="" width="260" height="460"/></li>
				<li><img src="/img/demo5.png" alt="" width="260" height="460"/></li>
			</ul>
		</div>
	</div>
</section>
<script type="text/javascript" src="../theme/js/hScrollPane.js"></script>
<script type="text/javascript">
	$(function() {
		var glen = $("#gundiv ul li").length;
		$("#gundiv ul").css("width",280 * (glen));
		$("#gundiv li").hover(function(){$("#gundiv li").removeClass("zslion");$(this).addClass("zslion");},function(){$(this).removeClass("zslion");})
	});
	$("#zsgun").hScrollPane({
		mover:"ul",
		moverW:function(){return $("#zsgun li").length*275;}(),
		showArrow:true,
		handleCssAlter:"draghandlealter"
	});
</script>

