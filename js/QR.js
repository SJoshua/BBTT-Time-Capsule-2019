$.ajax({
    url:"http://server.sforest.in:2019/api/getQRCode",
    type:"get",
    dateType:"json",
    ///////////////////////// TEST
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    //////////////////////////    success:function(data){
        document.getElementById("share").src=data.image;
    }
})