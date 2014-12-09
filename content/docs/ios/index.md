---
title: iOS 开发指南
sidebar: iossidebar
secondnavios: true
---

# EaseMob集成示例操作流程

## 有聊天页面的Demo

### Demo说明

#### 提供测试的AppKey(easemob-demo#chatdemoui)

#### 需要至少2个账号，互加好友，互发消息

### Demo演示流程

#### 下载环信Demo及SDK

请到[这里下载](http://www.easemob.com/sdk/)环信Demo及SDK

**username：环信IM用户唯一标识符**

**SDK的username不能是中文,且不区分大小写（[用户名规则](http://www.easemob.com/docs/rest/userapi/#eid)）**

**只要知道对方username，不需要互为好友即可聊天**

**SDK支持arm64位**

**SDK需要使用xcode6以上编译**

**因为iOS静态库问题，SDK较大，但不影响打包ipa后大小，打包ipa后仅增加2MB左右**

  ![alt text](/example_layout_IOS.png "Demo")
  
#### 运行程序

  [环信用户名规则](http://www.easemob.com/docs/rest/userapi/#eid)

 ![alt text](/chatUIDemoLogin.png "Demo")
 
#### 登录成功进入首页

会话：聊天的会话列表

通讯录：申请通知，群组，好友列表

设置：退出登录

 ![alt text](/chatUIDemoHome.png "Demo")
 
#### 添加好友

运行程序并登录账号2。点击“通讯录”页面的“+”

 ![alt text](/chatUIDemoOther.png "Demo")
 
输入好友用户名（账号1），进行搜索添加

**搜索应该是搜索您的用户，而不是搜索环信的用户，演示Demo中搜索任何信息都可以搜到**

**环信不验证好友关系，只要知道对方环信用户名就可以发消息**
 
 ![alt text](/chatUIDemoAddFriend.png "Demo")
 
在账号1接收账号2的好友申请
 
 ![alt text](/chatUIDemoApplyList.png "Demo")
 
#### 账号1和账号2互发消息

 ![alt text](/chatUIDemoChatList.png "Demo") 
 
### 其他说明
#### 监测网络状态

在MainViewController类中有体现，监测以下方法

<pre class="hll"><code class="language-objective_c">
	#pragma mark - IChatManagerDelegate 登录状态变化

	- (void)didConnectionStateChanged:(EMConnectionState)connectionState
	{
    	
	}
</code></pre>
	
![alt text](/chatUIDemoNetwork.png "Demo") 

#### 账号在其它设备登录

账号在其它设备登录时, 当前设备会自动断开连接(收到该回调时, 当前客户端已不能收发消息了, 当前客户端必须处理该回调, 退出到登录页面, )

<pre class="hll"><code class="language-objective_c">
	- (void)didLoginFromOtherDevice
	{
	    //退出到登录页面代码
	}
</code></pre>
