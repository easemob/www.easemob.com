---
title: Android ErrorCode
secondnavhelps: true
sidebar: helpssidebar
---

## Android手机端环信SDK API常见错误码

<br/>
在Android SDK中异常机制通过错误码来判断具体错误，可以根据具体错误码查阅错误原因。

android中错误码的类为<b>EMError</b>。<br/>如：注册时用户返回已存在的错误可以这样检测：EMError.USER_ALREADY_EXISTS
<br/>具体详情[见Java Doc](http://www.easemob.com/apidoc/android/chat/)。


|EMError 常量|常量值|描述|
|---------------|------------|-------------|
|NO_ERROR | 0 |无错误|
|UNKNOWN_SERVER_ERROR| -1000 |无法识别服务器返回值|
|NONETWORK_ERROR| -1001 |网络不可用|
|DNS_ERROR| -1002 |DNS 错误|
|UNABLE_CONNECT_TO_SERVER| -1003 |无法连接到服务器|
|CONNECT_TIMER_OUT| -1004 |连接服务器超时|
|INVALID_PASSWORD_USERNAME| -1005 |用户名或密码错误|
|INVALID_KEYSTORE| -1006 |密钥认证错误|
|IO_EXCEPTION| -1007 |数据读取错误|
|INVALID_CERTIFICATE| -1008 |证书认证错误|
|ENCRYPTION_ERROR| -1009 |数据加密传输错误|
|LOGOFFINPROGRESS_ERROR| -1010 |Reserved for future usage|
|INVALID_FILE| -1011 |无效文件异常，一般文件为0字节时为无效(录制音频，在没有权限的时候会为0)|
|FILE_NOT_FOUND| -1012 |文件不存在异常|
|CONNECTION_CLOSED| -1013 |连接断开|
|CONNECTION_CONFLICT| -1014 |其他设备登陆错误|
|USER_ALREADY_EXISTS| -1015 |当前用户已存在（注册时会出现）|
|GROUP_NOT_EXIST_LOCAL| -1016 |本地不存在这个群组|
|GROUP_NOT_EXIST| -1017 |群组不存在|
|GROUP_MEMBERS_FULL| -1018 |群组成员数已满|
|GROUP_ADD_MEMBERS_TOO_MUCH| -1019 |要加入的用户人数超过剩余可加入的人数|
|GROUP_NO_PERMISSIONS| -1020 |群组权限问题|
|UNAUTHORIZED| -1021 |没有权限 （在注册授权模式下，手机端调用注册会有此问题）|
|CONNECTION_INIT_FAILED| -1022 |由于登录失败导致的初始化连接失败|
|USER_REMOVED| -1023 | 用户被删除|


<br/>
 
