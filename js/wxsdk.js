$.ajax({
    url:"getInfo",
    type:"post",
    dataType:"json",
    success:function(data){
        if (data.record==false) {bindwx();}
    }
})
function bindwx(){
    $.ajax({
        url:"https://hemc.100steps.net/wechat/Home/Public/getJsApi",
        type:"post",
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

            })
        }
    })
}
