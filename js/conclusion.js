$.ajax({
    url:prefix+"getInfo",
    // url:"./json/test.JSON",
                                ///////////////////////// TEST
                                xhrFields: {
                                    withCredentials: true
                                },
                                crossDomain: true,
                                //////////////////////////
    type:"get",
    dataType:"json",
    success:function(data){
        if (data.record==true) {
             document.getElementById("who").innerHTML=data.name+'  同学';
        }
         else {window.location.href="info.html"}
    },
    error:function(err){
        if (err.status_code == 401) {
            location.href=bbt+encodeURIComponent( location.href );
        }
    }
});
$.ajax({
    url:prefix+"getStatistics",
    // url:"./json/test2.JSON",
    type:"get",
    dataType:"json",
                                ///////////////////////// TEST
                                xhrFields: {
                                    withCredentials: true
                                },
                                crossDomain: true,
                                //////////////////////////
    success:function(data){
        document.getElementById("sent").innerHTML=data.sent;
        document.getElementById("received_by_qrcode").innerHTML=data.received_by_qrcode;
        document.getElementById("received_by_tel").innerHTML=data.received_by_tel;
        document.getElementById("answered").innerHTML=data.answered;
    },
    error:function(err){
        if (err.status == 401) {
            location.href=bbt+encodeURIComponent( location.href );
        }
        if (err.status == 403) {
            location.href="info.html";
        }
    }
});