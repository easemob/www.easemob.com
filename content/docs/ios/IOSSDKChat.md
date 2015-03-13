---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# 聊天

## 消息 {#message}

> 消息：IM交互实体，在SDK中对应的类型是 **EMMessage**，EMMessage可以由多个符合<IEMMessageBody>协议的body组成，但是**推荐使用一个body，多个body有bug，正在优化**。

以下的讲解以一个body为例：

### * 文字消息

<pre class="hll"><code class="language-java">
EMChatText *txtChat = [[EMChatText alloc] initWithText:@"要发送的消息"];
EMTextMessageBody *body = [[EMTextMessageBody alloc] initWithChatObject:txtChat];

// 生成message
EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
message.isGroup = NO; // 设置是否是群聊
</code></pre>

### * 图片消息

<pre class="hll"><code class="language-java">
EMChatImage *imgChat = [[EMChatImage alloc] initWithUIImage:img displayName:@"displayName"];
EMImageMessageBody *body = [[EMImageMessageBody alloc] initWithChatObject:imgChat];

// 生成message
EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
message.isGroup = NO; // 设置是否是群聊
</code></pre>

### *位置消息

<pre class="hll"><code class="language-java">
EMChatLocation *locChat = [[EMChatLocation alloc] initWithLatitude:35.1 longitude:35.1 address:@"地址"];
EMLocationMessageBody *body = [[EMLocationMessageBody alloc] initWithChatObject:locChat];

// 生成message
EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
message.isGroup = NO; // 设置是否是群聊
</code></pre>

### * 语音消息

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

### * 视频消息

<pre class="hll"><code class="language-java">
EMChatVideo *videoChat = [[EMChatVideo alloc] initWithFile:localPath displayName:@"displayName"];
EMVideoMessageBody *body = [[EMVideoMessageBody alloc] initWithChatObject:videoChat];
// 生成message
EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
message.isGroup = NO; // 设置是否是群聊
</code></pre>

### * 文件消息

<pre class="hll"><code class="language-java">
EMChatFile *fileChat = [[EMChatFile alloc] initWithFile:localPath displayName:@"displayName"];
EMFileMessageBody *body = [[EMFileMessageBody alloc] initWithChatObject:fileChat];
// 生成message
EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
message.isGroup = NO; // 设置是否是群聊
</code></pre>

### * 透传消息

SDK提供的一种特殊类型的消息，即CMD，不会存db，也不会走apns推送，类似一种指令型的消息，比如您的服务器要通知客户端做某些操作，您可以服务器和客户端提前约定好某个字段，当客户端收到约定好的字段时，执行某种特殊操作。

<pre class="hll"><code class="language-java">
EMChatCommand *cmdChat = [[EMChatCommand alloc] init];
cmdChat.cmd = @"reason";
EMCommandMessageBody *body = [[EMCommandMessageBody alloc] initWithChatObject:cmdChat];
// 生成message
EMMessage *message = [[EMMessage alloc] initWithReceiver:@"6001" bodies:@[body]];
message.isGroup = NO; // 设置是否是群聊
</code></pre>

> * 添加扩展字段

> 有时候需要在消息中携带一些扩展内容，用来实现特殊需求，比如阅后即焚等。EMMessage提供了ext属性，撰文用来存放扩展内容。**ext属性是NSDictionary类型，key和value必须是基本类型，且不能是json。**

> 可以这样使用：EMMessage.ext = @{@"key":@"value"};


## 会话 {#conversation}
会话：操作聊天内容的容器，在SDK中对应的类型是**EMConversation**

### * 创建会话 {#createconversation}

根据chatter创建一个conversation。

<pre class="hll"><code class="language-java">
EMConversation *conversation = [[EaseMob sharedInstance].chatManager conversationForChatter:@"8001" isGroup:NO];
</code></pre>

*	conversationForChatter:获取或创建与8001的会话
*	isGroup:是否是群聊（如果上面传入的Chatter是群id，则此处为YES）

