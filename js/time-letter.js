var submit=document.getElementById("submit");
var ok=true;
submit.addEventListener("click",function(){
    if (ok==true) {
    ok=false;
    var msg=document.getElementById("msg").innerHTML;
    if (msg=="") {ok=true; showError("信件不能为空哦")}
     else{
         
        $.ajax({
            url:prefix+"sendTimeCapsule",
            ///////////////////////// TEST
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            //////////////////////////
            type:"post",
            dataType:"json",
            data:{
                "receiver_name":sessionStorage.getItem('receiver_name'),
                "receiver_tel":sessionStorage.getItem('receiver_tel'),
                "type":sessionStorage.getItem('type'),
                "period":sessionStorage.getItem('period'),
                "from_qrcode":sessionStorage.getItem('from_qrcode'),
                "message":msg,
            },
            success:function(data){
                ok=true;
                sessionStorage.setItem('count', data.count);
                window.location.href="time-end.html";
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

