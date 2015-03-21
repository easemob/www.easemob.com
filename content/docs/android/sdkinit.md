---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---


##SDK中相关异步处理，同步处理方法介绍 {#asynch}

<font size="4" color="#033FA1">同步方法：在调用SDK里面的方法时，如果方法对应的参数里面有callback回调，直接调用<br>异步方法：调用SDK的方法里面没有对应callback参数，则需要开发者来异步操作</br>具体是否异步还是同步，也可以参考相关文档介绍的方法，每一个方法后边都有注释信息提示开发者，未注释的则认为同步执行</br>注:对于没有回调的异步方法执行过程，是通过try catch来判断异步方法执行成功或者失败</font>

## 初始化SDK    {#init}

要求在application的oncreate方法中做初始化

<pre class="hll"><code class="language-java">

EMChat.getInstance().init(applicationContext);

/**
 * debugMode == true 时为打开，sdk 会在log里输入调试信息
 * @param debugMode
 * 在做代码混淆的时候需要设置成false
 */
EMChat.getInstance().setDebugMode(true);//在做打包混淆时，要关闭debug模式，如果未被关闭，则会出现程序无法运行问题
        
</code></pre>

#####注：如果你的app中有第三方的服务启动，请在初始化SDK （EMChat.getInstance().init(applicationContext)）方法的前面添加以下相关代码（相应代码也可参考demo的application）

<pre class="hll"><code class="language-java">

appContext = this;
int pid = android.os.Process.myPid();
String processAppName = getAppName(pid);
// 如果app启用了远程的service，此application:onCreate会被调用2次
// 为了防止环信SDK被初始化2次，加此判断会保证SDK被初始化1次
// 默认的app会在以包名为默认的process name下运行，如果查到的process name不是app的process name就立即返回

if (processAppName == null ||!processAppName.equalsIgnoreCase("com.easemob.chatuidemo")) {
    Log.e(TAG, "enter the service process!");
    //"com.easemob.chatuidemo"为demo的包名，换到自己项目中要改成自己包名
    
    // 则此application::onCreate 是被service 调用的，直接返回
    return;
}

</code></pre>

如何获取processAppName请参考以下方法

<pre class="hll"><code class="language-java">

private String getAppName(int pID) {
	String processName = null;
	ActivityManager am = (ActivityManager) this.getSystemService(ACTIVITY_SERVICE);
	List l = am.getRunningAppProcesses();
	Iterator i = l.iterator();
	PackageManager pm = this.getPackageManager();
	while (i.hasNext()) {
		ActivityManager.RunningAppProcessInfo info = (ActivityManager.RunningAppProcessInfo) (i.next());
		try {
			if (info.pid == pID) {
				CharSequence c = pm.getApplicationLabel(pm.getApplicationInfo(info.processName, PackageManager.GET_META_DATA));
				// Log.d("Process", "Id: "+ info.pid +" ProcessName: "+
				// info.processName +"  Label: "+c.toString());
				// processName = c.toString();
				processName = info.processName;
				return processName;
			}
		} catch (Exception e) {
			// Log.d("Process", "Error>> :"+ e.toString());
		}
	}
	return processName;
}
	
	
</code></pre>


### 注册  {#register}

注册模式分两种，开放注册和授权注册。只有开放注册时，才可以客户端注册。


开放注册是为了测试使用，正式环境中不推荐使用该方式注册环信账号， 授权注册的流程应该是您服务器通过环信提供的rest api注册，之后保存到您的服务器或返回给客户端。

注册用户名会自动转为小写字母，所以建议用户名均以小写注册(强烈建议开发者通过后台调用rest接口去注册环信id，客户端注册方法不提倡使用)
	
