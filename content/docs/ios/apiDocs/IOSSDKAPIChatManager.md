---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# EMChatManager

## chat manager {#manager}

* IChatManager.h: 登录、聊天、保存会话、加解密、多媒体支持等接口协议的集合。不同模块提供了不同的接口，不同模块的接口在[internal](http://www.easemob.com/docs/ios/apiDocs/IOSSDKAPIChatManager/#internal)中有详细介绍.

## delagates {#delegates}

* [EMChatManagerDelegate.h](): ChatManager的所有delegate的集合，不同模块有不同的回调接口类；

* [EMChatManagerBuddyDelegate.h](http://www.easemob.com/apidoc/ios/chat/EMChatManagerBuddyDelegate_h/index.html): 好友相关的回调类；

* [EMChatManagerChatDelegate.h](): 发送和接受消息相关的回调类；

* [EMChatManagerEncryptionDelegate.h](): 加密相关的回调类；

* [EMChatManagerGroupDelegate.h](): 群组管理相关的回调类；

* [EMChatManagerLoginDelegate.h](): 登录、退出、注册相关的回调类；

* [EMChatManagerMediaDelegate.h](): 多媒体相关的回调类；

* [EMChatManagerPushNotificationDelegate.h](): 离线推送相关的回调类；

* [EMChatManagerUtilDelegate.h](): 管理消息中中附件相关的回调类。

## internal {#internal}

* [IChatManagerBuddy.h](): 好友相关的接口类；

* [IChatManagerChat.h](): 发送和接受消息相关的接口类；

* [IChatManagerConversation.h](): 会话相关的接口类；

* [IChatManagerEncryption.h](): 加密相关的接口类；

* [IChatManagerGroup.h](): 群组管理相关的接口类；

* [IChatManagerLogin.h](): 登录、退出、注册相关的接口类

* [IChatManagerMedia.h](): 多媒体相关的接口类；

* [IChatManagerPushNotification.h](): 离线推送相关的接口类；

* [IChatManagerSettingOptions.h](): 配置属性相关的接口类；

* [IChatManagerUtil.h](): 管理消息中附件相关的接口类。

## type {#type}

### 好友

* [EMBuddy.h](): 好友实例对应的类；

### 会话

* [EMConversation.h](): 会话实例对应的类；

### 群组

* [EMGroup.h](): 群组实例对应的类；

* [EMGroupStyleSetting.h](): 群组属性设置对应的类；

### 回执

* [EMReceopt.h](): 回执实例对应的类；

### 消息

* [EMMessage.h](): 消息实例对应的类；

* [EMCommandMessageBody.h](): 透传类型消息体对应的类；

* [EMFileMessageBody.h](): 文件类型消息体对应的类；

* [EMImageMessageBody.h](): 图片类型消息体对应的类；

* [EMLocationMessageBody.h](): 位置类型消息体对应的类；

* [EMTextMessageBody.h](): 文字类型消息体对应的类；

* [EMVideoMessageBody.h](): 视频类型消息体对应的类；

* [EMVoiceMessageBody.h](): 语音类型消息体对应的类；

* [EMChatCommand.h](): 透传对象对应的类；

* [EMChatFile.h](): 文件对象对应的类；

* [EMChatImage.h](): 图片对象对应的类；

* [EMChatLocation.h](): 位置对象对应的类；

* [EMChatText.h](): 文字对象对应的类；

* [EMChatVideo.h](): 视频对象对应的类；

* [EMChatVoice.h](): 语音对象对应的类；

### 协议

* [IChatImageOptions.h](): 发送图片消息时的压缩设置协议；

* [IEMChatCryptor.h](): 对聊天提供基础的加密, 解密服务协议；

* [IEMChatObject.h](): 聊天对象基类对象协议；

* [IEMChatProgressDelegate.h](): 聊天消息发送接收进度协议；

* [IEMFileMessageBody.h](): 文件类型的消息体接口协议；

* [IEMChatFile.h](): 文件类型的聊天对象协议；

* [IEMMessageBody.h](): 聊天的消息体基类对象协议；