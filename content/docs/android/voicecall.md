---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

## 实时语音

###在application中注册实时语音监听

<pre class="hll"><code class="language-java">

IntentFilter callFilter = new IntentFilter(EMChatManager.getInstance().getIncomingCallBroadcastAction());
registerReceiver(new CallReceiver(), callFilter);

private class CallReceiver extends BroadcastReceiver {

	@Override
	public void onReceive(Context context, Intent intent) {
		// 拨打方username
		String from = intent.getStringExtra("from");
		// call type
		String type = intent.getStringExtra("type");

	}
}
        
</code></pre>

###通话状态监听

<pre class="hll"><code class="language-java">
/**
* 设置通话状态监听
* @param listener
*/
EMChatManager.getInstance().addVoiceCallStateChangeListener(new EMCallStateChangeListener() {
    @Override
    public void onCallStateChanged(CallState callState, CallError error) {
        switch (callState) {
        case CONNECTING: // 正在连接对方
           
            break;
        case CONNECTED: // 双方已经建立连接
           
            break;

        case ACCEPTED: // 电话接通成功
           
            break;
        case DISCONNNECTED: // 电话断了

            break;

        default:
            break;
        }

    }
});
	
</code></pre>

###拨打语音通话

<pre class="hll"><code class="language-java">
/**
* 拨打语音通话
* @param to
* @throws EMServiceNotReadyException
*/
try {
	EMChatManager.getInstance().makeVoiceCall(username);
} catch (EMServiceNotReadyException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
</code></pre>

### 接听通话

<pre class="hll"><code class="language-java">
/**
* 接听通话
* @throws EMNoActiveCallException
* @throws EMNetworkUnconnectedException
*/
try {
	EMChatManager.getInstance().answerCall();
} catch (EMNoActiveCallException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
} catch (EMNetworkUnconnectedException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
	
</code></pre>

### 拒绝接听
	
<pre class="hll"><code class="language-java">
/**
* 拒绝接听
* @throws EMNoActiveCallException
*/
try {
	EMChatManager.getInstance().rejectCall();
} catch (EMNoActiveCallException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
</code></pre>

### 挂断通话
	
<pre class="hll"><code class="language-java">
/**
* 挂断通话
*/
EMChatManager.getInstance().endCall();
</code></pre>