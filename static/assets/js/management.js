// Host
//var baseUrl = 'https://api.easemob.com';
var baseUrl = 'https://a1.easemob.com';

// 初始化加载
$(function() {
	// 支持Crossdomain
	$.support.cors = true;
		
	// 显示已登录用户nd
	$('#user_info').html('<small>Welcome,</small>'+$.cookie('cuserName'));
	
	var agreeCBoxObj = $("#agreeCBox"),
		formSubBtnObj = $('#formSubBtn');

	function changeBtnStatus() {
		var statusClass = 'btn-success';

		if(agreeCBoxObj.attr('checked')){
			formSubBtnObj.addClass(statusClass);
			formSubBtnObj.disabled = false;
		} else {
			formSubBtnObj.removeClass(statusClass);
			formSubBtnObj.disabled = true;
		}
	}

	// 注册按钮状态
	agreeCBoxObj.bind("click", function () {
		changeBtnStatus();
	});
	changeBtnStatus();
}) 

function showTipAndLogin() {
	alert('提示\n\n会话已失效,请重新登录!');
	window.location.href = '/console';
}

// 全角转换成半角
function ToCDB(str) {
	var tmp = "";
	for(var i=0;i<str.length;i++) {
		if(str.charCodeAt(i)>65248&&str.charCodeAt(i)<65375) {
			tmp += String.fromCharCode(str.charCodeAt(i)-65248);
		} else {
			tmp += String.fromCharCode(str.charCodeAt(i));
		}
	}

	return tmp
}

// 获取url参数
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

// 获得token
function getToken() {
	var access_token = $.cookie('access_token');
	return access_token;
}

// app概况也显示代码
function showCode(boxId){
	// IOS
	if('iosTab' == boxId){
		$('#iosTab').addClass('visible');
		
		var androidTabClassVal = $('#androidTab').attr('class');
		if(androidTabClassVal.indexOf("visible") > -1){
			$('#androidTab').removeClass('visible');
		}
	}
	// Android
	if('androidTab' == boxId){
		$('#androidTab').addClass('visible');
		
		var iosTabClassVal = $('#iosTab').attr('class');
		if(iosTabClassVal.indexOf("visible") > -1){
			$('#iosTab').removeClass('visible');
		}
	}
}

// 显示不同窗口
function show_box(boxId){
	// 修改内容高度，不让弹窗遮挡footer
	var minHeightObj = $($('.min-height-result')[0]);
	minHeightObj.css('minHeight', 500);

	// 登录
	if('login-box' == boxId){
		$('#login-box').addClass('visible');
		
		var oldSignupClassVal = $('#signup-box').attr('class');
		if(oldSignupClassVal.indexOf("visible") > -1){
			$('#signup-box').removeClass('visible');
		}
		
		var oldForgotClassVal = $('#forgot-box').attr('class');
		if(oldForgotClassVal.indexOf("visible") > -1){
			$('#forgot-box').removeClass('visible');
		}
	}
	// 注册
	if('signup-box' == boxId){
		minHeightObj.css('minHeight', 850);

		$('#signup-box').addClass('visible');
		
		var oldLoginClassVal = $('#login-box').attr('class');
		if(oldLoginClassVal.indexOf("visible") > -1){
			$('#login-box').removeClass('visible');
		}
		
		var oldForgotClassVal = $('#forgot-box').attr('class');
		if(oldForgotClassVal.indexOf("visible") > -1){
			$('#forgot-box').removeClass('visible');
		}
	}
	// 找回密码
	if('forgot-box' == boxId){
		$('#forgot-box').addClass('visible');
		
		var oldLoginClassVal = $('#login-box').attr('class');
		if(oldLoginClassVal.indexOf("visible") > -1){
			$('#login-box').removeClass('visible');
		}
		
		var oldSignupClassVal = $('#signup-box').attr('class');
		if(oldSignupClassVal.indexOf("visible") > -1){
			$('#signup-box').removeClass('visible');
		}
	}
}
 
// 找回密码表单校验
function resetPasswdFormValidate(){
	// 表单校验
	var email = $('#email').val();
	
	if('' == email){
		$('#emailEMsg').text('请填写用于找回密码的邮箱地址！');
		$('#email').focus();
		return false;
	}
  var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(!emailReg.test(email)){
		$('#emailEMsg').text('请输入有效的邮箱！');
 		$('#email').focus();
		return false;
 	}
 	
 	$('#emailEMsg').text();
 	return true;
}

