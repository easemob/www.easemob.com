---
title: iOS ErrorCode
secondnavhelps: true
sidebar: helpssidebar
---

## iOS手机端环信SDK API常见错误码

<br/>
在iOS SDK中异常机制通过错误码来判断具体错误，可以根据具体错误码查阅错误原因。

iOS中错误码的类为**EMError**。

如：注册时用户返回已存在的错误可以这样检测：error.errorCode

|EMError 常量|常量值|描述|
|---------------|------------|-------------|
|EMErrorNotFound | 404 |不存在|
|EMErrorServerMaxCountExceeded| 500 |发送失败，数量达到上限（每人最多100条离线消息，群组成员达到上线）|
|EMErrorConfigInvalidAppKey| 1000 |无效的appKey|
|EMErrorServerNotLogin| 1002 |未登录|
|EMErrorServerNotReachable| 1003 |连接服务器失败(Ex. 手机客户端无网的时候, 会返回的error)|
|EMErrorServerTimeout| 1004 |连接超时(Ex. 服务器连接超时会返回的error)|
|EMErrorServerAuthenticationFailure| 1005 |用户名或密码错误(Ex. 登录时,用户名密码错误会返回的error)|
|EMErrorServerAPNSRegistrationFailure| 1006 |APNS注册失败 (Ex. 登录时, APNS注册失败会返回的error)|
|EMErrorServerDuplicatedAccount| 1007 |注册失败(Ex. 注册时, 如果用户存在, 会返回的error)|
|EMErrorServerInsufficientPrivilege| 1008 |所执行操作的权限不够(Ex. 非管理员删除群成员时, 会返回的error)|
|EMErrorServerOccupantNotExist| 1009 |操作群组时, 人员不在此群组(Ex. remove群组成员时, 会返回的error)|
|EMErrorServerTooManyOperations| 1010 |短时间内多次发起同一异步请求(Ex. 频繁刷新群组列表, 会返回的error)|
|EMErrorServerMaxRetryCountExceeded| 1011 |已达到最大重试次数(Ex. 自动登陆情况下, 登陆不成功时的重试次数达到最大上线, 会返回的error)|
|EMErrorAttachmentNotFound| 1012 |本地未找着附件|
|EMErrorAttachmentDamaged| 1013 |文件被损坏或被修改了|
|EMErrorAttachmentUploadFailure| 1014 |文件上传失败|
|EMErrorFileTypeConvertionFailure| 1015 |文件格式转换失败|
|EMErrorFileTypeNotSupported| 1016 |不支持的文件格式|
|EMErrorIllegalURI| 1017 |URL非法(内部使用)|
|EMErrorTooManyLoginRequest| 1018 |正在登陆的时候又发起了登陆请求|
|EMErrorTooManyLogoffRequest| 1019 |正在登出的时候又发起了登出请求|
|EMErrorMessageInvalid_NULL| 1020 |无效的消息(为空)|
|EMErrorGroupInvalidID_NULL| 1021 |无效的群组ID(为空)|
|EMErrorGroupJoined| 1022 |已加入群组|
|EMErrorGroupJoinNeedRequired| 1023 | 加入群组需要申请|
|EMErrorGroupFetchInfoFailure| 1024 | 获取群组失败 |
|EMErrorGroupInvalidRequired| 1025 | 无效的群组申请|
|EMErrorInvalidUsername| 1026 |无效的username|
|EMErrorInvalidUsername_NULL| 1027 |无效的用户名(用户名为空)|
|EMErrorInvalidUsername_Chinese | 1028| 无效的用户名(用户名是中文)|
|EMErrorAudioRecordStoping| 1029 | 调用开始录音方法时，上一个录音正在stoping|
|EMErrorAudioRecordDurationTooShort| 1030 |录音时间过短|
|EMErrorAudioRecordNotStarted| 1031 |录音没有开始|
|EMErrorPushNotificationInvalidOption| 1032 |无效的消息推送设置|
|EMErrorRemoveBuddyFromRosterFailure| 1033|删除好友失败|
|EMErrorAddBuddyToRosterFailure | 1034|添加好友失败|
|EMErrorFetchBuddyListWhileFetching|1035|正在获取好友列表时, 又发起一个获取好友列表的操作时返回的errorType|
|EMErrorHasFetchedBuddyList| 1036 |获取好友列表成功后, 再次发起好友列表请求时返回的errorType|
|EMErrorCallChatterOffline | 1037 |对方不在线|
|EMErrorCallInvalidSessionId| 1038| 无效的通话Id|
|EMErrorOutOfRateLimited| 1039 | 调用频繁|
|EMErrorPermissionFailure|1040| 权限错误|
|EMErrorIsExist| 1041| 已存在|
|EMErrorInitFailure| 1042| 初始化失败|
|EMErrorNetworkNotConnected| 1043| 网络未连接|
|EMErrorFailure| 1044| EMErrorFailure|
|EMErrorFeatureNotImplemented| 1045|还未实现的功能|



