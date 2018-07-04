<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>XXX公司招聘首页</title>
		<link rel="stylesheet" href="${contextPath}/static/css/register.css" />
		<link rel="stylesheet" href="${contextPath}/static/css/bootstrap.css">
		<script type="text/javascript" src="${contextPath}/static/js/jquery-1.11.3.js" ></script>
		<script type="text/javascript" src="${contextPath}/static/js/bootstrap.min.js" ></script>
		<script type="text/javascript" src="${contextPath}/static/js/sweetAlert.js"></script>
		<script type="text/javascript" src="${contextPath}/static/js/jquery.validate.js"></script>
		<script type="text/javascript" src="${contextPath}/static/js/localization/messages_zh.js"></script>


	</head>
	<body>
		
		<!--头部导航条-->
		<nav class="navbar navbar-default">
		  
        </nav>
        <div id="title">
           <div id="login">
		         注册
		   </div>
		   <div id="right">
			 <a href="/login1">登录</a>
		   </div>
        </div>
		
		<div id="container">
		   <form id="registerForm">
				<div class="form-group">
				    <label for="username">用户名：</label>
				    <input type="text" class="form-control" id="username" name="username" placeholder="输入你的帐号" >
				</div>
				<div class="form-group">
				    <label for="exampleInputPassword1">密码：</label>
				    <input type="password" class="form-control"  id="password" name="password" placeholder="输入密码" >
				</div>
			   <div class="form-group">
				   <label for="exampleInputPassword2">再次输入密码：</label>
				   <input type="password" class="form-control"   id="password1" name="password1" placeholder="输入密码" >
			   </div>
			    <p>下面填写你的密保答案(不要外漏),找回密码时必用</p>
				<div class="form-group">
				    <label for="motherName">你的母亲的名字是?</label>
				    <input type="text" class="form-control" id="answer1" name="answer1" placeholder="张三" >
				</div>
				<div class="form-group">
				    <label for="phoneNum">你的电话号码是?</label>
				    <input type="text" class="form-control" id="answer2" name="answer2"  placeholder="1111" >
				</div>
			   <input type="submit" class="btn btn-primary" id="register1"   style="width: 170px;" value="注册"></input>
			</form>
		</div>

	    <footer>
	    	<div id="desc">
       		  <p style="padding-left: 600px;">版权所有@EdenJia</p>
            </div>
	    </footer>
		<script type="text/javascript" src="${contextPath}/static/js/main.js"></script>
	</body>
</html>