// 找回密码
function resetPasswd(){
	var email = $('#email').val();
	var orgName = $('#orgName').val();
	
	if(resetPasswdFormValidate()){
		$.ajax({
			url:baseUrl + '/management/users/' + email + '/resetpw',
			type:'PUT',
			data:{},
			crossDomain:true,
			success:function(respData){
				// 告知发送邮件
				if(respData.status && respData.status == 'ok') {
					alert('提示!\n\n邮件已发送,请前往邮箱继续找回密码.');
				}
			},
			error:function(respData){
				var str = JSON.stringify(respData.responseText).replace('}','').replace('{','').split(',');
				var tmpArr = new Array();
				var errorMsg = '';
				for(var i = 0; i < str.length; i++) {
					tmpArr.push(str[i].replace(/\\/g,'').replace(/\"/g,'').split(':'));
				}
				for(var i = 0; i < tmpArr.length; i++) {
					if('error_description' == tmpArr[i][0]){
						if(tmpArr[i][1].indexOf("Could not find organization for email") > -1) {
							errorMsg = '该邮箱未注册过环信!';
						}
						if(tmpArr[i][1].indexOf("username") > -1) {
							errorMsg = '请联系系统管理员 !';
						}
					}
				}
				
				alert('提示\n\n' + errorMsg);
			}
		});
	}
}

// 找回密码表单校验
function resetPasswdReqFormValidate(){
	// 表单校验
	var password1 = $('#password1').val();
	var password2 = $('#password2').val();
	
 	if('' == password1){
		alert('提示\n\n密码不能为空！');
		$('#password1').focus();
		return false;
	}
	if(password1.length < 6 || password1.length > 20){
		$('#password1').focus();
		alert('提示\n\n密码长度在6-20个字符之间！');
		return false;
	}
		if(password2 != password1){
		alert('提示\n\n两次输入密码不一致！');
		$('#password2').focus();
		return false;
	}
 	
 	return true;
}

// 设置新密码
function resetPasswdReq(token,uuid){
	var password1=$('#password1').val();
	var	password2=$('#password2').val();
	var d = {
		'password1':password1,
		'password2':password2,
		'token':token
	}
	if(resetPasswdReqFormValidate()){
		$.ajax({
			url:baseUrl + '/management/users/'+uuid+'/resetpw',
			type:'POST',
			data:JSON.stringify(d),
			headers:{
				'Content-Type':'multipart/form-data'
			},
			success:function(respData){
				alert('提示!\n\重置密码成功!');
				window.location.href = 'https://console.easemob.com';
			},
			error:function(data){
				alert('提示!\n\重置密码失败!');
			}
		});
	}
}

// 注册表单校验
function regsFormValidate(){
	// 表单校验
	var regOrgName = $('#regOrgName').val();
	var regUserName = $('#regUserName').val();
	var regEmail = $('#regEmail').val();
	var regPassword = $('#regPassword').val();
	var regRePassword = $('#regRePassword').val();
	var regTel = $('#regTel').val();
	
	if('' == regOrgName){
		$('#regOrgNameSMsg').css('display','none');
		$('#regOrgNameEMsg').text('企业ID名不能为空！');
		//$('#regOrgName').focus();
		return false;
	}
	var regOrgNameRegex = /^(?!-)(?!.*?-$)[a-zA-Z0-9-]+$/;
	if(!regOrgNameRegex.test(regOrgName)){
		$('#regOrgNameSMsg').css('display','none');
	 	$('#regOrgNameEMsg').text('只能使用数字,字母,横线,且不能以横线开头和结尾！');
 		//$('#regOrgName').focus();
		return false;
 	}
 	if(regOrgName != '' && regOrgName.length < 3 || regOrgName.length > 18){
		$('#regOrgNameSMsg').css('display','none');
		$('#regOrgNameEMsg').text('企业ID长度在3-18个字符之间！');	
		//$('#regOrgName').focus();
		return false;
	}
	$('#regOrgNameSMsg').css('display','block');
	
	if('' == regUserName){
		$('#regUserNameSMsg').css('display','none');
		$('#regUserNameEMsg').text('用户名不能为空！');
		//$('#regUserName').focus();
		return false;
	}
	var regUserNameRegex = /^[0-9a-zA-Z]*$/;
	if(!regUserNameRegex.test(regUserName)){
		$('#regUserNameEMsg').text('用户名只能是字母,数字或字母数字组合！');
 		//$('#regUserName').focus();
		return false;
 	}
 	if(regUserName != '' && regUserName.length < 1 || regUserName.length > 18){
		$('#regUserNameSMsg').css('display','none');
		$('#regUserNameEMsg').text('用户长度在1-18个字符之间！');	
		//$('#regUserName').focus();
		return false;
	}
	$('#regUserNameSMsg').css('display','block');
	if('' == regPassword){
		$('#regPasswordSMsg').css('display','none');
		$('#regPasswordEMsg').text('密码不能为空！');
		//$('#regPassword').focus();
		return false;
	}
	if(regPassword.length < 6 || regPassword.length > 20){
		//$('#regPassword').focus();
		$('#regPasswordEMsg').text('密码长度在6-20个字符之间！');
		return false;
	}
	$('#regPasswordSMsg').css('display','block');
	if('' == regRePassword){
		//$('#regRePassword').focus();
		$('#regRePasswordEMsg').text('请再次输入密码！');
		return false;
	}
	if('' != regRePassword && regPassword != regRePassword){
		//$('#regPassword').focus();
		//$('#regRePassword').focus();
		$('#regRePasswordEMsg').text('两次密码不一致!');
		return false;
	}
	var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if('' == regEmail){
		$('#regEmailEMsg').text('请输入邮箱！');
		return false;
	}
	if(regEmail != '' && !emailReg.test(regEmail)){
		$('#regEmailEMsg').text('请输入有效的邮箱！');
		return false;
	}
	var regTelReg = /^[0-9]*$/;
	if(regTel != '' && !regTelReg.test(regTel)){
		$('#regTelSEMsg').css('display','none');
		$('#regTelEMsg').text('联系电话号码格式不符合要求！');
		//$('#regEmail').focus();
		return false;
	}
		
	$('#regOrgNameEMsg').text('');
	$('#regUserNameEMsg').text('');	
	$('#regPasswordEMsg').text('');
	$('#regRePasswordEMsg').text('');	
	$('#regEmailEMsg').text('');
	$('#regCompanyNameEMsg').text('');
	$('#regTelEMsg').text('');
	
	return true;
}
	
// 用户名重复性校验
function isUsernameExist(username){
}	

//注册表单清空
function resetForm(){
		$('#regOrgName').val('');
		$('#regUserName').val('');	
		$('#regPassword').val('');
		$('#regRePassword').val('');	
		$('#regEmail').val('');
		$('#regCompanyName').val('');
		$('#regTel').val('');
		
		$('#regOrgNameEMsg').text('');
		$('#regUserNameEMsg').text('');	
		$('#regPasswordEMsg').text('');
		$('#regRePasswordEMsg').text('');	
		$('#regEmailEMsg').text('');
		$('#regCompanyNameEMsg').text('');
		$('#regTelEMsg').text('');
}

// 注册
function formSubmit(){
	var regOrgName = $('#regOrgName').val();
	var regUserName = $('#regUserName').val();
	var regEmail = $('#regEmail').val();
	var regPassword = $('#regPassword').val();
	var regCompanyName = $('#regCompanyName').val();
	var regTel = $('#regTel').val();
	var mailSuffix = regEmail.substring(regEmail.indexOf('@')+1);
	
	var d = {
		organization:regOrgName,
		username:regUserName,
		email:regEmail,
		password:regPassword,
		companyName:regCompanyName,
		telephone:regTel
	};
	
	if(regsFormValidate()){
		// 注册用户信息
		$.ajax({
			url:baseUrl + '/management/organizations',
			type:'POST',
			crossDomain:true,
			headers:{
				'Content-Type':'application/json'
			},
			data:JSON.stringify(d),
			success: function(respData, textStatus, jqXHR) {
				$('#signup-box').removeClass('visible');
				$('#login-box').addClass('visible');
				$('#username').val(regUserName);
			
				// 告知发送邮件
				window.location.href = '/console/regist_org_success?mailSuffix='+mailSuffix+'&regEmail='+regEmail;
			},
			error: function(respData, textStatus, jqXHR) {
				var str = JSON.stringify(respData.responseText).replace('}','').replace('{','').split(',');
				var tmpArr = new Array();
				var errorMsg = '';
				for(var i = 0; i < str.length; i++) {
					tmpArr.push(str[i].replace(/\\/g,'').replace(/\"/g,'').split(':'));
				}
				for(var i = 0; i < tmpArr.length; i++) {
					if('error_description' == tmpArr[i][0]){
						if(tmpArr[i][1].indexOf("path") > -1) {
							errorMsg = '企业ID重复！';
						}
						if(tmpArr[i][1].indexOf("username") > -1) {
							errorMsg = '用户名重复 !';
						}
						if(tmpArr[i][1].indexOf("email") > -1) {
							errorMsg = '邮箱账户重复 !';
						}
					}
				}
				alert('注册失败!\n\n' + errorMsg);
			}
		});
	}
}

// 登录表单校验
function loginFormValidate(){
	// 表单校验
	var loginUserName = $('#username').val();
	var loginPassword = $('#password').val();
	if('' == loginUserName){
		$('#usernameEMsg').text('用户名不能为空！');
		$('#username').focus();
		return false;
	}
	if('' == loginPassword){
		$('#passwordEMsg').text('密码不能为空！');
		$('#password').focus();
		return false;
	}
	
	$('#usernameEMsg').text('');
	$('#passwordEMsg').text('');
	return true;
}

// System管理员登录
function sysAdminLogin() {
	var d = {
		'grant_type':'password',
		'username':$('#username').val(),
		'password':$('#password').val()
	};
	if(loginFormValidate()){
			// 登录获取token
			$.ajax({
				url:baseUrl+'/management/token',
				type:'POST',
				data:JSON.stringify(d),
				headers:{
					'Content-Type':'application/json'
				},
				error: function(respData, textStatus, errorThrown) {
					var str = JSON.stringify(respData.responseText).replace('}','').replace('{','').split(',');
					var tmpArr = new Array();
					var errorMsg = '';
					for(var i = 0; i < str.length; i++) {
						tmpArr.push(str[i].replace(/\\/g,'').replace(/\"/g,'').split(':'));
					}
					for(var i = 0; i < tmpArr.length; i++) {
						if('error_description' == tmpArr[i][0]){
							if(tmpArr[i][1].indexOf("User must be confirmed to authenticate") > -1) {
								errorMsg = '登陆失败，账户未激活!';
							}
							if(tmpArr[i][1].indexOf("invalid username or password") > -1) {
								errorMsg = '登陆失败，用户名或者密码错误!';
							}
						}
					}
					alert(errorMsg);
				},
				success: function(respData, textStatus, jqXHR) {
					var access_token = respData.access_token;
					var cuser = respData.user.username;
					var cuserName = respData.user.username;
					var loginuuid = respData.user.uuid;
					var orgName = '';
					var json = respData.user.organizations;
					$.each(json, function(i) {
					    orgName = i;
					});
					
					var date = new Date();
					date.setTime(date.getTime()+( 7 * 24 * 60 * 60 * 1000));
					$.cookie('access_token',access_token,{path:'/',expires:date});
					$.cookie('cuser',cuser,{path:'/',expires:date});
					$.cookie('cuserName',cuserName,{path:'/',expires:date});
				  $.cookie('orgName',orgName,{path:'/',expires:date});
				  $.cookie('loginuuid',loginuuid,{path:'/',expires:date});
				  
					window.location.href = '/console/app_list';
					location.replace('/console/app_list');
				}
		});
	}
}

// ORG管理员登录
function orgAdminLogin() {
	var d = {
		'grant_type':'password',
		'username':$('#username').val(),
		'password':$('#password').val()
	};
		if($('#rememberme:checked').length>0){
           $.cookie('tvs-cookies-userName',$('#username').val());
		   $.cookie('tvs-cookies-password',$('#password').val());
		}else{
           $.cookie('tvs-cookies-userName','');
		   $.cookie('tvs-cookies-password','');
		}
	if(loginFormValidate()){
			$('#cont').text('登录中...');
			$('#loginBtn').attr("disabled",true); 
					
			// 登录获取token
			$.ajax({
				url:baseUrl+'/management/token',
				type:'POST',
				data:JSON.stringify(d),
				headers:{
					'Content-Type':'application/json'
				},
				crossDomain:true,
				error: function(respData, textStatus, errorThrown) {
					var str = JSON.stringify(respData.responseText).replace('}','').replace('{','').split(',');
					var tmpArr = new Array();
					var errorMsg = '';
					for(var i = 0; i < str.length; i++) {
						tmpArr.push(str[i].replace(/\\/g,'').replace(/\"/g,'').split(':'));
					}
					for(var i = 0; i < tmpArr.length; i++) {
						if('error_description' == tmpArr[i][0]){
							if(tmpArr[i][1].indexOf("User must be confirmed to authenticate") > -1) {
								errorMsg = '登陆失败，账户未激活!';
								$('#cont').text('登录');
								$('#loginBtn').attr("disabled",false);
							}
							if(tmpArr[i][1].indexOf("invalid username or password") > -1) {
								errorMsg = '登陆失败，用户名或者密码错误!';
								$('#cont').text('登录');
								$('#loginBtn').attr("disabled",false);
							}
						}
					}
					alert(errorMsg);
				},
				success: function(respData, textStatus, jqXHR) {
					var access_token = respData.access_token;
					var cuser = respData.user.username;
					var cuserName = respData.user.username;
					var loginuuid = respData.user.uuid;
					var orgName = '';
					var json = respData.user.organizations;
					$.each(json, function(i) {
					    orgName = i;
					});
					var date = new Date();
					date.setTime(date.getTime()+( 7 * 24 * 60 * 60 * 1000));
					$.cookie('access_token',access_token,{path:'/',expires:date});
					$.cookie('cuser',cuser,{path:'/',expires:date});
					$.cookie('cuserName',cuserName,{path:'/',expires:date});
				    $.cookie('orgName',orgName,{path:'/',expires:date});
				    $.cookie('loginuuid',loginuuid,{path:'/',expires:date});
				  
					window.location.href = '/console/app_list';
					location.replace('/console/app_list');
				}
		});
	} else {
		$('#cont').text('登录');
		$('#loginBtn').attr("disabled",false);
	}
}

// APP管理员登录
function appAdminLogin() {
	var appkey = $('#qiyeid').val();
	// appkey validate
	if('' == appkey){
		$('#regqiyeid').text('请输入企业ID！');
		return;
	}
	
	var appkeyRegex = /^(?!-)(?!.*?-$)[a-zA-Z0-9-]+$/;
	if(!appkeyRegex.test(appkey)){
	 	$('#regqiyeid').text('只能使用数字,字母,横线,且不能以横线开头和结尾！');
		return;
 	}
  $('qiyeid').text('');
	
	var org = '';
	var app = '';
	
    org = $('#qiyeid').val();
	app = $('#yingyongname').val();
	
	var d = {
		'grant_type':'password',
		'username':$('#username').val(),
		'password':$('#password').val()
	};
	
	if(loginFormValidate()){
			// 登录获取token
			$.ajax({
				url:baseUrl+'/' + org + '/' + app + '/token',
				type:'POST',
				data:JSON.stringify(d),
				headers:{
					'Content-Type':'application/json'
				},
				crossDomain:true,
				error: function(respData, textStatus, errorThrown) {
					var str = JSON.stringify(respData.responseText).replace('}','').replace('{','').split(',');
					var tmpArr = new Array();
					var errorMsg = '';
					for(var i = 0; i < str.length; i++) {
						tmpArr.push(str[i].replace(/\\/g,'').replace(/\"/g,'').split(':'));
					}
					for(var i = 0; i < tmpArr.length; i++) {
						if('error_description' == tmpArr[i][0]){
							if(tmpArr[i][1].indexOf("User must be confirmed to authenticate") > -1) {
								errorMsg = '登陆失败，账户未激活!';
							}
							if(tmpArr[i][1].indexOf("invalid username or password") > -1) {
								errorMsg = '登陆失败，用户名或者密码错误!';
							}
						}
					}
					alert(errorMsg);
				},
				success: function(respData, textStatus, jqXHR) {
					var access_token = respData.access_token;
					var cuser = respData.user.username;
					var cuserName = respData.user.username;
					var loginuuid = respData.user.uuid;
					var orgName = '';
					
					var date = new Date();
					date.setTime(date.getTime()+(1 * 24 * 60 * 60 * 1000));
					$.cookie('access_token',access_token,{path:'/',expires:date});
					$.cookie('cuser',cuser,{path:'/',expires:date});
					$.cookie('cuserName',cuserName,{path:'/',expires:date});
				  $.cookie('orgName',org,{path:'/',expires:date});
				  $.cookie('appName',app,{path:'/',expires:date});
				  
					window.location.href = '/console/app_profile';
				}
		});
	}
}

// 退出登录
function logout() {
	// 销毁cookie
	$.cookie("access_token",null,{path:"/"});
	$.cookie("cuser",null,{path:"/"});
	$.cookie("cuserName",null,{path:"/"});
	$.cookie("orgName",null,{path:"/"});
	// 转到登陆页面
	window.location.href = "/console/";
}

// 时间格式转换 1399434332770 -> 
function add0(m){
	return m<10 ? '0'+m : m;
}
function format(timeST){
	var time = new Date(parseInt(timeST));
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

// 登录用户信息
function adminInfo(){
	// get org admin token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		$.ajax({
			url:baseUrl + '/management/organizations/'+orgName+'/users',
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error:function(respData, textStatus, jqXHR){
			},
			success:function(respData, textStatus, jqXHR){
				$(respData.data).each(function(){
					$('#username').text(this.username);
					$('#email').text(this.email);
					$('#companyName').text(this.properties.companyName);
					$('#telephone').text(this.properties.telephone);
				});
			}
		});
	}
}

// 修改登录用户信息
function updateAdminInfo(username, companyName, telephone){
	// get org admin token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	var d = {};
	if(companyName != '' && companyName != null){
		d.companyName = companyName;
	}
	if(telephone != '' && telephone != null){
		d.telephone = telephone;
	}
	
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		$.ajax({
			url: baseUrl + '/management/users/' + username,
			type:'PUT',
			data:JSON.stringify(d),
			headers:{
				'Authorization':'Bearer ' + access_token,
				'Content-Type':'application/json'
			},
			error:function(respData, textStatus, jqXHR){
			},
			success:function(respData, textStatus, jqXHR){
				alert('修改成功!');
				
				$('#companyNameInput').val('');
				$('#telephoneInput').val('');
				$('#companyNameInput').hide();
				$('#telephoneInput').hide();
				$('#showEditBtn').show();
				$('#saveAdminInfoBtn').hide();
				$('#cancelSaveAdminInfoBtn').hide();
				$('#telephone').show();
				$('#companyName').show();
		
				adminInfo();
			}
		});
	}
}

// 修改登录用户密码表单校验
function updateAdminPasswdFormValidate(){
	// 表单校验
	var oldpassword = $('#oldpassword').val();
	var newpassword = $('#newpassword').val();
	var renewpassword = $('#renewpassword').val();
	
	if('' == oldpassword){
		$('#oldpasswordEMsg').text('原密码不能为空！');
		$('#oldpassword').focus();
		return false;
	}
	$('#oldpasswordEMsg').text('');
	if('' == newpassword){
		$('#newpasswordEMsg').text('新密码不能为空！');
		$('#newpassword').focus();
		return false;
	}
	
	if(newpassword.length < 6 || newpassword.length > 20){
		$('#newpasswordEMsg').text('新密码长度在6-20个字符之间！');
		$('#newpassword').focus();
		return false;
	}
	$('#newpasswordEMsg').text('');
	if(renewpassword != newpassword){
		$('#renewpasswordEMsg').text('两次新密码不一致');
		return false;
	}
	
	$('#renewpasswordEMsg').text('');
	return true;
}

// 修改登录用户密码
validateAccessToken = '';
function updateAdminPasswd(){
	var access_token = $.cookie('access_token');
	var oldpassword = $('#oldpassword').val();
	var	newpassword = $('#newpassword').val();
	var loginuuid = $.cookie('loginuuid');
	var username = $.cookie('cuser');
	var d = {
		'oldpassword':oldpassword,
		'newpassword':newpassword
	}
	var dtoken = {
		'grant_type':'password',
		'username':username,
		'password':oldpassword
	}
	if(updateAdminPasswdFormValidate()){
		//校验旧密码
		$.ajax({
			url:baseUrl+'/management/token',
			type:'POST',
			data:JSON.stringify(dtoken),
			error: function(jqXHR, textStatus, errorThrown) {
				$('#oldpasswordEMsg').text('原密码不正确!');
			},
			success: function(respData, textStatus, jqXHR) {
				if(respData.access_token == ''){
					return ;
				}
				
				$.ajax({
					url:baseUrl + '/management/users/'+loginuuid+'/password',
					type:'POST',
					data:JSON.stringify(d),
					headers:{
						'Content-Type':'application/json'
					},
					success:function(respData){
						alert('提示!\n\密码修改成功!');
					},
					error:function(data){
						alert('提示!\n\密码修改失败!');
					}
				});
			}
		});
	}
	
}

// app列表页
function toAppList(){
	window.location.href = "/console/app_list";
}

// 创建应用表单校验
function createAppFormValidate(){
	// 表单校验
	var appName = $('#appName').val();
	var nick = $('#nick').val();
	var appDesc = $('#appDesc').val();
	
	if('' == appName){
		$('#appNameMsg').text('应用名不能为空！');
		$('#appNameMsg').css('color','red');
		$('#appName').focus();
		return false;
	}
	var appNameRegex = /^[0-9a-zA-Z]*$/;
	if(!appNameRegex.test(appName)){
		$('#appNameMsg').text('作为环信体系中的一个app唯一标识,只能是字母,数字或字母数字组合!');
		$('#appNameMsg').css('color','red');
 		$('#appName').focus();
		return false;
 	}
 	$('#appNameMsg').text('输入正确！');
	$('#appNameMsg').css('color','blue');
 	
 	var nickRegex = /^[0-9a-zA-Z-_\u4e00-\u9faf]*$/;
 	if(!nickRegex.test(nick)){
		$('#nickMsg').text('您的这款app对应的产品叫什么? 只能是汉字,字母,数字、横线、下划线及其组合!');
		$('#nickMsg').css('color','red');
 		$('#nick').focus();
		return false;
 	}
 	$('#nickMsg').text('输入正确！');
	$('#nickMsg').css('color','blue');
 
 	var appDescReg = /^[0-9a-zA-Z,.?。，？、\/'":\u4e00-\u9faf]{0,100}$/;
	if(!appDescReg.test(appDesc)){
		$('#appDescMsg').css('color','red');
		$('#appDesc').focus();
		return false;
	}
	
	$('#appDescMsg').text('输入正确！');
	$('#appDescMsg').css('color','blue');
 	
	return true;
}

// 创建app
function saveNewApp(){
	// get org admin token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	var appname = $('#appName').val();
	var allow_open_registration = $('input[name="allow_open_registration"]:checked').val();
	var appDesc = $('#appDesc').val();
	
	var dataBody = {
		'name':appname,
		'allow_open_registration':allow_open_registration,
		'appDesc':appDesc
	};
	
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		if(createAppFormValidate()){
			// 保存数据
			$.ajax({
				url:baseUrl+'/management/organizations/'+ orgName +'/applications',
				type:'POST',
				headers:{
					'Authorization':'Bearer '+access_token,
					'Content-Type':'application/json'
				},
				data:JSON.stringify(dataBody),
				error: function(jqXHR, textStatus, errorThrown) {
					alert('提示\n\n应用创建失败!\n更换应用名?');
				},
				success: function(respData, textStatus, jqXHR) {
					alert('app创建成功!');
					$(respData.entities).each(function(){
						window.location.href = '/console/app_profile?appUuid=' + this.uuid;
					});
				}
			});
		}
	}
}

// 分页基础数据
var cursors = {};
var pageNo = 1;
cursors[1] = '';
var total = 0;

// 分页条更新
function updateChatroomPageStatus(appUuid){
	var pageLi = $('#pagina').find('li');
	
	// 获取token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		$.ajax({
			url:baseUrl+'/'+ orgName +'/' + appUuid + '/chatrooms?limit=1000',
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(respData, textStatus, jqXHR) {
			},
			success: function(respData, textStatus, jqXHR) {
				total = respData.count;
				var totalPage = (total%10==0)?(parseInt(total/10)):(parseInt(total/10)+1);
				
				// 首页
				if(pageNo == 1){
					if(totalPage == 1){
						$(pageLi[0]).hide();
						$(pageLi[1]).hide();
					} else {
						$(pageLi[0]).hide();
						$(pageLi[1]).show();
					}
					// 尾页
				} else if(totalPage ==  pageNo){
					$(pageLi[0]).show();
					$(pageLi[1]).hide();
				}
			}
		});
	}
}




// 分页条更新
function updateUsersPageStatus(){
	var pageLi = $('#paginau').find('li');
	
	// 获取token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		$.ajax({
			url:baseUrl+'/'+ orgName +'/' + appUuid + '/users?limit=1000',
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				total = respData.count;
				var totalPage = (total % 10 == 0) ? (parseInt(total / 10)) : (parseInt(total / 10) + 1);
				
				// $('#pageInfo').text('当前第' + pageNo +  '页     一共' + totalPage +'页');
				var ulB = '<ul>';
				var ulE = '</ul>';
				var textOp1 = '<li> <a href="javascript:void(0);" onclick="getPrevAppUserList();">上一页</a> </li>';
				var textOp2 = '<li> <a href="javascript:void(0);" onclick="getNextAppUserList();">下一页</a> </li>';
				$('#paginau').html('');
				// 首页
				if(pageNo == 1){
					if(totalPage == 1){
						//$(pageLi[0]).hide();
						//$(pageLi[1]).hide();
						$('#paginau').append(ulB + ulE);
					} else {
						$('#paginau').append(ulB + textOp2 + ulE);
						//$(pageLi[0]).hide();
						//$(pageLi[1]).show();
					}
					// 尾页
				} else if(totalPage ==  pageNo){
					$('#paginau').append(ulB + textOp1 + ulE);
					//$(pageLi[0]).show();
					//$(pageLi[1]).hide();
				} else {
					$('#paginau').append(ulB + textOp1 + textOp2 + ulE);
					//$(pageLi[0]).show();
					//$(pageLi[1]).show();
				}
			}
		});
	}
}

