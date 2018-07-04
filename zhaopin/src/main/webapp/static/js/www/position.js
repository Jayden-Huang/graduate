$(function () {
    //条件查询
    function query() {
        var condition = $('#tags_tagsinput>span>span').text();
        var keyWord =$('#searchBtn').parent('span').prev().val();
        console.log("查询条件:"+condition.toString()+"keyWord"+keyWord);
        $.ajax({
            type:'get',
            url:'/position/findByCondiction',
            data:{
                condition:condition,
                keyWord:keyWord
            },
            dataType:'json',
            success:function(data){
                var liStr = "";
                if(data.status == 1){
                    var positions = data.data;
                    for(var i=0;i<positions.list.length;i++){
                        console.log(positions.list[i]);
                        liStr += "<li  class='positionList'>\n" +
                            "<span style=\"display:none;\">"+positions.list[i].id+"</span>\n" +
                            "<span  class=\"pName\">"+positions.list[i].pName+"</span>\n" +
                            "<span>"+positions.list[i].workSite+"</span>\n"+
                            "<span>"+positions.list[i].pClassify+"</span>\n"+
                            "<span>"+positions.list[i].pDepartment+"</span>\n"+
                            "<p style=\"width: 800px;height:31px;overflow: hidden\">"+positions.list[i].pRequest+"</p>\n" +
                            "</li>";
                    }
                    $('#ulPosition').html(liStr);
                    //刷新页码
                    liStr = '';
                    liStr += "<span id=\"totalPage\" style=\"display: none\">"+positions.pages+"</span>\n" +
                        "\t\t\t<ul class=\"pagination\" id=\"pagination-demo\"></ul>";
                    $('#page').html(liStr);
                    var script = document.createElement("script");
                    script.src = "../../static/js/www/positionPage.js";
                    document.body.appendChild(script);
                }else {
                    console.data(data.msg);
                }
            },
            error:function(){
                swal("查询失败");
            }
        });
    }

    $('#tags').tagsInput({
        'height':'auto', //设置高度
        'width':'auto',  //设置宽度
        'interactive':'false', //是否允许添加标签，false为阻止
        'defaultText':'', //默认文字
        'onAddTag':query, //增加标签的回调函数
        'onRemoveTag':query, //删除标签的回调函数
        //'onChange' : a, //改变一个标签时的回调函数
        'removeWithBackspace' : true, //是否允许使用退格键删除前面的标签，false为阻止
        'minChars' : 0, //每个标签的小最字符
        'maxChars' : 0, //每个标签的最大字符，如果不设置或者为0，就是无限大
        'placeholderColor' : '#666666' //设置defaultText的颜色
    });
    $('ul.work>li>a').click(function(){
        var text1 = $(this).text();
        console.log(text1);
        $('#tags').addTag(text1);
    });

    $("#searchBtn").click(function(){
        query();
    });
})