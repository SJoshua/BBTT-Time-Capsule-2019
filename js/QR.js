$.ajax({
    url:prefix+"getQRCode",
    type:"get",
    dateType:"json",
    success:function(data){
        document.getElementById("share").src=data.image;
    },
    fail:function(err){
        if (err.status_code == 401) {
            location.href="#BBT微信后台#/Home/Index/index?state="+encodeURIComponent( location.href );
        }
        if (err.status_code == 403) {
            location.href="info.html";
        }
    }
})
