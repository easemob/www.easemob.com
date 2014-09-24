---
title: REST API 群组管理
secondnavrest: true
sidebar: restsidebar
---

# 群组管理

环信提供了REST API 来管理app中的群组

## 获取app中所有的群组ID {#getallgroups}

- Path : /{org_name}/{app_name}/chatgroups
- HTTP Method : GET
- URL Params ： 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ：
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。

##### curl示例：

<pre class="hll"><code class="language-java">
curl -X GET -H "Authorization: Bearer YWMtP_8IisA-EeK-a5cNq4Jt3QAAAT7fI10IbPuKdRxUTjA9CNiZMnQIgk0LEUE" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/chatgroups"
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


## 获取一个或者多个群组的详情 {#getgroups}         

- Path : /{org_name}/{app_name}/chatgroups/{group_id1},{group_id2}
- HTTP Method : GET
- URL Params ： 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ：无
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。

##### curl示例：

<pre class="hll"><code class="language-java">
curl -X GET -H "Authorization: Bearer YWMtP_8IisA-EeK-a5cNq4Jt3QAAAT7fI10IbPuKdRxUTjA9CNiZMnQIgk0LEUE"  -i  "https://a1.easemob.com/easemob-demo/chatdemoui/chatgroups/1410511142870,1408518613503"
</code></pre>

##### Response

<pre class="hll"><code class="language-java">
{
  "action" : "get",
  "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
  "params" : { },
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/chatgroups/1410511142870,1408518613503",
  "entities" : [ ],
  "data" : [ {
    "id" : "1408518613503",
    "name" : "Jay13800138000",
    "description" : "",
    "public" : false,
    "membersonly" : true,
    "allowinvites" : false,
    "maxusers" : 200,
    "affiliations_count" : 3,
    "affiliations" : [ {
      "owner" : "13800138001"
     }, {
      "member" : "v3y0kf9arx"
     }, {
      "member" : "xc6xrnbzci"
     } ]
   }, {
    "id" : "1410511142870",
    "name" : "abc",
    "description" : "",
    "public" : false,
    "membersonly" : true,
    "allowinvites" : false,
    "maxusers" : 200,
    "affiliations_count" : 1,
    "affiliations" : [ {
      "owner" : "u366"
    } ]
  } ],
  "timestamp" : 1411526263806,
  "duration" : 34,
  "organization" : "easemob-demo",
  "applicationName" : "chatdemoui"
}
</code></pre>

## 创建一个群组 {#create}

- Path : /{org_name}/{app_name}/chatgroups
- HTTP Method : POST
- URL Params ： 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ：

<pre class="hll"><code class="language-java">
{
    "groupname":"testrestgrp12", //群组名称, 此属性为必须的
    "desc":"server create group", //群组描述, 此属性为必须的
    "public":true, //是否是公开群, 此属性为必须的
    "approval":true, //加入公开群是否需要批准, 没有这个属性的话默认是true, 此属性为可选的
    "owner":"jma1", //群组的管理员, 此属性为必须的
    "members":["jma2","jma3"] //群组成员,此属性为可选的,但是如果加了此项,数组元素至少一个
}
</code></pre>

- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。

##### curl示例：

<pre class="hll"><code class="language-java">
curl -X POST 'https://a1.easemob.com/easemob-demo/4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5/chatgroups' -H 'Authorization: Bearer YWMtG4T5wkOTEeST5V-9lp7f-wAAAUnafsqrQFnCU4gI0-rQImw45TXUWSIrXI8' -d '{"groupname":"testrestgrp12","desc":"server create group","public":true,"approval":true,"owner":"2ewcgkhhxf","members":["zh9w1hc49q"]}'
</code></pre>

##### Response

<pre class="hll"><code class="language-java">
{
  "action" : "post",
  "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
  "params" : { },
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui",
  "entities" : [ ],
  "data" : {
    "groupid" : "1411527886490154"
  },
  "timestamp" : 1411527886457,
  "duration" : 125,
  "organization" : "easemob-demo",
  "applicationName" : "chatdemoui"
}
</code></pre>

## 删除群组 {#delete}

- Path : /{org_name}/{app_name}/chatgroups/{group_id}
- HTTP Method : DELETE
- URL Params ： 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ：无
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。

##### curl示例：

<pre class="hll"><code class="language-java">
curl -X DELETE 'https://a1.easemob.com/easemob-demo/4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5/chatgroups/1411527886490154' -H 'Authorization: Bearer YWMtG4T5wkOTEeST5V-9lp7f-wAAAUnafsqrQFnCU4gI0-rQImw45TXUWSIrXI8'
</code></pre>

##### Response

<pre class="hll"><code class="language-java">
{
  "action" : "delete",
  "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
  "params" : { },
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui",
  "entities" : [ ],
  "data" : {
    "success" : true,
    "groupid" : "1411527886490154"
  },
  "timestamp" : 1411528112078,
  "duration" : 15,
  "organization" : "easemob-demo",
  "applicationName" : "chatdemoui"
}
</code></pre>


## 获取群组中的所有成员 {#users}

<pre class="hll"><code class="language-java">
GET /{org_name}/{app_name}/chatgroups/{group_id}/users
</code></pre>

## 在群组中添加一个人 {#addmember}

<pre class="hll"><code class="language-java">
POST /{org_name}/{app_name}/chatgroups/{group_id}/users/{user_primary_key}
</code></pre>

## 在群组中减少一个人 {#deletemember}

<pre class="hll"><code class="language-java">
DELETE /{org_name}/{app_name}/chatgroups/{group_id}/users/{user_primary_key}
</code></pre>