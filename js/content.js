var t1=window.setTimeout(pop1,800);
var t2=window.setTimeout(pop2,1600);
var t3=window.setTimeout(pop3,2400);
var t4=window.setTimeout(pop4,3200);
function pop1(){
    var obj= document.getElementById("1");
    obj.style.animation="pop 2s";
    obj.style.display="block";
}
function pop2(){
    var obj= document.getElementById("2");
    obj.style.animation="pop 2s";
    obj.style.display="block";
}
function pop3(){
    var obj= document.getElementById("3");
    obj.style.animation="pop 2s";
    obj.style.display="block";
}
function pop4(){
    var obj= document.getElementById("4");
    obj.style.animation="pop 2s";
    obj.style.display="block";
}