$(function () {
    var totalPage = $('span#totalPage').text();
    var a = parseInt(totalPage);
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
            $.ajax({
                type:'get',
                url:'/collection/findByPage',
                data:{
                    pageIndex:page
                },
                dataType:'json',
                success:function(data){
                    var liStr = "";
                    if(data.status == 1){
                        var positions = data.data;
                        for(var i=0;i<positions.list.length;i++){
                            console.log(positions.list[i]);

                            liStr += "\n" +
                                "<li class=\"positionList\">\n" +
                                " <span style=\"display:none;\">"+positions.list[i].id+"</span>\n" +
                                "<span style=\"display:none;\">"+positions.list[i].flag+"</span>\n" +
                                "<span class=\"PName\">"+positions.list[i].pName+"</span>\n" +
                                "<span>"+positions.list[i].workSpace+"</span>\n" +
                                " <span>"+positions.list[i].pClassify+"</span>\n" +
                                " <span>"+positions.list[i].department+"</span>\n" +
                                " <span><a href=\"javascript:void(0)\">取消收藏</a></span>\n" +
                                " <p style=\"width: 800px;height:31px;overflow: hidden\">"+positions.list[i].pRequest+"</p>\n" +
                                " </li>"
                        }
                        $('#ulPosition').html(liStr);
                         /*var script = document.createElement("script");
                         script.src = "/static/js/www/collectionPage.js";
                         document.body.appendChild(script);*/
                    }else {
                        console.data(data.msg);
                    }
                },
                error:function(){
                    swal("查询失败");
                }
            });
        }
    });
})