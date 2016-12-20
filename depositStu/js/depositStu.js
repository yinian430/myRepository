(function(){
  layui.use('element', function(){
    var element = layui.element();

    //一些事件监听
    element.on('tab(demo)', function(data){
      console.log(data);
    });
  });

  schoolID = "";
  var trusteeship = [];
  var inTrust = [];
  // selects(trusteeship,"selectLeft");
  // selects(inTrust,"selectRight");
  var allAry = [];
  //添加按钮事件
  $("#add").on("click",function(){
    var options = [];
    var selectAll = document.getElementById("selectLeft").getElementsByClassName("option");
    for(var i = 0;i < selectAll.length;i++){
      if(selectAll[i].getAttribute("selected") == "true"){
        options.push(selectAll[i]);
      }
    }
    for(var i = 0;i < options.length;i++){
      for(var j = 0;j < trusteeship.length;j++){
        if(trusteeship[j] == options[i].innerHTML){
          trusteeship.splice(j,1);
          inTrust.push(options[i].innerHTML);
          for(var m = 0;m < inTrust.length;m++){
            if(inTrust[m] == "没有相关数据"){
              inTrust.splice(m,1);
            }
          }
        }
      }
    }
    selects(trusteeship,"selectLeft");
    selects(inTrust,"selectRight");
    for(var i = 0;i < options.length;i++){
      for(var j = 0;j < inTrust.length;j++){
        if(options[i].innerHTML == inTrust[j]){
          var newOptions = document.getElementById("selectRight").getElementsByClassName("option");
          for(var m = 0;m < newOptions.length;m++){
            if(inTrust[j] == newOptions[m].innerHTML){
              newOptions[m].style.backgroundColor = "#C8C8C8";
              newOptions[m].setAttribute('selected','true');
            }
          }
        }
      }
    }
  });
  //删除按钮事件
  $("#delete").on("click",function(){
    var options = [];
    var selectAll = document.getElementById("selectRight").getElementsByClassName("option");
    for(var i = 0;i < selectAll.length;i++){
      if(selectAll[i].getAttribute("selected") == "true"){
        options.push(selectAll[i]);
      }
    }
    for(var i = 0;i < options.length;i++){
      for(var j = 0;j < inTrust.length;j++){
        if(inTrust[j] == options[i].innerHTML){
          inTrust.splice(j,1);
          trusteeship.push(options[i].innerHTML);
          for(var m = 0;m < trusteeship.length;m++){
            if(trusteeship[m] == "没有相关数据"){
              trusteeship.splice(m,1);
            }
          }
        }
      }
    }
    selects(trusteeship,"selectLeft");
    selects(inTrust,"selectRight");
    for(var i = 0;i < options.length;i++){
      for(var j = 0;j < trusteeship.length;j++){
        if(options[i].innerHTML == trusteeship[j]){
          var newOptions = document.getElementById("selectLeft").getElementsByClassName("option");
          for(var m = 0;m < newOptions.length;m++){
            if(trusteeship[j] == newOptions[m].innerHTML){
              newOptions[m].style.backgroundColor = "#C8C8C8";
              newOptions[m].setAttribute('selected','true');
            }
          }
        }
      }
    }
  });
  //选择学校时显示全校托管生的名单
  $(".select_xuexiao").on("change",function(){
    $.ajax({
	    type:"get",
      url:"http://192.168.1.117:8080/getDepositStu",
      data:{
      	schoolID:schoolID
      },
      success:function(data){
        console.log(data);
        if(data.return_code == "FAIL"){
          inTrust = ["没有相关数据"];
        }else{
          inTrust = [];
          if(data.depositStuList){
            allAry = data.depositStuList;
            if(data.depositStuList.length > 0){
              for(var i = 0;i < data.depositStuList.length;i++){
                inTrust.push(data.depositStuList[i].name);
              }
            }
          }
        }
        trusteeship = [];
        selects(trusteeship,"selectLeft");
        selects(inTrust,"selectRight");
			},
      error:function(){
        layer.alert('服务器异常！', {
          title:  "警告",
          skin: 'layui-layer-hong'
          ,closeBtn: 0
        })
      }
	  });
  });
  //选择年级清空班级托管生名单
  $(".select_nianji").on("change",function(){
    trusteeship = ["没有相关数据"];
    selects(trusteeship,"selectLeft");
  });
  //选择班级时显示全班未托管生的名单
  $(".select_banji").on("change",function(){
    $.ajax({
		  type:"get",
	    url:"http://192.168.1.117:8080/getClassStu",
	    data:{
	      schoolID:schoolID,
        schoolClassID:schoolClassID
	    },
	    success:function(data){
        console.log(data)
        if(data.stuList){
          if(data.stuList.length == 0){
            trusteeship = ["没有相关数据"];
          }else{
            trusteeship = [];
            if(data.stuList){
              if(data.stuList.length > 0){
                for(var i = 0;i < data.stuList.length;i++){
                  allAry.push(data.stuList[i]);
                  trusteeship.push(data.stuList[i].name);
                }
              }
            }
          }
          selects(trusteeship,"selectLeft");
        }else{
          trusteeship = ["没有相关数据"];
          selects(trusteeship,"selectLeft");
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
  })

  $("#save").on("click",function(){
    if(!schoolID){
      layer.alert('请先选择学校！', {
        title:  "提示",
        skin: 'layui-layer-molv' //样式类名
        ,closeBtn: 0
      })
    }else{
      var stuIdStr = "";
      var endOptions = document.getElementById("selectRight").getElementsByClassName("option");
      for(var i = 0;i < endOptions.length;i++){
        for(var j = 0;j < allAry.length;j++){
          if(endOptions[i].innerHTML == allAry[j].name){
            stuIdStr += allAry[j].userID+"#";
          }
        }
      }
      $.ajax({
        type:"get",
        url:"http://192.168.1.117:8080/saveDepositStu",
        data:{
          schoolID:schoolID,
          stuIdStr:stuIdStr
        },
        success:function(data){
          if(data.return_code == "FAIL"){
            layer.open({
              type: 1,
              title: "出错啦",
              skin: 'layui-layer-demo layer-anim-02', //样式类名
              closeBtn: 2, //不显示关闭按钮
              shift: 4,//动画类型
              shadeClose: false, //开启遮罩关闭
              content: '保存失败！'
            });
          }else{
            layer.open({
              type: 1,
              title: "提示",
              skin: 'layui-layer-demo layer-anim-02', //样式类名
              closeBtn: 2, //不显示关闭按钮
              shift: 4,//动画类型
              shadeClose: false, //开启遮罩关闭
              content: '保存成功！'
            });
          }
        },
        error:function(){
          layer.alert('服务器异常！', {
            title:  "警告",
            skin: 'layui-layer-hong'
            ,closeBtn: 0
          })
        }
      })
    }
  })
}())
