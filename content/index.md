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
    <div id="container" class="chat_pic_05 wrap240">
      <h2>典型案例</h2>
      <ul class="share_loop">
        <li>
          <a href="http://cn.dolphin.com" target="_blank">
            <i class="share_avatar avatar_01"></i>
            <span>海豚浏览器</span>
          </a>
        </li>
        <li>
          <a href="http://www.qingting.fm/#/recommend" target="_blank">
            <i class="share_avatar avatar_02"></i>
            <span>蜻蜓fm</span>
          </a>
        </li>
        <li>
          <a href="http://app.autohome.com.cn/apps/club/" target="_blank">
            <i class="share_avatar avatar_03"></i>
            <span>车友会</span>
          </a>
        </li>
        <li>
          <a href="http://www.jiecao.fm/" target="_blank">
            <i class="share_avatar avatar_04"></i>
            <span>节操精选</span>
          </a>
        </li>
        <li>
          <a href="http://www.haomee.net/" target="_blank">
            <i class="share_avatar avatar_05"></i>
            <span>看动漫</span>
          </a>
        </li>
        <li>
          <a href="http://ibeiliao.com/" target="_blank">
            <i class="share_avatar avatar_06"></i>
            <span>贝聊</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="clearfix"></div>
  <script type="text/javascript">
    $(document).ready(function(){
      $(".share_loop li i").hover(function(){
            $(this).parent().parent().addClass("active");
        },function(){
          $(this).parent().parent().removeClass("active");
        });
      });
  </script>
  <div class="anli">
    <div class="anli1">
      <h2>他们都在使用环信</h2>
      <ul>
          <li>
            <a href="http://www.qingting.fm/#/recommend" target="_blank"><img src="img/qt.png" /><span class="mask"></span></a>
            <a href="http://www.qingting.fm/#/recommend" target="_blank"><strong>蜻蜓fm</strong></a>
          </li>
          <li>
            <a href="http://cn.dolphin.com/" target="_blank"><img src="img/hte.png" /><span class="mask"></span></a>
            <a href="http://cn.dolphin.com/" target="_blank"><strong>海豚浏览器</strong></a>
          </li>
          <li>
            <a href="http://app.autohome.com.cn/apps/club/" target="_blank"><img src="img/cheyouhui.png" height="60" width="60" /><span class="mask"></span></a>
            <a href="http://app.autohome.com.cn/apps/club/" target="_blank"><strong>车友会</strong></a>
          </li>
          <li>
            <a href="http://www.jiecao.fm/" target="_blank"><img src="img/jiecao.png" height="60" width="60" /><span class="mask"></span></a>
            <a href="http://www.jiecao.fm/" target="_blank"><strong>节操精选</strong></a>
          </li>
          <li>
            <a href="http://www.haomee.net/" target="_blank"><img src="img/kandongman.png" height="60" width="60" /><span class="mask"></span></a>
            <a href="http://www.haomee.net/" target="_blank"><strong>看动漫</strong></a>
          </li>
          <li>
            <a href="http://ibeiliao.com/" target="_blank"><img src="img/bl.png" /><span class="mask"></span></a>
            <a href="http://ibeiliao.com/" target="_blank"><strong>贝聊</strong></a>
          </li>
          <li>
            <a href="http://m.qiuying.com/" target="_blank"><img src="img/qy.png" /><span class="mask"></span></a>
            <a href="http://m.qiuying.com/" target="_blank"><strong>求应</strong></a>
          </li>
          <li>
            <a href="http://www.appmagics.com/" target="_blank"><img src="img/ht.png" /><span class="mask"></span></a>
            <a href="http://www.appmagics.com/" target="_blank"><strong>哈图</strong></a>
          </li>
          <li>
            <a href="http://www.xiaoneimimi.com/" target="_blank"><img src="img/xn.png" /><span class="mask"></span></a>
            <a href="http://www.xiaoneimimi.com/" target="_blank"><strong>校内秘密</strong></a>
          </li>
      </ul>
      <ul>
          <li>
            <a href="http://www.vvpinche.com/download.html?id=7" target="_blank"><img src="img/vvpingche.png" height="60" width="60" /><span class="mask"></span></a>
            <a href="http://www.vvpinche.com/download.html?id=7" target="_blank"><strong>微微拼车</strong></a>
          </li>
          <li>
            <a href="http://www.pgyer.com/nh0N" target="_blank"><img src="img/hm.png" /><span class="mask"></span></a>
            <a href="http://www.pgyer.com/nh0N" target="_blank"><strong>小黑马</strong></a>
          </li>
          <li>
            <a href="http://www.xzhichang.com/xapp/index" target="_blank"><img src="img/zc.png" /><span class="mask"></span></a>
            <a href="http://www.xzhichang.com/xapp/index" target="_blank"><strong>X职场</strong></a>
          </li>
          <li>
            <a href="http://www.tenmini.com" target="_blank"><img src="img/pp.png" height="60" width="60" /><span class="mask"></span></a>
            <a href="http://www.tenmini.com" target="_blank"><strong>跑跑</strong></a>
          </li>
          <li>
            <a href="http://yeba.im/"  target="_blank"><img src="img/yb.png" /><span class="mask"></span></a>
            <a href="http://yeba.im/" target="_blank"><strong>夜吧</strong></a>
          </li>
          <li>
            <a href="https://itunes.apple.com/cn/app/wei-xing-zuo-xing-zuo-jiao/id696468083?mt=8" target="_blank"><img src="img/wxz.png" /><span class="mask"></span></a>
            <a href="https://itunes.apple.com/cn/app/wei-xing-zuo-xing-zuo-jiao/id696468083?mt=8" target="_blank"><strong>微星座</strong></a>
          </li>
          <li>
            <a href="http://www.imlxs.com/" target="_blank"><img src="img/lxs.png" /><span class="mask"></span></a>
            <a href="http://www.imlxs.com/" target="_blank"><strong>留学僧</strong></a>
          </li>
          <li>
            <a href="https://itunes.apple.com/cn/app/shi-shang-mao-re-men-fa-xing./id673935108?l=zh&ls=1&mt=8" target="_blank"><img src="img/ssm.png" /><span class="mask"></span></a>
            <a href="https://itunes.apple.com/cn/app/shi-shang-mao-re-men-fa-xing./id673935108?l=zh&ls=1&mt=8" target="_blank"><strong>时尚猫</strong></a>
          </li>
          <li>
            <a href="http://www.tuotuo.im" target="_blank"><img src="img/tt.png" /><span class="mask"></span></a>
            <a href="http://www.tuotuo.im" target="_blank"><strong>拓拓</strong></a>
          </li>
      </ul>
      <ul>
          <li>
            <a href="https://itunes.apple.com/us/app/dian-jin/id893445726?l=zh&ls=1&mt=8" target="_blank"><img src="img/jd.png" /><span class="mask"></span></a>
            <a href="https://itunes.apple.com/us/app/dian-jin/id893445726?l=zh&ls=1&mt=8" target="_blank"><strong>点近</strong></a>
          </li>
          <li>
            <a href="http://www.guishitech.com/_d1479.htm" target="_blank"><img src="img/gswtk.png" /><span class="mask"></span></a>
            <a href="http://www.guishitech.com/_d1479.htm" target="_blank"><strong>规士问题控</strong></a>
          </li>
          <li>
            <a href="http://qng.im/" target="_blank"><img src="img/qingguo.png" /><span class="mask"></span></a>
            <a href="http://qng.im/" target="_blank"><strong>青果</strong></a>
          </li>
          <li>
            <a href="https://appmeimei.com/app/download" target="_blank"><img src="img/mxd.png" /><span class="mask"></span></a>
            <a href="https://appmeimei.com/app/download" target="_blank"><strong>美美</strong></a>
          </li>
          <li>
            <a href="http://m.taoshij.com:8000/download.html" target="_blank"><img src="img/taoshijie.png" /><span class="mask"></span></a>
            <a href="http://m.taoshij.com:8000/download.html" target="_blank"><strong>淘世界</strong></a>
          </li>
          <li>
            <a href="http://www.bskcare.com" target="_blank"><img src="img/tang.png" /><span class="mask"></span></a>
            <a href="http://www.bskcare.com" target="_blank"><strong>血糖高管</strong></a>
          </li>
          <li>
            <a href="http://www.ymaiban.com/" target="_blank"><img src="img/yangmaiban.jpg" /><span class="mask"></span></a>
            <a href="http://www.ymaiban.com/" target="_blank"><strong>洋买办</strong></a>
          </li>
         <li>
           <a href="https://itunes.apple.com/cn/app/ce-ce-ce-shi-shen-qi!-xing/id756771906?mt=8" target="_blank"><img src="img/cc.png" /><span class="mask"></span></a>
           <a href="https://itunes.apple.com/cn/app/ce-ce-ce-shi-shen-qi!-xing/id756771906?mt=8" target="_blank"><strong>测测</strong></a>
         </li>
         <li>
           <a href="http://www.ifanmi.cn/" target="_blank"><img src="img/fm.png" /><span class="mask"></span></a>
           <a href="http://www.ifanmi.cn/" target="_blank"><strong>番迷</strong></a>
         </li>
      </ul>
      <ul>
          <li>
            <a href="http://kaola.joysedu.com" target="_blank"><img src="img/kaola.png" /><span class="mask"></span></a>
            <a href="http://kaola.joysedu.com" target="_blank"><strong>考啦</strong></a>
          </li>
          <li>
            <a href="https://itunes.apple.com/cn/app/lu-bu/id907760859?mt=8" target="_blank"><img src="img/qinglvtubiao.png" /><span class="mask"></span></a>
            <a href="https://itunes.apple.com/cn/app/lu-bu/id907760859?mt=8" target="_blank"><strong>侣步</strong></a>
          </li>
          <li>
            <a href="http://www.yohelper.com" target="_blank"><img src="img/youzai.png" /><span class="mask"></span></a>
            <a href="http://www.yohelper.com" target="_blank"><strong>外语帮手</strong></a>
          </li>
          <li>
            <a href="http://www.7keyun.com" target="_blank"><img src="img/qikeyun.jpg" /><span class="mask"></span></a>
            <a href="http://www.7keyun.com" target="_blank"><strong>企客云</strong></a>
          </li>
          <li>
            <a href="http://www.mele.tv/" target="_blank"><img src="img/milue.png" /><span class="mask"></span></a>
            <a href="http://www.mele.tv" target="_blank"><strong>蜜乐</strong></a>
          </li>
          <li>
            <a href="http://www.ruyizi.com/" target="_blank"><img src="img/ruyizi.png" /><span class="mask"></span></a>
            <a href="http://www.ruyizi.com/" target="_blank"><strong>如意子</strong></a>
          </li>
          <li>
            <a href="http://www.shiyuehehu.com/" target="_blank"><img src="img/shiyuehehu.png" /><span class="mask"></span></a>
            <a href="http://www.shiyuehehu.com/" target="_blank"><strong>十月呵护</strong></a>
          </li>
          <li>
            <a href="http://www.iyuanquan.com/" target="_blank"><img src="img/yq.png" /><span class="mask"></span></a>
            <a href="http://www.iyuanquan.com/" target="_blank"><strong>i园圈</strong></a>
          </li>
          <li>
            <a href="http://bm.apeman.cn/" target="_blank"><img src="img/bangmang.png" height="60" width="60" /><span class="mask"></span></a>
            <a href="http://bm.apeman.cn/" target="_blank"><strong>帮忙</strong></a>
          </li>
      </ul>
      <ul>
          <li>
            <a href="http://www.chedd.com" target="_blank"><img src="img/cheduoduo.png" height="60" width="60" /><span class="mask"></span></a>
            <a href="http://www.chedd.com" target="_blank"><strong>车多多</strong></a>
          </li>
          <li>
            <a href="http://www.jiamian.mobi" target="_blank"><img src="img/jiamian.png" height="60" width="60" /><span class="mask"></span></a>
            <a href="http://www.jiamian.mobi" target="_blank"><strong>假面</strong></a>
          </li>
          <li>
            <a href="http://starsworld.cn/" target="_blank"><img src="img/mingxingshijie.png" height="60" width="60" /><span class="mask"></span></a>
            <a href="http://starsworld.cn/" target="_blank"><strong>明星世界</strong></a>
          </li>
          <li>
            <a href="http://www.eading.cn/CH/app.aspx" target="_blank"><img src="img/yiding.png" height="60" width="60" /><span class="mask"></span></a>
            <a href="http://www.eading.cn/CH/app.aspx" target="_blank"><strong>一丁</strong></a>
          </li>
          <li>
            <a href="http://www.4axx.com" target="_blank"><img src="img/yidongqida.png" height="60" width="60" /><span class="mask"></span></a>
            <a href="http://www.4axx.com" target="_blank"><strong>移动企大</strong></a>
          </li>
          <li>
            <a href="https://zhisiyun.com/dl_ios" target="_blank"><img src="img/zhisiyun.png" height="60" width="60" /><span class="mask"></span></a>
            <a href="https://zhisiyun.com/dl_ios" target="_blank"><strong>智思云</strong></a>
          </li>
          <li>
            <a href="http://zhushou.360.cn/detail/index/soft_id/2039572?recrefer=SE_D_%E5%BE%AE%E5%9F%8E" target="_blank"><img src="img/weicheng.png" height="60" width="60" /><span class="mask"></span></a>
            <a href="http://zhushou.360.cn/detail/index/soft_id/2039572?recrefer=SE_D_%E5%BE%AE%E5%9F%8E" target="_blank"><strong>微城</strong></a>
          </li>
          <li>
            <a href="http://www.medicool.cn/zhenlipai.aspx?Aid=2" target="_blank"><img src="img/zhenlipai.png" /><span class="mask"></span></a>
            <a href="http://www.medicool.cn/zhenlipai.aspx?Aid=2" target="_blank"><strong>珍立拍</strong></a>
          </li>
          <li>
            <a href="http://www.suicheji.com/" target="_blank"><img src="img/suicheji.jpg" /><span class="mask"></span></a>
            <a href="http://www.suicheji.com/" target="_blank"><strong>随车记</strong></a>
          </li>
      </ul>
    </div>
  </div>
  <div class="clearfix"></div>
</div>

