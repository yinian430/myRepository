(function(){

	//日历设置
	!function(){
		laydate.skin('molv');//切换皮肤，请查看skins下面皮肤库
		laydate({elem: '#demo'});//绑定元素
	}();
	var start = {
	    elem: '#start',
	    format: 'YYYY-MM-DD',
	    min: '2000-01-01', //最小日期
	    max: laydate.now(), //设定最大日期为当前日期
	    istime: false,
	    istoday: false,
	    choose: function(datas){
	    	//获取当前毫秒
	    	var d = new Date();
			var vYear = d.getFullYear();
			var vMon = parseInt(d.getMonth()) + 1;
			var vDay = d.getDate();
			var s=vYear+"/"+(vMon<10 ? "0" + vMon : vMon)+"/"+(vDay<10 ? "0"+ vDay : vDay);
			var starttimeHaoMiao_now = (new Date(s)).getTime();
			//获取选中毫秒
	    	var startTimeR = $("#start").html();
			startTimeR = startTimeR.replace(new RegExp("-","gm"),"/");
			var starttimeHaoMiao_xuan = (new Date(startTimeR)).getTime(); //得到毫秒数
			starttimeHaoMiao_xuan = starttimeHaoMiao_xuan+518400000;
			//判断选中的日期是否超出当前日期
			var starttimeHaoMiao_xu;
			if(starttimeHaoMiao_now < starttimeHaoMiao_xuan){
				starttimeHaoMiao_xu = starttimeHaoMiao_now;
			}else{
				starttimeHaoMiao_xu = starttimeHaoMiao_xuan;
			}
			var newTime = new Date(starttimeHaoMiao_xu); //就得到普通的时间了
			var time_getmonth = newTime.getMonth()+1;
			if(time_getmonth >= 10){
				time_month = time_getmonth;
			}else{
				var time_month = "0" + time_getmonth;
			}
			if(newTime.getDate() < 10){
				var time_date = "0"+newTime.getDate();
			}else{
				time_date = newTime.getDate();
			}
			var endTimeR = newTime.getFullYear()+"-"+time_month+"-"+time_date;
			$("#end").html(endTimeR);
	        end.min = datas; //开始日选好后，重置结束日的最小日期
	        end.start = datas; //将结束日的初始值设定为开始日
	        end.max = endTimeR;
	    }
	};
	var end = {
	    elem: '#end',
	    format: 'YYYY-MM-DD',
	    min: start.max,
	    max: laydate.now(),
	    istime: false,
	    istoday: false,
	    choose: function(datas){
	    	var d = new Date();
			var vYear = d.getFullYear();
			var vMon = parseInt(d.getMonth()) + 1;
			var vDay = d.getDate();
			var s=vYear+"/"+(vMon<10 ? "0" + vMon : vMon)+"/"+(vDay<10 ? "0"+ vDay : vDay);
			var endtimeHaoMiao_now = (new Date(s)).getTime();
			//获取选中毫秒
	    	var endTimeR = $("#end").html();
			endTimeR = endTimeR.replace(new RegExp("-","gm"),"/");
			var endtimeHaoMiao_xuan = (new Date(endTimeR)).getTime(); //得到毫秒数
			endtimeHaoMiao_xuan = endtimeHaoMiao_xuan-518400000;
			//判断选中的日期是否超出当前日期
			var endtimeHaoMiao_xu;
			if(endtimeHaoMiao_now < endtimeHaoMiao_xuan){
				endtimeHaoMiao_xu = endtimeHaoMiao_now;
			}else{
				endtimeHaoMiao_xu = endtimeHaoMiao_xuan;
			}
			var newTime = new Date(endtimeHaoMiao_xu); //就得到普通的时间了
			var endTimeR = newTime.getFullYear()+"-"+(newTime.getMonth()+1)+"-"+newTime.getDate();
	    	start.min = endTimeR;
	        start.max = datas; //结束日选好后，充值开始日的最大日期
	    }
	};
	laydate(start);
	laydate(end);
	//数组去重
	var ary = function(ary){
		var ret = [];
		for(var i = 0;i < ary.length;i++){
			var flag = true;
			for(var j = i+1;j < ary.length;j++){
				if(ary[i].text == ary[j].text){   //.text
					flag = false;
					break;
				}
			}
			if(flag){
				ret.push(ary[i]);
			}
		}
		return ret;
	}
	//当前日期
	var d = new Date();
	var vYear = d.getFullYear();
	var vMon = parseInt(d.getMonth()) + 1;
	var vDay = d.getDate();
	var s=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay);
	$(".laydate-icon").html(s);

	// window.location.replace("#?id="+"138232");
	var userId;					//获取id

	(function GetQueryString(){
	    var r = window.location.href;
	    var s=r.indexOf("=");
		var t=r.substring(s+1);// t就是?后面的东西了
	    userId = t;
	}())
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
	                	}
	                	schoolNames.push(school_name);
	                }
	        	}
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
			schoolNameEnd=$("#select_xuexiao").select2("data")[0].text ; //单选
		});
	}
	var selectNianji = function(){
		$(document).ready(function() {
			nianjiName=$("#select_nianji").select2("data")[0].text ; //单选
		});
	}
	var selectBanji = function(){
		$(document).ready(function() {
			banjiName=$("#select_banji").select2("data")[0].text ; //单选
		});
	}
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
	var schoolID;
	var classTypeID;
	var gradeID;
	var schoolClassID;
	var startTime;
	var endTime;
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
	                	}
	                	grade.push(grade_name);
	                }
	        	}
                gradeZ = ary(grade);
				//替换下拉列表
				if(data.gradeList){
					if(data.gradeList.length < 1){
						gradeZ = [{id:0,text:"---------没有相关数据----------"}];
					}
				}
				$('.js-example-data-array_02').select2("destroy").empty().select2({data: gradeZ});
				$('.js-example-data-array_03').select2("destroy").empty().select2({data: classes});
				schoolClassID = "";
         	}
	    });
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
	                	}
	                	classes.push(class_name);
	                }
	        	}
                //覆盖之前的下拉框数据
                if(data.gradeList){
                	if(data.gradeList.length < 1){
										classes = [{id:0,text:"---------没有相关数据----------"}];
									}
                }
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
	//查询详情
	//点击事件
	var sender;
	$("#button_ok").on("click",function(){
		var timeList = [];
		var recodeMap = [];
		var jsonLength = 0;
		function getJsonLength(jsonData){
			for(var item in jsonData){
				jsonLength++;
			}
		}
		var startTime = $("#start").html();
		var endTime = $("#end").html();
		var allContent = [];
		if(schoolID){
			if(startTime.length >= 1){
				if(endTime.length >= 1){
					//获取数据




					$.ajax({
					    type:"get",
				        url:"http://v1.api.pc.wschool.cn/getWork",
				        data:{
				        	schoolID:schoolID,
				        	startTime:startTime,
				        	endTime:endTime,
				        	grade:gradeID,
				        	classTypeID:classTypeID,
				        	schoolClassID:schoolClassID
				        },
				        success:function(data){
									console.log(data);
				        	var hoverS = function(stuNum){
										setTimeout(function(){
											$("."+stuNum).on("mouseover",function(){
												$("."+stuNum).css("background-color","#C2E4FC");
											})
											$("."+stuNum).on("mouseout",function(){
												$("."+stuNum).css("background-color","#EFF8FF");
											})
										},100)
									};
				        	if(data.workList){
				        		if(data.workList.length >= 1){
				        			for(var i = 1;i <= data.workList.length;i++){
										hoverS(i);
				        			}
					        		fillData_situation(data.workList);
					        		$(".content_body").css("display","block");
									$(".content_none").css("display","none");
					        	}else{
					        		$(".content_body").css("display","none");
									$(".content_none").css("display","block");
					        	}
				        	}
			         	}
				    });
				}else{
					$(".content_body").css("display","none");
					$(".content_none").css("display","block");
					$(".endPoint").css("width","136px");
					setTimeout(function(){
						$(".endPoint").css("width","0px");
					},1000);
				}
			}else{
				$(".content_body").css("display","none");
				$(".content_none").css("display","block");
				$(".startPoint").css("width","136px");
				setTimeout(function(){
					$(".startPoint").css("width","0px");
				},1000);
			}
		}else{
			$(".content_body").css("display","none");
			$(".content_none").css("display","block");
			$(".classPoint").css("width","136px");
			setTimeout(function(){
				$(".classPoint").css("width","0px");
			},1000);
		}

	})
    //详情
    var templateHtml_situation = $("#template_situation").html();
    var template_situation = Handlebars.compile(templateHtml_situation);
    var fillData_situation = function(ary){
        var data = {
            timeList:ary
        };
        $("#situation").html(template_situation(data));
        $(".location_href").on("click",function(){
	    	var startTime = $("#start").html();
			var endTime = $("#end").html();
			var sender = $(this).attr("sender");
			var gradeName = $(this).attr("gradeName");
			var teacherName = $(this).attr("teacherName");
			window.open("workStatus.html" + "?startTime=" + startTime + "&endTime=" + endTime + "&gradeName=" + gradeName + "&sender=" + sender+ "&teacherName=" + teacherName);
	    })
    }
    Handlebars.registerHelper("addOne",function(index,options){
        return parseInt(index)+1;
    });

    //跳转

})();
