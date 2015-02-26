---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

#群聊:

##发文字，语音，图片，位置 {#group-sendmessage}

### 收发消息及聊天记录相关等

这部分与单聊是一样的，详情见[单聊](http://www.easemob.com/docs/android/singlechat/#sendmessage)

## 新建群聊 {#group-new}

####创建私有群
私有群，不能被搜索到，只能通过群主加人进群，或者设置了allowInvite为true，即允许群成员邀
请，那么群成员也可以邀请群外面的人进入群聊，此种群群成员可以邀请，不能踢人，类似微信群。

<pre class="hll"><code class="language-java">
//groupName：要创建的群聊的名称
//desc：群聊简介
//members：群聊成员,为空时这个创建的群组只包含自己
//allowInvite:是否允许群成员邀请人进群
EMGroupManager.getInstance().createPrivateGroup(groupName, desc, members,allowInvite);

//前一种方法创建的群聊默认最大群聊用户数为200，传入maxUsers后设置自定义的最大用户数，最大为2000
EMGroupManager.getInstance().createPrivateGroup(groupName, desc, members,allowInvite,maxUsers);
</code></pre>

####创建公开群 
公开群可以被用户搜索到，并且可以直接加入或者申请加入

<pre class="hll"><code class="language-java">
//前面三个参数和创建私有群一致
//needApprovalRequired:如果创建的公开群用需要户自由加入，就传false。否则需要申请，等群主批准后才能加入，传true
EMGroupManager.getInstance().createPublicGroup(groupName, desc, members, needApprovalRequired);
	
//前一种方法创建的群聊默认最大群聊用户数为200，传入maxUsers后设置自定义的最大用户数，最大可以设为2000
EMGroupManager.getInstance().createPublicGroup(groupName, desc, members, needApprovalRequired,maxUsers);
</code></pre>		

## 群聊加人 {#group-joincontact}
<pre class="hll"><code class="language-java">
//群主加人调用此方法
EMGroupManager.getInstance().addUsersToGroup(groupId, newmembers);//异步执行
//私有群里，如果开放了群成员邀请，群成员邀请调用下面方法
EMGroupManager.getInstance().inviteUser(groupId, newmembers, null);//异步执行
</code></pre>

## 群聊减人 {#group-subcontact}
<pre class="hll"><code class="language-java">
//把username从群聊里删除
EMGroupManager.getInstance().removeUserFromGroup(groupId, username);//异步执行
</code></pre>

## 加入某个群聊 {#group-joinone}
只能用于加入公开群

<pre class="hll"><code class="language-java">
//如果群开群是自由加入的，即group.isMembersOnly()为false，直接join
EMGroupManager.getInstance().joinGroup(groupid);//异步执行
//需要申请和验证才能加入的，即group.isMembersOnly()为true，调用下面方法
EMGroupManager.getInstance().applyJoinToGroup(groupid, "求加入");//异步执行
</code></pre>

## 退出群聊 {#group-exit}
<pre class="hll"><code class="language-java">
EMGroupManager.getInstance().exitFromGroup(groupId);//异步执行
</code></pre>

## 解散群聊 {#group-dismiss}
<pre class="hll"><code class="language-java">
EMGroupManager.getInstance().exitAndDeleteGroup(groupId);//异步执行
</code></pre>

## 获取群聊列表	{#group-getlist}

<pre class="hll"><code class="language-java">
//从服务器获取自己加入的和创建的群聊列表（两种方式），此api获取的群组sdk会自动保存到内存和db。
//注意，获取到的列表里的群聊只有groupname和groupid等简单配置信息
1.List&lt;EMGroup&gt; grouplist = EMGroupManager.getInstance().getGroupsFromServer();//异步执行
	
2.EMGroupManager.getInstance().asyncGetGroupsFromServer(newEMValueCallBack&lt;List&lt;EMGroup&gt;&gt;() {
			
    @Override
	public void onSuccess(List&lt;EMGroup&gt; value) {
		// TODO Auto-generated method stub
				
	}
			
	@Override
	public void onError(int error, String errorMsg) {
		// TODO Auto-generated method stub
				
	}
});

//从本地加载群聊列表
List&lt;EMGroup&gt; grouplist = EMGroupManager.getInstance().getAllGroups();

//获取所有公开群列表（两种方式）
1.List&lt;EMGroupInfo&gt; groupsList = EMGroupManager.getInstance().getAllPublicGroupsFromServer();//异步执行
	
2.EMGroupManager.getInstance().asyncGetAllPublicGroupsFromServer(new EMValueCallBack&lt;List&lt;EMGroupInfo&gt;&gt;() {
			
    @Override
	public void onSuccess(List&lt;EMGroupInfo&gt; value) {
		// TODO Auto-generated method stub
	}
			
	@Override
	public void onError(int error, String errorMsg) {
	    // TODO Auto-generated method stub
				
	}
});
	
</code></pre>

## 获取单个群聊信息  {#group-getdetail}

<pre class="hll"><code class="language-java">
//根据群聊ID从本地获取群聊信息
EMGroup group = EMGroupManager.getInstance().getGroup(groupId);
//根据群聊ID从服务器获取群聊信息
EMGroup group =EMGroupManager.getInstance().getGroupFromServer(groupId);
//保存获取下来的群聊信息
EMGroupManager.getInstance().createOrUpdateLocalGroup(returnGroup);
group.getMembers();//获取群成员
group.getOwner();//获取群主
...
其它方法详见环信接口文档(http://www.easemob.com/apidoc/android/chat/)
</code></pre>
 
## 屏蔽群消息  {#group-block}

<pre class="hll"><code class="language-java">
/**
* 屏蔽群消息后，就不能接收到此群的消息 （群创建者不能屏蔽群消息）（还是群里面的成员，但不再接收消息）  
* @param groupId， 群id
* @throws EasemobException
*/
EMGroupManager.getInstance().blockGroupMessage(groupId);//异步执行
</code></pre>


## 解除屏蔽群  {#group-unblock}

<pre class="hll"><code class="language-java">
/**
* 取消屏蔽群消息,就可以正常收到群的所有消息
* @param groupId
* @throws EaseMobException
*/
EMGroupManager.getInstance().unblockGroupMessage(groupId);//异步执行
</code></pre>

## 修改群组名称  {#group-changename}

<pre class="hll"><code class="language-java">
//groupId 需要改变名称的群组的id
//changedGroupName 改变后的群组名称
EMGroupManager.getInstance().changeGroupName(groupId,changedGroupName);//异步执行
    
</code></pre>

## 群聊不提醒只显示数目 ## {#group-notnotify}

<pre class="hll"><code class="language-java">
//如果群聊只是想提示数目，不响铃。可以通过此属性设置，<strong>此属性是本地属性</strong>
EMChatManager.getInstance().getChatOptions().setReceiveNotNoifyGroup({List&lt;String&gt;})

</code></pre>


## 将群成员拉入群组的黑名单 ## {#group-blockuser}

<pre class="hll"><code class="language-java">
/**
* 将用户加到群组的黑名单，被加入黑名单的用户无法加入群，无法收发此群的消息
* （只有群主才能设置群的黑名单）
* @param groupId, 群组的id
* @param username, 待屏蔽的用户名
* @exception EaseMobException 出错会抛出
*/
EMGroupManager.getInstance().blockUser(groupId, username);//异步执行

</code></pre>

## 将拉入黑名单的群成员移除 ## {#group-unblockuser}

<pre class="hll"><code class="language-java">
/**
* 将用户从群组的黑名单移除（只有群主才能调用此函数）
* @param groupId, 群组的id
* @param username, 待解除屏蔽的 用户名
*/
EMGroupManager.getInstance().unblockUser(groupId, username);

</code></pre>

## 获取群组的黑名单用户列表 ## {#group-blockedusers}

<pre class="hll"><code class="language-java">
/**
* 获取群组的黑名单用户列表
* （只有群主才能调用此函数）
* @return List<String> 
* @throws EaseMobException 获取失败
*/
EMGroupManager.getInstance().getBlockedUsers(groupId);//异步执行

</code></pre>


### 群聊事件监听 ### {#group-listener}

<pre class="hll"><code class="language-java">
EMGroupManager.getInstance().addGroupChangeListener(new GroupChangeListener() {
	@Override
	public void onUserRemoved(String groupId, String groupName) {
		//当前用户被管理员移除出群聊
	}
	@Override
	public void onInvitationReceived(String groupId, String groupName, String inviter, String reason) {
		//收到加入群聊的邀请
	}
	@Override
	public void onInvitationDeclined(String groupId, String invitee, String reason) {
		//群聊邀请被拒绝
	}
	@Override
	public void onInvitationAccpted(String groupId, String inviter, String reason) {
		//群聊邀请被接受
	}
	@Override
	public void onGroupDestroy(String groupId, String groupName) {
		//群聊被创建者解散
	}
	@Override
	public void onApplicationReceived(String groupId, String groupName, String applyer, String reason) {
		//收到加群申请
	}
	@Override
	public void onApplicationAccept(String groupId, String groupName, String accepter) {
		//加群申请被同意
	}
	@Override
	public void onApplicationDeclined(String groupId, String groupName, String decliner, String reason) {
	    // 加群申请被拒绝
	}
});
</code></pre>


###Demo及SDK下载
[http://www.easemob.com/sdk/](http://www.easemob.com/sdk/)

###详细文档请参考 [java doc](http://www.easemob.com/apidoc/android/chat/)

