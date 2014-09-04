---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

# 设置当前登录用户的昵称

更新当前用户的昵称(nickname)

<pre class="hll"><code class="language-java">
       //此方法主要为了在苹果推送时能够推送昵称(nickname)而不是userid,一般可以在登陆成功后从自己服务器获取到个人信息，然后拿到nick更新到环信服务器。并且，在个人信息中如果更改个人的昵称，也要把环信服务器更新下nickname 防止显示差异。
       EMChatManager.getInstance().updateCurrentUserNick(nickname);
      // 此方法传入一个字符串String类型的参数，返回成功或失败的一个Boolean类型的返回值

</code></pre>
									




