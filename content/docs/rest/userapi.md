---
title: REST API 开发指南
secondnavrest: true
sidebar: restsidebar
---

## 用户体系集成

## 数据结构 {#schema}
 > 环信作为一个聊天通道，只需要提供环信ID和密码就够了.
 

|  属性     |  字段名    | 数据类型  |  描述  |
|----------|------------|----------|--------|
|  环信ID   |  username  | String   | username是环信用户的唯一标识,在appkey的范围内唯一 |
|  用户密码 | password   | String   |  用户登录环信使用的密码       |

## 环信ID规则 {#eid}

当App和环信集成的时候， 需要把App系统内的已有用户和新注册的用户和环信集成， 为每个已有用户创建一个环信的账号(环信ID)， 并且App有新用户注册的时候， 需要同步的在环信中注册。

在注册环信账户的时候， 需要注意**环信ID的规则**：

* 环信ID需要使用英文字母和（或）数字的组合
* 环信ID不能使用中文
* 环信ID不能使用email地址
* 环信ID不能使用UUID
* 环信ID中间不能有空格或者井号（#）等特殊字符
* <b>允许的环信ID正则  "[a-zA-Z0-9_\\-.]*" (a~z大小写字母和数字和下划线和横线和英文点) 其他都不允许</b>
* 环信ID不区分大小写。系统忽略大小写，认为AA,Aa,aa,aA都是一样的,如果系统已经存在了环信ID为AA的用户，再试图使用aa作为环信ID注册新用户，系统返回用户名重复,以此类推。但是请注意：环信ID在数据上的表现形式还是用户最初注册的形式，注册时候使用的大写就保存大写，是小写就保存小写，即:使用AA注册，环信保存的ID就是AA;使用Aa注册，环信保存的ID就是Aa,以此类推。

另: 本文档中可能会交错使用"环信ID"和"环信用户名"两个术语, 但是请注意, 这里两个的意思是一样的

因为一个用户的环信ID和他的在App中的用户名并不需要一致， 只需要有一个明确的对应关系， 例如， 用户名是 _stliu@apache.org_, 当这个用户登陆到App的时候， 可以登陆成功之后， 再登陆环信的服务器， 所以这时候， 只需要能够从 _stliu@apache.org_ 推导出这个用户的环信ID即可

以下所有API均需要org管理员或app管理员权限才能访问。

强烈建议保护好org管理员,app管理员的用户名和密码以及app的client_id和client_secret,尽量只在APP的服务器后台对环信用户做增删改查的管理，包括新用户注册。为了您的信息安全,请一定不要将org管理员或app管理员的用户名和密码写死在手机客户端中,因为手机app很容易被反编译,从而导致别人获取到您的管理员账号和密码,导致数据泄露 .

## 获取APP管理员Token {#getadmintoken}
环信提供的REST API需要权限才能访问,权限通过发送HTTP请求时携带token来体现,下面描述获取token的方式。小说明：api描述的时候使用到的{app的client_id}之类的这种参数需要替换成具体的值 .

**_重要提醒：
token在有效期内都是可用的，有效期具体值请看接口返回值中的expires_in字段，所以，请不要频繁向服务器发送获取token的请求，同一账号发送此请求超过一定频率会被服务器封号，切记，切记！！_**



### 使用app的client_id和client_secret获取授权管理员token
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

client_id 和 client_secret可以在环信管理后台的app详情页面看到

- Path : /{org_name}/{app_name}/token
- HTTP Method : POST
- URL Params ： 无
- Request Headers : {"Content-Type":"application/json"}
- Request Body ： {"grant_type": "client_credentials","client_id": "{app的client_id}","client_secret": "{app的client_secret}"}
- Response Body ：

    |      key     |     value   |
    |--------------|-------------|
    | access_token |   token值  |
    | expires_in   |  有效时间,秒为单位, 默认是七天,在有效期内是不需要重复获取的 |
    | application  |  当前app的UUID值   | 
- 可能的错误码： <br/>
    400 （client_id或client_secret错误） <br/>5xx <br/> 详见：[REST接口错误码]        (http://www.easemob.com/docs/helps/errorcodes/) 


#### curl示例：

<pre class="hll"><code class="language-java">

    curl -X POST "https://a1.easemob.com/easemob-demo/chatdemoui/token" -d '{"grant_type":"client_credentials","client_id":"YXA6wDs-MARqEeSO0VcBzaqg11","client_secret":"YXA6JOMWlLap_YbI_ucz77j-4-mI0dd"}'

</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
  "access_token":"YWMtWY779DgJEeS2h9OR7fw4QgAAAUmO4Qukwd9cfJSpkWHiOa7MCSk0MrkVIco",
  "expires_in":5184000,
  "application":"c03b3e30-046a-11e4-8ed1-5701cdaaa0e4"
}
</code></pre>


## 注册IM用户[单个] {#im}

在url指定的org和app中创建一个新的用户,分两种模式：开放注册 和 <b>授权注册</b>

- "开放注册"模式：注册环信账号时不用携带管理员身份认证信息；
- "授权注册"模式：注册环信账号必须携带管理员身份认证信息。<b>推荐使用"授权注册"</b>，这样可以防止某些已经获取了注册url和知晓注册流程的人恶意向服务器大量注册垃圾用户。

注意：以下api中提到的${token}是个变量，使用时需要替换成通过app的client_id和client_secret获取到的token。