<pre class="hll"><code class="language-java">
new Thread(new Runnable() {
    public void run() {
      try {
         // 调用sdk注册方法
         EMChatManager.getInstance().createAccountOnServer(username, pwd);
      } catch (final Exception e) {
      //注册失败
		String errorMsg = e.getMessage();
		if(errorCode==EMError.NONETWORK_ERROR){
		    Toast.makeText(getApplicationContext(), "网络异常，请检查网络！", Toast.LENGTH_SHORT).show();
		}else if(errorCode==EMError.USER_ALREADY_EXISTS){
		    Toast.makeText(getApplicationContext(), "用户已存在！", Toast.LENGTH_SHORT).show();
		}else if(errorCode==EMError.UNAUTHORIZED){
			Toast.makeText(getApplicationContext(), "注册失败，无权限！", Toast.LENGTH_SHORT).show();
		}else{
			Toast.makeText(getApplicationContext(), "注册失败: " + e.getMessage(), Toast.LENGTH_SHORT).show();
      }
   }
}).start();
</code></pre>

##登录    {#login}

### 登陆聊天服务器

<strong>需要注意：</strong>
登陆成功后需要调用<br/>
<code class="language-java">EMGroupManager.getInstance().loadAllGroups();</code><i>从本地数据库加载<b><font color="#033FA1" size="4em">群组</font></b>到内存的操作，如果你的应用中有群组，请加上这句话（要求在每次进入应用的时候调用）</i><br/>
<code class="language-java">EMChatManager.getInstance().loadAllConversations();</code><i>从本地数据库加载<b><font color="#033FA1" size="4em">聊天记录</font></b>到内存的操作(强烈建议在每次进入应用的时候调用)</i><br/>
以上两个方法是为了保证进入主页面后本地会话和群组都load完毕。另外如果登陆过，app长期在后台再进的时候也可能会导致加载到内存的群组和会话为空，可以在主页面的oncreate里也加上这两句代码，当然，更好的办法应该是放在程序的开屏页，可参考demo的SplashActivity。

<pre class="hll"><code class="language-java">

EMChatManager.getInstance().login(userName,password,new EMCallBack() {//回调
	@Override
	public void onSuccess() {
		runOnUiThread(new Runnable() {
			public void run() {
				EMGroupManager.getInstance().loadAllGroups()；
				EMChatManager.getInstance().loadAllConversations();
				Log.d("main", "登陆聊天服务器成功！");		
			}
		});
	}

	@Override
	public void onProgress(int progress, String status) {

	}

	@Override
	public void onError(int code, String message) {
		Log.d("main", "登陆聊天服务器失败！");
	}
});
</code></pre>

##自动登录    {#autologin}

<font size="4em" color="#033FA1">即首次登录成功后，不需要再次调用登录方法，在下次app启动时，SDK会自动为您登录。并且如果您自动登录失败，也可以读取到之前的会话信息（以上情况是在未调用登出的情况下实现的）。</font>

配置是否进行自动登录

SDK中自动登录属性默认是true打开的，如果不需要自动登录，在初始化SDK之前，调用`EMChat.getInstance().setAutoLogin(false);`设置为false关闭

自动登录

自动登录在以下几种情况下会被取消

用户调用了SDK的登出动作;

用户在别的设备上更改了密码, 导致此设备上自动登陆失败;

用户的账号被从服务器端删除;

用户从另一个设备登录，把当前设备上登陆的用户踢出.

##重连	{#reconnection}

当掉线时，Android SDK会自动重连，无需进行任何操作。

<pre class="hll"><code class="language-java">

//注册一个监听连接状态的listener
EMChatManager.getInstance().addConnectionListener(new MyConnectionListener());

//实现ConnectionListener接口
private class MyConnectionListener implements EMConnectionListener {
    @Override
	public void onConnected() {
	//已连接到服务器
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
				if (NetUtils.hasNetwork(MainActivity.this))
					//连接不到聊天服务器
				else
					//当前网络不可用，请检查网络设置
				}
			}
		});
	}
}
</code></pre>

### 退出聊天登陆  {#logout}


<pre class="hll"><code class="language-java">
EMChatManager.getInstance().logout();//此方法为同步方法
</code></pre>
<pre class="hll"><code class="language-java">

//此方法为异步方法
EMChatManager.getInstance().logout(new EMCallBack() {
            
	@Override
	public void onSuccess() {
	    // TODO Auto-generated method stub
	    
	}
	
	@Override
	public void onProgress(int progress, String status) {
	    // TODO Auto-generated method stub
	    
	}
	
	@Override
	public void onError(int code, String message) {
	    // TODO Auto-generated method stub
	    
	}
});
	
</code></pre>

