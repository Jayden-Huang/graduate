$(function () {
     //查看在线简历或是附件简历，根据用户的投递情况选择
    $(document).on('click',"a.look",function () {
        //获取用户名
        var userId = $(this).parents('span').siblings().eq(5).text();
        var pName = $(this).parents('span').siblings().eq(2).text();
        $(this).parents('span').siblings().eq(7).css('display','none');
        console.log("userId----"+userId);
        $.ajax({
            type:'get',
            url:'/resume/manager/look',
            data:{
                userId:userId,
                pName:pName
            },
            dataType:'json',
            success:function (data) {
                if (data.status == 1){
                    if (data.data == 1){ //在线简历
                        var href = "/resume/manager/show?userId="+userId;
                        window.open(href,'_blank');
                    }else { //附件简历
                        var href = '../../../../static/upload/'+data.data;
                        window.open(href,'_blank');
                    }

                }
                else{
                    swal("不存在相应的简历","","error");
                }
            } ,
            error:function () {
                swal("出现错误","","error");
            }

        })
    })

    
    //查找简历
    $(document).on('click','#queryResume',function () {
        var position = $('#exampleInputName2').val();
        console.log("查询条件-----"+position);
        // if (position == null || position == ''){
        //     swal("请输入相应的内容","","error");
        //     return;
        // }
        $.ajax({
            type:'post',
            url:'/resume/manager/queryResume',
            data:{
                position:position
            },
            dataType:'json',
            success:function (data) {
                if(data.status == 1){
                    var str = "";
                    var resume = data.data;
                    for(var i = 0;i<resume.list.length;i++){
                        console.log(resume.list[i]);
                        str += "<li>\n" +
                            " \t<span>"+resume.list[i].informationDto.name+"</span>\n" +
                            " <span>"+resume.list[i].educationDto.level+"</span>\n" +
                            " <span>"+resume.list[i].positionName+"</span>\n" +
                            " <span>"+resume.list[i].informationDto.describes+"</span>\n" +
                            " <span>"+resume.list[i].gradeDto.score+'('+resume.list[i].gradeDto.classify+')'+"</span>\n" +
                            " <span style=\"display: none\">"+resume.list[i].informationDto.userId+"</span>\n" +
                            " <span style=\"display: none\">"+resume.list[i].id+"</span>\n" +
                            " \n" +
                            " <span><a href='javascript:void(0);'  class=\"btn btn-default look\">查看</a>\n" +
                            " <a href=\"javaScript:void(0);\" class=\"btn btn-danger delete\">删除</a></span>\n";
                        if (resume.list[i].r == 0){
                            str += "<span class=\"label label-info labelInfo\">new</span></li>";
                        }else{
                            str += "</li>"
                        }
                    }

                    var trNode = $('#ulContainer');
                    trNode.html(str);
                    str = '';
                    str += "<span id=\"totalPage\" style=\"display: none\">"+resume.pages+"</span>\n" +
                        "<ul class=\"pagination\" id=\"pagination-demo\"></ul>"
                    $('#page').html(str);
                    var script = document.createElement("script");
                    script.src = "../../static/js/manager/jianliPage.js";
                    document.body.appendChild(script);
                }
                else {
                    swal(data.msg);
                }
            },
            error:function () {
                swal("出现错误","","error");
            }
        });
    })

    $(document).on('click','a.delete',function(){
        var id = $(this).parent('span').prev().text();
        swal({
            title: '确定删除此简历么?',
            type: 'info',
            showCancelButton: true,
            confirmButtonText: '确定!',
            cancelButtonText: '取消'
        }).then(function(result) {
            if (result.value) {
                $.ajax({
                    type:'delete',
                    url:'/resume/manager/delete/'+id,
                    dataType:'json',
                    success:function(data){
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
                    error:function(){}

                })

            }
        })

    })

})