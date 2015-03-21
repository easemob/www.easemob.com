---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

## 集成环信配置指导(Android)

###下载SDK {#downloadSdk}

到[环信官网](http://www.easemob.com/sdk/)下载环信SDK.

<b><font size="5em" color="2bbbbb">注：考虑到开发者需求不一样，在下载的SDK中，提供了两个不同的jar包：</br>

1.一个是libs下带实时语音功能和实时视频功能的jar包和三个.so文件（jar包大小约为1.34M,三个.so文件文件约为4.76M）</br>

2.如果你不需要实时语音功能，实时视频功能，那就直接用libs.without.audio文件夹下的jar包（jar包大小约为900多K）</br>

</font></b>

到此您已经下载好了SDK，下面开始学习SDK的集成使用吧！


###SDK目录讲解 {#explainSdk}

从官网上下载下来的包，解压后内容如下：

 ![alt text](/demo_dirs_new1.jpg "demo") 

在这里主要介绍后面四个文件夹内容：

doc文件夹：SDK相关API文档

examples文件夹：ChatDemoUI(为开发者能够更深入理解SDK而提供的一个demo)

libs文件夹：拥有实时语音，实时视频功能的SDK（大小在1.34M左右）包和.so文件

libs.without.audio文件夹：无实时语音，实时视频功能的SDK包（大小在900多K）


### 配置工程	{#projectSetting}

####1.导入SDK

在自行开发的应用中，集成环信聊天需要把libs文件夹下的`easemobchat_2.1.6.jar`和`armeabi目录`导入到你的项目的libs文件夹底下，如果不需要语音和视频通话功能，导入`libs.without.audio`下的jar文件即可。jar名字的后面的2.1.6可能会跟你下载的不一致，这是版本号，以实际为准。如果集成过2.0.4之前sdk的开发者，集成此sdk时，需要把httpmime这个jar从libs底下移除。

<b><font color="#b22222" size="4">注：SDK版本是向下兼容的</font></b>

 ![alt text](/demo_dirs_new1.jpg "demo") 

 ![alt text](/project_libs1.jpg "demo")
 
<b><font color="#b22222" size="4">以上为2.1.5之前的jar包和.so文件</font></b>
 
 ![alt text](/project_libs2.png "demo")

<b><font color="#b22222" size="4">以上为2.1.5之后的jar包和.so文件（里面包含了语音和视频通话功能）</font></b>

#### 2.配置信息

在清单文件AndroidManifest.xml里加入以下权限，以及写上你注册的appkey

权限配置：

    <?xml version="1.0" encoding="utf-8"?>
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="Your Package"
        android:versionCode="100"
        android:versionName="1.0.0">
  
		<!-- Required -->
        <uses-permission android:name="android.permission.VIBRATE" />
        <uses-permission android:name="android.permission.INTERNET" />
        <uses-permission android:name="android.permission.RECORD_AUDIO" />
        <uses-permission android:name="android.permission.CAMERA" />
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
        <uses-permission android:name="android.permission.ACCESS_MOCK_LOCATION" />
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
        <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>  
        <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
        <uses-permission android:name="android.permission.GET_TASKS" />
        <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
        <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
        <uses-permission android:name="android.permission.WAKE_LOCK" />
        <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
        <uses-permission android:name="android.permission.READ_PHONE_STATE" />
     
    	应用包名及appkey替换：
     	<application
	        android:icon="@drawable/ic_launcher"
	        android:label="@string/app_name"
	        android:name="Your Application">
      
       		<!-- 设置环信应用的appkey -->
        	<meta-data android:name="EASEMOB_APPKEY"  android:value="Your AppKey" />
        	<!-- 声明sdk所需的service SDK核心功能-->
        	<service android:name="com.easemob.chat.EMChatService" />
     	</application>
    </manifest>

关于EASEMOB_APPKEY对应的value获取，在[创建应用](http://www.easemob.com/docs/gettingstart/#section-1/#createApp)后，申请APPKEY并进行相关配置。（环信demo中 APPKEY为*easemob-demo#chatdemoui*）

### app打包混淆 {#packageConfuse}

在proguard文件中加入以下keep

<pre class="hll"><code class="language-java">
-keep class com.easemob.** {*;}
-keep class org.jivesoftware.** {*;}
-keep class org.apache.** {*;}
-dontwarn  com.easemob.**
#2.0.9后的不需要加下面这个keep
#-keep class org.xbill.DNS.** {*;}
#另外，demo中发送表情的时候使用到反射，需要keep SmileUtils,注意前面的包名，
#不要SmileUtils复制到自己的项目下keep的时候还是写的demo里的包名
-keep class com.easemob.chatuidemo.utils.SmileUtils {*;}

#2.0.9后加入语音通话功能，如需使用此功能的api，加入以下keep
-dontwarn ch.imvs.**
-dontwarn org.slf4j.**
-keep class org.ice4j.** {*;}
-keep class net.java.sip.** {*;}
-keep class org.webrtc.voiceengine.** {*;}
-keep class org.bitlet.** {*;}
-keep class org.slf4j.** {*;}
-keep class ch.imvs.** {*;}

</code></pre>
	