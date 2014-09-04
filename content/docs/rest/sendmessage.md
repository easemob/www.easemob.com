---
title: REST API 开发指南
secondnavrest: true
sidebar: restsidebar
---

# 聊天相关API

### 查看用户在线状态
> 查看一个用户的在线状态

- Path : /{org}/{app}/users/{username}/status
- HTTP Method : GET
- URL Params ： 无
- Request Headers : {"Content-Type":"applicatioin/json"}
- Request Body ： 无
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。

#### curl示例：
	
<pre class="hll"><code class="language-java">
curl -X GET -i -H "Authorization: Bearer YWMtxc6K0L1aEeKf9LWFzT9xEAAAAT7MNR_9OcNq-GwPsKwj_TruuxZfFSC2eIQ" "https://a1.easemob.com/easemob-demo/chatdemoui/users/zw123/status"
</code></pre>

#### Response： 

<pre class="hll"><code class="language-java">
{
    "action": "get",
    "application": "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
    "params": {},
    "uri": "https://a1.easemob.com/easemob-demo/chatdemoui",
    "entities": [],
    "data": {
        "stliu": "online"  //注意, 这里返回的是用户名和在线状态的键值对, 值为 online 或者 offline
    },
    "timestamp": 1404932199220,
    "duration": 743,
    "organization": "easemob-demo",
    "applicationName": "chatdemoui"
}
</code></pre>
        
### 发送消息
> 给一个或者多个用户, 或者一个或者多个群组发送消息, 并且通过可选的_from_字段让接收方看到发送方是不同的人,同时, 支持扩展字段, 通过_ext_属性, app可以发送自己专属的消息结构.

- Path : /{org}/{app}/messages
- Request Method : POST
- URL Params ： 无
- Request Headers : {"Content-Type":"applicatioin/json"}
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- Request Body ：

<pre class="hll"><code class="language-java">
{
    "target_type" : "users", //or chatgroups
    "target" : ["u1", "u2", "u3"], //注意这里需要用数组, 即使只有一个用户, 也要用数组 ['u1']
    "msg" : {
        "type" : "txt",
        "msg" : "hello from rest" //消息内容，参考[聊天记录](http://developer.easemob.com/docs/emchat/rest/chatmessage.html)里的bodies内容
        },
    "from" : "jma2", //表示这个消息是谁发出来的, 可以没有这个属性, 那么就会显示是admin, 如果有的话, 则会显示是这个用户发出的    
    "ext" : { //扩展属性, 由app自己定义
        "attr1" : "v1",
        "attr2" : "v2"
    }    
}
</code></pre>

#### curl示例

<pre class="hll"><code class="language-java">
curl -X POST -i -H "Authorization: Bearer YWMtxc6K0L1aEeKf9LWFzT9xEAAAAT7MNR_9OcNq-GwPsKwj_TruuxZfFSC2eIQ" "https://a1.easemob.com/easemob-demo/chatdemoui/messages" -d '{"target_type" : "users","target" : ["stliu1", "jma3", "stliu", "jma4"],"msg" : {"type" : "txt","msg" : "hello from rest"},"from" : "jma2", "ext" : {"attr1" : "v1","attr2" : "v2"} }'
</code></pre>

#### Response：

<pre class="hll"><code class="language-java">
{
    "action": "post",
    "application": "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
    "params": {},
    "uri": "https://a1.easemob.com/easemob-demo/chatdemoui",
    "entities": [],
    "data": {
        "stliu1": "success",
        "jma3": "success",
        "stliu": "success",
        "jma4": "success"
    },
    "timestamp": 1404932446668,
    "duration": 110,
    "organization": "easemob-demo",
    "applicationName": "chatdemoui"
}
</code></pre>

## 群组相关API

## 获取app中所有的群组

<pre class="hll"><code class="language-java">
GET /{org}/{app}/chatgroups
</code></pre>

##### Response

<pre class="hll"><code class="language-java">
{
    "action": "get",
    "application": "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
    "params": {},
    "uri": "https://a1.easemob.com/easemob-demo/chatdemoui",
    "entities": [],
    "data": [
        {
            "groupid": "1404705934830"
        },
        {
            "groupid": "1404114807341"
        },
        {
            "groupid": "1404268812888"
        }    ],
    "timestamp": 1404932824158,
    "duration": 3551,
    "organization": "easemob-demo",
    "applicationName": "chatdemoui",
    "count": 0
}
</code></pre>             

## 创建一个群组

<pre class="hll"><code class="language-java">
POST /chatgroups {}
</code></pre>

参数

<pre class="hll"><code class="language-java">
{
    "groupname":"testrestgrp12", //群组名称, 此属性为必须的
    "desc":"server create group", //群组描述, 此属性为必须的
    "public":true, //是否是公开群, 此属性为必须的
    "approval":true, //加入公开群是否需要批准, 没有这个属性的话默认是true, 此属性为可选的
    "owner":"jma1", //群组的管理员, 此属性为必须的
    "members":["jma2","jma3"] //群组成员,此属性为可选的
}
</code></pre>

返回值 

<pre class="hll"><code class="language-java">
{"groupid":"1404882944671671"} //返回群组id
</code></pre>

## 删除群组

<pre class="hll"><code class="language-java">
DELETE /chatgroups/{group_id}
</code></pre>

返回值:

<pre class="hll"><code class="language-java">
{
    "action": "delete",
    "application": "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
    "params": {},
    "uri": "http://localhost:8080/easemob-demo/chatdemoui",
    "entities": [],
    "data": {
        "success": true,
        "groupid": "1404928094479135"
    },
    "timestamp": 1404928958752,
    "duration": 11311,
    "organization": "easemob-demo",
    "applicationName": "chatdemoui"
}
</code></pre>

## 获取群组中的所有成员

<pre class="hll"><code class="language-java">
GET /chatgroups/{group_id}/users
</code></pre>

## 在群组中添加一个人

<pre class="hll"><code class="language-java">
POST /chatgroups/{group_id}/users/{username}
</code></pre>

## 在群组中减少一个人

<pre class="hll"><code class="language-java">
DELETE /chatgroups/{group_id}/users/{username}
</code></pre>