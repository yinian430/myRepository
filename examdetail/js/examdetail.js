(function(){

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
      showExam(userId,data.value);
      form.render();
    });
    form.on('select(exam)', function(data){
      examId = data.value;
      showSubjects(data.value);
      form.render();
    });
    form.on('checkbox(subjects)', function(data){
      var thisExamTypeID = data.elem.getAttribute('typeID');
      //获取考卷类型
      // console.log(thisExamTypeID);
      // thisExamTypeID = 3;
      var thisSubjectsId = data.value;
      var thisChecked = data.elem.checked;
      var thisCourseDes = data.elem.name;
      var thisFenjuanHtml;
      var thisSelectHtml;
      var thisButtonHtml;
      var ItemCode = 1;
      if(thisChecked == false){
        $("#subjectsDetail"+thisSubjectsId).css("display","none");
      }else{
        if($("#subjectsDetail"+thisSubjectsId).length > 0){
          $("#subjectsDetail"+thisSubjectsId).css("display","block");
        }else if($("#subjectsDetail"+thisSubjectsId).length == 0){
          //判断是否分卷
          if(thisExamTypeID == "2"){
            thisFenjuanHtml = "<li class=\"fl everyHeight borRN w100\">分卷</li>";
            thisSelectHtml = "<li  class=\"fl everyHeight borRN w100 layui-form borTN\">"
                            + "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
                            +  "<div class=\"layui-input-block formTi\">"
                            +  "<select name=\"emeil\" id=\"select_kaoshi"+thisSubjectsId+ItemCode+"\" class=\"select_kaoshi"+thisSubjectsId+"\" lay-verify=\"required\" lay-filter=\"fenjuan\">"
                            +     "<option value=\"1\">A</option>"
                            +     "<option value=\"2\">B</option>"
                            + "</select>";
                            +  "</div>"
                            +  "</div>"
                            +  "</li>"
          }else if(thisExamTypeID == "1"){
            thisFenjuanHtml = "";
            thisSelectHtml = "";
          }else if(thisExamTypeID == "3"){
            thisFenjuanHtml = "<li class=\"fl everyHeight borRN w100\">分卷</li>";
            thisSelectHtml = "<li class=\"fl everyHeight borRN w100 layui-form borTN\">"
                            + "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
                            +  "<div class=\"layui-input-block formTi\">"
                            +  "<select id=\"select_kaoshi"+thisSubjectsId+ItemCode+"\" name=\"emeil\" class=\"select_kaoshi"+thisSubjectsId+"\" lay-verify=\"required\" lay-filter=\"\">"
                            +     "<option value=\"1\">A1</option>"
                            +     "<option value=\"3\">A2</option>"
                            +     "<option value=\"2\">B1</option>"
                            +     "<option value=\"4\">B2</option>"
                            + "</select>";
                            +  "</div>"
                            +  "</div>"
                            +  "</li>"
          }
          //操作
          thisButtonHtml = "<p class=\"deleteBut\" id=\"delBth"+thisSubjectsId+ItemCode+"\" name=\""+thisSubjectsId+ItemCode+"\">删除</p>"
                           +"<p class=\"deleteBut\" id=\"addBth"+thisSubjectsId+ItemCode+"\" name=\""+thisSubjectsId+ItemCode+"\">添加小题</p>";
          //添加主体
          $("#content_body").append(
            "<ul class=\"subjectsDetail\" name=\""+thisSubjectsId+"\" id=\"subjectsDetail"+thisSubjectsId+"\">"
            +  "<li class=\"fl subjectsDetailLeft\">"+data.elem.title+"</li>"
            +  "<li class=\"fl subjectsDetailRight\">"
            +    "<ul>"
            +      "<li class=\"everyH\">"
            +        "<ul class=\"everyH\">"
            +          "<li class=\"fl everyHeight borRN w60\">大题</li>"
            +          "<li class=\"fl everyHeight borRN w60\">小题</li>"
            +          "<li class=\"fl everyHeight borRN w470\">考点<span class=\"tishiSpan\">(点击查询<br/>按钮选择)</span></li>"
            +          "<li class=\"fl everyHeight borRN w130\">类型<span class=\"tishiSpan\">(1表示主<br/>观，2表示客观)</span></li>"
            +          "<li class=\"fl everyHeight borRN w130\">满分<span class=\"tishiSpan\">(总和必须<br/>等于总分数)</span></li>"
            +          thisFenjuanHtml
            +          "<li class=\"fl everyHeight borRN w100\">操作</li>"
            +          "<li class=\"fl everyHeight w30 addsub\" id=\"addsub"+thisSubjectsId+"\">添加大题</li>"
            +        "</ul>"
            +      "</li>"
            +      "<div class=\"contentNone\">"
            +        "<li id=\"allBig"+thisSubjectsId+ItemCode+"\">"
            +          "<ul class=\"everyH\">"
            +            "<li class=\"fl everyHeight borRN w60\">"
            +              "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
            +                "<div class=\"layui-input-block formTi\">"
            +                  "<input type=\"text\" name=\"title\" required  lay-verify=\"required\" class=\"layui-input bigNum"+thisSubjectsId+"\" id=\"bigNum"+thisSubjectsId+ItemCode+"\" style=\"width: 35px;\" value=\""+ItemCode+"\">"
            +                "</div>"
            +              "</div>"
            +            "</li>"
            +            "<li class=\"fl everyHeight borRN w60\">"
            +              "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
            +                "<div class=\"layui-input-block formTi\">"
            +                "</div>"
            +              "</div>"
            +            "</li>"
            +            "<li class=\"fl everyHeight w470 layui-form borTN\">"
            +              "<div class=\"layui-form-item form_kaodian borTN borLN borRN\">"
            +                "<div class=\"layui-input-inline formKaodian\">"
            +                  "<input type=\"text\" name=\"title\" required lay-verify=\"required\" class=\"layui-input test_kaoshi testSub"+thisSubjectsId+"\" disabled=\"true\" id=\"test_kaoshi"+thisSubjectsId+ItemCode+"\">"
            +                "</div>"
            +                "<label class=\"addKaodian\" id=\"addKaodian"+thisSubjectsId+ItemCode+"\" name=\""+ItemCode+"\">查询</label>"
            +              "</div>"
            +            "</li>"
            +            "<li class=\"fl everyHeight borRN w130 layui-form borTN\">"
            +              "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
            +                "<div class=\"layui-input-block formTi\">"
            +                  "<input type=\"text\" name=\"title\" required  lay-verify=\"required\" class=\"layui-input type_kaoshi typeSub"+thisSubjectsId+"\" id=\"type_kaoshi"+thisSubjectsId+ItemCode+"\">"
            +                "</div>"
            +              "</div>"
            +            "</li>"
            +            "<li class=\"fl everyHeight borRN w130 layui-form borTN\">"
            +              "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
            +                "<div class=\"layui-input-block formTi\">"
            +                  "<input type=\"text\" name=\"title\" required  lay-verify=\"required\" class=\"layui-input mark_kaoshi markSub"+thisSubjectsId+"\" id=\"mark_kaoshi"+thisSubjectsId+ItemCode+"\">"
            +                "</div>"
            +              "</div>"
            +            "</li>"
            +thisSelectHtml
            +  "<li class=\"fl everyHeight borRN w150 layui-form borTN\">"
            +thisButtonHtml
            +            "</li>"
            +          "</ul>"
            +"<div class=\"isParents"+thisSubjectsId+"\" id=\"isParent"+thisSubjectsId+ItemCode+"\"></div>"
            +        "</li>"
            +        "<li id=\"liSub"+thisSubjectsId+"\">"
            +          "<p class=\"buttonSub\" id=\"buttonSub"+thisSubjectsId+"\" thisCourseDes=\""+thisCourseDes+"\">提交</p>"
            +        "</li>"
            +      "</div>"
            +    "</ul>"
            +  "</li>"
            +"</ul>"
          );
          form.render();
          var smallCode = 0;
          var smallCodes = 0;
          //默认添加小题
          $("#addBth"+thisSubjectsId+ItemCode).click(function(){
            thisSmallSubjectsId = this.getAttribute('name');
            $("#delBth"+thisSmallSubjectsId).css("display","none");
            $("#test_kaoshi"+thisSmallSubjectsId).css("display","none");
            $("#addKaodian"+thisSmallSubjectsId).css("display","none");
            $("#type_kaoshi"+thisSmallSubjectsId).css("display","none");
            $("#mark_kaoshi"+thisSmallSubjectsId).css("display","none");
            smallCode = smallCode+1;
            smallCodes = smallCodes+1;

            thisButtonHtml = "<p class=\"deleteBut\" id=\"delBth"+thisSmallSubjectsId+smallCode+"\" thisSmall=\""+thisSmallSubjectsId+"\" name=\""+thisSmallSubjectsId+smallCode+"\">删除</p>"
            $("#isParent"+this.getAttribute('name')).append(
              "<ul class=\"everyH smallTi\" id=\"allUl"+thisSmallSubjectsId+smallCode+"\">"
               +            "<li class=\"fl everyHeight borRN w60\">"
               +              "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
               +                "<div class=\"layui-input-block formTi\">"
               +                "</div>"
               +              "</div>"
               +            "</li>"
               +"<li class=\"fl everyHeight borRN w60 smallCode"+thisSmallSubjectsId+"\" id=\"smallCode"+thisSmallSubjectsId+smallCode+"\" name=\""+smallCode+"\">("+smallCodes+")</li>"
               +            "<li class=\"fl everyHeight w470 layui-form borTN\">"
               +              "<div class=\"layui-form-item form_kaodian borTN borLN borRN\">"
               +                "<div class=\"layui-input-inline formKaodian\">"
               +                  "<input type=\"text\" name=\"title\" required lay-verify=\"required\" class=\"layui-input test_kaoshi testSub"+thisSubjectsId+"\" disabled=\"true\" id=\"test_kaoshi"+thisSmallSubjectsId+smallCode+"\">"
               +                "</div>"
               +                "<label class=\"addKaodian\" id=\"addKaodian"+thisSmallSubjectsId+smallCode+"\" thisName=\""+thisSmallSubjectsId+smallCode+"\" name=\""+smallCode+"\">查询</label>"
               +              "</div>"
               +            "</li>"
               +            "<li class=\"fl everyHeight borRN w130 layui-form borTN\">"
               +              "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
               +                "<div class=\"layui-input-block formTi\">"
               +                  "<input type=\"text\" name=\"title\" required  lay-verify=\"required\" class=\"layui-input type_kaoshi typeSub"+thisSubjectsId+"\" id=\"type_kaoshi"+thisSmallSubjectsId+smallCode+"\">"
               +                "</div>"
               +              "</div>"
               +            "</li>"
               +            "<li class=\"fl everyHeight borRN w130 layui-form borTN\">"
               +              "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
               +                "<div class=\"layui-input-block formTi\">"
               +                  "<input type=\"text\" name=\"title\" required  lay-verify=\"required\" class=\"layui-input mark_kaoshi markSub"+thisSubjectsId+"\" id=\"mark_kaoshi"+thisSmallSubjectsId+smallCode+"\">"
               +                "</div>"
               +              "</div>"
               +            "</li>"
               +            "<li class=\"fl everyHeight borRN w100 layui-form borTN\">"
               +            "</li>"
               +  "<li class=\"fl everyHeight borRN w130 layui-form borTN\">"
               +thisButtonHtml
               +            "</li>"
               +          "</ul>"
            )
            form.render();
            //默认小题删除
            // console.log(thisSmallSubjectsId)
            // console.log(smallCode)
            $("#delBth"+thisSmallSubjectsId+smallCode).click(function(){
              var delthisID = this.getAttribute('name');
              var thisSmall = this.getAttribute('thisSmall');
              $("#allUl"+delthisID).remove();
              if($(".smallCode"+thisSmall).length == 0){
                $("#delBth"+thisSmall).css("display","inline");
                $("#test_kaoshi"+thisSmall).css("display","block");
                $("#addKaodian"+thisSmall).css("display","inline");
                $("#type_kaoshi"+thisSmall).css("display","block");
                $("#mark_kaoshi"+thisSmall).css("display","block");
                smallCodes = 0;
              }
              for(var i = 0;i < $(".smallCode"+thisSmall).length;i++){
                var a = i+1;
                $(".smallCode"+thisSmall)[i].innerHTML = "("+a+")";
                smallCodes = $(".smallCode"+thisSmall).length;
              }
            })
            //默认小题查询
            $("#addKaodian"+thisSmallSubjectsId+smallCode).click(function(){
              var thisName = this.getAttribute('thisName');
              $.ajax({
        		    type:"get",
        	        url:"http://v1.api.pc.wschool.cn/getkaodianByGLY",
                  async: false,
        	        data:{
                    examId:examId,
                    courseNum:thisSubjectsId
        	        },
        	        success:function(data){
                    layer.prompt({title: '请选择考点', formType: 0}, function(val, index){
                      var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                      nodes = zTree.getChangeCheckedNodes();
                      onCheck();
                      $("#test_kaoshi"+thisName).attr("value",d);
                      $("#test_kaoshi"+thisName).attr("thisID",c);
                      layer.close(index);
                    });
                    $(".layui-layer-input")[0].style.display = "none";
                    $(".layui-layer-input")[0].setAttribute("value","1");
                    $(".layui-layer-input").before("<label for=\"nameID\">请输入查询内容：</label>");
                    $(".layui-layer-input").before("<input type=\"text\" class=\"layui-layer-input\" id=\"nameID\">");
                    $(".layui-layer-input")[0].setAttribute("placeholder","请输入考点名称或首字母(大写)");
                    $("#nameID").after("<ul id=\"treeDemo\" class=\"ztree\"></ul>");
                    if(data.testItemsList){
                      if(data.testItemsList.length > 0){
                        var zNodesA = data.testItemsList;
                        var zNodes = data.testItemsList;
                      }else{
                        var zNodesA = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                        var zNodes = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                      }
                    }else{
                      var zNodesA = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                      var zNodes = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                    }
                    document.getElementById("nameID").oninput = function(){
                      $.ajax({
                        type:"get",
                        async: false,
                        url:"http://v1.api.pc.wschool.cn/getkaodianFuzzySearch",
                        data:{
                          name:this.value,
                          examId:examId,
                          courseNum:thisSubjectsId
                        },
                        success:function(data){
                          zNodes = data.testItemsList;
                          if(zNodes){
                            if(zNodes.length > 0){
                              zNodes.forEach(function(value){
                                value["open"] = true;
                              })
                            }else{
                              zNodes = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                            }
                          }
                          $(document).ready(function(){
                            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                            setCheck();
                            $("#py").bind("change", setCheck);
                            $("#sy").bind("change", setCheck);
                            $("#pn").bind("change", setCheck);
                            $("#sn").bind("change", setCheck);
                          });
                        },
                        error:function(){
                          layer.alert('服务器异常！', {
                            title:  "警告",
                            skin: 'layui-layer-cheng'
                            ,closeBtn: 0
                          })
                        }
                      })
                      if(zNodes){
                        if(zNodes.length > 0){
                        }else{
                          zNodes = zNodesA;
                          $(document).ready(function(){
                            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                            setCheck();
                            $("#py").bind("change", setCheck);
                            $("#sy").bind("change", setCheck);
                            $("#pn").bind("change", setCheck);
                            $("#sn").bind("change", setCheck);
                          });
                        }
                      }else{
                        zNodes = zNodesA;
                        $(document).ready(function(){
                          $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                          setCheck();
                          $("#py").bind("change", setCheck);
                          $("#sy").bind("change", setCheck);
                          $("#pn").bind("change", setCheck);
                          $("#sn").bind("change", setCheck);
                        });
                      }
                    };
                    //ZTree
                    var setting = {
                      check: {
                        enable: true,
                        chkStyle: "radio",
                        radioType: "all"
                      },
                      data: {
                        simpleData: {
                          enable: true
                        }
                      },
                    };
                    var code;
                    function setCheck() {
                      var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                      py = $("#py").attr("checked")? "p":"",
                      sy = $("#sy").attr("checked")? "s":"",
                      pn = $("#pn").attr("checked")? "p":"",
                      sn = $("#sn").attr("checked")? "s":"",
                      type = { "Y":py + sy, "N":pn + sn};
                      showCode('setting.check.radioType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
                    }
                    function showCode(str) {
                      if (!code) code = $("#code");
                      code.empty();
                      code.append("<li>"+str+"</li>");
                    }
                    $(document).ready(function(){
                      $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                      setCheck();
                      $("#py").bind("change", setCheck);
                      $("#sy").bind("change", setCheck);
                      $("#pn").bind("change", setCheck);
                      $("#sn").bind("change", setCheck);
                    });
                    //获取所有子节点的id
                    var c;
                    var d;
                    function onCheck(e,treeId,treeNode){
                      var treeObj=$.fn.zTree.getZTreeObj("treeDemo");
                      var nodes=treeObj.getCheckedNodes(true);
                      c = "";
                      d = "";
                      if(nodes.length > 0){
                        if(nodes[0].isParent!=true){
                            c = nodes[0].id;
                            d = nodes[0].name;
                        }else{
                          layer.alert('请不要选择父节点！', {
                            title:  "警告",
                            skin: 'layui-layer-hong'
                            ,closeBtn: 0
                          })
                        }
                      }
                    }
                 	},
                  error:function(){
                    layer.alert('服务器异常！', {
                      title:  "警告",
                      skin: 'layui-layer-cheng'
                      ,closeBtn: 0
                    })
                  }
        	    });
            })
          })
          //默认删除大题
          $("#delBth"+thisSubjectsId+ItemCode).click(function(){
            var thisBig = this.getAttribute('name');
            $("#allBig"+thisBig).remove();
          })
          //默认考点查询
          $("#addKaodian"+thisSubjectsId+ItemCode).click(function(){
            var thisNum = this.getAttribute('name');
            $.ajax({
      		    type:"get",
      	        url:"http://v1.api.pc.wschool.cn/getkaodianByGLY",
                async: false,
      	        data:{
                  examId:examId,
                  courseNum:thisSubjectsId
      	        },
      	        success:function(data){
                  console.log(data)
                  layer.prompt({title: '请选择考点', formType: 0}, function(val, index){
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                    nodes = zTree.getChangeCheckedNodes();
                    onCheck();
                    $("#test_kaoshi"+thisSubjectsId+thisNum).attr("value",d);
                    $("#test_kaoshi"+thisSubjectsId+thisNum).attr("thisID",c);
                    layer.close(index);
                  });
                  $(".layui-layer-input")[0].style.display = "none";
                  $(".layui-layer-input")[0].setAttribute("value","1");
                  $(".layui-layer-input").before("<label for=\"nameID\">请输入查询内容：</label>");
                  $(".layui-layer-input").before("<input type=\"text\" class=\"layui-layer-input\" id=\"nameID\">");
                  $(".layui-layer-input")[0].setAttribute("placeholder","请输入考点名称或首字母(大写)");
                  $("#nameID").after("<ul id=\"treeDemo\" class=\"ztree\"></ul>");
                  if(data.testItemsList){
                    if(data.testItemsList.length > 0){
                      var zNodesA = data.testItemsList;
                      var zNodes = data.testItemsList;
                    }else{
                      var zNodesA = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                      var zNodes = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                    }
                  }else{
                    var zNodesA = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                    var zNodes = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                  }
                  document.getElementById("nameID").oninput = function(){
                    $.ajax({
                      type:"get",
                      async: false,
                      url:"http://v1.api.pc.wschool.cn/getkaodianFuzzySearch",
                      data:{
                        name:this.value,
                        examId:examId,
                        courseNum:thisSubjectsId
                      },
                      success:function(data){
                        zNodes = data.testItemsList;
                        if(zNodes){
                          if(zNodes.length > 0){
                            zNodes.forEach(function(value){
                              value["open"] = true;
                            })
                          }else{
                            zNodes = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                          }
                        }
                        $(document).ready(function(){
                          $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                          setCheck();
                          $("#py").bind("change", setCheck);
                          $("#sy").bind("change", setCheck);
                          $("#pn").bind("change", setCheck);
                          $("#sn").bind("change", setCheck);
                        });
                      },
                      error:function(){
                        layer.alert('服务器异常！', {
                          title:  "警告",
                          skin: 'layui-layer-cheng'
                          ,closeBtn: 0
                        })
                      }
                    })
                    if(zNodes){
                      if(zNodes.length > 0){
                      }else{
                        zNodes = zNodesA;
                        $(document).ready(function(){
                          $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                          setCheck();
                          $("#py").bind("change", setCheck);
                          $("#sy").bind("change", setCheck);
                          $("#pn").bind("change", setCheck);
                          $("#sn").bind("change", setCheck);
                        });
                      }
                    }else{
                      zNodes = zNodesA;
                      $(document).ready(function(){
                        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                        setCheck();
                        $("#py").bind("change", setCheck);
                        $("#sy").bind("change", setCheck);
                        $("#pn").bind("change", setCheck);
                        $("#sn").bind("change", setCheck);
                      });
                    }
                  };
                  //ZTree
                  var setting = {
                    check: {
                      enable: true,
                      chkStyle: "radio",
                      radioType: "all"
                    },
                    data: {
                      simpleData: {
                        enable: true
                      }
                    },
                  };
                  var code;
                  function setCheck() {
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                    py = $("#py").attr("checked")? "p":"",
                    sy = $("#sy").attr("checked")? "s":"",
                    pn = $("#pn").attr("checked")? "p":"",
                    sn = $("#sn").attr("checked")? "s":"",
                    type = { "Y":py + sy, "N":pn + sn};
                    showCode('setting.check.radioType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
                  }
                  function showCode(str) {
                    if (!code) code = $("#code");
                    code.empty();
                    code.append("<li>"+str+"</li>");
                  }
                  $(document).ready(function(){
                    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                    setCheck();
                    $("#py").bind("change", setCheck);
                    $("#sy").bind("change", setCheck);
                    $("#pn").bind("change", setCheck);
                    $("#sn").bind("change", setCheck);
                  });
                  //获取所有子节点的id
                  var c;
                  var d;
                  function onCheck(e,treeId,treeNode){
                    var treeObj=$.fn.zTree.getZTreeObj("treeDemo");
                    var nodes=treeObj.getCheckedNodes(true);
                    c = "";
                    d = "";
                    if(nodes.length > 0){
                      if(nodes[0].isParent!=true){
                          c = nodes[0].id;
                          d = nodes[0].name;
                      }else{
                        layer.alert('请不要选择父节点！', {
                          title:  "警告",
                          skin: 'layui-layer-hong'
                          ,closeBtn: 0
                        })
                      }
                    }
                  }
               	},
                error:function(){
                  layer.alert('服务器异常！', {
                    title:  "警告",
                    skin: 'layui-layer-cheng'
                    ,closeBtn: 0
                  })
                }
      	    });
          })
          //添加大题
          $("#addsub"+thisSubjectsId).click(function(){
            //获取上面一行的值
            var typeKaoshi;
            var markKaoshi;
            var testKaoshi;
            var testKaoshiID;
            var selectKaoshiVal;
            var bigNum;
            for(var i = ItemCode;i >= 0;i--){
              if($("#type_kaoshi"+thisSubjectsId+i).val() != undefined){
                typeKaoshi = $("#type_kaoshi"+thisSubjectsId+i).val();
                break;
              }
            }
            for(var i = ItemCode;i >= 0;i--){
              if($("#mark_kaoshi"+thisSubjectsId+i).val() != undefined){
                markKaoshi = $("#mark_kaoshi"+thisSubjectsId+i).val();
                break;
              }
            }
            for(var i = ItemCode;i >= 0;i--){
              if($("#test_kaoshi"+thisSubjectsId+i).val() != undefined){
                testKaoshi = $("#test_kaoshi"+thisSubjectsId+i).val();
                testKaoshiID = $("#test_kaoshi"+thisSubjectsId+i).attr('thisid');
                break;
              }
            }
            for(var i = ItemCode;i >= 0;i--){
              if($("#bigNum"+thisSubjectsId+i).val() != undefined){
                bigNum = $("#bigNum"+thisSubjectsId+i).val()-0+1;
                break;
              }
            }
            //继承考卷selected
            for(var i = ItemCode;i >= 0;i--){
              if($("#select_kaoshi"+thisSubjectsId+i).val() != undefined){
                selectKaoshiVal = $("#select_kaoshi"+thisSubjectsId+i).val();
                break;
              }
            }
            // console.log(selectKaoshiVal);
            ItemCode = ItemCode+1;
            var thisOption;
            if(selectKaoshiVal == "2"){
              thisOption = "<option value=\"1\">A</option>"
              +     "<option value=\"2\" selected>B</option>"
            }else{
              thisOption = "<option value=\"1\">A</option>"
              +     "<option value=\"2\">B</option>"
            }
            if(thisExamTypeID == "2"){
              thisFenjuanHtml = "<li class=\"fl everyHeight borRN w100\">分卷</li>";
              thisSelectHtml = "<li class=\"fl everyHeight borRN w100 layui-form borTN\">"
                              + "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
                              +  "<div class=\"layui-input-block formTi\">"
                              +  "<select id=\"select_kaoshi"+thisSubjectsId+ItemCode+"\" name=\"emeil\" class=\"select_kaoshi"+thisSubjectsId+"\" lay-verify=\"required\" lay-filter=\"fenjuan\">"
                              +thisOption
                              + "</select>";
                              +  "</div>"
                              +  "</div>"
                              +  "</li>"
            }else if(thisExamTypeID == "1"){
              thisFenjuanHtml = "";
              thisSelectHtml = "";
            }else if(thisExamTypeID == "3"){
              thisFenjuanHtml = "<li class=\"fl everyHeight borRN w100\">分卷</li>";
              thisSelectHtml = "<li class=\"fl everyHeight borRN w100 layui-form borTN\">"
                              + "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
                              +  "<div class=\"layui-input-block formTi\">"
                              +  "<select id=\"select_kaoshi"+thisSubjectsId+ItemCode+"\" name=\"emeil\" class=\"select_kaoshi"+thisSubjectsId+"\" lay-verify=\"required\" lay-filter=\"\">"
                              +     "<option value=\"1\">A1</option>"
                              +     "<option value=\"3\">A2</option>"
                              +     "<option value=\"2\">B1</option>"
                              +     "<option value=\"4\">B2</option>"
                              + "</select>";
                              +  "</div>"
                              +  "</div>"
                              +  "</li>"
            }
            thisButtonHtml = "<p class=\"deleteBut\" id=\"delBth"+thisSubjectsId+ItemCode+"\" name=\""+thisSubjectsId+ItemCode+"\">删除</p>"
                            +"<p class=\"deleteBut\" id=\"addBth"+thisSubjectsId+ItemCode+"\" name=\""+thisSubjectsId+ItemCode+"\">添加小题</p>"
            $("#liSub"+thisSubjectsId).before(
              "<li id=\"allBig"+thisSubjectsId+ItemCode+"\">"
              +  "<ul class=\"everyH\">"
              +    "<li class=\"fl everyHeight borRN w60\">"
              +      "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
              +        "<div class=\"layui-input-block formTi\">"
              +           "<input type=\"text\" name=\"title\" required  lay-verify=\"required\" class=\"layui-input bigNum"+thisSubjectsId+"\" id=\"bigNum"+thisSubjectsId+ItemCode+"\" style=\"width: 35px;\" value=\""+bigNum+"\">"
              +        "</div>"
              +      "</div>"
              +    "</li>"
              +    "<li class=\"fl everyHeight borRN w60\">"
              +       "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
              +          "<div class=\"layui-input-block formTi\">"
              +          "</div>"
              +       "</div>"
              +    "</li>"
              +    "<li class=\"fl everyHeight w470 layui-form borTN\">"
              +      "<div class=\"layui-form-item form_kaodian borTN borLN borRN\">"
              +        "<div class=\"layui-input-inline formKaodian\">"
              +          "<input type=\"text\" name=\"title\" value=\""+testKaoshi+"\" required  lay-verify=\"required\" class=\"layui-input test_kaoshi testSub"+thisSubjectsId+"\" disabled=\"true\" id=\"test_kaoshi"+thisSubjectsId+ItemCode+"\" thisid=\""+testKaoshiID+"\">"
              +        "</div>"
              +        "<label class=\"addKaodian\" id=\"addKaodian"+thisSubjectsId+ItemCode+"\" name=\""+ItemCode+"\">查询</label>"
              +      "</div>"
              +    "</li>"
              +    "<li class=\"fl everyHeight borRN w130 layui-form borTN\">"
              +      "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
              +        "<div class=\"layui-input-block formTi\">"
              +          "<input type=\"text\" name=\"title\" value=\""+typeKaoshi+"\" required  lay-verify=\"required\" class=\"layui-input type_kaoshi typeSub"+thisSubjectsId+"\" id=\"type_kaoshi"+thisSubjectsId+ItemCode+"\">"
              +        "</div>"
              +      "</div>"
              +    "</li>"
              +    "<li class=\"fl everyHeight borRN w130 layui-form borTN\">"
              +      "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
              +        "<div class=\"layui-input-block formTi\">"
              +          "<input type=\"text\" name=\"title\" value=\""+markKaoshi+"\" required  lay-verify=\"required\" class=\"layui-input mark_kaoshi markSub"+thisSubjectsId+"\" id=\"mark_kaoshi"+thisSubjectsId+ItemCode+"\">"
              +        "</div>"
              +      "</div>"
              +    "</li>"
              +thisSelectHtml
              +  "<li class=\"fl everyHeight borRN w150 layui-form borTN\">"
              +thisButtonHtml
              +            "</li>"
              +  "</ul>"
              +"<div class=\"isParents"+thisSubjectsId+"\" id=\"isParent"+thisSubjectsId+ItemCode+"\"></div>"
              +"</li>"
            );
            form.render();
            var smallCode = 0;
            var smallCodes = 0;
            //添加小题
            $("#addBth"+thisSubjectsId+ItemCode).click(function(){
              thisSmallSubjectsId = this.getAttribute('name');
              $("#delBth"+thisSmallSubjectsId).css("display","none");
              $("#test_kaoshi"+thisSmallSubjectsId).css("display","none");
              $("#addKaodian"+thisSmallSubjectsId).css("display","none");
              $("#type_kaoshi"+thisSmallSubjectsId).css("display","none");
              $("#mark_kaoshi"+thisSmallSubjectsId).css("display","none");
              smallCode = smallCode+1;
              smallCodes = smallCodes+1;

              thisButtonHtml = "<p class=\"deleteBut\" id=\"delBth"+thisSmallSubjectsId+smallCode+"\" thisSmall=\""+thisSmallSubjectsId+"\" name=\""+thisSmallSubjectsId+smallCode+"\">删除</p>"
              $("#isParent"+this.getAttribute('name')).append(
                "<ul class=\"everyH smallTi\" id=\"allSmall"+thisSmallSubjectsId+smallCode+"\">"
                 +            "<li class=\"fl everyHeight borRN w60\">"
                 +              "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
                 +                "<div class=\"layui-input-block formTi\">"
                 +                "</div>"
                 +              "</div>"
                 +            "</li>"
                 +"<li class=\"fl everyHeight borRN w60 smallCode"+thisSmallSubjectsId+"\" id=\"smallCode"+thisSmallSubjectsId+smallCode+"\" name=\""+smallCode+"\">("+smallCodes+")</li>"
                 +            "<li class=\"fl everyHeight w470 layui-form borTN\">"
                 +              "<div class=\"layui-form-item form_kaodian borTN borLN borRN\">"
                 +                "<div class=\"layui-input-inline formKaodian\">"
                 +                  "<input type=\"text\" name=\"title\" required lay-verify=\"required\" class=\"layui-input test_kaoshi testSub"+thisSubjectsId+"\" disabled=\"true\" id=\"test_kaoshi"+thisSmallSubjectsId+smallCode+"\">"
                 +                "</div>"
                 +                "<label class=\"addKaodian\" id=\"addKaodian"+thisSmallSubjectsId+smallCode+"\" thisName=\""+thisSmallSubjectsId+smallCode+"\" name=\""+smallCode+"\">查询</label>"
                 +              "</div>"
                 +            "</li>"
                 +            "<li class=\"fl everyHeight borRN w130 layui-form borTN\">"
                 +              "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
                 +                "<div class=\"layui-input-block formTi\">"
                 +                  "<input type=\"text\" name=\"title\" required  lay-verify=\"required\" class=\"layui-input type_kaoshi typeSub"+thisSubjectsId+"\" id=\"type_kaoshi"+thisSmallSubjectsId+smallCode+"\">"
                 +                "</div>"
                 +              "</div>"
                 +            "</li>"
                 +            "<li class=\"fl everyHeight borRN w130 layui-form borTN\">"
                 +              "<div class=\"layui-form-item form_Ti borTN borLN borRN\">"
                 +                "<div class=\"layui-input-block formTi\">"
                 +                  "<input type=\"text\" name=\"title\" required  lay-verify=\"required\" class=\"layui-input mark_kaoshi markSub"+thisSubjectsId+"\" id=\"mark_kaoshi"+thisSmallSubjectsId+smallCode+"\">"
                 +                "</div>"
                 +              "</div>"
                 +            "</li>"
                 +            "<li class=\"fl everyHeight borRN w100 layui-form borTN\">"
                 +            "</li>"
                 +  "<li class=\"fl everyHeight borRN w150 layui-form borTN\">"
                 +thisButtonHtml
                 +            "</li>"
                 +          "</ul>"
              )
              form.render();
              //小题删除
              // console.log(thisSmallSubjectsId)
              // console.log(smallCode)
              $("#delBth"+thisSmallSubjectsId+smallCode).click(function(){
                var delthisID = this.getAttribute('name');
                var thisSmall = this.getAttribute('thisSmall');
                $("#allSmall"+delthisID).remove();
                if($(".smallCode"+thisSmall).length == 0){
                  $("#delBth"+thisSmall).css("display","inline");
                  $("#test_kaoshi"+thisSmall).css("display","block");
                  $("#addKaodian"+thisSmall).css("display","inline");
                  $("#type_kaoshi"+thisSmall).css("display","block");
                  $("#mark_kaoshi"+thisSmall).css("display","block");
                  smallCodes = 0;
                }
                for(var i = 0;i < $(".smallCode"+thisSmall).length;i++){
                  var a = i+1;
                  $(".smallCode"+thisSmall)[i].innerHTML = "("+a+")";
                  smallCodes = $(".smallCode"+thisSmall).length;
                }
              })
              //小题查询
              $("#addKaodian"+thisSmallSubjectsId+smallCode).click(function(){
                var thisName = this.getAttribute('thisName');
                $.ajax({
          		    type:"get",
          	        url:"http://v1.api.pc.wschool.cn/getkaodianByGLY",
                    async: false,
          	        data:{
                      examId:examId,
                      courseNum:thisSubjectsId
          	        },
          	        success:function(data){
                      layer.prompt({title: '请选择考点', formType: 0}, function(val, index){
                        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                        nodes = zTree.getChangeCheckedNodes();
                        onCheck();
                        $("#test_kaoshi"+thisName).attr("value",d);
                        $("#test_kaoshi"+thisName).attr("thisID",c);
                        layer.close(index);
                      });
                      $(".layui-layer-input")[0].style.display = "none";
                      $(".layui-layer-input")[0].setAttribute("value","1");
                      $(".layui-layer-input").before("<label for=\"nameID\">请输入查询内容：</label>");
                      $(".layui-layer-input").before("<input type=\"text\" class=\"layui-layer-input\" id=\"nameID\">");
                      $(".layui-layer-input")[0].setAttribute("placeholder","请输入考点名称或首字母(大写)");
                      $("#nameID").after("<ul id=\"treeDemo\" class=\"ztree\"></ul>");
                      if(data.testItemsList){
                        if(data.testItemsList.length > 0){
                          var zNodesA = data.testItemsList;
                          var zNodes = data.testItemsList;
                        }else{
                          var zNodesA = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                          var zNodes = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                        }
                      }else{
                        var zNodesA = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                        var zNodes = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                      }
                      document.getElementById("nameID").oninput = function(){
                        $.ajax({
                          type:"get",
                          async: false,
                          url:"http://v1.api.pc.wschool.cn/getkaodianFuzzySearch",
                          data:{
                            name:this.value,
                            examId:examId,
                            courseNum:thisSubjectsId
                          },
                          success:function(data){
                            zNodes = data.testItemsList;
                            if(zNodes){
                              if(zNodes.length > 0){
                                zNodes.forEach(function(value){
                                  value["open"] = true;
                                })
                              }else{
                                zNodes = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                              }
                            }
                            $(document).ready(function(){
                              $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                              setCheck();
                              $("#py").bind("change", setCheck);
                              $("#sy").bind("change", setCheck);
                              $("#pn").bind("change", setCheck);
                              $("#sn").bind("change", setCheck);
                            });
                          },
                          error:function(){
                            layer.alert('服务器异常！', {
                              title:  "警告",
                              skin: 'layui-layer-cheng'
                              ,closeBtn: 0
                            })
                          }
                        })
                        if(zNodes){
                          if(zNodes.length > 0){
                          }else{
                            zNodes = zNodesA;
                            $(document).ready(function(){
                              $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                              setCheck();
                              $("#py").bind("change", setCheck);
                              $("#sy").bind("change", setCheck);
                              $("#pn").bind("change", setCheck);
                              $("#sn").bind("change", setCheck);
                            });
                          }
                        }else{
                          zNodes = zNodesA;
                          $(document).ready(function(){
                            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                            setCheck();
                            $("#py").bind("change", setCheck);
                            $("#sy").bind("change", setCheck);
                            $("#pn").bind("change", setCheck);
                            $("#sn").bind("change", setCheck);
                          });
                        }
                      };
                      //ZTree
                      var setting = {
                        check: {
                          enable: true,
                          chkStyle: "radio",
                          radioType: "all"
                        },
                        data: {
                          simpleData: {
                            enable: true
                          }
                        },
                      };
                      var code;
                      function setCheck() {
                        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                        py = $("#py").attr("checked")? "p":"",
                        sy = $("#sy").attr("checked")? "s":"",
                        pn = $("#pn").attr("checked")? "p":"",
                        sn = $("#sn").attr("checked")? "s":"",
                        type = { "Y":py + sy, "N":pn + sn};
                        showCode('setting.check.radioType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
                      }
                      function showCode(str) {
                        if (!code) code = $("#code");
                        code.empty();
                        code.append("<li>"+str+"</li>");
                      }
                      $(document).ready(function(){
                        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                        setCheck();
                        $("#py").bind("change", setCheck);
                        $("#sy").bind("change", setCheck);
                        $("#pn").bind("change", setCheck);
                        $("#sn").bind("change", setCheck);
                      });
                      //获取所有子节点的id
                      var c;
                      var d;
                      function onCheck(e,treeId,treeNode){
                        var treeObj=$.fn.zTree.getZTreeObj("treeDemo");
                        var nodes=treeObj.getCheckedNodes(true);
                        c = "";
                        d = "";
                        if(nodes.length > 0){
                          if(nodes[0].isParent!=true){
                              c = nodes[0].id;
                              d = nodes[0].name;
                          }else{
                            layer.alert('请不要选择父节点！', {
                              title:  "警告",
                              skin: 'layui-layer-hong'
                              ,closeBtn: 0
                            })
                          }
                        }
                      }
                   	},
                    error:function(){
                      layer.alert('服务器异常！', {
                        title:  "警告",
                        skin: 'layui-layer-cheng'
                        ,closeBtn: 0
                      })
                    }
          	    });
              })
            })
            //删除大题
            $("#delBth"+thisSubjectsId+ItemCode).click(function(){
              var thisBig = this.getAttribute('name');
              $("#allBig"+thisBig).remove();
            })
            //考点查询
            $("#addKaodian"+thisSubjectsId+ItemCode).click(function(){
              var thisNum = this.getAttribute('name');
              $.ajax({
        		    type:"get",
        	        url:"http://v1.api.pc.wschool.cn/getkaodianByGLY",
                  async: false,
        	        data:{
                    examId:examId,
                    courseNum:thisSubjectsId
        	        },
        	        success:function(data){
                    layer.prompt({title: '请输入修改信息', formType: 0}, function(val, index){
                      var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                      nodes = zTree.getChangeCheckedNodes();
                      onCheck();
                      $("#test_kaoshi"+thisSubjectsId+thisNum).attr("value",d);
                      $("#test_kaoshi"+thisSubjectsId+thisNum).attr("thisID",c);
                      layer.close(index);
                    });
                    $(".layui-layer-input")[0].style.display = "none";
                    $(".layui-layer-input")[0].setAttribute("value","1");
                    $(".layui-layer-input").before("<label for=\"nameID\">请输入查询内容：</label>");
                    $(".layui-layer-input").before("<input type=\"text\" class=\"layui-layer-input\" id=\"nameID\">");
                    $(".layui-layer-input")[0].setAttribute("placeholder","请输入考点名称或首字母(大写)");
                    $("#nameID").after("<ul id=\"treeDemo\" class=\"ztree\"></ul>");
                    if(data.testItemsList){
                      if(data.testItemsList.length > 0){
                        var zNodesA = data.testItemsList;
                        var zNodes = data.testItemsList;
                      }else{
                        var zNodesA = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                        var zNodes = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                      }
                    }else{
                      var zNodesA = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                      var zNodes = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                    }
                    document.getElementById("nameID").oninput = function(){
                      $.ajax({
                        type:"get",
                        async: false,
                        url:"http://v1.api.pc.wschool.cn/getkaodianFuzzySearch",
                        data:{
                          name:this.value,
                          examId:examId,
                          courseNum:thisSubjectsId
                        },
                        success:function(data){
                          zNodes = data.testItemsList;
                          if(zNodes){
                            if(zNodes.length > 0){
                              zNodes.forEach(function(value){
                                value["open"] = true;
                              })
                            }else{
                              zNodes = [{id:2,pId:1,name:"暂无数据",nocheck:true}];
                            }
                          }
                          $(document).ready(function(){
                            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                            setCheck();
                            $("#py").bind("change", setCheck);
                            $("#sy").bind("change", setCheck);
                            $("#pn").bind("change", setCheck);
                            $("#sn").bind("change", setCheck);
                          });
                        },
                        error:function(){
                          layer.alert('服务器异常！', {
                            title:  "警告",
                            skin: 'layui-layer-cheng'
                            ,closeBtn: 0
                          })
                        }
                      })
                      if(zNodes){
                        if(zNodes.length > 0){
                        }else{
                          zNodes = zNodesA;
                          $(document).ready(function(){
                            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                            setCheck();
                            $("#py").bind("change", setCheck);
                            $("#sy").bind("change", setCheck);
                            $("#pn").bind("change", setCheck);
                            $("#sn").bind("change", setCheck);
                          });
                        }
                      }else{
                        zNodes = zNodesA;
                        $(document).ready(function(){
                          $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                          setCheck();
                          $("#py").bind("change", setCheck);
                          $("#sy").bind("change", setCheck);
                          $("#pn").bind("change", setCheck);
                          $("#sn").bind("change", setCheck);
                        });
                      }
                    };
                    //ZTree
                    var setting = {
                      check: {
                        enable: true,
                        chkStyle: "radio",
                        radioType: "all"
                      },
                      data: {
                        simpleData: {
                          enable: true
                        }
                      },
                    };
                    var code;
                    function setCheck() {
                      var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                      py = $("#py").attr("checked")? "p":"",
                      sy = $("#sy").attr("checked")? "s":"",
                      pn = $("#pn").attr("checked")? "p":"",
                      sn = $("#sn").attr("checked")? "s":"",
                      type = { "Y":py + sy, "N":pn + sn};
                      // zTree.setting.check.chkboxType = type;
                      showCode('setting.check.radioType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
                    }
                    function showCode(str) {
                      if (!code) code = $("#code");
                      code.empty();
                      code.append("<li>"+str+"</li>");
                    }
                    $(document).ready(function(){
                      $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                      setCheck();
                      $("#py").bind("change", setCheck);
                      $("#sy").bind("change", setCheck);
                      $("#pn").bind("change", setCheck);
                      $("#sn").bind("change", setCheck);
                    });
                    //获取所有子节点的id
                    var c;
                    var d;
                    function onCheck(e,treeId,treeNode){
                      var treeObj=$.fn.zTree.getZTreeObj("treeDemo");
                      var nodes=treeObj.getCheckedNodes(true);
                      c = "";
                      d = "";
                      if(nodes.length > 0){
                        if(nodes[0].isParent!=true){
                            c = nodes[0].id;
                            d = nodes[0].name;
                        }else{
                          layer.alert('请不要选择父节点！', {
                            title:  "警告",
                            skin: 'layui-layer-hong'
                            ,closeBtn: 0
                          })
                        }
                      }
                    }
                 	},
                  error:function(){
                    layer.alert('服务器异常！', {
                      title:  "警告",
                      skin: 'layui-layer-cheng'
                      ,closeBtn: 0
                    })
                  }
        	    });
            })
          })
          //提交保存
          $("#buttonSub"+thisSubjectsId).click(function(){

            //满分
            var thisCourseDes = this.getAttribute('thisCourseDes')-0;
            // console.log(examId);
            // console.log(thisSubjectsId);
            // console.log(userId);
            var testType = "";
            var scoreStr = "";
            var kaodianIDStr = "";
            var smallNumsStr = "";
            var selectKaoshiStr = "";
            var allScope = 0;
            var scoreStrNow = "";
            var testTypeNone = "";
            var scoreStrNone = "";
            var bigNums = "";
            var flag_testType = false;
            var flag_scoreStr = false;
            var flag_kaodianIDStr = false;
            var flag_bigNum = false;

            //获取分卷类型
            for(var i = 0;i < $(".select_kaoshi"+thisSubjectsId).length;i++){
              if($(".isParents"+thisSubjectsId)[i].childNodes.length == 0){
                selectKaoshiStr += $(".select_kaoshi"+thisSubjectsId)[i].value+"#";
              }else{
                for(var j = 0;j < $(".isParents"+thisSubjectsId)[i].childNodes.length;j++){
                  selectKaoshiStr += $(".select_kaoshi"+thisSubjectsId)[i].value+"#";
                }
              }
            }
            //得到小题数量的集合
            for(var i = 0;i < $(".isParents"+thisSubjectsId).length;i++){
              smallNumsStr += $(".isParents"+thisSubjectsId)[i].childNodes.length+"#";
            }
            //判断分数是否符合要求
            for(var i = 0;i < $(".markSub"+thisSubjectsId).length;i++){
              if($(".markSub"+thisSubjectsId)[i].style.display == "none"){
              }else{
                scoreStrNow += $(".markSub"+thisSubjectsId)[i].value*100+"#";
                scoreStrNone += $(".markSub"+thisSubjectsId)[i].value;
                var nowScope = $(".markSub"+thisSubjectsId)[i].value-0;
                allScope = allScope+nowScope;
              }
            };
            if(scoreStrNone == ""){
              scoreStr = scoreStrNone;
              flag_scoreStr = true;
            }else{
              if(allScope == thisCourseDes){
                scoreStr = scoreStrNow;
                flag_scoreStr = true;
              }else{
                layer.alert('输入的分数总和不等于总分数！', {
                  title:  "警告",
                  skin: 'layui-layer-hong'
                  ,closeBtn: 0
                });
                scoreStr = "";
                flag_scoreStr = false;
              }
            }
            //判断考题类型是否违规
            for(var i = 0;i < $(".typeSub"+thisSubjectsId).length;i++){
              testTypeNone += $(".typeSub"+thisSubjectsId)[i].value;
            };
            if(testTypeNone == ""){
              testType == testTypeNone;
              flag_testType = true;
            }else{
              for(var i = 0;i < $(".typeSub"+thisSubjectsId).length;i++){
                if($(".typeSub"+thisSubjectsId)[i].style.display == "none"){
                }else{
                  if($(".typeSub"+thisSubjectsId)[i].value == "1" || $(".typeSub"+thisSubjectsId)[i].value == "2"){
                    testType += $(".typeSub"+thisSubjectsId)[i].value+"#";
                    flag_testType = true;
                  }else{
                    layer.alert('请检查输入的考题类型是否正确！', {
                      title:  "警告",
                      skin: 'layui-layer-hong'
                      ,closeBtn: 0
                    })
                    testType = "";
                    flag_testType = false;
                    break;
                  }
                }
              }
            }
            //判断考点
            for(var i = 0;i < $(".testSub"+thisSubjectsId).length;i++){
              var thisKaodianID = $(".testSub"+thisSubjectsId)[i].getAttribute('thisid');
              if($(".testSub"+thisSubjectsId)[i].style.display == "none"){

              }else{
                if(!thisKaodianID){
                  layer.alert('考点不能为空！', {
                    title:  "警告",
                    skin: 'layui-layer-hong'
                    ,closeBtn: 0
                  });
                  kaodianIDStr = "";
                  flag_kaodianIDStr = false;
                  break;
                }else{
                  if(thisKaodianID == "undefined"){
                    layer.alert('考点不能为空！', {
                      title:  "警告",
                      skin: 'layui-layer-hong'
                      ,closeBtn: 0
                    });
                    kaodianIDStr = "";
                    flag_kaodianIDStr = false;
                    break;
                  }else{
                    kaodianIDStr += thisKaodianID+"#";
                    flag_kaodianIDStr = true;
                  }
                }
              }
            }
            //判断大题题号顺序是否有误
            var bighNumsNone = false;
            var thisBiglength = $(".bigNum"+thisSubjectsId).length-1;
            for(var i = 0;i < $(".bigNum"+thisSubjectsId).length;i++){
              if(i+1 < $(".bigNum"+thisSubjectsId).length){
                if($(".bigNum"+thisSubjectsId)[i].value.length == 0 || $(".bigNum"+thisSubjectsId)[i+1].value.length == 0){
                  bigNums = "";
                  bighNumsNone = true;
                  layer.alert('输入的大题号不能为空！', {
                    title:  "警告",
                    skin: 'layui-layer-hong'
                    ,closeBtn: 0
                  });
                  break;
                }else{
                  if($(".bigNum"+thisSubjectsId)[i].value-0 >= $(".bigNum"+thisSubjectsId)[i+1].value-0){
                    bigNums = "";
                    bighNumsNone = true;
                    layer.alert('输入的大题号出错！', {
                      title:  "警告",
                      skin: 'layui-layer-hong'
                      ,closeBtn: 0
                    });
                    break;
                  }else{
                    bigNums += $(".bigNum"+thisSubjectsId)[i].value+"#";
                  }
                }
              }
            }
            if(bighNumsNone == false){
              bigNums = bigNums + $(".bigNum"+thisSubjectsId)[thisBiglength].value+"#";
              flag_bigNum = true;
            }
            // console.log(flag_bigNum)
            // console.log("大题"+bigNums);
            // console.log("小题"+smallNumsStr);
            // console.log("分卷"+selectKaoshiStr);
            // console.log("类型"+testType);
            // console.log("分数"+scoreStr);
            // console.log("考点"+kaodianIDStr);
            if(flag_testType && flag_scoreStr && flag_kaodianIDStr){
              $.ajax({
                type:"get",
                async: false,
                url:"http://v1.api.pc.wschool.cn/saveExamDetail",
                data:{
                  examId:examId,
                  courseNum:thisSubjectsId,
                  testNumStr:bigNums,
                  testMinNumStr:smallNumsStr,
                  testABStr:selectKaoshiStr,
                  testTypeStr:testType,
                  scoreStr:scoreStr,
                  kaodianIDStr:kaodianIDStr,
                  inputer:userId
                },
                success:function(data){
                  layer.alert(data.return_msg, {
                    title:  "提示",
                    skin: 'layui-layer-hong'
                    ,closeBtn: 0
                  });
                }
              })
            }
          })
        }
      }
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
  //获取学期
  var examId;
  var pretermitTerm;
  var pretermitExam;
  var pretermitSubjects;
  var term_str = "";
  var exam_str = "";
  var subjects_str = "";
  var showTerm = function(){
    term_str = "";
		$.ajax({
		    type:"get",
	        url:"http://v1.api.pc.wschool.cn/getTermByGLY",
          async: false,
	        data:{

	        },
	        success:function(data){
            if(data.termList){
              if(data.termList.length == 0){
                term_str = "<option value=\"1\">暂无数据</option>";
              }else{
                pretermitTerm = data.termList[0].termId;
                data.termList.forEach(function(value){
                  term_str += "<option value="+value.termId+">"+value.termName+"</option>";
                })
              }
            }
            $("#trem").html(term_str);
         	},
          error:function(){
            layer.alert('服务器异常！', {
              title:  "警告",
              skin: 'layui-layer-cheng'
              ,closeBtn: 0
            })
          }
	    });
	};
  showTerm();
  //获取考试
  var showExam = function(userId,termId){
    exam_str = "";
    subjects_str = "";
    $("#formSubjects").html(subjects_str);
    $("#content_body").html("");
    $.ajax({
      type:"get",
        url:"http://v1.api.pc.wschool.cn/getExamByGLY",
        async: false,
        data:{
          userId:userId,
          termId:termId
        },
        success:function(data){
          if(data.examList){
            if(data.examList.length == 0){
              exam_str = "<option value=\"1\">暂无数据</option>";
            }else{
              pretermitExam = data.examList[0].examId;
              examId = data.examList[0].examId;
              data.examList.forEach(function(value){
                exam_str += "<option value="+value.examId+">"+value.examName+"</option>";
              })
            }
          }
          $("#exam").html(exam_str);
        },
        error:function(){
          layer.alert('服务器异常！', {
            title:  "警告",
            skin: 'layui-layer-cheng'
            ,closeBtn: 0
          })
        }
    });
  }
  showExam(userId,pretermitTerm);
  //获取科目
  var showSubjects = function(examId){
    $("#content_body").html("");
    subjects_str = "";
    $.ajax({
      type:"get",
        url:"http://v1.api.pc.wschool.cn/getExamCourseByGLY",
        async: false,
        data:{
          examId:examId,
        },
        success:function(data){
          if(data.courseList){
            if(data.courseList.length == 0){
              subjects_str = "<option value=\"1\">暂无数据</option>";
            }else{
              data.courseList.forEach(function(value){
                subjects_str += "<input type=\"checkbox\" typeID="+value.examTypeId+" title="+value.courseName+" value="+value.courseNum+" name=\""+value.courseDes+"\" lay-filter=\"subjects\">";
              })
            }
          }
          $("#formSubjects").html(subjects_str);
          setTimeout(function(){
            var thisHeight = $("#form_subjects")[0].offsetHeight-18;
            console.log(thisHeight)
            $("#formLabelSubjects").css("line-height",thisHeight+"px");
          },100)
        },
        error:function(){
          layer.alert('服务器异常！', {
            title:  "警告",
            skin: 'layui-layer-cheng'
            ,closeBtn: 0
          })
        }
    });
  }
  showSubjects(pretermitExam);

}())
