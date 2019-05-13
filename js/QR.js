var bodyHeight = window.innerHeight;
console.log(bodyHeight);
var mainHeight = document.getElementById("main").offsetHeight;
console.log(mainHeight);
var num = bodyHeight - mainHeight;
document.getElementById("btn").style.height = num + "px";

function GetRequest() {  
    var url = location.search; //获取url中"?"符后的字串  
    var theRequest = new Object();  
    if (url.indexOf("?") != -1) {  
       var str = url.substr(1);  
       strs = str.split("&");  
       for(var i = 0; i < strs.length; i ++) {  
          theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
       }  
    }  
    return theRequest;  
 }   

$.ajax({
    url:prefix+"getName",
    // url:"./json/test.JSON",
    type:"post",
    dataType:"json",
    data:{
        "uid":GetRequest(),
    },
    success:function(data){
        if (data.record==false) {showError("收件人信息不存在")}
         else{
            document.getElementById("name").innerText=data.name;
            document.getElementById("phone").innerText=data.tel;
         }
    },
    error:function(err){
        if (err.status == 400) {
            alert("二维码无效");
            window.location.href="index.html";//exit?
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

var submit=document.getElementById("submit");
submit.addEventListener("click",function(){
    var str="";
    var sel1=Checked("duration");
    console.log(sel1);
    var sel2=Checked("kind");
    console.log(sel2);
    var isQR=false;
    if (sel1=="undefined") {str+="未选活动期限哦<br/>"}
    if (sel2=="undefined") {str+="未选信件类型哦<br/>"}
    if (str==""){
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