// 管理员分页条更新
function updateUsersAdminPageStatus(){
	var pageLi = $('#paginau').find('li');
	
	// 获取token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		$.ajax({
			url:baseUrl+'/'+ orgName +'/' + appUuid +'/roles/admin/users?limit=1000',
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				total = respData.entities.length;
				var totalPage = (total % 10 == 0) ? (parseInt(total / 10)) : (parseInt(total / 10) + 1);
				
				// $('#pageInfo').text('当前第' + pageNo +  '页     一共' + totalPage +'页');
				var ulB = '<ul>';
				var ulE = '</ul>';
				var textOp1 = '<li> <a href="javascript:void(0);" onclick="getPrevAppUserList();">上一页</a> </li>';
				var textOp2 = '<li> <a href="javascript:void(0);" onclick="getNextAppUserList();">下一页</a> </li>';
				$('#paginau').html('');
				// 首页
				if(pageNo == 1){
					if(totalPage == 1){
						//$(pageLi[0]).hide();
						//$(pageLi[1]).hide();
						$('#paginau').append(ulB + ulE);
					} else {
						$('#paginau').append(ulB + textOp2 + ulE);
						//$(pageLi[0]).hide();
						//$(pageLi[1]).show();
					}
					// 尾页
				} else if(totalPage ==  pageNo){
					$('#paginau').append(ulB + textOp1 + ulE);
					//$(pageLi[0]).show();
					//$(pageLi[1]).hide();
				} else {
					$('#paginau').append(ulB + textOp1 + textOp2 + ulE);
					//$(pageLi[0]).show();
					//$(pageLi[1]).show();
				}
			}
		});
	}
}
// 好友分页条更新
function updateIMPageStatus(owner_username){
	var pageLi = $('#paginau').find('li');
	
	// 获取token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		$.ajax({
			url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/'+owner_username+'/contacts/users?limit=1000',
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				total = respData.entities.length;
				var totalPage = (total % 10 == 0) ? (parseInt(total / 10)) : (parseInt(total / 10) + 1);
				
				// $('#pageInfo').text('当前第' + pageNo +  '页     一共' + totalPage +'页');
				var ulB = '<ul>';
				var ulE = '</ul>';
				var textOp1 = '<li> <a href="javascript:void(0);" onclick="getPrevAppUserList();">上一页</a> </li>';
				var textOp2 = '<li> <a href="javascript:void(0);" onclick="getNextAppUserList();">下一页</a> </li>';
				$('#paginau').html('');
				// 首页
				if(pageNo == 1){
					if(totalPage == 1){
						//$(pageLi[0]).hide();
						//$(pageLi[1]).hide();
						$('#paginau').append(ulB + ulE);
					} else {
						$('#paginau').append(ulB + textOp2 + ulE);
						//$(pageLi[0]).hide();
						//$(pageLi[1]).show();
					}
					// 尾页
				} else if(totalPage ==  pageNo){
					$('#paginau').append(ulB + textOp1 + ulE);
					//$(pageLi[0]).show();
					//$(pageLi[1]).hide();
				} else {
					$('#paginau').append(ulB + textOp1 + textOp2 + ulE);
					//$(pageLi[0]).show();
					//$(pageLi[1]).show();
				}
			}
		});
	}
}

// 获取app列表
function getAppList(){
	// get org admin token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	userCount = 0;
	if(!access_token || access_token=='') {
		showTipAndLogin();
	} else {
		var loading = '<tr id="tr_loading"><td class="text-center" colspan="9"><img src ="/assets/img/loading.gif">&nbsp;&nbsp;&nbsp;<span>正在读取数据...</span></td></tr>';
		$('#appListBody').empty();
		$('#appListBody').append(loading);
		$.ajax({
			url:baseUrl+'/management/organizations/'+ orgName +'/applications',
			type:'GET',
			crossDomain:true,
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				var appData = jQuery.parseJSON(JSON.stringify(respData.data));
				var uuidArr = [];
				var nameArr = [];
				$.each(appData,function(key,value){
					nameArr.push(key);
					uuidArr.push(value);
					key = key.substring(key.indexOf('/')+1);
					userCount = 0;
					// 获取每个app的用户数
					$.ajax({
						url:baseUrl+'/'+ orgName +'/' + value + '/counters?counter=application.collection.users&pad=true',
						type:'GET',
						async:false,
						headers:{
							'Authorization':'Bearer '+access_token,
							'Content-Type':'application/json'
						},
						error: function(jqXHR, textStatus, errorThrown) {
						},
						success: function(respData, textStatus, jqXHR) {
							var option = '';
							$.each(respData.counters,function(){
								if(this.values.lenght == 0){
									userCount = 0;
								} else {
									$.each(this.values,function(){
										var userValue = parseInt(this.value);
										if(userValue < 0){
											userValue = 0;	
										}
										userCount = userValue;
									});
								}
							});
						}
					});
					
					option += '<tr><td class="text-center"><a href="/console/app_profile?appUuid='+value+'&Application='+key+'">'+key+'</a></td>'+
						 	'<td class="text-center">'+userCount+'</td>'+
					   	//'<td class="text-center">800/500</td>'+
						 	//'<td class="text-center">800/500</td>'+
						 	//'<td class="text-center">800/500</td>'+
						 	'<td class="text-center">上线运行中</td>'+
				 		'</tr>';
					
				});
				$('#tr_loading').remove();
				$('#appListBody').append(option);
				// 无数据
				var tbody = document.getElementsByTagName("tbody")[0];
				if(!tbody.hasChildNodes()){
					var option = '<tr><td class="text-center" colspan="7">无数据!</td></tr>';
					$('#appListBody').append(option);
				}
			}
		});
	}
}

// 删除某个app
function deleteApp(appUuid){
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(confirm('确认要删除这个app吗?')){
		$.ajax({
			url:baseUrl+'/management/organizations/'+ orgName +'/applications/' + appUuid,
			type:'DELETE',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				alert('提示\n\napp删除成功!');
				window.location.href = '/console/app_list';
			}
		});
	}
}

// 获取app详情:org管理员登录
function getAppProfile(appUuid){
	// 获取token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		// 获取app基本信息
		$.ajax({
			url:baseUrl + '/management/organizations/' + orgName + '/applications/' + appUuid,
			type:'GET',
			headers:{
				'Authorization':'Bearer ' + access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				$(respData.entities).each(function(){
					var uuid = this.uuid;
					var name = this.name;
					var created = format(this.created);
					var modified = format(this.modified);
					var applicationName = this.applicationName;
					var organizationName = this.organizationName;
					var allowOpen = this.allow_open_registration?'开放注册':'授权注册';
					var tag = this.allow_open_registration?'0':'1';
					var image_thumbnail_width = '100';
					if(this.image_thumbnail_width != null && this.image_thumbnail_width != undefined){
						image_thumbnail_width = this.image_thumbnail_width;
						}
					var image_thumbnail_height = '100';
					if(this.image_thumbnail_height != null && this.image_thumbnail_height!= undefined){
						image_thumbnail_height=this.image_thumbnail_height;
					}
					$('#appKey').text(organizationName+'#'+applicationName);
					$('#xmlandroidAppkey').text(organizationName+'#'+applicationName);
					//$('#xmliosAppkey').text(organizationName+'#'+applicationName);
					$('#created').text(created);
					$('#modified').text(modified);
					$('#allowOpen').text(allowOpen);
					$('#allowOpenHdd').val(tag);
					$('#image_thumbnail_width').text(image_thumbnail_width+'px');
					$('#image_thumbnail_height').text(image_thumbnail_height+'px');
				});
				
				$('#showName').text(respData.applicationName);
			}
		});
		
		// 获取app credential
		//http://a1.easemob.com:80/management/organizations/belo/applications/myapptest/credentials
		
		$.ajax({
			url: baseUrl + '/' + orgName + '/' + appUuid + '/credentials',
			type:'GET',
			headers:{
				'Authorization':'Bearer ' + access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				$('#client_id').text(respData.credentials.client_id);
				$('#client_secret').text(respData.credentials.client_secret);
			}
		});
		
	}
}


//修改缩略图大小
function updateImage(appUuid){
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	var imgReg =  /^[0-9]*$/;
	var imgwidth = $('#imageWidth').val();
	var imgheight = $('#imageHeight').val();
	if(!imgReg.test(imgheight)){
		alert('缩略图长宽格式不对!');
	}else if(!imgReg.test(imgwidth)){
		alert('缩略图长宽格式不对!');
	}else{
		
		var d ={
			image_thumbnail_width:parseInt(imgwidth), 
			image_thumbnail_height:parseInt(imgheight)
		};
		$.ajax({
			url: baseUrl + '/' + orgName + '/' + appUuid ,
			type:'PUT',
			data:JSON.stringify(d),
			headers:{
				'Authorization':'Bearer ' + access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert('修改失败!');
			},
			success: function(respData, textStatus, jqXHR) {
				alert('修改成功!');
				location.replace(location.href);
			}
		});
	}
}

