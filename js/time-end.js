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
    error:function(err){
        if (err.status == 401) {
            location.href=bbt+encodeURIComponent( location.href );
        }
    }
});
document.getElementById("who").innerHTML='<strong>'+"未命名"+'</strong>';
document.getElementById("time").innerHTML='<strong>'+localStorage.getItem('time')+'</strong>';

