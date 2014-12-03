---
title: WebIM 开发指南
sidebar: webimsidebar
secondnavwebim: true
---

##集成方式 {#quickstartinapp}
1.下载WEB-IM-SDK.zip加压后需将easymob-webim-SDK1.0目录下相关js文件拷贝到系统相应的目录下。

2.新建html文件并引入相关js脚本。


	<script type="text/javascript" src="jquery-1.11.1.js"></script>
	<script type='text/javascript' src='strophe-custom-1.0.0.js'></script>
	<script type='text/javascript' src='json2.js'></script>
	<script type="text/javascript" src="easemob.im-1.0.3.js"></script>
	<script type="text/javascript" src="bootstrap.js"></script>
下面以用户登录、发送文本消息、操作好友为例引导用户完成WEB-IM-SDK的简单使用。

## 注册 {#regist}

根据用户名/密码/昵称注册环信WEB-IM。新建注册页面html元素。

	<div id="regist-box">
		user<input type="text" id="usename" />
    	password<input type="password" id="password" />
		nickname<input type="text" id="nickname" />
		<input type="button" value="regist"  id="regist" />
	</div>

编写注册按钮调用js函数。

<pre class="hll"><code class="language-javascript">
  $("#regist").on('click', function() {
	var options = {
		username : 'zjj8',
		password : '123456',
		appKey : 'easemob-demo#chatdemoui',
		success : function(result) {
				//注册成功;
		},
		error : function(e) {
				//注册失败;
		}
	};
	Easemob.im.Helper.registerUser(options);
  });
</code></pre>

## 登录 {#login}

根据用户名／密码登录环信WEB-IM。新建用户名密码html元素。

	<div id="login-box">
		user<input type="text" id="usename"/>
		password<input type="password" id="password"/>
		<input type="button" value="login" id="login" />
	</div>

编写登录按钮调用js函数。

<pre class="hll"><code class="language-javascript">
$('login').on('click', function() {
	//预留空现实
})
</code></pre>


首先获取用户名/密码input框中的输入值。

<pre class="hll"><code class="language-javascript">
var username = $("#usename").val();
var pass = $("#password").val();
</code></pre>

创建一个新的连接。

<pre class="hll"><code class="language-javascript">
var conn = null;
conn = new Easemob.im.Connection();
</code></pre>

初始化连接。

<pre class="hll"><code class="language-javascript">
 conn.init({
     //预留空现实
 });
</code></pre>

在init方法中添加onOpened回调函数，处理登录信息。

<pre class="hll"><code class="language-javascript">
//当连接成功时的回调方法
onOpened : function() {
	alert("成功登录");
	conn.setPresence();
}
</code></pre>

登录完整JS调用代码如下。

<pre class="hll"><code class="language-javascipt">
	$(function() {
		var conn = null;
		conn = new Easemob.im.Connection();
		$('body').on('click', '#login', function() {
			var username = $("#usename").val();
			var pass = $("#password").val();
			conn.open({
				user : username,
				pwd : pass,
				appKey : 'easemob-demo#chatdemoui'
			});
		})
		conn.init({
			onOpened : function() {
				alert("成功登录");
				conn.setPresence();
			}
		})；
	});
</code></pre>

## 发送文本消息 {#sendTextMessage}
创建消息div

	<div id="content">
    	消息内容<textarea id="text"></textarea>
        sendTo <input type="text" id="sendto"/>
        <button id="send">发送</button>
    </div>


编写发送文本消息js函数。

<pre class="hll"><code class="language-javascript">
$("#send").on('click',function(){
	sendText();
	});
var sendText = function() {
	var msg = $('textarea').val();
	var to = $("#sendto").val();
	var options = {
		to : to,
		msg : msg,
		type : "chat"
	};
    //发送文本消息接口
	conn.sendTextMessage(options);
};
</code></pre>

登录成功后发送文本消息完整JS调用代码如下。

<pre class="hll"><code class="language-javascript">
	$(function(){
		var conn = null;
		conn = new Easemob.im.Connection();
		$('body').on('click','#login',function(){
			var username = $("#usename").val();
			var pass = $("#password").val();
			conn.open({
				user : username,
				pwd : pass,
				appKey : 'easemob-demo#chatdemoui'
			});
		})
		conn.init({
			onOpened : function(){
				alert("成功登录");
				conn.setPresence();
			},
			onTextMessage : function(message){
				console.log(message);
				alert("发送消息成功");
			}
		})	
		$("#send").on('click',function(){
			sendText();
		})
		var sendText = function() {
			var msg = $('textarea').val();
			var to = $("#sendto").val();
			var options = {
				to : to,
				msg : msg,
				type : "chat"
			};
			conn.sendTextMessage(options);
		};
	});
</code></pre>

## 获取好友列表 {#getRoster}
在onOpened : function(){};中添加getRoster回调方法
添加获取当前登录人好友列表。

