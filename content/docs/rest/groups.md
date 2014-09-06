---
title: REST API 群组管理
secondnavrest: true
sidebar: restsidebar
---

# 群组管理

环信提供了REST API 来管理app中的群组

## 获取app中所有的群组ID {#getallgroups}

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


## 获取一个或者多个群组的详情 {#getgroups}         

<pre class="hll"><code class="language-java">
GET /{org}/{app}/chatgroups/{group_id1},{group_id2}
</code></pre>

## 创建一个群组 {#create}

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

## 删除群组 {#delete}

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

## 获取群组中的所有成员 {#users}

<pre class="hll"><code class="language-java">
GET /chatgroups/{group_id}/users
</code></pre>

## 在群组中添加一个人 {#addmember}

<pre class="hll"><code class="language-java">
POST /chatgroups/{group_id}/users/{username}
</code></pre>

## 在群组中减少一个人 {#deletemember}

<pre class="hll"><code class="language-java">
DELETE /chatgroups/{group_id}/users/{username}
</code></pre>