### * 删除会话  {#removeconversation}

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

### * 获取会话列表 {#getconversations}

SDK中提供了三种获取会会话列表的方法

1、获取或创建

<pre class="hll"><code class="language-java">
EMConversation *conversation = [[EaseMob sharedInstance].chatManager conversationForChatter:@"8001" isGroup:NO];
</code></pre>

*	conversationForChatter:获取或创建与8001的会话
*	isGroup:是否是群聊（如果上面传入的Chatter是群id，则此处为YES）

2、获取内存中所有会话

<pre class="hll"><code class="language-java">
NSArray *conversations = [[EaseMob sharedInstance].chatManager conversations];
</code></pre>

3、获取DB中的所有会话

<pre class="hll"><code class="language-java">
NSArray *conversations = [[EaseMob sharedInstance].chatManager loadAllConversationsFromDatabaseWithAppend2Chat:YES];
</code></pre>

### * 获取会话未读消息数

<pre class="hll"><code class="language-java">
[EMConversation unreadMessagesCount];
</code></pre>

### * 其他功能

SDK中还提供了很多操作EMConversation的接口，比如往conversation中插入一条消息，更新conversation中的某条消息等等，详情请查看 **IChatManagerConversation.h**和**EMConversation.h**。


## 单聊/群聊 {#chat}

### * 发送消息 {#sendmessage}

登陆成功之后才能调用该组接口。发消息时，单聊和群聊调用的是统一接口，区别只是要设置下message.isGroup属性。坚决不推荐多body。

<pre class="hll"><code class="language-java">
/*!
@method
@brief 发送一条消息
@discussion 待发送的消息对象和发送后的消息对象是同一个对象, 在发送过程中对象属性可能会被更改
@param message  消息对象(包括from, to, body列表等信息)
@param progress 发送多媒体信息时的progress回调对象
@param pError   错误信息
@result 发送完成后的消息对象
*/
- (EMMessage *)sendMessage:(EMMessage *)message
                  progress:(id<IEMChatProgressDelegate>)progress
                     error:(EMError **)pError;

/*!
@method
@brief 异步方法, 发送一条消息
@discussion 待发送的消息对象和发送后的消息对象是同一个对象, 在发送过程中对象属性可能会被更改. 在发送过程中, willSendMessage:error:和didSendMessage:error:这两个回调会被触发
@param message  消息对象(包括from, to, body列表等信息)
@param progress 发送多媒体信息时的progress回调对象
@result 发送的消息对象(因为是异步方法, 不能作为发送完成或发送成功失败与否的判断)
*/
- (EMMessage *)asyncSendMessage:(EMMessage *)message
                       progress:(id<IEMChatProgressDelegate>)progress;

/*!
@method
@brief 异步方法, 发送一条消息
@discussion 待发送的消息对象和发送后的消息对象是同一个对象, 在发送过程中对象属性可能会被更改
@param message  消息对象(包括from, to, body列表等信息)
@param progress 发送多媒体信息时的progress回调对象
@param prepare          将要发送消息前的回调block
@param aPrepareQueue    回调block时的线程
@param completion       发送消息完成后的回调
@param aCompletionQueue 回调block时的线程
@result 发送的消息对象(因为是异步方法, 不能作为发送完成或发送成功失败与否的判断)
*/
- (EMMessage *)asyncSendMessage:(EMMessage *)message
                       progress:(id<IEMChatProgressDelegate>)progress
                        prepare:(void (^)(EMMessage *message, EMError *error))prepare
                        onQueue:(dispatch_queue_t)aPrepareQueue
                     completion:(void (^)(EMMessage *message, EMError *error))completion
                        onQueue:(dispatch_queue_t)aCompletionQueue;
</code></pre>

### * 接收消息 {#receivemessage}

根据账号的在线情况，消息会以离线消息和在线消息从服务器发送到客户端。SDK会以回调方式将消息抛出。

#### ** 在线消息接收

在线普通消息会走以下回调：

