---
title: 环信
sidebar: iossidebar
secondnavios: true
---

## 高级话题


### 自定义消息类型

EMMessage支持用户自定义扩展

<pre class="hll"><code class="language-objective_c">	
	/*!
	@property
	@abstract 消息扩展
	*/	
	@property (nonatomic, strong) NSDictionary *ext;
	
</code></pre>

	
将需要自定义的object放入字典中，发送时就可以一起发出。	


发送自定义消息

<pre class="hll"><code class="language-objective_c">
 	// 自定义消息
	EMChatText *userObject = [[EMChatText alloc] initWithText:@""];
	EMMessageBody *body = [[EMTextMessageBody alloc]
                           initWithChatObject:userObject];
 
    EMMessage *msg = [[EMMessage alloc] initWithReceiver:username
                                                  bodies:@[body]];
 
    
    NSMutableDictionary *vcardProperty = [NSMutableDictionary dictionary];
	// obj:需要发送object
	// objKey:obj对应的key
   	[vcardProperty setObject:obj forKey:objKey];        
  
    msg.ext = vcardProperty;
    
    // 发送消息
	[[EaseMob sharedInstance].chatManager asyncSendMessage:msg progress:nil];
    
</code></pre> 
 
接收自定义消息

<pre class="hll"><code class="language-objective_c">
	-(void)didReceiveMessage:(EMMessage *)message
	{
		if(message.ext){
			// obj:接受到的obj对象
			// objKey:obj对应的key
			NSObject *obj = [message.ext objectForKey:objKey];
		}			
	}
</code></pre>
