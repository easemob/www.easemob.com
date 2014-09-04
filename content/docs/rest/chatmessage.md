---
title: REST API 开发指南
secondnavrest: true
sidebar: restsidebar
---


# 聊天记录

环信支持app把聊天记录通过REST接口导出

## 聊天记录数据结构

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

txt message://文本消息

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
	 
image message://图片消息

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
		
voice message://语音消息

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
		
location message://地址位置消息

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

### 图片语音文件上传、下载

环信使用REST的方式来实现语音和图片等文件的上传下载, 同时, 为了保证聊天文件的安全, 我们的API保证了一下几点:

1. 只有app的登陆用户才能够上传文件
2. 在上传文件的时候可以选择是否限制访问权限
3. 如果选择限制的话, 会在上传请求完成后返回一个secret, 只有知道这个secret, 并且是app的注册用户的人, 才能够下载文件
4. 如果选择不限制的话, 则只要是app的注册用户就能够下载
	
#### 上传语音图片
> 所需要的 HTTP Header:
* Authorization -- 获取到的token
* restrict-access -- 是否限制访问权限, 注意, 这个API并没有考虑这个属性的值, 而是有这个属性即可 .最后, 需要使用http multipart/form-data 形式

- Path : /{org_name}/{app_name}/chatfiles
- HTTP Method : POST
- Request Headers : {"restrict-access":true,"Authorization":"Bearer ${token}"}
- URL Params ： 无
- Request Body ： 
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。

#### curl示例:

<pre class="hll"><code class="language-java">
curl --verbose --header "Authorization: Bearer YWMtz1hFWOZpEeOPpcmw1FB0RwAAAUZnAv0D7y9-i4c9_c4rcx1qJDduwylRe7Y" --header "restrict-access:true" --form file=@/Users/stliu/a.jpg https://a1.easemob.com/easemob-demo/chatdemoui/chatfiles
</code></pre>

