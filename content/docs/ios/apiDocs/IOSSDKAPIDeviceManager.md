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

* [EMDeviceManagerDelegate.h]((http://www.easemob.com/apidoc/ios/chat/EMDeviceManagerDelegate_h/index.html): DeviceManager的所有delegate的集合，不同模块有不同的回调接口类；

* [EMDeviceManagerMediaDelegate.h]((http://www.easemob.com/apidoc/ios/chat/EMDeviceManagerMediaDelegate_h/index.html): 录制和播放音频相关的回调类；

* [EMDeviceManagerNetworkDelegate.h]((http://www.easemob.com/apidoc/ios/chat/EMDeviceManagerNetworkDelegate_h/index.html): 网络相关的回调类；

* [EMDeviceManagerProximitySensorDelegate.h]((http://www.easemob.com/apidoc/ios/chat/EMDeviceManagerProximitySensorDelegate_h/index.html): 距离传感器相关的回调类。

## internal {#internal}

* [IDeviceManagerCamera.h]((http://www.easemob.com/apidoc/ios/chat/IDeviceManagerCamera_h/index.html): 摄像头相关的接口类；

* [IDeviceManagerDevice.h]((http://www.easemob.com/apidoc/ios/chat/IDeviceManagerDevice_h/index.html): 设备信息相关的接口类；

* [IDeviceManagerMedia.h]((http://www.easemob.com/apidoc/ios/chat/IDeviceManagerMedia_h/index.html): 录制和播放音频相关的接口类；

* [IDeviceManagerProximitySensor.h]((http://www.easemob.com/apidoc/ios/chat/IDeviceManagerProximitySensor_h/index.html): 距离传感器相关的接口类