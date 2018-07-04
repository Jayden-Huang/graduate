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
                    type: 'get',
                    url: '/question//findByType',
                    data: {
                        pageIndex: page,
                        type: type
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 1) {
                            var str = "";
                            var question = data.data;
                            for (var i = 0; i < question.list.length; i++) {
                                console.log(question.list[i]);
                                str += " <li>\n" +
                                    " <span>" + (1 + i) + "</span>\n" +
                                    " <span>" + question.list[i].qClassify + "</span>\n" +
                                    " <span>" + question.list[i].qName + "</span>\n" +
                                    " <span>" + question.list[i].qAnswer + "</span>\n" +
                                    " <span>" + question.list[i].qChose + "</span>\n" +
                                    " <span style=\"display: none;\">" + question.list[i].id + "</span>\n" +
                                    "  <span>\n" +
                                    "\t <button class=\"btn btn-default updateModel\" >修改</button>\n" +
                                    "\n" +
                                    "\t <a href=\"javaScript:void(0)\" class=\"btn btn-danger deleteBtn\">删除</a>\n" +
                                    "\t </span>\n" +
                                    "  </li>";
                            }
                            var trNode = $('#ulContainer');
                            trNode.html(str);
                            /*var script = document.createElement("script");
                            script.src = "../../static/js/manager/question.js";
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