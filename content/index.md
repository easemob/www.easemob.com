---
title: 环信即时通讯云 - 五分钟为你的App加入移动IM功能
layout: overview
---

<div class="wrap_bd">
  <div class="wrap_switch im_wrap">
    <div class="w990">
      <div class="im_hd">
        <div class="im_left">
          <h2><img alt="5分钟，为你的应用加入移动IM功能" src="img/index_banner_left.png"></h2>
          <p>无需购买维护服务器，无需服务器端开发，无需客户端/服务器端通讯编程，只需几行SDK代码调用即可实现</p>
          <a class="free_btn" href="https://console.easemob.com?comeFrom=easemobHome" target="_parent">立即使用</a>
        </div>
        <div class="im_right"><img alt="5分钟，为你的应用加入移动IM功能" src="/img/index_banner_right.jpg"></div>
        <em></em>
      </div>
    </div>
  </div>

  <div class="im_default_bg white_bg">
    <div id="container">
      <div class="tabs_menu">
        <div class="tabs_code">
          <ul class="tabs">
            <li class="selected">
              <span class="android">Android</span>
            </li>
            <li>
              <span class="ios">iOS</span>
            </li>
          </ul>
          <div class="clearfix"></div>
          <div class="tabs-con">
            <div class="selected">
              <pre>
<span class="sc">// 初始化环信SDK</span>
<span class="sb">EaseMobChat</span> .getInstance().init(appContext);</span>

<span class="sc">//创建一个消息</span>
<span class="sb">EMMessage</span> msg = <span class="sb">EMMessage</span>.createSendMessage(<span class="sb">EMMessage.Type.TXT</span>);</span>
<span class="sc">//设置消息的接收方</span>
msg.setReceipt(<span class="sr">"bot"</span>);
<span class="sc">//设置消息内容。本消息类型为文本消息。</span>
msg.addBody(new <span class="sb">TextMessageBody</span>(<span class="sr">"你好，环信!"</span>)</span>);

<span class="sc">//发送消息</span>
<span class="sb"><span class="sb">EMChatManager</span>.getInstance().sendMessage(msg);</span>
              </pre>
            </div>
            <div>
              <pre>
<span class="sc">// 创建一个聊天对象</span>
<span class="sb">EMChatText</span> *text = [[<span class="sb">EMChatText alloc</span>]<span class="sb"> initWithText:<span class="sr">@"你好，环信!"</span></span>];</span>

<span class="sc">// 创建一个Message Body</span>
<span class="sb">EMTextMessageBody</span> *body = [[<span class="sb">EMTextMessageBody alloc</span>]<span class="sb"> initWithChatObject:</span>text];</span>

