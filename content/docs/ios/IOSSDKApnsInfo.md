# 环信推送

## 单聊

### 不显示详情

	{
		"apns":{
			"alert":"您有一条新消息",	 
			"badge":1,				 
			"sound":"default"		 
		},
		"f":"6001",					 
		"t":"6006",					 
		"m":"14aec1e00ef"			 
	}
	
*	alert:显示信息
*	badge:角标，表示离线消息数
*	sound:收到APNS时的提示音
*	f:消息发送方的环信id
*	t:消息接收方的环信id
*	m:消息id
	
### 显示详情

	{
		"apns":{
			"alert":"ApnsName:xxxx",	 
			"badge":1,				 
			"sound":"default"		 
		},
		"f":"6001",					 
		"t":"6006",					 
		"m":"14aec1e00ef"			 
	}
	
*	alert:显示信息
*	ApnsName:发送方设置的用户名(即环信管理后台中看到的用户昵称)
*	xxxx:消息内容(发送方发的什么，就显示什么)
*	badge:角标，表示离线消息数
*	sound:收到APNS时的提示音
*	f:消息发送方的环信id
*	t:消息接收方的环信id
*	m:消息id
	
## 	群聊

### 不显示详情

	{
		"apns":{
			"alert":"您有一条新消息",	 
			"badge":1,				 
			"sound":"default"		 
		},
		"f":"6001",					 
		"t":"6006",	
		"g":"1421300621769",				 
		"m":"14aec1e00ef"			 
	}
	
*	alert:显示信息
*	badge:角标，表示离线消息数
*	sound:收到APNS时的提示音
*	f:消息发送方的环信id
*	t:消息接收方的环信id
*	g:群组id
*	m:消息id
	
### 显示详情

	{
		"apns":{
			"alert":"ApnsName:xxxx",	 
			"badge":1,				 
			"sound":"default"		 
		},
		"f":"6001",					 
		"t":"6006",		
		"g":"1421300621769",
		"m":"14aec1e00ef"			 
	}
	
*	alert:显示信息
*	ApnsName:发送方设置的用户名(即环信管理后台中看到的用户昵称)
*	xxxx:消息内容(发送方发的什么，就显示什么)
*	badge:角标，表示离线消息数
*	sound:收到APNS时的提示音
*	f:消息发送方的环信id
*	t:消息接收方的环信id
*	g:群组id
*	m:消息id
	
	
## 	向APNS中添加扩展字段（em_apns_ext）

APNS扩展:添加后，您收到的apns中将带有您填写的字段，可以帮助您区分apns。

### 解析内容

	{
		"apns":{
			"alert":"您有一条新消息",	 
			"badge":1,				 
			"sound":"default"		 
		},
		"f":"6001",					 
		"t":"6006",					 
		"e":"扩展内容",
		"m":"14aec1e00ef"			 
	}
	
*	e:您发送的自定义内容
	
###	发送扩展
#### rest

