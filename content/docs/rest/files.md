---
title: REST API 文件上传下载
secondnavrest: true
sidebar: restsidebar
---

## 图片语音文件上传、下载

环信使用REST的方式来实现语音和图片等文件的上传下载, 同时, 为了保证聊天文件的安全, 我们的API保证了一下几点:

1. 只有app的登陆用户才能够上传文件
2. 在上传文件的时候可以选择是否限制访问权限
3. 如果选择限制的话, 会在上传请求完成后返回一个secret, 只有知道这个secret, 并且是app的注册用户的人, 才能够下载文件
4. 如果选择不限制的话, 则只要是app的注册用户就能够下载
	
#### 上传语音图片 {#upload}
> 所需要的 HTTP Header:
* Authorization -- 获取到的token
* restrict-access -- 是否限制访问权限, 注意, 这个API并没有考虑这个属性的值, 而是有这个属性即可 .最后, 需要使用http multipart/form-data 形式

- Path : /{org_name}/{app_name}/chatfiles
- HTTP Method : POST
- Request Headers : {"restrict-access":true,"Authorization":"Bearer ${token}"}
- URL Params ： 无
- Request Body ：文件表单项    [参考](http://www.w3school.com.cn/tags/tag_input.asp)
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

#### 下载图片,语音文件 {#download}

这里需要注意的就是, 需要在http header中带上上面返回的 share-secret 和当前登陆用户的token才能够下载, 同时注意header中执行的accept的值需要设置成 **application/octet-stream**

<pre class="hll"><code class="language-java">
curl -O -H "share-secret: DRGM8OZrEeO1vafuJSo2IjHBeKlIhDp0GCnFu54xOF3M6KLr" --header "Authorization: Bearer YWMtz1hFWOZpEeOPpcmw1FB0RwAAAUZnAv0D7y9-i4c9_c4rcx1qJDduwylRe7Y" -H "Accept: application/octet-stream" http://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/0c0f5f3a-e66b-11e3-8863-f1c202c2b3ae
</code></pre>

### 下载缩略图 {#thumbinal}  

环信支持在服务器端自动的创建图片的缩略图, 可以先下载缩略图, 当用户有需求的时候, 再下载大图

这里和下载大图唯一不同的就是header中多了一个"thumbnail: true", 当服务器看到过来的请求的header中包括这个的时候, 就会返回缩略图, 否则返回原始大图

<pre class="hll"><code class="language-java">
curl -O -H "thumbnail: true" -H "share-secret: DRGM8OZrEeO1vafuJSo2IjHBeKlIhDp0GCnFu54xOF3M6KLr" -H "Authorization: Bearer YWMtz1hFWOZpEeOPpcmw1FB0RwAAAUZnAv0D7y9-i4c9_c4rcx1qJDduwylRe7Y" -H "Accept: application/octet-stream" http://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/0c0f5f3a-e66b-11e3-8863-f1c202c2b3ae
</code></pre>
