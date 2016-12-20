(function(){
  //layui
  layui.use(['element','form'], function(){
    var element = layui.element();
    var form = layui.form();
    form.on('submit(formDemo)', function(data){
      layer.msg(JSON.stringify(data.field));
      return false;
    });
    //监听select事件
    form.on('select(stage)', function(data){
      // console.log(data.value); //得到被选中的值
    });
    form.on('select(course)', function(data){
      // console.log(data.value); //得到被选中的值
    });
  });
  //
  //获取id
	// window.location.replace("#?id="+"131375");
	var userId;

	(function GetQueryString(){
	    var r = window.location.href;
	    var s=r.indexOf("=");
		var t=r.substring(s+1);// t就是?后面的东西了
	    userId = t;
	}())
  //课程显示
  var course_str = "";
  var showCourse = function(){
		$.ajax({
		    type:"get",
	        url:"http://192.168.1.117:8080/getCourse",
          async: false,
	        data:{

	        },
	        success:function(data){
            if(data.courseList){
              data.courseList.forEach(function(value){
                course_str += "<option value="+value.courseNum+">"+value.courseName+"</option>";
              })
            }
            $("#course").html(course_str);
         	},
          error:function(){
            layer.alert('服务器异常！', {
              title:  "警告",
              skin: 'layui-layer-hong'
              ,closeBtn: 0
            })
          }
	    });
	};
  showCourse();
  var stopBubble = function(e){
　　if(e&&e.stopPropagation){//非IE
　　  e.stopPropagation();
　　}
　　else{//IE
　　  window.event.cancelBubble=true;
　　}
　}
  //查询事件
  var courseTypeID;
  var courseNum;
  var parentShow = function(){
    $("#content_body").html("");
    courseTypeID = $("#stage").val();
    courseNum = $("#course").val();
    $.ajax({
	    type:"get",
        url:"http://192.168.1.117:8080/getRootKaodian",
        async: false,
        data:{
          courseTypeID:courseTypeID,
          courseNum:courseNum
        },
        success:function(data){
          if(data.kaodianList){
            if(data.kaodianList.length > 0){
              courseTypeID = data.kaodianList[0].courseTypeID;
              courseNum = data.kaodianList[0].courseNum;
            }else if(data.kaodianList.length == 0){
              layer.alert('暂无数据,请点击添加按钮增加根类', {
                title:  "提示",
                skin: 'layui-layer-hong'
                ,closeBtn: 0
              })
            }
            data.kaodianList.forEach(function(value){
              $("#content_body").append("<ul class=\"cb oh\" id=\"parent"+value.id+"\" name=\""+value.id+"\" flag=\"false\">"
              +"<li class=\"fl\">"+value.name+"</li>"
              +"<div class=\"fr frDiv\">"
              +"<li class=\"fl order\">"+value.sortID+"</li>"
              +"<li class=\"fl parentAdd\" id=\"parentAdd"+value.id+"\" name=\""+value.id+"\">添加子类</li>"
              +"<li class=\"fl parentUpdate\" id=\"parentUpdate"+value.id+"\" name=\""+value.id+"\" sort=\""+value.sortID+"\">修改</li>"
              +"<li class=\"fl parentDel\" id=\"parentDel"+value.id+"\" name=\""+value.id+"\">删除</li>"
              +"</div>"
              +"</ul>"
              +"<div class=\"xian\"></div>"
              +"<div class=\"secondary secondaryParent\" id=\"content_body"+value.id+"\"></div>"
              );
              $("#parent"+value.id)[0].onmouseover = function(){
                $("#parent"+value.id)[0].style.backgroundColor = "#C2E4FC";
              };
              $("#parent"+value.id)[0].onmouseout = function(){
                $("#parent"+value.id)[0].style.backgroundColor = "#EFF8FF";
              };
              var thisID;
              var that;
              $("#parent"+value.id).click(function(){
                thisID = value.id;
                that = $("#parent"+value.id);
                func(thisID,that);
              })
              //添加事件
              $("#parentAdd"+value.id).click(function(){
                stopBubble($("#parentAdd"+value.id))
                thisID = value.id;
                that = $("#parent"+value.id);
                layer.prompt({title: '请输入考点名称', formType: 0}, function(val, index){
                  var pid = value.id;
                  $.ajax({
                    type:"get",
                      url:"http://192.168.1.117:8080/addKaodian",
                      data:{
                        courseTypeID:courseTypeID,
                        courseNum:courseNum,
                        name:val,
                        pid:pid,
                        userId:userId
                      },
                      success:function(data){
                        funcB(thisID,that);
                      },
                      error:function(){
                        layer.alert('服务器异常！', {
                          title:  "警告",
                          skin: 'layui-layer-hong'
                          ,closeBtn: 0
                        })
                      }
                  })
                  layer.close(index);
                });
              });
              //修改事件
              $("#parentUpdate"+value.id).click(function(){
                stopBubble($("#parentAdd"+value.id))
                thisID = value.id;
                that = $("#parent"+value.id);
                layer.prompt({title: '请输入修改信息', formType: 0}, function(val, index){
                  var pid = value.id;
                  if(/^[(-?\d+\.\d+)|(-?\d+)|(-?\.\d+)]+$/.test($("#sortID")[0].value)){
                    $.ajax({
                      type:"get",
                        url:"http://192.168.1.117:8080/modifyKaodian",
                        data:{
                          id:pid,
                          name:val,
                          sortId:$("#sortID")[0].value,
                          userId:userId
                        },
                        success:function(data){
                          if(value.pId == 0){
                            parentShow();
                          }else{
                            funcB(thisID,that);
                          }
                          layer.close(index)
                        },
                        error:function(){
                          layer.alert('服务器异常！', {
                            title:  "警告",
                            skin: 'layui-layer-hong'
                            ,closeBtn: 0
                          })
                        }
                    })
                    layer.close(index);
                  }else{
                    layer.tips('排序请输入数字', $("#sortID")[0], {
                      tips: [1, '#3595CC'],
                      time: 2000
                    });
                  }
                });
                $(".layui-layer-input")[0].setAttribute("id","nameID");
                $(".layui-layer-input")[0].setAttribute("value",value.name);
                $(".layui-layer-input").before("<label for=\"nameID\">请输入名称：</label>");
                var paraLabel=document.createElement("label");
                var node=document.createTextNode("请输入排序：");
                paraLabel.appendChild(node);
                paraLabel.setAttribute("for","sortID");
                var element = $(".layui-layer-content")[0];
                element.appendChild(paraLabel);
                var para=document.createElement("input");
                para.setAttribute("class","layui-layer-input");
                para.setAttribute("id","sortID");
                para.setAttribute("name","sortID");
                para.setAttribute("value",value.sortID);
                element.appendChild(para);
              });
              //删除事件
              $("#parentDel"+value.id).click(function(){
                stopBubble($("#parentAdd"+value.id))
                thisID = value.id;
                that = $("#parent"+value.id);
                $.ajax({
                  type:"get",
                    url:"http://192.168.1.117:8080/getKaodian",
                    data:{
                      id:thisID
                    },
                    success:function(data){
                      if(data.kaodianList.length > 0){
                        layer.alert('请先删除子节点！', {
                          title:  "警告",
                          skin: 'layui-layer-hong'
                          ,closeBtn: 0
                        })
                      }else{
                        var index = layer.confirm('是否删除该考点？', {
                          btn: ['删除','取消'] //按钮
                        }, function(){
                          $.ajax({
                            type:"get",
                              url:"http://192.168.1.117:8080/delKaodian",
                              data:{
                                id:thisID
                              },
                              success:function(data){
                                if(value.pId == 0){
                                  parentShow();
                                }else{
                                  funcB(thisID,that)
                                }
                                layer.close(index)
                              },
                              error:function(){
                                layer.alert('服务器异常！', {
                                  title:  "警告",
                                  skin: 'layui-layer-hong'
                                  ,closeBtn: 0
                                })
                              }
                          })
                        }, function(){

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
              });
            })
            //增加父节点
            $("#addParent").click(function(){
              layer.prompt({title: '请输入考点名称', formType: 0}, function(val, index){
                $.ajax({
                  type:"get",
                    url:"http://192.168.1.117:8080/addKaodian",
                    data:{
                      courseTypeID:courseTypeID,
                      courseNum:courseNum,
                      name:val,
                      pid:0,
                      userId:userId
                    },
                    success:function(data){
                      parentShow();
                    },
                    error:function(){
                      layer.alert('服务器异常！', {
                        title:  "警告",
                        skin: 'layui-layer-hong'
                        ,closeBtn: 0
                      })
                    }
                })
                layer.close(index);
              });
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
    });
  }
  $("#query").click(function(){
    $("#addParent").css("display","block");
    parentShow();
  });
  var func = function(thisID,that){
    $("#content_body"+thisID).html("");
    var flag = that[0].getAttribute('flag');
    if(flag == "false"){
      that[0].setAttribute('flag',"true");
      $.ajax({
        type:"get",
          url:"http://192.168.1.117:8080/getKaodian",
          data:{
            id:thisID
          },
          success:function(data){
            if(data.kaodianList){
              data.kaodianList.forEach(function(value){
                $("#content_body"+thisID).append("<ul class=\"cb oh\" id=\"parent"+value.id+"\" name=\""+value.id+"\" flag=\"false\">"
                  +"<li class=\"fl parent\">"+value.name+"</li>"
                  +"<div class=\"fr frDiv\">"
                  +"<li class=\"fl order\">"+value.sortID+"</li>"
                  +"<li class=\"fl parentAdd\" id=\"parentAdd"+value.id+"\" name=\""+value.id+"\">添加子类</li>"
                  +"<li class=\"fl parentUpdate\" id=\"parentUpdate"+value.id+"\" name=\""+value.id+"\">修改</li>"
                  +"<li class=\"fl parentDel\" id=\"parentDel"+value.id+"\" name=\""+value.id+"\">删除</li>"
                  +"</div>"
                  +"</ul>"
                  +"<div class=\"xian\"></div>"
                  +"<div class=\"secondary\" id=\"content_body"+value.id+"\"></div>"
                );
                $("#parent"+value.id)[0].onmouseover = function(){
                  $("#parent"+value.id)[0].style.backgroundColor = "#C2E4FC";
                };
                $("#parent"+value.id)[0].onmouseout = function(){
                  $("#parent"+value.id)[0].style.backgroundColor = "#EFF8FF";
                };
                $("#parent"+value.id).click(function(){
                  var thisID = value.id;
                  var that = $("#parent"+value.id)
                  func(thisID,that)
                });
                //添加事件
                $("#parentAdd"+value.id).click(function(){
                  console.log(111)
                  stopBubble($("#parentAdd"+value.id))
                  thisID = value.id;
                  that = $("#parent"+value.id);
                  layer.prompt({title: '请输入考点名称', formType: 0}, function(val, index){
                    var pid = value.id;
                    $.ajax({
                      type:"get",
                        url:"http://192.168.1.117:8080/addKaodian",
                        data:{
                          courseTypeID:courseTypeID,
                          courseNum:courseNum,
                          name:val,
                          pid:pid,
                          userId:userId
                        },
                        success:function(data){
                          console.log(data)
                          funcB(thisID,that)
                        },
                        error:function(){
                          layer.alert('服务器异常！', {
                            title:  "警告",
                            skin: 'layui-layer-hong'
                            ,closeBtn: 0
                          })
                        }
                    })
                    layer.close(index);
                  });
                });
                //修改事件
                $("#parentUpdate"+value.id).click(function(){
                  stopBubble($("#parentAdd"+value.id))
                  thisID = value.id;
                  layer.prompt({title: '请输入修改信息', formType: 0}, function(val, index){
                    var pid = value.id;
                    if(/^[(-?\d+\.\d+)|(-?\d+)|(-?\.\d+)]+$/.test($("#sortID")[0].value)){
                      $.ajax({
                        type:"get",
                          url:"http://192.168.1.117:8080/modifyKaodian",
                          data:{
                            id:pid,
                            name:val,
                            sortId:$("#sortID")[0].value,
                            userId:userId
                          },
                          success:function(data){
                            if(value.pId == 0){
                              parentShow();
                            }else{
                              funcB(value.pId,that);
                            }
                            layer.close(index)
                          },
                          error:function(){
                            layer.alert('服务器异常！', {
                              title:  "警告",
                              skin: 'layui-layer-hong'
                              ,closeBtn: 0
                            })
                          }
                      })
                      layer.close(index);
                    }else{
                      layer.tips('排序请输入数字', $("#sortID")[0], {
                        tips: [1, '#3595CC'],
                        time: 2000
                      });
                    }
                  });
                  $(".layui-layer-input")[0].setAttribute("id","nameID");
                  $(".layui-layer-input")[0].setAttribute("value",value.name);
                  $(".layui-layer-input").before("<label for=\"nameID\">请输入名称：</label>");
                  var paraLabel=document.createElement("label");
                  var node=document.createTextNode("请输入排序：");
                  paraLabel.appendChild(node);
                  paraLabel.setAttribute("for","sortID");
                  var element = $(".layui-layer-content")[0];
                  element.appendChild(paraLabel);
                  var para=document.createElement("input");
                  para.setAttribute("class","layui-layer-input");
                  para.setAttribute("id","sortID");
                  para.setAttribute("name","sortID");
                  para.setAttribute("value",value.sortID);
                  element.appendChild(para);
                });
                //删除事件
                $("#parentDel"+value.id).click(function(){
                  stopBubble($("#parentAdd"+value.id))
                  thisID = value.id;
                  $.ajax({
                    type:"get",
                      url:"http://192.168.1.117:8080/getKaodian",
                      data:{
                        id:thisID
                      },
                      success:function(data){
                        if(data.kaodianList.length > 0){
                          layer.alert('请先删除子节点！', {
                            title:  "警告",
                            skin: 'layui-layer-hong'
                            ,closeBtn: 0
                          })
                        }else{
                          var index = layer.confirm('是否删除该考点？', {
                            btn: ['删除','取消'] //按钮
                          }, function(){
                            $.ajax({
                              type:"get",
                                url:"http://192.168.1.117:8080/delKaodian",
                                data:{
                                  id:thisID
                                },
                                success:function(data){
                                  if(value.pId == 0){
                                    parentShow();
                                  }else{
                                    funcB(value.pId,that);
                                  }
                                  layer.close(index)
                                },
                                error:function(){
                                  layer.alert('服务器异常！', {
                                    title:  "警告",
                                    skin: 'layui-layer-hong'
                                    ,closeBtn: 0
                                  })
                                }
                            })
                          }, function(){
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
                })
              })
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
    }else{
      that[0].setAttribute('flag',"false");
      $("#content_body"+that[0].getAttribute('name'))[0].innerHTML = "";
    }
    $("#content_body"+that[0].getAttribute('name'))[0].style.paddingLeft = "40px";
  }
  var funcB = function(thisID,that){
    $("#content_body"+thisID).html("");
    $.ajax({
      type:"get",
        url:"http://192.168.1.117:8080/getKaodian",
        data:{
          id:thisID
        },
        success:function(data){
          if(data.kaodianList){
            data.kaodianList.forEach(function(value){
              $("#content_body"+thisID).append("<ul class=\"cb oh\" id=\"parent"+value.id+"\" name=\""+value.id+"\" flag=\"false\">"
                +"<li class=\"fl parent\">"+value.name+"</li>"
                +"<div class=\"fr frDiv\">"
                +"<li class=\"fl order\">"+value.sortID+"</li>"
                +"<li class=\"fl parentAdd\" id=\"parentAdd"+value.id+"\" name=\""+value.id+"\">添加子类</li>"
                +"<li class=\"fl parentUpdate\" id=\"parentUpdate"+value.id+"\" name=\""+value.id+"\">修改</li>"
                +"<li class=\"fl parentDel\" id=\"parentDel"+value.id+"\" name=\""+value.id+"\">删除</li>"
                +"</div>"
                +"</ul>"
                +"<div class=\"xian\"></div>"
                +"<div class=\"secondary\" id=\"content_body"+value.id+"\"></div>"
              );
              $("#parent"+value.id)[0].onmouseover = function(){
                $("#parent"+value.id)[0].style.backgroundColor = "#C2E4FC";
              };
              $("#parent"+value.id)[0].onmouseout = function(){
                $("#parent"+value.id)[0].style.backgroundColor = "#EFF8FF";
              };
              $("#parent"+value.id).click(function(){
                var thisID = value.id;
                var that = $("#parent"+value.id)
                func(thisID,that)
              });
              //添加事件
              $("#parentAdd"+value.id).click(function(){
                stopBubble($("#parentAdd"+value.id))
                thisID = value.id;
                that = $("#parent"+value.id);
                layer.prompt({title: '请输入考点名称', formType: 0}, function(val, index){
                  var pid = value.id;
                  $.ajax({
                    type:"get",
                      url:"http://192.168.1.117:8080/addKaodian",
                      data:{
                        courseTypeID:courseTypeID,
                        courseNum:courseNum,
                        name:val,
                        pid:pid,
                        userId:userId
                      },
                      success:function(data){
                        funcB(thisID,that)
                      },
                      error:function(){
                        layer.alert('服务器异常！', {
                          title:  "警告",
                          skin: 'layui-layer-hong'
                          ,closeBtn: 0
                        })
                      }
                  })
                  layer.close(index);
                });
              });
              //修改事件
              $("#parentUpdate"+value.id).click(function(){
                stopBubble($("#parentAdd"+value.id))
                thisID = value.id;
                layer.prompt({title: '请输入修改信息', formType: 0}, function(val, index){
                  var pid = value.id;
                  if(/^[(-?\d+\.\d+)|(-?\d+)|(-?\.\d+)]+$/.test($("#sortID")[0].value)){
                    $.ajax({
                      type:"get",
                        url:"http://192.168.1.117:8080/modifyKaodian",
                        data:{
                          id:pid,
                          name:val,
                          sortId:$("#sortID")[0].value,
                          userId:userId
                        },
                        success:function(data){
                          if(value.pId == 0){
                            parentShow();
                          }else{
                            funcB(value.pId,that)
                          }
                          layer.close(index)
                        },
                        error:function(){
                          layer.alert('服务器异常！', {
                            title:  "警告",
                            skin: 'layui-layer-hong'
                            ,closeBtn: 0
                          })
                        }
                    })
                    layer.close(index);
                  }else{
                    layer.tips('排序请输入数字', $("#sortID")[0], {
                      tips: [1, '#3595CC'],
                      time: 2000
                    });
                  }
                });
                $(".layui-layer-input")[0].setAttribute("id","nameID");
                $(".layui-layer-input")[0].setAttribute("value",value.name);
                $(".layui-layer-input").before("<label for=\"nameID\">请输入名称：</label>");
                var paraLabel=document.createElement("label");
                var node=document.createTextNode("请输入排序：");
                paraLabel.appendChild(node);
                paraLabel.setAttribute("for","sortID");
                var element = $(".layui-layer-content")[0];
                element.appendChild(paraLabel);
                var para=document.createElement("input");
                para.setAttribute("class","layui-layer-input");
                para.setAttribute("id","sortID");
                para.setAttribute("name","sortID");
                para.setAttribute("value",value.sortID);
                element.appendChild(para);
              });
              //删除事件
              $("#parentDel"+value.id).click(function(){
                stopBubble($("#parentAdd"+value.id))
                thisID = value.id;
                $.ajax({
                  type:"get",
                    url:"http://192.168.1.117:8080/getKaodian",
                    data:{
                      id:thisID
                    },
                    success:function(data){
                      if(data.kaodianList.length > 0){
                        layer.alert('请先删除子节点！', {
                          title:  "警告",
                          skin: 'layui-layer-hong'
                          ,closeBtn: 0
                        })
                      }else{
                        var index = layer.confirm('是否删除该考点？', {
                          btn: ['删除','取消'] //按钮
                        }, function(){
                          $.ajax({
                            type:"get",
                              url:"http://192.168.1.117:8080/delKaodian",
                              data:{
                                id:thisID
                              },
                              success:function(data){
                                if(value.pId == 0){
                                  parentShow();
                                }else{
                                  funcB(value.pId,that)
                                }
                                layer.close(index)
                              },
                              error:function(){
                                layer.alert('服务器异常！', {
                                  title:  "警告",
                                  skin: 'layui-layer-hong'
                                  ,closeBtn: 0
                                })
                              }
                          })
                        }, function(){

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
              })
            })
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
    if($("#content_body"+that[0].getAttribute('name')).length > 0){
      $("#content_body"+that[0].getAttribute('name'))[0].style.paddingLeft = "40px";
    }
  }
}())
