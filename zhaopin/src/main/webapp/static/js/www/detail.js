$(function () {

    //在线简历
   $('#lineBtn').click(function () {
       var pId = $("#pId").text();
      // var pName = $('#pName').text();
       console.log(pId);
       $.ajax({
           type:'post',
           url:'/position/apply',
           data:{
               pId:pId,
               resumeId:1
              // pName:pName
           },
           dataType:'json',
           success:function (data) {
             if (data.status == 1){
                 swal("申请成功","success");
             }else {
                 swal(data.msg,"error");
             }
           },
           error:function () {
               swal("出现异常，申请失败","error");
           }
       });
   });

   //投递附件简历
    $('#fileBtn').click(function () {
        var pId = $("#pId").text();
       // var pName = $('#pName').text();
        console.log(pId);
        $.ajax({
            type:'post',
            url:'/position/apply',
            data:{
                pId:pId,
                resumeId:2
              //  pName:pName
            },
            dataType:'json',
            success:function (data) {
                if (data.status == 1){
                    swal("申请成功","success");
                }else {
                    swal(data.msg,"error");
                }
            },
            error:function () {
                swal("出现异常，申请失败","error");
            }
        });
    });

    //收藏职位
    $('#collectBtn').click(function () {
        var pId = $("#pId").text();
        console.log(pId);
        $.ajax({
            type:'post',
            url:'/position/collect',
            data:{
                pId:pId
            },
            dataType:'json',
            success:function (data) {
                if (data.status == 1){
                    swal("收藏成功","success");
                }else {
                    swal(data.msg,"error");
                }
            },
            error:function () {
                swal("出现异常，申请失败","error");
            }
        });
    });

    $('li.positionList').click(function(){
        var p = $(this).children().eq(1).text();
        var name = $(this).children().eq(2).text();
        if (p == 1){
            location.href="/position/getDetail?pName="+name;
        }
        if (p == 2){
            location.href="/school/getDetail?pName="+name;
        }

    })


})