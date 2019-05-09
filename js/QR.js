$.ajax({
    url:"http://server.sforest.in:2019/api/getQRCode",
    type:"get",
    dateType:"json",
    success:function(data){
        document.getElementById("share").src=data.image;
    }
})