---
title: REST API 开发指南
secondnavrest: true
sidebar: restsidebar
---

## 环信服务器端REST平台概述

#### 关于REST
> 
&emsp;&emsp;REST（Representational State Transfer）是一种轻量级的Web Service架构风格,可以翻译成“表属性状态转移”，实现和操作明显比SOAP和XML-RPC更为简洁，可以完全通过HTTP协议实现，还可以利用缓存Cache来提高响应速度，性能、效率和易用性上都优于SOAP协议。
> 
&emsp;&emsp;REST架构遵循了CRUD原则，CRUD原则对于资源只需要四种行为：Create（创建）、Read（读取）、Update（更新）和Delete（删除）就可以完成对其操作和处理。这四个操作是一种原子操作，对资源的操作包括获取、创建、修改和删除资源的操作正好对应HTTP协议提供的GET、POST、PUT和DELETE方法，因此REST把HTTP对一个URL资源的操作限制在GET、POST、PUT和DELETE这四个之内。这种针对网络应用的设计和开发方式，可以降低开发的复杂性，提高系统的可伸缩性。

#### REST平台体系
&emsp;&emsp;平台提供的是一个多租户用户体系，资源以集合【Collection】的形式来描述,这里所说的Collection包括DataBase、企业(orgs)、应用(apps)、IM用户(users)、群组(chatgroups)、消息(chatmessages)、文件(chatfiles)等等，之间的包含关系是
 
 - DB = {org1, org2, ...}
 - org = {app1, app2, ...}
 - app = {users, messages, chatfiles, chatmessages, chatgroups, ...}
 - users = {user1, user2, ...}
 - messages = {message1, message2, ...}
 - chatfiles = {chatfile1, chatfile2, ...}
 - chatmessages = {chatmessage1, chatmessage2, ...}
 - chatgroups = {group1, group2, ...}

&emsp;&emsp;多租户是指软件架构支持一个实例服务多个用户（_Customer_），每一个用户被称之为租户（_Tenant_），软件给予租户可以对系统进行部分定制的能力，如用户界面颜色或业务规则，但是他们不能定制修改软件的代码。
其实在云计算领域，多租户的含义已被扩展。例如，软件即服务（_SaaS_）提供者，利用运行在一个数据库实例上的应用系统，向多个用户提供Web访问服务。在这样的场景下，租户之间的数据是隔离的，并且保证每个用户的数据对其他租户不可见。
&emsp;&emsp;在环信服务体系中，不同org之间的用户数据相互隔离，同一个org下不同app之间的用户数据相互隔离。

#### REST Server

