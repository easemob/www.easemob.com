---
title: WebIM 开发指南
sidebar: webimsidebar
secondnavwebim: true
---

# 集成方式

1.下载WEB-IM-SDK.zip加压后需将easymob-webim-SDK1.0目录下相关js文件拷贝到系统相应的目录下。

2.引入全部js

	<script type="text/javascript" src="jquery-1.11.1.js"></script>
	<script type='text/javascript' src='strophe-custom-1.0.0.js'></script>
	<script type='text/javascript' src='json2.js'></script>

然后按以下步骤创建连接

### 1.创建连接
	var conn = new Easemob.im.Connection();

### 2.初始化连接
	conn.init({        
		onOpened : function() {        },        
		onClosed : function() {        },        
		onTextMessage : function(message) {        },        onEmotionMessage : function(message) {        },        onPictureMessage : function(message) {         },        onAudioMessage : function(message) {        },        
		onPresence : function (message){        },        
		onRoster : function (message){        },        
		onError : function(e) {        }    
	});

### 3.打开连接
	conn.open({user:’’,pwd:’’,appKey:’’})

