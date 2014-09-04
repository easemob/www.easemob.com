---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

# 黑名单

### 获取黑民单列表
<pre class="hll"><code class="language-java">
	//获取黑名单用户的usernames
	EMContactManager.getInstance().getBlackListUsernames();

</code></pre>
### 把用户加入到黑民单
<pre class="hll"><code class="language-java">
	//第二个参数如果为true，则把用户加入到黑名单后双方发消息时对方都收不到；false,则
	//我能给黑名单的中用户发消息，但是对方发给我时我是收不到的
    EMContactManager.getInstance().addUserToBlackList(username,true);
</code></pre>
### 把用户从黑名单中移除
<pre class="hll"><code class="language-java">	
	EMContactManager.getInstance().deleteUserFromBlackList(username);
</code></pre>