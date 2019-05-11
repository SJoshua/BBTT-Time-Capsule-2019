var winWidth = $(window).width();
var winHeight = $(window).height();
document.getElementById("background").style.backgroundSize=winWidth+'px '+winHeight+'px';
var height = document.documentElement.clientHeight;  
document.getElementById("finish").style.top=height*0.85+'px';

    var localId=null;
    var serverId=null;
    var t;   //计时器
    var x=0; //读秒
    var c=0;   //同一次试听
    var jud= 0;         //有无录音
    var flag = false;   //播放暂停状态
    function timing(k){ //k=1 录音计时 k=2试听计时
        x++;
        if (x<10) { document.getElementById("time").innerText="0"+x;}
         else {document.getElementById("time").innerText=x;}
        if (k==1) {t=setTimeout("timing(1)",1000);}
        if ((k==2) && (flag==true)) {t=setTimeout("timing(2)",1000);}
    }
    function stopTiming(){
        clearTimeout(t);
    }
    function Play(){
        timing(2);
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
        localId=null;
        serverId=null;
        x=0;
        document.getElementById("time").innerText="00";
        jud=0;
        c=0;
        ctl2.src="./img/start.png";
    }
    wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
            window.localId = res.localId;
            stopTiming();
            document.getElementById("CD").style.animationPlayState = "paused";
            x=0;
            document.getElementById("time").innerText="00";
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
        if (localId==null) {showError("先录音才能试听哦");}
         else {
            if (c==0) {
                c=1;   
                x=0; 
                document.getElementById("time").innerText="00";       
            }
            if (!flag){
                flag=true;
                Play();
                ctl.src="./img/pause.png";
            }
            else{
                flag=false;
                Pause();
                ctl.src="./img/play.png";
            }
            wx.stopVoice({
                localId:localId,
                success:function(){
                    stopTiming();
                    c=0;
                } 
            })
        }
    }
    //录音 开始 结束
    var ctl2=document.getElementById("btn1");
    ctl2.onclick=function(){
        if (jud==0){
            timing(1);
            wx.startRecord();
            document.getElementById("CD").style.animationPlayState = "running";
            ctl2.src="./img/stop.png";
            jud=1;
        }
         else{
            // localId=1;
            // stopTiming();
            wx.stopRecord({
                success:function(res){
                    localId=res.localId;
                    stopTiming();
                }
            });
            document.getElementById("CD").style.animationPlayState = "paused";
        }
    }
    //重录
    document.getElementById("btn3").onclick=function(){
        if (localId==null) {showError("你还没录音呢");}
         else {Redo();}
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
            url:prefix+"sendTimeCapsule",
            data:{
                "file_id":serverId,
            },
            type:"post",
            dataType:"json",
            success:function(){
                window.location.href="time-end.html"
            }
        })
    }
