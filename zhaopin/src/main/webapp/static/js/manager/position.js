$(function () {
    //新增
    $(document).on('click','#addSave',function () {
        var addPName = $('#addPName').val();
        var addWorkSite = $('#addWorkSite').val();
        var addFlag = $('#addFlag').val();
        var addClassify = $('#addClassify option:selected').text();
        var addDepartment = $('#addDepartment option:selected').text();
        var addDescribe = $('#addDescribe').val();
        var addRespon = $('#addRespon').val();
        var addRequire = $('#addRequire').val();
        console.log("addPanem ="+addPName +" addFlag ="+addFlag +" addClassify ="+addClassify
            +"addDescribe "+addDescribe +"addRespon = "+addRespon +" addRequire = "+addRequire);
        $.ajax({
            type:'post',
            url:'/position/admin/add',
            data:{
                pName:addPName,
                pClassify:addClassify,
                pDescribe:addDescribe,
                pResponsibility:addRespon,
                pRequest:addRequire,
                flag:addFlag,
                pDepartment:addDepartment,
                workSite:addWorkSite
            },
            dataType:'json',
            success:function (data) {
                if (data.status == 1){
                    swal({
                        title: data.msg,
                        confirmButtonText:"确定",
                    }).then(function(result){
                        window.location.reload();
                    });
                }else{
                    swal(data.msg,"","error");
                }
            },
            error:function () {
                swal("出现错误","","error");
            }
        });
    })
    //数据回填
    var id = null;
    $(document).on('click',".updateModel",function () {
        id = $(this).parent('span').prev().text();
        $.ajax({
            type:'get',
            url:'/position//admin/getById/'+id,
            dataType:'json',
            success:function (data) {
                if (data.status== 1){
                    var position = data.data;
                    $('#updatePName').val(position.pName);
                    $('#updateWorkSite').val(position.workSite);
                    $('#updateFlag option').each(function () {
                        if ($(this).val() == position.flag.toString()){
                            $(this).attr("selected",true);
                        }
                    });
                    $('#updateClassify option').each(function () {
                        if ($(this).text() == position.pClassify){
                            $(this).attr("selected",true);
                        }
                    });
                    $('#updateDepartment option').each(function () {
                        if ($(this).text() == position.pDepartment){
                            $(this).attr("selected",true);
                        }
                    });
                    $('#updateDesc').val(position.pDescribe);
                    $('#updateRespon').val(position.pResponsibility);
                    $('#updateRequire').val(position.pRequest);
                    $('#update').modal('show');
                }else {
                    swal(data.msg,"","error");
                }
            },
            error:function () {
                swal("出现错误","","error");
            }
        })
    })
    //更新
    $(document).on("click",'#updateSave',function () {
        var updatePName = $('#updatePName').val();
        var updateWorkSite = $('#updateWorkSite').val();
        var updateFlag = $('#updateFlag').val();
        var updateClassify = $('#updateClassify option:selected').text();
        var updateDepartment = $('#updateDepartment option:selected').text();
        var updateDescribe = $('#updateDesc').val();
        var updateRespon = $('#updateRespon').val();
        var updateRequire = $('#updateRequire').val();
        $.ajax({
            type:'post',
            url:'/position/admin/update',
            data:{
                id:id,
                pName:updatePName,
                pClassify:updateClassify,
                pDescribe:updateDescribe,
                pResponsibility:updateRespon,
                pRequest:updateRequire,
                flag:updateFlag,
                pDepartment:updateDepartment,
                workSite:updateWorkSite
            },
            dataType:'json',
            success:function (data) {
                if (data.status == 1){
                    swal({
                        title: data.msg,
                        confirmButtonText:"确定",
                    }).then(function(result){
                        window.location.reload();
                    });
                }else{
                    swal(data.msg,"","error");
                }
            },
            error:function () {
                swal("出现错误","","error");
            }
        });
    })
    //职位搜索，根据职位名称搜索
   $(document).on('click','.positionQuery',function () {
       var  pName = $('#exampleInputName2').val();
       // if (pName == ''){
       //     swal({
       //         title: '不能输入为空',
       //         confirmButtonText:"确定",
       //     }).then(function(result){
       //         return;
       //     })
       // }
       $.ajax({
           type:'get',
           url:'/position/manager/findByPage',
           data:{
               condition:pName
           },
           dataType:'json',
           success:function (data) {
               if (data.status == 1){
                   var str = "";
                   var position = data.data;
                   for(var i = 0;i<position.list.length;i++){
                       console.log(position.list[i]);
                       var type = "";
                       if(position.list[i].flag == 1){
                           type = "社会招聘";
                       }else{
                           type = "校园招聘";
                       }
                       str += "<li>\n" +
                           "<span>"+(1+i)+"</span>\n" +
                           "<span>"+position.list[i].pClassify+"</span>\n" +
                           "<span>"+position.list[i].pDepartment+"</span>\n"+
                           "<span>"+position.list[i].pName+"</span>\n" +
                           "<span>"+type+"</span>\n" +
                           "<span style='display: none;'>"+position.list[i].id+"</span>"+
                           "<span>\n"+
                           " <button href=\"#\" class=\"btn btn-primary updateModel\">详情修改</button>\n" +
                           "<a href=\"javaScript:void(0);\" class=\"btn btn-danger deleteBtn\">删除</a>\n" +
                           " </span>\n" +
                           "</li>";
                   }
                   var trNode = $('#ulContainer');
                   trNode.html(str);
                   //刷新页码
                   str = '';
                   str += "<span id=\"totalPage\" style=\"display: none\">"+position.pages+"</span>\n" +
                       "<ul class=\"pagination\" id=\"pagination-demo\"></ul>"
                   $('#page').html(str);
                   var script = document.createElement("script");

                   script.src = "../../static/js/manager/positionPage.js";
                   document.body.appendChild(script);
               }else{
                   swal(data.msg,"","error");
               }
           },
           error:function () {
               swal('出现错误',"","error");
           }
       });
   })
    //删除
   $(document).on('click','.deleteBtn',function () {
       var id = $(this).parent('span').prev().text();
       swal({
           title: '确定删除此职位么?',
           type: 'info',
           showCancelButton: true,
           confirmButtonText: '确定!',
           cancelButtonText: '取消'
       }).then(function(result) {
           if (result.value) {
               $.ajax({
                   type:'delete',
                   url:'/position/admin/delete/'+id,
                   dataType:'json',
                   success:function (data) {
                       if (data.status == 1){
                           swal({
                               title: data.msg,
                               confirmButtonText:"确定",
                           }).then(function(result){
                               window.location.reload();
                           });
                       }
                       else{
                           swal(data.msg,"","error");
                       }
                   },
                   error:function () {
                       swal("出现错误");
                   }
               })
           }
       })

   })

})