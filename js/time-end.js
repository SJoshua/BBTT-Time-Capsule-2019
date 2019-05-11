var prefix="http://server.sforest.in:2019/api/";
$.ajax({
    url:prefix+"getInfo",
    // url:"./json/test.JSON",
    type:"post",
    ///////////////////////// TEST
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    //////////////////////////
    dataType:"json",
    success:function(data){
        document.getElementById("who").innerHTML=data.name;
    }
});
$.ajax({
    url:prefix+"sendTimeCapsule",
    type:"post",
    dataType:"json",
    ///////////////////////// TEST
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    //////////////////////////
    success:function(data){
        document.getElementById("count").innerHTML='<strong>'+data.count+'</strong>';
    }
});
$.ajax({
    url:prefix+"sendTimeCapsule",
    type:"post",
    dataType:"json",
    ///////////////////////// TEST
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    //////////////////////////
    success:function(data){
        if (data.duration=="half-year"){
            document.getElementById("time").innerHTML='<strong>半年</strong>';
        }
        else{
            document.getElementById("time").innerHTML='<strong>一年</strong>';
        }
    }
});