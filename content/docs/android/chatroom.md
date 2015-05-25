---
title: 环信
sidebar: androidsidebar
secondnavandroid: true
---

#聊天室功能集成

环信聊天室模型支持最大成员数为5000，和群组不同，聊天室内成员离线后，服务器当监听到此成员不在线后不在会给此成员再发推送

* 支持最大成员5000
* 环信的聊天室内仅有有owner和游客
* 不支持客户端建立聊天室
* 不支持客户端邀请
* 不支持REST邀请

##功能：

REST

* 支持建群
  * curl -X POST "http://a1.easemob.com/easemob-demo/chatdemoui/chatrooms" -H "Authorization: Bearer ${token}" -d '{"owner":"u1","members":["u1","u2"],"maxusers":5000,"groupname":"chatroom title","desc":"chatroom description"}'

* 支持查询所有APP聊天室
  * curl -X GET "http://a1.easemob.com/easemob-demo/chatdemoui/chatrooms" -H "Authorization: Bearer ${token}"

* 支持查询聊天室详情
  * curl -X GET "http://a1.easemob.com/easemob-demo/chatdemoui/chatrooms/1430798028680235" -H "Authorization: Bearer ${token}"

* 支持聊天室踢人
  * curl -X DELETE 'https://a1.easemob.com/easemob-demo/chatdemoui/chatrooms/1430798028680235/users/u2' -H "Authorization: Bearer ${token}"

* 支持删除聊天室
  * curl -X DELETE 'https://a1.easemob.com/easemob-demo/chatdemoui/chatrooms/143228117786605' -H "Authorization: Bearer ${token}"


###客户端

* 支持查询所有APP聊天室
* 支持查询聊天室详情
* 加入聊天室
* 退出聊天室

客户端的API都是通过***EMChatManager***获取

__加入聊天室__

`public void joinChatRoom(final String roomId, final EMValueCallBack<EMChatRoom> callback)`

参数：

roomId: 聊天室Id, 一般都会从自己APP的后台获取

callback: `EMValueCallBack<EMChatRoom>` 加入成功返回聊天室简要信息，加入失败返回error

Example:

<pre class="hll"><code class="language-java">
        
    public void onChatroomViewCreation{
    
        findViewById(R.id.container_to_group).setVisibility(View.GONE);
        
        final ProgressDialog pd = ProgressDialog.show(this, "", "Joining......");
        EMChatManager.getInstance().joinChatRoom(toChatUsername, new EMValueCallBack<EMChatRoom>() {
        
        @Override
        public void onSuccess(EMChatRoom value) {
             runOnUiThread(new Runnable(){
                   @Override
                   public void run(){
                        pd.dismiss();
                        room = EMChatManager.getInstance().getChatRoom(toChatUsername);
                        if(room !=null){
                            ((TextView) findViewById(R.id.name)).setText(room.getName());
                        }else{
                            ((TextView) findViewById(R.id.name)).setText(toChatUsername);
                        }
                        EMLog.d(TAG, "join room success : " + room.getName());
                        
                        onConversationInit();
                        
                        onListViewCreation();
                   }
               });
        }
        
        @Override
        public void onError(final int error, String errorMsg) {
               EMLog.d(TAG, "join room failure : " + error);
               runOnUiThread(new Runnable(){
                   @Override
                   public void run(){
                       pd.dismiss();
                   }
               });
               finish();
            }
        });
	}
	

    protected void onConversationInit(){
    
	    if(chatType == CHATTYPE_SINGLE){
	        conversation = EMChatManager.getInstance().getConversationByType(toChatUsername,EMConversationType.Chat);
	    }else if(chatType == CHATTYPE_GROUP){
	        conversation = EMChatManager.getInstance().getConversationByType(toChatUsername,EMConversationType.GroupChat);
	    }else if(chatType == CHATTYPE_CHATROOM){
	        conversation = EMChatManager.getInstance().getConversationByType(toChatUsername,EMConversationType.ChatRoom);
	    }
	     
        // 把此会话的未读数置为0
        conversation.markAllMessagesAsRead();

        // 初始化db时，每个conversation加载数目是getChatOptions().getNumberOfMessagesLoaded
        // 这个数目如果比用户期望进入会话界面时显示的个数不一样，就多加载一些
        final List&lt;EMMessage&gt; msgs = conversation.getAllMessages();
        int msgCount = msgs != null ? msgs.size() : 0;
        if (msgCount &lt; conversation.getAllMsgCount() && msgCount &lt; pagesize) {
            String msgId = null;
            if (msgs != null && msgs.size() &gt; 0) {
                msgId = msgs.get(0).getMsgId();
            }
            if (chatType == CHATTYPE_SINGLE) {
                conversation.loadMoreMsgFromDB(msgId, pagesize);
            } else {
                conversation.loadMoreGroupMsgFromDB(msgId, pagesize);
            }
        }
        
        // 监听聊天室变化回调
        EMChatManager.getInstance().addChatRoomChangeListener(new EMChatRoomChangeListener(){

            @Override
            public void onInvitationReceived(String roomId, String roomName,
                    String inviter, String reason) {                
            }

            @Override
            public void onChatRoomDestroyed(String roomId, String roomName) {
                if(roomId.equals(toChatUsername)){
                    finish();
                }
            }

            @Override
            public void onMemberJoined(String roomId, String participant) {                
            }

            @Override
            public void onMemberExited(String roomId, String roomName,
                    String participant) {
                
            }

            @Override
            public void onMemberKicked(String roomId, String roomName,
                    String participant) {
                if(roomId.equals(toChatUsername)){
                    String curUser = EMChatManager.getInstance().getCurrentUser();
                    if(curUser.equals(participant)){
                        EMChatManager.getInstance().leaveChatRoom(toChatUsername);
                        finish();
                    }
                }
            }
            
        });
	}