// 获取app详情:app管理员登录
function getAppProfileforAppAdmin(appUuid){
	// 获取token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		$.ajax({
			url:baseUrl+'/management/organizations/'+ orgName +'/applications/' + appUuid,
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				$(respData.entities).each(function(){
					var uuid = this.uuid;
					var name = this.name;
					var created = format(this.created);
					var modified = format(this.modified);
					var applicationName = this.applicationName;
					var organizationName = this.organizationName;
					var allowOpen = this.allow_open_registration?'自由注册':'仅管理员可注册';
					var tag = this.allow_open_registration?'0':'1';
					$('#appKey').text(organizationName+'#'+applicationName);
					$('#xmlandroidAppkey').text(organizationName+'#'+applicationName);
					$('#xmliosAppkey').text(organizationName+'#'+applicationName);
					$('#created').text(created);
					$('#modified').text(modified);
					$('#allowOpen').text(allowOpen);
					$('#allowOpenHdd').val(tag);
				});
				
				$('#showName').text(respData.applicationName);
			}
		});
	}
}

// 切换app注册模式
function changeAllowOpen(){
	var access_token = $.cookie('access_token');
	var orgName = $.cookie('orgName');
	var appKey = $('#appKey').text().replace('#','/');
	var tag = $('#allowOpenHdd').val();

	if(tag == 0){
		allow_open_registration = false;
	} else {
		allow_open_registration = true;
	}
	
	var d = {
		'allow_open_registration':allow_open_registration	
	}

	$.ajax({
		url:baseUrl+'/'+ appKey,
		type:'PUT',
		data:JSON.stringify(d),
		headers:{
			'Authorization':'Bearer ' + access_token,
			'Content-Type':'application/json'
		},
		success:function(respData){
			alert('提示!\n\模式切换成功!');
			//toApppofile();
			$(respData.entities).each(function(){
				var tag = this.allow_open_registration?'0':'1';
				$('#allowOpenHdd').val(tag);
				if(this.allow_open_registration){
					$('#allowOpen').text('开放注册');	
				}else {
					$('#allowOpen').text('授权注册');
				}
			});
		},
		error:function(data){
			alert('提示!\n\模式切换失败!');
		}
	});
	
}

// 创建app管理员
// 用户名
function onBlurCheckUsername(appAdminUsername){
	var appAdminUsernameReg =  /^[0-9a-zA-Z]{1,18}$/;
	if('' == appAdminUsername) {
		$('#appAdminUsernameMsg').text('请输入用户名');
		return false;
	}
	
	if(!appAdminUsernameReg.test(appAdminUsername)){
		$('#appAdminUsernameMsg').text('1-18位长度字符(字母或数字)！');
		return false;
	}
	
	$('#appAdminUsernameMsg').text('');
	return true;
}
// 一次密码
function onBlurCheckPassword(password){
	var passwordReg =  /^[\s\S]{6,140}$/;
	if('' == password) {
		$('#passwordMsg').text('请输入密码');
		return false;
	}
	if(!passwordReg.test(password)){
		$('#passwordMsg').text('长度6位以上任意字符');
		return false;
	}
	$('#passwordMsg').text('');
	return true;
}

// 二次密码
function onBlurCheckConfirmPassword(confirmPassword){
	var password = $('#password').val();
	if('' == confirmPassword) {
		$('#confirmPasswordMsg').text('请再次输入密码！');
		return false;
	}
	if(password != confirmPassword){
		$('#confirmPasswordMsg').text('您两次输入的账号密码不一致!');
		return false;
	}
	
	$('#confirmPasswordMsg').text('');
	return true;
}

// 邮箱
function onBlurCheckEmail(email){
	var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if('' == email) {
		$('#emailMsg').text('请输入邮箱');
		return false;
	}
	if(!emailReg.test(email)){
		$('#emailMsg').text('邮箱账号格式非法');
		return false;
	}

	$('#emailMsg').text('');
	return true;
} 
// 提交表单
function saveNewAppAdmin(appUuid){
	var appAdminUsername = $('#appAdminUsername').val();
	var password = $('#password').val();
	var confirmPassword = $('#confirmPassword').val();
	var email = $('#email').val();

	var token = $.cookie('access_token');
	var orgName = $.cookie('orgName');

	//var flag = onBlurCheckUsername(appAdminUsername) && onBlurCheckPassword(password) && onBlurCheckConfirmPassword(confirmPassword) &&onBlurCheckEmail(email);
	var flag = onBlurCheckUsername(appAdminUsername) && onBlurCheckConfirmPassword(confirmPassword) &&onBlurCheckEmail(email);
	if(flag){
		// Create a user
		var d ={
			username:appAdminUsername,
			password:password,
			email:email
		};
		$.ajax({
			url:baseUrl + '/' + orgName + '/' + appUuid + '/users',
			type:'POST',
			data:JSON.stringify(d),
			headers:{
				'Authorization':'Bearer ' + token,
				'Content-Type':'application/json'
			},
			success:function(respData){
				// update role
				$.ajax({
					url:baseUrl + '/' + orgName + '/' + appUuid + '/users/'+ appAdminUsername +'/roles/admin',
					type:'POST',
					data:{},
					headers:{
						'Authorization':'Bearer ' + token,
						'Content-Type':'application/json'
					},
					success:function(respData){
						// if success , to app user list
						alert('添加管理员成功!')
						toAppUsersPage();
					},
					error:function(data){
						// if failure , delete the user
						$.ajax({
							url:baseUrl + '/' + orgName + '/' + appUuid + '/users/'+ appAdminUsername,
							type:'DELETE',
							headers:{
								'Authorization':'Bearer ' + token,
								'Content-Type':'application/json'
							},
							success:function(respData){
								alert('添加管理员失败!')
							},
							error:function(data){
							}
						});	
					}
				});	
			},
			error:function(data){
				alert('提示!\n\n添加管理员失败!');
			}
		});	
	}
}

//===================================================== User ==================================================================================

function selectAppUser(sel,appUuid,username){
		var value = sel.value;
		
		if(value == 'appIMList'){
			toAppIMList(username);
		}else if(value == 'setUsername'){
			setUsername(appUuid, username);
		}else if(value == 'sendMsg'){
			sendMessgeOne(appUuid, username);
		}else if(value == 'deleteUAdmin'){
			deleteAppUser(appUuid, username);
		}else if(value == 'excute'){
			excute(appUuid, username);
		}
}

// 获取某个app下的用户
function getAppUserList(appUuid, pageAction){

	// 获取token
	document.getElementById('checkAll').checked = false;
	$('#paginau').html('');
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		var loading = '<tr id="tr_loading"><td class="text-center" colspan="9"><img src ="/assets/img/loading.gif">&nbsp;&nbsp;&nbsp;<span>正在读取数据...</span></td></tr>';
		$('#appUserBody').empty();
		$('#appUserBody').append(loading);
		var userPage = $.cookie('userPage');
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
			url:baseUrl+'/'+ orgName +'/' + appUuid + '/users?limit=10' + temp,
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				// 缓存游标
				if(pageAction!='forward'){
					if(respData.cursor){
						cursors[pageNo+1] = respData.cursor;
					}else{
						cursors[pageNo+1] = null;
					}
				}
				if(respData.entities.length ==0 && pageAction == 'no'){
					getAppUserList(appUuid,'forward' );
				}else{
					$('tbody').html('');
					var selectOptions = '';
					$(respData.entities).each(function(){
						var username = this.username;
						var created = format(this.created);
						var notification_display_style='';
						if(this.notification_display_style == 0){
							notification_display_style='仅通知';
						}else if(this.notification_display_style == 1){
							notification_display_style='发送详情';
						}
						var nickname = this.nickname;
						if(nickname == undefined){
							nickname='';
						}
						var notification_no_disturbing=this.notification_no_disturbing;
						if(this.notification_no_disturbing){
							var notification_no_disturbing='已开启';
							var notification_no_disturbing_time = this.notification_no_disturbing_start + ':00'+'--'+this.notification_no_disturbing_end + ':00';
						}else{
							var notification_no_disturbing='未开启';
							var notification_no_disturbing_time='----';
						}
						var notifier_name = this.notifier_name;
						if(notifier_name == undefined){
							notifier_name='';
						}
						var userAdmin = '';
						var excute = '';
						var user_name_show = username;
						
								
								// 20170802 李伟 add
								selectOptions += '<tr>'+
									'<td class="text-center"><label><input style="opacity:1;" name="checkbox" type="checkbox" value="'+username+'" />&nbsp;&nbsp;&nbsp;</label></td>'+	
									'<td class="text-center">'+user_name_show+'</td>'+
									'<td class="text-center">'+notification_display_style+'</td>'+
									'<td class="text-center">'+nickname+'</td>'+
									'<td class="text-center">'+notification_no_disturbing+'</td>'+
									'<td class="text-center">'+notification_no_disturbing_time+'</td>'+
									'<td class="text-center">'+notifier_name+'</td>'+
									'<td class="text-center">'+created+'</td>'+
									'<td class="text-center">'+
										'<ul class="nav-pills" style="list-style-type:none">'+
										'<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">操作<b class="caret"></b></a>'+
											'<ul class="dropdown-menu">'+
										'<li data-filter-camera-type="all"><a href="javascript:toAppIMList(\''+username+'\')">查看用户好友</a></li>'+
										  '<li data-filter-camera-type="Alpha"><a href="#passwordMondify" id="passwdMod${status.index }" onclick="setUsername(\'' + appUuid + '\',\''+ username +'\');" data-toggle="modal" role="button">重置密码</a></li>'+
										  '<li data-filter-camera-type="Zed"><a href="javascript:showUpdateInfo(\''+appUuid+'\',\''+username+'\')">修改信息</a></li>'+
										  '<li data-filter-camera-type="Zed"><a href="javascript:deleteAppUser(\''+appUuid+'\',\''+username+'\')">删除</a></li>'+
										  '<li data-filter-camera-type="Zed"><a href="javascript:sendMessgeOne(\''+appUuid+'\',\''+username+'\')">发送消息</a></li>'+
										  
											'</ul>'+
										'</li>'+
									'</ul>'+
									'</td>'+
								'</tr>';
						
						
					});
					$('#tr_loading').remove();	
					$('#appUserBody').append(selectOptions);
				}
				// 无数据
				var tbody = document.getElementsByTagName("tbody")[0];
				if(!tbody.hasChildNodes()){
					var option = '<tr><td class="text-center" colspan="9">无数据!</td></tr>';
					$('#tr_loading').remove();	
					$('#appUserBody').append(option);
					var pageLi = $('#paginau').find('li');
					for(var i=0;i<pageLi.length;i++){
						$(pageLi[i]).hide();
					}
				} else {
					// 20140810 liwei add
					var ulB = '<ul>';
					var ulE = '</ul>';
					var textOp1 = '<li> <a href="javascript:void(0);" onclick="getPrevAppUserList();">上一页</a> </li>';
					var textOp2 = '<li> <a href="javascript:void(0);" onclick="getNextAppUserList();">下一页</a> </li>';
					$('#paginau').html('');
						
					// 首页
					if(pageNo == 1){
						if(respData.cursor == null){
							$('#paginau').append(ulB + ulE);
						} else {
							$('#paginau').append(ulB + textOp2 + ulE);
						}
						// 尾页
					} else if(cursors.length != 0 && respData.cursor == null){
						$('#paginau').append(ulB + textOp1 + ulE);
					} else {
						$('#paginau').append(ulB + textOp1 + textOp2 + ulE);
					}	
				}
			}
		});
	}
}

//弹出修改信息框
function showUpdateInfo(appUuid, username){
	// 获取token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	
	if(!access_token || access_token=='') {
		showTipAndLogin();
	} else {
		$.ajax({
			url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/' + username,
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				$(respData.entities).each(function(){
					var username = this.username;
					var notification_display_style = this.notification_display_style;
					var nickname = this.nickname;
					var notification_no_disturbing=this.notification_no_disturbing;
					var notification_no_disturbing_start = this.notification_no_disturbing_start;
					var notification_no_disturbing_end = this.notification_no_disturbing_end ;
					$('#username').text(username);
					document.getElementById('messageType_0').checked=false;
					document.getElementById('messageType_1').checked=false;
					if(notification_display_style == 0){
						document.getElementById('messageType_0').checked='checked';
					}else if(notification_display_style == 1){
						document.getElementById('messageType_1').checked='checked';
					}
					$('#nickname').val(nickname);
					document.getElementById('notification_true').checked=false;	
					document.getElementById('notification_false').checked=false;	
					if(notification_no_disturbing){
						document.getElementById('notification_true').checked='checked';	
						document.getElementById('notification_time_div').style.display="block";
						$('#notification_starttime').val(notification_no_disturbing_start);
						$('#notification_endtime').val(notification_no_disturbing_end);
					}else if(!notification_no_disturbing){
						document.getElementById('notification_false').checked='checked';	
						document.getElementById('notification_time_div').style.display="none";
						$('#notification_starttime').val('');
						$('#notification_endtime').val('');
					}
					$('#showUpdateInfoA').click();
				});
			}
		});
	}
}

