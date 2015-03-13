---
title: 环信
sidebar: iossidebar
secondnavios: true
---
# 好友关系 {#buddy}

>注：环信不是好友也可以聊天，不推荐使用环信的好友机制。如果你有自己的服务器或好友关系，请自己维护好友关系。

当SDK初始化时，您可以设置是否由SDK主动帮您获取好友，如果未设置，需要您自己调用获取方法获取。
<pre class="hll"><code class="language-java">
// 登录成功后，自动去取好友列表
// SDK获取结束后，会回调
// - (void)didFetchedBuddyList:(NSArray *)buddyList error:(EMError *)error方法。
[[EaseMob sharedInstance].chatManager setIsAutoFetchBuddyList:YES];
</code></pre>

## 获取好友列表 {#getbuddylist}

获取好友列表，环信提供了四种方法。

1、同步方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
NSArray *buddyList = [[EaseMob sharedInstance].chatManager fetchBuddyListWithError:&error];
if (!error) {
    NSLog(@"获取成功 -- %@",buddyList);
}
</code></pre>

2、block异步方法

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager asyncFetchBuddyListWithCompletion:^(NSArray *buddyList, EMError *error) {
    if (!error) {
        NSLog(@"获取成功 -- %@",buddyList);
    }
} onQueue:nil];
</code></pre>

3、IChatManagerDelegate回调方法

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
    // 获取好友列表
    [[EaseMob sharedInstance].chatManager asyncFetchBuddyList];
}

-(void)dealloc{
    [self unRegisterEaseMobDelegate];
}

#pragma mark - IChatManagerDelegate
-(void)didFetchedBuddyList:(NSArray *)buddyList error:(EMError *)error{
    if (!error) {
        NSLog(@"获取成功 -- %@",buddyList);
    }
}

// 向SDK中注册回调
-(void)registerEaseMobDelegate{
    // 此处先取消一次，是为了保证只将self注册过一次回调。
    [self unRegisterEaseMobDelegate];
    [[EaseMob sharedInstance].chatManager addDelegate:self delegateQueue:nil];
}

// 取消SDK中注册的回调
-(void)unRegisterEaseMobDelegate{
    [[EaseMob sharedInstance].chatManager removeDelegate:self];
}

@end
</code></pre>

4、取内存中的值

该方法比较特殊，只有在您之前获取过好友列表的情况下才会有值，且不能保证最新。

<pre class="hll"><code class="language-java">
NSArray *buddyList = [[EaseMob sharedInstance].chatManager buddyList];
</code></pre>


## 添加好友 {#addbuddy}

环信iOS SDK提供了添加好友的方法

如果您已经发过，并且对方没有处理，您将不能再次发送

<pre class="hll"><code class="language-java">
BOOL isSuccess = [[EaseMob sharedInstance].chatManager addBuddy:@"6001" message:@"我想加您为好友" error:&error];
if (isSuccess && !error) {
    NSLog(@"添加成功");
}
</code></pre>


### 1 收到好友请求 {#receiverbuddyrequest}

