---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# 聊天

    登陆成功之后才能进行聊天操作。发消息时，单聊和群聊调用的是统一接口，区别只是要设置下message.isGroup属性。坚决不推荐多body。

## 发送消息 {#sendmessage}

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
                  progress:(id&lt;IEMChatProgressDelegate&gt;)progress
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
                       progress:(id&lt;IEMChatProgressDelegate&gt;)progress;

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
                       progress:(id&lt;IEMChatProgressDelegate&gt;)progress
                        prepare:(void (^)(EMMessage *message, EMError *error))prepare
                        onQueue:(dispatch_queue_t)aPrepareQueue
                     completion:(void (^)(EMMessage *message, EMError *error))completion
                        onQueue:(dispatch_queue_t)aCompletionQueue;
</code></pre>

## 接收离线消息 {#receiveofflinemessage}

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

## 接收在线消息 {#receiveonlinemessage}

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


## 消息未读数变化 {#unreadmessage}

<pre class="hll"><code class="language-java">
/*!
@method
@brief 未读消息数改变时的回调
@discussion 当EMConversation对象的enableUnreadMessagesCountEvent为YES时,会触发此回调
@result
*/
- (void)didUnreadMessagesCountChanged;
</code></pre>

## 解析普通消息 {#resolvemessage}

<pre class="hll"><code class="language-java">
// 收到消息的回调，带有附件类型的消息可以用SDK提供的下载附件方法下载（后面会讲到）
-(void)didReceiveMessage:(EMMessage *)message
{
    id&lt;IEMMessageBody&gt; msgBody = message.messageBodies.firstObject;
    switch (msgBody.messageBodyType) {
        case eMessageBodyType_Text:
        {
            // 收到的文字消息
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

</code></pre>

## 解析透传消息 {#resolvecmdmessage}

<pre class="hll"><code class="language-java">

-(void)didReceiveCmdMessage:(EMMessage *)cmdMessage{
    EMCommandMessageBody *body = (EMCommandMessageBody *)cmdMessage.messageBodies.lastObject;
    NSLog(@"收到的action是 -- %@",body.action);
}

</code></pre>


## 解析消息扩展属性 {#resolveext}

<pre class="hll"><code class="language-java">

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

</code></pre>

## 自动下载消息中的附件 {#downloadthumbnail}

    SDK接收到消息后，会默认下载：图片消息的缩略图，语音消息的语音，视频消息的视频第一帧。

** 请先判断你要下载附件没有下载成功之后，在调用以下下载方法，否则SDK下载方法会再次从服务器上获取附件。**

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

接口调用

<pre class="hll"><code class="language-java">

// 当收到消息时，SDK会自动调用下载缩略图。此处在这里调用只是为了演示用。
[[EaseMob sharedInstance].chatManager asyncFetchMessageThumbnail:message progress:nil];
            
</code></pre>

回调监听

<pre class="hll"><code class="language-java">

// 当收到图片或视频时，SDK会自动下载缩略图，并回调该方法，如果下载失败，可以通过
// asyncFetchMessageThumbnail:progress 方法主动获取
-(void)didFetchMessageThumbnail:(EMMessage *)aMessage error:(EMError *)error{
    if (!error) {
        NSLog(@"下载缩略图成功，下载后的message是 -- %@",aMessage);
    }
}

</code></pre>

## 下载消息中的原始附件 {#downloadmessage}

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

接口调用

<pre class="hll"><code class="language-java">

// 当message中带有附件的时候执行下载(如图片、音频、视频、文件)
[[EaseMob sharedInstance].chatManager asyncFetchMessage:message progress:nil];
            
</code></pre>

回调监听

<pre class="hll"><code class="language-java">

/*!
 @method
 @brief 收取消息体对象后的回调
 @discussion 当获取完消息体对象后,此回调会被触发;如果此消息体所在的消息对象在服务器端已被加密,那么下载完成后会自动进行解压
 @param aMessage 要获取的消息对象
 @param error        错误信息
 */
- (void)didFetchMessage:(EMMessage *)aMessage error:(EMError *)error;

</code></pre>

## 消息已送达回执 {#deliveryack}

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

/*!
 @method
 @brief 收到"已送达回执"时的回调方法
 @discussion 发送方收到接收方发送的一个收到消息的回执, 但不意味着接收方已阅读了该消息
 @param resp 收到的"已送达回执"对象, 包括 from, to, chatId等
 @result
 */
- (void)didReceiveHasDeliveredResponse:(EMReceipt *)resp;

</code></pre>

## 消息已读回执 {#hasreadresponse}

已读回执需要开发者主动调用的。当用户读取消息后，由开发者主动调用方法

### * 发送已读回执

<pre class="hll"><code class="language-java">

// 发送已读回执.在这里写只是为了演示发送，在app中具体在哪里发送需要开发者自己决定。
[[EaseMob sharedInstance].chatManager sendHasReadResponseForMessage:message];
    
</code></pre>

### * 接收已读回执

<pre class="hll"><code class="language-java">

/*!
 @method
 @brief 收到"已读回执"时的回调方法
 @discussion 发送方收到接收方发送的一个收到消息的回执, 意味着接收方已阅读了该消息
 @param resp 收到的"已读回执"对象, 包括 from, to, chatId等
 @result
 */
- (void)didReceiveHasReadResponse:(EMReceipt *)resp;

</code></pre>