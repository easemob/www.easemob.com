---
title: REST API 开发指南
secondnavrest: true
sidebar: restsidebar
---

# 聊天室管理

环信提供了REST API 来管理app中的聊天室


## 聊天室数据结构 {#schema}

| 名称              |     类型        |       描述             |
|------------------|:----------------:|--------------------- |
| id        |  String       |  聊天室D, 聊天室唯一标识符 ， 由环信服务器生成 。 |
| name      |  String       | 聊天室名称 ，任意字符串 |
| description    |  String | 聊天室描述 ，任意字符串 |
| maxusers         |  Integer  | 聊天室成员上限，创建聊天室的时候设置，可修改  |
| affiliations_count | Integer | 现有成员总数  |
| affiliations     |  Array | 现有成员列表, 包含了owner和member, 例如 "affiliations":[{"owner": "13800138001"},{"member":"v3y0kf9arx"},{"member":"xc6xrnbzci"}]  |
| owner            |  String | 聊天室创建者的username， 例如：{"owner": "13800138001"} |
| member           |  String | 聊天室成员的username ， 例如： {"member":"xc6xrnbzci"} |




## 创建聊天室 {#createchatrooms}
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/chatrooms
- HTTP Method : POST
- URL Params ： 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ：<br>

<pre class="hll"><code class="language-java">
{
	"name":"testchatroom", //聊天室名称, 此属性为必须的<br>
	"description":"server create chatroom", //聊天室描述, 此属性为必须的<br>
	"maxusers":300, //聊天室成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的<br>
	"owner":"jma1", //聊天室的管理员, 此属性为必须的<br>
	"members":["jma2","jma3"] //聊天室成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）<br>
}

</code></pre>
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码：  <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

##### curl示例：

<pre class="hll"><code class="language-java">
curl -X POST 'https://a1.easemob.com/easemob-demo/chatdemoui/chatrooms' -H 'Authorization: Bearer YWMtP_8IisA-EeK-a5cNq4Jt3QAAAT7fI10IbPuKdRxUTjA9CNiZMnQIgk0LEUE' -d '{"name":"testchatroom","description":"server create chatroom","owner":"jma1","maxusers":300,"members":["ceshia"]}'

</code></pre>

##### Response 示例：

<pre class="hll"><code class="language-java">
{
    "action": "post",
    "application": "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
    "uri": "https://a1.easemob.com/easemob-demo/chatdemoui",
    "entities": [],
    "data": {
        "id": "1432289956668375"
    },
    "timestamp": 1432289956589,
    "duration": 85,
    "organization": "easemob-demo",
    "applicationName": "chatdemoui"
}
</code></pre>


## 修改聊天室信息 {#updatechatrooms}


>修改成功的数据行会返回true,失败为false. 请求body只接收name，description，maxusers　三个属性，传其他字段会被忽略．

> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/chatrooms/{chatroom_id}
- HTTP Method : PUT
- URL Params ： 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： 

<pre class="hll"><code class="language-java">

   {
    "name":"test chatroom", //聊天室名称 
    "description":"update chatroominfo", //聊天室描述 
    "maxusers":200, //聊天室成员最大数(包括群主), 值为数值类型
   } 
    
</code></pre>

- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （此聊天室id不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

##### curl示例：

<pre class="hll"><code class="language-java">
curl -X PUT 'https://a1.easemob.com/easemob-demo/chatdemoui/chatrooms/1432259621444159' -H 'Authorization: Bearer YWMtG4T5wkOTEeST5V-9lp7f-wAAAUnafsqrQFnC3U4gI0-rQImw4523fWqIrXI8' -d '{"name":"test chatroom","description":"update chatroominfo","maxusers":200}'
</code></pre>

##### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "put",
  "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui",
  "entities" : [ ],
  "data" : {
    "maxusers" : true,
    "name" : true,
    "description" : true
  },
  "timestamp" : 1432269159287,
  "duration" : 14,
  "organization" : "easemob-demo",
  "applicationName" : "chatdemoui"
}
</code></pre>

## 删除聊天室 {#deletechatroom}
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/chatrooms/{chatroom_id}
- HTTP Method : DELETE
- URL Params ： 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ：无
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码：  <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