<pre class="hll"><code class="language-java">
/*!
@method
@brief 收到消息时的回调
@param message      消息对象
@discussion 当EMConversation对象的enableReceiveMessage属性为YES时, 会触发此回调
针对有附件的消息, 此时附件还未被下载.
附件下载过程中的进度回调请参考didFetchingMessageAttachments:progress:, 
下载完所有附件后, 回调didMessageAttachmentsStatusChanged:error:会被触发
*/
- (void)didReceiveMessage:(EMMessage *)message;
</code></pre>


透传(cmd)在线消息会走以下回调:

<pre class="hll"><code class="language-java">
/*!
@method
@brief 收到消息时的回调
@param cmdMessage      消息对象
@discussion 当EMConversation对象的enableReceiveMessage属性为YES时, 会触发此回调
*/
- (void)didReceiveCmdMessage:(EMMessage *)cmdMessage;
</code></pre>

#### ** 离线消息接收

离线普通消息会走以下回调:

<pre class="hll"><code class="language-java">
/*!
@method
@brief 将要接收离线消息的回调
@discussion
@result
*/
- (void)willReceiveOfflineMessages;

/*!
@method
@brief 离线非透传消息接收完成的回调
@discussion
@param offlineMessages 接收到的离线列表
@result
*/
- (void)didFinishedReceiveOfflineMessages:(NSArray *)offlineMessages;
</code></pre>

离线透传消息会走以下回调:

<pre class="hll"><code class="language-java">
/*!
@method
@brief 离线透传消息接收完成的回调
@discussion
@param offlineCmdMessages 接收到的离线透传消息列表
@result
*/
- (void)didFinishedReceiveOfflineCmdMessages:(NSArray *)offlineCmdMessages;
</code></pre>


### * 消息未读数变化 {#unreadmessage}

<pre class="hll"><code class="language-java">
/*!
@method
@brief 未读消息数改变时的回调
@discussion 当EMConversation对象的enableUnreadMessagesCountEvent为YES时,会触发此回调
@result
*/
- (void)didUnreadMessagesCountChanged;
</code></pre>

### * 消息解析 {#resolvemessage}

#### ** 解析普通消息

<pre class="hll"><code class="language-java">
//
//  ViewController.m
//  Test
//
//  Created by dujiepeng on 12/29/14.
//  Copyright (c) 2014 dujiepeng. All rights reserved.
//

#import "ViewController.h"
#import "EaseMob.h"

@interface ViewController ()<IChatManagerDelegate>

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self registerEaseMobDelegate];
}

- (void)dealloc{
    [self unRegisterEaseMobDelegate];
}

