---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# 消息 EMMessage

    消息：IM交互实体，在SDK中对应的类型是 **EMMessage**，EMMessage可以由多个符合<IEMMessageBody>协议的body组成，但是 推荐使用一个body，多个body有bug，正在优化。

以下的讲解以一个body为例：

## 文字消息构造 {#textalloc}

<pre class="hll"><code class="language-java">
EMChatText *txtChat = [[EMChatText alloc] initWithText:@"要发送的消息"];
EMTextMessageBody *body = [[EMTextMessageBody alloc] initWithChatObject:txtChat];

// 生成message
EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
message.isGroup = NO; // 设置是否是群聊
</code></pre>

## 图片消息构造 {#imagealloc}

<pre class="hll"><code class="language-java">
EMChatImage *imgChat = [[EMChatImage alloc] initWithUIImage:img displayName:@"displayName"];
EMImageMessageBody *body = [[EMImageMessageBody alloc] initWithChatObject:imgChat];

// 生成message
EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
message.isGroup = NO; // 设置是否是群聊
</code></pre>

## 位置消息构造 {#locationalloc}

<pre class="hll"><code class="language-java">
EMChatLocation *locChat = [[EMChatLocation alloc] initWithLatitude:35.1 longitude:35.1 address:@"地址"];
EMLocationMessageBody *body = [[EMLocationMessageBody alloc] initWithChatObject:locChat];

// 生成message
EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
message.isGroup = NO; // 设置是否是群聊
</code></pre>

## 语音消息构造 {#audioalloc}

1、开始录音

<pre class="hll"><code class="language-java">
/*!
@method
@brief 开始录制音频
@discussion
@param pError 错误信息
@result
*/
- (void)startRecordingAudioWithError:(NSError **)pError;
</code></pre>

2、取消录音

<pre class="hll"><code class="language-java">
/*!
@method
@brief 异步方法, 取消录制音频
@discussion 取消录制后, EMChatManagerDelegateMedia中的didCancelRecordAudio:error:回调会被触发
@result
*/
- (void)asyncCancelRecordingAudio;

/*!
@method
@brief 异步方法, 取消录制音频
@discussion
@param completion 回调
@param aQueue     回调时的线程
@result
*/
- (void)asyncCancelRecordingAudioWithCompletion:(void (^)(EMChatVoice *aChatVoice, EMError *error))completion
onQueue:(dispatch_queue_t)aQueue;
</code></pre>

3、停止录音

<pre class="hll"><code class="language-java">
/*!
@method
@brief 异步方法, 停止录制音频
@discussion 录制完成后, EMChatManagerDelegateMedia中的didRecordAudio:error:回调会被触发
@result
*/
- (void)asyncStopRecordingAudio;

/*!
@method
@brief 异步方法, 停止录制音频
@discussion
@param completion 回调
@param aQueue     回调时的线程
@result
*/
- (void)asyncStopRecordingAudioWithCompletion:(void (^)(EMChatVoice *aChatVoice, NSError *error))completion
onQueue:(dispatch_queue_t)aQueue;
</code></pre>

通过以上操作获取到语音的EMChatVoice，然后进行下一步操作

<pre class="hll"><code class="language-java">
EMVideoMessageBody *body = [[EMVideoMessageBody alloc] initWithChatObject:videoChat];
// 生成message
EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
message.isGroup = NO; // 设置是否是群聊
</code></pre>

## 视频消息构造 {#videoalloc}

<pre class="hll"><code class="language-java">
EMChatVideo *videoChat = [[EMChatVideo alloc] initWithFile:localPath displayName:@"displayName"];
EMVideoMessageBody *body = [[EMVideoMessageBody alloc] initWithChatObject:videoChat];
// 生成message
EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
message.isGroup = NO; // 设置是否是群聊
</code></pre>

## 文件消息构造 {#filealloc}

<pre class="hll"><code class="language-java">
EMChatFile *fileChat = [[EMChatFile alloc] initWithFile:localPath displayName:@"displayName"];
EMFileMessageBody *body = [[EMFileMessageBody alloc] initWithChatObject:fileChat];
// 生成message
EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
message.isGroup = NO; // 设置是否是群聊
</code></pre>

## 透传消息构造 {#cmdalloc}

SDK提供的一种特殊类型的消息，即CMD，不会存db，也不会走apns推送，类似一种指令型的消息，比如您的服务器要通知客户端做某些操作，您可以服务器和客户端提前约定好某个字段，当客户端收到约定好的字段时，执行某种特殊操作。

<pre class="hll"><code class="language-java">
EMChatCommand *cmdChat = [[EMChatCommand alloc] init];
cmdChat.cmd = @"reason";
EMCommandMessageBody *body = [[EMCommandMessageBody alloc] initWithChatObject:cmdChat];
// 生成message
EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
message.isGroup = NO; // 设置是否是群聊
</code></pre>

## 自定义扩展消息 {#ext}

> 有时候需要在消息中携带一些扩展内容，用来实现特殊需求，比如阅后即焚等。EMMessage提供了ext属性，撰文用来存放扩展内容。**ext属性是NSDictionary类型，key和value必须是基本类型，且不能是json。**
>
> 可以这样使用：EMMessage.ext = @{@"key":@"value"};
