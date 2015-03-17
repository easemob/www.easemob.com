---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# 接口说明

sdk文件夹中有三个子文件夹:include、lib、resources，请不要擅自修改这些文件夹的任何东西，下面依次介绍这三个子文件夹。

* **lib** 静态库，包含连个静态库libEaseMobClientSDK.a和libEaseMobClientSDKLite.a。libEaseMobClientSDKLite.a不包含实时语音功能，libEaseMobClientSDK.a包含所有功能。如果你的app中不需要实时语音功能，删掉libEaseMobClientSDK.a只使用libEaseMobClientSDKLite.a即可。
* **resources** sdk的bundle，包含旧版sdk的数据库、消息提示音，sdk配置文件。其中sdk配置文件已加密，旧版sdk数据库几乎没什么实质作用。
* **include** 包含sdk的头文件。

主要介绍下**include**，所有的接口都在这个文件夹中。

## include目录讲解 {#explainInclude}

* **EaseMobClientSDK/EaseMobClientSDKLite** 包含在项目中要引用的总头文件，即在代码中只需#import"EMSDKFull.h"或#import"EaseMob.h"即可调用所有对应的api。
* **CallService** 包含实时语音相关的接口
* **ChatService** 包含聊天相关的接口，比如注册、登录、退出、单聊、群聊、群组等
* **Utility** 包含DeviceManager和ErrorManager。DeviceManager硬件相关接口，ErrorManager错误码定义

> 注：
> 
>1. include包含5个子文件夹：CallService、ChatService、EaseMobClientSDK、EaseMobClientSDKLite、Utility。如果无需实时语音功能，将CallService和EaseMobClientSDK删掉即可。
>
>2. 类似EM@Manager命名格式的文件夹的内部结构都是相似的。delegates文件夹包含各种代理接口，internal文件夹包含各种协议的声明，types文件夹包含各种实例的声明。

## EMChatManager

登录、聊天、保存会话、加解密、多媒体支持等协议的集合。可以通过EaseMob类获得此接口的实例, 示例代码如下:

<pre class="hll"><code class="language-java">

[[EaseMob sharedInstance] chatManager]

</code></pre>

## EMDeviceManager

硬件相关的接口。可以通过EaseMob类获得此接口的实例, 示例代码如下:

<pre class="hll"><code class="language-java">

[[EaseMob sharedInstance] deviceManager]

</code></pre>

## EMPushManager

离线推送相关接口的集合。可以通过调用EaseMob类获得此接口的实例，示例代码如下：

<pre class="hll"><code class="language-java">

[EaseMob sharedInstance] pushManager]

</code></pre>

## EMCallManager

实时语音的集合。可以通过调用EMSDKFull类获得此接口的实例，示例代码如下：

<pre class="hll"><code class="language-java">

[EMSDKFull sharedInstance] callManager]

</code></pre>

## ErrorManager

Error定义。对应的类为EMError.
