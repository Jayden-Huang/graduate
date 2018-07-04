$(function () {
    var totalPage = $('span#totalPage').text();
    var a = parseInt(totalPage);
    var condition = $('#exampleInputName2').val();
    if(a > 0) {
        $('#pagination-demo').twbsPagination({
            totalPages: a,
            visiblePages: 3,
            first: '第一页',
            prev: "<<",
            next: '>>',
            last: '最后一页',
            onPageClick: function (event, page) {
                event.preventDefault();
                $.ajax({
                    type: 'get',
                    url: '/position/manager/findByPage',
                    data: {
                        pageIndex: page,
                        condition: condition
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 1) {
                            var str = "";
                            var position = data.data;
                            for (var i = 0; i < position.list.length; i++) {
                                console.log(position.list[i]);
                                var type = "";
                                if (position.list[i].flag == 1) {
                                    type = "社会招聘";
                                } else {
                                    type = "校园招聘";
                                }
                                str += "<li>\n" +
                                    "<span>" + (1 + i) + "</span>\n" +
                                    "<span>" + position.list[i].pClassify + "</span>\n" +
                                    "<span>" + position.list[i].pDepartment + "</span>\n" +
                                    "<span>" + position.list[i].pName + "</span>\n" +
                                    "<span>" + type + "</span>\n" +
                                    "<span style='display: none;'>" + position.list[i].id + "</span>" +
                                    "<span>\n" +
                                    " <button href=\"#\" class=\"btn btn-primary updateModel\">详情修改</button>\n" +
                                    "<a href=\"javaScript:void(0);\" class=\"btn btn-danger deleteBtn\">删除</a>\n" +
                                    " </span>\n" +
                                    "</li>";
                            }
                            var trNode = $('#ulContainer');
                            trNode.html(str);
                            var script = document.createElement("script");
                            /*script.src = "../../static/js/manager/position.js";
                            document.body.appendChild(script);
                            script = document.createElement("script");
                            script.src = "../../static/js/manager/positionPage.js";
                            document.body.appendChild(script);*/
                        } else {
                            swal(data.msg, "", "error");
                        }
                    },
                    error: function () {
                        swal('出现错误', "", "error");
                    }
                });
            }
        });
    }

})