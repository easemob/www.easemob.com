function getAppIMList(appUuid, owner_username, pageAction){
	// 获取token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		alert('提示\n\n会话已失效,请重新登录!');
		window.location.href = 'login.html';
	} else {
		if('next' == pageAction){
			pageNo += 1;
		} else if('forward' == pageAction){
			pageNo -= 1;
		}
		var temp = '';
		if(typeof(pageAction)!='undefined' && pageAction != ''){	
			temp = '&cursor='+cursors[pageNo];
		}
		$.ajax({
			url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/'+owner_username+'/contacts/users?limit=10' + temp,
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				alert(1);
			}
		});
	}
}