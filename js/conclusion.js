var winWidth = $(window).width();
var winHeight = $(window).height();
document.getElementById("background").style.backgroundSize=winWidth+'px '+winHeight+'px';
$.ajax({
    url:prefix+"getInfo",
    // url:"./json/test.JSON",
    type:"get",
    dataType:"json",
    success:function(data){
        if (data.record==true) {
             document.getElementById("who").innerHTML='<strong>'+data.name+'</strong>'+'  同学';
        }
         else {window.location.href="info.html"}
    },
    fail:function(err){
        if (err.status_code == 401) {
            location.href="#BBT微信后台#/Home/Index/index?state="+encodeURIComponent( location.href );
        }
    }
});
$.ajax({
    url:prefix+"getStatistics",
    // url:"./json/test2.JSON",
    type:"get",
    dataType:"json",
    success:function(data){
        document.getElementById("sent").innerHTML='<strong>'+data.sent+'</strong>';
        document.getElementById("received_by_qrcode").innerHTML='<strong>'+data.received_by_qrcode+'</strong>';
        document.getElementById("received_by_tel").innerHTML='<strong>'+data.received_by_tel+'</strong>';
        document.getElementById("answered").innerHTML='<strong>'+data.answered+'</strong>';
    },
    fail:function(err){
        if (err.status_code == 401) {
            location.href="#BBT微信后台#/Home/Index/index?state="+encodeURIComponent( location.href );
        }
        if (err.status_code == 403) {
            location.href="info.html";
        }
    }
});