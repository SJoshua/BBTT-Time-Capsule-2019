var prefix="http://server.sforest.in:2019/api/";
//绑定微信
$.ajax({
    url:prefix+"getInfo",
    type:"get",
    dataType:"json",
    success:function(data){
        if (!data.record) {window.location.href="info.html";}
         else {window.location.href="content.html";}
    },
    fail: function(err) {
        if (err.status_code == 401) {
            location.href="#BBT微信后台#/Home/Index/index?state="+encodeURIComponent( location.href );
        }
    }
})


