(function(){
	//获取url
	var workID;
	(function GetQuerydata(){
	    //获取id
	    var r = window.location.href;
	    var s=r.indexOf("="); 
		var t=r.substring(s+1);// t就是?后面的东西了 
	    workID = t;
	}())
	console.log(workID);
	var showAll = function(){
		$.ajax({
		    type:"get",
	        url:"http://v1.api.pc.wschool.cn/getWorkContent",
	        data:{
	        	workID:workID,
	        },
	        success:function(data){
	        	console.log(data.content)
	        	$(".content").html(data.content);
     		}
	    });
	}
	showAll();
})();