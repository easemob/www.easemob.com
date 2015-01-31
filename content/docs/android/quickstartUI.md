---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

# 环信demo源代码git地址 #

环信提供了一系列demo以帮助开发者更好的学习了解环信SDK。所有demo均已在github上开源供开发者下载使用。你可以clone这些项目来学习了解环信SDK，也可以在这些demo基础上快速创建你自己的真正项目。环信SDK（Android版）在github的下载地址是：

[https://github.com/easemob/sdkexamples-android](https://github.com/easemob/sdkexamples-android)


# Bug报告跟踪 #

请使用以下地址来报告跟踪bug：

[https://github.com/easemob/sdkexamples-android/issues](https://github.com/easemob/sdkexamples-android/issues)



# 快速入门（五分钟运行环信demo) 

## 下载环信demo (Android) 

###  环信UI demo

UI demo，包含了一个接近微信的完整的聊天app的所有功能, 包括发文字，表情，图片，语音，文件，视频，位置，群聊，登录，注册，退出登录等。

环信UI demo源代码已在github上开源供开发者下载，以帮助开发者更好的学习了解环信SDK。

### 下载环信sdk及demo 
    
下载环信sdk及demo：[下载链接](http://www.easemob.com/sdk/)

 解压缩easemob-sdk-2.1.5.zip后会得到以下目录结构：
 
 ![alt text](/demo_dirs1.jpg "Title")


## 运行环信demo (Android) 

在手机上安装chatdemo-ui.apk (apk位于androidsdk/examples/ChatDemoUI目录下)，安装成功后，运行此app，注册账号(用户名不能有大写字母)，并登陆。

![alt text](/register1.png "demo") 

![alt text](/login1.png "demo")


登陆之后，进入通讯录点击右上角的加号，添加好友成功后，就可以互发消息了。

 ![alt text](/contact_add.png "demo") ![alt text](/chat.png "demo")
	

## 从源代码级别深入了解环信demo (Android)

 
### 在Eclipse/IDEA中导入环信demo project 


Eclipse IDE： 打开菜单“ File - import“，选择”Existing Android Code Into Workspace”， 选择解压后的"androidsdk/examples"目录下的ChatDemoUI路径,点击“Finish”。

![alt text](/guide1.png "demo")


### 深入理解环信demo背后的代码

#### 初始化

见HXSDKHelper

<pre class="hll"><code class="language-java">
 public synchronized boolean onInit(Context context) {

       appContext = this;
       int pid = android.os.Process.myPid();
        String processAppName = getAppName(pid);
        // 如果app启用了远程的service，此application:onCreate会被调用2次
        // 为了防止环信SDK被初始化2次，加此判断会保证SDK被初始化1次
        // 默认的app会在以包名为默认的process name下运行，如果查到的process name不是app的process name就立即返回
        
        if (processAppName == null ||!processAppName.equalsIgnoreCase("com.easemob.chatuidemo")) {
            Log.e(TAG, "enter the service process!");
            //"com.easemob.chatuidemo"为demo的包名，换到自己项目中要改成自己包名
            
            // 则此application::onCreate 是被service 调用的，直接返回
            return false;
        }
       //初始化环信SDK
       Log.d("DemoApplication", "Initialize EMChat SDK");
       EMChat.getInstance().init(appContext);

       //获取到EMChatOptions对象
       EMChatOptions options = EMChatManager.getInstance().getChatOptions();
       //默认添加好友时，是不需要验证的，改成需要验证
       options.setAcceptInvitationAlways(false);
       //设置收到消息是否有新消息通知，默认为true
       options.setNotificationEnable(false);
       //设置收到消息是否有声音提示，默认为true
       options.setNoticeBySound(false);
       //设置收到消息是否震动 默认为true
       options.setNoticedByVibrate(false);
       //设置语音消息播放是否设置为扬声器播放 默认为true
       options.setUseSpeaker(false);
    }
    
    private String getAppName(int pID) {
		String processName = null;
		ActivityManager am = (ActivityManager) this
				.getSystemService(ACTIVITY_SERVICE);
		List l = am.getRunningAppProcesses();
		Iterator i = l.iterator();
		PackageManager pm = this.getPackageManager();
		while (i.hasNext()) {
			ActivityManager.RunningAppProcessInfo info = (ActivityManager.RunningAppProcessInfo) (i
					.next());
			try {
				if (info.pid == pID) {
					CharSequence c = pm.getApplicationLabel(pm
							.getApplicationInfo(info.processName,PackageManager.GET_META_DATA));
					processName = info.processName;
					return processName;
				}
			} catch (Exception e) {
			}
		}
		return processName;
}
</code></pre>

#### 注册

见RegisterActivity，注意用户名会自动转为小写字母(强烈建议开发者通过后台调用rest接口去注册环信id，客户端注册方法不提倡使用)
	
<pre class="hll"><code class="language-java">
new Thread(new Runnable() {
    public void run() {
      try {
         // 调用sdk注册方法
         EMChatManager.getInstance().createAccountOnServer(username, pwd);
      } catch (final Exception e) {
      }
   }
}).start();
</code></pre>

#### 登陆

见LoginActivity（必须在客户端调登陆方法）

<pre class="hll"><code class="language-java">
//调用sdk登陆方法登陆聊天服务器
EMChatManager.getInstance().login(username, password, new EMCallBack() {
			
    @Override
    public void onSuccess() {
    // TODO Auto-generated method stub
    }
	
    @Override
    public void onProgress(int progress, String status) {
    // TODO Auto-generated method stub
    }
		
    @Override
    public void onError(int code, String message) {
    // TODO Auto-generated method stub
    }
});
</code></pre>

####  注册listener

接收聊天消息,回执消息，透传消息，好友同意，好友请求等监听变化：见MainActivity.java

注册一个接收消息的BroadcastReceiver

<pre class="hll"><code class="language-java">
msgReceiver = new NewMessageBroadcastReceiver();
IntentFilter intentFilter = new IntentFilter(EMChatManager.getInstance().getNewMessageBroadcastAction());
intentFilter.setPriority(3);
registerReceiver(msgReceiver, intentFilter);
</code></pre>

注册一个ack回执消息的BroadcastReceiver

<pre class="hll"><code class="language-java">
IntentFilter ackMessageIntentFilter = new IntentFilter(EMChatManager.getInstance().getAckMessageBroadcastAction());
ackMessageIntentFilter.setPriority(3);
registerReceiver(ackMessageReceiver, ackMessageIntentFilter);
</code></pre>


注册一个透传消息的BroadcastReceiver（透传消息不会存入db，可以理解为一条不存db的，不显示在ui的普通消息，或者理解成就是发送的一条指令）

<pre class="hll"><code class="language-java">
IntentFilter cmdMessageIntentFilter = new IntentFilter(EMChatManager.getInstance().getCmdMessageBroadcastAction());
cmdMessageIntentFilter.setPriority(3);
registerReceiver(cmdMessageReceiver, cmdMessageIntentFilter);
</code></pre>
		
注册一个好友请求同意好友请求等的BroadcastReceiver

<pre class="hll"><code class="language-java">
IntentFilter inviteIntentFilter = new IntentFilter(EMChatManager.getInstance().getContactInviteEventBroadcastAction());
registerReceiver(contactInviteReceiver, inviteIntentFilter);
</code></pre>
		
监听联系人的变化等

<pre class="hll"><code class="language-java">
EMContactManager.getInstance().setContactListener(new MyContactListener());
</code></pre>

注册一个监听连接状态的listener

<pre class="hll"><code class="language-java">
EMChatManager.getInstance().addConnectionListener(new MyConnectionListener());
</code></pre>


#### 发送聊天消息并显示

<pre class="hll"><code class="language-java">
//创建一个消息(本条信息是一条文本，可以通过EMMessage.Type选择其他类型)
EMMessage msg = EMMessage.createSendMessage(EMMessage.Type.TXT);
//设置消息的接收方
msg.setReceipt(username);
//设置消息内容。本消息类型为文本消息。
TextMessageBody body = new TextMessageBody(tvMsg.getText().toString());
msg.addBody(body);
try {
   //发送消息
   EMChatManager.getInstance().sendMessage(msg,callback);
} catch (Exception e) {
   e.printStackTrace();
}
</code></pre>

#### 接收聊天消息并显示

<pre class="hll"><code class="language-java">
private class NewMessageBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        //消息id
        String msgId = intent.getStringExtra("msgid");
        ......
        ......
        ......

        //注销广播，否则在ChatActivity中会收到这个广播
        abortBroadcast();
    }
}
</code></pre>

#### 消息回执BroadcastReceiver：见MainActivity.java #### 

<pre class="hll"><code class="language-java">
private BroadcastReceiver ackMessageReceiver = new BroadcastReceiver() {
	
    @Override
    public void onReceive(Context context, Intent intent) {
        //消息id
        String msgId = intent.getStringExtra("msgid");
        ......
        ......
        ......
        abortBroadcast();
	}
};
</code></pre>


#### 透传消息BroadcastReceiver：见MainActivity.java #### 

<pre class="hll"><code class="language-java">
private BroadcastReceiver cmdMessageReceiver = new BroadcastReceiver() {
	
    @Override
    public void onReceive(Context context, Intent intent) {
        //消息id
        String msgId = intent.getStringExtra("msgid");
        ......
        ......
        ......
        abortBroadcast();
	}
};
</code></pre>

#### 联系人变化listener：见MainActivity.java #### 
 
<pre class="hll"><code class="language-java">
private class MyContactListener implements EMContactListener{
     @Override
     public void onContactAdded(List&lt;String&gt; usernameList) {
     }
     @Override
     public void onContactDeleted(List&lt;String&gt; usernameList) {
     }
}
</code></pre>


#### 监听连接状态和账号多处登录被迫下线：见MainActivity.java ####
 
<pre class="hll"><code class="language-java">
    private class MyConnectionListener implements EMConnectionListener {
        @Override
		public void onConnected() {
		}
		@Override
		public void onDisconnected(final int error) {
			runOnUiThread(new Runnable() {

				@Override
				public void run() {
					if(error == EMError.USER_REMOVED){
						// 显示帐号已经被移除
					}else if (error == EMError.CONNECTION_CONFLICT) {
						// 显示帐号在其他设备登陆
					} else {
		                 //"连接不到聊天服务器"
					}
				}
			});
		}
    }
</code></pre>

#### 退出登陆: ####

<pre class="hll"><code class="language-java">
EMChatManager.getInstance().logout();//此方法为同步方法
或者
EMChatManager.getInstance().logout(new EMCallBack(){})//此方法为异步方法<br/>
//后文中，如遇到new EMCallBack()即为new EMCallBack(){}

	
</code></pre>


