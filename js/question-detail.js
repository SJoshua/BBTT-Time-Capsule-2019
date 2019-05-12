var winWidth = $(window).width();
var winHeight = $(window).height();
document.getElementById("background").style.backgroundSize=winWidth+'px '+winHeight+'px';

document.getElementById("ask").innerText=localStorage.getItem('question');

function submit(){
    var ans=document.getElementById("words").value;
    if (ans=="") {showError("回答不能为空")}
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
                    location.href="#BBT微信后台#/Home/Index/index?state="+encodeURIComponent( location.href );
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
}