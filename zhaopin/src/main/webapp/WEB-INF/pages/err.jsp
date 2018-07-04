<%--
  Created by IntelliJ IDEA.
  User: jia
  Date: 2017/11/22
  Time: 22:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="contextPath" value="<%=request.getContextPath()%>"></c:set>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="${contextPath}/static/css/bootstrap.css">
</head>
<body>
    <div style="margin:80px 250px">
        <a href="/login1" class="btn btn-primary">请登录</a>
    </div>
</body>
</html>