##### curl示例：

<pre class="hll"><code class="language-java">
curl -X DELETE 'https://a1.easemob.com/easemob-demo/chatdemoui/chatrooms/1432259621444159' -H 'Authorization: Bearer YWMtG4T5wkOTEeST5V-9lp7f-wAAAUnaf3sqrQFnCU4gI0-rQImw45TXUWSIrXI8'
</code></pre>

##### Response 示例：

<pre class="hll"><code class="language-java">
{
    "action": "delete",
    "application": "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
    "uri": "https://a1.easemob.com/easemob-demo/chatdemoui",
    "entities": [],
    "data": {
        "success": true,
        "id": "1432289956668375"
    },
    "timestamp": 1432290072350,
    "duration": 146,
    "organization": "easemob-demo",
    "applicationName": "chatdemoui"
}
</code></pre>


## 获取app中所有的聊天室 {#getallchatrooms}

> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path :/{org_name}/{app_name}/chatrooms
- HTTP Method : GET
- URL Params ： 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ：无
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码：  <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

##### curl示例：

<pre class="hll"><code class="language-java">
curl -X GET -H "Authorization: Bearer YWMtG4T5wkOTEeST5V-9lp7f-wAAAUnafsqrQFnCU4gI0-rQImw4523fWqIrXI8" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/chatrooms"
</code></pre>

##### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "get",
  "uri" : "http://a1.easemob.com/easemob-demo/chatdemoui/chatrooms",
  "entities" : [ ],
  "data" : [ {
    "id" : "1432259621444159",
    "name" : "hxt001room0516",
    "owner" : "hxt001",
    "affiliations_count" : 1
  }, {
    "id" : "1432265498916373",
    "name" : "room1",
    "owner" : "55",
    "affiliations_count" : 1
  } ],
  "timestamp" : 1432266879464,
  "duration" : 147,
  "count" : 10
}
</code></pre>


## 获取一个聊天室详情 {#getchatroomdetail}
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/chatrooms/{chatroom_id}
- HTTP Method : GET
- URL Params ： 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ：无
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （此群组id不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

##### curl示例：

<pre class="hll"><code class="language-java">
curl -X GET -H "Authorization: Bearer YWMtG4T5wkOTEeST5V-9lp7f-wAAAUnafsqrQFnCU4gI0-rQImw45TXUWSIrXI8"  -i  "https://a1.easemob.com/easemob-demo/chatdemoui/chatrooms/1432259621444159"

</code></pre>

##### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "get",
  "uri" : "http://a1.easemob.com/easemob-demo/chatdemoui/chatrooms/1432259621444159",
  "entities" : [ ],
  "data" : [ {
    "membersonly" : false,
    "allowinvites" : false,
    "public" : true,
    "name" : "hxt001room0516",
    "description" : "chatroom description",
    "affiliations" : [ {
      "owner" : "hxt001"
    } ],
    "id" : "1432259621444159",
    "maxusers" : 2000,
    "affiliations_count" : 1
  } ],
  "timestamp" : 1432267287589,
  "duration" : 1
}
</code></pre>


## 获取用户加入的聊天室 {#joinedchatrooms}
> 
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{username}/joined_chatrooms
- HTTP Method : GET 
- URL Params ： 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ：无
- Response Body ：详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略
- 可能的错误码： <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 


##### curl示例：

<pre class="hll"><code class="language-java">
curl -X GET 'https://a1.easemob.com/easemob-demo/chatdemoui/users/jma1/joined_chatrooms' -H 'Authorization: Bearer YWMtgNIiTFAwEeSB9olyTIXFtwAAAUotKvWaUOaUuqeuhNMgOgozO4popVZe-Ls'

</code></pre>

##### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "get",
  "uri" : "http://a1.easemob.com/easemob-demo/chatdemoui/users/jma1/joined_chatrooms",
  "entities" : [ ],
  "data" : [ {
    "id" : "1432266600611977",
    "name" : "testchatroom"
  } ],
  "timestamp" : 1432268305229,
  "duration" : 23
}

</code></pre>