$(function(){

    $('li.positionList').click(function(){
        var a = $(this).children().eq(1).text();
        location.href="/position/getDetail?pName="+a;
    });

    var totalPage = $('span#totalPage').text();
    var a = parseInt(totalPage);
    if (a>0){
        $('#pagination-demo').twbsPagination({
            totalPages: a,
            visiblePages: 3,
            first:null,
            prev:"<<",
            next:'>>',
            last:'最后一页',
            onPageClick: function (event, page) {
                event.preventDefault();
                $('#page-content').text('Page ' + page);
                var condition = $('#tags_tagsinput>span>span').text();
                //解析url参数
                var url = location.search;
                console.log("url----"+url);
                var keyWord = parseUrl(url);
                if (typeof(keyWord) == 'undefined'){
                    keyWord = $('#searchBtn').parent('span').prev().val().trim();
                }
                if ( $('#keyWord').val()!=null ||  $('#keyWord').val() !=''){
                    $('#keyWord').val(keyWord); //首页查询时给关键字收缩设置

                }else {
                    keyWord =  $('#keyWord').val();
                }
                console.log("分页：keyword----"+keyWord);
                $.ajax({
                    type:'get',
                    url:'/position/findByCondiction',
                    data:{
                        condition:condition,
                        keyWord:keyWord,
                        pageIndex:page
                    },
                    dataType:'json',
                    success:function(data){
                        var liStr = "";
                        if(data.status == 1){
                            var positions = data.data;
                            for(var i=0;i<positions.list.length;i++){
                                console.log(positions.list[i]);
                                liStr += "<li class='positionList'>\n" +
                                    "<span style=\"display:none;\">"+positions.list[i].id+"</span>\n" +
                                    "<span  class=\"pName\">"+positions.list[i].pName+"</span>\n" +
                                    "<span>"+positions.list[i].workSite+"</span>\n"+
                                    "<span>"+positions.list[i].pClassify+"</span>\n"+
                                    "<span>"+positions.list[i].pDepartment+"</span>\n"+
                                    "<p style=\"width: 800px;height:31px;overflow: hidden\">"+positions.list[i].pRequest+"</p>\n" +
                                    "</li>";
                            }
                            $('#ulPosition').html(liStr);
                            var script = document.createElement("script");
                            script.src = "../../static/js/www/positionPage.js";
                            document.body.appendChild(script);
                        }else {
                            swal(data.msg);
                        }
                    },
                    error:function(){
                        swal("查询失败");
                    }
                });
            }
        });
    }



    //解析URL,获取keyWord
    function parseUrl(url) {
        if (url.indexOf("keyWord")>0){
            var arr = url.split("&");
            for (var  i = 0;i<arr.length;i++){
                console.log(arr[i].indexOf("keyWord"));
                if (arr[i].indexOf("keyWord") ==0 ){
                    var index = url.lastIndexOf("=");
                    console.log("---"+url.substr(index));
                    return url.substr(index+1);
                }
            }
        }
    }
})
