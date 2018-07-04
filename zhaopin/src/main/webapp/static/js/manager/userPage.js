$(function () {
    var totalPage = $('span#totalPage').text();
    var a = parseInt(totalPage);
    var type = $('#exampleInputName2').val();
    if (a > 0) {
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
                    type: 'post',
                    url: '/user/admin/query',
                    data: {
                        pageIndex: page,
                        name: type
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 1) {
                            var str = "";
                            var user = data.data;
                            for (var i = 0; i < user.list.length; i++) {
                                console.log(user.list[i]);
                                var select = "";
                                if (user.list[i].roleId == 1) {
                                    select = "<select name=\"role\">\n" +
                                        "  <option value=\"1\" selected='selected'>普通用户</option>\n" +
                                        " <option value=\"2\">管理员</option>\n" +
                                        " </select>\n";
                                } else {
                                    select = "<select name=\"role\">\n" +
                                        "  <option value=\"1\" >普通用户</option>\n" +
                                        " <option value=\"2\" selected='selected'>管理员</option>\n" +
                                        " </select>\n";
                                }
                                str += "<li>\n" +
                                    " <span>" + user.list[i].username + "</span>\n" +
                                    "  <span>" + user.list[i].answer1 + "</span>\n" +
                                    " <span>" + user.list[i].answer2 + "</span>\n" +
                                    "  <span>\n" +
                                    select +
                                    " </span>\n" +
                                    "  <span><a href=\"javaScript:void(0);\" class=\"btn btn-danger deleteBtn\">删除</a></span>\n" +
                                    "<span style='display: none;'>" + user.list[i].id + "</span>" +
                                    "  </li> ";
                            }
                            var trNode = $('#ulContainer');
                            trNode.html(str);
                            /* var script = document.createElement("script");
                             script.src = "../../static/js/manager/user.js";
                             document.body.appendChild(script);
                             script.src = "../../static/js/manager/userPage.js";
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