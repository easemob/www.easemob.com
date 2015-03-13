---
title: 环信
sidebar: iossidebar
secondnavios: true
---

## 新消息提示 
SDK中提供了方便的新消息提醒功能。可以在收到消息时调用，提醒用户有新消息。


调用播放音频

<pre class="hll"><code class="language-objective_c">
	// 播放音频
    [[EaseMob sharedInstance].deviceManager asyncPlayNewMessageSound];

</code></pre>

调用手机震动

<pre class="hll"><code class="language-objective_c">
	// 震动
    [[EaseMob sharedInstance].deviceManager asyncPlayVibration];

</code></pre>