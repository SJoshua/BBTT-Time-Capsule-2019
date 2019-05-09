var winWidth = $(window).width();
var winHeight = $(window).height();
document.getElementById("background").style.backgroundSize=winWidth+'px '+winHeight+'px';
var height = document.documentElement.clientHeight;  
document.getElementById("main").style.top=height*0.53+'px';
document.getElementById("main").style.width=winWidth+'px';
document.getElementById("submit").style.top=height*0.83+'px';
$.ajax({
    // url:"getInfo",
    url:"http://server.sforest.in:2019/api/getInfo",
    type:"post",
    dataType:"json",
    success:function(data){
        document.getElementById("who").innerHTML=data.name;
    }
});
window.onload=function(){

function showError(str){
    var con=document.createElement("div");
    con.className="err";
    con.setAttribute('id','ww');
    con.innerHTML =
        '<p>'+str+'</p>'+
        '<img class="sbtn" id="sbtn" src="./img/btn7.png">';
    document.getElementsByTagName('body')[0].appendChild(con);
    document.getElementById("dark").style.display="block";
	document.getElementById("sbtn").addEventListener("click",removeError);
}
function removeError(){
	var warning = document.getElementById('ww');
    document.body.removeChild(warning);
    document.getElementById("dark").style.display="none";
}
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
        str+="手机号格式错误<br/>";
    }
    var sel1=Checked("duration");
    var sel2=Checked("kind");
    var isQR=false;
    if (sel1=="undefined") {str+="未选活动期限哦<br/>"}
    if (sel2=="undefined") {str+="未选信件类型哦<br/>"}
    console.log(sel2);
    if (str==""){
        $.ajax({
            url:"http://server.sforest.in:2019/api/sendTimeCapsule",
            data:{
                "receiver_name":name,
                "receiver_tel":phone,
                "type":sel2,
                "period":sel1,
                "from_qrcode":isQR,
            },
            type:"post",
            dataType:"json",
            success:function(){

            }
        })
        if (sel2=="text") {window.location.href="time-letter.html"} 
            else {window.location.href="time-voice.html"}
    }
    else{
        showError(str);
    }
})

}
