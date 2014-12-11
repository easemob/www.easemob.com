---
title: REST API 开发指南
secondnavrest: true
sidebar: restsidebar
---


# 聊天记录

环信支持app把聊天记录通过REST接口导出

## 聊天记录数据结构 {#schema}

<pre class="hll"><code class="language-java">
{
    "type": "chatmessage",
    "from": "zw123", //发送人username
    "msg_id": "5I02W-16-8278a", //消息id
    "chat_type": "chat" //用来判断单聊还是群聊。chat:单聊，groupchat:群聊
    "payload": {
        "bodies": [ //消息bodies
          {
             "msg": "hhhhhh", //消息内容
             "type": "txt" //消息类型。txt:文本消息, img:图片, loc：位置, audio：语音
    		 "length": 3, //语音时长，单位为秒，这个属性只有语音消息有
             "url": "", //图片语音等文件的网络url，图片和语音消息有这个属性
             "filename": "22.png", //文件名字，图片和语音消息有这个属性
             "secret": "pCY80PdfEeO4Jh9URCOfMQWU9QYsJytynu4n-yhtvAhmt1g9", //获取文件的secret，图片和语音消息有这个属性
    		 "lat": 39.983805, //发送的位置的纬度，只有位置消息有这个属性
             "lng": 116.307417, //位置经度，只有位置消息有这个属性
             "addr": "北京市海淀区北四环西路66号" //位置消息详细地址，只有位置消息有这个属性
          }
        ]
    	   "ext": { //自定义扩展属性
           "key1": "value1",   //你设置的key和value的值
    		   ...
         },
    },
    "timestamp": 1403099033211, //消息发送时间
    "to": "1402541206787" //接收人的username或者接收group的id
}
</code></pre>

### 文本类型消息

<pre class="hll"><code class="language-java">
{  
    "from":"test2",
    "to":"test1",
    "bodies":[{
        "type":"txt"//文本消息类型
        ,"msg":"hello from test2"//消息内容
     }]
}
</code></pre>
	 
### 图片类型消息

<pre class="hll"><code class="language-java">
{  
    "from":"test1",
    "to":"test2",
    "bodies":[{
    	"type":"img",//图片消息类型
    	"url":"https://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/65e54a4a-fd0b-11e3-b821-ebde7b50cc4b",//上传图片消息地址,在上传图片成功后会返回uuid
    	"filename":"test1.jpg",//图片名称
    	"thumb":"https://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/496334fa-f53f-11e3-9eb7-4fbb06ff7876",//上传缩略图地址
    	"secret":"DRGM8OZrEeO1vafuJSo2IjHBeKlIhDp0GCnFu54xOF3M6KLr",//secret在上传图片后会返回，只有含有secret才能够下载此图片
    	"thumb_secret":"DRGM8OZrEeO1vafuJSo2IjHBeKlIhDp0GCnFu54xOF3M6KLr"//thumb_secret在上传缩略图后会返回，
    }]
}
</code></pre>
		
### 语音类型消息

<pre class="hll"><code class="language-java">
{  
    "from":"test2",
    "to":"test1",
    "bodies":[{
    	"type":"audio",//语音消息类型
    	"url":"https://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/0637e55a-f606-11e3-ba23-51f25fd1215b",//上传语音远程地址，在上传语音后会返回uuid
    	"filename":"test1.amr",//语音名称
    	"length":10, //语音时间（单位秒）
    	"secret":"DRGM8OZrEeO1vafuJSo2IjHBeKlIhDp0GCnFu54xOF3M6KLr"//secret在上传文件后会返回
    }]
}
</code></pre>
		
### 地址位置类型消息

<pre class="hll"><code class="language-java">
{
    "from":"test1",
    "to":"test2",
    "bodies":[{
        "type":"loc",//位置消息类型
        "addr":"西城区西便门桥 ",//要发送的地址
        "lat":39.9053,//纬度
        "lng":116.36302//经度
     }]
}
</code></pre>