### 开放注册
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users
- HTTP Method : POST
- URL Params ： 无
- Request Headers : {"Content-Type":"application/json"}
- Request Body ： {"username":"${用户名}","password":"${密码}", "nickname":"${昵称值}"}  
	 **// 创建用户时候username 和password是必须的, nickname是可选的，这个nickname用于IOS推送. 如果要在创建用户时设置nickname, 请求body是: {"username":"jliu","password":"123456", "nickname":"建国"} 这种形式, 下面的示例不包含nickname .** 批量注册时同此理.
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
400 （用户已存在、用户名或密码为空、用户名不合法([见用户名规则](http://www.easemob.com/docs/rest/userapi/#eid))） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

#### curl示例：

<pre class="hll"><code class="language-java">
curl -X POST -i "https://a1.easemob.com/easemob-demo/chatdemoui/users" -d '{"username":"jliu","password":"123456"}'
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
    "action" : "post",
    "application" : "a2e433a0-ab1a-11e2-a134-85fca932f094",
    "params" : { },
    "path" : "/users",
    "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/users",
    "entities" : [ {
    	"uuid" : "7f90f7ca-bb24-11e2-b2d0-6d8e359945e4",
    	"type" : "user",
    	"created" : 1368377620796,
    	"modified" : 1368377620796,
    	"username" : "jliu",
	"activated" : true
    } ],
    "timestamp" : 1368377620793,
    "duration" : 125,
    "organization" : "easemob-demo",
    "applicationName" : "chatdemo"
}
</code></pre>

### 授权注册
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users
- HTTP Method : POST
- URL Params ： 无
- Request Headers : {"Content-Type":"application/json","Authorization":"Bearer ${token}"}
- Request Body ： {"username":"${用户名}","password":"${密码}"}
- Response Body ：  详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
400 （用户已存在、用户名或密码为空、用户名不合法([见用户名规则](http://www.easemob.com/docs/rest/userapi/#eid))） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

#### curl示例：

<pre class="hll"><code class="language-java">
curl -X POST -H "Authorization: Bearer YWMt39RfMMOqEeKYE_GW7tu81AAAAT71lGijyjG4VUIC2AwZGzUjVbPp_4qRD5k" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/users" -d '{"username":"jliu","password":"123456"}'
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">	
{
	"action" : "post",
	"application" : "a2e433a0-ab1a-11e2-a134-85fca932f094",
	"params" : { },
	"path" : "/users",
	"uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/users",
	"entities" : [ {
		"uuid" : "7f90f7ca-bb24-11e2-b2d0-6d8e359945e4",
		"type" : "user",
		"created" : 1368377620796,
		"modified" : 1368377620796,
		"username" : "jliu",
		"activated" : true
		}
  	} ],
  	"timestamp" : 1368377620793,
  	"duration" : 125,
  	"organization" : "easemob-demo",
  	"applicationName" : "chatdemo"
}
</code></pre>

## 注册IM用户[批量] {#im-1}

> 批量注册的用户数量不要过多, 建议在20-60之间
> 
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users
- HTTP Method : POST
- URL Params ： 无
- Request Headers : {"Content-Type":"application/json","Authorization":"Bearer ${token}"}
- Request Body ： [{"username":"${用户名1}","password":"${密码}"},...,{"username":"${用户名2}","password":"${密码}"}]
- Response Body ：  详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
400 （用户已存在、用户名或密码为空、用户名不合法([见用户名规则](http://www.easemob.com/docs/rest/userapi/#eid))） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

#### curl示例：

<pre class="hll"><code class="language-java">
curl -X POST -H "Authorization: Bearer YWMtP_8IisA-EeK-a5cNq4Jt3QAAAT7fI10IbPuKdRxUTjA9CNiZMnQIgk0LEUE" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/users" -d '[{"username":"u1", "password":"p1"}, {"username":"u2", "password":"p2"}]'
</code></pre>

### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "post",
  "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
  "params" : { },
  "path" : "/users",
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/users",
  "entities" : [ {
    "uuid" : "de73238a-31ca-11e4-bdc9-9fdda213fcaa",
    "type" : "user",
    "created" : 1409570811320,
    "modified" : 1409570811320,
    "username" : "u1",
    "activated" : true
  }, {
    "uuid" : "de86365a-31ca-11e4-aecf-9509b836c0d6",
    "type" : "user",
    "created" : 1409570811445,
    "modified" : 1409570811445,
    "username" : "u2",
    "activated" : true
  } ],
  "timestamp" : 1409570811312,
  "duration" : 802,
  "organization" : "easemob-demo",
  "applicationName" : "chatdemoui"
}
</code></pre>

## 获取IM用户[单个]  {#im-2}
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{username}
- HTTP Method : GET
- URL Params ：无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ：  详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

#### curl示例：

<pre class="hll"><code class="language-java">	
curl -X GET -H "Authorization: Bearer YWMtSozP9jHNEeSQegV9EK5eAQAAAUlmBR2bTGr-GP2xNh8GhUCdKViBFgtox3M" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/users/ywuxvxuir6"
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "get",
  "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
  "params" : { },
  "path" : "/users",
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/users/ywuxvxuir6",
  "entities" : [ {
    "uuid" : "628a88ba-dfce-11e3-8cac-51d3cb69b303",
    "type" : "user",
    "created" : 1400556326075,
    "modified" : 1400556326075,
    "username" : "ywuxvxuir6",
    "activated" : true
  } ],
  "timestamp" : 1409574716897,
  "duration" : 57,
  "organization" : "easemob-demo",
  "applicationName" : "chatdemoui"
}
</code></pre>


## 获取IM用户[批量]  {#im-3}

> 该接口默认返回最近创建的10个用户，如果需要指定获取数量，需加上参数limit=N，N为数量值.
关于分页：如果DB中的数量大于N，返回json会携带一个字段“cursor”,我们把它叫做"游标"，该游标可理解为结果集的指针，值是变化的。往下取数据的时候带着游标，就可以获取到下一页的值。如果还有下一页，返回值里依然还有这个字段，直到没有这个字段，说明已经到最后一页。cursor的意义在于数据(真)分页。

> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

1) 不分页

- Path : /{org_name}/{app_name}/users
- HTTP Method : GET
- URL Params ： limit=20
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ：  详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

#### curl示例：

<pre class="hll"><code class="language-java">
curl -X GET -H "Authorization: Bearer YWMtP_8IisA-EeK-a5cNq4Jt3QAAAT7fI10IbPuKdRxUTjA9CNiZMnQIgk0LEUE" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/users?limit=20"
</code></pre>

### Response 示例：

<pre class="hll"><code class="language-java">
  {
    "action" : "get",
    "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
    "params" : {
    "limit" : [ "20" ]
    },
    "path" : "/users",
    "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/users?ql=select+*+from+null&limit=20",
    "entities" : [ {
    "uuid" : "fff15c10-df37-11e3-843f-e5b88d483c56",
    "type" : "user",
    "created" : 1400491736144,
    "modified" : 1409055655016,
    "username" : "wjglpgecxu",
    "activated" : true,
    "nickname" : "wjglpgecxu",
    "notifier_name" : "chatdemoui_dev"
  }, {
    "uuid" : "4cca8760-df3c-11e3-8712-9f7483b2df95",
    "type" : "user",
    "created" : 1400493583061,
    "modified" : 1400493583061,
    "username" : "pfs5afofrf",
    "activated" : true
  }, {
    "uuid" : "5918fb7a-df3f-11e3-94d1-1f977e72d55c",
    "type" : "user",
    "created" : 1400494892199,
    "modified" : 1407465728550,
    "username" : "igm8dl8m2e",
    "activated" : true,
    "nickname" : "sadsadsa",
    "notification_display_style" : 0,
    "notification_no_disturbing" : false
  }, {
    "uuid" : "ee6e5a3a-df3f-11e3-bbe9-d3a806493d4a",
    "type" : "user",
    "created" : 1400495142739,
    "modified" : 1400495142739,
    "username" : "lgqieuevag",
    "activated" : true
  }, {
    "uuid" : "6d3ba2ea-df41-11e3-b304-eb2e9192a84a",
    "type" : "user",
    "created" : 1400495784974,
    "modified" : 1400495784974,
    "username" : "quqx6qjmb2",
    "activated" : true
  }, {
    "uuid" : "51b663ba-df42-11e3-8470-cd9881131147",
    "type" : "user",
    "created" : 1400496168299,
    "modified" : 1400496168299,
    "username" : "y0fchl0ps9",
    "activated" : true
  }, {
    "uuid" : "b8b1c32a-df42-11e3-b375-53147ac0d738",
    "type" : "user",
    "created" : 1400496341074,
    "modified" : 1400496341074,
    "username" : "v3y0kf9arx",
    "activated" : true
  }, {
    "uuid" : "8cf86e4a-df61-11e3-8a70-25cc7e73257e",
    "type" : "user",
    "created" : 1400509582116,
    "modified" : 1400509582116,
    "username" : "kapzkr9rro",
    "activated" : true
  }, {
    "uuid" : "a11dca4a-df62-11e3-8551-493bea6a0997",
    "type" : "user",
    "created" : 1400510045412,
    "modified" : 1400510045412,
    "username" : "vkpvscnkzn",
    "activated" : true
  }, {
    "uuid" : "860169a4-df64-11e3-aaae-6bc8d50bc307",
    "type" : "user",
    "created" : 1400510858921,
    "modified" : 1400510858921,
    "username" : "6tkecmjtzn",
    "activated" : true
  }, {
    "uuid" : "1ed6bffa-df68-11e3-80f0-33f2237fa6e0",
    "type" : "user",
    "created" : 1400512403823,
    "modified" : 1400512403823,
    "username" : "xc6xrnbzci",
    "activated" : true
  }, {
    "uuid" : "5472a84a-df68-11e3-b0b9-735c1b1db9a1",
    "type" : "user",
    "created" : 1400512493764,
    "modified" : 1400512493764,
    "username" : "vrhfk5lxsz",
    "activated" : true
  }, {
    "uuid" : "79b3db1a-dfbd-11e3-9c5d-3be5e57070a5",
    "type" : "user",
    "created" : 1400549063489,
    "modified" : 1400549063489,
    "username" : "qmlu5szkbm",
    "activated" : true
  }, {
    "uuid" : "3a2416ea-dfc2-11e3-a3e8-238b964488ee",
    "type" : "user",
    "created" : 1400551104334,
    "modified" : 1400551104334,
    "username" : "6pxxbfcnxu",
    "activated" : true
  }, {
    "uuid" : "65f6cf1a-dfc2-11e3-9dad-2929901f1b97",
    "type" : "user",
    "created" : 1400551177857,
    "modified" : 1400551177857,
    "username" : "xffslraxae",
    "activated" : true
  }, {
    "uuid" : "2631911a-dfc9-11e3-803d-23343cadc4ed",
    "type" : "user",
    "created" : 1400554077345,
    "modified" : 1400554077345,
    "username" : "pfxfc9ggkz",
    "activated" : true
  }, {
    "uuid" : "4295acaa-dfca-11e3-9bf1-5fd8df7f7659",
    "type" : "user",
    "created" : 1400554554474,
    "modified" : 1400554554474,
    "username" : "pksaxc6pao",
    "activated" : true
  }, {
    "uuid" : "8c76072a-dfca-11e3-acc7-7dbd7c3dd494",
    "type" : "user",
    "created" : 1400554678418,
    "modified" : 1400554678418,
    "username" : "s1yqttgtya",
    "activated" : true
  }, {
    "uuid" : "93d710ea-dfca-11e3-a6e8-4f903c0b10fb",
    "type" : "user",
    "created" : 1400554690798,
    "modified" : 1400554690798,
    "username" : "qihp1et8t4",
    "activated" : true
  }, {
    "uuid" : "b1fbbdaa-dfca-11e3-a242-8d6201f83c2b",
    "type" : "user",
    "created" : 1400554741370,
    "modified" : 1400554741370,
    "username" : "0vwy72min6",
    "activated" : true
  } ],
    "timestamp" : 1409571908388,
    "duration" : 747,
    "organization" : "easemob-demo",
    "applicationName" : "chatdemoui",
    "cursor" : "LTU2ODc0MzQzOnNmdTlxdF9LRWVPaVFvMWlBZmc4S3c",
    "count" : 20
   }
</code></pre>

2) 分页

