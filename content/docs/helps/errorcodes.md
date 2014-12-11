---
title: REST API 开发指南
secondnavhelps: true
sidebar: helpssidebar
---

## 环信服务器端REST API常见错误

>rest接口，调用成功返回响应码为200，返回数据结果为标准Json格式，如执行错误会返回其他响应码，并返回详情结果（也为标准Json格式），可根据error 字段判断具体错误。

例如： ![alt text](/response_icon.jpg "Response icon")

另：
建议对APP自己的服务器端调用的环信REST API做容错处理。比如要catch接口调用返回的异常，对于timeout这样的错误应该做重试。对于系统级别错误或重试后仍旧出错，应该记录到系统日志，并及时报警提示运维人员做补救措施，如人工补发。


http状态返回代码 4xx（请求错误）这些状态代码表示请求可能出错，妨碍了服务器的处理。
<br/>
http状态返回代码 5xx（服务器错误）这些状态代码表示服务器在尝试处理请求时发生内部错误。

|HTTP 返回码(statuscode)|说明(description)|
|---------------|------------|
|400 |（错误请求） 服务器不理解请求的语法。|
|401|（未授权） 请求要求身份验证。 对于需要token的接口，服务器可能返回此响应。|
|403|（禁止） 服务器拒绝请求。|
|404|（未找到） 服务器找不到请求的接口。|
|408|（请求超时）  服务器等候请求时发生超时。|
|500|（服务器内部错误）  服务器遇到错误，无法完成请求。|
|501|（尚未实施） 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。|
|502|（错误网关） 服务器作为网关或代理，从上游服务器收到无效响应。|
|503|（服务不可用） 服务器目前无法使用（由于超载或停机维护）。 通常，这只是暂时状态。|
|504|（网关超时） 服务器作为网关或代理，但是没有及时从上游服务器收到请求。|


<br/>

| HTTP statuscode  | 接口返回error  | 接口返回值 error_description   |   可能原因 |
|--------------|-----|----------------|--------------------------|
| 400      | invalid_grant| invalid username or password | 用户名或者密码输入错误|
| 400        | organization_application_not_found | "Could not find application for easemob-demo/aachatdemoui from URI: easemob-demo/aachatdemoui/users" | 找不到aachatdemoui对应的app, 可能是URL写错了 |
| 400        | illegal_argument | "Entity user requires a property named username" |  创建用户请求体未提供"username" |
| 400        | illegal_argument | "password or pin must provided" | 创建用户请求体未提供"password" |
| 400        | json_parse | "Unexpected character ('=' (code 61)): was expecting a colon to separate field name and value\n at [Source: java.io.BufferedInputStream@170e3f35; line: 1, column: 23]" | 发送请求时请求体不符合标准的JSON格式,服务器无法正确解析 |
| 400        | illegal_argument | "password or pin must provided" | 注册用户时json中提供了password但是值未空字符 |
| 400       |duplicate_unique_property_exists | "Application 4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5Entity user requires that property named username be unique, value of dddd exists" |  用户名已存在, dddd这个用户名在该app下已经存在 |
| 400        | illegal_argument | "newpassword is required" |  修改用户密码的请求体没提供newpassword属性 |
 400        |illegal_argument | "group member username1 doesn't exist" |  批量添加群组时预加入群组的新成员username不存在 |
| 401        |unauthorized | "registration is not open, please contact the app admin" |  app的用户注册模式为授权注册,但是注册用户时请求头没带token |
| 401        |auth_bad_access_token | "Unable to authenticate due to corrupt access token" | 发送请求时使用的token错误, 注意:不是token过期 |
| 401        |auth_bad_access_token| "Unable to authenticate" | 无效token, 符合token的格式,但是该token不是接受请求的系统生成的,系统无法识别该token  |
| 401        | | "Unable to authenticate due to expired access token" | token过期  |
| 404        | service_resource_not_found | "Service resource not found" | URL指定的资源不存在 |
| 500        |no_full_text_index | "Entity 'user' with property named 'username' is not full text indexed.  You cannot use the 'contains' operand on this field" | username不支持全文索引,不可以对该字段进行contains操作 |
| 500       |unsupported_service_operation | "Service operation not supported" | 请求方式不被发送请求的URL支持 | 
| 500       |web_application |  "javax.ws.rs.WebApplicationException"  |  错误的请求, 给一个未提供的API发送了请求  | 

