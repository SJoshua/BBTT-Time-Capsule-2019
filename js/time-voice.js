var localId=null;
var serverId=null;
var t;   //计时器
var x=0; //读秒
var c=0;   //同一次试听
var jud= 0;         //有无录音
var flag = false;   //播放暂停状态
function timing(k){ //k=1 录音计时 k=2试听计时
    x++;
    if (x<10) { document.getElementById("time").innerText="00:0"+x;}
     else {
         if (x==60) {document.getElementById("time").innerText="01:00";}
           else {document.getElementById("time").innerText="00:"+x;}
        }
    if (k==1) {t=setTimeout("timing(1)",1000);}
    if ((k==2) && (flag==true)) {t=setTimeout("timing(2)",1000);}
}
function stopTiming(){
    clearTimeout(t);
}
function Play(){
    t=setTimeout("timing(2)",1000);
    //timing(2);
    document.getElementById("CD").style.animationPlayState = "running";
    wx.playVoice({
        localId:localId   
    })
}
function Pause(){
    document.getElementById("CD").style.animationPlayState = "paused";
    wx.pauseVoice({
        localId:localId   
    })
}
function Redo(){
    localId=null;
    serverId=null;
    stopTiming();
    x=0;
    document.getElementById("time").innerText="00:00";
    jud=0;
    c=0;
    document.getElementById("btn2").src="./img/play.png";
}

function Stop(pause){
    stopTiming();
    document.getElementById("CD").style.animationPlayState = "paused";
    x=0;
    document.getElementById("time").innerText="00:00";
    //document.getElementById("btn1").src="./img/start.png";
    document.getElementById("btn2").src="./img/play.png";
    if(!pause) flag = false;
}
init();
function init(){
    $.ajax({
        url:"https://hemc.100steps.net/2017/wechat/Home/Public/getJsApi",
        type:"post",
        dataType:"json",
        data:{url:location.href},
        success:function(arr){
            wx.config({
                debug:false, 
                appId:arr.appId, 
                timestamp: arr.timestamp, 
                nonceStr: arr.nonceStr, 
                signature: arr.signature,
                jsApiList: ['startRecord','stopRecord','onVoiceRecordEnd','onVoicePlayEnd','playVoice','pauseVoice','uploadVoice','stopVoice'] 
            });
            wx.ready(function(){
                wx.onVoiceRecordEnd({
                    // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                    complete: function (res) {
                        window.localId = res.localId;
                        Stop();
                        /*
                        stopTiming();
                        document.getElementById("CD").style.animationPlayState = "paused";
                        x=0;
                        document.getElementById("time").innerText="00:00";
                        */
                        
                    }
                });
                wx.onVoicePlayEnd({
                    success: function (res) {
                        window.localId = res.localId; // 返回音频的本地ID
                        Stop();
                        /*
                        stopTiming();
                        document.getElementById("CD").style.animationPlayState = "paused";
                        x=0;
                        document.getElementById("time").innerText="00:00";
                        */
                    }

                });
                //播放 暂停
                var ctl=document.getElementById("btn2");
                ctl.onclick=function(){
                    if (localId==null) {showError("先录音才能试听哦");}
                     else {
                        if (c==0) {
                            c=1;   
                            Stop(true);
                            //x=0; 
                            //document.getElementById("time").innerText="00";       
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
                        // localId=1; //
                        // stopTiming();//
                        wx.stopRecord({
                            success:function(res){
                                localId=res.localId;
                                stopTiming();
                            }
                        });
                        document.getElementById("btn1").src="./img/start.png";
                        document.getElementById("CD").style.animationPlayState = "paused";
                    }
                }
                //重录
                document.getElementById("btn3").onclick=function(){
                    if (localId==null) {showError("你还没录音呢");}
                     else {
                         if (c==1) {
                            wx.stopVoice({
                                localId:localId,
                                success:function(){
                                    Stop();
                                    /*
                                    stopTiming();
                                    x=0;
                                    document.getElementById("time").innerText="00";
                                    */
                                } 
                            })
                         }
                         Redo();
                        }
                }
                var ok=true;
                document.getElementById("finish").onclick=function(){
                    if (jud==0){showError("你还没录音呢");}
                     else {
                         if (ok==true) {
                            ok=false;
                            wx.uploadVoice({
                                localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    serverId = res.serverId; // 返回音频的服务器端ID
                                    $.ajax({
                                        url:prefix+"sendTimeCapsule",
                                        data:{
                                            "receiver_name":sessionStorage.getItem('receiver_name'),
                                            "receiver_tel":sessionStorage.getItem('receiver_tel'),
                                            "type":sessionStorage.getItem('type'),
                                            "period":sessionStorage.getItem('period'),
                                            "from_qrcode":sessionStorage.getItem('from_qrcode'),
                                            "file_id":serverId,
                                        },
                                        type:"post",
                                        dataType:"json",
                                        success:function(data){
                                            ok=true;
                                            sessionStorage.setItem('count', data.count);
                                            window.location.href="time-end.html";
                                        },
                                        error:function(err){
                                            ok=true;
                                            if (err.status == 401) {
                                                location.href=bbt+encodeURIComponent( location.href );
                                            }
                                            if (err.status == 403) {
                                                location.href="info.html";
                                            }
                                            if (err.status == 400) {
                                                console.log(err.message);
                                            }
                                            if (err.status == 404) {
                                                showError("上传录音失败");
                                            }
                                        }
                                    })
                                }
                            });
                         }
                     }
                }
            })
        }
    })
}

