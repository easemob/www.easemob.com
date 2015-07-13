---
title: 环信
sidebar: iossidebar
secondnavios: true
---

## 实时通话


## 配置工程 {#configProject}

使用libEaseMobClientSDK.a, 包含头文件#import"EaseMob.h", 
调用方式：[EaseMob sharedInstance].callManager


## 实时语音接口 {#callAudioApi}

关于实时语音的接口如下：

<pre class="hll"><code class="language-objective_c">	

/*!
@method
@brief  将实时语音静音
@param sessionId  要进行的实时通话的ID
@param isSilence  是否静音
@result           错误信息
@discussion
*/
- (EMError *)markCallSession:(NSString *)sessionId
asSilence:(BOOL)isSilence;

/*!
@method
@brief  进行实时语音
@param chatter  要进行语音通话的username（不能与自己通话）
@param timeout  超时时间（传0，使用SDK默认超时时间）
@param pError   检查语音通话条件是否具备，不具备则返回错误信息（未进行实际的拨打动作）
@result         语音通话的实例
@discussion     需监听[callSessionStatusChanged:changeReason:error:]
*/
- (EMCallSession *)asyncMakeVoiceCall:(NSString *)chatter
timeout:(NSUInteger)timeout
error:(EMError **)pError;

</code></pre>

## 实时视频通话接口 {#callVideoApi}

<pre class="hll"><code class="language-objective_c">
/*!
@method
@brief  进行实时视频
@param chatter  要进行视频通话的username（不能与自己通话）
@param timeout  超时时间（传0，使用SDK默认超时时间）
@param pError   检查视频通话条件是否具备，不具备则返回错误信息（未进行实际的拨打动作）
@result         视频通话的实例
@discussion     需监听[callSessionStatusChanged:changeReason:error:]
*/
- (EMCallSession *)asyncMakeVideoCall:(NSString *)chatter
                              timeout:(NSUInteger)timeout
                                error:(EMError **)pError;

/*!
@method
@brief  实时视频传送摄像头数据
@param data     摄像头数据，必须是待编码的yuv数据
@param width    图像的宽
@param height   图像的高
*/
- (void)processPreviewData:(char *)data
                     width:(int)width
                    height:(int)height;
                    
/*!
 @method
 @brief  获取实时视频的延迟ms，实时变化
 */
- (int)getVideoTimedelay;

/*!
 @method
 @brief  获取实时视频的帧率，实时变化
 */
- (int)getVideoFramerate;

/*!
 @method
 @brief  获取实时视频时，每100包丢失的包数，实时变化
 */
- (int)getVideoLostcnt;

/*!
 @method
 @brief  获取实时视频的宽度，固定值，不会实时变化
 */
- (int)getVideoWidth;

/*!
 @method
 @brief  获取实时视频的高度，固定值，不会实时变化
 */
- (int)getVideoHeight;

/*!
 @method
 @brief  获取对方实时视频的比特率kbps，实时变化
 */
- (int)getVideoRemoteBitrate;

/*!
 @method
 @brief  获取本地实时视频的比特率kbps，实时变化
 */
- (int)getVideoLocalBitrate;
- 
</code></pre>

## 实时通话通用接口及回调 {#callApi}

关于实时通话通用接口如下：

<pre class="hll"><code class="language-objective_c">	

/*!
@method
@brief  接收方同意语音通话的请求
@param sessionId 要进行的语音通话的ID
@result          检查语音通话条件是否具备，不具备则返回错误信息（未进行实际的拨打动作）
@discussion      需监听[callSessionStatusChanged:changeReason:error:]
*/
- (EMError *)asyncAnswerCall:(NSString *)sessionId;

/*!
@method
@brief  发起方或接收方结束通话
@param sessionId 要进行的语音通话的ID
@param reason    结束原因
@result          检查挂断语音通话条件是否具备，不具备则返回错误信息
@discussion      需监听[callSessionStatusChanged:changeReason:error:]
*/
- (EMError *)asyncEndCall:(NSString *)sessionId
reason:(EMCallStatusChangedReason)reason;

</code></pre>


关于实时通话的回调如下

<pre class="hll"><code class="language-objective_c">	

- (void)callSessionStatusChanged:(EMCallSession *)callSession
                    changeReason:(EMCallStatusChangedReason)reason
                           error:(EMError *)error;

</code></pre>

具体功能实现见demo