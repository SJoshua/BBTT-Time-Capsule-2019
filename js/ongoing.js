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
        if (data.status==1) {
            alert("活动已经结束，感谢关注");
            window.location.href="blank.html";
        }
        if (data.status==-1) {
            alert("活动还未开始，敬请期待");
            window.location.href="blank.html";
        }
    },
    error: function() {
        console.log("获取时间失败");
    }
})