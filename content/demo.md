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
						<a class="demo_android" href="http://www.easemob.com/downloads/chatdemo-ui.apk"></a>
						<p>支持Android2.1及以上版本</p>
						<a class="demo_iphone" href="http://www.easemob.com/downloads/ChatDemo-UI.ipa"></a>
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
					<p>APP(中国)隶属于印尼金光集团(sinarmas)旗下亚洲浆纸业有限公司(Asia Pulp & Paper Co., Ltd,简称APP)。金光集团投资范围远涉亚洲、北美、欧洲、澳洲等地，主要经营浆纸业、金融业、农业、食品加工业和房地产业。APP(中国)自上世纪90年代初投身中国市场以来，以长江三角洲和珠江三角洲为重点，截止到2010年4月，已经以独资或合作形式建立共20余家浆纸企业以及32万公顷人工林，总资产达......<a class="info_show" href="javascript:void(0);">展开</a></p>
				</section>
				<section class="info_readmore_show">
					<p>APP(中国)隶属于印尼金光集团(sinarmas)旗下亚洲浆纸业有限公司(Asia Pulp & Paper Co., Ltd,简称APP)。金光集团投资范围远涉亚洲、北美、欧洲、澳洲等地，主要经营浆纸业、金融业、农业、食品加工业和房地产业。APP(中国)自上世纪90年代初投身中国市场以来，以长江三角洲和珠江三角洲为重点，截止到2010年4月，已经以独资或合作形式建立共20余家浆纸企业以及32万公顷人工林，总资产达790亿人民币，拥有全职员工3.7万余名。2009年在华销售额超过345亿人民币。......<a class="info_hide" href="javascript:void(0);">收起</a></p>
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