<span class="sc">// 创建一个Message对象</span>
<span class="sb">EMMessage</span> *msg =[[ <span class="sb">EMMessage alloc</span>]<span class="sb"> initWithReceiver:<span class="sr">@"bot"</span> bodies</span>:[<span class="sb">NSArray arrayWithObject</span>:body]];</span>
<span class="sc">// 发送消息</span>
[[<span class="sb">EaseMob sharedInstance</span>].<span class="sb">chatManager sendMessage</span>:msg <span class="sb">progress</span>:nil <span class="sb">error</span>:nil];
              </pre>
            </div>
          </div>
        </div>
      </div>
      <div class="tabs_info">
        <h2>快速集成</h2>
        <p><span>√</span>只需几行代码，就可以在任意APP中快速集成移动IM。</p>
        <p><span>√</span>IM系统与APP业务系统和用户系统完全解耦，独立运行，IM只需要知道聊天双方的聊天ID。</p>
        <p><span>√</span>提供多种风格的UI模板及源码，开发者即可直接使用，也可在源码基础上快速改出自己风格的聊天页面。<a class="info_details" href="docs/ui" target="_blank">查看UI模板</a></p>
      </div>
      <!-- 切换效果 Strat -->
      <script type="text/javascript">
        $(document).ready(function() {
          $(".tabs li").click(function() {
            $(this).addClass("selected");
            $(this).siblings().removeClass("selected");
            var $dangqian = $(".tabs-con div").eq($(".tabs li").index(this));
            $dangqian.addClass("selected");
            $dangqian.siblings().removeClass("selected");
          });
        });
      </script>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="im_default_bg">
    <div id="container" class="chat_pic">
      <img src="/img/index_chat_01.png" alt="单聊 发语音，图片，表情，文字，位置，名片，附件。可扩展自定义消息类型消息发送回执：已发送，已接收，已阅读">
      <div class="txt">
        <h2>单聊</h2>
        <p><span>√</span>发语音，图片，表情，文字，位置，名片，附件。</p>
        <p><span>√</span>可扩展自定义消息类型</p>
        <p><span>√</span>消息发送回执：已发送，已接收，已阅读</p>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="im_default_bg white_bg">
    <div id="container" class="chat_pic_01">
      <img src="/img/index_chat_02.png" alt="群聊 支持500人到2000人大群 完善的群组权限管理">
      <div class="txt">
        <h2>群聊</h2>
        <p><span>√</span>支持500人到2000人大群</p>
        <p><span>√</span>完善的群组权限管理</p>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="im_default_bg">
    <div id="container" class="chat_pic_06">
      <img src="/img/index_chat_06.png" alt="开源的UI模板库">
      <div class="txt">
        <h2>开源的UI模板库</h2>
        <p><span>√</span>源代码完全开源的UI模板。多种风格任意选择。<br /><br /></p>
        <p><span>√</span>开发者即可直接使用，也可在源码基础上快速改出自己风格的聊天页面。<a class="info_details" href="/docs/ui" target="_blank">查看UI模板</a>
        </p>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="im_default_bg white_bg">
    <div id="container" class="chat_pic_02">
      <img src="/img/index_chat_03.png" alt="简单的API，强大的架构，深度优化">
      <div class="txt">
        <h2>简单的API，强大的架构，深度优化</h2>
        <p style="padding-left:0;">我们来自开发者，我们深知做好移动IM的种种坑点和难点，深知一个支撑几万用户的聊天服务器到一个千万用户在线的运营级的聊天服务器的差距。<br />
          我们对环信的各个方面做了深入的优化，让开发者通过简单的API调用就能零门槛获得成熟的运营级移动IM技术：<br /><br /></p>
        <p><span>√</span>强大成熟的服务器集群架构，支持千万级同时在线用户，低延迟，高并发，水平扩展，平滑扩容。</p>
        <p><span>√</span>不稳定网络环境下的长连接可靠性优化。</p>
        <p><span>√</span>流量优化，比标准协议优化70%以上。</p>
        <p><span>√</span>耗电量优化。</p>
        <p><span>√</span>语音录制降噪算法，语音高清压缩算法，图片压缩优化。</p>
        <p><span>√</span>安全：端对端加密，本地存储加密，语音图片加密，远程擦除。</p>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="im_default_bg">
    <div id="container" class="chat_pic_03">
      <div class="txt">
        <h2>我们将持续为你增加最新最cool的IM功能……</h2>
        <img src="/img/index_chat_04.png" alt="我们将持续为你增加最新最cool的IM功能……">
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="im_default_bg white_bg">
    <div id="container" class="chat_pic_05">
      <h2>开发者使用心得分享</h2>
      <div class="share_head">
        <img src="/img/index_head_01.png" alt="开发者使用心得分享">
        <span>
          <em>伏英娜</em><br/>
          哈图创始人
        </span>
      </div>
      <div class="txt">
        <p><span class="colon_up"></span>“如果你的APP没有用户之间的互动和社交，你的APP就始终只是一个工具，你只是在为微博、微信导流而已”。作为国内最大的图片分享社交APP，拥有百万用户的<a class="info_details" href="http://www.appmagics.cn/" target="_blank">哈图</a>非常重视社交建设。哈图搭载了基于环信开发的实时私信系统。不仅有对电量流量消耗的深度优化，还能保证消息实时到达，能发送语音图片位置等多种富媒体消息，各项用户体验完全接近微信。“感谢环信，我们只用了2天就完成了私信系统的集成，从而能把节约下来的资源投入到为哈图的用户提供更好的用户体验上”<span class="colon_down"></span></p>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="anli">
    <div class="anli1">
      <h2>他们都在使用环信</h2>
     <ul>
          <li><a href="http://www.qingting.fm/#/recommend" target="_blank"><img src="img/qt.png"></a></li>
          <li><a href="http://cn.dolphin.com/" target="_blank"><img src="img/hte.png"></a></li>
          <li><a href="http://app.autohome.com.cn/apps/club/" target="_blank"><img src="img/cheyouhui.png" height="63" width="63"></a></li>
          <li><a href="http://m.qiuying.com/" target="_blank"><img src="img/qy.png"></a></li>
          <li><a href="http://ibeiliao.com/" target="_blank"><img src="img/bl.png"></a></li>
          <li><a href="http://www.appmagics.com/" target="_blank"><img src="img/ht.png"></a></li>
          <li><a href="http://www.xiaoneimimi.com/" target="_blank"><img src="img/xn.png"></a></li>
          <li><a href="http://www.jiecao.fm/" target="_blank"><img src="img/jiecao.png"  height="63" width="63"></a></li>
          <li><a href="http://www.haomee.net/" target="_blank"><img src="img/kandongman.png" height="63" width="63"></a></li>
      </ul>
      <dl>
          <dd style="margin-right:55px;"><a href="http://www.qingting.fm/#/recommend" target="_blank">蜻蜓fm</a></dd>
          <dd style="margin-right:55px;"><a href="http://cn.dolphin.com/" target="_blank">海豚浏览器</a></dd>
          <dd style="margin-right:80px;"><a href="http://app.autohome.com.cn/apps/club/" target="_blank">车友会</a></dd>
          <dd style="margin-right:85px;"><a href="http://m.qiuying.com/" target="_blank">求应</a></dd>
          <dd style="margin-right:85px;"><a href="http://ibeiliao.com/" target="_blank">贝聊</a></dd>
          <dd style="margin-right:72px;"><a href="http://www.appmagics.com/" target="_blank">哈图</a></dd>
          <dd style="margin-right:68px;margin-right:58px;"><a href="http://www.xiaoneimimi.com/" target="_blank">校内秘密</a></dd>
          <dd style="padding-left:1px;margin-right:40px;"><a href="http://www.jiecao.fm/" target="_blank">节操精选</a></dd>
          <dd style="padding-left:21px;margin-right:9px;"><a href="http://www.haomee.net/" target="_blank">看动漫</a></dd>
      </dl>
      <ul>
          <li><a href="http://www.pandabus.cn" target="_blank"><img src="img/xm.png"></a></li>
          <li><a href="http://www.pgyer.com/nh0N" target="_blank"><img src="img/hm.png" style="padding-left:3px;"></a></li>
          <li><a href="http://www.xzhichang.com/xapp/index" target="_blank"><img src="img/zc.png"></a></li>
          <li><a href="http://www.tenmini.com" target="_blank"><img src="img/pp.png"></a></li>
          <li><a href="http://yeba.im/"  target="_blank"><img src="img/yb.png"></a></li>
          <li><a href="https://itunes.apple.com/cn/app/wei-xing-zuo-xing-zuo-jiao/id696468083?mt=8" target="_blank"><img src="img/wxz.png"></a></li>
          <li><a href="http://www.imlxs.com/" target="_blank"><img src="img/lxs.png"></a></li>
          <li><a href="https://itunes.apple.com/cn/app/shi-shang-mao-re-men-fa-xing./id673935108?l=zh&ls=1&mt=8" target="_blank"><img src="img/ssm.png"></a></li>
          <li><a href="http://www.tuotuo.im" target="_blank"><img src="img/tt.png" style="padding-left:3px;"></a></li>
      </ul>
      <dl>
          <dd style="margin-right:62px;"><a href="http://www.pandabus.cn" target="_blank">熊猫公交</a></dd>
          <dd style="margin-right:73px;"><a href="http://www.pgyer.com/nh0N" target="_blank">小黑马</a></dd>
          <dd style="margin-right:82px;"><a href="http://www.xzhichang.com/xapp/index" target="_blank" >X职场</a></dd>
          <dd style="margin-right:75px;"><a href="http://www.tenmini.com" target="_blank">跑跑</a></dd>
          <dd style="margin-right:77px;padding-left:10px;"><a href="http://yeba.im/" target="_blank">夜吧</a></dd>
          <dd style="margin-right:68px;"><a href="https://itunes.apple.com/cn/app/wei-xing-zuo-xing-zuo-jiao/id696468083?mt=8" target="_blank">微星座</a></dd>
          <dd style="margin-right:73px;"><a href="http://www.imlxs.com/" target="_blank">留学僧</a></dd>
          <dd style="margin-right:79px;"><a href="https://itunes.apple.com/cn/app/shi-shang-mao-re-men-fa-xing./id673935108?l=zh&ls=1&mt=8" target="_blank">时尚猫</a></dd>
          <dd><a href="http://www.tuotuo.im" target="_blank">拓拓</a></dd>

      </dl>
      <ul>
          <li><a href="https://itunes.apple.com/us/app/dian-jin/id893445726?l=zh&ls=1&mt=8" target="_blank"><img src="img/jd.png"></a></li>
          <li><a href="http://www.guishitech.com/_d1479.htm" target="_blank"><img src="img/gswtk.jpg" style="padding-left:3px;"></a></li>
          <li><a href="https://itunes.apple.com/cn/app/id705778436?mt=8" target="_blank"><img src="img/jiashengmi.jpg"></a></li>
          <li><a href="https://appmeimei.com/app/download" target="_blank"><img src="img/mxd.png"></a></li>
          <li><a href="http://m.taoshij.com:8000/download.html" target="_blank"><img src="img/taoshijie.jpg"></a></li>
          <li><a href="http://www.bskcare.com" target="_blank"><img src="img/tang.png"></a></li>
          <li><a href="http://www.ymaiban.com/" target="_blank"><img src="img/yangmaiban.jpg"></a></li>
         <li><a href="https://itunes.apple.com/cn/app/ce-ce-ce-shi-shen-qi!-xing/id756771906?mt=8" target="_blank"><img src="img/cc.png"></a></li>
         <li><a href="http://www.ifanmi.cn/" target="_blank"><img src="img/fm.png"></a></li>

      </ul>
      <dl style="padding-left:15px">
          <dd style="margin-right:64px;"><a href="https://itunes.apple.com/us/app/dian-jin/id893445726?l=zh&ls=1&mt=8" target="_blank">点近</a></dd>
          <dd style="margin-right:56px;"><a href="http://www.guishitech.com/_d1479.htm" target="_blank" >规士问题控</a></dd>
          <dd style="margin-right:75px;"><a href="https://itunes.apple.com/cn/app/id705778436?mt=8" target="_blank" >甲生米</a></dd>
          <dd style="margin-right:72px;"><a href="https://appmeimei.com/app/download" target="_blank">美美</a></dd>
          <dd style="padding-left:10px;margin-right:52px;"><a href="http://m.taoshij.com:8000/download.html" target="_blank">淘世界</a></dd>
          <dd style="padding-left:10px;margin-right:60px;"><a href="http://www.bskcare.com" target="_blank">血糖高管</a></dd>
          <dd style="padding-left:2px;margin-right:60px;"><a href="http://www.ymaiban.com/" target="_blank">洋买办</a></dd>
          <dd style="padding-left:15px;margin-right:85px;"><a href="https://itunes.apple.com/cn/app/ce-ce-ce-shi-shen-qi!-xing/id756771906?mt=8" target="_blank">测测</a></dd>
         <dd><a href="http://www.ifanmi.cn/" target="_blank">番迷</a></dd>

      </dl>
      <ul>
          <li><a href="http://kaola.joysedu.com" target="_blank"><img src="img/kaola.png"></a></li>
          <li><a href="https://itunes.apple.com/cn/app/lu-bu/id907760859?mt=8" target="_blank"><img src="img/qinglvtubiao.png" style="padding-left:3px;"></li>
          <li><a href="http://www.yohelper.com" target="_blank"><img src="img/youzai.png"></a></li>
          <li><a href="http://www.7keyun.com" target="_blank"><img src="img/qikeyun.jpg"></a></li>
          <li><a href="http://www.mele.tv/" target="_blank"><img src="img/milue.png"></a></li>
          <li><a href="http://www.ruyizi.com/" target="_blank"><img src="img/ruyizi.png"></a></li>
          <li><a href="http://www.shiyuehehu.com/" target="_blank"><img src="img/shiyuehehu.png"></a></li>
          <li><a href="http://www.iyuanquan.com/" target="_blank"><img src="img/yq.png"></a></li>
          <li><a href="http://www.hptn.cn" target="_blank"><img src="img/zhinengkouqu.jpg"></a></li>
      </ul>
      <dl style="padding-left:16px">
          <dd style="margin-right:64px;"><a href="http://kaola.joysedu.com" target="_blank">考啦</a></dd>
          <dd style="padding-left:21px;margin-right:64px;"><a href="https://itunes.apple.com/cn/app/lu-bu/id907760859?mt=8" target="_blank">侣步</a></dd>
          <dd style="padding-left:21px;margin-right:68px;"><a href="http://www.yohelper.com" target="_blank" >优载</a></dd>
          <dd style="padding-left:12px;margin-right:62px;"><a href="http://www.7keyun.com" target="_blank">企客云</a></dd>
          <dd style="padding-left:13px;margin-right:62px;"><a href="http://www.mele.tv" target="_blank">蜜乐</a></dd>
          <dd style="padding-left:17px;margin-right:60px;"><a href="http://www.ruyizi.com/" target="_blank">如意子</a></dd>
          <dd style="padding-left:1px;margin-right:68px;"><a href="http://www.shiyuehehu.com/" target="_blank">十月呵护</a></dd>
          <dd style="margin-right:60px;"><a href="http://www.iyuanquan.com/" target="_blank">i园圈</a></dd>
         <dd style="padding-left:8px;margin-right:12px;"><a href="http://www.hptn.cn" target="_blank">智能口语</a></dd>
      </dl>

	  <ul>
          <li><a href="http://www.chedd.com" target="_blank"><img src="img/cheduoduo.png" height="63" width="60"></a></li>
          <li><a href="http://www.jiamian.mobi" target="_blank"><img src="img/jiamian.png" style="padding-left:3px;" height="63" width="60"></li>
          <li><a href="http://starsworld.cn/" target="_blank"><img src="img/mingxingshijie.png" height="63" width="60"></a></li>
          <li><a href="http://www.eading.cn/CH/app.aspx" target="_blank"><img src="img/yiding.png" height="63" width="60"></a></li>
          <li><a href="http://www.4axx.com" target="_blank"><img src="img/yidongqida.png" height="63" width="60"></a></li>
          <li><a href="https://zhisiyun.com/dl_ios" target="_blank"><img src="img/zhisiyun.png" height="63" width="60"></a></li>
          <li><a href="http://zhushou.360.cn/detail/index/soft_id/2039572?recrefer=SE_D_%E5%BE%AE%E5%9F%8E" target="_blank"><img src="img/weicheng.png" height="63" width="60"></a></li>
		 <li><a href="http://www.medicool.cn/zhenlipai.aspx?Aid=2" target="_blank"><img src="img/zhenlipai.png" ></a></li>
          <li><a href="http://www.suicheji.com/" target="_blank"><img src="img/suicheji.jpg"></a></li>
      </ul>
      <dl style="padding-left:7px">
          <dd style="margin-right:58px;padding-left:1px"><a href="http://www.chedd.com" target="_blank">车多多</a></dd>
          <dd style="padding-left:21px;margin-right:54px;"><a href="http://www.jiamian.mobi" target="_blank">假面</a></dd>
          <dd style="padding-left:21px;margin-right:52px;"><a href="http://starsworld.cn/" target="_blank" >明星世界</a></dd>
          <dd style="padding-left:12px;margin-right:62px;"><a href="http://www.eading.cn/CH/app.aspx" target="_blank">一丁</a></dd>
          <dd style="padding-left:13px;margin-right:60px;"><a href="http://www.4axx.com" target="_blank">移动企大</a></dd>
          <dd style="padding-left:1px;margin-right:66px;"><a href="https://zhisiyun.com/dl_ios" target="_blank">智思云</a></dd>
          <dd style="padding-left:1px;margin-right:69px;"><a href="http://zhushou.360.cn/detail/index/soft_id/2039572?recrefer=SE_D_%E5%BE%AE%E5%9F%8E" target="_blank">微城</a></dd>
          <dd style="padding-left:9px;margin-right:56px;"><a href="http://www.medicool.cn/zhenlipai.aspx?Aid=2" target="_blank">珍立拍</a></dd>
          <dd style="padding-left:17px;margin-right:22px;"><a href="http://www.suicheji.com/" target="_blank">随车记</a></dd>
      </dl>
    </div>
  </div>
  <div class="clearfix"></div>

</div>

