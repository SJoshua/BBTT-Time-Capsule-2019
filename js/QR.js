$.ajax({
    url:"getQRCode",
    type:"post",
    dateType:"json",
    success:function(data){
        document.getElementById("share").src=data.image;
    }
})