</code></pre>	

	
**请注意对于聊天室模型，请一定要等到Join回调成功后再去初始化conversation**

__离开聊天室__

<pre class="hll"><code class="language-java">
public void leaveChatRoom(String roomId)

</code></pre>


参数:

roomId: 要退出的聊天室的Id

此方法是异步方法，不会阻塞当前线程。此方法没有回调，原因是在任何场景下退出聊天室，**SDK保证退出成功，无论有网出错，还是无网退出**。
对于聊天室模型，一般退出会话页面，就会调用此leave方法。

`public EMCursorResult<EMChatRoom> fetchPublicChatRoomsFromServer(int pageSize, String cursor) throws EaseMobException
`
参数:
pageSize : 此次获取的条目
cursor : 后台需要的cursor id，根据此Id再次获取pageSize的条目，首次传null即可

返回值:

`EMCursorResult<EMChatRoom> ` 内部包含返回的cursor，和 `List<EMChatRoom>`

获取所有环信的聊天室信息，包括聊天室Id和名称


`public EMChatRoom fetchChatRoomFromServer(String roomId) throws EaseMobException
`
获取聊天室详情

__聊天室回调监听__

<pre class="hll"><code class="language-java">
    public interface EMChatRoomChangeListener {
    /**
     * 聊天室被解散。
     * 
     * @param roomId
     *            聊天室id
     * @param roomName
     *            聊天室名称
     */
    void onChatRoomDestroyed(String roomId, String roomName);

    /**
     * 聊天室加入新成员事件
     * 
     * @param roomId
     *          聊天室id
     * @param participant
     *          新成员username
     */
    void onMemberJoined(String roomId, String participant);

    /**
     * 聊天室成员主动退出事件
     * 
     * @param roomId
     *          聊天室id
     * @param roomName
     *          聊天室名字
     * @param participant
     *          退出的成员的username
     */
    void onMemberExited(String roomId, String roomName, String participant);

    /**
     * 聊天室人员被移除
     * 
     * @param roomId
     *          聊天室id
     *@param roomName
     *          聊天室名字
     * @param participant
     *          被移除人员的username
     */
    void onMemberKicked(String roomId, String roomName, String participant);
    }
</code></pre>



应用可以通过注册聊天室监听，进行对UI的刷新

`public void addChatRoomChangeListener(EMChatRoomChangeListener listener)
`

注册聊天室监听

在会话页面注册监听，来监听成员被踢和聊天室被删除

<pre class="hll"><code class="language-java">
    EMChatManager.getInstance().addChatRoomChangeListener(new EMChatRoomChangeListener(){

            @Override
            public void onChatRoomDestroyed(String roomId, String roomName) {
                if(roomId.equals(toChatUsername)){
                    finish();
                }
            }

            @Override
            public void onMemberJoined(String roomId, String participant) {                
            }

            @Override
            public void onMemberExited(String roomId, String roomName,
                    String participant) {
                
            }

            @Override
            public void onMemberKicked(String roomId, String roomName,
                    String participant) {
                if(roomId.equals(toChatUsername)){
                    finish();
                }
            }
            
        });
</code></pre>

移除聊天室监听

<pre class="hll"><code class="language-java">
    public void removeChatRoomChangeListener(EMChatRoomChangeListener listener)
    
</code></pre>







