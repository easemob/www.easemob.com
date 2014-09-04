---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

# 自主开发集成聊天配置指导(Android)

### 添加环信的类库

在自行开发的应用中，集成环信聊天需要把libs文件夹下的`easemobchat_2.0.4.jar`拷贝到你的项目的libs文件夹底下，jar名字的后面的2.0.4可能会跟你下载的不一致，这是版本号，以实际为准。如果集成过2.0.4之前sdk的开发者，集成此sdk时，需要把httpmime这个jar从libs底下移除。


![alt text](/demo_dirs_new.jpg "demo") 

 ![alt text](/project_libs.jpg "demo")

### 添加环信的配置信息

在清单文件AndroidManifest.xml里加入以下权限，以及写上你注册的appkey

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
    
    <!-- 设置环信SDK的appkey，注意name为EASEMOB_APPKEY -->
    <meta-data android:name="EASEMOB_APPKEY"  android:value="你申请的appkey" />
    <!-- 声明sdk所需的service -->
    <service android:name="com.easemob.chat.EMChatService" />

关于EASEMOB_APPKEY，请登录或注册[环信开发者后台](https://console.easemob.com),申请APPKEY后，进行相关配置。（测试demo中 APPKEY为*easemob-demo#chatdemo*）

### app打包混淆

在proguard文件中加入以下keep

<pre class="hll"><code class="language-java">
-keep class com.easemob.** {*;}
-keep class org.jivesoftware.** {*;}
-keep class org.apache.** {*;}
-keep class org.xbill.DNS.** {*;}
#另外，demo中发送表情的时候使用到反射，需要keep SmileUtils,注意前面的包名，
#不要SmileUtils复制到自己的项目下，keep的时候还是写的demo里的包名
-keep class com.easemob.chatuidemo.utils.SmileUtils {*;}
</code></pre>
	