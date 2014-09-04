---
title: 环信即时通讯云
layout: overview
---

<script type="text/javascript" src="/js/analyticsCount.js"></script>
<div class="wrap_bd">
	<div class="w990 download_demo">
		<div class="demo_hd">
			<div class="demo_hd_l">
				<img src="/img/demo_icon.png" alt="环信Demo下载" />
			</div>
			<div class="demo_hd_r">
				<h2>环信Demo下载</h2>
				<dl>
					<dt>
						<a class="demo_android" id="Android_DEMO_Href" onclick="_hmt.push(['_trackEvent', 'IMDEMO', 'click', 'AndroidSDK_DEMO'])" href="http://www.easemob.com/downloads/chatdemo-ui.apk"></a>
						<p>支持Android2.1及以上版本</p>
						<a class="demo_iphone" id="iOS_DEMO_Href" onclick="_hmt.push(['_trackEvent', 'IMDEMO', 'click', 'iOSSDK_DEMO'])" href="http://www.easemob.com/downloads/ChatDemo-UI.ipa"></a>
						<p>支持iPhone4、iTouch2及以上设备<br />
							也可在手机的safari浏览器中打开链接安装：
							<a href="http://www.easemob.com/d.html">www.easemob.com/d.html</a>
						</p>
					</dt>
					<dd><img src="/img/demo_wx_ico.png" alt="微信下载" /></dd>
				</dl>
			</div>
		</div>
		<div class="demo_bd_bg"></div>
		<div class="demo_bd">
			<div class="container2">
				<ul>
					<li><img src="/img/demo1.png" alt="" /></li>
					<li><img src="/img/demo2.png" alt="" /></li>
					<li><img src="/img/demo3.png" alt="" /></li>
					<li><img src="/img/demo4.png" alt="" /></li>
					<li><img src="/img/demo5.png" alt="" /></li>
				</ul>
			</div>
			<div class="info_content">
				<h2>简介:</h2>
				<section class="info_readmore">
					<p>环信demo是环信SDK的展示demo。包含了一个接近微信的完整的聊天app的所有功能, 包括发文字，表情，图片，语音，位置，群聊，登录，注册，退出登录等。环信demo源代码已在github上开源供开发者下载，以帮助开发者更好的学习了解环信SDK。更多关于环信demo的介绍请查看<a href="/docs/android/quickstartUI">http://developer.easemob.com/docs/emchat/android/quickstartUI.html</a>和<a href="/docs/ios/ChatDemo_UI">http://developer.easemob.com/docs/emchat/ios/ChatDemo_UI.html</a>。</p>
				</section>
				<section class="info_readmore_show">
					<p>环信demo是环信SDK的展示demo。包含了一个接近微信的完整的聊天app的所有功能, 包括发文字，表情，图片，语音，位置，群聊，登录，注册，退出登录等。环信demo源代码已在github上开源供开发者下载，以帮助开发者更好的学习了解环信SDK。更多关于环信demo的介绍请查看<a href="/docs/android/quickstartUI">http://developer.easemob.com/docs/emchat/android/quickstartUI.html</a>和<a href="/docs/ios/ChatDemo_UI">http://developer.easemob.com/docs/emchat/ios/ChatDemo_UI.html</a>。<a class="info_hide" href="javascript:void(0);">收起</a></p>
				</section>
			</div>
		</div>
	</div>
	<div class="clearfix"></div>
</div>
<script type="text/javascript" src="/js/jquery.mousewheel.js"></script>
<script type="text/javascript" src="/js/hScrollPane.js"></script>
<script type="text/javascript">
    // 展开收缩效果
	$(".info_show").click(function(){
		$(".info_readmore").hide();
		$(".info_readmore_show").show();
	});
	$(".info_hide").click(function(){
		$(".info_readmore").show();
		$(".info_readmore_show").hide();
	});

	//水平滚动条滚动图片
	$(".container2").hScrollPane({
		mover:"ul",
		moverW:function(){return $(".container2 li").length*275-24;}(),
		showArrow:true,
		handleCssAlter:"draghandlealter",
		mousewheel:{moveLength:275}
	});
</script>

