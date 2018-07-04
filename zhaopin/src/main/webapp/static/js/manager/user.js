$(function () {
    //新增
    $(document).on('click','#addSave',function () {
        var username = $('#username').val();
        var password = $('#password').val();
        var answer1 = $('#question1').val();
        var answer2 = $('#question2').val();
        var roleId = $('#roleSelect').val();
        $.ajax({
            type:'post',
            url:'/user//admin/add',
            data:{
                username:username,
                password:password,
                answer1:answer1,
                answer2:answer2,
                roleId:roleId
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
    //查询
     $(document).on('click','.btnQuery',function () {
         var name = $('#exampleInputName2').val();
         $.ajax({
             type:'post',
             url:'/user/admin/query',
             data:{
                 name:name
             },
             dataType:'json',
             success:function(data){
                 if (data.status == 1){
                     var str = "";
                     var user = data.data;
                     for(var i = 0;i<user.list.length;i++){
                         console.log(user.list[i]);
                         var select = "";
                         if(user.list[i].roleId == 1){
                             select = "<select name=\"role\">\n" +
                                 "  <option value=\"1\" selected='selected'>普通用户</option>\n" +
                                 " <option value=\"2\">管理员</option>\n" +
                                 " </select>\n";
                         }else{
                             select = "<select name=\"role\">\n" +
                                 "  <option value=\"1\" >普通用户</option>\n" +
                                 " <option value=\"2\" selected='selected'>管理员</option>\n" +
                                 " </select>\n";
                         }
                         str += "<li>\n" +
                             " <span>"+user.list[i].username+"</span>\n" +
                             "  <span>"+user.list[i].answer1+"</span>\n" +
                             " <span>"+user.list[i].answer2+"</span>\n" +
                             "  <span>\n" +
                             select+
                             " </span>\n" +
                             "  <span><a href=\"#\" class=\"btn btn-danger deleteBtn\">删除</a></span>\n" +
                             "<span style='display: none'>"+user.list[i].id+"</span>"+
                             "  </li> ";
                     }
                     var trNode = $('#ulContainer');
                     trNode.html(str);
                     str = '';
                     str += "<span id=\"totalPage\" style=\"display: none\">"+user.pages+"</span>\n" +
                         "<ul class=\"pagination\" id=\"pagination-demo\"></ul>"
                     $('#page').html(str);
                              var script = document.createElement("script");
                               script.src = "../../static/js/manager/userPage.js";
                               document.body.appendChild(script);
                 }else{
                     swal(data.msg,"","error");
                 }
             },
             error:function(){
                 swal("出现错误","","error");
             }
         });
     })

    var select = $('select[name=role]').val();
    //修改
    $(document).on('change','select[name=role]',function () {
        var roleId = $(this).val();
        var name = $(this).parent('span').siblings().eq(0).text();
        swal({
            title: '确定修改此用户的角色么?',
            type: 'info',
            showCancelButton: true,
            confirmButtonText: '确定!',
            cancelButtonText: '取消'
        }).then(function(result)  {
            if (result.value) {
                $.ajax({
                    type:'post',
                    url:'/user/admin/changeRole',
                    data:{
                        name:name,
                        roleId:roleId
                    },
                    dataType:'json',
                    success:function (data) {
                        if (data.status == 1){
                            swal(data.msg);
                        }else{
                            swal(data.msg,"","error");
                            $('select[name=role] option').each(function () {
                                if ($(this).val() == select){
                                    $(this).attr('selected',true);
                                }
                            })
                        }
                    },
                    error:function () {
                        swal("出现错误");
                    }
                })
                // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            }else{
                window.location.reload();
            }
        });
    })

    //删除
    $(document).on('click','.deleteBtn',function () {
        var id = $(this).parent('span').next().text();
        swal({
            title: '确定删除此用户么?',
            type: 'info',
            showCancelButton: true,
            confirmButtonText: '确定!',
            cancelButtonText: '取消'
        }).then(function(result){
            if (result.value) {
                $.ajax({
                    type:'delete',
                    url:'/user/admin/delete/'+id,
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
                        swal("出现错误");
                    }
                })
            }
        });
    });
})