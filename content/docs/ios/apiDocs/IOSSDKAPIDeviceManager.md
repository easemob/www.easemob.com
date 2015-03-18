---
title: 环信
sidebar: iossidebar
secondnavios: true
---

# EMDeviceManager

## device manager {#manager}

* IDeviceManager.h: EMDeviceManager实现的接口类的集合。不同模块提供了不同的接口，不同模块的接口在[internal](http://www.easemob.com/docs/ios/apiDocs/IOSSDKAPIDeviceManager/#internal)中有详细介绍；

* EMDeviceManagerDefs.h: 关于device manager的枚举类型的定义。

## delagates {#delegates}

* [EMDeviceManagerDelegate.h](): DeviceManager的所有delegate的集合，不同模块有不同的回调接口类；

* [EMDeviceManagerMediaDelegate.h](): 录制和播放音频相关的回调类；

* [EMDeviceManagerNetworkDelegate.h](): 网络相关的回调类；

* [EMDeviceManagerProximitySensorDelegate.h](): 距离传感器相关的回调类。

## internal {#internal}

* [IDeviceManagerCamera.h](): 摄像头相关的接口类；

* [IDeviceManagerDevice.h](): 设备信息相关的接口类；

* [IDeviceManagerMedia.h](): 录制和播放音频相关的接口类；

* [IDeviceManagerProximitySensor.h](): 距离传感器相关的接口类