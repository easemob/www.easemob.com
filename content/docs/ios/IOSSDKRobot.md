---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# 环信小助手


## 获取小助手列表 {#fetch}

<pre class="hll"><code class="language-java">
/*!
 @property
 @brief 机器人列表(由EMRobot对象组成)
 */
@property (nonatomic, strong, readonly) NSArray *robotList;

/*!
 @method
 @brief 同步步方法, 获取机器人列表
 @param pError   出错信息
 @return         获取机器人结果
 @discussion
 这是一个阻塞方法，用户应当在一个独立线程中执行此方法，用户可以调用此方法获取所有机器人
 */
- (NSArray *)fetchRobotsFromServerWithError:(EMError **)pError;


/*!
 @method
 @brief 异步方法, 获取机器人列表
 @param completion  获取机器人列表后的回调, 回调会在主线程调用
 */
- (void)asyncFetchRobotsFromServerWithCompletion:(void (^)(NSArray *robots, EMError *error))completion;
</code></pre>