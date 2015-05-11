---
title: 入门指南
secondnavgettingstart: true
sidebar: gettingstartsidebar
---


#**群聊流程**


###方法一 群成员信息保存在环信服务器

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;环信服务器维护：groupid,owner,memeber,maxUser。</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;APP服务器保存除以上属性外的其他数据</p>
	
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由手机端创建群：通过SDK提供的方法创建某群，创建成功后把所有数据（群ID，群头像，群名称，标签等信息）放到APP服务器留存，当用户通过条件（附近的群、条件筛选等）得到群列表，查看群信息时，通过groupid到自己服务器获取群的用户数据（群名称、类别、头像等信息），从环信服务器获取群的群成员信息。</p>

![alt text](/creategroup_1.png "")

![alt text](/groupdetail_1.png "")

![alt text](/addgroup_1.png "")

###方法二 群成员信息与所有群信息一起保存在APP服务器

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由服务器创建群，手机端调用APP服务器的接口，APP服务器调用环信的REST接口创建群，这样创建群的ID，群名称等都在APP服务器留有备份，当用户通过搜索条件（附近的群、筛选某类别的群等）即可从APP服务器拿到所有的信息展示给用户，当用户点击加入此群时，通过调用APP服务器接口，APP服务器发送一条透传消息到群管理员（可以不局限于创建者，也就是说APP服务器可以控制群成员的级别实现多管理员），管理员收到申请后，同意此人加入则调用APP服务器接口，APP服务器调用环信的REST接口把此人拉入此群。</p>

![alt text](/creategroup_2.png "")

![alt text](/groupdetail_2.png "")

![alt text](/addgroup_2.png "")

####在群聊相关数据交互中，方法二和方法一相比的优缺点

**优点：**
群所有的数据均在APP服务器中，对于手机端，创建群、查看群详情等操作只需访问APP服务器即可，不必访问两个服务器，所有请求都需要在APP服务器，更好管理和控制。

**缺点：**
加群退群的申请通知只能通过透传实现，不如‘方法一’中直接调用很全的环信SDK接口方便。如若也用环信SDK的接口加减人，则会造成APP服务器维护的群成员和环信服务器中的群成员不一致。