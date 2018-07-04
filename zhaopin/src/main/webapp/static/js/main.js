
$(function () {
    $("#registerForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 5
            },
           password1: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            }
        },
        messages: {
            username: {
                required: "请输入用户名",
                minlength: "用户名至少由两个字母组成"
            },
            password: {
                required: "请输入密码",
                minlength: "密码长度不能小于 5 个字母"
            },
           password1: {
                required: "请输入密码",
                minlength: "密码长度不能小于 5 个字母",
                equalTo: "两次密码输入不一致"
            }
        }
    });

    //注册
   $('#register1').click(function (e) {
        e.preventDefault();
        if ($('#registerForm').valid()){
            var username = $("#username").val();
            var password = $("#password").val();
            var answer1 = $("#answer1").val();
            var answer2 = $("#answer2").val();
            $.ajax({
                url:"/registerCheck",
                type:'post',
                data:{
                    username:username,
                    password:password,
                    answer1:answer1,
                    answer2:answer2
                },
                dataType:'json',
                success:function (data) {
                    swal(data.msg);
                },
                error:function () {
                    swal('操作失败');
                }
            });
         }
        })
   var name = null;
    //验证密保：
    $('#profile1').on('submit',function(e){
        e.preventDefault();
        var username = $("#username").val();
        name = username;
        var answer1 = $("#answer1").val();
        var answer2 = $("#answer2").val();
        console.log(username);
       // alert(username);
        $.ajax({
            url:"/checkAnswer",
            type:'post',
            data:{
                username:username,
                answer1:answer1,
                answer2:answer2
            },
            dataType:'json',
            success:function (data) {
               swal(data.msg);
            },
            error:function () {
                swal('操作失败');
            }
        });
    });

    //更新密码：

    //验证两次密码是否一样
    $('form#messages1').validate({
        rules:{
            password1:{
                required:true,
                minlength:2
            },
            password2:{
                required:true,
                equalTo:"#password1"
            }
        },
        message: {
            password2: {
                equalTo: "两次密码不一致",
            }
        }
    });

    $('#messages1').on('submit',function(e){
        e.preventDefault();
        var password1 = $("#password1").val();
        var password2 = $("#password2").val();
        console.log(password1);
        if($('form#messages1').valid()){
            $.ajax({
                url:"/changePassword",
                type:'post',
                data:{
                    username:name,
                    newPassword:password1
                },
                dataType:'json',
                success:function (data) {
                    swal(data.msg);
                    /*$('div.modal-body').html(data.msg);
                    $('#show').modal('show');*/
                },
                error:function () {
                    swal('操作失败');
                }
            });
        }

    });


})