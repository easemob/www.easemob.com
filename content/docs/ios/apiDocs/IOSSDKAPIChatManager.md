---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# EMChatManager

## chat manager {#manager}

* IChatManager.h: 登录、聊天、保存会话、加解密、多媒体支持等接口协议的集合。不同模块提供了不同的接口，不同模块的接口在[internal](http://www.easemob.com/docs/ios/apiDocs/IOSSDKAPIChatManager/#internal)中有详细介绍.

## delagates {#delegates}

* [EMChatManagerDelegate.h](http://www.easemob.com/apidoc/ios/chat/EMChatManagerDelegate_h/index.html): ChatManager的所有delegate的集合，不同模块有不同的回调接口类；

* [EMChatManagerBuddyDelegate.h](http://www.easemob.com/apidoc/ios/chat/EMChatManagerBuddyDelegate_h/index.html): 好友相关的回调类；

* [EMChatManagerChatDelegate.h](http://www.easemob.com/apidoc/ios/chat/EMChatManagerChatDelegate_h/index.html): 发送和接受消息相关的回调类；

* [EMChatManagerEncryptionDelegate.h](http://www.easemob.com/apidoc/ios/chat/EMChatManagerEncryptionDelegate_h/index.html): 加密相关的回调类；

* [EMChatManagerGroupDelegate.h](http://www.easemob.com/apidoc/ios/chat/EMChatManagerGroupDelegate_h/index.html): 群组管理相关的回调类；

* [EMChatManagerLoginDelegate.h](http://www.easemob.com/apidoc/ios/chat/EMChatManagerLoginDelegate_h/index.html): 登录、退出、注册相关的回调类；

* [EMChatManagerMediaDelegate.h](http://www.easemob.com/apidoc/ios/chat/EMChatManagerMediaDelegate_h/index.html): 多媒体相关的回调类；

* [EMChatManagerPushNotificationDelegate.h](http://www.easemob.com/apidoc/ios/chat/EMChatManagerPushNotificationDelegate_h/index.html): 离线推送相关的回调类；

* [EMChatManagerUtilDelegate.h](http://www.easemob.com/apidoc/ios/chat/EMChatManagerUtilDelegate_h/index.html): 管理消息中中附件相关的回调类。

## internal {#internal}

* [IChatManagerBuddy.h](http://www.easemob.com/apidoc/ios/chat/IChatManagerBuddy_h/index.html): 好友相关的接口类；

* [IChatManagerChat.h](http://www.easemob.com/apidoc/ios/chat/IChatManagerChat_h/index.html): 发送和接受消息相关的接口类；

* [IChatManagerConversation.h](http://www.easemob.com/apidoc/ios/chat/IChatManagerConversation_h/index.html): 会话相关的接口类；

* [IChatManagerEncryption.h](http://www.easemob.com/apidoc/ios/chat/IChatManagerEncryption_h/index.html): 加密相关的接口类；

* [IChatManagerGroup.h](http://www.easemob.com/apidoc/ios/chat/IChatManagerGroup_h/index.html): 群组管理相关的接口类；

* [IChatManagerLogin.h](http://www.easemob.com/apidoc/ios/chat/IChatManagerLogin_h/index.html): 登录、退出、注册相关的接口类

* [IChatManagerMedia.h](http://www.easemob.com/apidoc/ios/chat/IChatManagerMedia_h/index.html): 多媒体相关的接口类；

* [IChatManagerPushNotification.h](http://www.easemob.com/apidoc/ios/chat/IChatManagerPushNotification_h/index.html): 离线推送相关的接口类；

* [IChatManagerSettingOptions.h](http://www.easemob.com/apidoc/ios/chat/IChatManagerSettingOptions_h/index.html): 配置属性相关的接口类；

* [IChatManagerUtil.h](http://www.easemob.com/apidoc/ios/chat/IChatManagerUtil_h/index.html): 管理消息中附件相关的接口类。

## type {#type}

### 好友

* [EMBuddy.h](http://www.easemob.com/apidoc/ios/chat/EMBuddy_h/index.html): 好友实例对应的类；

### 会话

* [EMConversation.h](http://www.easemob.com/apidoc/ios/chat/EMConversation_h/index.html): 会话实例对应的类；

### 群组

* [EMGroup.h](http://www.easemob.com/apidoc/ios/chat/EMGroup_h/index.html): 群组实例对应的类；

* [EMGroupStyleSetting.h](http://www.easemob.com/apidoc/ios/chat/EMGroupStyleSetting_h/index.html): 群组属性设置对应的类；

### 回执

* [EMReceopt.h](http://www.easemob.com/apidoc/ios/chat/EMReceopt_h/index.html): 回执实例对应的类；

### 消息

* [EMMessage.h](http://www.easemob.com/apidoc/ios/chat/EMMessage_h/index.html): 消息实例对应的类；

* [EMCommandMessageBody.h](http://www.easemob.com/apidoc/ios/chat/EMCommandMessageBody_h/index.html): 透传类型消息体对应的类；

* [EMFileMessageBody.h](http://www.easemob.com/apidoc/ios/chat/EMFileMessageBody_h/index.html): 文件类型消息体对应的类；

* [EMImageMessageBody.h](http://www.easemob.com/apidoc/ios/chat/EMImageMessageBody_h/index.html): 图片类型消息体对应的类；

* [EMLocationMessageBody.h](http://www.easemob.com/apidoc/ios/chat/EMLocationMessageBody_h/index.html): 位置类型消息体对应的类；

* [EMTextMessageBody.h](http://www.easemob.com/apidoc/ios/chat/EMTextMessageBody_h/index.html): 文字类型消息体对应的类；

* [EMVideoMessageBody.h](http://www.easemob.com/apidoc/ios/chat/EMVideoMessageBody_h/index.html): 视频类型消息体对应的类；

* [EMVoiceMessageBody.h](http://www.easemob.com/apidoc/ios/chat/EMVoiceMessageBody_h/index.html): 语音类型消息体对应的类；

* [EMChatCommand.h](http://www.easemob.com/apidoc/ios/chat/EMChatCommand_h/index.html): 透传对象对应的类；

* [EMChatFile.h](http://www.easemob.com/apidoc/ios/chat/EMChatFile_h/index.html): 文件对象对应的类；

* [EMChatImage.h](http://www.easemob.com/apidoc/ios/chat/EMChatImage_h/index.html): 图片对象对应的类；

* [EMChatLocation.h](http://www.easemob.com/apidoc/ios/chat/EMChatLocation_h/index.html): 位置对象对应的类；

* [EMChatText.h](http://www.easemob.com/apidoc/ios/chat/EMChatText_h/index.html): 文字对象对应的类；

* [EMChatVideo.h](http://www.easemob.com/apidoc/ios/chat/EMChatVideo_h/index.html): 视频对象对应的类；

* [EMChatVoice.h](http://www.easemob.com/apidoc/ios/chat/EMChatVoice_h/index.html): 语音对象对应的类；

### 协议

* [IChatImageOptions.h](http://www.easemob.com/apidoc/ios/chat/IChatImageOptions_h/index.html): 发送图片消息时的压缩设置协议；

* [IEMChatCryptor.h](http://www.easemob.com/apidoc/ios/chat/IEMChatCryptor_h/index.html): 对聊天提供基础的加密, 解密服务协议；

* [IEMChatObject.h](http://www.easemob.com/apidoc/ios/chat/IEMChatObject_h/index.html): 聊天对象基类对象协议；

* [IEMChatProgressDelegate.h](http://www.easemob.com/apidoc/ios/chat/IEMChatProgressDelegate_h/index.html): 聊天消息发送接收进度协议；

* [IEMFileMessageBody.h](http://www.easemob.com/apidoc/ios/chat/IEMFileMessageBody_h/index.html): 文件类型的消息体接口协议；

* [IEMChatFile.h](http://www.easemob.com/apidoc/ios/chat/IEMChatFile_h/index.html): 文件类型的聊天对象协议；

* [IEMMessageBody.h](http://www.easemob.com/apidoc/ios/chat/IEMMessageBody_h/index.html): 聊天的消息体基类对象协议；