- Path : /{org_name}/{app_name}/users
- HTTP Method : GET
- URL Params ： limit=20&cursor=LTU2ODc0MzQzOnNmdTlxdF9LRWVPaVFvMWlBZmc4S3c
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ：  详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。

#### curl示例：
		
<pre class="hll"><code class="language-java">
curl -X GET -H "Authorization: Bearer YWMtSozP9jHNEeSQegV9EKeAQAAAUlmBR2bTGr-GP2xNh8GhUCdKViBFgtox3M" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/users?limit=20&cursor=LTU2ODc0MzQzOnNmdTlxdF9LRWVPaVFvMWlBZmc4S3c"
</code></pre>

### Response 示例：

<pre class="hll"><code class="language-java">
  {
    "action" : "get",
    "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
    "params" : {
    "limit" : [ "20" ],
    "cursor" : [ "LTU2ODc0MzQzOnNmdTlxdF9LRWVPaVFvMWlBZmc4S3c" ]
   },
    "path" : "/users",
    "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/users?ql=select+*+from+null&limit=20",
    "entities" : [ {
    "uuid" : "db8b63aa-dfca-11e3-b938-0337d3f77124",
    "type" : "user",
    "created" : 1400554811098,
    "modified" : 1400554811098,
    "username" : "an9hmj9js2",
    "activated" : true
   }, {
    "uuid" : "e4fab3fa-dfca-11e3-a4ce-59804f43b0c8",
    "type" : "user",
    "created" : 1400554826927,
    "modified" : 1400554826927,
    "username" : "3qwepp6xkg",
    "activated" : true
   }, {
    "uuid" : "f844e7aa-dfca-11e3-9eb4-3d526f9ecfeb",
    "type" : "user",
    "created" : 1400554859290,
    "modified" : 1400554859290,
    "username" : "ce41dtafer",
    "activated" : true
   }, {
    "uuid" : "fc4f4c5a-dfca-11e3-aaf8-239a98c53960",
    "type" : "user",
    "created" : 1400554866069,
    "modified" : 1400554866069,
    "username" : "2ewcgkhhxf",
    "activated" : true
   }, {
    "uuid" : "0005ebba-dfcb-11e3-9704-f734eb21dbc4",
    "type" : "user",
    "created" : 1400554872299,
    "modified" : 1400554872299,
    "username" : "zh9w1hc49q",
    "activated" : true
   }, {
    "uuid" : "7f8e638a-dfcb-11e3-971e-fdc9e466fac1",
    "type" : "user",
    "created" : 1400555086264,
    "modified" : 1400555086264,
    "username" : "lxrpebngsl",
    "activated" : true
   }, {
    "uuid" : "2d7fa7ba-dfcc-11e3-8b04-5f7a1794920c",
    "type" : "user",
    "created" : 1400555378091,
    "modified" : 1400555378091,
    "username" : "yeimn3szbh",
    "activated" : true
   }, {
    "uuid" : "3cc89e7a-dfcc-11e3-9a11-f1c6519f66af",
    "type" : "user",
    "created" : 1400555403735,
    "modified" : 1400555403735,
    "username" : "7s5e3jtieh",
    "activated" : true
   }, {
    "uuid" : "7cc785ea-dfcc-11e3-b24a-d5b4112501a1",
    "type" : "user",
    "created" : 1400555511102,
    "modified" : 1400555511102,
    "username" : "5cxhactgdj",
    "activated" : true
   }, {
    "uuid" : "ba8b717a-dfcc-11e3-85ca-3db38b18c75d",
    "type" : "user",
    "created" : 1400555614727,
    "modified" : 1400555614727,
    "username" : "qjf8b3r6q8",
    "activated" : true
   }, {
    "uuid" : "d5ad176a-dfcc-11e3-9e67-d933f3e27add",
    "type" : "user",
    "created" : 1400555660246,
    "modified" : 1400555660246,
    "username" : "mh2kbjyop1",
    "activated" : true
   }, {
    "uuid" : "2d4bf81a-dfcd-11e3-9e57-eb0fac2d4582",
    "type" : "user",
    "created" : 1400555807249,
    "modified" : 1400555807249,
    "username" : "q4xpsfjfvf",
    "activated" : true
   }, {
    "uuid" : "65368b5a-dfcd-11e3-8a1a-b9f751cf717c",
    "type" : "user",
    "created" : 1400555901061,
    "modified" : 1400555901061,
    "username" : "r1xnbh79us",
    "activated" : true
   }, {
    "uuid" : "6a9423fa-dfcd-11e3-8841-c1c4a8c96d7d",
    "type" : "user",
    "created" : 1400555910063,
    "modified" : 1400555910063,
    "username" : "sofa8kyoca",
    "activated" : true
   }, {
    "uuid" : "1698653a-dfce-11e3-8524-89dd680b7ce4",
    "type" : "user",
    "created" : 1400556198659,
    "modified" : 1400556198659,
    "username" : "4lo3srucvl",
    "activated" : true
   }, {
    "uuid" : "236b79fa-dfce-11e3-a9a3-250f2047b4bc",
    "type" : "user",
    "created" : 1400556220175,
    "modified" : 1400556220175,
    "username" : "w2k0etnjjj",
    "activated" : true
   }, {
    "uuid" : "54eb716a-dfce-11e3-9781-ab12107b7351",
    "type" : "user",
    "created" : 1400556303222,
    "modified" : 1400556303222,
    "username" : "ir4ad2dqri",
    "activated" : true
   }, {
    "uuid" : "5bb51d2a-dfce-11e3-be10-4ff224c17422",
    "type" : "user",
    "created" : 1400556314610,
    "modified" : 1400556314610,
    "username" : "0fktzcr36b",
    "activated" : true
   }, {
    "uuid" : "60cf6b3a-dfce-11e3-b8bf-ed78a8f851f8",
    "type" : "user",
    "created" : 1400556323171,
    "modified" : 1400556323171,
    "username" : "ytbdzt3w9e",
    "activated" : true
   }, {
    "uuid" : "628a88ba-dfce-11e3-8cac-51d3cb69b303",
    "type" : "user",
    "created" : 1400556326075,
    "modified" : 1400556326075,
    "username" : "ywuxvxuir6",
    "activated" : true
   } ],
    "timestamp" : 1409574113435,
    "duration" : 2812,
    "organization" : "easemob-demo",
    "applicationName" : "chatdemoui",
    "cursor" : "LTU2ODc0MzQzOllvcUl1dF9PRWVPTXJGSFR5Mm16QXc",
    "count" : 20
  }