#pragma mark - IChatManagerDelegate
// 收到消息的回调，带有附件类型的消息可以用SDK提供的下载附件方法下载（后面会讲到）
-(void)didReceiveMessage:(EMMessage *)message{
    id<IEMMessageBody> msgBody = message.messageBodies.firstObject;
    switch (msgBody.messageBodyType) {
        case eMessageBodyType_Text:
        {
            // 收到的文字是
            NSString *txt = ((EMTextMessageBody *)msgBody).text;
            NSLog(@"收到的文字是 txt -- %@",txt);
        }
        break;
        case eMessageBodyType_Image:
        {
            // 得到一个图片消息body
            EMImageMessageBody *body = ((EMImageMessageBody *)msgBody);
            NSLog(@"大图remote路径 -- %@"   ,body.remotePath);
            NSLog(@"大图local路径 -- %@"    ,body.localPath); // // 需要使用sdk提供的下载方法后才会存在
            NSLog(@"大图的secret -- %@"    ,body.secretKey);
            NSLog(@"大图的W -- %f ,大图的H -- %f",body.size.width,body.size.height);
            NSLog(@"大图的下载状态 -- %lu",body.attachmentDownloadStatus);


            // 缩略图sdk会自动下载
            NSLog(@"小图remote路径 -- %@"   ,body.thumbnailRemotePath);
            NSLog(@"小图local路径 -- %@"    ,body.thumbnailLocalPath);
            NSLog(@"小图的secret -- %@"    ,body.thumbnailSecretKey);
            NSLog(@"小图的W -- %f ,大图的H -- %f",body.thumbnailSize.width,body.thumbnailSize.height);
            NSLog(@"小图的下载状态 -- %lu",body.thumbnailDownloadStatus);
        }
        break;
        case eMessageBodyType_Location:
        {
            EMLocationMessageBody *body = (EMLocationMessageBody *)msgBody;
            NSLog(@"纬度-- %f",body.latitude);
            NSLog(@"经度-- %f",body.longitude);
            NSLog(@"地址-- %@",body.address);
        }
        break;
        case eMessageBodyType_Voice:
        {
            // 音频sdk会自动下载
            EMVoiceMessageBody *body = (EMVoiceMessageBody *)msgBody;
            NSLog(@"音频remote路径 -- %@"      ,body.remotePath);
            NSLog(@"音频local路径 -- %@"       ,body.localPath); // 需要使用sdk提供的下载方法后才会存在（音频会自动调用）
            NSLog(@"音频的secret -- %@"        ,body.secretKey);
            NSLog(@"音频文件大小 -- %lld"       ,body.fileLength);
            NSLog(@"音频文件的下载状态 -- %lu"   ,body.attachmentDownloadStatus);
            NSLog(@"音频的时间长度 -- %lu"      ,body.duration);

        }
        break;
        case eMessageBodyType_Video:
        {
            EMVideoMessageBody *body = (EMVideoMessageBody *)msgBody;

            NSLog(@"视频remote路径 -- %@"      ,body.remotePath);
            NSLog(@"视频local路径 -- %@"       ,body.localPath); // 需要使用sdk提供的下载方法后才会存在
            NSLog(@"视频的secret -- %@"        ,body.secretKey);
            NSLog(@"视频文件大小 -- %lld"       ,body.fileLength);
            NSLog(@"视频文件的下载状态 -- %lu"   ,body.attachmentDownloadStatus);
            NSLog(@"视频的时间长度 -- %lu"      ,body.duration);
            NSLog(@"视频的W -- %f ,视频的H -- %f", body.size.width, body.size.height);

            // 缩略图sdk会自动下载
            NSLog(@"缩略图的remote路径 -- %@"     ,body.thumbnailRemotePath);
            NSLog(@"缩略图的local路径 -- %@"      ,body.thumbnailRemotePath);
            NSLog(@"缩略图的secret -- %@"        ,body.thumbnailSecretKey);
            NSLog(@"缩略图的下载状态 -- %lu"      ,body.thumbnailDownloadStatus);
        }
        break;
        case eMessageBodyType_File:
        {
            EMFileMessageBody *body = (EMFileMessageBody *)msgBody;
            NSLog(@"文件remote路径 -- %@"      ,body.remotePath);
            NSLog(@"文件local路径 -- %@"       ,body.localPath); // 需要使用sdk提供的下载方法后才会存在
            NSLog(@"文件的secret -- %@"        ,body.secretKey);
            NSLog(@"文件文件大小 -- %lld"       ,body.fileLength);
            NSLog(@"文件文件的下载状态 -- %lu"   ,body.attachmentDownloadStatus);
        }
        break;

        default:
        break;
    }
}


// 向SDK中注册回调
- (void)registerEaseMobDelegate{
    // 此处先取消一次，是为了保证只将self注册过一次回调。
    [self unRegisterEaseMobDelegate];
    [[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
}	

// 取消SDK中注册的回调
- (void)unRegisterEaseMobDelegate{
    [[EaseMob sharedInstance].chatManager removeDelegate:self];
}

@end
</code></pre>

#### ** 解析透传消息

<pre class="hll"><code class="language-java">
//
//  ViewController.m
//  Test
//
//  Created by dujiepeng on 12/29/14.
//  Copyright (c) 2014 dujiepeng. All rights reserved.
//

#import "ViewController.h"
#import "EaseMob.h"

@interface ViewController ()<IChatManagerDelegate>

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self registerEaseMobDelegate];
}


