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
function submit() {
    var str="";
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
     showError("消息没填完整哦")
    }
     else{
         if ((!judge(sendphone)) || (!judge(receivephone))){
             showError("手机号格式错误")
         }
          else{
              var prefix="http://server.sforest.in:2019/api/";
              $.ajax({
                  url:prefix+"sendOfflineCapsule",
                  data:{
                    "receiver_name":receivepeople,
                    "receiver_tel":receivephone,
                    "receiver_addr":address,
                    "capsule_id":code,
                    "period":sel1,
                    "seal":ifseal,
                  },
                  type:"post",
                  dataType:"json",
                  success:function(){
                    
                  }
              })
              //提交成功提示？
          }
     }
}