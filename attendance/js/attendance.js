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
				starttimeHaoMiao_xuan = starttimeHaoMiao_xuan+2592000000;
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
			//获取选中毫秒
	    	var endTimeR = $("#end").html();
			endTimeR = endTimeR.replace(new RegExp("-","gm"),"/");
			var endtimeHaoMiao_xuan = (new Date(endTimeR)).getTime(); //得到毫秒数
			endtimeHaoMiao_xuan = endtimeHaoMiao_xuan-2592000000;
			//判断选中的日期是否超出当前日期
			var newTime = new Date(endtimeHaoMiao_xuan); //就得到普通的时间了
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
	}

	//当前日期
	var d = new Date();
	var vYear = d.getFullYear();
	var vMon = parseInt(d.getMonth()) + 1;
	var vDay = d.getDate();
	var s=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay);
	$(".laydate-icon").html(s);
	//layui
  var form;
  layui.use(['element','form'], function(){
    var element = layui.element();
    form = layui.form();
  });
	var userId;					//获取id

	(function GetQueryString(){
	    var r = window.location.href;
	    var s=r.indexOf("=");
		var t=r.substring(s+1);// t就是?后面的东西了
	    userId = t;
	}())
	//下拉框的数组
	var schoolNames = [{id:0,text:"请选择"}];
	var grade = [{id:0,text:"请选择"}];
	var classes = [{id:0,text:"请选择"}];
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
			schoolNameEnd=$("#select_xuexiao").select2("data")[0].text ;
		});
	}
	var selectNianji = function(){
		$(document).ready(function() {
			nianjiName=$("#select_nianji").select2("data")[0].text ;
		});
	}
	var selectBanji = function(){
		$(document).ready(function() {
			banjiName=$("#select_banji").select2("data")[0].text ;
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
	        	grade = [{id:0,text:"请选择"}];
	        	classes = [{id:0,text:"请选择"}];
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
				if(gradeZ.length <= 1){
					gradeZ = [{id:0,text:"没有相关数据"}];
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
	        	classes = [{id:0,text:"请选择"}];
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
                if(classes.length <= 1){
					classes = [{id:0,text:"没有相关数据"}];
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
	setTimeout(function(){
		$(".select2-container")[0].style.width = "225px";
	},200)
	//查询详情
	//点击事件

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
		if(schoolClassID){
			if(startTime.length >= 1){
				if(endTime.length >= 1){
					//获取数据
					layer.load(2);
					$.ajax({
					    type:"get",
				        url:"http://v1.api.pc.wschool.cn/getCardRecode",
				        data:{
				        	schoolClassID:schoolClassID,
				        	startTime:startTime,
				        	endTime:endTime
				        },
				        success:function(data){
									layer.closeAll('loading');
				        	if(data.timeList){
				        		if(data.timeList.length >= 1){
					        		$(".content_body").css("display","block");
					        		$(".rule").css("display","block");
					        		$(".content_none").css("display","none");
					        		timeList = data.timeList;
						        	recodeMap = data.recodeMap;
						        	var currentTime = timeList[0].date;
						        	var currentContent = recodeMap[currentTime]
						        	getJsonLength(recodeMap)
						        	allContent.push(recodeMap);
					        	}else{
					        		$(".content_body").css("display","none");
					        		$(".rule").css("display","none");
					        		$(".content_none").css("display","block");
					        	}
				        	}else{
				        		$(".content_body").css("display","none");
				        		$(".content_none").css("display","block");
				        	}

				        	var timeListZ = [];
				        	//转换数据格式
				        	for (var i = 0; i < allContent.length; i++) {
										for(var j in allContent[i]){
											var m = {}
											m['time'] = j;
											m['content'] = allContent[i][j]
											timeListZ.push(m);
										}
									}
									//处理刷卡数据
									var stuAry = [];
									var stuAryM = [];
									var aryFF = [];
									var aryFL = [];
									var aryMF = [];
									var aryML = [];
									for(var i = 0;i<timeListZ.length;i++){
										var	contentI = timeListZ[i].content;

										for(var j = 0;j<contentI.length;j++){
											//子女
											if(contentI[j].recordFist == null){
												if(contentI[j].fatherRecordFist == null && contentI[j].motherRecordFist == null){
													contentI[j].recordFist = "未刷卡"
												}
											}
											if(contentI[j].recordLast == null){
												if(contentI[j].fatherRecordLast == null && contentI[j].motherRecordLast == null){
													contentI[j].recordLast = "未刷卡"
												}
											}
											if(contentI[j].recordFist){
												var nowStr = contentI[j].recordFist;
												nowStr = nowStr.substr(0,10)+' '+nowStr.substr(11);
												contentI[j].recordFist = nowStr;
											}
											if(contentI[j].recordLast){
												var nowStr = contentI[j].recordLast;
												nowStr = nowStr.substr(0,10)+' '+nowStr.substr(11);
												contentI[j].recordLast = nowStr;
											}
											//父母
											if(contentI[j].fatherRecordFist){
												var nowStr = contentI[j].fatherRecordFist;
												nowStr = nowStr.substr(0,10)+' '+nowStr.substr(11);
												contentI[j].recodeTime = nowStr;
												contentI[j].fatherRecordFist = contentI[j].fatherRecordFist.replace(/[:]/g,"-");
												var iIDFF = contentI[j].fatherRecordFist;
												aryFF.push(iIDFF);
												setTimeout(function(){
													for(var i = 0;i < aryFF.length;i++){
														$("#"+aryFF[i]).css({"display":"inline-block"});
													}
												},100);
											}
											if(contentI[j].fatherRecordLast){
												var nowStr = contentI[j].fatherRecordLast;
												nowStr = nowStr.substr(0,10)+' '+nowStr.substr(11);
												contentI[j].fatherCardNum = nowStr;
												contentI[j].fatherRecordLast = contentI[j].fatherRecordLast.replace(/[:]/g,"-");
												var iIDFL = contentI[j].fatherRecordLast;
												aryFL.push(iIDFL);
												setTimeout(function(){
													for(var i = 0;i < aryFL.length;i++){
														$("#"+aryFL[i]).css({"display":"inline-block"});
													}
												},100);
											}
											if(contentI[j].motherRecordFist){
												var nowStr = contentI[j].motherRecordFist;
												nowStr = nowStr.substr(0,10)+' '+nowStr.substr(11);
												contentI[j].mothercardNum = nowStr;
												contentI[j].motherRecordFist = contentI[j].motherRecordFist.replace(/[:]/g,"-");
												var iIDMF = contentI[j].motherRecordFist;
												aryMF.push(iIDMF);
												setTimeout(function(){
													for(var i = 0;i < aryMF.length;i++){
														$("#"+aryMF[i]).css({"display":"inline-block"});
													}
												},100);
											}
											if(contentI[j].motherRecordLast){
												var nowStr = contentI[j].motherRecordLast;
												nowStr = nowStr.substr(0,10)+' '+nowStr.substr(11);
												contentI[j].sexID = nowStr;
												contentI[j].motherRecordLast = contentI[j].motherRecordLast.replace(/[:]/g,"-");
												var iIDML = contentI[j].motherRecordLast;
												aryML.push(iIDML);
												setTimeout(function(){
													for(var i = 0;i < aryML.length;i++){
														$("#"+aryML[i]).css({"display":"inline-block"});
													}
												},100);
											}
											//控制单元格高度
											if(contentI[j].fatherRecordFist || contentI[j].fatherRecordLast || contentI[j].motherRecordFist || contentI[j].motherRecordLast){
												if(contentI[j].fatherRecordFist || contentI[j].fatherRecordLast){
													var stu = contentI[j].stuNum;
													stu = "xuehao"+stu;
													stuAry.push(stu);
													setTimeout(function(){
														for(var i = 0;i < stuAry.length;i++){
															$("."+stuAry[i]).css({"height":"155px"});
														}
													},200);
												}
												if(contentI[j].motherRecordFist || contentI[j].motherRecordLast){
													var stu = contentI[j].stuNum;
													stu = "xuehao"+stu;
													stuAryM.push(stu);
													setTimeout(function(){
														for(var i = 0;i < stuAryM.length;i++){
															$("."+stuAryM[i]).css({"height":"155px"});
														}
													},200);
												}

											}

										}
									}
				        	//处理日期排序问题
				        	var d = [];
				        	for(var i = 0;i < timeListZ.length;i++){
				        		var time = parseInt(timeListZ[i].time.replace(/[-]/g,""));
				        		d.push(time);
				        		d.sort(function(a,b){
						            return a-b
						        });
						        d.join();
				        	}
				        	var b = {};
				        	var timeListJ = [];
				        	for(var i = 0;i < d.length;i++){
				        		var a = d[i].toString();
				        		a = a.substr(0,4)+'-'+a.substr(4,2)+"-"+a.substr(6,2);
				        		for(var j = 0;j< timeListZ.length;j++){
				        			if(a == timeListZ[j].time){
				        				timeListJ.push(timeListZ[j]);
				        			}
				        		}
				        	}
				        	//页面填充数据
				        	fillData(currentContent);
				        	if(timeListJ.length == 1){
				        		$(".auto_x").attr("class","ifMargin");
				        		$(".ifMargin").attr("class","ifMargin");
				        	}else{
				        		$(".auto_x").attr("class","auto_x");
				        		$(".ifMargin").attr("class","auto_x");
				        	}
				        	fillData_situation(timeListJ);
									data.recodeMap[startTime].map(function(value,index){
										var stuNum = "xuehao"+value.stuNum;
										(index%2 ==0) ? $("."+stuNum).css("background-color","#fff") : $("."+stuNum).css("background-color","#EFF9FF");
										//添加hover事件
										var _Bcolor;
										$("."+stuNum).on("mouseover",function(){
											_Bcolor = this.style.backgroundColor;
											$("."+stuNum).css("background-color","#D4E9FC");
										})
										$("."+stuNum).on("mouseout",function(){
											$("."+stuNum).css("background-color",_Bcolor);
										})
									})
			         	},
								error:function(){
			            layer.closeAll('loading');
			            layer.alert('服务器异常！', {
			              title:  "警告",
			              skin: 'layui-layer-cheng'
			              ,closeBtn: 0
			            })
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
	//学号和姓名
		var templateHtml = $("#template").html();
    var template = Handlebars.compile(templateHtml);
    var fillData = function(ary){
        var data = {
            students:ary
        };
        $("#stuNum_name").html(template(data));
    }

    //刷卡情况--时间
    var templateHtml_situation = $("#template_situation").html();
    var template_situation = Handlebars.compile(templateHtml_situation);
    var fillData_situation = function(ary){
        var data = {
            timeList:ary
        };
        $("#situation").html(template_situation(data));
    }
})();
