<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<c:set var="contextPath" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>个人简历</title>
		<link rel="stylesheet" href="${contextPath}/static/css/manager/resume.css">
		<link rel="stylesheet" href="${contextPath}/static/css/bootstrap.css">
        <link rel="stylesheet" href="${contextPath}/static/css/font-awesome.min.css">
	</head>
	<body>
		<div class="page-header">
		  <h1>个人简历</h1>
		</div>
		<div id="container">
			<p class="info"><span>个人信息:</span></p>
			<div id="personInfo">
				<label for="name">姓&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;名：</label><span>${resume.informationDto.name}</span>
				<label  for="sex" class="title">性&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;别：</label><span>${resume.informationDto.sex}</span><br />
				<label for="email">邮&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;箱：</label><span>${resume.informationDto.email}</span>
				<label for="face" class="face">政治面貌：</label><span>${resume.informationDto.poliStatus}</span><br />
				<label for="phone">联系方式：</label><span>${resume.informationDto.phone}</span>
			
				<label for="intension" class="intension">求职意向：</label><span>${resume.informationDto.jobIntension}</span><br />
				<label for="descs" >个人描述：</label><p>${resume.informationDto.describes}</p>
			</div>
			<p class="info"><span>教育经历:</span></p>
			<div id="eduInfo">
				<label for="school">学&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;校：</label><span>${resume.educationDto.school}</span><br>
				<label for="time">起止时间：</label><span>${resume.educationDto.fromTime}</span>----<span>${resume.educationDto.toTime}</span><br>
				<label for="xueli">学&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;历：</label><span>${resume.educationDto.level}</span></label>
			</div>
			<p class="info"><span>工作经历:</span></p>
			<div id="workInfo">
				<label for="company">公司名称：</label><span>${resume.workDto.company}</span><br>
				<label for="duty">职&nbsp;&nbsp;&nbsp;&nbsp;务：</label><span>${resume.workDto.duty}</span><br>
				<label for="time">起止时间：</label><span>${resume.workDto.fromTime}</span>----<span>${resume.workDto.toTime}</span><br>
				<label for="responsitity">主要职责：</label><span>${resume.workDto.responsibility}</span></label>
			</div>
			<p class="info"><span>项目经验:</span></p>
			<div id="projectInfo">
				<label for="project">项目名称：</label><span>${resume.projectDto.projectName}</span><br>
				<label for="time">起止时间：</label><span>${resume.projectDto.fromTime}</span>----<span>${resume.projectDto.toTime}</span><br>
				<label for="responsitity">描&nbsp;&nbsp;&nbsp;&nbsp;述：</label><span>${resume.projectDto.describes}</span></label>
			</div>
			<p class="info"><span>技能特点:</span></p>
			<div id="skillInfo">
				<label for="skill">技能一：</label><span>${resume.skillDto.skill1}</span><br>
				<label for="skil2">技能二：</label><span>${resume.skillDto.skill2}</span><br>
				<label for="skil3">技能三：</label><span>${resume.skillDto.skill3}</span><br>
				<label for="skil4">技能四：</label><span>${resume.skillDto.skill4}</span><br>
			</div>
			<p class="info"><span>在校情况:</span></p>
			<div id="schoolInfo">
				<label for="school">在校职务：</label><p>${resume.campusDto.duty}</p><br>
				<label for="award">获奖情况：</label><p>${resume.campusDto.award}</p><br>
			</div>
			<div id="image">
				<img src="${resume.informationDto.photo}" width="150" height="150">
			<div>
		</div>
	</body>
</html>