//修改信息
function updateInfo(appUuid){
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	var username =$('#username').text();
	var notification_display_style;
	if(document.getElementById('messageType_0').checked){
		notification_display_style = 0;
	}else if(document.getElementById('messageType_1').checked){
		notification_display_style = 1;
	}else{
		notification_display_style = '';
	}
	var nickname =$('#nickname').val();
	var notification_no_disturbing;
	var notification_no_disturbing_start;
	var notification_no_disturbing_end;
	if(document.getElementById('notification_true').checked){
		notification_no_disturbing = true;
		notification_no_disturbing_start = $('#notification_starttime').val();
		notification_no_disturbing_end = $('#notification_endtime').val();
	}else if(document.getElementById('notification_false').checked){
		notification_no_disturbing = false;
		notification_no_disturbing_start = '';
		notification_no_disturbing_end = '';
	}else{
		
	}
	var flag = true;
	if(nickname.length>20){
		flag =false;
	}
	
	if(document.getElementById('notification_true').checked){
		var numReg = /^[0-9]*$/;
		//var numReg = /^(([01]?[0-9])|(2[0-3])):[0-5]?[0-9]$/;
		if(numReg.test(notification_no_disturbing_start) && numReg.test(notification_no_disturbing_end)){
			
			notification_no_disturbing_end = parseInt(notification_no_disturbing_end);
			notification_no_disturbing_start = parseInt(notification_no_disturbing_start);
			
			if(notification_no_disturbing_end>=0 && notification_no_disturbing_end<=23&&notification_no_disturbing_start>=0&&notification_no_disturbing_start<=23&&notification_no_disturbing_end>notification_no_disturbing_start){
				var d ={
					notification_display_style : notification_display_style,
					nickname : nickname,
					notification_no_disturbing :  notification_no_disturbing,
					notification_no_disturbing_start : notification_no_disturbing_start,
					notification_no_disturbing_end : notification_no_disturbing_end
				};
				var layerNum = layer.load('正在修改...');
				if(flag){
					$.ajax({
							url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/' + username,
							type:'PUT',
							headers:{
								'Authorization':'Bearer '+access_token,
								'Content-Type':'application/json'
							},
							data:JSON.stringify(d),
							error: function(jqXHR, textStatus, errorThrown) {
								layer.close(layerNum);
								alert('修改失败!');
							},
							success: function(respData, textStatus, jqXHR) {
								layer.close(layerNum);
								alert('修改成功!');
								$('#infoCloseButn').click();
								getAppUserList(appUuid,'no');
							}
					});
				}else{
					alert('昵称不能超过20个字符!');	
				}
			}else{
				alert('时间格式不正确，请输入0 ~ 23！');
			}
			
		}else{
			alert('时间格式不正确，请输入0 ~ 23！');
		}
		
	}else if(!document.getElementById('notification_true').checked){
		var d ={
				notification_display_style : notification_display_style,
				nickname : nickname,
				notification_no_disturbing :  notification_no_disturbing,
				notification_no_disturbing_start : notification_no_disturbing_start,
				notification_no_disturbing_end : notification_no_disturbing_end
				};
				if(flag){
					$.ajax({
							url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/' + username,
							type:'PUT',
							headers:{
								'Authorization':'Bearer '+access_token,
								'Content-Type':'application/json'
							},
							data:JSON.stringify(d),
							error: function(jqXHR, textStatus, errorThrown) {
								alert('修改失败!');
							},
							success: function(respData, textStatus, jqXHR) {
								alert('修改成功!');
								$('#infoCloseButn').click();
								getAppUserList(appUuid,'no');
							}
					});
				}else{
					alert('昵称不能超过20个字符!');	
				}
		
	}

}


// 搜索IM用户
function searchUser(appUuid, queryString){
	// 获取token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	
	if(!access_token || access_token=='') {
		showTipAndLogin();
	} else {
		
		$.ajax({
			url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/' + queryString,
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
				$('tbody').html('');
				var option = '<tr><td class="text-center" colspan="9">用户不存在!</td></tr>';
				$('#appUserBody').append(option);
				$('#paginau').hide();
			},
			success: function(respData, textStatus, jqXHR) {
				$('tbody').html('');
				$(respData.entities).each(function(){
					var username = this.username;
					var created = format(this.created);
					var notification_display_style='';
					if(this.notification_display_style == 0){
						notification_display_style='仅通知';
					}else if(this.notification_display_style == 1){
						notification_display_style='发送详情';
					}
					var nickname = this.nickname;
					if(nickname == undefined){
						nickname='';
					}
					var notification_no_disturbing=this.notification_no_disturbing;
					if(this.notification_no_disturbing){

						var notification_no_disturbing='已开启';
						var notification_no_disturbing_time = this.notification_no_disturbing_start + ':00'+'--'+this.notification_no_disturbing_end + ':00';
					}else{
						var notification_no_disturbing='未开启';
						var notification_no_disturbing_time='----';
					}
					var notifier_name = this.notifier_name;
					if(notifier_name == undefined){
						notifier_name='';
					}
					var userAdmin = '';
					var excute = '';
					var user_name_show = username;
					
					
					var option = '<tr>'+
								'<td class="text-center"><label><input style="opacity:1;" name="checkbox" type="checkbox" value="'+username+'" />&nbsp;&nbsp;&nbsp;</label></td>'+	
								'<td class="text-center">'+user_name_show+'</td>'+																'<td class="text-center">'+notification_display_style+'</td>'+
								'<td class="text-center">'+nickname+'</td>'+
								'<td class="text-center">'+notification_no_disturbing+'</td>'+
								'<td class="text-center">'+notification_no_disturbing_time+'</td>'+
								'<td class="text-center">'+notifier_name+'</td>'+
							 	'<td class="text-center">'+created+'</td>'+
							 	'<td class="text-center"><a href="javascript:toAppIMList(\''+username+'\')" class="btn btn-mini btn-info">查看用户好友</a>'+
							 	' | <a href="#passwordMondify" id="passwdMod${status.index }" onclick="setUsername(\'' + appUuid + '\',\''+ username +'\');" data-toggle="modal" role="button" class="btn btn-mini btn-info">重置密码</a>'+
							 	' | <a  class="btn btn-mini btn-info" href="javascript:deleteAppUser(\''+appUuid+'\',\''+username+'\')">删除</a>'+
								' | <a  class="btn btn-mini btn-info" href="javascript:sendMessgeOne(\''+appUuid+'\',\''+username+'\')">发送消息</a>'+
								'</td>'+
								 //'<td class="text-center"><select id="select1" onchange="selectAppUser(this,\''+appUuid+'\',\''+username+'\')">'+
                 //'<option value="操作">操作</option>'+
                 //'<option value="appIMList">查看用户好友</option>'+
								 //'<option value="setUsername">重置密码</option>'+
								 //'<option value="sendMsg">发送消息</option>'+
								 //'<option value="deleteUAdmin">撤销管理员</option>'+
						     //'</td>'+
					 		'</tr>';
					 		
					 		// 20170802 李伟 add
					 		var selectOptions = '<tr>'+
								'<td class="text-center"><label><input style="opacity:1;" name="checkbox" type="checkbox" value="'+username+'" />&nbsp;&nbsp;&nbsp;</label></td>'+	
								'<td class="text-center">'+user_name_show+'</td>'+
								'<td class="text-center">'+notification_display_style+'</td>'+
								'<td class="text-center">'+nickname+'</td>'+
								'<td class="text-center">'+notification_no_disturbing+'</td>'+
								'<td class="text-center">'+notification_no_disturbing_time+'</td>'+
								'<td class="text-center">'+notifier_name+'</td>'+
							 	'<td class="text-center">'+created+'</td>'+
							 	'<td class="text-center">'+
									'<ul class="text-center" class="nav-pills" style="list-style-type:none">'+
				    				'<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">操作<b class="caret"></b></a>'+
				    					'<ul class="dropdown-menu">'+
					          		'<li data-filter-camera-type="all"><a href="javascript:toAppIMList(\''+username+'\')">查看用户好友</a></li>'+
							          '<li data-filter-camera-type="Alpha"><a href="#passwordMondify" id="passwdMod${status.index }" onclick="setUsername(\'' + appUuid + '\',\''+ username +'\');" data-toggle="modal" role="button">重置密码</a></li>'+
							          '<li data-filter-camera-type="Zed"><a href="javascript:deleteAppUser(\''+appUuid+'\',\''+username+'\')">删除</a></li>'+
							          '<li data-filter-camera-type="Zed"><a href="javascript:sendMessgeOne(\''+appUuid+'\',\''+username+'\')">发送消息</a></li>'+
							          
							     		'</ul>'+
							     	'</li>'+
						     	'</ul>'+
								'</td>'+
					 		'</tr>';
					 		
					$('#appUserBody').append(selectOptions);
					
					$('#paginau').hide();
				});
			}
		});
	}
}

function setUsername(appUuid,username){
	$('#usernameMondify').val(username);
	$('#appUuidHidd').val(appUuid);
	$('#pwdMondify').val('');
}

//弹出发送消息
function sendMessge(appUuid){
	var checkbox=document.getElementsByName("checkbox");
	var num=0;
	for (var i=0;i<checkbox.length;i++){
		if(checkbox[i].checked){
			num++;
		}
	}
	if(num>0){
	var users = new Array();
		for (var i=0;i<checkbox.length;i++){
			if(checkbox[i].checked){
				users.push(checkbox[i].value);
			}
		}
	$('#usernameMessage').val(users);
	$('#appUuidMessage').val(appUuid);
	$('#messegeContent').val('');
	document.getElementById('messegeContent').style.display="block";
	$('#img1').remove();
	$('#share-secret').val('');
	$('#file').val('');
	$('#f_file').val('');
	$('#sendMessageA').click();
	}else{
		alert('至少选择一个用户!');	
	}
}

//单个消息发送
function sendMessgeOne(appUuid,users){
	$('#usernameMessage').val(users);
	$('#appUuidMessage').val(appUuid);
	$('#messegeContent').val('');
	document.getElementById('messegeContent').style.display="block";
	$('#img1').remove();
	$('#share-secret').val('');
	$('#file').val('');
	$('#f_file').val('');
	$('#sendMessageA').click();
}

//发送消息
function sendUserMessage(){
	var users = document.getElementById('usernameMessage').value;
	var appUuid = document.getElementById('appUuidMessage').value;
	var orgName = $.cookie('orgName');
	var token = $.cookie('access_token');
	var messageContent = $('#messegeContent').val().trim();
	var target = users.split(',');
	if ( messageContent ==''){
		alert('消息不能为空');
	}else{
		var d = {
		  "target_type" : "users", //or chatgroups
		  "target" : target, //注意这里需要用数组, 即使只有一个用户, 也要用数组 ['u1']
		  
		  "msg" : {
			  "type" : "txt",
			  "msg" : messageContent //消息内容，参考[聊天记录](http://developer.easemob.com/docs/emchat/rest/chatmessage.html)里的bodies内容
			  }
		 }
		 var layerNum = layer.load('正在发送...');
		 $.ajax({
				url:baseUrl+'/'+ orgName + "/" + appUuid + '/messages',
				type:'POST',
				headers:{
					'Authorization':'Bearer '+token,
					'Content-Type':'application/json'
				},	
				data:JSON.stringify(d),
				error:function(respData){
				layer.close(layerNum);
				alert('发送失败');
				},
				success:function(respData){
					layer.close(layerNum);
					$('#closeButn').click();
					alert('发送成功');
				}
		 });
	}
	
}
//发送图片
function sendUserImgMessage(){
	if( $('#share-secret').val() == ''|| $('#share-secret').val() == null){
		alert('请先选择图片');	
	}else{
		var users = document.getElementById('usernameMessage').value;
		var appUuid = document.getElementById('appUuidMessage').value;
		var orgName = $.cookie('orgName');
		var token = $.cookie('access_token');
		var messageContent = $('#messegeContent').val();
		var target = users.split(',');
		var str = $('#share-secret').val().split(',');
		var d = {
		  "target_type" : "users", //or chatgroups
		  "target" : target, //注意这里需要用数组, 即使只有一个用户, 也要用数组 ['u1']
		  
		  "msg" : {
			  "type" : "img",
			  },
		"filename":str[0],
		"secret": str[1]
		 }
		 var layerNum = layer.load('正在发送...');
		 $.ajax({
				url:baseUrl+'/'+ orgName + "/" + appUuid + '/messages',
				type:'POST',
				headers:{
					'Authorization':'Bearer '+token,
					'Content-Type':'application/json'
				},	
				data:JSON.stringify(d),
				error:function(respData){
				layer.close(layerNum);
				alert('发送失败');
				},
				success:function(respData){
					layer.close(layerNum);
					$('#closeButn').click();
					alert('发送成功');
				}
		 });
	}
	
}