</code></pre>

## 删除IM用户[单个]  {#im-5}
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{username}
- HTTP Method : DELETE
- URL 参数 : 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ：  详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

#### curl示例：

<pre class="hll"><code class="language-java">
curl -X DELETE -H "Authorization: Bearer YWMtSozP9jHNEeSQegV9EK5eAQAAAUlmBR2bTGr-GP2xNh8GhUCdKViBFgtox3M" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/users/ywuxvxuir6"
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "delete",
  "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
  "params" : { },
  "path" : "/users",
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/users",
  "entities" : [ {
    "uuid" : "628a88ba-dfce-11e3-8cac-51d3cb69b303",
    "type" : "user",
    "created" : 1400556326075,
    "modified" : 1400556326075,
    "username" : "ywuxvxuir6",
    "activated" : true
  } ],
  "timestamp" : 1409576121910,
  "duration" : 3330,
  "organization" : "easemob-demo",
  "applicationName" : "chatdemoui"
}
</code></pre>

## 删除IM用户[批量]  {#im-6}

> 删除某个app下指定数量的环信账号。可一次删除N个用户,数值可以修改.建议这个数值在100-500之间，不要过大. 需要注意的是, 这里只是批量的一次性删除掉N个用户, 具体删除哪些并没有指定, 可以在返回值中查看到哪些用户被删除掉了。

> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- DELETE /{org_name}/{app_name}/users?limit=5
- Path : /{org_name}/{app_name}/users
- HTTP Method : DELETE
- URL Params : limit=5
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ：  详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

#### curl示例：
		
<pre class="hll"><code class="language-java">
curl -X DELETE -H "Authorization: Bearer YWMtSozP9jHNEeSQegV9EK5eAQAAAUlmBR2bTGr-GP2xNh8GhUCdKViBFgtox3M" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/users?limit=5"
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "delete",
  "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
  "params" : {
    "limit" : [ "5" ]
  },
  "path" : "/users",
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/users",
  "entities" : [ {
    "uuid" : "fff15c10-df37-11e3-843f-e5b88d483c56",
    "type" : "user",
    "created" : 1400491736144,
    "modified" : 1409055655016,
    "username" : "wjglpgecxu",
    "activated" : true,
    "nickname" : "wjglpgecxu",
    "notifier_name" : "chatdemoui_dev"
  }, {
    "uuid" : "4cca8760-df3c-11e3-8712-9f7483b2df95",
    "type" : "user",
    "created" : 1400493583061,
    "modified" : 1400493583061,
    "username" : "pfs5afofrf",
    "activated" : true
  }, {
    "uuid" : "5918fb7a-df3f-11e3-94d1-1f977e72d55c",
    "type" : "user",
    "created" : 1400494892199,
    "modified" : 1407465728550,
    "username" : "igm8dl8m2e",
    "activated" : true,
    "nickname" : "sadsadsa",
    "notification_display_style" : 0,
    "notification_no_disturbing" : false
  }, {
    "uuid" : "ee6e5a3a-df3f-11e3-bbe9-d3a806493d4a",
    "type" : "user",
    "created" : 1400495142739,
    "modified" : 1400495142739,
    "username" : "lgqieuevag",
    "activated" : true
  }, {
    "uuid" : "6d3ba2ea-df41-11e3-b304-eb2e9192a84a",
    "type" : "user",
    "created" : 1400495784974,
    "modified" : 1400495784974,
    "username" : "quqx6qjmb2",
    "activated" : true
  } ],
  "timestamp" : 1409576576785,
  "duration" : 9426,
  "organization" : "easemob-demo",
  "applicationName" : "chatdemoui",
  "cursor" : "LTU2ODc0MzQzOmJUdWk2dDlCRWVPekJPc3VrWktvU2c"
}
</code></pre>