当您收到好友请求，如果您没有处理，则您每次登录的时候，服务器都会给你发该请求,所以，请保证您监听回调的类和您的app一直初始化，否则可能会监听不到您离线时别人给你发的好友请求。

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
// 收到好友请求后回调
-(void)didReceiveBuddyRequest:(NSString *)username message:(NSString *)message{

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


### 2 处理好友请求 {#handlebuddyrequest}

#### 2.1 同意好友申请

<pre class="hll"><code class="language-java">
EMError *error = nil;
BOOL isSuccess = [[EaseMob sharedInstance].chatManager acceptBuddyRequest:@"8001" error:&error];
if (isSuccess && !error) {
    NSLog(@"发送同意成功");
}
</code></pre>

#### 2.2 拒绝好友申请

<pre class="hll"><code class="language-java">
EMError *error = nil;
BOOL isSuccess = [[EaseMob sharedInstance].chatManager rejectBuddyRequest:@"8001" reason:@"111111" error:&error];
if (isSuccess && !error) {
    NSLog(@"发送拒绝成功");
}
</code></pre>

#### 2.3 好友申请处理结果回调 {#handlebuddyresponse}

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
/*!
@method
@brief 好友请求被接受时的回调
@discussion
@param username 之前发出的好友请求被用户username接受了
*/
- (void)didAcceptedByBuddy:(NSString *)username{
    NSLog(@"%@同意了您的好友请求",username);
}

/*!
@method
@brief 好友请求被拒绝时的回调
@discussion
@param username 之前发出的好友请求被用户username拒绝了
*/
- (void)didRejectedByBuddy:(NSString *)username{
    NSLog(@"%@拒绝了您的好友请求",username);
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


## 删除好友 {#removebuddy}

<pre class="hll"><code class="language-java">
EMError *error = nil;
// 删除好友
BOOL isSuccess = [[EaseMob sharedInstance].chatManager removeBuddy:@"6001" removeFromRemote:YES error:&error];
if (isSuccess && !error) {
    NSLog(@"删除成功");
}
</code></pre>

*	removeBuddy:要删除的用户
*	removeFromRemote:是否将自己从对方好友列表中移除
*	error:错误信息


## 好友黑名单 {#blocklist}

环信的黑名单体系是独立的，与好友无任何关系。也就是说，您可以将任何人加入黑名单，不论他是否与您是好友关系。同时，如果您将好友好友加入黑名单，则他仍然是您的好友，只不过同时也在黑名单中。

黑名单的类型(EMRelationship)有三种，其中，两种可用。
<pre class="hll"><code class="language-java">
typedef enum{
    eRelationshipBoth  = 0, 		双向都不接受消息；
    eRelationshipFrom,				能给黑名单中的人发消息，接收不到黑名单中的人发的消息;
    eRelationshipTo,				暂不支持;
}EMRelationship;
</code></pre>


### 1 查询黑名单列表 {#searchblocklist}

查询黑名单列表，环信提供了四种方法。

1.1、同步方法

<pre class="hll"><code class="language-java">
EMError *error = nil;
NSArray *blockedList = [[EaseMob sharedInstance].chatManager fetchBlockedList:&error];
if (!error) {
    NSLog(@"获取成功 -- %@",blockedList);
}
</code></pre>

1.2、block回调方法

<pre class="hll"><code class="language-java">
[[EaseMob sharedInstance].chatManager asyncFetchBlockedListWithCompletion:^(NSArray *blockedList, EMError *error) {
    if (!error) {
        NSLog(@"获取成功 -- %@",blockedList);
    }
} onQueue:nil];
</code></pre>

1.3、IChatManagerDelegate回调方法

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

    // 获取黑名单
    [[EaseMob sharedInstance].chatManager asyncFetchBlockedList];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)dealloc{
    [self unRegisterEaseMobDelegate];
}

#pragma mark - IChatManagerDelegate
-(void)didUpdateBlockedList:(NSArray *)blockedList{
    NSLog(@"获取成功 -- %@",blockedList);
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

1.4、取内存中的值

该方法比较特殊，只有在您之前获取过黑名单列表的情况下才会有值，且不能保证最新。

<pre class="hll"><code class="language-java">
NSArray *blockedList = [[EaseMob sharedInstance].chatManager blockedList];
</code></pre>

### 2	添加黑名单 {#addblock}

当您执行添加黑名单时，该用户并不会从好友列表中移除。

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
    //	将6001加入黑名单
    EMError *error = [[EaseMob sharedInstance].chatManager blockBuddy:@"6001" 	relationship:eRelationshipBoth];
    if (!error) {
        NSLog(@"发送成功");
    }
}

- (void)dealloc{
    [self unRegisterEaseMobDelegate];
}

#pragma mark - IChatManagerDelegate
- (void)didBlockBuddy:(EMBuddy *)buddy error:(EMError **)pError{
    if (!pError) {
        NSLog(@"添加成功");
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

### 3	移出黑名单 {#removeblock}

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
    // 将6001移除黑名单
    EMError *error = [[EaseMob sharedInstance].chatManager unblockBuddy:@"6001"];
    if (!error) {
        NSLog(@"发送成功");
    }
}

- (void)dealloc{
    [self unRegisterEaseMobDelegate];
}

#pragma mark - IChatManagerDelegate
- (void)didUnblockBuddy:(EMBuddy *)buddy error:(EMError **)pError{
    if (!pError) {
        NSLog(@"移除成功");
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

