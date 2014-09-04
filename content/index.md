---
title: 环信即时通讯云 - 五分钟为你的App加入移动IM功能
layout: overview
---

<style>
.anli1 dl dd a { color:#51ADED; border-bottom:2px solid #EAEAEA;}
.anli1 dl dd a:hover { border-bottom:2px solid #7c7c7c;}
.anli {color:#666; font-size:36px; height:312px;  width:100%; background:#FFF; font-weight:normal; margin:0 auto; background:none repeat scroll 0 0 #fff;}
.anli1 { margin: 0px auto; width:990px;}
.anli1 h2 {font-weight:normal;}
.anli1 img { margin-top:25px;}
</style>

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
  <div class="clearfix"></div><!--
  <div class="im_default_bg white_bg">
    <div id="container" class="chat_pic_05">
      <h2>开发者使用心得分享</h2>
      <div class="share_head">
        <img src="/img/index_head_01.png" alt="开发者使用心得分享">
        <span>
          <em>刘松</em><br/>
          微星座CEO
        </span>
      </div>
      <div class="txt">
        <p><span class="colon_up"></span>给广大中小创业团队推荐一下这个环信。如果你的APP需要类微信聊天的功能，比如单聊，群聊，发语音，发图片，发位置，发视频，你的团队又不想花时间精力自己研究IM，那就用环信吧。微星座是一个社交手游，对UI风格和设计有非常高的要求，所以我们对环信提供的标准UI模板做了深度的定制，但我们也一共只用了3天时间，就在微星座里集成了完整的聊天功能。<a class="info_details" href="https://itunes.apple.com/cn/app/wei-xing-zuo-wo-zhuan-shu/id696468083?mt=8" target="_blank">下载体验</a><span class="colon_down"></span></p>
      </div>
    </div>
  </div>

  -->
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
        <p><span>√</span>提供多种风格的UI模板及源码，开发者即可直接使用，也可在源码基础上快速改出自己风格的聊天页面。<a class="info_details" href="/docs/ui" target="_blank">查看UI模板</a></p>
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
        <p><span>√</span>源代码完全开源的UI模板。多种风格任意选择。</p>
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
        <p><span class="colon_up"></span><i><strong>“如果你的APP没有用户之间的互动和社交，你的APP就始终只是一个工具，你只是在为微博、微信导流而已”。</strong></i>作为国内最大的图片分享社交APP，拥有百万用户的<a class="info_details" href="http://www.appmagics.cn/" target="_blank">哈图</a>非常重视社交建设。哈图搭载了基于环信开发的实时私信系统。不仅有对电量流量消耗的深度优化，还能保证消息实时到达，能发送语音图片位置等多种富媒体消息，各项用户体验完全接近微信。<i><strong>“感谢环信，我们只用了2天就完成了私信系统的集成，从而能把节约下来的资源投入到为哈图的用户提供更好的用户体验上”</strong></i><span class="colon_down"></span></p>
      </div>
    </div>
  </div>
<div class="anli">
   <div class="anli1">
    <h2>他们都在使用环信</h2>
    <img src="../img/xian.png" style=" margin-top:20px;">
    <ul style=" width:990px;">
      <li style="float:left;"><a href="http://www.qingting.fm/#/recommend"  target="_black" style="color:#828187; font-size:15px; font-family:'宋体'; padding-left:3px;"><img src="../img/qt.png"></a></li>
        <li style="float:left; padding-left:55px;"><a href="http://cn.dolphin.com/" target="_black" style="color:#828187; font-size:15px; font-family:'宋体';"><img src="../img/hte.png"></a></li>
        <li style="float:left; padding-left:55px;"><a href="https://itunes.apple.com/cn/app/ce-ce-ce-shi-shen-qi!-xing/id756771906?mt=8" target="_black" style="color:#828187; font-size:15px; font-family:'宋体';"><img src="../img/cc.png"></a></li>
        <li style="float:left; padding-left:55px;"><a href="http://m.qiuying.com/" target="_black" style="color:#828187; font-size:15px; font-family:'宋体';"><img src="../img/qy.png"></a></li>
        <li style="float:left; padding-left:55px;"><a href="http://ibeiliao.com/" target="_black" style="color:#828187; font-size:15px; font-family:'宋体';"><img src="../img/bl.png"></a></li>
        <li style="float:left; padding-left:55px;"><a href="http://www.appmagics.com/" target="_black" style="color:#828187; font-size:15px; font-family:'宋体';" ><img src="../img/ht.png"></a></li>
        <li style="float:left; padding-left:55px;"><a href="http://www.xiaoneimimi.com/" target="_black" style="color:#828187; font-size:15px; font-family:'宋体';"><img src="../img/xn.png"></a></li>
        <li style="float:left; padding-left:55px;"><a href="https://itunes.apple.com/cn/app/shi-shang-mao-re-men-fa-xing./id673935108?l=zh&ls=1&mt=8" style="color:#828187; font-size:15px; font-family:'宋体';" target="_black"><img src="../img/ssm.png"></a></li>
        <li style="float:left; padding-left:55px;"><a href="http://www.tuotuo.im" style="color:#828187; font-size:15px; font-family:'宋体';" target="_black"><img src="../img/tt.png" style="padding-left:3px;"></a></li>
    </ul>
    <dl style="width:990px;; float:left; font-size:15px; a:hover:#039; padding-left:7px;">
      <dd style=" float:left; margin-right:55px;"><a href="http://www.qingting.fm/#/recommend" target="_black">蜻蜓fm</a></dd>
        <dd style=" float:left; margin-right:63px;"><a href="http://cn.dolphin.com/" target="_black" >海豚浏览器</a></dd>
        <dd style=" float:left; margin-right:83px;"><a href="https://itunes.apple.com/cn/app/ce-ce-ce-shi-shen-qi!-xing/id756771906?mt=8" target="_black">测测</a></dd>
        <dd style=" float:left; margin-right:85px;"><a href="http://m.qiuying.com/" target="_black">求应</a></dd>
        <dd style=" float:left; margin-right:87px;"><a href="http://ibeiliao.com/" target="_black">贝聊</a></dd>
        <dd style=" float:left; margin-right:72px;"><a href="http://www.appmagics.com/" target="_black">哈图</a></dd>
        <dd style=" float:left; margin-right:65px;"><a href="http://www.xiaoneimimi.com/" target="_black">校内秘密</a></dd>
        <dd style=" float:left; margin-right:78px;"><a href="https://itunes.apple.com/cn/app/shi-shang-mao-re-men-fa-xing./id673935108?l=zh&ls=1&mt=8" target="_black">时尚猫</a></dd>
        <dd style=" float:left;"><a href="http://www.tuotuo.im" target="_black">拓拓</a></dd>
    </dl>
    <ul style=" width:990px;">
      
        <li style="float:left;"><a href="http://www.pandabus.cn" style="color:#828187; font-size:15px; font-family:'宋体';" target="_black"><img src="../img/xm.png"></a></li>
        <li style="float:left; padding-left:55px;"><a href="http://www.pgyer.com/nh0N" style="color:#828187; font-size:15px; font-family:'宋体';" target="_black"><img src="../img/hm.png" style="padding-left:3px;"></a></li>
        <li style="float:left; padding-left:55px;"><a href="http://www.xzhichang.com/xapp/index" target="_black" style="color:#828187; font-size:15px; font-family:'宋体';"><img src="../img/zc.png"></a></li>
        <li style="float:left; padding-left:55px;"><a href="http://paopao.fm/" target="_black" style="color:#828187; font-size:15px; font-family:'宋体';"><img src="../img/pp.png"></a></li>
        <li style="float:left; padding-left:55px;"><a href="http://yeba.im/"  target="_black" style="color:#828187; font-size:15px; font-family:'宋体'; padding-left:3px;"><img src="../img/yb.png"></a></li>
        <li style="float:left; padding-left:54px;"><a href="https://itunes.apple.com/cn/app/wei-xing-zuo-xing-zuo-jiao/id696468083?mt=8" target="_black" style="color:#828187; font-size:15px; font-family:'宋体';"><img src="../img/wxz.png"></a></li>
        <li style="float:left; padding-left:54px;"><a href="http://www.imlxs.com/" target="_black" style="color:#828187; font-size:15px; font-family:'宋体';"><img src="../img/lxs.png"></a></li>
        <li style="float:left; padding-left:55px;"><a href="http://www.iyuanquan.com/" target="_black" style="color:#828187; font-size:15px; font-family:'宋体';" ><img src="../img/yq.png"></a></li>
        <li style="float:left; padding-left:55px;"><a href="http://www.ifanmi.cn/" target="_black" style="color:#828187; font-size:15px; font-family:'宋体';"><img src="../img/fm.png"></a></li>
        
    </ul>
    <dl style="width:990px;; float:left; font-size:15px; a:hover:#039; padding-left:3px;">
        <dd style=" float:left; margin-right:62px;"><a href="http://www.pandabus.cn" target="_black">熊猫公交</a></dd>
        <dd style=" float:left; margin-right:73px;"><a href="http://www.pgyer.com/nh0N" target="_black">小黑马</a></dd>
        <dd style=" float:left; margin-right:82px;"><a href="http://www.xzhichang.com/xapp/index" target="_black" >X职场</a></dd>
        <dd style=" float:left; margin-right:75px;"><a href="http://paopao.fm/" target="_black">跑跑</a></dd>
        <dd style=" float:left; margin-right:77px; padding-left:14px;"><a href="http://yeba.im/" target="_black">夜吧</a></dd>
        <dd style=" float:left; margin-right:68px;"><a href="https://itunes.apple.com/cn/app/wei-xing-zuo-xing-zuo-jiao/id696468083?mt=8" target="_black">微星座</a></dd>
        <dd style=" float:left; margin-right:78px;"><a href="http://www.imlxs.com/" target="_black">留学僧</a></dd>
        <dd style=" float:left; margin-right:85px;"><a href="http://www.iyuanquan.com/" target="_black">i园圈</a></dd>
        <dd style=" float:left;"><a href="http://www.ifanmi.cn/" target="_black">番迷</a></dd>
        
    </dl>
    </div>
    </div>
  <div class="clearfix"></div>

</div>

