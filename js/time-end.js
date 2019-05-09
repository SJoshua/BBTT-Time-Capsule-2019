$.ajax({
    // url:"sendTimeCapsule",
    url:"./json/4.JSON",
    type:"post",
    dataType:"json",
    success:function(data){
        var num=document.getElementById("count");
        var max=data.count;
        var now=0;
        function countUp(){
            if (now<max) {now++;}
            num.innerHTML='<strong>'+now+'</strong>';
        }
        var len=String(max).length;
        len=Math.pow(10,len-1);
        // console.log(len);
        //数字递增特效 未更换成改进版
       window.setInterval(countUp,10);
    }
});
$.ajax({
    url:"sendTimeCapsule",
    type:"post",
    dataType:"json",
    success:function(data){
        if (data.duration=="half-year"){
            document.getElementById("time").innerHTML='<strong>半年</strong>';
        }
        else{
            document.getElementById("time").innerHTML='<strong>一年</strong>';
        }
    }
});