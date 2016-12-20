
var selects = function(a,id){
  document.onclick = function (event) {
    var e = event || window.event;
    var elem = e.srcElement || e.target;
    var prentID = elem.parentElement.id;
    if(prentID == "selectLeft"){
      var selectAll = document.getElementById("selectRight").getElementsByClassName("option");
      for(var i = 0;i < selectAll.length;i++){
        if(selectAll[i].getAttribute("selected") == "true"){
          selectAll[i].style.backgroundColor = "#C8C8C8";
        }
      }
    }else if(prentID == "selectRight"){
      var selectAll = document.getElementById("selectLeft").getElementsByClassName("option");
      for(var i = 0;i < selectAll.length;i++){
        if(selectAll[i].getAttribute("selected") == "true"){
          selectAll[i].style.backgroundColor = "#C8C8C8";
        }
      }
    }else{
      var selectAll = document.getElementsByClassName("option");
      for(var i = 0;i < selectAll.length;i++){
        if(selectAll[i].getAttribute("selected") == "true"){
          selectAll[i].style.backgroundColor = "#C8C8C8";
        }
      }
    }
  }

  var selectHeight = document.getElementById(id).getAttribute("multiple")-0;
  selectHeight = selectHeight*34+"px";
  document.getElementById(id).style.maxHeight = selectHeight;
  var str = "";
  for(var  i = 0;i < a.length;i++){
    str += "<li id="+i+id+" selected=\"false\" class=\"option layui-nav-item\">"+a[i]+"</li>";
  }
  document.getElementById(id).innerHTML = str;
  var hoverSpan = document.createElement("span");
  hoverSpan.setAttribute("class", "hoverSpan")
  document.getElementById(id).appendChild(hoverSpan);
  //添加hover事件
  var allOption = document.getElementById(id).getElementsByClassName("option");
  for(var n = 0;n < allOption.length;n++){
    allOption[n].onmouseover = function(){
      var thisID = this.id;
      thisID = thisID.match(/\d+/g)[0]-0;
      thisID = thisID*34 + "px";
      // var thisSpan = document.getElementById(id).getElementsByClassName("layui-nav-bar");
      // console.log(thisSpan)
      // thisSpan.style.display = "none";
      var hoverSpan = document.getElementById(id).getElementsByClassName("hoverSpan")[0];
      hoverSpan.style.top = thisID;
      hoverSpan.style.height = "34px";
      hoverSpan.style.opacity = 1;
      if(this.getAttribute("selected") == "false"){
        this.style.backgroundColor = "#4E5465";
      }
    }
    allOption[n].onmouseout = function(){
      var hoverSpan = document.getElementById(id).getElementsByClassName("hoverSpan")[0];
      hoverSpan.style.height = "0px";
      hoverSpan.style.opacity = 0;
      if(this.getAttribute("selected") == "false"){
        this.style.backgroundColor = "#fff";
      }
    }
  }

  if(document.all){
      document.onselectstart= function(){return false;}; //for ie
  }else{
      document.onmousedown= function(){return false;};
      document.onmouseup= function(){return true;};
  }
  document.onselectstart = new Function('event.returnValue=false;');
  for(var  i = 0;i < a.length;i++){
    var lastClick;
    document.getElementById(i+id).onclick = function(event){
      if (event.shiftKey==1){               //当shift被按下时
        var now = this.id.match(/\d+/g)[0]-0;
        if(!lastClick){
          if(lastClick == 0){
            lastClick = lastClick - 0;
          }else{
            lastClick = now;
          }
        }else{
          lastClick = lastClick - 0;
        }
        if(lastClick < now){
          for(var j = 0;j < a.length;j++){
            document.getElementById(j+id).style.backgroundColor = "#fff";
            document.getElementById(j+id).setAttribute('selected','false');
          }
          for(var i = lastClick;i <= now;i++){
            document.getElementById(i+id).style.backgroundColor = "#61b988";
            document.getElementById(i+id).setAttribute('selected','true');
            var selectAll = document.getElementsByClassName("option");
            for(var n = 0;n < selectAll.length;n++){
              if(selectAll[n].getAttribute("selected") == "true"){
                selectAll[n].style.backgroundColor = "#61b988";
              }
            }
          }
        }else if(lastClick > now){
          for(var j = 0;j < a.length;j++){
            document.getElementById(j+id).style.backgroundColor = "#fff";
            document.getElementById(j+id).setAttribute('selected','false');
          }
          for(var i = now;i <= lastClick;i++){
            document.getElementById(i+id).style.backgroundColor = "#61b988";
            document.getElementById(i+id).setAttribute('selected','true');
            var selectAll = document.getElementsByClassName("option");
            for(var n = 0;n < selectAll.length;n++){
              if(selectAll[n].getAttribute("selected") == "true"){
                selectAll[n].style.backgroundColor = "#61b988";
              }
            }
          }
        }else{
          for(var j = 0;j < a.length;j++){
            document.getElementById(j+id).style.backgroundColor = "#fff";
            document.getElementById(j+id).setAttribute('selected','false');
          }
          document.getElementById(now+id).style.backgroundColor = "#61b988";
          document.getElementById(now+id).setAttribute('selected','true');
          var selectAll = document.getElementsByClassName("option");
          for(var n = 0;n < selectAll.length;n++){
            if(selectAll[n].getAttribute("selected") == "true"){
              selectAll[n].style.backgroundColor = "#61b988";
            }
          }
        }
      }else if(event.ctrlKey==1){           //当按下ctrl时
        if(this.getAttribute('selected') == "true"){
          this.style.backgroundColor = "#fff";
          this.setAttribute('selected','false');
        }else{
          this.style.backgroundColor = "#61b988";
          var selectAll = document.getElementsByClassName("option");
          for(var i = 0;i < selectAll.length;i++){
            if(selectAll[i].getAttribute("selected") == "true"){
              selectAll[i].style.backgroundColor = "#61b988";
            }
          }
          this.setAttribute('selected','true');
        }
        lastClick = this.id;         //获取最后一次点击的地方
        lastClick = lastClick.match(/\d+/g)[0]-0;
      }else{                                //如果都没有被按下
        this.style.backgroundColor = "#61b988";
        var selectAll = document.getElementsByClassName("option");
        for(var i = 0;i < selectAll.length;i++){
          if(selectAll[i].getAttribute("selected") == "true"){
            selectAll[i].style.backgroundColor = "#61b988";
          }
        }
        var now = this.id;
        now = now.match(/\d+/g)[0]-0;
        for(var j = 0;j < a.length;j++){
          if(now == j){
            document.getElementById(j+id).style.backgroundColor = "#61b988";
            document.getElementById(j+id).setAttribute('selected','true');
          }else{
            document.getElementById(j+id).style.backgroundColor = "#fff";
            document.getElementById(j+id).setAttribute('selected','false');
          }
        }
        lastClick = now;                     //获取最后一次点击的地方
      }
    }
  }
}
