function Checked(name) {
    var radios = document.getElementsByName(name);
    for (var i = 0; i < radios.length; ++i) {
      if (radios[i].checked) {
        return radios[i].value;
      }
      if (i == radios.length - 1) {
        return "undefined";
      }
    }
  }
function judge(num){
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(num))) {return false}
     else {return true}
}
var ok=true;
function submit() {
    if (ok==true) {
    ok=false;
    var sendpeople = document.getElementById("sendpeople").value;
    var sendphone = document.getElementById("sendphone").value;
    var code = document.getElementById("code").value;
    var receivepeople = document.getElementById("receivepeople").value;
    var receivephone = document.getElementById("receivephone").value;
    var address = document.getElementById("address").value;
    var sel1=Checked("duration");
    var sel2=Checked("check");
    console.log(sel1);
    console.log(sel2);
    var ifseal;
    if (sel2=="yes") {ifseal=true;}
     else {ifseal=false;}
    if (sendpeople == "" || sendphone == "" || code == "" || receivepeople == "" || receivephone == "" || address == "" || sel1 == "undefined" || sel2 == "undefined") {
      ok=true;
      showError("消息没填完整哦~");
    }
      else{
      var str="";
      if (!judge(sendphone)) {
            str+="寄信人手机号格式错误<br>";
      }
      if (!judge(receivephone)){
            str+="收件人手机号格式错误<br>";
      }
      if (str=="" ){
      $.ajax({
          url:prefix+"sendOfflineCapsule",
          ///////////////////////// TEST
          xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        //////////////////////////
        type:"post",
        dataType:"json",
          data:{
            "sender_name":sendpeople,
            "sender_tel":sendphone,
            "receiver_name":receivepeople,
            "receiver_tel":receivephone,
            "receiver_addr":address,
            "capsule_tag":code,
            "period":sel1,
            "seal":ifseal,
          },
          success:function(){
            ok=true;
            window.location.href="offline-success.html";
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
                showError("取信码格式错误");
            }
            if (err.status == 409) {
              showError("该取信码已存在");
          }
        }
      })
    }
    else {ok=true; showError(str);}
    }
}
  }
