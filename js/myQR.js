$.ajax({
    url:prefix+"getQRCode",
    type:"get",
    dateType:"json",
    ///////////////////////// TEST
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    //////////////////////////
    success:function(data){
        document.getElementById("share").src=data.image;
        alert("梯仔温馨提示：请想要分享二维码到朋友圈的小伙伴多配一张图片进行分享，避免受到屏蔽");
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

