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
		<title>XXX公司招聘筛选</title>
		<link rel="stylesheet" href="${contextPath}/static/css/www/resume.css" />
	    <link rel="stylesheet" href="${contextPath}/static/css/www/footer.css" />
		<link rel="stylesheet" href="${contextPath}/static/css/bootstrap.css">
		<link rel="stylesheet" href="${contextPath}/static/css/fileinput.min.css" />
		<script type="text/javascript" src="${contextPath}/static/js/jquery-1.11.3.js" ></script>
		<script type="text/javascript" src="${contextPath}/static/js/bootstrap.min.js" ></script>
		<%--<script type="text/javascript" src="${contextPath}/static/js/zh.js"></script>--%>
		<script type="text/javascript" src="${contextPath}/static/js/fileinput.min.js" ></script>
		<script type="text/javascript" src="${contextPath}/static/js/sweerAlert2.79.js" ></script>
		<%--<script type="text/javascript" src="${contextPath}/static/js/jquery.media.js"></script>--%>

	</head>
	<body style="background-color: #F4F4F4;">
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
        	<div class="list-group">
        		<h4 class="list-group-item">我的简历</h4>
			    <a href="#informationshow" class="list-group-item">基本信息</a>
				<a href="#eduShow" class="list-group-item">教育经历</a>
		        <a href="#workShow" class="list-group-item">工作经历</a>
			    <a href="#projectShow" class="list-group-item">项目经验</a>
		 	    <a href="#skillShow" class="list-group-item">技能特点</a>
		 	    <a href="#schoolShow" class="list-group-item">在校情况</a>
		 	    <a href="#"  class="list-group-item"  data-toggle="modal" data-target="#myModal">上传附件简历</a>
				<a href="javascript:void(0)" id="modelA" title="${resume.informationDto.files}" class="list-group-item">预览附件简历</a>
				<a href="javascript:void(0)" id="delete" class="list-group-item">删除附件简历</a>
			</div>
			<div id="resumeBody">
				<div id="informationshow">
					<h4><strong>基本信息：</strong></h4>
						<span class="glyphicon glyphicon-edit"><a href="javascript:void(0);" id="editFirst">编辑</a></span>
					<div id="person">
						<label for="name">姓&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;名：</label>
		        	    <span class="name" id="showName">${resume.informationDto.name}</span><br>
						<label for="sex">性&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;别：</label>
		        		<span class="sex" id="showSex">${resume.informationDto.sex}</span><br>
						<label for="email">邮&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;箱：</label>
		        		<span class="email" id="showEmail">${resume.informationDto.email}</span><br>
		        		<label for="xueli">政治面貌：</label>
		        		<span class="face" id="showFace">${resume.informationDto.poliStatus}</span><br>
						<label for="phone">联系方式：</label>
		        		<span class="phone" id="showPhoneNum">${resume.informationDto.phone}</span><br>
					    <label for="xueli">求职意向：</label>
		        		<span class="intension" id="showJobIntension">${resume.informationDto.jobIntension}</span><br>
	        			<label for="xueli">个人描述：</label>
		        		<p id="showDescribes">${resume.informationDto.describes}</p>
					</div>
					<div id="imgPerson">
					  <img src="${resume.informationDto.photo}" id="imgPersonShow" alt="..." class="img-thumbnail" width="140px" height="140px"/>
					</div>
					<hr/>
				</div>
				<div id="information" style="display: none;">
					<h4>基本信息：</h4>
					<form class="form-inline" id="infoForm">
					  <div class="form-group">
					    <span class="bianqian">*</span><label for="name">姓&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;名：</label>
	        			<input type="text" id="username" class="form-control" placeholder="姓名" required="required">
	        			&nbsp; &nbsp;
	        			<span class="bianqian">*</span><label for="sex">性&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;别：</label>
	        			<select class="form-control" style="width: 170px;" id="sex">
	        				<option value="男">男</option>
	        				<option value="女">女</option>
	        			</select>
					  </div>
					 <div class="form-group">
					    <span class="bianqian">*</span><label for="email">邮&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;箱：</label>
	        			<input type="email" id="email" class="form-control" placeholder="邮箱" required="required"></input>
	        	    	&nbsp; &nbsp;
	        			<span class="bianqian">*</span><label for="face">政治面貌：</label>
	        			<select class="form-control" id="face" style="width: 170px;">
	        				<option value="高中及高中以下">群众</option>
	        				<option value="大专">共青团员</option>
	        				<option value="本科">中共党员</option>
	        			</select>
					  </div>
					  
					  <div class="form-group">
	        			<span class="bianqian">*</span><label for="phoneNum">联系方式：</label>
	        			<input type="text" id="phoneNum" class="form-control" placeholder="联系方式" required="required">
					    <span class="bianqian">*</span><label for="jobIntension">求职意向：</label>
	        			<input type="text" id="jobIntension" class="form-control"/>
					  </div>
        			  <br>
        			 <div class="form-group" style="margin-top: 20px;">
	        			<span class="bianqian">*</span><label for="describe">个人描述：</label>
	        			<textarea class="form-control" id="describe" style="width: 540px;height: 150px;"></textarea>
        			 </div>
        			 <br/>
        			 <div class="form-group" style="margin-left: 300px;">
        			     <button type="submit"  class="btn btn-primary">保存</button>
        			     <button  class="btn btn-default" id="infoCancel">取消</button>
        			 </div>
                    </form>
                    <!--上传照片-->
			        <div class="touxiang">
			  			<img src="${contextPath}/static/img/B.gif" alt="..." id="photoImg" class="img-thumbnail" width="140px" height="140px"/>
						<form enctype="multipart/form-data" id="photoForm" method="post">
							<input id="input-b1" name="filename" type="file" class="file">
						</form>
			        </div>
	
				</div>
				
				<div id="eduShow">
					<h4 style="width: 800px;"><strong>教育经历:</strong></h4>
		        		<span class="glyphicon glyphicon-edit"><a href="javascript:void(0);" id="editSecond">编辑</a></span>
		        		<label for="eduShowSchool">毕业院校：</label>
		        		<span id="eduShowSchool">${resume.educationDto.school}</span><br>
		        		<label for="eduShowLevel">学历：</label>
		        		<span id="eduShowLevel">${resume.educationDto.level}</span><br>
		        		<label for="eduShowFromTime">起止时间：</label>
		        		<span id="eduShowFromTime">${resume.educationDto.fromTime}</span>
		        		-----<span id="eduShowToTime">${resume.educationDto.toTime}</span>
		        			
				</div>
				
				
				<div id="edu" style="display: none;">
					<form class="form-inline" id="eduForm">
						<div class="form-group" >
		        			<h4 style="width: 800px;">教育经历:</h4>
		        			<span class="bianqian">*</span><label for="eduSchool">毕业院校：</label>
		        			<input type="text" id="eduSchool" class="form-control" placeholder="毕业院校" required="required">
		        			&nbsp; &nbsp;
		        			<span class="bianqian">*</span><label for="eduLevel">学历：</label>
		        			<select class="form-control" id="eduLevel" style="width: 170px;">
		        				<option value="高中及高中以下">高中及高中以下</option>
		        				<option value="大专">大专</option>
		        				<option value="本科">本科</option>
		        				<option value="硕士研究生">硕士研究生</option>
		        				<option value="博士">博士</option>
		        			</select>
        			   </div>
	        			<div class="form-group">
		        			<span class="bianqian">*</span><label for="eduFromTime">起止时间：</label>
		        			<input type="date" id="eduFromTime" class="form-control" style="width:196px;"></input>
		        			<span class="glyphicon glyphicon-resize-horizontal"/>
		        			<input type="date" id="eduToTime" class="form-control"  style="width:196px;"></input>
	        			</div>
	        			<div class="form-group" style="margin-left: 300px;">
	        			     <button type="submit" class="btn btn-primary">保存</button>
	        			     <button  class="btn btn-default" id="eduCancel">取消</button>
	        			 </div>
					</form>
				</div>
				
		      	<div id="workShow">
					<h4 style="width: 800px;"><strong>工作经历:</strong></h4>
		        		<span class="glyphicon glyphicon-edit"><a href="javascript:void(0);" id="editThird">编辑</a></span>
		        		<label for="workShowCompany">公司名称：</label>
		        		<span id="workShowCompany">${resume.workDto.company}</span><br>
		        		<label for="workShowDutis">职务：</label>
		        		<span id="workShowDutis">${resume.workDto.duty}</span><br>
		        		<label for="workShowFromTime">起止时间：</label>
		        		<span id="workShowFromTime">${resume.workDto.fromTime}</span>
		        		-----<span id="workShowToTime">${resume.workDto.toTime}</span><br>
		        		<label for="workShowResponsiblity">主要职责：</label>
		        		<span id="workShowResponsiblity">${resume.workDto.responsibility}</span><br>
				</div>
				
		      	<div id="work" style="display: none;">
		      		<form class="form-inline" id="workForm">
		      		 <div class="form-group">
        				<h4 style="width: 800px;"><strong>工作经历:</strong></h4>
	        			<span class="bianqian">*</span><label for="workFromTime">起止时间：</label>
	        			<input type="date" id="workFromTime" class="form-control" style="width:196px;"></input>
	        			<span class="glyphicon glyphicon-resize-horizontal">
	        			<input type="date" id="workToTime" class="form-control"  style="width:196px;"></input>
        			 </div>
        			<div class="form-group">
	        			<span class="bianqian">*</span><label for="workCompany">公司名称：</label>
	        			<input type="text" id="workCompany" class="form-control"></input>
        			</div>
        			<div class="form-group">
	        			<span class="bianqian">*</span><label for="workDuty">担任职务：</label>
	        			<input type="text" id="workDuty" class="form-control"></input>
        			</div>
        			<br />
        			<div class="form-group">
	        			<span class="bianqian">*</span><label for="workResponsitity">主要职责：</label>
	        			<textarea class="form-control" id="workResponsitity" style="width: 600px;height: 150px;"></textarea>
        			</div>
		      		<div class="form-group" style="margin-left: 300px;">
	        			<button type="submit" class="btn btn-primary">保存</button>
	        	        <button  class="btn btn-default" id="workCancel">取消</button>
	        		</div>
		      		</form>
		      	</div>
		      	
		      	
		      	<div id="projectShow">
					<h4 style="width: 800px;"><strong>项目经验:</strong></h4>
		        		<span class="glyphicon glyphicon-edit"><a href="javascript:void(0);" id="editFofth">编辑</a></span>
		        		<label for="projectShowName">项目名称：</label>
		        		<span id="projectShowName">${resume.projectDto.projectName}</span><br>
		        	    <label for="projectShowFromTime">起止时间：</label>
		        		<span id="projectShowFromTime">${resume.projectDto.fromTime}</span>
		        		-----<span id="projectShowToTime">${resume.projectDto.toTime}</span><br>
		        		<label for="projectShowDescribes">项目描述：</label>
		        		<span id="projectShowDescribes">${resume.projectDto.describes}</span><br>
				</div>
		      	
		      	
		      	
		      	<div id="project" style="display: none;">
		      		<form class="form-inline" id="projectForm">
		      		 <div class="form-group">
        				<h4 style="width: 800px;"><strong>项目经验:</strong></h4>
	        			<span class="bianqian">*</span><label for="projectFromTime">起止时间：</label>
	        			<input type="date" id="projectFromTime" class="form-control" style="width:196px;"/>
	        			<span class="glyphicon glyphicon-resize-horizontal"/>
	        			<input type="date" id="projectToTime" class="form-control"  style="width:196px;"/>
        			 </div>
        			<div class="form-group">
	        			<span class="bianqian">*</span><label for="projectName">项目名称：</label>
	        			<input type="text" id="projectName" class="form-control"/>
        			</div>
        			<div class="form-group">
	        			<span class="bianqian">*</span><label for="projectDescribes">项目描述：</label>
	        			<textarea class="form-control" id="projectDescribes" style="width: 600px;height: 150px;"></textarea>
        			</div>
        			<br />
		      		<div class="form-group" style="margin-left: 300px;">
	        			<button type="submit" class="btn btn-primary">保存</button>
	        	        <button  class="btn btn-default" id="projectCancel">取消</button>
	        		</div>
		      		</form>
		      	</div>
				
				
				
				<div id="skillShow">
					<h4 style="width: 800px;"><strong>技能特点:</strong></h4>
		        		<span class="glyphicon glyphicon-edit"><a href="javascript:void(0);" id="editFifth">编辑</a></span>
		        		<label for="skillShowSkill1">技能一：</label>
		        		<span id="skillShowSkill1">${resume.skillDto.skill1}</span><br>
		        	    <label for="skillShowSkill2">技能二：</label>
		        		<span id="skillShowSkill2">${resume.skillDto.skill2}</span><br>
		        		<label for="skillShowSkill3">技能三：</label>
		        		<span id="skillShowSkill3">${resume.skillDto.skill3}</span><br>
		        		<label for="skillShowSkill4">技能四：</label>
		        		<span id="skillShowSkill4">${resume.skillDto.skill4}</span><br>
				</div>
				
				
				<div id="skill" style="display: none;">
					<form class="form-inline" id="skillForm">
		      		 <div class="form-group">
        				<h4 style="width: 800px;"><strong>技能特点:</strong></h4>
        			 </div>
        			<div class="form-group">
	        			<span class="bianqian">*</span><label for="skill1">技能一：</label>
	        			<input type="text" id="skill1" class="form-control"></input>
        			</div>
        			<div class="form-group">
	        			<span class="bianqian">*</span><label for="skill2">技能二：</label>
	        			<input type="text" id="skill2" class="form-control"></input>
        			</div>
        			<div class="form-group">
	        			<span class="bianqian">*</span><label for="skill3">技能三：</label>
	        			<input type="text" id="skill3" class="form-control"></input>
        			</div>
        			<div class="form-group">
	        			<span class="bianqian">*</span><label for="skill4">技能四：</label>
	        			<input type="text" id="skill4" class="form-control"></input>
        			</div>
        			<br />
		      		<div class="form-group" style="margin-left: 300px;">
	        			<button type="submit" class="btn btn-primary">保存</button>
	        	        <button  class="btn btn-default" id="SkillCancel">取消</button>
	        		</div>
		      		</form>
				</div>
				
				
				<div id="schoolShow">
					<h4 style="width: 800px;"><strong>在校情况:</strong></h4>
		        		<span class="glyphicon glyphicon-edit"><a href="javascript:void(0);" id="editSixth">编辑</a></span>
		        		<label for="schoolShowDuty">在校职务：</label>
		        		<span id="schoolShowDuty">${resume.campusDto.duty}</span><br>
		        	    <label for="schoolShowAward">获奖情况：</label>
		        		<span id="schoolShowAward">${resume.campusDto.award}</span><br>
		        
				</div>
				
				<div id="schoolCondiction" style="display: none;">
					<form class="form-inline" id="schoolForm">
		      		 <div class="form-group">
        				<h4 style="width: 800px;"><strong>在校情况:</strong></h4>
        			</div>
        			<div class="form-group">
	        			<span class="bianqian">*</span><label for="schoolCondictionDuty">校内职务：</label>
	        			<textarea class="form-control" id="schoolCondictionDuty" style="width: 600px;height: 150px;"></textarea>
        			</div>
        			<div class="form-group">
	        			<span class="bianqian">*</span><label for="schoolCondictionAward">获奖情况：</label>
	        			<textarea class="form-control" id="schoolCondictionAward" style="width: 600px;height: 150px;"></textarea>
        			</div>
        			<br />
		      		<div class="form-group" style="margin-left: 300px;">
	        			<button type="submit" class="btn btn-primary">保存</button>
	        	        <button  class="btn btn-default" id="schoolCancel">取消</button>
	        		</div>
		      		</form>
				</div>
				
			</div>
        </div>
        
        
        <!--上传附件简历model-->
       
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="myModalLabel">上传附件简历</h4>
		      </div>
		      <div class="modal-body">
				  <form enctype="multipart/form-data" id="modelForm" method="post">
					  <input id="input-b2" name="filename" type="file" class="file" data-show-preview="false">
				  </form>

		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		      </div>
		    </div>
		  </div>
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
       
      <%-- <script type="text/javascript">
       	  $(function() {







          })
       </script>--%>
	<script src="${contextPath}/static/js/www/resume.js"></script>
	</body>
</html>