或者查看我们的[示例代码](https://github.com/easemob/emchat-server-examples)

#### Response

<pre class="hll"><code class="language-java">
{
    "action" : "post",//post请求
    "application" : "ecc6b6c0-e668-11e3-9d00-896af7b8411e",
    "params" : { },
    "path" : "/chatfiles",
    "uri" : "http://a1.easemob.com/easemob-demo/chatdemoui/chatfiles", //上传路径
    "entities" : [ {
        	"uuid" : "0c0f5f3a-e66b-11e3-8863-f1c202c2b3ae",//文件唯一id，发送消息时需要用到指定是哪个文件。
        	"type" : "chatfile",
        	"created" : 1401283318947,//创建时间
        	"modified" : 1401283318947,//修改时间
        	"file-metadata" : {
            	"content-type" : "image/jpeg",//上传类型
            	"last-modified" : 1401283319448,
            	"content-length" : 2195456//文件长度
        },
        "share-secret" : "DRGM8OZrEeO1vafuJSo2IjHBeKlIhDp0GCnFu54xOF3M6KLr" //上传成功后返回，发送消息时需要用到。
    }],
    "timestamp" : 1401283318916,
    "duration" : 1841,//上传时间
    "organization" : "easemob-demo",
    "applicationName" : "chatdemoui"
}	
</code></pre>

#### 下载图片,语音文件

这里需要注意的就是, 需要在http header中带上上面返回的 share-secret 和当前登陆用户的token才能够下载, 同时注意header中执行的accept的值需要设置成 **application/octet-stream**

<pre class="hll"><code class="language-java">
curl -O -H "share-secret: DRGM8OZrEeO1vafuJSo2IjHBeKlIhDp0GCnFu54xOF3M6KLr" --header "Authorization: Bearer YWMtz1hFWOZpEeOPpcmw1FB0RwAAAUZnAv0D7y9-i4c9_c4rcx1qJDduwylRe7Y" -H "Accept: application/octet-stream" http://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/0c0f5f3a-e66b-11e3-8863-f1c202c2b3ae
</code></pre>

### 下载缩略图  

环信支持在服务器短自动的创建图片的缩略图, 可以先下载缩略图, 当用户有需求的时候, 再下载大图

这里和下载大图唯一不同的就是heaer中多了一个"thumbnail: true", 当服务器看到过来的请求的header中包括这个的时候, 就会返回缩略图, 否则返回原始大图

<pre class="hll"><code class="language-java">
curl -O -H "thumbnail: true" -H "share-secret: DRGM8OZrEeO1vafuJSo2IjHBeKlIhDp0GCnFu54xOF3M6KLr" -H "Authorization: Bearer YWMtz1hFWOZpEeOPpcmw1FB0RwAAAUZnAv0D7y9-i4c9_c4rcx1qJDduwylRe7Y" -H "Accept: application/octet-stream" http://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/0c0f5f3a-e66b-11e3-8863-f1c202c2b3ae
</code></pre>

## 聊天消息REST API
> 以下所有API均需要企业管理员或app管理员权限才能访问。

### 取聊天记录

- Path : /{org_name}/{app_name}/chatmessages
- HTTP Method : GET
- URL Params ： 无
- Request Headers : {"Content-Type":"applicatioin/json"}
- Response Body ： 聊天记录(json),默认返回10条记录

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

#### 使用示例1：获取最新的20条记录

在url后面加上参数`ql=order by timestamp desc，limit=20`,实际使用时需要对"="后边的内容进行utf8 encode转义
		
###### curl示例

<pre class="hll"><code class="language-java">
curl -X GET -i -H "Authorization: Bearer YWMtxc6K0L1aEeKf9LWFzT9xEAAAAT7MNR_9OcNq-GwPsKwj_TruuxZfFSC2eIQ" "https://a1.easemob.com/easemob-demo/chatdemo/chatmessages?ql=order+by+timestamp+desc&limit=20"
</code></pre>

#### 使用示例2：获取某个时间段内的消息

在url后面加上参数`ql=select * where timestamp<1403164734226 and timestamp>1403166586000 order by timestamp desc`, 同上"="后的参数需要转义

###### curl示例

<pre class="hll"><code class="language-java">
curl -X GET -i -H "Authorization: Bearer YWMtxc6K0L1aEeKf9LWFzT9xEAAAAT7MNR_9OcNq-GwPsKwj_TruuxZfFSC2eIQ" "https://a1.easemob.com/easemob-demo/chatdemoui/chatmessages?ql=select+*+where+timestamp%3C1403164734226+and+timestamp%3E1403163586000+order+by+timestamp+desc"
</code></pre>

#### 使用示例3：分页获取数据

使用limit参数获取数据完毕后，如果后边还有数据，会返回一个不为空的cursor回来，使用这个cursor就能进行分页获取了。

分页示例：根据之前获取数据返回的cursor继续获取后面的20条数据。在url后面加上参数

<pre class="hll"><code class="language-java">
ql=order by timestamp desc
limit=20
cursor=MTYxOTcyOTYyNDpnR2tBQVFNQWdHa0FCZ0ZHczBKN0F3Q0FkUUFRYUdpdkt2ZU1FZU9vNU4zVllyT2pqUUNBZFFBUWFHaXZJUGVNRWVPMjdMRWo5b0w4dEFB
</code></pre>

同上参数需要转义

###### curl示例

<pre class="hll"><code class="language-java">
curl -X GET -i -H "Authorization: Bearer YWMtxc6K0L1aEeKf9LWFzT9xEAAAAT7MNR_9OcNq-GwPsKwj_TruuxZfFSC2eIQ" "https://a1.easemob.com/easemob-demo/chatdemoui/chatmessages?ql=select+*+order+by+timestamp+desc&limit=10&cursor=MTYxOTcyOTYyNDpnR2tBQVFNQWdHa0FCZ0ZHczFuSG93Q0FkUUFROW94S0lQZVBFZU9mTEQxQWVMdHEyQUNBZFFBUTlvd2pFUGVQRWVPaHFWa1l0ZjA2dEFB"
</code></pre>

