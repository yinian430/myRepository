(function GetQuerydata(){
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
  //获取data
  function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return decodeURI(r[2]); return null;
  }
  var thisClassID = GetQueryString("thisClassID");
  var school_id = GetQueryString("school_id");
  var startTime = GetQueryString("startTime");
  var endTime = GetQueryString("endTime");
  var thisDate = GetQueryString("thisDate");

  layer.load(2);
  var thisHtmlStr = "";
	$.ajax({
    type:"post",
      url:"http://192.168.1.117:8080/getParentsAppCount",
      data:{
        schoolClassId:thisClassID,
        startTime:startTime,
        endTime:endTime
      },
      success:function(data){
        layer.closeAll('loading');
        if(data.statisticalInformation){
          $("#Parent_usageAateForList").html(data.statisticalInformation.elsePercent);
          $("#Parent_usageAateForPeo").html(data.statisticalInformation.elseNum);
        }
        if(data.parentsCountList){
          if(data.parentsCountList.length > 0){
            $("#content_bodyTeacher").css("display","block");
            $("#content_body").css("display","none");
            $("#content_none").css("display","none");
            for(var i = 0;i < data.parentsCountList.length;i++){
              var j = i+1;
              var thisBanjiStr = "";
              if(data.parentsCountList[i].graderName){
                if(data.parentsCountList[i].graderName.length > 0){
                  for(var m = 0;m < data.parentsCountList[i].graderName.length;m++){
                    if(data.parentsCountList[i].graderName[m].schoolClass == 1){
                      thisBanjiStr += "<span style=\"color:#29AE79\">"+data.parentsCountList[i].graderName[m].gradeName+"</span><br>"
                    }else{
                      thisBanjiStr += "<span>"+data.parentsCountList[i].graderName[m].gradeName+"</span><br>"
                    }
                  }
                }
              }
              if(data.parentsCountList[i].logintel == "未安装"){
                var thisParentName = "<span style=\"color:#f00\">"+data.parentsCountList[i].studentName+"</span>";
              }else{
                var thisParentName = "<span>"+data.parentsCountList[i].studentName+"</span>";
              }
              thisHtmlStr +=  "<li class=\"cb parentDetail_header Theight\">"
                              +"<p class=\"fl borderR borderB PTheight borderL parent_num parent_class"+i+"\">"+j+"</p>"
                              +"<p class=\"fl borderR borderB PTheight parent_students parent_class"+i+"\">"+thisParentName+"</p>"
                              +"<p class=\"fl borderR borderB PTheight parent_Num parent_class"+i+"\">"+data.parentsCountList[i].logintel+"</p>"
                              +"<p class=\"fl borderR borderB PTheight parent_Num parent_class"+i+"\">"+data.parentsCountList[i].loginSource+"</p>"
                              +"<p class=\"fl borderR borderB PTheight parent_Num parent_class"+i+"\">"+data.parentsCountList[i].versionName+"</p>"
                              +"<p class=\"fl borderR borderB PTheight parent_Num parent_class"+i+"\">"+data.parentsCountList[i].useDaysNum+"天</p>"
                              +"<p class=\"fl borderR borderB PTheight parent_class parent_class"+i+"\">"+data.parentsCountList[i].lastLoginTime+"</p>"
                              +"</li>"
            }
            $("#situationParent").html(thisHtmlStr);
            for(var i = 0;i < data.parentsCountList.length;i++){
              for(var j = 0;j < $(".teacher_class"+i).length;j++){
                $(".teacher_class"+i)[j].style.height = $("#teacher_class"+i).height()+"px";
                $(".teacher_class"+i)[j].style.lineHeight = $("#teacher_class"+i).height()+"px";
              }
            }
            for(var i = 0;2*i < $("#situationParent li").length;i++){
              if($("#situationParent li")[2*i+1]){
                $("#situationParent li")[2*i+1].style.backgroundColor = "#fff";
                $("#situationParent li")[2*i+1].onmousemove = function(){
                  this.style.backgroundColor = "#D4E9FC";
                };
                $("#situationParent li")[2*i+1].onmouseout = function(){
                  this.style.backgroundColor = "#fff";
                };
              }
              if($("#situationParent li")[2*i]){
                $("#situationParent li")[2*i].onmousemove = function(){
                  this.style.backgroundColor = "#D4E9FC";
                };
                $("#situationParent li")[2*i].onmouseout = function(){
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
  });
  layer.load(2);
  $.ajax({
    type:"get",
    url:"http:/192.168.1.117:8080/getAppCount",
    data:{
      schoolId:school_id,
      typeId:1,
      startTime:startTime,
      endTime:endTime
    },
    success:function(data){
      layer.closeAll('loading');
      data.countList.forEach(function(value,index){
        if(value.schoolClassId == thisClassID){
          console.log(value)
          $("#Parent_usageAateForAndroid").html(value.installForAndroid.split(" ")[1].replace("(","").replace(")",""));
          $("#Parent_usageAateForAndroidPeo").html(value.installForAndroid.split(" ")[0]);
          $("#Parent_usageAateForIosPeo").html(value.installForIOS.split(" ")[0]);
          $("#Parent_usageAateForIos").html(value.installForIOS.split(" ")[1].replace("(","").replace(")",""));
          $("#usageAateForAll").html(value.usageAate.split(" ")[1].replace("(","").replace(")",""));
          $("#usageAateForAndroid").html(value.usageAateForAndroid.split(" ")[1].replace("(","").replace(")",""));
          $("#usageAateForIos").html(value.usageAateForIOS.split(" ")[1].replace("(","").replace(")",""));
          $("#allPeople").html(value.classNum)
          $("#parentClassName").html(value.gradeName);
        }
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
  })
  //填充
  $("#parentDate").html(thisDate);
}())