- (void)dealloc{
    [self unRegisterEaseMobDelegate];
}

#pragma mark - IChatManagerDelegate
-(void)didReceiveCmdMessage:(EMMessage *)cmdMessage{
    EMCommandMessageBody *body = (EMCommandMessageBody *)cmdMessage.messageBodies.lastObject;
    NSLog(@"收到的action是 -- %@",body.action);
}


// 向SDK中注册回调
- (void)registerEaseMobDelegate{
    // 此处先取消一次，是为了保证只将self注册过一次回调。
    [self unRegisterEaseMobDelegate];
    [[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
}

// 取消SDK中注册的回调
- (void)unRegisterEaseMobDelegate{
    [[EaseMob sharedInstance].chatManager removeDelegate:self];
}

@end
</code></pre>


#### ** 解析扩展消息

<pre class="hll"><code class="language-java">
//
//  ViewController.m
//  Test
//
//  Created by dujiepeng on 12/29/14.
//  Copyright (c) 2014 dujiepeng. All rights reserved.
//

#import "ViewController.h"
#import "EaseMob.h"

@interface ViewController ()<IChatManagerDelegate>

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self registerEaseMobDelegate];
}


- (void)dealloc{
    [self unRegisterEaseMobDelegate];
}

#pragma mark - IChatManagerDelegate
// 收到离线消息回调
-(void)didReceiveCmdMessage:(EMMessage *)cmdMessage{
    // cmd消息中的扩展属性
    NSDictionary *ext = cmdMessage.ext;
    NSLog(@"cmd消息中的扩展属性是 -- %@",ext);
}
// 收到消息回调
-(void)didReceiveMessage:(EMMessage *)message{
    // 消息中的扩展属性
    NSDictionary *ext = message.ext;
    NSLog(@"消息中的扩展属性是 -- %@",ext);
}

// 向SDK中注册回调
- (void)registerEaseMobDelegate{
    // 此处先取消一次，是为了保证只将self注册过一次回调。
    [self unRegisterEaseMobDelegate];
    [[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
}

// 取消SDK中注册的回调
- (void)unRegisterEaseMobDelegate{
    [[EaseMob sharedInstance].chatManager removeDelegate:self];
}

@end

</code></pre>

### * 下载消息中的附件 {#downloadmessage}

    SDK接收到消息后，会默认下载：图片消息的缩略图，语音消息的语音，视频消息的视频第一帧。

    SDK中下载附件分为两种，一个是下载大图(或音视频)，一个是下载缩略图(缩略图在收到消息时会自动下载，提供该方法是为了在自动下载失败时可以主动调用)

**请先判断你要下载附件没有下载成功之后，在调用以下下载方法，否则SDK下载方法会再次从服务器上获取附件。**

#### ** 下载大图(或音视频)

SDK中提供了三种方法

1、同步方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
EMMessage *aMessage = [[EaseMob sharedInstance].chatManager fetchMessage:message progress:nil error:&error];
if (!error) {
    NSLog(@"下载成功，下载后的message是 -- %@",aMessage);
}
</code></pre>

2、block回调方法

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager asyncFetchMessage:message progress:nil completion:^(EMMessage *aMessage, EMError *error) {
    if (!error) {
        NSLog(@"下载成功，下载后的message是 -- %@",aMessage);
    }
} onQueue:nil];
</code></pre>

3、IChatManagerDelegate异步方法

<pre class="hll"><code class="language-java">
//
//  ViewController.m
//  Test
//
//  Created by dujiepeng on 12/29/14.
//  Copyright (c) 2014 dujiepeng. All rights reserved.
//

#import "ViewController.h"
#import "EaseMob.h"

@interface ViewController ()<IChatManagerDelegate>

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self registerEaseMobDelegate];
}


- (void)dealloc{
    [self unRegisterEaseMobDelegate];
}

