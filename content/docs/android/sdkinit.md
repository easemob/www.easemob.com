---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---


##SDK中相关异步处理，同步处理方法介绍

<font size="4" color="#033FA1">同步方法：在调用SDK里面的方法时，如果方法对应的参数里面有callback回调，直接调用

异步执行：调用SDK的方法里面没有对应callback参数，则需要开发者来异步操作

具体是否异步还是同步，也可以参考相关文档介绍的方法，，每一个方法后边都有注释信息提示开发者，未注释的则认为同步执行</font>

## SDK初始化    {#init}

要求在application中做初始化

<pre class="hll"><code class="language-java">

EMChat.getInstance().init(applicationContext);

/**
 * debugMode == true 时为打开，sdk 会在log里输入调试信息
 * @param debugMode
 * 在做代码混淆的时候需要设置成false
 */
EMChat.getInstance().setDebugMode(true);//在做打包混淆时，要关闭debug模式，如果未被关闭，则会出现程序无法运行问题
        
</code></pre>

#####注：如果你的app中有第三方的服务启动，请在初始化SDK <code class="language-java">EMChat.getInstance().init(applicationContext)</code>方法的前面添加以下相关代码（相应代码也可参考demo的application）

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


##登录鉴权    {#login}

### 登陆聊天服务器

<strong>需要注意：</strong>
登陆成功后需要调用<br/>
<code class="language-java">EMGroupManager.getInstance().loadAllGroups();</code><i>从本地数据库加载<b><font color="#65CB31" size="4em">群组</font></b>到内存的操作，如果你的应用中有群组，请加上这句话（要求在每次进入应用的时候调用）</i><br/>
<code class="language-java">EMChatManager.getInstance().loadAllConversations();</code><i>从本地数据库加载<b><font color="#65CB31" size="4em">聊天记录</font></b>到内存的操作(强烈要求在每次进入应用的时候调用)</i><br/>
保证进入主页面后本地会话和群组都load完毕。另外如果登陆过，app长期在后台再进的时候也可能会导致加载到内存的群组和会话为空，可以在主页面的oncreate里也加上这两句代码，当然，更好的办法应该是放在程序的开屏页，可参考demo的SplashActivity。

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

### 退出聊天登陆  {#logout}

<pre class="hll"><code class="language-java">
EMChatManager.getInstance().logout();//此方法为同步方法
或者
EMChatManager.getInstance().logout(new EMCallBack(){})//此方法为异步方法<br/>
//后文中，如遇到new EMCallBack()即为new EMCallBack(){}
	
</code></pre>

### 注册  {#register}

见Demo的RegisterActivity，注意用户名会自动转为小写字母，所以建议用户名均以小写注册(强烈建议开发者通过后台调用rest接口去注册环信id，客户端注册方法不提倡使用)
	
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


									
###相关错误码参考(亦可参考java doc相关文档)
 [http://www.easemob.com/docs/helps/androiderrorcode/](http://www.easemob.com/docs/helps/androiderrorcode/)

###Demo及SDK下载
[http://www.easemob.com/sdk/](http://www.easemob.com/sdk/)
 
###详细文档请参考 [java doc](http://www.easemob.com/apidoc/android/chat/)