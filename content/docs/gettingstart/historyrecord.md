---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

## 环信通信过程及聊天记录保存

![alt text](/tree.png "Title")

###环信通信的过程：

在线状态：A发送消息到环信服务器，环信服务器推送消息到B.<br>
离线状态：A发送消息到环信服务器，环信服务器检测到B不在线，会添加到离线缓存中，当B登陆后服务器会把离线消息推送给B

###环信聊天记录存储

A发送消息到环信服务器的同时，SDK会保存这条消息到本地数据库（SDK内部创建数据库，不允许直接操作）中，环信服务器在推送消息到B的同时也会在服务器记录下来（每人大小限制为100M空间，建议调用[rest](http://www.easemob.com/docs/rest/chatmessage/)接口把聊天记录导入到自己服务器做永久保存），B收到消息后，SDK会将这条消息存储到本地数据库

**注**：客户端并未提供去服务器获取聊天记录的接口，所以，如果换了设备或者清空了数据，聊天记录都不会存在，如果有需求要从服务器拉去聊天记录，可以在自己服务器处理


###android

在android的SDK中，EMChatManager.getInstance().loadAllConversations()是从本地数据库加载聊天记录到内存中，其他获取聊天记录的方法均是从内存读取

###ios

	NSArray *messages = [conversation loadAllMessages]; // 获取会话中的全部聊天记录。
    NSArray *messages = [conversation loadMessagesWithIds:@[@"msgid1",@"msgid2",@"msgid3"]]; // 根据messageid获取消息
    EMMessage *msg = [conversation loadMessageWithId:@"msgid1"]; // 根据messageid获取消息
    
    long long timestamp = [[NSDate date] timeIntervalSince1970] * 1000 + 1;
    NSArray * messages = [conversation loadNumbersOfMessages:20 before:timestamp]; // 根据时间戳读取指定条数的消息
