---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# EMCallManager

## call manager {#manager}

* ICallManager.h: EMCallManager实现的接口类的集合。不同模块提供了不同的接口，不同模块的接口在[internal](http://www.easemob.com/docs/ios/apiDocs/IOSSDKAPICallManager/#internal)中有详细介绍；

* EMCallServiceDefs.h: 关于call manager的枚举类型的定义。

## delagates {#delegates}

* [EMCallManagerDelegate.h](): CallManager的所有delegate的集合，不同模块有不同的回调接口类；

* [EMCallManagerCallDelegate.h](): 实时语音模块的回调接口类。

## internal {#internal}

* [ICallManagerCall.h](): 实时语音模块的接口。

## type {#type}

* [EMCallSession.h](): 实时语音实例的模型类。