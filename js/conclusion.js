var winWidth = $(window).width();
var winHeight = $(window).height();
document.getElementById("background").style.backgroundSize=winWidth+'px '+winHeight+'px';
$.ajax({
    // url:"getInfo",
    url:"./json/test.JSON",
    type:"post",
    dataType:"json",
    success:function(data){
        document.getElementById("who").innerHTML='<strong>'+data.name+'</strong>'+'  同学';
    }
});
$.ajax({
    // url:"getStatistics",
    url:"./json/test2.JSON",
    type:"post",
    dataType:"json",
    success:function(data){
        document.getElementById("sent").innerHTML='<strong>'+data.sent+'</strong>';
        document.getElementById("received_by_qrcode").innerHTML='<strong>'+data.received_by_qrcode+'</strong>';
        document.getElementById("received_by_tel").innerHTML='<strong>'+data.received_by_tel+'</strong>';
        document.getElementById("answered").innerHTML='<strong>'+data.answered+'</strong>';
    }
});