## 重置IM用户密码  {#resetpassword}
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{username}/password
- HTTP Method : PUT
- URL Params : 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： {"newpassword" : "${新密码指定的字符串}"}
- Response Body ：  详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

#### curl示例：

<pre class="hll"><code class="language-java">
curl -X PUT -H "Authorization: Bearer YWMtSozP9jHNEeSQegV9EKeAQAAAUlmBR2bTGr-GP2xNh8GhUCdKViBFgtox3M" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/users/ywuxvxuir6/password" -d '{"newpassword" : "123456"}'
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "set user password",
  "timestamp" : 1409575962124,
  "duration" : 326
}
</code></pre>

## 修改用户昵称  {#nickname}
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{username}
- HTTP Method : PUT
- URL Params : 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： {"nickname" : "${昵称值}"}
- Response Body ：  详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

 
#### curl示例：

<pre class="hll"><code class="language-java">
curl -X PUT -H "Authorization: Bearer YWMtSozP9jHNEeSQegV9EKeAQAAAUlmBR2bTGr-GP2xNh8GhUCdKViBFDSEF2E" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/users/jianguo" -d '{"nickname" : "张建国"}'
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "put",
  "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
  "path" : "/users",
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/users",
  "entities" : [ {
    "uuid" : "c3b56d5a-7135-11e4-92d2-edab82ae2302",
    "type" : "user",
    "created" : 1416543645861,
    "modified" : 1416550240537,
    "username" : "jianguo",
    "activated" : true,
    "device_token" : "61491f49f3e69cd1d62c5b390e42f4b1cd15bf1a876a487268cfaef9960188ee",
    "nickname" : "张建国"
  } ],
  "timestamp" : 1416550240285,
  "duration" : 278,
  "organization" : "easemob-demo",
  "applicationName" : "chatdemoui"
}
</code></pre>



## 给IM用户的添加好友  {#contactsfriend}
> 给一个用户添加好友, 好友必须是和自己在一个app下的IM用户.{owner_username} 是要添加好友的用户名, {friend_username} 是被添加的用户名
> 
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{owner_username}/contacts/users/{friend_username}
- HTTP Method : POST
- URL Params : 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ：  详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （此IM用户或被添加的好友不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

#### curl示例：
		
<pre class="hll"><code class="language-java">
curl -X POST -H "Authorization: Bearer YWMtP_8IisA-EeK-a5cNq4Jt3QAAAT7fI10IbPuKdRxUTjA9CNiZMnQIgk0LEU2" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/users/jliu/contacts/users/yantao"
</code></pre>

#### Respone 示例：

<pre class="hll"><code class="language-java">
{
    "action":"post","application":"4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5","params":{},
    "path":"/users/aa6160da-eb01-11e3-ab09-15edd986e7b7/contacts",
    "uri":"https://a1.easemob.com/easemob-demo/chatdemoui/users/jliu/contacts/yantao",
    "entities":[
        	{
        	"uuid":"0086742a-dc9b-11e3-a782-1b5d581c57a9",
        	"type":"user",
        	"created":1400204403810,
        	"modified":1400204403810,
        	"username":"yantao",
        	"activated":true
        	}
    ],
    
    "timestamp":1406086326974,"duration":242,
    "organization":"easemob-demo",
    "applicationName":"chatdemoui"
}
</code></pre>

## 解除IM用户的好友关系 {#delfriend}
> 从IM用户的好友列表中移除一个用户
> 
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{owner_username}/contacts/users/{friend_username}
- HTTP Method : DELETE
- URL Params : 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ：  详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （此IM用户或被解除的好友不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

#### curl示例：
		
<pre class="hll"><code class="language-java">
curl -X DELETE -i -H "Authorization: Bearer YWMtP_8IisA-EeK-a5cNq4Jt3QAAAT7fI10IbPuKdRxUTjA9CNiZMnQIgk0LEU2" "https://a1.easemob.com/easemob-demo/chatdemoui/users/stliu/contacts/users/yantao"
</code></pre>

#### Respone 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "delete",
  "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
  "params" : { },
  "path" : "/users/stliu/contacts",
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/users/stliu/contacts/users/yantao",
  "entities" : [ {
    "uuid" : "aa6160da-eb01-11e3-ab09-15edd986e7b7",
    "type" : "user",
    "created" : 1401787813725,
    "modified" : 1409739134225,
    "username" : "88888",
    "activated" : true,
    "device_token" : "67aab3a88a0b146b7883e7b0275ffe94f509a4e69e8b1db503b2fa4f9c556dd3",
    "nickname" : "88888",
    "notification_display_style" : 0,
    "notification_no_disturbing" : false,
    "notification_no_disturbing_end" : 24,
    "notification_no_disturbing_start" : 0,
    "notifier_name" : "chatdemoui_dev"
  } ],
  "timestamp" : 1409739808288,
  "duration" : 1575,
  "organization" : "easemob-demo",
  "applicationName" : "chatdemoui"
}
</code></pre>

