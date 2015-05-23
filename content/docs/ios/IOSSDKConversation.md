---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# 会话 EMConversation

    会话：操作聊天消息**EMMessage**的容器，在SDK中对应的类型是**EMConversation**

## 新建/获取一个会话 {#create}

根据chatter创建一个conversation。

<pre class="hll"><code class="language-java">
EMConversation *conversation = [[EaseMob sharedInstance].chatManager conversationForChatter:@"8001" conversationType:eConversationTypeChat];
</code></pre>

*	conversationForChatter:获取或创建与8001的会话
*	conversationType:会话类型

## 删除会话  {#removeconversation}

1、删除单个会话

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager removeConversationByChatter:@"8001" deleteMessages:YES append2Chat:YES];
</code></pre>

*	removeConversationByChatter:删除与8001的会话
*	deleteMessages:删除会话中的消息
*   append2Chat:是否更新内存中内容

2、根据chatter批量删除会话

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager removeConversationsByChatters:chatters deleteMessages:YES append2Chat:YES];
</code></pre>

*	removeConversationsByChatters:要删除的chatters
*	deleteMessages:删除会话中的消息
*   append2Chat:是否更新内存中内容

3、删除所有会话

<pre class="hll"><code class="language-java">
// deleteMessage,是否删除会话中的message，YES为删除
[[EaseMob sharedInstance].chatManager removeAllConversationsWithDeleteMessages:YES append2Chat:YES];
</code></pre>

## 获取会话列表 {#getconversations}

SDK中提供了三种获取会会话列表的方法

1、获取或创建

<pre class="hll"><code class="language-java">
EMConversation *conversation = [[EaseMob sharedInstance].chatManager conversationForChatter:@"8001" conversationType:eConversationTypeChat];
</code></pre>

*	conversationForChatter:获取或创建与8001的会话
*	isGroup:会话类型

2、获取内存中所有会话

<pre class="hll"><code class="language-java">
NSArray *conversations = [[EaseMob sharedInstance].chatManager conversations];
</code></pre>

3、获取DB中的所有会话

<pre class="hll"><code class="language-java">
NSArray *conversations = [[EaseMob sharedInstance].chatManager loadAllConversationsFromDatabaseWithAppend2Chat:YES];
</code></pre>

## 获取会话未读消息数 {#getconversationunread}

<pre class="hll"><code class="language-java">
[EMConversation unreadMessagesCount];
</code></pre>
