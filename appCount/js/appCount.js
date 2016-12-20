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
  //当前日期
	var d = new Date();
	var thisD = (new Date(d)).getTime()-518400000;
	var thisTime =  new Date(thisD);
	var thisTimeStart = thisTime.getFullYear()+"-"+(thisTime.getMonth()+1)+"-"+thisTime.getDate();
	var vYear = d.getFullYear();
	var vMon = parseInt(d.getMonth()) + 1;
	var vDay = d.getDate();
	$("#start").html(thisTimeStart);
	var s=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay);
	$("#end").html(s);
  //layui
  var form;
  layui.use(['element','form'], function(){
    var element = layui.element();
    form = layui.form();
    form.on('submit(formDemo)', function(data){
      layer.msg(JSON.stringify(data.field));
      return false;
    });
    //监听select事件
    form.on('select(trem)', function(data){
      school_id = data.value;
      form.render();
    });
    form.on('radio(sex)', function(data){
      targetValue = data.value;
      form.render();
    });
  });
  //获取id
	// window.location.replace("#?id="+"131375");
	var userId;

	(function GetQueryString(){
    var r = window.location.href;
    var s=r.indexOf("=");
		var t=r.substring(s+1);// t就是?后面的东西了
	    userId = t;
	}());
  //获取学学校
  var school_id;
  var targetValue = "1";
  var term_str = "";
  var thisHtmlStr = "";
  var showTerm = function(){
    term_str = "";
    layer.load(2);
		$.ajax({
		    type:"get",
	        url:"http://v1.api.pc.wschool.cn/getSchool",
          async: false,
	        data:{
            userID:userId
	        },
	        success:function(data){
            layer.closeAll('loading');
            if(data.schoolList){
              if(data.schoolList.length == 0){
                term_str = "<option value=\"1\">暂无数据</option>";
              }else{
                school_id = data.schoolList[0].schoolID;
                data.schoolList.forEach(function(value){
                  term_str += "<option value="+value.schoolID+">"+value.schoolName+"</option>";
                })
              }
            }else{
              term_str = "<option value=\"1\">暂无数据</option>";
            }
            $("#trem").html(term_str);
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
	};
  showTerm();
  //查询
  $("#queryBtn").click(function(){
		$("#situation").html("");
		$("#situationTeacher").html("");
		thisHtmlStr = "";
    var startTime = $("#start").html();
		var endTime = $("#end").html();
    // console.log(school_id);
		if(startTime == ""){
			$(".startPoint").css("width","166px");
			setTimeout(function(){
				$(".startPoint").css("width","0px");
			},1000)
			$("#content_body").css("display","none");
			$("#content_bodyTeacher").css("display","none");
			$("#content_none").css("display","block");
		}else if(endTime == ""){
			$(".endPoint").css("width","166px");
			setTimeout(function(){
				$(".endPoint").css("width","0px");
			},1000)
			$("#content_body").css("display","none");
			$("#content_bodyTeacher").css("display","none");
			$("#content_none").css("display","block");
		}else{
			//结束时间
	    var endTimeH = $("#end").html();
	    endTimeH = endTimeH.replace(new RegExp("-","gm"),"/");
	    var endtimeHHaoMiao_xuan = (new Date(endTimeH)).getTime(); //得到毫秒数
	    //开始时间
	    var startTimeH = $("#start").html();
	    startTimeH = startTimeH.replace(new RegExp("-","gm"),"/");
	    var starttimeHHaoMiao_xuan = (new Date(startTimeH)).getTime(); //得到毫秒数
	    //时间
	    var thisDate = endtimeHHaoMiao_xuan-starttimeHHaoMiao_xuan;
	    thisDate = thisDate/1000/60/60/24 + 1;
	    $("#thisDate").html(thisDate);
			$("#thisDateTeacher").html(thisDate);
	    layer.load(2);
	    $.ajax({
	      type:"get",
	      url:"http:/192.168.1.117:8080/getAppCount",
	      data:{
	        schoolId:school_id,
	        typeId:targetValue,
	        startTime:startTime,
	        endTime:endTime
	      },
	      success:function(data){
	        layer.closeAll('loading');
					//查询为家长时
	        if(data.countList){
						$(".content").css("height","630px");
	          if(data.countList.length > 0){
	            $("#content_body").css("display","block");
							$("#content_bodyTeacher").css("display","none");
	            $("#content_none").css("display","none");
	            for(var i = 0;i < data.countList.length-1;i++){
	              var j = i+1;
	              thisHtmlStr +=  "<li class='detail_header detail_content hHeight'>"
	                              +"<p class='fl borderR borderB borderL detail_num'>"+j+"</p>"
	                              +"<p class='fl borderR borderB detail_class'>"+data.countList[i].gradeName+"<span class='query_btn' id='queryDetail"+i+"' thisClassID='"+data.countList[i].schoolClassId+"' thisClassName='"+data.countList[i].gradeName+"'>使用情况</span></p>"
	                              +"<p class='fl borderR borderB detail_students'>"+data.countList[i].classNum+"</p>"
	                              +"<p class='fl rateWidth borderR borderB'>"+data.countList[i].installForAndroid+"</p>"
	                              +"<p class='fl rateWidth borderR borderB'>"+data.countList[i].installForIOS+"</p>"
	                              +"<p class='fl rateWidth borderR borderB lastW'>"+data.countList[i].install+"</p>"
	                              +"<p class='fl rateWidth borderR borderB'>"+data.countList[i].usageAateForAndroid+"</p>"
	                              +"<p class='fl rateWidth borderR borderB'>"+data.countList[i].usageAateForIOS+"</p>"
	                              +"<p class='fl rateWidth borderR borderB lastW'>"+data.countList[i].usageAate+"</p>"
	                              +"</li>";
	            }
	            $("#situation").html(thisHtmlStr);
							for(var i = 0;i < data.countList.length-1;i++){
								$("#queryDetail"+i).on("click",function(){
									var thisClassID = this.getAttribute("thisClassID");
									var thisClassName = this.getAttribute("thisClassName");
									window.open("parentCount.html"+"?thisClassID="+thisClassID+"&school_id="+school_id+"&endTime="+endTime+"&startTime="+startTime+"&thisDate="+thisDate);
								})
	            }
							for(var i = 0;2*i < $("#situation li").length;i++){
								if($("#situation li")[2*i+1]){
									$("#situation li")[2*i+1].style.backgroundColor = "#fff";
									$("#situation li")[2*i+1].onmousemove = function(){
										this.style.backgroundColor = "#D4E9FC";
									};
									$("#situation li")[2*i+1].onmouseout = function(){
										this.style.backgroundColor = "#fff";
									};
								}
								if($("#situation li")[2*i]){
									$("#situation li")[2*i].onmousemove = function(){
										this.style.backgroundColor = "#D4E9FC";
									};
									$("#situation li")[2*i].onmouseout = function(){
										this.style.backgroundColor = "#EFF9FF";
									};
								}
							}
	            $("#situation").append("<li class='fontW detail_header hHeight'>"
	                            +"<p class='fl borderR borderB borderL detail_num' style='height:27px;'></p>"
	                            +"<p class='fl borderR borderB detail_class'>"+data.countList[data.countList.length-1].gradeName+"</p>"
	                            +"<p class='fl borderR borderB detail_students'>"+data.countList[data.countList.length-1].classNum+"</p>"
	                            +"<p class='fl rateWidth borderR borderB'>"+data.countList[data.countList.length-1].installForAndroid+"</p>"
	                            +"<p class='fl rateWidth borderR borderB'>"+data.countList[data.countList.length-1].installForIOS+"</p>"
	                            +"<p class='fl rateWidth borderR borderB lastW'>"+data.countList[data.countList.length-1].install+"</p>"
	                            +"<p class='fl rateWidth borderR borderB'>"+data.countList[data.countList.length-1].usageAateForAndroid+"</p>"
	                            +"<p class='fl rateWidth borderR borderB'>"+data.countList[data.countList.length-1].usageAateForIOS+"</p>"
	                            +"<p class='fl rateWidth borderR borderB lastW'>"+data.countList[data.countList.length-1].usageAate+"</p>"
	                            +"</li>"
	            );
	          }else{
	            $("#content_body").css("display","none");
							$("#content_bodyTeacher").css("display","none");
	            $("#content_none").css("display","block");
	          }
	        }else if(data.teacherCountList){
						//查询为老师时
						$(".content").css("height","690px");
						var usageAateForAndroid_num = 0;
						var usageAateForIos_num = 0;
						var usageAateForAll_num = 0;
						var usageAateForAndroid = 0;
						var usageAateForIos = 0;
						var usageAateForAll = 0;
						$("#androidPeople").html(data.statisticalInformation.androidNum);
						$("#iosPeople").html(data.statisticalInformation.iosnum);
						$("#nonePeople").html(data.statisticalInformation.elseNum);
						$("#allPeople").html(data.statisticalInformation.teacherNum);
						$("#androidPeopleB").html(data.statisticalInformation.androidPercent);
						$("#iosPeopleB").html(data.statisticalInformation.iospercent);
						$("#nonePeopleB").html(data.statisticalInformation.elsePercent);
	          if(data.teacherCountList.length > 0){
							$("#content_bodyTeacher").css("display","block");
	            $("#content_body").css("display","none");
	            $("#content_none").css("display","none");
	            for(var i = 0;i < data.teacherCountList.length;i++){
	              var j = i+1;
								var thisBanjiStr = "";
								if(data.teacherCountList[i].loginSource.length >= 2){
									if(data.teacherCountList[i].loginSource.slice(0,2) == "安卓"){
										usageAateForAndroid_num += data.teacherCountList[i].useDaysNum - 0;
									}else if(data.teacherCountList[i].loginSource.slice(0,2) == "苹果"){
										usageAateForIos_num += data.teacherCountList[i].useDaysNum - 0;
									}
								}
								if(data.teacherCountList[i].graderName){
									if(data.teacherCountList[i].graderName.length > 0){
										for(var m = 0;m < data.teacherCountList[i].graderName.length;m++){
											if(data.teacherCountList[i].graderName[m].schoolClass == 1){
												thisBanjiStr += "<span style=\"color:#29AE79\">"+data.teacherCountList[i].graderName[m].gradeName+"</span><br>"
											}else{
												thisBanjiStr += "<span>"+data.teacherCountList[i].graderName[m].gradeName+"</span><br>"
											}
										}
									}
								}
								if(data.teacherCountList[i].logintel == "未安装"){
									var thisTeacherName = "<span style=\"color:#f00\">"+data.teacherCountList[i].teacherName+"</span>";
								}else{
									var thisTeacherName = "<span>"+data.teacherCountList[i].teacherName+"</span>";
								}
	              thisHtmlStr +=  "<li class=\"cb teacher_header Theight\">"
									              +"<p class=\"fl borderR borderB Theight borderL teacher_num teacher_class"+i+"\">"+j+"</p>"
									              +"<p class=\"fl borderR borderB Theight teacher_students teacher_class"+i+"\">"+thisTeacherName+"</p>"
									              +"<p class=\"fl borderR borderB Theight teacher_students teacher_class"+i+"\">"+data.teacherCountList[i].roleName+"</p>"
									              +"<p class=\"fl borderR borderB Theight teacher_class\" id=\"teacher_class"+i+"\">"+thisBanjiStr+"</p>"
									              +"<p class=\"fl borderR borderB teacher_Num teacher_class"+i+"\">"+data.teacherCountList[i].logintel+"</p>"
									              +"<p class=\"fl borderR borderB Theight teacher_Num teacher_class"+i+"\">"+data.teacherCountList[i].loginSource+"</p>"
									              +"<p class=\"fl borderR borderB Theight teacher_Num teacher_class"+i+"\">"+data.teacherCountList[i].versionName+"</p>"
									              +"<p class=\"fl borderR borderB Theight teacher_Num teacher_class"+i+"\">"+data.teacherCountList[i].useDaysNum+"天</p>"
																+"<p class=\"fl borderR borderB Theight teacher_class teacher_class"+i+"\">"+data.teacherCountList[i].lastLoginTime+"</p>"
									            	+"</li>"
	            }
							usageAateForAll_num = usageAateForAndroid_num + usageAateForIos_num;
							data.statisticalInformation.androidNum == 0 ? usageAateForAndroid = 0 : usageAateForAndroid = usageAateForAndroid_num / thisDate / data.statisticalInformation.androidNum * 100
							data.statisticalInformation.iosnum == 0 ? usageAateForIos = 0 : usageAateForIos = usageAateForIos_num / thisDate / data.statisticalInformation.iosnum * 100
							data.statisticalInformation.teacherNum == 0 ? usageAateForAll = 0 : usageAateForAll = usageAateForAll_num / thisDate / data.statisticalInformation.teacherNum * 100
							$("#usageAateForAndroid").html(usageAateForAndroid.toFixed(2) + "%");
							$("#usageAateForIos").html(usageAateForIos.toFixed(2) + "%");
							$("#usageAateForAll").html(usageAateForAll.toFixed(2) + "%");
	            $("#situationTeacher").html(thisHtmlStr);
							for(var i = 0;i < data.teacherCountList.length;i++){
								for(var j = 0;j < $(".teacher_class"+i).length;j++){
									$(".teacher_class"+i)[j].style.height = $("#teacher_class"+i).height()+"px";
									$(".teacher_class"+i)[j].style.lineHeight = $("#teacher_class"+i).height()+"px";
								}
							}
							for(var i = 0;2*i < $("#situationTeacher li").length;i++){
								if($("#situationTeacher li")[2*i+1]){
									$("#situationTeacher li")[2*i+1].style.backgroundColor = "#fff";
									$("#situationTeacher li")[2*i+1].onmousemove = function(){
										this.style.backgroundColor = "#D4E9FC";
									};
									$("#situationTeacher li")[2*i+1].onmouseout = function(){
										this.style.backgroundColor = "#fff";
									};
								}
								if($("#situationTeacher li")[2*i]){
									$("#situationTeacher li")[2*i].onmousemove = function(){
										this.style.backgroundColor = "#D4E9FC";
									};
									$("#situationTeacher li")[2*i].onmouseout = function(){
										this.style.backgroundColor = "#EFF9FF";
									};
								}
							}
	          }else{
	            $("#content_body").css("display","none");
							$("#content_bodyTeacher").css("display","none");
	            $("#content_none").css("display","block");
	          }
	        }else{
	          $("#content_body").css("display","none");
						$("#content_bodyTeacher").css("display","none");
	          $("#content_none").css("display","block");
	        }
	      },
	      error:function(){
	        layer.closeAll('loading');
	        layer.alert('服务器异常！', {
	          title:  "警告",
	          skin: 'layui-layer-cheng'
	          ,closeBtn: 0
	        })
	      }
	    })
		}
  })
}())
