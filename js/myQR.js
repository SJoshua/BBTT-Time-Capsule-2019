$.ajax({
    url:prefix+"getQRCode",
    type:"get",
    dateType:"json",
    success:function(data){
        document.getElementById("share").src=data.image;
    },
    error:function(err){
        if (err.status == 401) {
            location.href=bbt+encodeURIComponent( location.href );
        }
        if (err.status == 403) {
            location.href="info.html";
        }
    }
})
