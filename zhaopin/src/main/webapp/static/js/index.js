$(function(){
	$('span.input-group-btn>button').click(function(){
		var flag = $('div.choose>ul>li>input:checked').val();
		var keyWord = $('#keyWord').val();
		console.log("flag-==="+flag+" keyword=="+keyWord);
		if(flag == null || typeof (flag) == 'undefined'){
			swal("请选择相应的类型"," ","error");
			return;
		}
		else if(keyWord == null || keyWord == ''){
			swal("请输入相应的关键字"," ","error");
			return;
		}else{
            location.href = "/index1/findBySocialOrSchool?flag="+flag+"&keyWord="+keyWord;
		}
	})
})