// 重置app用户密码
function updateAppUserPassword(){
	var username = $('#usernameMondify').val();
	var orgName = $.cookie('orgName');
	var cname = $.cookie('cuser');
	var token = $.cookie('access_token');
	var appUuid = $('#appUuidHidd').val();
	
  var pwdMondifyVal = $('#pwdMondify').val();
  var pwdMondifytwoVal = $('#pwdMondifytwo').attr('value');
	
	var passwordReg = /^[0-9a-zA-Z]{1,100}$/;
  if(pwdMondifyVal == ''){
  	$('#pwdMondify').focus();
		$('#pwdMondifySpan').html('请输入新密码');
		return;
	} else if(!passwordReg.test(pwdMondifyVal)){
		$('#pwdMondify').focus();
		$('#pwdMondifySpan').html('只能输入1~100位字母或者数字');
		return;
	} else {
		$('#pwdMondifySpan').html('');
		
		if(pwdMondifytwoVal == ''){
			$('#pwdMondifytwo').focus();
			$('#pwdMondifytwoSpan').html('请再次输入新密码');
			return;
		}else if(pwdMondifytwoVal != pwdMondifyVal){
			$('#pwdMondifytwo').focus();
			$('#pwdMondifytwoSpan').html('两次密码不一致');
			return;
		}else {
			$('#pwdMondifySpan').text('');
			$('#pwdMondifytwoSpan').text('');
			
			var d ={
				newpassword:pwdMondifyVal
			};
			var layerNum = layer.load('正在修改密码...');
			$.ajax({
				url:baseUrl + '/' + orgName + '/' + appUuid + '/users/' + username + '/password',
				type:'POST',
				data:JSON.stringify(d),
				headers:{
					'Authorization':'Bearer ' + token,
					'Content-Type':'application/json'
				},
				success:function(respData){
					layer.close(layerNum);
					alert('提示!\n\密码重置成功!');
					$('#pwdMondifySpan').text('');
					$('#pwdMondifytwoSpan').text('');
			    $('#pwdMondify').val('');
			    $('#pwdMondifytwo').val('');
					$('#passwordMondify').modal('hide');
				},
				error:function(data){
					layer.close(layerNum);
					alert('提示!\n\密码重置失败!');
				}
			});
		}
		
	}
}

// 删除app下的用户
function deleteAppUser(appUuid,username){
	var access_token = $.cookie('access_token');
	var orgName = $.cookie('orgName');
	if(confirm('确定要删除此用户吗?')){
		var layerNum = layer.load('正在删除...');
		$.ajax({
			url:baseUrl + '/' + orgName +'/' + appUuid + '/users/' + username,
			type:'DELETE',
			headers:{
				'Authorization':'Bearer ' + access_token,
				'Content-Type':'application/json'
			},		
			error:function(){
				layer.close(layerNum);
				alert('提示\n\n删除失败!');
			},
			success:function(respData){
				layer.close(layerNum);
				alert('提示\n\n删除成功!');
				getAppUserList(appUuid,'no');
			}
		});
	}
}
//批量删除app下的用户
function deleteAppUserCheckBox(appUuid){
		var checkbox=document.getElementsByName("checkbox");
		var num=0;
		for (var i=0;i<checkbox.length;i++){
			if(checkbox[i].checked){
				num++;
			}
		}
		if(num>0){
			if(confirm('确定要删除这些用户吗?')){
				var layerNum = layer.load('正在删除...');
				var success = 0;
				var fail = 0;
				for (var i=0;i<checkbox.length;i++){
					if(checkbox[i].checked){
						var flag = deleteAppUsers(appUuid,checkbox[i].value);
						if(flag){
							success ++;	
						}else{
							fail ++;	
						}
					}
				}
				layer.close(layerNum);
				alert('删除完成！'+success+'个成功，'+fail+'个失败!')
				getAppUserList(appUuid);
			}
		}else{
			alert('至少选择一个用户!');	
		}
}


//群组发送消息
function sendUserMessages(){
	var users = document.getElementById('usernameMessage').value;
	var appUuid = document.getElementById('appUuidMessage').value;
	var orgName = $.cookie('orgName');
	var token = $.cookie('access_token');
	var messageContent = $('#messegeContent').val().trim();
	var target = users.split(',');
	if ( messageContent ==''){
		alert('消息不能为空');
	}else{
		var d = {
		  "target_type" : "chatgroups", //or chatgroups
		  "target" : target, //注意这里需要用数组, 即使只有一个用户, 也要用数组 ['u1']
		  
		  "msg" : {
			  "type" : "txt",
			  "msg" : messageContent //消息内容，参考[聊天记录](http://developer.easemob.com/docs/emchat/rest/chatmessage.html)里的bodies内容
			  }
		 }
		 var layerNum = layer.load('正在发送...');
		 $.ajax({
				url:baseUrl+'/'+ orgName + "/" + appUuid + '/messages',
				type:'POST',
				headers:{
					'Authorization':'Bearer '+token,
					'Content-Type':'application/json'
				},	
				data:JSON.stringify(d),
				error:function(respData){
				layer.close(layerNum);
				alert('发送失败');
				},
				success:function(respData){
					layer.close(layerNum);
					$('#closeButn').click();
					alert('发送成功');
				}
		 });
	}
	
}
//群组发送图片
function sendUserImgMessages(){
	if( $('#share-secret').val() == ''|| $('#share-secret').val() == null){
		alert('请先选择图片');	
	}else{
		var users = document.getElementById('usernameMessage').value;
		var appUuid = document.getElementById('appUuidMessage').value;
		var orgName = $.cookie('orgName');
		var token = $.cookie('access_token');
		var messageContent = $('#messegeContent').val();
		var target = users.split(',');
		var str = $('#share-secret').val().split(',');
		var d = {
		  "target_type" : "chatgroups", //or chatgroups
		  "target" : target, //注意这里需要用数组, 即使只有一个用户, 也要用数组 ['u1']
		  
		  "msg" : {
			  "type" : "img",
			  },
		"filename":str[0],
		"secret": str[1]
		 }
		 var layerNum = layer.load('正在发送...');
		 $.ajax({
				url:baseUrl+'/'+ orgName + "/" + appUuid + '/messages',
				type:'POST',
				headers:{
					'Authorization':'Bearer '+token,
					'Content-Type':'application/json'
				},	
				data:JSON.stringify(d),
				error:function(respData){
				layer.close(layerNum);
				alert('发送失败');
				},
				success:function(respData){
					layer.close(layerNum);
					$('#closeButn').click();
					alert('发送成功');
				}
		 });
	}
	
}


//调用方法
function deleteAppUsers(appUuid,username){
	var access_token = $.cookie('access_token');
	var orgName = $.cookie('orgName');
	var flag ;
		$.ajax({
			async: false, 
			url:baseUrl + '/' + orgName +'/' + appUuid + '/users/' + username,
			type:'DELETE',
			headers:{
				'Authorization':'Bearer ' + access_token,
				'Content-Type':'application/json'
			},		
			error:function(){
				flag =false;
			},
			success:function(respData){
				flag =true;
			}
		});
		return flag;
}

// 获取app群组列表
function getAppChatrooms(appUuid,pageAction){
	// 获取token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		if('forward' == pageAction){
			pageNo += 1;
		} else if('next' == pageAction){
			pageNo -= 1;
		}
		
		var tmp = '';
		if(typeof(pageAction)!='undefined' && pageAction != ''){	
			tmp = '&cursor=' + cursors[pageNo];
		}
		var loading = '<tr id="tr_loading"><td class="text-center" colspan="3"><img src ="/assets/img/loading.gif">&nbsp;&nbsp;&nbsp;<span>正在读取数据...</span></td></tr>';
		$('#appChatroomBody').empty();
		$('#appChatroomBody').append(loading);
		$.ajax({
			url:baseUrl+'/'+ orgName + "/" + appUuid + '/chatgroups',
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},		
			error:function(respData){

			},
			success:function(respData){
				// 缓存游标,下次next时候存新的游标
				if(pageAction!='forward'){
					cursors[pageNo+1] =	respData.cursor;
				} else {
					cursors[pageNo+1] = null;
				}
				$('tbody').html('');
				$(respData.data).each(function(){
					var groupid = this.groupid;
					var groupname = this.groupname;
					if(groupname == '' || groupname == null){
						groupname = '-';
					}
					var nums = 0;
					var admin='';
						
						var selectOptions = '<tr>'+
							'<td class="text-center"><label><input style="opacity:1;" name="checkbox" type="checkbox" value="'+groupid+'" />&nbsp;&nbsp;&nbsp;</label></td>'+	
							'<td class="text-center">'+groupid+'</td>'+
						 	'<td class="text-center">'+ groupname +'</td>'+
							'<td class="text-center">'+
								'<ul class="text-center" class="nav-pills" style="list-style-type:none">'+
			    					'<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">操作<b class="caret"></b></a>'+
				    					'<ul class="dropdown-menu">'+
						            '<li data-filter-camera-type="all"><a href="javascript:togroupaddAppAdminuserusers(\''+appUuid+'\',\''+groupid+'\')">查看群组成员</a></li>'+
						            '<li data-filter-camera-type="Alpha"><a href="javascript:deleteAppChatroom(\''+appUuid+'\',\''+groupid+'\')">删除</a></li>'+
						            '<li data-filter-camera-type="Zed"><a href="javascript:sendMessgeOne(\''+appUuid+'\',\''+groupid+'\')">发送消息</a></li>'+
					     				'</ul>'+
					     			'</li>'+
				     		'</ul>'+
							'</td>'+
						'</tr>';
						
						$('#tr_loading').remove();
						$('#appChatroomBody').append(selectOptions);
				});

				var tbody = document.getElementsByTagName("tbody")[0];
				if(!tbody.hasChildNodes()){
					var option = '<tr><td class="text-center" colspan="7">无数据!</td></tr>';
					$('#appChatroomBody').append(option);
					var pageLi = $('#pagina').find('li');
					for(var i=0;i<pageLi.length;i++){
						$(pageLi[i]).hide();
					}
				} else {
					//updateChatroomPageStatus(appUuid);	
				}
			}
		});
	}
	
}

function selectFunqunzu(sel,appUuid,groupid){
		var value=sel.value;
		if(value == '查看群组成员'){
			togroupaddAppAdminuserusers(appUuid,groupid);
		}else if(value == '删除'){
			deleteAppChatroom(appUuid,groupid);
		}else if(value == '发送消息'){
			sendMessgeOne(appUuid,groupid);
		}
}
				
// 搜索app群组列表
function getqunzuAppChatrooms(appUuid,qunzuid,pageAction){
	// 获取token
	$('#paginau').html('');
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		if('forward' == pageAction){
			pageNo += 1;
		} else if('next' == pageAction){
			pageNo -= 1;
		}
		
		var tmp = '';
		if(typeof(pageAction)!='undefined' && pageAction != ''){	
			tmp = '&cursor=' + cursors[pageNo];
		}
		var loading = '<tr id="tr_loading"><td class="text-center" colspan="3"><img src ="/assets/img/loading.gif">&nbsp;&nbsp;&nbsp;<span>正在读取数据...</span></td></tr>';
		$('#appChatroomBody').empty();
		$('#appChatroomBody').append(loading);
		$.ajax({
			url:baseUrl+'/'+ orgName + "/" + appUuid + '/chatgroups/'+qunzuid,
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},		
			error:function(respData){
				alert("请输入群id查询");
			},
			success:function(respData){
				// 缓存游标,下次next时候存新的游标
				if(pageAction!='forward'){
					cursors[pageNo+1] =	respData.cursor;
				} else {
					cursors[pageNo+1] = null;
				}
				$('tbody').html('');
				var groupid = respData.data[0].id;
				var groupname = respData.data[0].name;
				var errors=respData.data[0].error;
				if(errors!=null){
                  alert("该群id不存在，请重新输入");
				}
				if(groupname == '' || groupname == null){
					groupname = '-';
				}
				
				var nums = 0;
				var admin='';
			  /*$.ajax({  
					url:baseUrl + '/' +orgName +'/'+appUuid+'/chatgroups/' +qunzuid+'/users',
					async: false, 
					type:'GET',
					headers:{
						'Authorization':'Bearer '+access_token,
						'Content-Type':'application/json'
					},		
					error:function(respData){
				
					},
					success:function(respData){
						
						nums = respData.data.length;
						$(respData.data).each(function(){
              admin = this.owner
					});
					} 
				    
				});*/
				if(errors!=null){
                   var option = '<tr><td class="text-center" colspan="3">无数据!</td></tr>';
					$('#appChatroomBody').append(option);
				}else{
                  var selectOptions = '<tr>'+
							'<td class="text-center"><label><input style="opacity:1;" name="checkbox" type="checkbox" value="'+groupid+'" />&nbsp;&nbsp;&nbsp;</label></td>'+	
							'<td class="text-center">'+groupid+'</td>'+
						 	'<td class="text-center">'+ groupname +'</td>'+
							'<td class="text-center">'+
								'<ul class="text-center" class="nav-pills" style="list-style-type:none">'+
			    					'<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">操作<b class="caret"></b></a>'+
				    					'<ul class="dropdown-menu">'+
						            '<li data-filter-camera-type="all"><a href="javascript:togroupaddAppAdminuserusers(\''+appUuid+'\',\''+groupid+'\')">查看群组成员</a></li>'+
						            '<li data-filter-camera-type="Alpha"><a href="javascript:deleteAppChatroom(\''+appUuid+'\',\''+groupid+'\')">删除</a></li>'+
						            '<li data-filter-camera-type="Zed"><a href="javascript:sendMessgeOne(\''+appUuid+'\',\''+groupid+'\')">发送消息</a></li>'+
					     				'</ul>'+
					     			'</li>'+
				     		'</ul>'+
							'</td>'+
						'</tr>';

				$('#tr_loading').remove();		
				$('#appChatroomBody').append(selectOptions);
				}
				
				
				//var tbody = document.getElementsByTagName("tbody")[0];

				/*if(!tbody.hasChildNodes()){
					var option = '<tr><td class="text-center" colspan="3">无数据!</td></tr>';
					$('#appChatroomBody').append(option);
					var pageLi = $('#pagina').find('li');
					for(var i=0;i<pageLi.length;i++){
						$(pageLi[i]).hide();
					}
				} else {
					updateChatroomPageStatus(appUuid);	
				}*/
			}
		});
	}
	
}
// 查看群组成员
function togroupaddAppAdminuserusers(appUuid,groupid){
	window.location.href = '/console/app_qunzu_list?appUuid=' + appUuid + '&groupid=' + groupid;
}
	