(rest发消息 http://www.easemob.com/docs/rest/sendmessage/#sendmsg )

	{
		"target_type":"users",
		"target":[
			"6006"
		],
		"msg":{
			"type":"txt",
			"msg":"hello from rest"
		},
		"from":"6001",
		"ext":{
			"em_apns_ext":"扩展内容"
		}
	}

#### iOS

(iOS发消息 http://www.easemob.com/docs/ios/ios/#sendmessage)

	EMChatText *txt = [[EMChatText alloc] initWithText:@"test"];￼
	EMTextMessageBody *body = [[EMTextMessageBody alloc] initWithChatObject:txt];
	EMMessage *msg = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
	// 设置⾃自定义扩展字段
	msg.ext = @{@"em_apns_ext":@"扩展内容"};
	// 发送消息
	[[EaseMob sharedInstance].chatManager asyncSendMessage:msg progress:nil];￼￼
#### Android
(Android发消息 http://www.easemob.com/docs/android/singlechat/#sendmessage)
	EMMessage message = EMMessage.createSendMessage(EMMessage.Type.TXT);
	TextMessageBody txtBody = new TextMessageBody("test");
	message.setReceipt("6006");
	// 设置自定义扩展字段
	message.setAttribute("em_apns_ext", "扩展内容");
	// 发送消息
	EMChatManager.getInstance().sendMessage(message, new EMCallBack(){...});
	
## 发送静默消息（不发APNS，em_ignore_notification）

发送时添加后，该消息将不会有APNS推送

### rest发送
(rest发消息 http://www.easemob.com/docs/rest/sendmessage/#sendmsg )

	{
		"target_type":"users",
		"target":[
			"6006"
		],
		"msg":{
			"type":"txt",
			"msg":"hello from rest"
		},
		"from":"6001",
		"ext":{
			"em_ignore_notification":true
		}
	}

### iOS发送
(iOS发消息 http://www.easemob.com/docs/ios/ios/#sendmessage)

	EMChatText *txt = [[EMChatText alloc] initWithText:@"test"];￼
	EMTextMessageBody *body = [[EMTextMessageBody alloc] initWithChatObject:txt];
	EMMessage *msg = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
	// 设置⾃自定义扩展字段
	msg.ext = @{@"em_ignore_notification":@YES};
	// 发送消息
	[[EaseMob sharedInstance].chatManager asyncSendMessage:msg progress:nil];
	
#### Android
(Android发消息 http://www.easemob.com/docs/android/singlechat/#sendmessage)
	EMMessage message = EMMessage.createSendMessage(EMMessage.Type.TXT);
	TextMessageBody txtBody = new TextMessageBody("test");
	message.setReceipt("6006");
	// 设置自定义扩展字段
	message.setAttribute("em_ignore_notification", true);
	// 发送消息
	EMChatManager.getInstance().sendMessage(message, new EMCallBack(){...});
	
## 	设置强制推送型APNS(em_force_notification)

设置后,将强制推送消息后,即使客户端设置了免打扰时间,也会得到推送。 优先级比em_ignore_notification低,即同时设置em_ignore_notification后,该属性将失效

### rest发送
(rest发消息 http://www.easemob.com/docs/rest/sendmessage/#sendmsg )

	{
		"target_type":"users",
		"target":[
			"6006"
		],
		"msg":{
			"type":"txt",
			"msg":"hello from rest"
		},
		"from":"6001",
		"ext":{
			"em_force_notification":true
		}
	}

### iOS发送
(iOS发消息 http://www.easemob.com/docs/ios/ios/#sendmessage)

	EMChatText *txt = [[EMChatText alloc] initWithText:@"test"];￼
	EMTextMessageBody *body = [[EMTextMessageBody alloc] initWithChatObject:txt];
	EMMessage *msg = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
	// 设置⾃自定义扩展字段
	msg.ext = @{@"em_force_notification":@YES};
	// 发送消息
	[[EaseMob sharedInstance].chatManager asyncSendMessage:msg progress:nil];
	
#### Android
(Android发消息 http://www.easemob.com/docs/android/singlechat/#sendmessage)
	EMMessage message = EMMessage.createSendMessage(EMMessage.Type.TXT);
	TextMessageBody txtBody = new TextMessageBody("test");
	message.setReceipt("6006");
	// 设置自定义扩展字段
	message.setAttribute("em_force_notification", true);
	// 发送消息
	EMChatManager.getInstance().sendMessage(message, new EMCallBack(){...});## 自定义显示
设置后，您收到的APNS的alert信息将是您设置的信息
###  解析

	{
		"apns":{
			"alert":"自定义信息",	 
			"badge":1,				 
			"sound":"default"		 
		},
		"f":"6001",					 
		"t":"6006",					 
		"m":"14aec1e00ef"			 
	}
### rest发送
(rest发消息 http://www.easemob.com/docs/rest/sendmessage/#sendmsg )

	{
		"target_type":"users",
		"target":[
			"6006"
		],
		"msg":{
			"type":"txt",
			"msg":"hello from rest"
		},
		"from":"6001",
		"ext":{
			"em_apns_ext":{
				"em_push_title":"自定义信息"
			}
		}
	}

### iOS发送
(iOS发消息 http://www.easemob.com/docs/ios/ios/#sendmessage)

	EMChatText *txt = [[EMChatText alloc] initWithText:@"test"];￼
	EMTextMessageBody *body = [[EMTextMessageBody alloc] initWithChatObject:txt];
	EMMessage *msg = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
	// 设置⾃自定义扩展字段
	msg.ext = @{@"em_apns_ext":@{@"em_push_title":@"自定义信息"}};
	// 发送消息
	[[EaseMob sharedInstance].chatManager asyncSendMessage:msg progress:nil];
	
#### Android
(Android发消息 http://www.easemob.com/docs/android/singlechat/#sendmessage)
	EMMessage message = EMMessage.createSendMessage(EMMessage.Type.TXT);
	TextMessageBody txtBody = new TextMessageBody("test");
	message.setReceipt("6006");
	// 设置自定义扩展字段
	try{
		message.setAttribute("em_apns_ext",(new JSONObject()).put("em_push_title","自定义信息"));
	} catch (JSONException e){
		e.printStackTrace();
	}
	// 发送消息
	EMChatManager.getInstance().sendMessage(message, new EMCallBack(){...});