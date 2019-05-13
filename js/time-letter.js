var submit=document.getElementById("submit");
submit.addEventListener("click",function(){
    var msg=document.getElementById("msg").innerHTML;
    if (msg=="") {showError("信件不能为空哦")}
     else{
        console.log(msg);
        localStorage.setItem('message', msg);
        window.location.href="time-end.html";
    }   
})

$.ajax({
    url:prefix+"sendTimeCapsule",
    data:{
        "receiver_name":localStorage.getItem('receiver_name'),
        "receiver_tel":localStorage.getItem('receiver_tel'),
        "type":localStorage.getItem('type'),
        "period":localStorage.getItem('receiver_period'),
        "from_qrcode":localStorage.getItem('from_qrcode'),
        "message":localStorage.getItem('message'),
    },
    type:"post",
    dataType:"json",
    success:function(data){
        document.getElementById("count").innerHTML='<strong>'+data.count+'</strong>';
    },
    error:function(err){
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