#pragma mark - IChatManagerDelegate
// 收到消息回调
-(void)didReceiveMessage:(EMMessage *)message{
    id<IEMMessageBody> body = message.messageBodies.firstObject;
    switch (body.messageBodyType) {
        case eMessageBodyType_Image:
        case eMessageBodyType_Video:
        case eMessageBodyType_Voice:
        case eMessageBodyType_File:
        {
            // 当message中带有附件的时候执行下载(如图片、音频、视频、文件)
            [[EaseMob sharedInstance].chatManager asyncFetchMessage:message progress:nil];
        }
        break;

        default:
        break;
    }
}

// 附件下载结束回调
-(void)didFetchMessage:(EMMessage *)aMessage error:(EMError *)error{
    if (!error) {
        NSLog(@"下载成功，下载后的message是 -- %@",aMessage);
    }
}

// 向SDK中注册回调
- (void)registerEaseMobDelegate{
    // 此处先取消一次，是为了保证只将self注册过一次回调。
    [self unRegisterEaseMobDelegate];
    [[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
}

// 取消SDK中注册的回调
- (void)unRegisterEaseMobDelegate{
    [[EaseMob sharedInstance].chatManager removeDelegate:self];
}

@end
</code></pre>

#### ** 下载缩略图

在SDK收到消息时，会自动下载带有小图的消息，本方法提供，是为了在SDK自动下载失败时方便用户主动调用。

SDK中提供了三种方法

1、同步方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
EMMessage *aMessage = [[EaseMob sharedInstance].chatManager fetchMessageThumbnail:message progress:nil error:&error];
if (!error) {
    NSLog(@"缩略图下载成功，下载后的message -- %@",aMessage);
}
</code></pre>

2、block异步方法

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager asyncFetchMessageThumbnail:message progress:nil completion:^(EMMessage *aMessage, EMError *error) {
    if (!error) {
        NSLog(@"缩略图下载成功");
    }
} onQueue:nil];
</code></pre>


3、IChatManagerDelegate异步方法

<pre class="hll"><code class="language-java">
//
//  ViewController.m
//  Test
//
//  Created by dujiepeng on 12/29/14.
//  Copyright (c) 2014 dujiepeng. All rights reserved.
//

#import "ViewController.h"
#import "EaseMob.h"

@interface ViewController ()<IChatManagerDelegate>

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self registerEaseMobDelegate];
}


- (void)dealloc{
    [self unRegisterEaseMobDelegate];
}

#pragma mark - IChatManagerDelegate
// 收到消息回调
-(void)didReceiveMessage:(EMMessage *)message{
    id<IEMMessageBody> body = message.messageBodies.firstObject;
    switch (body.messageBodyType) {
        case eMessageBodyType_Image:
        case eMessageBodyType_Video:
        {
            // 当收到消息时，SDK会自动调用下载缩略图。此处在这里调用只是为了演示用。
            [[EaseMob sharedInstance].chatManager asyncFetchMessageThumbnail:message progress:nil];
        }
        break;

        default:
        break;
    }
}

// 当收到图片或视频时，SDK会自动下载缩略图，并回调该方法，如果下载失败，可以通过
// asyncFetchMessageThumbnail:progress 方法主动获取
-(void)didFetchMessageThumbnail:(EMMessage *)aMessage error:(EMError *)error{
    if (!error) {
        NSLog(@"下载缩略图成功，下载后的message是 -- %@",aMessage);
    }
}


