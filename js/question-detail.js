document.getElementById("ask").innerHTML="<strong>Q&nbsp</strong>"+sessionStorage.getItem('qtext');
console.log(localStorage.getItem('qperiod'));
var submit=document.getElementById("submit");
var ok=true;
submit.addEventListener("click",function(){
    if (ok==true) {
    ok=false;
    var ans=document.getElementById("words").value;
    if (ans=="") {showError("回答不能为空");}
     else {
        $.ajax({
            url:prefix+"sendQuestionCapsule",
            type:"post",
                        ///////////////////////// TEST
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        //////////////////////////
            data:{
                "period":sessionStorage.getItem('qperiod'),
                "question":sessionStorage.getItem('qid'),
                "message":ans,
            },
            dataType:"json",
            success:function(){
                ok=true;
                window.location.href="question-success.html";
            },
            error:function(err){
                ok=true;
                if (err.status == 401) {
                    location.href=bbt+encodeURIComponent( location.href );
                }
                if (err.status == 403) {
                    location.href="info.html";
                }
                if (err.status == 400) {
                    console.log(err.message);
                }
            }
        })
    }

    }
})