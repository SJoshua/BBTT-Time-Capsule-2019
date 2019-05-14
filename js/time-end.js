var flag=sessionStorage.getItem('from_qrcode');
if (flag=="true"){
    document.getElementById("words").innerHTML=
    "<p style='text-align:center'>"+
    "第"+sessionStorage.getItem('count')+"个给"
    +sessionStorage.getItem('receiver_name')+"写的信已经诞生！</p>"+
    "<p style='text-align:center'>感谢你的来信！</p>";
}
else{
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
                document.getElementById("words").innerHTML=
                data.name+" 同学<br>"+
                "<p style='text-indent:2em'>"+
                "你已成功发出时光胶囊的第"+sessionStorage.getItem('count')+"封信,"+
                "梯仔将好好保存，并在"+sessionStorage.getItem('time')+"后寄出</p>"+
                "<p style='text-indent:2em'>敬请期待！</p>";
            }
            else {window.location.href="info.html"}
        },
        error:function(err){
            if (err.status_code == 401) {
                location.href=bbt+encodeURIComponent( location.href );
            }
        }
    });
}


