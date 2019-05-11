var winWidth = $(window).width();
var winHeight = $(window).height();
document.getElementById("background").style.backgroundSize=winWidth+'px '+winHeight+'px';
var height = document.documentElement.clientHeight; 
document.getElementById("submit").style.top=height*0.8+'px';

var submit=document.getElementById("submit");
submit.addEventListener("click",function(){
    var msg=document.getElementById("msg").value;
    if (msg=="") {showError("信件不能为空哦")}
     else{
        $.ajax({
            url:prefix+"sendTimeCapsule",
            data:{
                "message":msg,
            },
            type:"post",
            dataType:"json",
            success:function(){
                window.location.href="time-end.html";
            }
        })
    }   
})

