var winWidth = $(window).width();
var winHeight = $(window).height();
document.getElementById("background").style.backgroundSize=winWidth+'px '+winHeight+'px';
var height = document.documentElement.clientHeight;  
document.getElementById("main").style.top=height*0.4+'px';
document.getElementById("submit").style.top=height*0.6+'px';

function showError(str){
    var con=document.createElement("div");
    con.className="err";
    con.setAttribute('id','ww');
    con.innerHTML =
        '<p>'+str+'</p>'+
        '<img class="sbtn" id="sbtn" src="./img/btn2.png">';
    document.getElementsByTagName('body')[0].appendChild(con);
    document.getElementById("dark").style.display="block";
	document.getElementById("sbtn").addEventListener("click",removeError);
}
function removeError(){
	var warning = document.getElementById('ww');
    document.body.removeChild(warning);
    document.getElementById("dark").style.display="none";
}

var submit=document.getElementById("submit");
submit.addEventListener("click",function(){
    var str="";
    var name=document.getElementById("name").value;
    if (name==""){
        str+="姓名未填写<br/>";
    }
    var phone=document.getElementById("phone").value;
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
        str+="手机号格式错误<br/>";
    }
    if (str==""){
        $.ajax({
            url:"updateInfo",
            data:{
                "name":name,
                "tel":phone,
            },
            type:"post",
            dataType:"json",
            success:function(){
              
            }
        })
        window.location.href="content.html";
    }
    else{
        showError(str);
    }
})