## 查看好友  {#queryfriend}
> 查看某个IM用户的好友信息
> 
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{owner_username}/contacts/users
- HTTP Method : GET
- URL Params : 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ：  详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （此IM用户或要查看的好友不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 
    
#### curl示例

<pre class="hll"><code class="language-java">
curl -X GET -H "Authorization: Bearer YWMtP_8IisA-EeK-a5cNq4Jt3QAAAT7fI10IbPuKdRxUTjA9CNiZMnQIgk0LEU2" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/users/v3y0kf9arx/contacts/users"
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "get",
  "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
  "params" : { },
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/users/v3y0kf9arx/contacts/users",
  "entities" : [ ],
  "data" : [ "88888" ],
  "timestamp" : 1409737366071,
  "duration" : 45,
  "organization" : "easemob-demo",
  "applicationName" : "chatdemoui"
}
</code></pre>


## 获取IM用户的黑名单 {#blocksusers}
> 获取一个IM用户的黑名单
> 
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{owner_username}/blocks/users
- HTTP Method : GET
- URL Params : 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ： "data" : [ "stliu2" ]  ---  黑名单中的用户的用户名：stliu2 
- 可能的错误码： <br/>
404 （此IM用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 
    
#### curl示例

<pre class="hll"><code class="language-java">
curl -X GET -H "Authorization: Bearer YWMtwIRGSE9gEeSbpNnVBsIhiwAAAUon2XDyEBoBUk6Vg2xm8DZdVjxbhwm7XWY" -i  "https://a1.easemob.com/easemob-demo/chatdemoui/users/v3y0kf9arx/blocks/users"
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "get",
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/users/v3y0kf9arx/blocks/users",
  "entities" : [ ],
  "data" : [ "stliu2" ],
  "timestamp" : 1412824409803,
  "duration" : 36
}
</code></pre>


## 往IM用户的黑名单中加人 {#addblocksusers}
> 往一个IM用户的黑名单中加人
> 
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{owner_username}/blocks/users
- HTTP Method : POST
- URL Params : 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： {"usernames":["5cxhactgdj", "mh2kbjyop1"]}      ----  需要加入到黑名单中的用户名以数组方式提交，usernames为关键字不变，
- Response Body ： "data" : [ "5cxhactgdj", "mh2kbjyop1" ]  ---  已经加到黑名单中的用户名：5cxhactgdj, mh2kbjyop1
- 可能的错误码： <br/>
404 （此IM用户或被添加的用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

    
#### curl示例

<pre class="hll"><code class="language-java">
curl -X POST -H 'Authorization: Bearer YWMtwIRGSE9gEeSbpNnVBsIhiwAAAUon2XDyEBoBUk6Vg2xm8DZdVjxbhwm7XWY' -i  'https://a1.easemob.com/easemob-demo/chatdemoui/users/v3y0kf9arx/blocks/users' -d '{"usernames":["5cxhactgdj", "mh2kbjyop1"]}'
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "post",
  "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui",
  "entities" : [ ],
  "data" : [ "5cxhactgdj", "mh2kbjyop1" ],
  "timestamp" : 1412825162092,
  "duration" : 15,
  "organization" : "easemob-demo",
  "applicationName" : "chatdemoui"
}
</code></pre>

## 从IM用户的黑名单中减人 {#delblocksusers}
> 从一个IM用户的黑名单中减人
> 
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{owner_username}/blocks/users/{blocked_username}
- HTTP Method : DELETE
- URL Params : 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ：无
- Response Body ： entities 中包含了刚刚从黑名单中移除的IM用户的详细信息
- 可能的错误码： <br/>
404 （此IM用户或被减的用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 
   
#### curl示例

<pre class="hll"><code class="language-java">
curl -X DELETE -H 'Authorization: Bearer YWMtwIRGSE9gEeSbpNnVBsIhiwAAAUon2XDyEBoBUk6Vg2xm8DZdVjxbhwm7XWY' -i  'https://a1.easemob.com/easemob-demo/chatdemoui/users/v3y0kf9arx/blocks/users/5cxhactgdj'
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
  "action" : "delete",
  "application" : "4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5",
  "path" : "/users/72bb4f9a-fce7-11e3-98f4-adc39e9f4363/blocks",
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/users/v3y0kf9arx/blocks",
  "entities" : [ {
    "uuid" : "7cc785ea-dfcc-11e3-b24a-d5b4112501a1",
    "type" : "user",
    "created" : 1400555511102,
    "modified" : 1400555511102,
    "username" : "5cxhactgdj",
    "activated" : true
  } ],
  "timestamp" : 1412825354550,
  "duration" : 164,
  "organization" : "easemob-demo",
  "applicationName" : "chatdemoui"
}
</code></pre>


