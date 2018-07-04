<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<c:set var="contextPath" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>XXX公司招聘首页</title>
	    <link rel="stylesheet" href="${contextPath}/static/css/index.css" />
	    <link rel="stylesheet" href="${contextPath}/static/css/www/footer.css" />
		<link rel="stylesheet" href="${contextPath}/static/css/bootstrap.css">
		<script type="text/javascript" src="${contextPath}/static/js/jquery-1.11.3.js" ></script>
		<script type="text/javascript" src="${contextPath}/static/js/bootstrap.min.js" ></script>
		<script type="text/javascript" src="${contextPath}/static/js/sweerAlert2.79.js" ></script>
	</head>
	<body>
		<!--头部导航条-->
		<nav class="navbar navbar-default">
		  <div class="container-fluid">
		    <div class="navbar-header">
		     <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		    <img src="${contextPath}/static/img/B.gif" width="100" height="50"/>
		    </div>
		
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul class="nav navbar-nav">
		        <li class="active"><a href="/index1">首页<span class="sr-only">(current)</span></a></li>
				  <li class="dropdown">
					  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">职位选择<span class="caret"></span></a>
					  <ul class="dropdown-menu">
						  <li><a href="/school/">校园招聘</a></li>
						  <li><a href="/position">社会招聘</a></li>
					  </ul>
				  </li>
		         <li><a href="/question">问答管理</a></li>
		        <li class="dropdown">
		          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">个人中心<span class="caret"></span></a>
		          <ul class="dropdown-menu">
		            <li><a href="/resume">简历管理</a></li>
		            <li><a href="/collection">职位收藏</a></li>
		          </ul>
		        </li>
		      </ul>



				<shiro:notAuthenticated>
					<ul class="nav navbar-nav navbar-right">
						<li><a href="/login1">登录</a></li>
						<li><a href="/register">注册</a></li>
					</ul>
				</shiro:notAuthenticated>

				<shiro:authenticated>
					<ul class="nav navbar-nav navbar-right">
						<shiro:hasRole name="admin">
							<li><a href="/admin/">管理员</a></li>
						</shiro:hasRole>
						<li><a href="javascript:void(0);">${username}</a></li>
						<li><a href="/logout">退出</a></li>
					</ul>
				</shiro:authenticated>
		    </div>
		  </div>
        </nav>
        
        <!--广告图和搜索框-->
        <div id="ad">
        	<div class="text">共创美好未来</div>
            <!--搜索框-->
            <div class="search">
				<div class="input-group">
				    <input type="text" id="keyWord" class="form-control" placeholder="请选择相应的类型再输入关键词" style="width: 300px;height: 50px;"/>
				      <span class="input-group-btn">
				        <button  class="btn btn-danger glyphicon glyphicon-search" type="button" style="width: 50px;height: 50px;"></button>
				      </span>
				</div>
			    <div class="choose">
			    	<ul>
			    		<li><input type="radio" name="r1" value="2">校园招聘</li>
						<li><input type="radio" name="r1" value="1">社会招聘</li>
			    	</ul>
			   	</div>
           </div>
        </div>   
        <!--中心内容-->
        <div id="container">
        	<div class="t1">
        		"未来我们将在这里创造美好的东西，不断地提高工作效率，帮助企业走上更高地一层楼"
        		<br>
        		<p style="padding-left: 60px;">"我们需要你这样优秀的人才，为用户带来更好的体验"</p>
        	</div>
        	<div>
        		<strong style="padding-left: 165px;">来吧，加入我们!</strong>
        	</div>
        </div>
        
        <div id="category">
        	 <!--社会招聘-->
	        <div class="shehui">
	       		<img src="${contextPath}/static/img/首页-首页广告-1.jpg" width="400px" height="400px"/>
	       		<div class="button1"><a href="/position" class="btn btn-danger" value="社会招聘">社会招聘</a></div>
	       		<div class="t2">发挥你的潜能，在这里能够创造属于你的无限可能</div>
	       	</div>
	       	<!--校园招聘-->
	       	<div class="xiaoyuan">
	       		<img src="${contextPath}/static/img/首页-首页广告-2.jpg" width="400px" height="400px"/>
	       		<div class="button1"><a href="/school/" class="btn btn-danger" value="校园招聘">校园招聘</a></div>
	            <div class="t2">洞见新知的你，让我们携起手来，创造美好的未来</div>
	       	</div>
        </div>
       
         <div id="liucheng">
        	<p>校园招聘流程</p>
            <img src="${contextPath}/static/img/liucheng.png" width="1052px;" height="100px;" style="margin-left: 150px;">
        </div>
        <!--尾部-->
       <footer>
       		<div class="left_1">
	       	  	<p style="color: wheat; font-size: larger; font-family: '微软雅黑';">关于公司</p>
	       	  	<ul>
	       	  		<li><a href="#">公司简介</a></li>
	       	  		<li><a href="#">公司年报</a></li>
	       	  	</ul>
       	    </div>
       	  <div class="left_1">
       	  	 <p style="color: wheat; font-size: larger; font-family: '微软雅黑';">新闻</p>
       	  	 <ul>
       	  	 	<li><a href="#">公司公告</a></li>
       	  	 	<li><a href="#">公司新闻</a></li>
       	  	 </ul>
       	  </div> 
       	  
       	<div id="desc">
       		<p style="padding-left: 600px;">版权所有@EdenJia</p>
       	</div>
       </footer>

	<script src="${contextPath}/static/js/index.js"></script>
	</body>
</html>
