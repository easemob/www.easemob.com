---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---
# android QA

##前期SDK初始化工作 {#init}

Q:环信的appkey可以写到代码里面吗？

A：不可以，必须写在AndroidManifest.xml中，因为在SDK中取appkey是指定到AndroidManifest.xml的

Q：SDK的初始化可以不写在application里面吗？

A：不允许，要写在application的oncreate方法里面，以保证初始化成功

##登陆 {#login}

Q:SDK默认是自动登录，我想手动登陆，可以取消吗？

A：可以，只要调用EMChat.getInstance().setAutoLogin(false)放在SDK初始化的前边就行

注：如果要实现每次手动登陆，一定要关掉自动登录


##被踢下线 {#offline}

   ![alt text](/conflict.jpg "Title")
   
    如果有这种conflict标志的日志出现那就是被踢了，
    1.确认一下是否在application里面加了下面那个判断
    2.确认是否在成功登陆以后调了创建用户的方法（不允许在登录以后还去调创建账户的方法）
    
   ![alt text](/judgeexception.jpg "Title")
   
上图报的错多数情况因为判断没有加，参照demo的application里面把下面这段代码加上

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
            return false;
        }

    private String getAppName(int pID) {
		String processName = null;
		ActivityManager am = (ActivityManager)this.getSystemService(ACTIVITY_SERVICE);
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
	

##群组 {#group}

   未登录情况下群组是获取不到的，本地数据库中如果没有存储群组列表会从服务器获取，就调EMGroupManager.getInstance().getGroupsFromServer()，如果本地已经存储了群组列表就要先调EMGroupManager.getInstance().loadAllGroups()从本地db获取群组放到内存中,在内存中获取群组列表调EMGroupManager.getInstance().getAllGroups()
   
Q：屏蔽群组出现forbidden(403) Owner privileges required是什么原因？

A:检查你是否已经对该群组做了屏蔽，再次调用屏蔽的方法则会返回上述问题
	

##聊天记录存储 {#chathistory}

   未登录情况下聊天记录是获取不到的， 登陆后先调用            EMChatManager.getInstance().loadAllConversations()放到内存中，从内存中在调用EMChatManager.getInstance().getAllConversations()去获取所有会话,
    获取单个会话EMChatManager.getInstance().getConversation(username)

###注册用户失败 {#register}
![alt text](/registererror.jpg "Title")
createAccountOnServer这个是注册用户的方法，如果出现了not-allowed(405)错误，那就让他去http://console.easemob.com/ 找，把那个用户注册模式切换成开放模式，如下图：

![alt text](/1.jpg "Title")

###消息透传 {#payload}

Q：注册了接收透传消息的广播，对方发送透传消息成功了，为什么收不到透传消息？

A：检查一下是否在注册完广播以后加上EMChat.getInstance().setAppInited()

##打包混淆 {#pack}
     如果apk要打包混淆的话，debug模式要关闭，否则会报错