// 向SDK中注册回调
- (void)registerEaseMobDelegate{
    // 此处先取消一次，是为了保证只将self注册过一次回调。
    [self unRegisterEaseMobDelegate];
    [[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
}

// 取消SDK中注册的回调
- (void)unRegisterEaseMobDelegate{
    [[EaseMob sharedInstance].chatManager removeDelegate:self];
}

@end
</code></pre>


## 聊天扩展功能 {#chat2}

SDK提供了一系列的聊天扩展功能，比如已送达回执、已读回执

### * 已送达回执 {#deliveryack}

该回调缺省是关闭的，需要您调用打开方法（只需要在SDK初始化后调用一次即可）

<pre class="hll"><code class="language-java">
/*!
@property
@brief 开启消息送达通知(默认是不开启的)
@discussion
*/
[[EaseMob sharedInstance].chatManager enableDeliveryNotification];
</code></pre>

SDK提供了已送达回执，当对方收到您的消息后，您会收到以下回调

<pre class="hll"><code class="language-java">
//
//  ViewController.m
//  Test
//
//  Created by dujiepeng on 12/29/14.
//  Copyright (c) 2014 dujiepeng. All rights reserved.
//

#import "ViewController.h"
#import "EaseMob.h"

@interface ViewController ()<IChatManagerDelegate>

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self registerEaseMobDelegate];
}


- (void)dealloc{
    [self unRegisterEaseMobDelegate];
}

#pragma mark - IChatManagerDelegate
//  已送达回执
-(void)didReceiveHasDeliveredResponse:(EMReceipt *)resp{
    NSLog(@"收到消息送达回执，消息接收人是 -- %@,消息id是 -- %@",resp.from,resp.chatId);
}

// 向SDK中注册回调
- (void)registerEaseMobDelegate{
    // 此处先取消一次，是为了保证只将self注册过一次回调。
    [self unRegisterEaseMobDelegate];
    [[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
}

// 取消SDK中注册的回调
- (void)unRegisterEaseMobDelegate{
    [[EaseMob sharedInstance].chatManager removeDelegate:self];
}

@end
</code></pre>

### * 已读回执 {#hasreadresponse}

已读回执需要开发者主动调用的。当用户读取消息后，由开发者主动调用方法

#### ** 发送已读回执

<pre class="hll"><code class="language-java">
//
//  ViewController.m
//  Test
//
//  Created by dujiepeng on 12/29/14.
//  Copyright (c) 2014 dujiepeng. All rights reserved.
//

#import "ViewController.h"
#import "EaseMob.h"

@interface ViewController ()<IChatManagerDelegate>

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self registerEaseMobDelegate];
}


- (void)dealloc{
    [self unRegisterEaseMobDelegate];
}

#pragma mark - IChatManagerDelegate
-(void)didReceiveMessage:(EMMessage *)message{
    // 发送已读回执.在这里写只是为了演示发送，在app中具体在哪里发送需要开发者自己决定。
    [[EaseMob sharedInstance].chatManager sendHasReadResponseForMessage:message];
}

// 向SDK中注册回调
- (void)registerEaseMobDelegate{
    // 此处先取消一次，是为了保证只将self注册过一次回调。
    [self unRegisterEaseMobDelegate];
    [[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
}

// 取消SDK中注册的回调
- (void)unRegisterEaseMobDelegate{
    [[EaseMob sharedInstance].chatManager removeDelegate:self];
}

@end
</code></pre>

#### ** 接收已读回执

<pre class="hll"><code class="language-java">
//
//  ViewController.m
//  Test
//
//  Created by dujiepeng on 12/29/14.
//  Copyright (c) 2014 dujiepeng. All rights reserved.
//

#import "ViewController.h"
#import "EaseMob.h"

@interface ViewController ()<IChatManagerDelegate>

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self registerEaseMobDelegate];
}


- (void)dealloc{
    [self unRegisterEaseMobDelegate];
}

#pragma mark - IChatManagerDelegate
-(void)didReceiveHasReadResponse:(EMReceipt *)resp{
    NSLog(@"收到已读回执，回执发送方是 -- %@, messageid是 -- %@",resp.from,resp.chatId);
}

// 向SDK中注册回调
- (void)registerEaseMobDelegate{
    // 此处先取消一次，是为了保证只将self注册过一次回调。
    [self unRegisterEaseMobDelegate];
    [[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
}

// 取消SDK中注册的回调
- (void)unRegisterEaseMobDelegate{
    [[EaseMob sharedInstance].chatManager removeDelegate:self];
}
</code></pre>

@end