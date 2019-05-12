var winWidth = $(window).width();
var winHeight = $(window).height();
document.getElementById("background").style.backgroundSize=winWidth+'px '+winHeight+'px';
var height = document.documentElement.clientHeight; 
document.getElementById("submit").style.top=height*0.85+'px';

document.getElementById("ask").innerHTML="<strong>Q&nbsp</strong>"+localStorage.getItem('qtext');
var submit=document.getElementById("submit");
submit.addEventListener("click",function(){
    var ans=document.getElementById("words").value;
    if (ans=="") {showError("回答不能为空");}
     else {
        $.ajax({
            url:prefix+"sendQuestionCapsule",
            type:"post",
            data:{
                "period":localStorage.getItem('period'),
                "question":localStorage.getItem('qid'),
                "ans":ans,
            },
            dataType:"json",
            success:function(){
                window.location.href="problem-success.html";
            },
            fail:function(err){
                if (err.status_code == 401) {
                    location.href=bbt+encodeURIComponent( location.href );
                }
                if (err.status_code == 403) {
                    location.href="info.html";
                }
                if (err.status_code == 400) {
                    console.log(err.message);
                }
            }
        })
    }
})