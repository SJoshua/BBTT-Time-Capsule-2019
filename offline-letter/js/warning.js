function showError(str){
    var con=document.createElement("div");
    con.className="err";
    con.setAttribute('id','ww');
    con.innerHTML =
        '<p>'+str+'</p>'+
        '<img class="sbtn" id="sbtn" src="img/submit.png">';
    document.getElementsByTagName('body')[0].appendChild(con);
    document.getElementById("dark").style.display="block";
	document.getElementById("sbtn").addEventListener("click",removeError);
}
function removeError(){
	var warn = document.getElementById('ww');
    document.body.removeChild(warn);
    document.getElementById("dark").style.display="none";
}