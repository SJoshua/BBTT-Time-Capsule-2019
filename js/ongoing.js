// 活动起止
$.ajax({
    url:prefix+"isOngoing",
    ///////////////////////// TEST
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    //////////////////////////
    type:"get",
    dataType:"json",
    success:function(data){
        //活动结束
        if (data.status==1) {
            window.location.href="blank.html";
        }
    },
    error: function() {
        console.log("获取时间失败");
    }
})