// 获取群组成员列表
function getAppChatroomsuser(appUuid,groupid,pageAction){
	// 获取token
	$('#paginau').html('');
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		if('forward' == pageAction){
			pageNo += 1;
		} else if('next' == pageAction){
			pageNo -= 1;
		}
		
		var tmp = '';
		if(typeof(pageAction)!='undefined' && pageAction != ''){	
			tmp = '&cursor=' + cursors[pageNo];
		}
		$.ajax({
			url:baseUrl + '/' +orgName +'/'+appUuid+'/chatgroups/' +groupid+'/users',
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},		
			error:function(respData){
				
			},
			success:function(respData){
				// 缓存游标,下次next时候存新的游标
				if(pageAction!='forward'){
					cursors[pageNo+1] =	respData.cursor;
				} else {
					cursors[pageNo+1] = null;
				}
				if(respData.entities.length ==0 && pageAction == 'no'){
					getAppChatroomsuser(appUuid,groupid,'forward' );
				}else{
					$('#showName').text(respData.applicationName);
					$('#showUsername').text(cuser)
						
					$('tbody').html('');
					//var i=0;
					$(respData.data).each(function(){
						
						var members = this.member;
						var owner=this.owner;
						if(members != undefined){
							
							// 20170802 李伟 add
							var selectOptions = '<tr>'+
								'<td class="text-center">'+members+'</td>'+
								'<td class="text-center">'+
									'<ul class="text-center" class="nav-pills" style="list-style-type:none">'+
									'<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">操作<b class="caret"></b></a>'+
										'<ul class="dropdown-menu" style="left:200px">'+
									'<li><a href="javascript:deleteAppChatroomUsers(\''+appUuid+'\',\''+groupid+'\',\''+members+'\')">移除</a></li>'+
										'</ul>'+
									'</li>'+
								'</ul>'+
								'</td>'+
							'</tr>';
							$('#appIMBody').append(selectOptions);
							
						}else if(owner !=undefined){
							$.cookie('owner',owner);
							
							// 20170802 李伟 add
							var selectOptions = '<tr>'+
								'<td class="text-center" style="color:#FF0000;">'+owner+'</td>'+
								'<td class="text-center">'+
									'<ul class="text-center" class="nav-pills" style="list-style-type:none">'+
									'<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">操作<b class="caret"></b></a>'+
									//	'<ul class="dropdown-menu" style="left:200px">'+
									//'<li><a href="javascript:deleteAppChatroomUsers(\''+appUuid+'\',\''+groupid+'\',\''+members+'\')">移除</a></li>'+
									//	'</ul>'+
									'</li>'+
								'</ul>'+
								'</td>'+
							'</tr>';
							
							$('#appIMBody').append(selectOptions);
						}
							//i++;
					});
				}
				var tbody = document.getElementsByTagName("tbody")[0];
				if(!tbody.hasChildNodes()){
					var option = '<tr><td class="text-center" colspan="3">无数据!</td></tr>';
					$('#appIMBody').append(option);
					var pageLi = $('#pagina').find('li');
					for(var i=0;i<pageLi.length;i++){
						$(pageLi[i]).hide();
					}
				} else {
					updateChatroomPageStatus(appUuid);	
				}
			}
		});
	}
	
}
// 删除app下的群组
function deleteAppChatroom(appUuid,groupuuid){
	var access_token = $.cookie('access_token');
	var orgName = $.cookie('orgName');
	
	if(confirm('确定要删除此群组吗?')){
		$.ajax({
			url:baseUrl + '/' +orgName +'/'+appUuid+'/chatgroups/' + groupuuid,
			type:'DELETE',
			headers:{
				'Authorization':'Bearer ' + access_token,
				'Content-Type':'application/json'
			},
			error:function(){
				alert('提示\n\n删除失败!');
			},
			success:function(respData){
				alert('提示\n\n删除成功!');
				window.location.href = '/console/app_group?appUuid='+appUuid;
			}
		});
	}
}
// 移除群组下的成员
function deleteAppChatroomUsers(appUuid,groupuuid,usersname){
	var access_token = $.cookie('access_token');
	var orgName = $.cookie('orgName');
	
	if(confirm('确定要把该成员移除此群组吗?')){
		//alert(baseUrl + '/' +orgName +'/'+appUuid+'/chatgroups/' +groupuuid+'/users/'+usersname);
		$.ajax({
			url:baseUrl + '/' +orgName +'/'+appUuid+'/chatgroups/' +groupuuid+'/users/'+usersname,
			type:'DELETE',
			headers:{
				'Authorization':'Bearer ' + access_token,
				'Content-Type':'application/json'
			},
			error:function(){
				alert('提示\n\n移除失败!');
			},
			success:function(respData){
				alert('提示\n\n移除成功!');
				location.replace(location.href);
			}
		});
	}
}
//添加群内成员
function addIMFriendusers(){
	var orgName = $.cookie('orgName');
	var access_token = $.cookie('access_token');
	var owner_username = $('#usernameFriend').val();
	var appUuid = $('#appUuidFriend').val();
	var friend_username = $('#friendUsername').val();
	if (friend_username == ''){
		alert('好友名称不能为空!');	
	}else{
		$.ajax({
				url:baseUrl+'/'+ orgName +'/' + appUuid +'/users/' + friend_username,
				type:'POST',
				headers:{
					'Authorization':'Bearer '+access_token,
					'Content-Type':'application/json'
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert('提示\n\n该用户不存在，请检查用户名!');
				},
				success: function(respData, textStatus, jqXHR) {
					var owner = $.cookie('owner');
					if(friend_username != owner){
					
					$.ajax({
						url:baseUrl + '/' +orgName +'/'+appUuid+'/chatgroups/' +owner_username+'/users/'+friend_username,
						type:'POST',
						headers:{
							'Authorization':'Bearer '+access_token,
							'Content-Type':'application/json'
						},
						error: function(jqXHR, textStatus, errorThrown) {
							
						},
						success: function(respData, textStatus, jqXHR) {
							alert('添加好友成功!');
							location.replace(location.href);
						}
					});
					}else{
						alert('该用户已经是管理员不能添加!');	
					}
				}
		});
	
		
	}
	
}
//添加群组
function addqunzuFriendusers(appUuid,qunzuname,qunzumiaosu,approval,publics,qunzuguan){
	var orgName = $.cookie('orgName');
	var access_token = $.cookie('access_token');
	var owner_username = $('#usernameFriend').val();
	//var appUuid = $('#appUuidFriend').val();
	var friend_username = $('#friendUsername').val();
	var qun={
    "groupname":qunzuname,
    "desc":qunzumiaosu, 
    "public":publics, 
   // "approval":approval, 
    "owner":qunzuguan
}; 
	if(publics==true){
       qun.approval=approval;
	}
	if (qunzuname == ''){
		alert('群组名称不能为空!');	
	}else if(qunzumiaosu==''){
	    alert('群组描述不能为空');
	}else if(qunzuguan==''){
	    alert('群组管理员不能为空');
	}else{
		$.ajax({
				url:baseUrl + '/' +orgName +'/'+appUuid+'/chatgroups',
				type:'POST',
			    data:JSON.stringify(qun),
				headers:{
					'Authorization':'Bearer '+access_token,
					'Content-Type':'application/json'
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert('提示\n\n该用户不存在，请检查用户名!');
				},
				success: function(respData, textStatus, jqXHR) {
					location.replace(location.href);
				}
		});
	
		
	}
	
}
// 批量删除app下的群组的Ajax
function deleteAppChatrooms(appUuid,groupuuid){
	var access_token = $.cookie('access_token');
	var orgName = $.cookie('orgName');
		$.ajax({
			async: false, 
			url:baseUrl + '/' +orgName +'/'+appUuid+'/chatgroups/' + groupuuid,
			type:'DELETE',
			headers:{
				'Authorization':'Bearer ' + access_token,
				'Content-Type':'application/json'
			},
			error:function(){
			},
			success:function(respData){
			}
		});
	
}
//批量删除app下的群组调用
function deleteAppqunzuCheckBox(appUuid){
		var checkbox=document.getElementsByName("checkbox");
		var num=0;
		for (var i=0;i<checkbox.length;i++){
			if(checkbox[i].checked){
				num++;
			}
		}
		if(num>0){
			if(confirm('确定要删除这些q群组吗?')){
				for (var i=0;i<checkbox.length;i++){
					if(checkbox[i].checked){
						deleteAppChatrooms(appUuid,checkbox[i].value);
					}
				}
				location.replace(location.href);
			}
		}else{
			alert('至少选择一个用户!');	
		}
}
//============================================================证书 ========================================================================
// 上传证书
// 分页条更新
function updatequnzuPageStatus(){
	var pageLi = $('#paginau').find('li');
	
	// 获取token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		$.ajax({
			url:baseUrl+'/'+ orgName +'/' + appUuid + '/notifiers?limit=1000',
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				total = respData.entities.length;
				var totalPage = (total % 5 == 0) ? (parseInt(total / 5)) : (parseInt(total / 5) + 1);
				// $('#pageInfo').text('当前第' + pageNo +  '页     一共' + totalPage +'页');
				var ulB = '<ul>';
				var ulE = '</ul>';
				var textOp1 = '<li> <a href="javascript:void(0);" onclick="getPrevAppUserList();">上一页</a> </li>';
				var textOp2 = '<li> <a href="javascript:void(0);" onclick="getNextAppUserList();">下一页</a> </li>';
				$('#paginau').html('');
				// 首页
				if(pageNo == 1){
					if(totalPage == 1){
						//$(pageLi[0]).hide();
						//$(pageLi[1]).hide();
						$('#paginau').append(ulB + ulE);
					} else {
						$('#paginau').append(ulB + textOp2 + ulE);
						//$(pageLi[0]).hide();
						//$(pageLi[1]).show();
					}
					// 尾页
				} else if(totalPage ==  pageNo){
					$('#paginau').append(ulB + textOp1 + ulE);
					//$(pageLi[0]).show();
					//$(pageLi[1]).hide();
				} else {
					$('#paginau').append(ulB + textOp1 + textOp2 + ulE);
					//$(pageLi[0]).show();
					//$(pageLi[1]).show();
				}
			}
		});
	}
}



// 查询证书信息
function getAppCredentials(appUuid, pageAction){
	$('#paginau').html('');
	var access_token = $.cookie('access_token');
	var orgName = $.cookie('orgName');
	if('next' == pageAction){
			pageNo += 1;
		} else if('forward' == pageAction){
			pageNo -= 1;
		}
		var temp = '';
		if(typeof(pageAction)!='undefined' && pageAction != ''){	
			temp = '&cursor='+cursors[pageNo];
		}
		var loading = '<tr id="tr_loading"><td class="text-center" colspan="5"><img src ="/assets/img/loading.gif">&nbsp;&nbsp;&nbsp;<span>正在读取数据...</span></td></tr>';
		$('#appCredentialBody').empty();
		$('#appCredentialBody').append(loading);
	$.ajax({
			url:baseUrl+'/'+ orgName +'/' + appUuid + '/notifiers?limit=5'+temp,
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
				
			},
			success: function(respData, textStatus, jqXHR) {
				$('#appCredentialBody').html('');
				// 缓存游标,下次next时候存新的游标
				if(pageAction!='forward'){
					cursors[pageNo+1] =	respData.cursor;
				} else {
					cursors[pageNo+1] = null;
				}
				if(respData.entities.length ==0 && pageAction == 'no'){
					getAppCredentials(appUuid,'forward' );
				}else{
					var option = '';
					$(respData.entities).each(function(){
						var name = this.name;
						var credentialId = this.uuid;
						var passphrase = this.passphrase;
						var environment = '';
						if(this.environment == 'DEVELOPMENT') {
							environment = '开发';
						} else if(this.environment == 'PRODUCTION'){
							environment = '生产';
						}
						
						var created = format(this.created);
						var modified = format(this.modified);
						option += '<tr>'+
								'<td class="text-center">'+name+'</td>'+
								'<td class="text-center">'+environment+'</td>'+
							'<td class="text-center">'+created+'</td>'+
							'<td class="text-center">'+modified+'</td>'+
							'<td class="text-center"><a href="javascript:deleteAppCredential(\''+ credentialId + '\',\''+ appUuid +'\')">删除</a></td>'+
							'</tr>';
							
					});
					$('#tr_loading').remove();
					$('#appCredentialBody').append(option);
				}
				// 无数据
				var tbody = document.getElementsByTagName("tbody")[0];
				if(!tbody.hasChildNodes()){
					var option = '<tr><td class="text-center" colspan="5">无数据!</td></tr>';
					$('#tr_loading').remove();
					$('#appUserAdminBody').append(option);
					var pageLi = $('#paginau').find('li');
					for(var i=0;i<pageLi.length;i++){
						$(pageLi[i]).hide();
					}
				} else {
					// 20140810 liwei add
					var ulB = '<ul>';
					var ulE = '</ul>';
					var textOp1 = '<li> <a href="javascript:void(0);" onclick="getPrevAppUserList();">上一页</a> </li>';
					var textOp2 = '<li> <a href="javascript:void(0);" onclick="getNextAppUserList();">下一页</a> </li>';
					$('#paginau').html('');
						
					// 首页
					if(pageNo == 1){
						if(respData.cursor == null){
							$('#paginau').append(ulB + ulE);
						} else {
							$('#paginau').append(ulB + textOp2 + ulE);
						}
						// 尾页
					} else if(cursors.length != 0 && respData.cursor == null){
						$('#paginau').append(ulB + textOp1 + ulE);
					} else {
						$('#paginau').append(ulB + textOp1 + textOp2 + ulE);
					}	
				}
				$('#showName').text(respData.applicationName);
				$('#fileAppKey').text(respData.applicationName);
				
				if(respData.entities.length == 0){
					var option = '<tr><td class="text-center" colspan="5">暂无证书!</td></tr>';
					$('#appCredentialBody').append(option);
				}
			}
		});
}

