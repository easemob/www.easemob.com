---
title: REST API 开发指南
secondnavhelps: true
sidebar: helpssidebar
---

## 环信服务器端REST API常见错误


| HTTP statuscode  |   接口返回值 error_description   |   可能原因 |
|--------------|----------------|--------------------------|
| 400      | "invalid username or password" | 用户名或者密码输入错误|
| 400       | "Could not find application for easemob-demo/aachatdemoui from URI: easemob-demo/aachatdemoui/users" | 找不到aachatdemoui对应的app, 可能是URL写错了 |
| 400       | "Entity user requires a property named username" |  创建用户请求体未提供"username" |
| 400       | "password or pin must provided" | 创建用户请求体未提供"password" |
| 400       | "Unexpected character ('=' (code 61)): was expecting a colon to separate field name and value\n at [Source: java.io.BufferedInputStream@170e3f35; line: 1, column: 23]" | 发送请求时请求体不符合标准的JSON格式,服务器无法正确解析 |
| 400       | "password or pin must provided" | 注册用户时json中提供了password但是值未空字符 |
| 400       | "Application 4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5Entity user requires that property named username be unique, value of dddd exists" |  用户名重复, dddd这个用户名在该app下已经存在 |
| 400       | "newpassword is required" |  修改用户密码的请求体没提供newpassword属性 |
 400       | "group member username1 doesn't exist" |  批量添加群组时预加入群组的新成员username不存在 |
| 401       | "registration is not open, please contact the app admin" |  app的用户注册模式为授权注册,但是注册用户时请求头没带token |
| 401       | "Unable to authenticate due to corrupt access token" | 发送请求时使用的token错误, 注意:不是token过期 |
| 401       | "Unable to authenticate" | 无效token, 符合token的格式,但是该token不是接受请求的系统生成的,系统无法识别该token  |
| 401       | "Unable to authenticate due to expired access token" | token过期  |
| 404       | "Service resource not found" | URL指定的资源不存在 |
| 500       | "Entity 'user' with property named 'username' is not full text indexed.  You cannot use the 'contains' operand on this field" | username不支持全文索引,不可以对该字段进行contains操作 |
 | 500      | "Service operation not supported" | 请求方式不被发送请求的URL支持 | 
 | 500      |  "javax.ws.rs.WebApplicationException"  |  错误的请求, 给一个未提供的API发送了请求  | 

