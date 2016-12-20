(function(){

	//显示整个模块
	$("#schoolGradeClass").html("<table class=\"content_header table table-striped table-bordered table-hover table-condensed\">"
			+"<tr>"
			+"	<td class=\"className\"><span>学校：</span></td>"
			+"	<td>"
			+"		<select class=\"js-example-data-array select_xuexiao\"  id=\"select_xuexiao\"></select>"
			+"	</td>"
			+"</tr>"
			+"<tr>"
			+"	<td class=\"className\"><span>年级：</span></td>"
			+"	<td>"
			+"		<select class=\"js-example-data-array_02 select_nianji\" id=\"select_nianji\"></select>"
			+"	</td>"
			+"</tr>"
			+"<tr>"
			+"	<td class=\"className\"><span>班级：</span></td>"
			+"	<td class=\"por\">"
			+"		<select class=\"js-example-data-array_03 select_banji\" id=\"select_banji\"></select>"
			+"		<div class=\"classPoint\">"
			+"			<div class=\"point\">"
			+"				<div class=\"sanjiao\"></div>"
			+"				<p>请选择班级</p>"
			+"			</div>"
			+"		</div>"
			+"	</td>"
			+"</tr>"
			+"</table>"
	);


	//数组去重
	var ary = function(ary){
		var ret = [];
		for(var i = 0;i < ary.length;i++){
			var flag = true;
			for(var j = i+1;j < ary.length;j++){
				if(ary[i].text == ary[j].text){
					flag = false;
					break;
				}
			}
			if(flag){
				ret.push(ary[i]);
			}
		}
		return ret;
	};

	//获取id
	// window.location.replace("#?id="+"131375");
	var userId;

	(function GetQueryString(){
	    var r = window.location.href;
	    var s=r.indexOf("=");
		var t=r.substring(s+1);// t就是?后面的东西了
	    userId = t;
	}());
	//下拉框的数组
	var schoolNames = [{id:0,text:"---------请选择----------"}];
	var grade = [{id:0,text:"---------请选择----------"}];
	var classes = [{id:0,text:"---------请选择----------"}];
	//显示学校
	var showAll = function(){
		$.ajax({
		    type:"get",
	        url:"http://v1.api.pc.wschool.cn/getSchool",
	        data:{
	        	userID:userId
	        },
	        success:function(data){
	        	if(data.schoolList){
	        		for(var i = 0;i<data.schoolList.length;i++){
	                	var school_name = {
	                		id: i+1,
	                		schoolID:data.schoolList[i].schoolID,
	                		text:data.schoolList[i].schoolName
	                	};
	                	schoolNames.push(school_name);
	                };
	        	};
         	}
	    });
	    setTimeout(function(){
	    	$(".js-example-data-array").select2({
				data:schoolNames,
			});
	    },100)
	};
	$(document).ready(function() {
		showAll();
	});

	//填充下拉列表
	var schoolNameEnd;
	var nianjiName;
	var banjiName;
	//获取当前选中的值
	var selectXuexiao = function(){
		$(document).ready(function() {
			schoolNameEnd=$("#select_xuexiao").select2("data")[0].text ;
		});
	};
	var selectNianji = function(){
		$(document).ready(function() {
			nianjiName=$("#select_nianji").select2("data")[0].text ;
		});
	};
	var selectBanji = function(){
		$(document).ready(function() {
			banjiName=$("#select_banji").select2("data")[0].text ;
		});
	};
	//填充数据
	setTimeout(function(){

		$(".js-example-data-array_02").select2({
			data:grade,
		});
		$(".js-example-data-array_03").select2({
			data:classes,
		});
	},100);
	//获取填充年级
	// var schoolID;
	var classTypeID;
	var gradeID;
	// var schoolClassID;
	$(".select_xuexiao").on("change",function(){

		selectXuexiao();
		$.each(schoolNames,function(n,value){
        if(value.text == schoolNameEnd){
        	schoolID = value.schoolID;
        }
    });
		$.ajax({
		    type:"get",
	        url:"http://v1.api.pc.wschool.cn/getGrade",
	        data:{
	        	schoolID:schoolID
	        },
	        success:function(data){
	        	grade = [{id:0,text:"---------请选择----------"}];
	        	classes = [{id:0,text:"---------请选择----------"}];
	        	if(data.gradeList){
	        		for(var i = 0;i<data.gradeList.length;i++){
	                	var grade_name = {
	                		id: i+1,
	                		text:data.gradeList[i].gradeName,
	                		gradeID:data.gradeList[i].grade,
	                		classTypeID:data.gradeList[i].classTypeID,
	                	};
	                	grade.push(grade_name);
	                }
	        	};
                gradeZ = ary(grade);
				//替换下拉列表
				if(data.gradeList){
					if(data.gradeList.length < 1){
						gradeZ = [{id:0,text:"---------没有相关数据----------"}];
					}
				};
				$('.js-example-data-array_02').select2("destroy").empty().select2({data: gradeZ});
				$('.js-example-data-array_03').select2("destroy").empty().select2({data: classes});
				schoolClassID = "";
			}
	    });
			return schoolID;
	});
	//填充班级
	$(".select_nianji").on("change",function(){
		selectNianji();
		$.each(grade,function(n,value){
        if(value.text == nianjiName){
        	classTypeID = value.classTypeID;
        	gradeID = value.gradeID;
        }
    });
		$.ajax({
		    type:"get",
	        url:"http://v1.api.pc.wschool.cn/getClass",
	        data:{
	        	schoolID:schoolID,
	        	ClassTypeID:classTypeID,
	        	Grade:gradeID
	        },
	        success:function(data){
	        	classes = [{id:0,text:"---------请选择----------"}];
	        	if(data.gradeList){
	        		for(var i = 0;i<data.gradeList.length;i++){
	                	var class_name = {
	                		id: i+1,
	                		text:data.gradeList[i].className,
	                		schoolClassID:data.gradeList[i].schoolClassID,
	                	};
	                	classes.push(class_name);
	                };
	        	};
                //覆盖之前的下拉框数据
								if(data.gradeList){
                	if(data.gradeList.length < 1){
										classes = [{id:0,text:"---------没有相关数据----------"}];
									}
                };
                $('.js-example-data-array_03').select2("destroy").empty().select2({data: classes});
         		schoolClassID = "";
         	}
	    });
	});
	//选择班级
	$(".select_banji").on("change",function(){
		selectBanji();
		$.each(classes,function(n,value){
        if(value.text == banjiName){
        	schoolClassID = value.schoolClassID
        }
    });
	});

})();
