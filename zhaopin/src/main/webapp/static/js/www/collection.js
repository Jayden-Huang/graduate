$(function () {

    //取消收藏
    $(document).on('click','li.positionList > span>a',function () {
        var id = $(this).parent("span").siblings().eq(0).text();
        console.log("id:"+id);
        $.ajax({
            type:'delete',
            url:'/collection/delete?id='+id,
            success:function (data) {
                if (data.status == 1){
                    swal(data.msg);
                    location.reload(true);
                }else {
                    swal(data.msg);
                }
            },
            error:function () {
                swal("删除错误","","error");
            }

        });
    })


  /*  $('li.positionList > span>a').click(function () {
        var id = $(this).parent("span").siblings().eq(0).text();
        console.log("id:"+id);
        $.ajax({
            type:'delete',
            url:'/collection/delete?id='+id,
            success:function (data) {
                if (data.status == 1){
                    swal(data.msg);
                    location.reload(true);
                }else {
                    swal(data.msg);
                }
            },
            error:function () {
                swal("删除错误","","error");
            }

        });
    })*/

    $(document).on('click',"li.positionList>span.PName",function(){
        var a = $(this).text();
        var flag = $(this).prev().text();
        console.log("flag:"+flag + " "+flag.constructor);
        if (flag == 1){
            location.href="/position/getDetail?pName="+a;
        }else {
            location.href="/school/getDetail?pName="+a;
        }
    })
    /*$('li.positionList>span.PName').click(function(){
        var a = $(this).text();
        var flag = $(this).prev().text();
        console.log("flag:"+flag + " "+flag.constructor);
        if (flag == 1){
            location.href="/position/getDetail?pName="+a;
        }else {
            location.href="/school/getDetail?pName="+a;
        }

    });*/


})