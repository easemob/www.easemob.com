---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# 导入消息到环信数据库

导入消息到环信DB

<pre class="hll"><code class="language-java">
 
 //导入群聊消息
 - (void)insertFakeMessageWithGroupID:(NSString *)groupID inviter:(NSString *)inviter{
    id <IChatManager> chatManager = [[EaseMob sharedInstance] chatManager];
    EMConversation *conversation = [chatManager conversationForChatter:groupID isGroup:YES];
    NSDictionary *loginInfo = [chatManager loginInfo];
    NSString *account = [loginInfo objectForKey:kSDKUsername];
    EMChatText *chatText = [[EMChatText alloc] initWithText:@"你被邀请加入群"];
    EMTextMessageBody *textBody = [[EMTextMessageBody alloc] initWithChatObject:chatText];
    EMMessage *message = [[EMMessage alloc] initWithReceiver:groupID bodies:@[textBody]];
    [message setFrom:groupID];
    [message setIsGroup:YES];
    [message setIsAcked:NO];
    [message setGroupSenderName:inviter];
    [message setTo:account];
    
    NSTimeInterval interval = [[NSDate date] timeIntervalSince1970];
    NSString *messageID = [NSString stringWithFormat:@"%.0f", interval];
    [message setMessageId:messageID];
    
    [chatManager saveConversation:conversation];
    [chatManager importMessage:message
                   append2Chat:YES];
    
    [self didUnreadMessagesCountChanged];
} 
 
 //导入单聊消息与导入群聊消息类似，按照如下修改即可，
 //只需要[message setFrom:username];[message setIsGroup:NO];
 //去掉[message setGroupSenderName:inviter];
 
</code></pre>
									