&emsp;&emsp;环信的服务器端接口都是通过[REST服务](http://zh.wikipedia.org/zh-cn/REST)方式提供的, REST API基于最简单的HTTP协议, 在各个编程语言中都提供了良好的支持.

#### REST client
&emsp;&emsp;REST client就是调用REST API的程序端，可以使调用方式有多种：Linux curl、浏览器、编程语言http请求访问实现等。

&emsp;&emsp;   调用REST API, 本质就是发送HTTP请求, 只不过大家常用的可能是 _HTTP GET_ 和 _HTTP POST_请求, 但是在REST 里面还经常用到 _HTTP PUT_ 和 _HTTP DELETE_, 在REST中, 把这四种操作称之为*动词*, 可以(不是特别准确)的想象成增删改查.
而动词所操作的对象, 在REST中, 被称之为_资源_, 也就是_URL_, 而这些也都是标准的HTTP协议的内容.
实际上, 当我们在浏览器中打开一个网站的时候, 例如, 打开[www.easemob.com](www.easemob.com), 浏览器实际上发送给网站服务器的, 就是一个HTTP GET的请求.

&emsp;&emsp;需要注意的是, 环信的REST API都是基于json的, 所以在构造_HTTP_ 请求的时候, 需要在_HTTP HEADER_中指明:

| header_name  | header_value     | description               |
|--------------|:----------------:|-------------------------- |
| Accept       | application/json | 服务器端返回给客户端的数据类型  |
| Content-Type | application/json | 客户端发到服务器端的是数据类型  |

> Java
在Java中, REST Client实现方式有多种，比如JBOss RestEasy、 Sun Jersey、Dropwizard、Apache HTTPClient.我们推荐使用[Jersey](https://jersey.java.net)来调用环信的REST服务, Jersy 2.x实现了JAX-RS 2.0的规范, 并且提供了异步的支持, 但是Jersey 2.x需要JDK 1.7的支持, 所以如果你的服务器端程序还没有办法使用JDK 1.7, 那么需要使用 Jersey 1.x的版本.也有很多人直接使用[Apache Http Client](http://hc.apache.org), 我们并不推荐直接使用这个库, 主要是因为这个库相对比较底层, 需要自己处理的东西很多, API也相对繁琐.

> Python
对于python程序, 我们推荐使用[request](http://docs.python-requests.org/en/latest/)这个类库来调用环信的REST服务.

## 环信服务器基本架构

&emsp;&emsp;当用户在[环信开发者管理后台](https://console.easemob.com)中注册的时候, 需要填写一个"企业ID", 这是因为环信是一个支持多租户的云服务平台, 并且环信是支持"企业"(或者理解成团队)-"App"两级结构的.即, 在环信平台中, 每个企业ID之间的数据都是严格相互隔离的, 而每个企业ID内部的每个App之间的数据, 也都是严格相互隔离的.

> 可以想象这样的模型：一个公司中有三个部门, 每个部门负责一个App, 那么这个公司可以注册一个环信的账号, 然后在这个账号的名下创建三个(环信中的)App, 每个环信中的app对应一个部门的app.
这样, 最开始注册的时候的账号, 是这个企业在环信中的企业管理员账号, 企业管理员可以创建新的app, 并且指派app管理员账号, 在访问权限上, 企业管理员拥有最高的权限, 可以看到自己的企业ID下所有app中的所有的数据, 而app管理员则只能看到自己app中的数据, 看不到其它app中的数据.
同时, 上面也说过了, 同一个企业id下面的app之间, 数据也都是相互隔离的, 所以完全可以在两个app中创建相同用户名的用户.


另, 如果只是个人开发者开发一个app的话, 那么企业id可以随便填写, 只需要不和环信现有的企业id重复即可.

&emsp;&emsp;最后, 因为环信提供的是REST服务, 并且上面说过, REST本质就是通过 GET / POST / PUT /DELETE 来操作资源(URL), 所以, 实际上可以看到在环信的REST API中, 也体现了这种思想.

&emsp;&emsp;假设一个企业id为 _easemob-demo_, 然后这个企业下面有个app名字叫做 _chatdemoui_, 那么环信的REST API就是下面的样子

###### 获取这个app下的所有用户

<pre class="hll"><code class="language-java">
Path : /easemob-demo/chatdemoui/users
HTTP Method : GET
Request Headers : {
    	Authorization : Bearer ${token}
}		
</code></pre>

###### 获取这个app下的用户stliu的详情

<pre class="hll"><code class="language-java">
Path : /easemob-demo/chatdemoui/users/stliu
HTTP Method : GET
Request Headers : {
	   Authorization : Bearer ${token}
}
</code></pre>

###### 在这个app下创建一个新的用户

<pre class="hll"><code class="language-java">
Path : /easemob-demo/chatdemoui/users
HTTP Method : POST
Request Headers : {
	   Content-Type : application/json,
	   Authorization : Bearer ${token}
}
Request Body : {"username":"stliu1", "password":"123456"}
//注意: post的数据需要是json格式的, 并设置Content-Type 为 application/json
</code></pre>

###### 删除一个用户

<pre class="hll"><code class="language-java">
Path : /easemob-demo/chatdemoui/users/stliu
HTTP Method : DELETE
Request Headers : {
    	Authorization : Bearer ${token}
}
</code></pre>

从上面的URL的规则中, 也能够看出"企业"--"app"--"用户"的层层递进的关系.

### 名词解释

| 名词       |        解  释                         |
|-----------|:--------------------------------------|
| org_name  | 企业的唯一标识,开发者在[环信开发者管理后台](http://console.easemob.com)注册账号时填写的企业ID |
| app_name  | 同一"企业"下"app"唯一标识,开发者在[环信开发者管理后台](http://console.easemob.com)创建应用时填写的"应用名称"  |
| org_admin | 开发者在[环信开发者管理后台](http://console.easemob.com)注册时填写的"用户名"。企业管理员拥有对该企业账号下所有资源的操作权限  |
| app_admin | 应用管理员,具有admin权限的一个特殊IM用户，拥有对该应用下所有资源的操作权限    |
| appkey    | 一个app的唯一标识,规则是 ${org_name}#${name}   |


### 安全

&emsp;&emsp;环信的REST服务完全是基于HTTPS的安全协议, 从协议层面保证了在调用的时候, 不会被别人窃取到.

&emsp;&emsp;环信的后台服务API在安全上, 是基于 *OAuth 2.0*标准的和RBAC(基于角色的访问控制)的权限模型的

&emsp;&emsp;在调用环信的后台服务之前, 需要先登陆获取token, 而根据请求发起人的角色不同, 获取token的方式也不同

## 示例代码
&emsp;&emsp;环信提供了如何调用REST服务的示例代码, 可以在[这里](https://github.com/easemob/emchat-server-examples)找到.

