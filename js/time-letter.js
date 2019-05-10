var winWidth = $(window).width();
var winHeight = $(window).height();
document.getElementById("background").style.backgroundSize=winWidth+'px '+winHeight+'px';
var height = document.documentElement.clientHeight; 
document.getElementById("submit").style.top=height*0.8+'px';
function showError(str){
    var con=document.createElement("div");
    con.className="err";
    con.setAttribute('id','ww');
    con.innerHTML =
        '<p>'+str+'</p>'+
        '<img class="sbtn" id="sbtn" src="../img/btn2.png">';
    document.getElementsByTagName('body')[0].appendChild(con);
    document.getElementById("dark").style.display="block";
	document.getElementById("sbtn").addEventListener("click",removeError);
}
function removeError(){
	var warning = document.getElementById('ww');
    document.body.removeChild(warning);
    document.getElementById("dark").style.display="none";
}
window.onload=function(){

var submit=document.getElementById("submit");
submit.addEventListener("click",function(){
    var msg=document.getElementById("msg").value;
    if (msg=="") {showError("信件不能为空哦")}
     else{
        $.ajax({
            url:"http://localhost:2019/api/sendTimeCapsule",
    ///////////////////////// TEST
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    //////////////////////////
            data:{
                "message":msg,
            },
            type:"post",
            dataType:"json",
            success:function(){
                window.location.href="time-end.html";
            }
        })
    }   
})

}