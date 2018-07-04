$(function () {
    //新增
    $(document).on('click',"#addSave",function () {
        //获取表单的所有值
        var qName = $('#inputQuestion').val();
        var qChoose = $('#inputChoose').val();
        var qAnswer = $('#inputAnswer').val();
        var qClassify = $('#classifySelect option:selected').text();
        console.log("---"+qName + " "+qChoose+" "+qAnswer+" "+qClassify);
        $.ajax({
            type:'post',
            url:"/question/add",
            data:{
                qName:qName,
                qChose:qChoose,
                qAnswer:qAnswer,
                qClassify:qClassify
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


    //更新数据回填
    var id = null;
    $(document).on('click',".updateModel",function () {
        id = $(this).parent('span').prev().text();
        console.log("id---"+id);
        $.ajax({
            type:'get',
            url:'/question/getById/'+id,
            dataType:'json',
            success:function (data) {
                if (data.status == 1){
                    //数据回填
                    var question = data.data;
                    $('#question').val(question.qName);
                    $('#choosd').val(question.qChose);
                    $('#answer').val(question.qAnswer);
                    $('#updateSelect option').each(function () {
                        if ($(this).text() == question.qClassify){
                            $(this).attr("selected",true);
                        }
                    });
                    $('#update').modal('show');
                }
                else {
                    swal(data.msg,"","error");
                }
            },
            error:function () {
                swal("出现错误","","error");
            }
        })
    })

    //更新
    $(document).on("click","#updateSave",function () {
        var qName = $('#question').val();
        var qChoose = $('#choosd').val();
        var qAnswer =  $('#answer').val();
        var qClassify = $('#updateSelect option:selected').text();
        $.ajax({
            type:'post',
            url:'/question/update',
            data:{
                id:id,
                qName:qName,
                qChose:qChoose,
                qAnswer:qAnswer,
                qClassify:qClassify
            },
            dataType:'json',
            success:function (data) {
                if (data.status == 1){
                    swal({
                        title: data.msg,
                        confirmButtonText:"确定",
                    }).then(function(result){
                        window.location.reload();
                    })
                }else {
                    swal(data.msg,"","error");
                }
            },
            error:function () {
                swal("出现错误");
            }
        })
    })

    //分类查询
    $(document).on('click',"#questionQuery",function () {
        var type = $('#exampleInputName2').val();
        // if (type == ''){
        //     swal({
        //         title: '不能输入为空',
        //         confirmButtonText:"确定",
        //     }).then(function(result){
        //         return;
        //     })
        // }
        $.ajax({
            type:'post',
            url:'/question/findByType',
            data:{
                type:type
            },
            dataType:'json',
            success:function (data) {
                var str = "";
                var question = data.data;
                for(var i = 0;i<question.list.length;i++){
                    console.log(question.list[i]);
                    str += " <li>\n" +
                        " <span>"+(1+i)+"</span>\n" +
                        " <span>"+question.list[i].qClassify+"</span>\n" +
                        " <span>"+question.list[i].qName+"</span>\n" +
                        " <span>"+question.list[i].qAnswer+"</span>\n" +
                        " <span>"+question.list[i].qChose+"</span>\n" +
                        " <span style=\"display: none;\">"+question.list[i].id+"</span>\n" +
                        "  <span>\n" +
                        "\t <button class=\"btn btn-default updateModel\" >修改</button>\n" +
                        "\n" +
                        "\t <a href=\"javaScript:void(0)\" class=\"btn btn-danger deleteBtn\">删除</a>\n" +
                        "\t </span>\n" +
                        "  </li>";
                }
                var trNode = $('#ulContainer');
                trNode.html(str);
                //刷新页码
                str = '';
                str += "<span id=\"totalPage\" style=\"display: none\">"+question.pages+"</span>\n" +
                    "<ul class=\"pagination\" id=\"pagination-demo\"></ul>"
                $('#page').html(str);
                var script = document.createElement("script");
                script.src = "../../static/js/manager/questionPage.js";
                document.body.appendChild(script);
            },
            error:function () {
                swal('出现错误',"","error");
            }
        })
    })

    //删除
    $(document).on('click',".deleteBtn",function () {
        var id = $(this).parent('span').prev().text();

        swal({
            title: '确定删除此问题么?',
            type: 'info',
            showCancelButton: true,
            confirmButtonText: '确定!',
            cancelButtonText: '取消'
        }).then(function(result) {
            if (result.value) {
                $.ajax({
                    type:'delete',
                    url:'/question/deleteById/'+id,
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