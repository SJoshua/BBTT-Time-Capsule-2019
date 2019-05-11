var prefix="http://server.sforest.in:2019/api/";
var status=0;
function bindwx(){
    $.ajax({
        url:prefix+"setSession",
        type:"get",
            ///////////////////////// TEST
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            //////////////////////////
        dataType:"json",
        success:function(data){
            wx.config({
                debug:false, 
                appId:data.appId, 
                timestamp: data.timestamp, 
                nonceStr: data.noncestr, 
                signature: data.signature,
                jsApiList: ['startRecord','stopRecord','onVoiceRecordEnd','onVoicePlayEnd','playVoice','pauseVoice','uploadVoice'] 
            });
            wx.ready(function(){
                //接口调用成功
            })
        }
    })
}
$.ajax({
    url:prefix+"getInfo",
    type:"get",
    dataType:"json",
    success:function(data){
        if (!data.record){
            bindwx();
            status=1;
        }
         else{status=1;}
    }
})


