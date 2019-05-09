var winWidth = $(window).width();
var winHeight = $(window).height();
document.getElementById("background").style.backgroundSize=winWidth+'px '+winHeight+'px';
$.ajax({
    // url:"getInfo",
    url:"http://server.sforest.in:2019/api/getInfo",
    type:"post",
    dataType:"json",
    success:function(data){
        document.getElementById("who").innerHTML='<strong>'+data.name+'</strong>'+'  同学';
    }
});
$.ajax({
    // url:"getStatistics",
    url:"http://server.sforest.in:2019/api/getStatistics",
    type:"post",
    dataType:"json",
    success:function(data){
        document.getElementById("sent").innerHTML='<strong>'+data.sent+'</strong>';
        document.getElementById("received_by_qrcode").innerHTML='<strong>'+data.received_by_qrcode+'</strong>';
        document.getElementById("received_by_tel").innerHTML='<strong>'+data.received_by_tel+'</strong>';
        document.getElementById("answered").innerHTML='<strong>'+data.answered+'</strong>';
    }
});