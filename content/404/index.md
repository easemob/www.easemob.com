---
title: 环信即时通讯云
layout: overview
---

<style>
*{ padding:0; margin:0;}
body { width:1349px; height:873px; background:#FFF;}
li { list-style:none;}
.fl { float:left;}
.fr { float:right;}
a { text-decoration:none;}
       
.main { width:694px; height:424px; border:1px solid #d5d5d5; border-radius:7px; 
background:#FFF; margin:60px auto; box-shadow:2px 2px 3px #dedede;  padding-left:30px;}
.tupian { background:url(../img/tan.png) no-repeat; width:195px; height:180px; margin-top:140px; margin-left:32px;}
.wenzi { margin-left:50px; margin-top:20px;}
.wenzi span{ font-size:90px; color:#c4c4c4; font-family:Consolas; display:block; margin-left:64px; width:157px; height:70px; line-height:70px;}
.wenzi em {font-size:35px; color:#c4c4c4; font-family:Consolas; font-style:normal; display:block; margin-left:153px; margin-bottom:15px;}
.wenzi h1 { font-size:36px; color:#8a8a8a;}
.wenzi p.xianshi1 { font-size:14px; color:#8a8a8a; line-height:36px; padding-top:15px;}
.wenzi p#xianshi { font-size:14px; color:#8a8a8a; line-height:36px;}
.wenzi ul li a { font-size:14px; color:#00addc; line-height:36px; background:url(../img/feiji_03.png) no-repeat left center; padding-left:30px;}

</style>

<div class="main">
  <div class="tupian fl">
   </div>
   <div class="wenzi fl">
   <span>404</span>
   <em>not fund</em>
   <h1>您访问的页面找不到了</h1>
   <p class="xianshi1" style="padding-top:15px;">该页面可能已被移动，重命名过暂时不显示。

</p><p id="xianshi">5 秒之后页面自动跳转至首页</p>
   <p class="xianshi1">您还可以</p>
   <ul class="fl">
   <li><a href="http://developer.easemob.com/">开发者文档</a></li>
   <li><a href="http://www.easemob.com/demo/"> Demo下载</a></li>
   <li><a href="http://www.easemob.com/price/"> 价格</a></li>
   </ul>
   <ul class="fl" style="margin-top:36px; margin-left:19px;">
   <li><a href="http://www.easemob.com/sdk/"> SDK下载</a></li>
   <li><a href="https://console.easemob.com/"> 登录环信</a></li>
   </ul> 
   </div>
 </div>
<script language="javascript" type="text/javascript">    
var secs =5; //倒计时的秒数    
var URL ;    
function Load(url){    
URL =url;    
for(var i=secs;i>=0;i--)    
{    
window.setTimeout('doUpdate(' + i + ')', (secs-i) * 1000);    
}    
}    
function doUpdate(num)    
{
document.getElementById('xianshi').innerHTML = '将在'+num+'秒之后页面自动跳转至首页' ;    
if(num == 0) { window.location=URL; }    
}    
</script>

<script language="javascript">    
Load("http://www.easemob.com/"); //要跳转到的页面    
</script> 