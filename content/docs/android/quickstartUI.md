---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

# 快速入门（五分钟运行环信demo) 

## 下载环信demo (Android) 

###  环信UI demo

UI demo，包含了一个接近微信的完整的聊天app的所有功能, 包括发文字，表情，图片，语音，位置，群聊，登录，注册，退出登录等。

环信UI demo源代码已在github上开源供开发者下载，以帮助开发者更好的学习了解环信SDK。

### 下载环信sdk及demo 
    
下载环信sdk及demo：[下载链接](http://www.easemob.com/sdk/)

 解压缩easemob-sdk-2.0.0.zip后会得到以下目录结构：
 
 ![alt text](/demo_dirs1.jpg "Title")


## 运行环信demo (Android) 

在手机上安装chatdemo-ui.apk (apk位于androidsdk/examples/ChatDemoUI目录下)，安装成功后，运行此app，注册账号(用户名不能有大写字母)，并登陆。

![alt text](/register1.png "demo") 

![alt text](/login1.png "demo")


登陆之后，进入通讯录点击右上角的加号，添加好友成功后，就可以互发消息了。

 ![alt text](/contact_add.png "demo") ![alt text](/chat.png "demo")
	

## 从源代码级别深入了解环信demo (Android)

 
### 在Eclipse/IDEA中创建环信demo project 


Eclipse IDE： 打开菜单“ File - New - Project“，选择”Android Project from Existing Code”， 选择解压后的"androidsdk/examples"目录下的chatdemo-nonui路径,点击“Finish”。

![alt text](/guide1.png "demo")


### 深入理解环信demo背后的代码

#### 初始化

见DemoApplication

<pre class="hll"><code class="language-java">
public class DemoApplication extends Application {

    public static Context appContext;
    @Override
    public void onCreate() { 
       super.onCreate();
       appContext = this;
 
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
}
</code></pre>

#### 注册

见RegisterActivity，注意用户名不能有大写字母
	
<pre class="hll"><code class="language-java">
final String appkey = EMChatConfig.getInstance().APPKEY;
new Thread(new Runnable() {
    public void run() {
      try {
          //调用sdk注册方法
          EMChatManager.getInstance().createAccountOnServer(appkey + "_" + username, pwd);
        	
      } catch (final Exception e) {
      }
   }
}).start();
</code></pre>

#### 登陆

见LoginActivity

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

接收聊天消息,回执消息，好友同意，好友请求等监听变化：见MainActivity.java

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
   EMChatManager.getInstance().sendMessage(msg);
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
private class MyConnectionListener implements ConnectionListener{
    @Override
    public void onConnected() {
    }
    @Override
    public void onDisConnected(String errorString) {
      if(errorString!=null&&errorString.contains("conflict"))
      {
        //收到帐号在其他手机登录
        // TODO 
      }else{
        //"连接不到聊天服务器"
      }
    }
    @Override
    public void onReConnected() {
    }
    @Override
    public void onReConnecting() {
    }
    @Override
    public void onConnecting(String progress) {
    }
}
</code></pre>

#### 退出登陆:见MainActivity.java ####

<pre class="hll"><code class="language-java">
@Override
protected void onPause() {
    super.onPause();
    //登出聊天服务器
    EMChatManager.getInstance().logout();
}
</code></pre>

# 环信demo源代码git地址 #

环信提供了一系列demo以帮助开发者更好的学习了解环信SDK。所有demo均已在github上开源供开发者下载使用。你可以clone这些项目来学习了解环信SDK，也可以在这些demo基础上快速创建你自己的真正项目。环信SDK（Android版）在github的下载地址是：

[https://github.com/easemob/sdkexamples-android](https://github.com/easemob/sdkexamples-android)


# Bug报告跟踪 #

请使用以下地址来报告跟踪bug：

[https://github.com/easemob/sdkexamples-android/issues](https://github.com/easemob/sdkexamples-android/issues)


