(function(){
  //layer
  layui.use('element', function(){
    var element = layui.element();
  });
  layui.use('form', function(){
    var form = layui.form();
    form.on('submit(formDemo)', function(data){
      layer.msg(JSON.stringify(data.field));
      return false;
    });
  });

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
  //获取userid
  var userID;
	(function GetQueryString(){
    var r = window.location.href;
    var s=r.indexOf("=");
		var t=r.substring(s+1);// t就是?后面的东西了
	    userID = t;
	}())
  //声明时间变量
  var startTimeS;
  var endTimeE;
  //显示收件箱数据
  var showAllInbox = function(startTime,endTime){
    $.ajax({
	    type:"get",
      url:"http://192.168.1.117:8080/getInbox",
      data:{
        startTime:startTime,
        endTime:endTime
      },
      success:function(data){
        if(data.messageList){
          if(data.messageList.length > 0){
            $("#getInbox").css("display","block");
            $("#getOutbox").css("display","none");
            $("#body_content").css("display","block");
            fillData(data.messageList,startTime,endTime);
          }else{
            $("#getInbox").css("display","block");
            $("#getOutbox").css("display","none");
            $("#body_content").css("display","none");
            layer.alert('暂无数据！', {
              title:  "提示",
              skin: 'layui-layer-hong'
              ,closeBtn: 0
            })
          }
        }
      },
      error:function(){
        layer.alert('服务器异常！', {
          title:  "警告",
          skin: 'layui-layer-hong'
          ,closeBtn: 0
        })
      }
    });
  }
  //显示发件箱数据
  var showAllOutbox = function(startTime,endTime){
    $.ajax({
	    type:"get",
      url:"http://192.168.1.117:8080/getOutbox",
      data:{
        startTime:startTime,
        endTime:endTime
      },
      success:function(data){
        if(data.messageList){
          if(data.messageList.length > 0){
            $("#getInbox").css("display","none");
            $("#getOutbox").css("display","block");
            $("#body_Outbox").css("display","block");
            fillData_outbox(data.messageList,startTime,endTime);
          }else{
            $("#getInbox").css("display","none");
            $("#getOutbox").css("display","block");
            $("#body_Outbox").css("display","none");
            layer.alert('暂无数据！', {
              title:  "提示",
              skin: 'layui-layer-hong'
              ,closeBtn: 0
            })
          }
        }
      },
      error:function(){
        layer.alert('服务器异常！', {
          title:  "警告",
          skin: 'layui-layer-hong'
          ,closeBtn: 0
        })
      }
    });
  }
//查询
  $("#query").click(function(){
    startTimeS = $("#start").html();
    endTimeE = $("#end").html();
    if($("#emeilSelect").val() == "0"){
      showAllInbox(startTimeS,endTimeE);
    }else{
      showAllOutbox(startTimeS,endTimeE);
    }
  });
//填充数据
  var templateHtml = $("#template").html();
  var template = Handlebars.compile(templateHtml);
  var fillData = function(ary,startTimeS,endTimeE){
      var data = {
          content:ary
      };
      $("#body_content").html(template(data));
      for(var i = 0;i < data.content.length;i++){
        //平衡高度
        var smallHeight = $(".smallContent"+data.content[i].id).height();
        var contentheight = $("#contentContent"+data.content[i].id).height();
        if(contentheight <= 20){
          contentheight = 38;
        }
        var contentheightA = contentheight/2+"px";
        contentheight = contentheight + "px";
        $(".smallContent"+data.content[i].id).height(contentheight);
        $(".lineH"+data.content[i].id).css("line-height",contentheight);

        if($(".lineHph"+data.content[i].id).html().replace(/\s/ig,'').length > 11){
          $(".lineHph"+data.content[i].id).css("line-height",contentheightA);
        }else{
          $(".lineHph"+data.content[i].id).css("line-height",contentheight);
        }
        if($(".lineHSN"+data.content[i].id).html().replace(/\s/ig,'').length > 7){
          $(".lineHSN"+data.content[i].id).css("line-height",contentheightA);
        }else{
          $(".lineHSN"+data.content[i].id).css("line-height",contentheight);
        }
        $("#contentContent"+data.content[i].id).height(contentheight);
        var hOver = $(".hOver"+data.content[i].id);
        for(var j = 0;j < hOver.length;j++){
          //hover事件
          hOver[j].onmouseover = function(){
            var iD = this.getAttribute("name");
            $(".hOver"+iD)[0].style.backgroundColor = "#C2E4FC";
            $(".hOver"+iD)[1].style.backgroundColor = "#C2E4FC";
            $(".hOver"+iD)[2].style.backgroundColor = "#C2E4FC";
            $(".hOver"+iD)[3].style.backgroundColor = "#C2E4FC";
            $(".hOver"+iD)[4].style.backgroundColor = "#C2E4FC";
          };
          hOver[j].onmouseout = function(){
            var iD = this.getAttribute("name");
            $(".hOver"+iD)[0].style.backgroundColor = "#EFF8FF";
            $(".hOver"+iD)[1].style.backgroundColor = "#EFF8FF";
            $(".hOver"+iD)[2].style.backgroundColor = "#EFF8FF";
            $(".hOver"+iD)[3].style.backgroundColor = "#EFF8FF";
            $(".hOver"+iD)[4].style.backgroundColor = "#EFF8FF";
          };
          //点击添加处理结果
          hOver[j].onclick = function(){
            var iD = this.getAttribute("name");
            if($("#flag"+iD)[0].style.height == "36px"){
              $("#flag"+iD)[0].style.height = "0px";
              $("#flag"+iD)[0].style.border = "0px solid #888888";
            }else{
              $("#flag"+iD)[0].style.border = "1px solid #888888";
              $("#flag"+iD)[0].style.height = "36px";
            }
          };
        }
        //加border-bottom
        var ruseltBor = document.getElementById("parentLi"+data.content[i].id).getElementsByClassName("result");
        var ruseltBorLth = document.getElementById("parentLi"+data.content[i].id).getElementsByClassName("result").length-1;
        if(ruseltBor[ruseltBorLth]){
          ruseltBor[ruseltBorLth].setAttribute("style","border-bottom:1px solid #888!important")
        }
        for(var m = 0;m < data.content[i].receList.length;m++){
          // console.log(data.content[i].receList[m].id)
          var nowHeight = $("#resultNowheight"+data.content[i].receList[m].id).height()+"px";
          $(".resultContent"+data.content[i].receList[m].id).height(nowHeight)
          $(".resultContentLin"+data.content[i].receList[m].id).css("line-height",nowHeight)
        }
        //提交
        $("#submitRuselt"+data.content[i].id).click(function(){
          var recemessageID = this.name;
          var content = $("#ruseltContent"+recemessageID).val();
          $.ajax({
      	    type:"get",
            url:"http://192.168.1.117:8080/saveRecesms139",
            data:{
              userID:userID,
              content:content,
              recemessageID:recemessageID
            },
            success:function(data){
            	showAllInbox(startTimeS,endTimeE);
            }
          });
        })
      }
  };
  //填充发件箱数据
  var templateHtml_outbox = $("#template_outbox").html();
  var template_outbox = Handlebars.compile(templateHtml_outbox);
  var fillData_outbox = function(ary,startTimeS,endTimeE){
      var data = {
          content:ary
      };
      $("#body_Outbox").html(template(data));
      for(var i = 0;i < data.content.length;i++){
        //平衡高度
        var smallHeight = $(".smallContent"+data.content[i].id).height();
        var contentheight = $("#contentContent"+data.content[i].id).height();
        if(contentheight == 19){
          contentheight = 38;
        }
        var contentheightA = contentheight/2+"px";
        contentheight = contentheight + "px";
        $(".smallContent"+data.content[i].id).height(contentheight);
        $(".lineH"+data.content[i].id).css("line-height",contentheight);

        if($(".lineHph"+data.content[i].id).html().replace(/\s/ig,'').length > 11){
          $(".lineHph"+data.content[i].id).css("line-height",contentheightA);
        }else{
          $(".lineHph"+data.content[i].id).css("line-height",contentheight);
        }
        if($(".lineHSN"+data.content[i].id).html().replace(/\s/ig,'').length > 7){
          $(".lineHSN"+data.content[i].id).css("line-height",contentheightA);
        }else{
          $(".lineHSN"+data.content[i].id).css("line-height",contentheight);
        }
        $("#contentContent"+data.content[i].id).height(contentheight);
        var hOver = $(".hOver"+data.content[i].id);
        for(var j = 0;j < hOver.length;j++){
          //hover事件
          hOver[j].onmouseover = function(){
            var iD = this.getAttribute("name");
            $(".hOver"+iD)[0].style.backgroundColor = "#C2E4FC";
            $(".hOver"+iD)[1].style.backgroundColor = "#C2E4FC";
            $(".hOver"+iD)[2].style.backgroundColor = "#C2E4FC";
            $(".hOver"+iD)[3].style.backgroundColor = "#C2E4FC";
            $(".hOver"+iD)[4].style.backgroundColor = "#C2E4FC";
          };
          hOver[j].onmouseout = function(){
            var iD = this.getAttribute("name");
            $(".hOver"+iD)[0].style.backgroundColor = "#EFF8FF";
            $(".hOver"+iD)[1].style.backgroundColor = "#EFF8FF";
            $(".hOver"+iD)[2].style.backgroundColor = "#EFF8FF";
            $(".hOver"+iD)[3].style.backgroundColor = "#EFF8FF";
            $(".hOver"+iD)[4].style.backgroundColor = "#EFF8FF";
          };
        //加border-bottom
        var ruseltBor = document.getElementById("parentLi"+data.content[i].id).getElementsByClassName("result");
        var ruseltBorLth = document.getElementById("parentLi"+data.content[i].id).getElementsByClassName("result").length-1;
        if(ruseltBor[ruseltBorLth]){
          ruseltBor[ruseltBorLth].setAttribute("style","border-bottom:1px solid #888!important")
        }
      }
    }
  };
  //显示收件箱数据
  showAllInbox(startTimeS,endTimeE);
})()
