$.ajax({
    url:prefix+"getName",
    type:"post",
    dataType:"json",
    data:{
        "uid":sessionStorage.getItem('uid'),
    },
    success:function(data){
        if (data.record==false) {showError("收件人信息不存在")}
         else{
            document.getElementById("name").value=data.name;
            document.getElementById("phone").value=data.tel;
            document.getElementById("name").setAttribute("readonly","readonly");
            document.getElementById("phone").setAttribute("readonly","readonly");
         }
    },
    error:function(err){
        if (err.status == 400) {
            alert("二维码无效");
            window.location.href="blank.html";
        }
    }
});

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
var ok=true;
var submit=document.getElementById("submit");
submit.addEventListener("click",function(){
    if (ok==true) {
      ok=false;
      var str="";
      var sel1=Checked("duration");
      console.log(sel1);
      var sel2=Checked("kind");
      console.log(sel2);
      var isQR=true;
      if (sel1=="undefined") {str+="未选活动期限哦<br/>"}
      if (sel2=="undefined") {str+="未选信件类型哦<br/>"}
      if (str==""){
          ok=true;
          var name=document.getElementById("name").value;
          var phone=document.getElementById("phone").value;
          sessionStorage.setItem('receiver_name', name);
          sessionStorage.setItem('receiver_tel', phone);
          sessionStorage.setItem('type', sel2);
          sessionStorage.setItem('period', sel1);
          sessionStorage.setItem('from_qrcode', isQR);
          if (sel1=="half-year") {sessionStorage.setItem('time', "半年");}
          else {sessionStorage.setItem('time', "一年");}
          if (sel2=="text") {window.location.href="time-letter.html"} 
            else {window.location.href="time-voice.html"}
      }
      else{ok=true; showError(str)}
    }
})