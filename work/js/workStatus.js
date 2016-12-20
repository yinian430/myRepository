(function(){
	//获取url
	var sender;
	var gradeName;
	var startTime;
	var endTime;
	var teacherName;

	(function GetQuerydata(){
	    //获取data
	    function GetQueryString(name){
	     	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     	var r = window.location.search.substr(1).match(reg);
	     	if(r!=null)return decodeURI(r[2]); return null;
		}
	    sender = GetQueryString("sender");
	    gradeName = GetQueryString("gradeName");
	    startTime = GetQueryString("startTime");
	    endTime = GetQueryString("endTime");
	    teacherName = GetQueryString("teacherName");
	    $("#teacherName").html(teacherName);
	}())
	var showAll = function(){
		$.ajax({
		    type:"get",
	        url:"http://v1.api.pc.wschool.cn/getWorkInfo",
	        data:{
	        	sender:sender,
	        	gradeName:gradeName,
	        	startTime:startTime,
	        	endTime:endTime
	        },
	        success:function(data){
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
						for(var i = 0;i < data.workList.length;i++){
							var j = i+1;
							if(data.workList[i].sign == 0){
								$("#img_okL"+j).css("display","none");
							}else if(data.workList[i].sign == 1){
								$("#img_okL"+j).css("display","block");
							}
							if(data.workList[i].signature == 0){
								$("#img_okR"+j).css("display","none");
							}else if(data.workList[i].signature == 1){
								$("#img_okR"+j).css("display","block");
							}
						}
		        	}else{
		        		$(".content_body").css("display","none");
						$(".content_none").css("display","block");
		        	}
	        	}
     		},
     		before:function(){

     		}
	    });
	}
	showAll();
    //showAll数据填充
    var templateHtml_situation = $("#template_situation").html();
    var template_situation = Handlebars.compile(templateHtml_situation);
    var fillData_situation = function(ary){
        var data = {
            timeList:ary
        };
        $("#situation").html(template_situation(data));
        $(".href_workContent").on("click",function(){
	    	var workID = $(this).attr("name");
			window.open("workContent.html" + "#?workID=" + workID);
	    });
	    $(".workDetail").on("click",function(){
			var workID = $(this).attr("name");
	    	$.ajax({
			    type:"get",
		        url:"http://v1.api.pc.wschool.cn/getWorkCompletion",
		        data:{
							gradeName:gradeName,
		        	workID:workID,
		        },
		        success:function(data){
	        		//人数统计
	        		$("#readNum").html(data.workmap.read.length);
	        		$("#unreadNum").html(data.workmap.unRead.length);
	        		$("#signNum").html(data.workmap.sign.length);
	        		$("#unsignNum").html(data.workmap.unSign.length);
	        		$("#finishNum").html(data.workmap.finish.length);
	        		$("#unfinishNum").html(data.workmap.unFinish.length);
	        		//浮层内容显示
	        		//已阅读
		        	if(data.workmap.read.length >= 1){
		        		var dataAry = data.workmap.read;
		        		var ary = jsonMobal(dataAry);
		        		fillData_readingFinished(ary);
		        		$(".reading_finished_block").css("display","block");
						$(".reading_finished_none").css("display","none");
		        	}else{
		    			$(".reading_finished_block").css("display","none");
						$(".reading_finished_none").css("display","block");
		        	}
		        	//未阅读
		        	if(data.workmap.unRead.length >= 1){
		        		var dataAry = data.workmap.unRead;
		        		var ary = jsonMobal(dataAry);
		        		fillData_readingUnfinished(ary);
		        		$(".reading_unfinished_block").css("display","block");
						$(".reading_unfinished_none").css("display","none");
		        	}else{
		    			$(".reading_unfinished_block").css("display","none");
						$(".reading_unfinished_none").css("display","block");
		        	}
		        	//已签收
		        	if(data.workmap.sign.length >= 1){
		        		var dataAry = data.workmap.sign;
		        		var ary = jsonMobal(dataAry);
		        		fillData_sign(ary);
		        		$(".sign_block").css("display","block");
						$(".sign_none").css("display","none");
		        	}else{
		    			$(".sign_block").css("display","none");
						$(".unsign_none").css("display","block");
		        	}
		        	//未签收
		        	if(data.workmap.unSign.length >= 1){
		        		var dataAry = data.workmap.unSign;
		        		var ary = jsonMobal(dataAry);
		        		fillData_unsign(ary);
		        		$(".unsign_block").css("display","block");
						$(".unsign_none").css("display","none");
		        	}else{
		    			$(".unsign_block").css("display","none");
						$(".unsign_none").css("display","block");
		        	}
		        	//已完成
		        	if(data.workmap.finish.length >= 1){
		        		var dataAry = data.workmap.finish;
		        		var ary = jsonMobal(dataAry);
		        		fillData_finish(ary);
		        		$(".finish_block").css("display","block");
						$(".finish_none").css("display","none");
		        	}else{
		    			$(".finish_block").css("display","none");
						$(".finish_none").css("display","block");
		        	}
		        	//未完成
		        	if(data.workmap.unFinish.length >= 1){
		        		var dataAry = data.workmap.unFinish;
		        		var ary = jsonMobal(dataAry);
		        		fillData_unfinish(ary);
		        		$(".unfinish_block").css("display","block");
						$(".unfinish_none").css("display","none");
		        	}else{
		    			$(".unfinish_block").css("display","none");
						$(".unfinish_none").css("display","block");
		        	}
		     	}
		    });
	    })
    }

    //浮层数据填充
    //已阅读
    var templateHTML_reading_finished = $("#template_reading_finished").html();
    var template_reading_finished = Handlebars.compile(templateHTML_reading_finished);
    var fillData_readingFinished = function(ary){
        var data = {
            timeList:ary
        };
        $("#reading_finished_content").html(template_reading_finished(data));
    }
    //未阅读
    var templateHTML_reading_unfinished = $("#template_reading_unfinished").html();
    var template_reading_unfinished = Handlebars.compile(templateHTML_reading_unfinished);
    var fillData_readingUnfinished = function(ary){
        var data = {
            timeList:ary
        };
        $("#reading_unfinished_content").html(template_reading_unfinished(data));
    }
    //已签收
    var templateHTML_sign = $("#template_sign").html();
    var template_sign = Handlebars.compile(templateHTML_sign);
    var fillData_sign = function(ary){
        var data = {
            timeList:ary
        };
        $("#sign_content").html(template_sign(data));
    }
    //未签收
    var templateHTML_unsign = $("#template_unsign").html();
    var template_unsign = Handlebars.compile(templateHTML_unsign);
    var fillData_unsign = function(ary){
        var data = {
            timeList:ary
        };
        $("#unsign_content").html(template_unsign(data));
    }
    //已完成
    var templateHTML_finish = $("#template_finish").html();
    var template_finish = Handlebars.compile(templateHTML_finish);
    var fillData_finish = function(ary){
        var data = {
            timeList:ary
        };
        $("#finish_content").html(template_finish(data));
    }
    //未完成
    var templateHTML_unfinish = $("#template_unfinish").html();
    var template_unfinish = Handlebars.compile(templateHTML_unfinish);
    var fillData_unfinish = function(ary){
        var data = {
            timeList:ary
        };
        $("#unfinish_content").html(template_unfinish(data));
    }
    //浮层按钮事件
    var jsonMobal = function(data){
    	var a = [];
		for(var i = 0;i < data.length;i++){
			var b = {};
			b.name = data[i];
			a.push(b);
		}
		return a;
    }

    //浮层内容切换
    $("#reading_finished").on("click",function(){
    	$(".content_reading").css("display","block");
    	$(".content_unreading").css("display","none");
    	$("#reading_finished").css("background-color","#eee");
    	$("#reading_unfinished").css("background-color","#fff");
    });
    $("#reading_unfinished").on("click",function(){
    	$(".content_reading").css("display","none");
    	$(".content_unreading").css("display","block");
    	$("#reading_finished").css("background-color","#fff");
    	$("#reading_unfinished").css("background-color","#eee");
    });
    $("#sign_finished").on("click",function(){
    	$(".content_sign").css("display","block");
    	$(".content_unsign").css("display","none");
    	$("#sign_finished").css("background-color","#eee");
    	$("#sign_unfinished").css("background-color","#fff");
    });
    $("#sign_unfinished").on("click",function(){
    	$(".content_sign").css("display","none");
    	$(".content_unsign").css("display","block");
    	$("#sign_finished").css("background-color","#fff");
    	$("#sign_unfinished").css("background-color","#eee");
    });
    $("#finish_finished").on("click",function(){
    	$(".content_finish").css("display","block");
    	$(".content_unfinish").css("display","none");
    	$("#finish_finished").css("background-color","#eee");
    	$("#finish_unfinished").css("background-color","#fff");
    });
    $("#finish_unfinished").on("click",function(){
    	$(".content_finish").css("display","none");
    	$(".content_unfinish").css("display","block");
    	$("#finish_finished").css("background-color","#fff");
    	$("#finish_unfinished").css("background-color","#eee");
    });

    //排序
    Handlebars.registerHelper("addOne",function(index,options){
        return parseInt(index)+1;
    });
})();
