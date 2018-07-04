$(function () {
    //个人信息的回填
    $('#editFirst').click(function () {
        $('#informationshow').hide();
        $.ajax({
            type:'get',
            url:'/info',
            dataType:'json',
            success:function(data){
                if (data != null){
                    var info = data.data;
                    $('#username').val(info.name);
                    $('#sex option').each(function () {
                        if ($(this).text() == info.sex){
                            $(this).attr("selected",true);
                        }
                    });
                    $('#email').val(info.email);
                    $('#face option').each(function(){
                        if ($(this).text() == info.poliStatus){
                            $(this).attr("selected",true);
                        }
                    });
                    $('#phoneNum').val(info.phone);
                    $('#jobIntension').val(info.jobIntension);
                    $('#describe').val(info.describes);
                    $('#photoImg').attr('src',info.photo);
                }
            },
            error:function(){
                console.log("出现错误");
            }
        })
        $('#information').show();
    });
    //取消
    $('#infoCancel').click(function (e) {
        e.preventDefault();
        $('#informationshow').show();
        $('#information').hide();
    });

    //教育经历的回填
    $('#editSecond').click(function () {
        $.ajax({
           type:'get',
           url:'/edu',
            dataType:'json',
            success:function(data){
               if (data != null && data.status == 1){
                   var edu = data.data;
                   $('#eduSchool').val(edu.school);
                   $('#eduLevel option').each(function(){
                       if($(this).text() == edu.level){
                           $(this).attr("selected",true);
                       }
                   });
                   $('#eduFromTime').val(edu.fromTime);
                   $('#eduToTime').val(edu.toTime);
               }
            },
            error:function () {
                console.log("出现错误");
            }
        });
        $('#eduShow').hide();
        $('#edu').show();
    });

    //取消
    $('#eduCancel').click(function (e) {
        e.preventDefault();
        $('#eduShow').show();
        $('#edu').hide();
    });
    //工作经历回填
    $('#editThird').click(function () {
        $.ajax({
            type:'get',
            url:'/work',
            dataType:'json',
            success:function(data){
                if (data != null && data.status == 1){
                    var work = data.data;
                    $('#workFromTime').val(work.fromTime);
                    $('#workToTime').val(work.toTime);
                    $('#workCompany').val(work.company);
                    $('#workDuty').val(work.duty);
                    $('#workResponsitity').val(work.responsibility);
                }
            },
            error:function(){
                console.log("出现错误");
            }
        })
        $('#workShow').hide();
        $('#work').show();
    });
    //取消
    $('#workCancel').click(function (e) {
        e.preventDefault();
        $('#workShow').show();
        $('#work').hide();
    });


      //项目经验
    $('#editFofth').click(function () {
        $.ajax({
            type:'get',
            url:'/project',
            dataType:'json',
            success:function (data) {
                if (data != null && data.status == 1){
                    var project = data.data;
                    $('#projectFromTime').val(project.fromTime);
                    $('#projectToTime').val(project.toTime);
                    $('#projectName').val(project.projectName);
                    $('#projectDescribes').val(project.describes);
                }
            },
            error:function () {
                console.log("出现错误");
            }
        })
        $('#projectShow').hide();
        $('#project').show();
    });
    //取消
    $('#projectCancel').click(function (e) {
        e.preventDefault();
        $('#projectShow').show();
        $('#project').hide();
    });


    //技能
    $('#editFifth').click(function () {
        $.ajax({
            type:'get',
            url:'/skill',
            dataType:'json',
            success:function(data){
               if (data.status == 1){
                   var skill = data.data;
                   $('#skill1').val(skill.skill1);
                   $('#skill2').val(skill.skill2);
                   $('#skill3').val(skill.skill3);
                   $('#skill4').val(skill.skill4);
               }
            },
            error:function () {
                console.log("出现错误");
            }
        })
        $('#skillShow').hide();
        $('#skill').show();
    });
    //取消
    $('#SkillCancel').click(function (e) {
        e.preventDefault();
        $('#skillShow').show();
        $('#skill').hide();
    });

    //学校情况的回调
    $('#editSixth').click(function () {
        $.ajax({
            type:'get',
            url:'/campus',
            dataType:'json',
            success:function (data) {
                if (data != null && data.status == 1){
                    var  campus = data.data;
                    $('#schoolCondictionDuty').val(campus.duty);
                    $('#schoolCondictionAward').val(campus.award);
                }
            },
            error:function () {
                console.log("出现错误");
            }
        })
        $('#schoolShow').hide();
        $('#schoolCondiction').show();
    });
    //取消
    $('#schoolCancel').click(function (e) {
        e.preventDefault();
        $('#schoolShow').show();
        $('#schoolCondiction').hide();
    });



    //个人信息表单提交
    $('form#infoForm').on('submit',function (e) {
        e.preventDefault();
        var username = $('#username').val();
        var sex = $('#sex option:selected').text();
        var email = $('#email').val();
        var face = $('#face option:selected').text();
        var phoneNum = $('#phoneNum').val();
        var jobIntension = $('#jobIntension').val();
        var describe = $('#describe').val();
        console.log("--------"+username + " "+sex+" "+ email+" "+face+" "+phoneNum+" "+jobIntension+" "+describe);
        $.ajax({
            type:'post',
            url:'/info/addOrUpdate',
            data:{
                name:username,
                sex:sex,
                email:email,
                poliStatus:face,
                phone:phoneNum,
                jobIntension:jobIntension,
                describes:describe
            },
            dataType:'json',
            success:function (data) {
                swal('上传成功');
                $('#showName').html(data.data.name);
                $('#showSex').html(data.data.sex);
                $('#showEmail').html(data.data.email);
                $('#showFace').html(data.data.poliStatus);
                $('#showPhoneNum').html(data.data.phone);
                $('#showJobIntension').html(data.data.jobIntension);
                $('#showDescribes').html(data.data.describes);
                $('#informationshow').show();
                $('#information').hide();
            },
            error:function () {
                swal('上传失败');
            }
        });
    });

    //教育背景的提交
    $('form#eduForm').on('submit',function (e) {
        e.preventDefault();
        var school = $('#eduSchool').val();
        var level = $('#eduLevel option:selected').text();
        var fromTime = $('#eduFromTime').val();
        var toTime = $('#eduToTime').val();
        console.log("教育--"+school + " "+ level+" "+fromTime+" "+toTime);
        $.ajax({
           type:'post',
           url:'/edu/addOrUpdate',
           data:{
               school:school,
               level:level,
               fromTime:fromTime,
               toTime:toTime
           },
            dataType:'json',
            success:function (data) {
                if (data.status == 1){
                    swal("上传成功");
                    $('#eduShowSchool').html(data.data.school);
                    $('#eduShowLevel').html(data.data.level);
                    $('#eduShowFromTime').html(data.data.fromTime);
                    $('#eduShowToTime').html(data.data.toTime);
                    $('#eduShow').show();
                    $('#edu').hide();
                }else{
                    swal(data.msg);
                }
            },
            error:function () {
                swal("上传出现错误");
            }
        });
    });

    //工作经历的提交
    $('form#workForm').on('submit',function (e) {
        e.preventDefault();
        var company = $('#workCompany').val();
        var duty = $('#workDuty').val();
        var fromTime = $('#workFromTime').val();
        var toTime = $('#workToTime').val();
        var responsibility = $('#workResponsitity').val();
        console.log("工作--"+company + " "+duty+" "+fromTime+" "+toTime + " " + responsibility);
        $.ajax({
            type:'post',
            url:'/work/addOrUpdate',
            data:{
                company:company,
                duty:duty,
                fromTime:fromTime,
                toTime:toTime,
                responsibility:responsibility
            },
            dataType:'json',
            success:function (data) {
                if (data.status == 1){
                    swal("上传成功");
                    $('#workShowCompany').html(data.data.company);
                    $('#workShowDutis').html(data.data.duty);
                    $('#workShowFromTime').html(data.data.fromTime);
                    $('#workShowToTime').html(data.data.toTime);
                    $('#workShowResponsiblity').html(data.data.responsibility);
                    $('#workShow').show();
                    $('#work').hide();
                }else{
                    swal(data.msg);
                }
            },
            error:function () {
                swal("上传出现错误");
            }
        });
    });

    //项目经验提交
    $('form#projectForm').on('submit',function (e) {
        e.preventDefault();
        var projectName = $('#projectName').val();
        var describes = $('#projectDescribes').val();
        var fromTime = $('#projectFromTime').val();
        var toTime = $('#projectToTime').val();
        console.log("项目--"+projectName + " "+describes+" "+fromTime+" "+toTime );
        $.ajax({
            type:'post',
            url:'/project/addOrUpdate',
            data:{
                projectName:projectName,
                describes:describes,
                fromTime:fromTime,
                toTime:toTime
            },
            dataType:'json',
            success:function (data) {
                if (data.status == 1){
                    swal("上传成功");
                    $('#projectShowName').html(data.data.projectName);
                    $('#projectShowFromTime').html(data.data.fromTime);
                    $('#projectShowToTime').html(data.data.toTime);
                    $('#projectShowDescribes').html(data.data.describes);
                    $('#projectShow').show();
                    $('#project').hide();
                }else{
                    swal(data.msg);
                }
            },
            error:function () {
                swal("上传出现错误");
            }
        });
    });
    //技能特点提交
    $('form#skillForm').on('submit',function (e) {
        e.preventDefault();
        var skill1 = $('#skill1').val();
        var skill2 = $('#skill2').val();
        var skill3 = $('#skill3').val();
        var skill4 = $('#skill4').val();
        console.log("技能--"+skill1 + " "+skill2+" "+skill3+" "+skill4);
        $.ajax({
            type:'post',
            url:'/skill/addOrUpdate',
            data:{
                skill1:skill1,
                skill2:skill2,
                skill3:skill3,
                skill4:skill4
            },
            dataType:'json',
            success:function (data) {
                if (data.status == 1){
                    swal("上传成功");
                    $('#skillShowSkill1').html(data.data.skill1);
                    $('#skillShowSkill2').html(data.data.skill2);
                    $('#skillShowSkill3').html(data.data.skill3);
                    $('#skillShowSkill4').html(data.data.skill4);
                    $('#skillShow').show();
                    $('#skill').hide();
                }else{
                    swal(data.msg);
                }
            },
            error:function () {
                swal("上传出现错误");
            }
        });
    });

    //校园情况
    $('form#schoolForm').on('submit',function (e) {
        e.preventDefault();
        var duty = $('#schoolCondictionDuty').val();
        var award = $('#schoolCondictionAward').val();
        console.log("校园--"+duty+ " "+award);
        $.ajax({
            type:'post',
            url:'/campus/addOrUpdate',
            data:{
                duty:duty,
                award:award
            },
            dataType:'json',
            success:function (data) {
                if (data.status == 1){
                    swal("上传成功");
                    $('#schoolShowDuty').html(data.data.duty);
                    $('#schoolShowAward').html(data.data.award);
                    $('#schoolShow').show();
                    $('#schoolCondiction').hide();
                }else{
                    swal(data.msg);
                }
            },
            error:function () {
                swal("上传出现错误");
            }
        });
    });

    //上传头像
    $('form#photoForm').on('submit',function (e) {
        e.preventDefault();
        console.log("---头像"+new FormData($('#photoForm')[0]));
        $.ajax({
            type:'post',
            url:'/info/upload',
            data:new FormData($('#photoForm')[0]),
            cache : false,
            processData: false,
            contentType: false,
            success:function (data) {
               if(data.status == 1){
                   $('#imgPersonShow').attr("src",data.msg);
                   $('#photoImg').attr("src",data.msg);
                   swal('上传成功');
               }else {
                   swal(data.msg);
               }
            },
            error:function () {
                swal("上传出现错误");
            }
        });
    });


   //上传附件简历
    $('form#modelForm').on('submit',function (e) {
        e.preventDefault();
        console.log("--附件"+new FormData($('#modelForm')[0]));
        $.ajax({
            type:'post',
            url:'/info/upload',
            data:new FormData($('#modelForm')[0]),
            cache : false,
            processData: false,
            contentType: false,
            success:function (data) {
                if(data.status == 1){
                    var path = new String(data.msg);
                    var index = path.lastIndexOf("/");
                    var name = path.substring(index+1);
                    swal("上传成功");
                    $('#myModal').modal('hide');
                    $('#modelA').attr("title",name);
                 //   $('#modelA').text(name);
                }else {
                    swal(data.msg,"","error");
                }
            },
            error:function () {
                swal("上传出现错误");
            }
        });
    });

    //文件预览
    $('#modelA').click(function () {
        var name = $('#modelA').attr('title').trim();
        if (name == "" || name == null){
            swal("请上传附件简历");
        } else{
            var href = '../../../../static/upload/'+name;
            window.open(href,'_blank');
          //  $('#modelA').media({width:800});
        }
    });
    
    //文件删除
    $('#delete').on('click',function (e) {
        e.preventDefault();
        swal({
            title: "您确定要删除吗？",
            text: "您确定要删除附件简历吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "是的，我要删除",
            confirmButtonColor: "#ec6c62"
        }).then(function(result) {
           if (result.value){
               $.ajax({
                   type:'delete',
                   url:'/info/delete',
                   success:function (data) {
                       if (data.status == 1){
                           swal("删除！", "你的附件简历已经被删除。", "success");
                           $('#modelA').attr("title","");
                       }else{
                           swal("删除失败！",data.msg, "error");
                       }
                   },
                   error:function () {
                       swal("删除失败！","error");
                   }
               });
           }

        })
    });

})