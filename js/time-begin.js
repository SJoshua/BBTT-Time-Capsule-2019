document.getElementById("who").innerHTML='<strong>'+localStorage.getItem('username')+'</strong>'+'  同学';
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
var submit=document.getElementById("submit");
submit.addEventListener("click",function(){
    var str="";
    var name=document.getElementById("name").value;
    if (name==""){
        str+="收件人姓名未填写<br/>";
    }
    var phone=document.getElementById("phone").value;
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
        str+="手机号未填或错误<br/>";
    }
    var sel1=Checked("duration");
    console.log(sel1);
    var sel2=Checked("kind");
    console.log(sel2);
    var isQR=false;
    if (sel1=="undefined") {str+="未选活动期限哦<br/>"}
    if (sel2=="undefined") {str+="未选信件类型哦<br/>"}
    if (str==""){
        console.log(name);
        localStorage.setItem('receiver_name', name);
        localStorage.setItem('receiver_tel', phone);
        localStorage.setItem('type', sel2);
        localStorage.setItem('period', sel1);
        localStorage.setItem('from_qrcode', isQR);
        if (sel1=="half-year") {localStorage.setItem('time', "半年");}
         else {localStorage.setItem('time', "一年");}
        if (sel2=="text") {window.location.href="time-letter.html"} 
          else {window.location.href="time-voice.html"}
    }
    else{
        showError(str);
    }
})