// 删除开发者推送证书
function deleteAppCredential(credentialId,appUuid){
	var access_token = $.cookie('access_token');
	var orgName = $.cookie('orgName');
	
	if(confirm('确定删除这个证书吗?')){
		var layerNum = layer.load('正在删除...');
		$.ajax({
			url:baseUrl+'/'+ orgName +'/' + appUuid + '/notifiers/' + credentialId,
			type:'DELETE',
			headers:{
				'Authorization':'Bearer ' + access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
				layer.close(layerNum);
				alert('证书删除失败!')	
			},
			success: function(respData, textStatus, jqXHR) {
					layer.close(layerNum);
					alert('证书已删除!')	
					getAppCredentials(appUuid,'no');
			}
		});	
	}
}

//==============================================================IM=======================================================================
// 用户好友列表
function toAppIMList(owner_username){
	window.location.href = '/console/app_IM_list?appUuid='+appUuid+'&owner_username='+owner_username;
}
//获取用户好友列表
function getAppIMList(appUuid, owner_username){
	// 获取token
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		var loading = '<tr id="tr_loading"><td class="text-center" colspan="3"><img src ="/assets/img/loading.gif">&nbsp;&nbsp;&nbsp;<span>正在读取数据...</span></td></tr>';
		$('#appIMBody').empty();
		$('#appIMBody').append(loading);
		$.ajax({
			url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/'+owner_username+'/contacts/users',
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				
				$('tbody').html('');
				var i=0;
				var selectOptions = '';
				$(respData.data).each(function(){
					/*var option = '<tr>'+
								'<td style=" visibility:visible;"><input type="checkbox" value="fff"  style="width:100px; height:20px;border:1px solid #F00;"/>'+(i+1)+'</td>'+
							 	'<td>'+respData.data[i]+'</td>'+
							 	'<td style="padding:4px 0 0 0;"><a class="a_button" href="javascript:deleteAppIMFriend(\''+appUuid+'\', \''+owner_username+'\',\''+respData.data[i]+'\')"  style="display:block; background:#fafafa; border:1px solid #e0e8eb; width:100px; height:25px; line-height:25px; font-size:12px;">解除好友关系</a></td>'+
					 		'</tr>';*/
					selectOptions += '<tr>'+
							'<td style=" visibility:visible;"><input type="checkbox" value="fff"  style="width:100px; height:20px;border:1px solid #F00;"/>'+(i+1)+'</td>'+
							'<td>'+respData.data[i]+'</td>'+
						 	'<td class="text-center">'+
								'<ul class="text-center" class="nav-pills" style="list-style-type:none">'+
			    				'<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">操作<b class="caret"></b></a>'+
			    					'<ul class="dropdown-menu" style="left:150px;">'+
				          		'<li><a href="javascript:deleteAppIMFriend(\''+appUuid+'\', \''+owner_username+'\',\''+respData.data[i]+'\')">解除好友关系</a></li>'+
						     		'</ul>'+
						     	'</li>'+
					     	'</ul>'+
							'</td>'+
				 		'</tr>';
					i++;
					
				});
				$('#tr_loading').remove();
				$('#appIMBody').append(selectOptions);
				// 无数据
				var tbody = document.getElementsByTagName("tbody")[0];
				if(!tbody.hasChildNodes()){
					var option = '<tr><td class="text-center" colspan="3">无数据!</td></tr>';
					$('#appIMBody').append(option);
					var pageLi = $('#paginau').find('li');
					for(var i=0;i<pageLi.length;i++){
						$(pageLi[i]).hide();
					}
				}
			}
		});
	}
}


//删除某个好友
function deleteAppIMFriend(appUuid, owner_username, friend_username){
	//获取token
	var orgName = $.cookie('orgName');
	var access_token = $.cookie('access_token');
	if(!access_token || access_token==''){
		showTipAndLogin();
	} else {
		if(window.confirm('确定删除此好友？')){
			$.ajax({
				url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/'+owner_username+'/contacts/users/'+friend_username,
				type:'DELETE',
				headers:{
					'Authorization':'Bearer '+access_token,
					'Content-Type':'application/json'
				},
				error: function(jqXHR, textStatus, errorThrown) {
				},
				success: function(respData, textStatus, jqXHR) {
					location.replace(location.href);
				}
			});
		}
	}

}

//弹出添加好友页面
function showAddFriend(appUuid,username){
	$('#usernameFriend').val(username);
	$('#appUuidFriend').val(appUuid);
	$('#friendUsername').val('');
	$('#showAddFriend').click();
}

//添加好友
function addIMFriend(){
	var orgName = $.cookie('orgName');
	var access_token = $.cookie('access_token');
	var owner_username = $('#usernameFriend').val();
	var appUuid = $('#appUuidFriend').val();
	var friend_username = $('#friendUsername').val();
	if (friend_username == ''){
		alert('好友名称不能为空!');	
	}else{
		var layerNum = layer.load('正在验证名称...');
		$.ajax({
				url:baseUrl+'/'+ orgName +'/' + appUuid +'/users/' + friend_username,
				type:'POST',
				headers:{
					'Authorization':'Bearer '+access_token,
					'Content-Type':'application/json'
				},
				error: function(jqXHR, textStatus, errorThrown) {
					layer.close(layerNum);
					alert('提示\n\n该用户不存在，请检查用户名!');
				},
				success: function(respData, textStatus, jqXHR) {
					var layerNum = layer.load('正在添加好友...');
					$.ajax({
						url:baseUrl+'/'+ orgName +'/' + appUuid +'/users/' + owner_username + '/contacts/users/' + friend_username,
						type:'POST',
						headers:{
							'Authorization':'Bearer '+access_token,
							'Content-Type':'application/json'
						},
						error: function(jqXHR, textStatus, errorThrown) {
							
						},
						success: function(respData, textStatus, jqXHR) {
							layer.close(layerNum);
							alert('添加好友成功!');
							location.replace(location.href);
						}
					});
				}
		});
	
		
	}
	
}


//=====================================================================管理员===============================================================

//获取管理员列表
function getAppUsersAdminList(appUuid, pageAction){
	// 获取token
	$('#paginau').html('');
	var access_token = $.cookie('access_token');
	var cuser = $.cookie('cuser');
	var orgName = $.cookie('orgName');
	if(!access_token || access_token==''){
		showTipAndLogin();
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
		var loading = '<tr id="tr_loading"><td class="text-center" colspan="4"><img src ="/assets/img/loading.gif">&nbsp;&nbsp;&nbsp;<span>正在读取数据...</span></td></tr>';
		$('#appUserAdminBody').empty();
		$('#appUserAdminBody').append(loading);
		$.ajax({
			url:baseUrl+'/'+ orgName +'/' + appUuid +'/roles/admin/users?limit=10' + temp,
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				if(pageAction!='forward'){
					if(respData.cursor){
						cursors[pageNo+1] = respData.cursor;
					}else{
						cursors[pageNo+1] = null;
					}
				}
				if(respData.entities.length ==0 && pageAction == 'no'){
					getAppUsersAdminList(appUuid,'forward' );
				}else{
					$('tbody').html('');
					var i=0;
					var selectOptions = '';
					$(respData.entities).each(function(){
						var username = this.username;
						var created = format(this.created);
						/*var option = '<tr>'+
									'<td class="text-center">'+(i+1)+'</td>'+	
									'<td class="text-center">'+username+'</td>'+
									'<td class="text-center">'+created+'</td>'+
									'<td class="text-center">'+
									'<a  class="btn btn-mini btn-info" href="javascript:deleteUserAdmin(\''+appUuid+'\',\''+username+'\')">撤销管理员</a></td>'+
								'</tr>';*/
						selectOptions += '<tr>'+
								'<td class="text-center">'+(i+1)+'</td>'+	
								'<td class="text-center">'+username+'</td>'+
								'<td class="text-center">'+created+'</td>'+
								'<td class="text-center">'+
									'<ul class="text-center" class="nav-pills" style="list-style-type:none">'+
									'<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">操作<b class="caret"></b></a>'+
										'<ul class="dropdown-menu">'+
									'<li><a href="javascript:deleteUserAdmin(\''+appUuid+'\',\''+username+'\')">撤销管理员</a></li>'+
										'</ul>'+
									'</li>'+
								'</ul>'+
								'</td>'+
							'</tr>';
						i++;
						
					});
					$('#tr_loading').remove();
					$('#appUserAdminBody').append(selectOptions);
				}
				// 无数据
				var tbody = document.getElementsByTagName("tbody")[0];
				if(!tbody.hasChildNodes()){
					var option = '<tr><td class="text-center" colspan="4">无数据!</td></tr>';
					$('#tr_loading').remove();
					$('#appUserAdminBody').append(option);
					var pageLi = $('#paginau').find('li');
					for(var i=0;i<pageLi.length;i++){
						$(pageLi[i]).hide();
					}
				} else {
					// 20140810 liwei add
					var ulB = '<ul>';
					var ulE = '</ul>';
					var textOp1 = '<li> <a href="javascript:void(0);" onclick="getPrevAppUserList();">上一页</a> </li>';
					var textOp2 = '<li> <a href="javascript:void(0);" onclick="getNextAppUserList();">下一页</a> </li>';
					$('#paginau').html('');
						
					// 首页
					if(pageNo == 1){
						if(respData.cursor == null){
							$('#paginau').append(ulB + ulE);
						} else {
							$('#paginau').append(ulB + textOp2 + ulE);
						}
						// 尾页
					} else if(cursors.length != 0 && respData.cursor == null){
						$('#paginau').append(ulB + textOp1 + ulE);
					} else {
						$('#paginau').append(ulB + textOp1 + textOp2 + ulE);
					}	
				}
			}
		});
	}
}


//设置管理员
function setUserAdmin(appUuid,user_name){
	//获取token
	var token = $.cookie('access_token');
	var orgName = $.cookie('orgName');
	$.ajax({
		url:baseUrl + '/' + orgName + '/' + appUuid + '/users/'+ user_name +'/roles/admin',
		type:'POST',
		data:{},
		headers:{
			'Authorization':'Bearer ' + token,
			'Content-Type':'application/json'
		},
		success:function(respData){
			// if success , to app user list
			alert('设置管理员成功!')
			getAppUserList(appUuid,'no');
		},
			error:function(data){
			alert('设置管理员失败!')
		}
	});
}
	
//撤销管理员
function deleteUserAdmin(appUuid,user_name){
	var token = $.cookie('access_token');
	var orgName = $.cookie('orgName');
	var url=window.location.href;
	var str=url.substring(url.lastIndexOf('app_u'),url.lastIndexOf('.html'));
	if(confirm('您确定要撤销此用户管理员身份么?')){
		$.ajax({
			url:baseUrl +'/' +orgName+'/'+appUuid+ '/roles/admin/users/'+user_name,
	
			type:'DELETE',
			data:{},
			headers:{
				'Authorization':'Bearer ' + token,
				'Content-Type':'application/json'
			},
			success:function(respData){
				// if success , to app user list
				alert('撤销管理员成功!')
				if(str == 'app_users_admin'){
					getAppUsersAdminList(appUuid,'no');
				}else if(str == 'app_users'){
					getAppUserList(appUuid,'no');
				}
				
			},
				error:function(data){
				alert('撤销管理员失败!')
			}
		});
	}
	
}
//撤销管理员For搜索页面
function deleteUserAdminForSearch(appUuid,user_name){
	var token = $.cookie('access_token');
	var orgName = $.cookie('orgName');
	var url=window.location.href;
	var str=url.substring(url.lastIndexOf('app_u'),url.lastIndexOf('.html'));
	if(confirm('您确定要撤销此用户管理员身份么?')){
		$.ajax({
			url:baseUrl +'/' +orgName+'/'+appUuid+ '/roles/admin/users/'+user_name,
	
			type:'DELETE',
			data:{},
			headers:{
				'Authorization':'Bearer ' + token,
				'Content-Type':'application/json'
			},
			success:function(respData){
				// if success , to app user list
				alert('撤销管理员成功!')
				searchUser(appUuid, user_name);		
			},
				error:function(data){
				alert('撤销管理员失败!')
			}
		});
	}
	
}
//设置管理员For搜索页面
function setUserAdminForSearch(appUuid,user_name){
	//获取token
	var token = $.cookie('access_token');
	var orgName = $.cookie('orgName');
	$.ajax({
		url:baseUrl + '/' + orgName + '/' + appUuid + '/users/'+ user_name +'/roles/admin',
		type:'POST',
		data:{},
		headers:{
			'Authorization':'Bearer ' + token,
			'Content-Type':'application/json'
		},
		success:function(respData){
			// if success , to app user list
			alert('设置管理员成功!')
			searchUser(appUuid, user_name);
		},
			error:function(data){
			alert('设置管理员失败!')
		}
	});
}