## 导出聊天记录 {#export-message}

> 以下所有API均需要企业管理员或app管理员权限才能访问。

### 取聊天记录

- Path : /{org_name}/{app_name}/chatmessages
- HTTP Method : GET
- URL Params ： 无
- Request Headers :  {“Content-Type”:”application/json”,”Authorization”:”Bearer ${token}”}
- Response Body ： 聊天记录(json),默认返回10条记录
- 可能的错误码： <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

<pre class="hll"><code class="language-java">
{
	....
	count : 10, //返回的数量
	cursor : "asdsdfaee" //游标，用于分页查询
	entities : [
		{
		聊天记录entity
		}
		...
	]
	....
}	
</code></pre>

#### 使用示例1：获取某个时间段内的消息

在url后面加上参数`ql=select * where timestamp<1403164734226 and timestamp>1403166586000`, 同上"="后的参数需要转义

###### curl 示例：

<pre class="hll"><code class="language-java">
curl -X GET -i -H "Authorization: Bearer YWMtxc6K0L1aEeKf9LWFzT9xEAAAAT7MNR_9OcNq-GwPsKwj_TruuxZfFSC2eIQ" "https://a1.easemob.com/easemob-demo/chatdemoui/chatmessages?ql=select+*+where+timestamp%3C1403164734226+and+timestamp%3E1403163586000"
</code></pre>

#### 使用示例2：分页获取数据

使用limit参数获取数据完毕后，如果后边还有数据，会返回一个不为空的cursor回来，使用这个cursor就能进行分页获取了。

分页示例：根据之前获取数据返回的cursor继续获取后面的20条数据。在url后面加上参数

<pre class="hll"><code class="language-java">
limit=20
cursor=MTYxOTcyOTYyNDpnR2tBQVFNQWdHa0FCZ0ZHczBKN0F3Q0FkUUFRYUdpdkt2ZU1FZU9vNU4zVllyT2pqUUNBZFFBUWFHaXZJUGVNRWVPMjdMRWo5b0w4dEFB
</code></pre>

同上参数需要转义

###### curl 示例：

<pre class="hll"><code class="language-java">
curl -X GET -i -H "Authorization: Bearer YWMtxc6K0L1aEeKf9LWFzT9xEAAAAT7MNR_9OcNq-GwPsKwj_TruuxZfFSC2eIQ" "https://a1.easemob.com/easemob-demo/chatdemoui/chatmessages?limit=10&cursor=MTYxOTcyOTYyNDpnR2tBQVFNQWdHa0FCZ0ZHczFuSG93Q0FkUUFROW94S0lQZVBFZU9mTEQxQWVMdHEyQUNBZFFBUTlvd2pFUGVQRWVPaHFWa1l0ZjA2dEFB"
</code></pre>


### 获取未读消息数 {#msgcount}
> 获取一个IM用户的未读消息数

- Path : /{org_name}/{app_name}/users/{owner_username}/offline_msg_count
- HTTP Method : GET
- URL Params : 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ： "data" : {"v3y0kf9arx" : 0 }      ----  用户名：v3y0kf9arx ，未读消息数：0条
- 可能的错误码： <br/>
404 （此用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 
    
#### curl 示例：

<pre class="hll"><code class="language-java">
curl -X GET -H "Authorization: Bearer YWMtwIRGSE9gEeSbpNnVBsIhiwAAAUon2XDyEBoBUk6Vg2xm8DZdVjxbhwm7XWY" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/users/v3y0kf9arx/offline_msg_count"
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "get",
  "uri" : "http://a1.easemob.com/easemob-demo/chatdemoui/users/v3y0kf9arx/offline_msg_count",
  "entities" : [ ],
  "data" : {
    "v3y0kf9arx" : 0
  },
  "timestamp" : 1412823831894,
  "duration" : 57
}
</code></pre>


