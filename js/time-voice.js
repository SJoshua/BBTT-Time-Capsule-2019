var winWidth = $(window).width();
var winHeight = $(window).height();
document.getElementById("background").style.backgroundSize=winWidth+'px '+winHeight+'px';
var height = document.documentElement.clientHeight;  
document.getElementById("finish").style.top=height*0.85+'px';
// function randomString(min, max){
//     var str = "",
//         arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
//     range = Math.round(Math.random() * (max-min)) + min;
//     for(var i=0; i<range; i++){
//         pos = Math.round(Math.random() * (arr.length-1));
//         str += arr[pos];
//     }
//     return str;
// }
    var localId;
    var serverId;
    var t;
    var c=0;
    var jud=0;
    var flag = true;
    function timing(){
        document.getElementById("time").value=c;
        c++;
        t=setTimeout("timing()",1000);
    }
    function stopTiming(){
        clearTimeout(t);
    }
    function Play(){
        wx.playVoice({
            localId:localId   
        })
    }
    function Pause(){
        wx.pauseVoice({
            localId:localId   
        })
    }
    function Redo(){
        serverId=null;
    }
    wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
            window.localId = res.localId;
        }
    });
    wx.onVoicePlayEnd({
        success: function (res) {
            window.localId = res.localId; // 返回音频的本地ID
        }
    });
    //播放 暂停
    var ctl=document.getElementById("btn2");
    ctl.onclick=function(){
        if (flag){
            Play();
            ctl.src="./img/pause.png";
            flag=false;
        }
        else{
            Pause();
            ctl.src="./img/play.png";
            flag=true;
        }
    }
    //开始 结束
    document.getElementById("btn1").onclick=function(){
        if (jud%2==0){
            timing();
            wx.startRecord();
        }
        if (jud%2==1){
            stopTiming();
            wx.stopRecord({
                success:function(res){
                    localId=res.localId;
                    //
                }
            });
        }
        jud++;
    }
    //重录
    document.getElementById("btn3").onclick=function(){
        Redo();
    }
    document.getElementById("finish").onclick=function(){
        wx.uploadVoice({
            localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                serverId = res.serverId; // 返回音频的服务器端ID
            }
        });
        $.ajax({
            url:"sendTimeCapsule",
            data:{
                "file_id":serverId,
            },
            type:"post",
            dataType:"json",
            success:function(){

            }
        })
        window.location.href="time-end.html"
    }