## 查看用户在线状态 {#status}
> 查看一个用户的在线状态
> 
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{username}/status
- HTTP Method : GET
- URL Params ： 无
- Request Headers :  {"Content-Type":"application/json","Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （此用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

#### curl示例：

<pre class="hll"><code class="language-java">
curl -X GET -i -H "Authorization: Bearer YWMtxc6K0L1aEeKf9LWFzT9xEAAAAT7MNR_9OcNq-GwPsKwj_TruuxZfFSC2eIQ" "https://a1.easemob.com/easemob-demo/chatdemoui/users/zw123/status"
</code></pre>

#### Response 示例：

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


## 查询离线消息数 {#msgcount}
> 获取一个IM用户的离线消息数
> 
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{owner_username}/offline_msg_count
- HTTP Method : GET
- URL Params : 无
- Request Headers : {"Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ： "data" : {"v3y0kf9arx" : 0 }      ----  用户名：v3y0kf9arx ，离线消息数：0条
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
  "uri" : "https://a1.easemob.com/easemob-demo/chatdemoui/users/v3y0kf9arx/offline_msg_count",
  "entities" : [ ],
  "data" : {
    "v3y0kf9arx" : 0
  },
  "timestamp" : 1412823831894,
  "duration" : 57
}
</code></pre>


## 查询某条离线消息状态 {#offlineMsgStatus}
> 通过离线消息的id查看用户的该条离线消息状态
> 
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{username}/offline_msg_status/{msg_id}
- HTTP Method : GET
- URL Params ： 无
- Request Headers :  {"Content-Type":"application/json","Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （此用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

#### curl示例：

<pre class="hll"><code class="language-java">
curl -X GET -i -H "Authorization: Bearer YWMtxc6K0L1aEeKf9LWFzT9xEAAAAT7MNR_9OcNq-GwPsKwj_TruuxZfFSC2eIQ" "https://a1.easemob.com/easemob-demo/chatdemoui/users/zw123/offline_msg_status/1121212"
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
    "action": "get",
    "uri": "https://a1.easemob.com/easemob-demo/chatdemoui/users/jianxin/offline_msg_status/12",
    "entities": [],
    "data": {
        "12": "delivered"      // 格式："{消息id}":"{状态}", 状态的值有两个: deliverd 表示此用户的该条离线消息已经收到过了，undelivered 表示此用户的该条离线消息未还未收到
    },
    "timestamp": 1423573644082,
    "duration": 644
}
</code></pre>


## 用户账号禁用 {#deactivate}
> 禁用某个IM用户的账号，禁用后该用户不可登录，下次解禁后该账户恢复正常使用。
> 
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{username}/deactivate
- HTTP Method : POST
- URL Params ： 无
- Request Headers :  {"Content-Type":"application/json","Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （此用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/)

#### curl示例：

<pre class="hll"><code class="language-java">
curl -X POST -i -H "Authorization: Bearer YWMtxc6K0L1aEeKf9LWFzT9xEAAAAT7MNR_9OcNq-GwPsKwj_TruuxZfFSC2eIQ" "https://a1.easemob.com/easemob-demo/chatdemoui/users/zw123/deactivate"
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
    "action": "Deactivate user",
    "entities": [
        {
            "uuid": "3861665a-07e5-11e4-b1d3-b70cde5a834c",
            "type": "user",
            "created": 1404964180277,
            "modified": 1424781662293,
            "username": "zw123",
            "activated": false,
            "nickname": "zw123"
        }
    ],
    "timestamp": 1424846198409,
    "duration": 244
}
</code></pre>


## 用户账号解禁 {#activate}
> 解除对某个IM用户账号的禁用，解禁后用户恢复正常使用。
> 
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{username}/activate
- HTTP Method : POST
- URL Params ： 无
- Request Headers :  {"Content-Type":"application/json","Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （此用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

#### curl示例：
	
<pre class="hll"><code class="language-java">
curl -X POST -i -H "Authorization: Bearer YWMtxc6K0L1aEeKf9LWFzT9xEAAAAT7MNR_9OcNq-GwPsKwj_TruuxZfFSC2eIQ" "https://a1.easemob.com/easemob-demo/chatdemoui/users/zw123/activate"
</code></pre>

#### Response 示例：

<pre class="hll"><code class="language-java">
{
    "action": "activate user",
    "timestamp": 1424845777195,
    "duration": 2
}
</code></pre>


## 强制用户下线 {#disconnect}
> 如果某个IM用户已经登录环信服务器，强制其退出登录。
>
> **接口限流说明: 同一个IP每秒最多可调用30次, 超过的部分会返回503错误, 所以在调用程序中, 如果碰到了这样的错误, 需要稍微暂停一下并且重试。如果该限流控制不满足需求，请联系商务经理开放更高的权限。**

- Path : /{org_name}/{app_name}/users/{username}/disconnect
- HTTP Method : GET
- URL Params ： 无
- Request Headers :  {"Content-Type":"application/json","Authorization":"Bearer ${token}"}
- Request Body ： 无
- Response Body ： 详情参见示例返回值, 返回的json数据中会包含除上述属性之外的一些其他信息，均可以忽略。
- 可能的错误码： <br/>
404 （此用户不存在） <br/>401（未授权[无token,token错误,token过期]） <br/>5xx <br/> 详见：[REST接口错误码](http://www.easemob.com/docs/helps/errorcodes/) 

#### curl示例：

<pre class="hll"><code class="language-java">
curl -X GET -i -H "Authorization: Bearer YWMtxc6K0L1aEeKf9LWFzT9xEAAAAT7MNR_9Ocqq-GwPsKwj_TruuxZfFSC2eIQ" "https://a1.easemob.com/easemob-demo/chatdemoui/users/zw123/disconnect"
</code></pre>

#### Response 示例：
<pre class="hll"><code class="language-java">
{
  "action" : "Disconnect user",
  "data" : {
    "result" : true    // true表示强制下线成功，false表示强制用户下线失败
  },
  "timestamp" : 1430825373659,
  "duration" : 16
}
</code></pre>
