---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# 错误列表

SDK中对应头文件 EMErrorDefs.h，请根据类型去判断错误，不要根据数字去判断

iOS中错误码的类为**EMError**。

如：注册时用户返回已存在的错误可以这样检测：error.errorCode

|               类型                     |           描述            |
|:------------------------------------- | -------------------------|
| EMErrorNotFound                       | 不存在                     |
| EMErrorServerMaxCountExceeded         | 数量达到上限                |
| EMErrorConfigInvalidAppKey            | 无效的appKey               |
| EMErrorServerNotLogin                 | 未登录                     |
| EMErrorServerNotReachable             | 连接服务器失败(Ex. 手机没网)  |
| EMErrorServerTimeout                  | 连接超时                    |
| EMErrorServerAuthenticationFailure    | 获取token失败               |
| EMErrorServerAPNSRegistrationFailure  | APNS注册失败                |
| EMErrorServerDuplicatedAccount        | 用户已存在                  |
| EMErrorServerInsufficientPrivilege    | 所执行操作的权限不够          |
| EMErrorServerOccupantNotExist         | 操作群组时, 人员不在此群组     |
| EMErrorServerTooManyOperations        | 短时间内多次发起同一请求       |
| EMErrorAttachmentNotFound             | 本地未找着附件               |
| EMErrorAttachmentDamaged              | 文件被损坏或被修改了          |
| EMErrorAttachmentUploadFailure        | 文件上传失败                 |
| EMErrorFileTypeConvertionFailure      | 文件格式转换失败              |
| EMErrorFileTypeNotSupported           | 不支持的文件格式              |
| EMErrorIllegalURI                     | URL非法                     |
| EMErrorMessageInvalid_NULL            | 无效的消息(为空)              |
| EMErrorGroupInvalidID_NULL            | 无效的群组ID(为空)           |
| EMErrorGroupJoined                    | 已加入群组                   |
| EMErrorGroupJoinNeedRequired          | 加入群组需要申请                      |
| EMErrorGroupFetchInfoFailure          | 获取群组失败                          |
| EMErrorGroupInvalidRequired           | 无效的群组申请                         |
| EMErrorGroupInvalidSubject_NULL       | 无效的群主题（为空）                   |
| EMErrorInvalidUsername                | 无效的username                       |
| EMErrorInvalidUsername_NULL           | 无效的用户名(用户名为空)                |
| EMErrorInvalidUsername_Chinese        | 无效的用户名(用户名是中文)              |
| EMErrorAudioRecordStoping             | 调用开始录音方法时，上一个录音正在stoping |
| EMErrorAudioRecordDurationTooShort    | 录音时间过短                          |
| EMErrorAudioRecordNotStarted          | 录音没有开始                          |
| EMErrorPushNotificationInvalidOption  | 无效的消息推送设置                     |
| EMErrorRemoveBuddyFromRosterFailure   | 删除好友失败                          |
| EMErrorAddBuddyToRosterFailure        | 添加好友失败                          |
| EMErrorHasFetchedBuddyList            | 获取好友列表成功后, 再次发起好友列表      |
| EMErrorCallChatterOffline             | 对方不在线                            |
| EMErrorCallInvalidSessionId           | 无效的通话Id                          |
| EMErrorExisted                        | 已存在                               |
| EMErrorInitFailure                    | 初始化失败                            |
| EMErrorNetworkNotConnected            | 网络未连接                            |
| EMErrorFailure                        | 失败                                 |
| EMErrorFeatureNotImplemented          | 还未实现的功能                         |
| EMErrorRequestRefused                 | 申请失效                              |