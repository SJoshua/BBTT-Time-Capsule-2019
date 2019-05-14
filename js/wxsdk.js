// 绑定微信
$.ajax({
    url:prefix+"getInfo",
    ///////////////////////// TEST
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    //////////////////////////
    type:"get",
    dataType:"json",
    success:function(data){
        if (!data.record) {window.location.href="info.html";}
        //else 留在当前页面
    },
    error: function(err) {
        if (err.status == 401) {
            location.href=bbt+encodeURIComponent( location.href );
        }
    }
})



