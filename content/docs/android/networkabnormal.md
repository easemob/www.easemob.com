---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

#网络异常监听:

1.在聊天过程中难免会遇到网络问题，在此SDK为您提供了网络监听接口，实时监听

2.对于同一个账号在多处登录，则根据本监听事件中的_onDisConnected_方法传递的int类型参数errorCode来进行判断是否同一个账号在其它地方进行了登录和账号是否被删除，若服务器返回的参数值为`EMError.CONNECTION_CONFLICT`，则认为是有同一个账号异地登录

<pre class="hll"><code class="language-java">
    //注册一个监听连接状态的listener
    EMChatManager.getInstance().addConnectionListener(new MyConnectionListener());

    //实现ConnectionListener接口
    private class MyConnectionListener implements EMConnectionListener {
        @Override
		public void onConnected() {
		}
		@Override
		public void onDisconnected(final int error) {
			runOnUiThread(new Runnable() {

				@Override
				public void run() {
					if(error == EMError.USER_REMOVED){
						// 显示帐号已经被移除
					}else if (error == EMError.CONNECTION_CONFLICT) {
						// 显示帐号在其他设备登陆
					} else {
		                 //"连接不到聊天服务器"
					}
				}
			});
		}
    }
    
</code></pre>


