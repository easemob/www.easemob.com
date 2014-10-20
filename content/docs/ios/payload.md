---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# 发送透传消息


透传消息发送格式

<pre class="hll"><code class="language-objective_c">
EMChatCommand *cmd = [[EMChatCommand alloc] init];
EMCommandMessageBody *body = [[EMCommandMessageBody alloc] initWithChatObject:cmd];

EMMessage *msg = [[EMMessage alloc]
initWithReceiver:@"接收方username"
bodies:[NSArray arrayWithObject:body]];
//msg.ext = ...;//支持自定义扩展

[[EaseMob sharedInstance].chatManager sendMessage:msg
progress:nil
error:nil];
</code></pre>

CMD消息监听

<pre class="hll"><code class="language-java">
    // 注册为接收消息的监听者（delegate）
	[[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
	
    /**
	 * 接收消息
	 */
	-(void)didReceiveMessage:(EMMessage *)message
	{
	    //消息处理代码
	}
	
</code></pre>


