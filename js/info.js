$.ajax({
    url:prefix+"getInfo",
    ///////////////////////// TEST
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    //////////////////////////
    type:"get",
    dataType:"json",
    error: function(err) {
        if (err.status == 401) {
            location.href=bbt+encodeURIComponent( location.href );
        }
    }
})
var submit=document.getElementById("submit");
var ok=true;
submit.addEventListener("click",function(){
    if (ok==true) {
    ok=false;
    var str="";
    var name=document.getElementById("name").value;
    if (name==""){
        str+="姓名未填写<br/>";
    }
    var phone=document.getElementById("phone").value;
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
        str+="手机号未填或错误<br/>";
    }
    if (str==""){
        $.ajax({
            url:prefix+"updateInfo",
            ///////////////////////// TEST
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            //////////////////////////
            data:{
                "name":name,
                "tel":phone,
            },
            type:"post",
            dataType:"json",
            success:function(){
                ok=true;
                sessionStorage.setItem('username', name);
                console.log(sessionStorage.getItem('where'));
                if (sessionStorage.getItem('where')=="2") {
                    window.location.href="QR.html";
                } 
                 else{
                    window.location.href="content.html";
                 }
            },
            error:function(err){
                ok=true;
                if (err.status == 409) {
                    showError("用户名已存在");
                }
            }
        })
    }
    else{
        showError(str);
        ok=true;
    }

    }
})




