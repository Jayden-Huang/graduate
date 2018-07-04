<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<c:set var="contextPath" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <meta name="description" content="网站描述">
        <meta name="robots" content="noindex, nofollow">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<link rel="stylesheet" href="${contextPath}/static/css/bootstrap.css">
        <link rel="stylesheet" href="${contextPath}/static/css/font-awesome.min.css">
        <link rel="stylesheet" href="${contextPath}/static/css/manager/main.css">
        <link rel="stylesheet" href="${contextPath}/static/css/manager/position.css" />
		<script src="${contextPath}/static/js/manager/vendor/jquery-2.2.4.min.js"></script>
		<script src="${contextPath}/static/js/manager/vendor/bootstrap.min.js"></script>
		<script src="${contextPath}/static/js/manager/plugins.js"></script>
		<script src="${contextPath}/static/js/manager/tool.js"></script>
		<script type="text/javascript" src="${contextPath}/static/js/sweerAlert2.79.js"></script>
		<script type="text/javascript" src="${contextPath}/static/js/jquery.twbsPagination.min.js"></script>
    </head>
    <body>
        <div id="page-wrapper" class="page-loading">
            <div class="preloader">
                <div class="inner">
                    <div class="preloader-spinner themed-background hidden-lt-ie10"></div>
                    <h3 class="text-primary visible-lt-ie10"><strong>Loading..</strong></h3>
                </div>
            </div>
            <div id="page-container" class="header-fixed-top sidebar-visible-lg-full">
                <div id="sidebar">
                    <div id="sidebar-brand" class="themed-background">
                        <a href="#" class="sidebar-title">
                            <i class="icon-cog"></i> 
                            <span class="sidebar-nav-mini-hide">后台管理系统</span>
                        </a>
                    </div>
                    <div id="sidebar-scroll">
                        <div class="sidebar-content">
							<ul class="sidebar-nav">
								<li>
									<a href="/admin/"><i class="icon-home sidebar-nav-icon"></i><span class="sidebar-nav-mini-hide">首页</span></a>
								</li>
								<li>
									<a href="/admin//resume" ><i class="icon-chevron-right sidebar-nav-indicator sidebar-nav-mini-hide"></i><i class="icon-gift sidebar-nav-icon"></i><span class="sidebar-nav-mini-hide">简历管理</span></a>

								</li>
								<li>
									<a href="/admin//question"><i class="icon-chevron-right sidebar-nav-indicator sidebar-nav-mini-hide"></i><i class="icon-gift sidebar-nav-icon"></i><span class="sidebar-nav-mini-hide">问答管理</span></a>

								</li>
								<li>
									<a href="/admin//position"><i class="icon-chevron-right sidebar-nav-indicator sidebar-nav-mini-hide"></i><i class="icon-gift sidebar-nav-icon"></i><span class="sidebar-nav-mini-hide">职位管理</span></a>

								</li>
								<li>
									<a href="/admin/user" ><i class="icon-chevron-right sidebar-nav-indicator sidebar-nav-mini-hide"></i><i class="icon-gift sidebar-nav-icon"></i><span class="sidebar-nav-mini-hide">用户管理</span></a>
								</li>
							</ul>
                            <!-- END Sidebar Navigation -->
                        </div>
                    </div>
                </div>
                <div id="main-container">
                    <header class="navbar navbar-inverse navbar-fixed-top">
                        <ul class="nav navbar-nav-custom">
                            <li>
                                <a href="javascript:void(0)" onclick="Tool.sidebar('toggle-sidebar');this.blur();">
                                    <i class="icon-reorder animation-fadeInRight" id="sidebar-toggle-mini"></i>
                                    <i class="icon-reorder animation-fadeInRight" id="sidebar-toggle-full"></i>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav navbar-nav-custom pull-right">
                            <li class="dropdown">
                                <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
                                    <img src="${contextPath}/static/img/1.jpg" alt="avatar">
									<span>管理员-${sessionScope.username}</span>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-right">
									<li>
										<a href="/index1">
											<i class="icon-step-backward fa-fw pull-right"></i>
											返回前台首页
										</a>
									</li>
                                    <li>
                                        <a href="/logout">
                                            <i class="icon-off fa-fw pull-right"></i>
                                            退出
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </header>
                    <div id="page-content">
						<div>
							<button  class="btn btn-primary"  data-toggle="modal" data-target="#add"style="float: left;margin-right: 5px;">新增</button>

							<form class="form-inline" style="float: left;">

								<div class="form-group">
									<input type="text" class="form-control" id="exampleInputName2" placeholder="输入相应的职位的名称">
								</div>

								<a  href="javaScript:void(0);" class="btn btn-primary positionQuery">查询</a>
							</form>
						</div>

						<div id="table">
							<ul>
								<li>ID</li>
								<li>分类</li>
								<li>部门</li>
								<li>职位</li>
								<li style="width: 213px;">类型</li>
								<li style="width: 193px;">操作</li>
							</ul>
							<ul id="ulContainer">

							</ul>

						</div>
                        
                        
                      <div id="page" style="float: right;margin-right: 145px;position: relative;top: -15px;">
						  <span id="totalPage" style="display: none">${position.pages}</span>
						  <ul class="pagination" id="pagination-demo"></ul>
			        </div>
                        
                        
                    </div>
          
                </div>
            </div>
        </div>
        
        

        <!-- 新增 -->
		<div class="modal fade" id="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="myModalAdd">新增职位</h4>
		      </div>
		      <div class="modal-body">
		        <form>
					  <div class="form-group">
					    <label for="question">职位名称：</label>
					    <input type="text" class="form-control" id="addPName" placeholder="输入职位名称">
					  </div>
					<div class="form-group">
						<label for="text">工作地点:</label>
						<input type="text" class="form-control" id="addWorkSite" placeholder="输入工作地点"></input>
					</div>
					  <div class="form-group">
					    <label for="text">分类：</label>
					    <select class="form-group" id="addFlag">
					    	<option value="2">校园招聘</option>
					    	<option value="1">社会招聘</option>
					    </select>
					  </div>
					  <div class="form-group">
					    <label for="exampleInputFile">类型：</label>
					    <select class="form-group" id="addClassify">
					    	<option>技术</option>
					    	<option>销售</option>
					        <option>管理</option>
					    </select>
					  </div>
					<div class="form-group">
						<label for="exampleInputFile">部门：</label>
						<select class="form-group" id="addDepartment">
							<option>技术部</option>
							<option>销售部</option>
							<option>人力部</option>
						</select>
					</div>

					<div class="form-group">
					    <label for="text">岗位类型描述：</label>
				        <input type="text" class="form-control" id="addDescribe" placeholder="输入相应的描述"></input>
					</div>
					 <div class="form-group">
					    <label for="text">岗位职责：</label>
					    <textarea class="form-control" id="addRespon" placeholder="输入职责,每一句以<br>结尾"></textarea>
					  </div>
					  <div class="form-group">
					    <label for="text">岗位要求：</label>
					    <textarea  class="form-control" id="addRequire" placeholder="输入要求，每一句以<br>结尾"></textarea>
					  </div>
				</form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		        <button type="button" id="addSave" class="btn btn-primary">保存</button>
		      </div>
		    </div>
		  </div>
		</div>
		
			
		
		<!--岗位更新-->
			
		 <div class="modal fade" id="update" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="myModalLabel">职位详情</h4>
		      </div>
		      <div class="modal-body">
		        <form>
					  <div class="form-group">
					    <label for="question">职位名称：</label>
					    <input type="text" class="form-control" id="updatePName">
					  </div>
					<div class="form-group">
						<label for="text">工作地点:</label>
						<input type="text" class="form-control" id="updateWorkSite" ></input>
					</div>
					  <div class="form-group">
					    <label for="text">分类：</label>
					    <select class="form-group" id="updateFlag">
					    	<option value="2">校园招聘</option>
					    	<option value="1">社会招聘</option>
					    </select>
					  </div>
					  <div class="form-group">
					    <label for="exampleInputFile">类型：</label>
					    <select class="form-group" id="updateClassify">
					    	<option>技术</option>
					    	<option>销售</option>
					        <option>管理</option>
					    </select>
					  </div>
					<div class="form-group">
						<label for="exampleInputFile">部门：</label>
						<select class="form-group" id="updateDepartment">
							<option>技术部</option>
							<option>销售部</option>
							<option>人力部</option>
						</select>
					</div>
					   <div class="form-group">
					    <label for="text">岗位类型描述：</label>
				        <input type="text" class="form-control" id="updateDesc" ></input>
					  </div>
					 <div class="form-group">
					    <label for="text">岗位职责：</label>
					    <textarea class="form-control" id="updateRespon" placeholder="输入职责,每一句以<br>结尾">
						</textarea>
					  </div>
					  <div class="form-group">
					    <label for="text">岗位要求：</label>
					    <textarea  class="form-control" id="updateRequire" placeholder="输入要求,每一句以<br>结尾"></textarea>
					  </div>
				</form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		        <button type="button" class="btn btn-primary" id="updateSave">保存</button>
		      </div>
		    </div>
		  </div>
		</div>
		<script src="${contextPath}/static/js/manager/position.js"></script>
		<script src="${contextPath}/static/js/manager/positionPage.js"></script>
       

    </body>
</html>
