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
             document.getElementById("who").innerHTML='<strong>'+data.name+'</strong>'+'  同学';
        }
         else {window.location.href="info.html"}
    },
    error:function(err){
        if (err.status_code == 401) {
            location.href=bbt+encodeURIComponent( location.href );
        }
    }
});
document.getElementById("count").innerHTML='<strong>'+localStorage.getItem('count')+'</strong>';
document.getElementById("time").innerHTML='<strong>'+localStorage.getItem('time')+'</strong>';

