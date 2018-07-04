$(function () {
    var totalPage = $('span#totalPage').text();
    var position = $('#exampleInputName2').val();
    var a = parseInt(totalPage);
    if (a > 0) {
        $('#pagination-demo').twbsPagination({
            totalPages: a,
            visiblePages: 3,
            first: null,
            prev: "<<",
            next: '>>',
            last: '最后一页',
            onPageClick: function (event, page) {
                event.preventDefault();
                $.ajax({
                    type: 'post',
                    url: '/resume/manager/queryResume',
                    data: {
                        pageIndex: page,
                        position: position
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 1) {
                            var str = "";
                            var resume = data.data;
                            for (var i = 0; i < resume.list.length; i++) {
                                console.log(resume.list[i]);
                                str += "   <li>\n" +
                                    " \t<span>" + resume.list[i].informationDto.name + "</span>\n" +
                                    " <span>" + resume.list[i].educationDto.level + "</span>\n" +
                                    " <span>" + resume.list[i].positionName + "</span>\n" +
                                    " <span>" + resume.list[i].informationDto.describes + "</span>\n" +
                                    " <span>" + resume.list[i].gradeDto.score + '(' + resume.list[i].gradeDto.classify + ')' + "</span>\n" +
                                    " <span style=\"display: none\">" + resume.list[i].informationDto.userId + "</span>\n" +
                                    " <span style=\"display: none\">" + resume.list[i].id + "</span>\n" +
                                    " \n" +
                                    " <span><a href='javascript:void(0);'  class=\"btn btn-default look\">查看</a>\n" +
                                    " <a href=\"javaScript:void(0);\" class=\"btn btn-danger delete\">删除</a></span>\n";
                                if (resume.list[i].r == 0) {
                                    str += "<span class=\"label label-info labelInfo\">new</span></li>";
                                } else {
                                    str += "</li>"
                                }
                            }
                            var trNode = $('#ulContainer');
                            trNode.html(str);
                            /* var script = document.createElement("script");
                             script.src = "../../static/js/manager/jianli.js";
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