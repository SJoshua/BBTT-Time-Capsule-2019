$.ajax({
    url:prefix+"getInfo",
    // url:"./json/test.JSON",
    type:"get",
    dataType:"json",
    success:function(data){
        if (data.record==true) {
            document.getElementById("who").innerHTML='<strong>'+data.name+'</strong>';
        }
         else {window.location.href="info.html"}
    },
    fail:function(err){
        if (err.status_code == 401) {
            location.href=bbt+encodeURIComponent( location.href );
        }
    }
});
document.getElementById("time").innerHTML='<strong>'+localStorage.getItem('time')+'</strong>';
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
