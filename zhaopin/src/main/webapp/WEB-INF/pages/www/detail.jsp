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
		<link rel="stylesheet" href="${contextPath}/static/css/www/xiangxi.css" />
	    <link rel="stylesheet" href="${contextPath}/static/css/www/footer.css" />
		<link rel="stylesheet" href="${contextPath}/static/css/bootstrap.css">
		<script type="text/javascript" src="${contextPath}/static/js/jquery-1.11.3.js" ></script>
		<script type="text/javascript" src="${contextPath}/static/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="${contextPath}/static/js/sweerAlert2.79.js"></script>
		<style type="text/css">
			#dialog{
				background: white;
				width: 300px;
				height: 200px;
				position: relative;
				top:230px;
				margin: auto;
			}
		</style>
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
        
        <div id="container">
        	<div class="text1">
				<span id="pId" style="display: none;">${detail.id}</span>
        		<h2 id="pName">${detail.pName}</h2>
        		<span style="display: inline-block;float: right;"><a href="javaScript:void(0)" onclick="history.back();">返回职位列表</a></span>
        		<large>${detail.workSite}&nbsp;${detail.pClassify}&nbsp;经验:${detail.pDescribe}</large>
        	</div>
        	<div class="text2">
        		<h3>岗位职责：</h3>
        		<p>
					${detail.pResponsibility}
        		</p>
        	</div>
        	
        	<div class="text2">
        		<h3>岗位要求：</h3>
        		<p>
					${detail.pRequest}
        		</p>
        	</div>
        	
        	<div class="btn-group">
        		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">申请职位</button>
        		&nbsp;&nbsp;
        		<button type="button" class="btn btn-info" id="collectBtn">收藏职位</button>
        		<%--<img src="${contextPath}/static/img/qq.png" alt="分享给QQ好友"  class="img-circle" width="30px" height="30px" style="margin: 2px 10px " >--%>
        	    <%--<img src="${contextPath}/static/img/wenxin.png" alt="分享给微信好友"  class="img-circle" width="30px" height="30px">--%>
        	</div>
        	
        	<div class="tuijian">
        	    <h2>推荐职位</h2>
                <div id="table">
		        	<ul>
		        		<li style="display: none;">id</li>
		        		<li>职位描述</li>
		        		<li>工作地点</li>
		        		<li>类别</li>
		        		<li>部门名称</li>
		        	</ul>
		        	<ul>
						<c:forEach items="${positions}" var="p" step="1">
							<li class="positionList">
								<span style="display:none;">${p.id}</span>
								<span style="display:none;">${p.flag}</span>
								<span class="pName">${p.pName}</span>
								<span>${p.workSite}</span>
								<span>${p.pClassify}</span>
								<span>${p.pDepartment}</span>
								<p style="width: 800px;height:31px;overflow: hidden">${p.pRequest}</p>
							</li>
						</c:forEach>
		        	</ul>
                </div>
            </div>
        </div>

        
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

		<div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="..." >
			<div class="modal-dialog" id="dialog">
				<div style="position: relative; top:60px;left: 50px;" >
					<button type="button" class="btn btn-primary" id="lineBtn" style="width: 200px;display: block;">在线简历</button>
					<button type="button" class="btn btn-primary" id="fileBtn" style="width: 200px;display: block;margin-top: 20px;">附件简历</button>
				</div>
			</div>
		</div>

	<script src="${contextPath}/static/js/www/detail.js"></script>
	</body>
</html>