<pre class="hll"><code class="language-javascript">
conn.init({
	onOpened : function(){
		//alert("成功登录");
		//conn.setPresence();
		conn.getRoster({
	       success : function(roster) {
	      		// 获取当前登录人的好友列表
	      		for ( var i in roster) {
		  		  var ros = roster[i]; //好友的对象
		          //ros.name为好友名称
	     		 }
			}
		});
	}
});
</code></pre>

将数组中的好友名称放入对应的html相应元素显示即可。

## 处理文本消息 {#onTextMessage}
登录成功后收到文本消息的处理方法需要在con.init方法中调用onTextMessage回调函数。

<pre class="hll"><code class="language-javascript">
conn.init({
  //收到文本消息时的回调方法
  onTextMessage : function(message){
	//console.log(message);
	//alert("发送消息成功");		
   var from = message.from;//消息的发送者
   var mestype = message.type;//消息发送的类型是群组消息还是个人消息
   var messageContent = message.data;//文本消息体
   if (mestype == 'groupchat') {
		//进行群组消息页面处理	
	} else {
		//进行个人消息页面处理	
	}
 }
});
</code></pre>

##添加好友 {#subscribe}
* 邀请发起方   
添加发起方，获取要添加好友名称，例如addfridentId为要添加的好友的id。

<pre class="hll"><code class="language-javascript">
//addfridentId为页面上要添加好友的输入框html元素id值。
var user = $('#addfridentId').val();
</code></pre>

添加好友按钮点击时调用startAddFriend函数。

<pre class="hll"><code class="language-javascript">
var startAddFriend = function() {
  var user = $('#addfridentId').val();
  //发送添加好友请求
  conn.subscribe({
	to : user,
	message : "加个好友呗"
  });
}
</code></pre>

* 邀请接受方   
被添加方，在con.init方法中调用handlePresence回调方法

<pre class="hll"><code class="language-javascript">
conn.init({
	//收到联系人订阅请求的回调方法
	onPresence : function(message) {
		handlePresence(message);
	}
});


//easemobwebim-sdk中收到联系人订阅请求的处理方法，具体的type值所对应的值请参考xmpp协议规范
var handlePresence = function(e) {
//（发送者希望订阅接收者的出席信息）
	if (e.type == 'subscribe') {
		//同意添加好友操作的实现方法
		conn.subscribed({
			to : user,
		    message : "[resp:true]"
		});
		
		//拒绝添加好友的方法处理
		//conn.unsubscribed({
			//to : user,
			//message : "rejectAddFriend"
		//});
	}
};

</code></pre>


## 删除好友 {#removeRoster}
删除好友，首先获取好友名称,调用removeRoster方法。例如删除按钮触发时调用delFriend函数。

<pre class="hll"><code class="language-javascript">
var delFriend = function() {
	var user = $('#delfridentId').val();//获取要删除好友的名称
	conn.removeRoster({
		to : user,
		success : function() {
	 	 conn.unsubscribed({
			to : user
	     });
		},
		error : function() {
	   		//删除操作失败
		}
    });
}
<code></pre>

## 关闭连接 {#onClosed}
当用户退出登录时需要调用con.onClosed回调函数。

<pre class="hll"><code class="language-javascript">
conn.init({
	//当连接关闭时的回调方法
	onClosed : function() {
		conn.clear();
		conn.onClosed();
	}
});
<code></pre>

## 常见问题列表 {#faq}
1.WEB-IM-SDK调用无效   
请检查easemob.im-1.0.3.js等相关文件引入的路径是否正确。

2.是否支持token登录，是否支持https。   
支持。详情请查看easemob.im-1.0.3.js和index.html相关内容。

3.是否支持重连。
暂不支持，可以使用token来实现重连。

4.为什么登录后收不到消息。
登录之后需要设置在线状态，才能收到消息。请检查登录成功后是否调用过 conn.setPresence();

5.调试时经常报连接中断。   
如果使用alter方式调试长时间没有进行操作时，连接超时后服务器会自动断开连接。同样断点等待时间过长时服务器也会断开连接。

6.WEB－IM目前支持的浏览器类型及版本。  

<pre class="hll"><code class="language-javascript">
<table>
<tr><td>Browser\Func</td><td>Text Message</td><td>Emotion Message</td><td>Picture Message</td><td>Audio Message</td><td>Add Friend</td><td>Delete Friend</td></tr>
<tr><td>IE8</td><td>○</td><td>○</td><td>○</td><td>○</td><td>○</td><td>○</td></tr>
<tr><td>IE9</td><td>○</td><td>○</td><td>○</td><td>○</td><td>○</td><td>○</td></tr>
<tr><td>IE10</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
<tr><td>IE11</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
<tr><td>FireFox10+</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
<tr><td>Chrome15+</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
<tr><td>Safari5X</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
<tr><td>Safari6X</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
<tr><td>Safari7X</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
<tr><td>Safari8X</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
</table>
<code></pre>

5.目前支持的Picture Message格式有那些。   
已知Picture Message格式支持：png、jpg、bmp。

6.目前支持的Audio Message格式有那些。   
已知Audio Message格式支持：MP3、amr。 









