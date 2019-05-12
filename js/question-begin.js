var winWidth = $(window).width();
var winHeight = $(window).height();
document.getElementById("background").style.backgroundSize=winWidth+'px '+winHeight+'px';
$.ajax({
    url:prefix+"getInfo",
    type:"get",
    dataType:"json",
    success:function(data){
        document.getElementById("who").innerHTML=data.name;
    }
});
function change(){
    var q1=document.getElementById("q1");
    var q2=document.getElementById("q2");
    var q3=document.getElementById("q3");
    q1.style.display="none";
    q2.style.display="none";
    q3.style.display="none";
    $.ajax({
        // url:prefix+"getQuestions",
        url:"./json/test2.JSON",
        type:"get",
        dataType:"json",
        success:function(data){
            var i=0;
            id=new Array(4);
            text=new Array(4);
            for (var num in data){
                console.log(num+" "+data[num]);
                i++;
                id[i]=num;
                text[i]=data[num];
            }
            q1.innerHTML="<strong>Q&nbsp</strong>"+text[1];
            q2.innerHTML="<strong>Q&nbsp</strong>"+text[2];
            q3.innerHTML="<strong>Q&nbsp</strong>"+text[3]; 
            // q1.innerHTML="<strong>Q&nbsp</strong>"+"你有没有一次偷偷哭过？";
            // q2.innerHTML="<strong>Q&nbsp</strong>"+"在你想象中，最可怕的心理折磨是什么？";
            // q3.innerHTML="<strong>Q&nbsp</strong>"+"也许未来的自己很忙碌，经常不记得吃早饭，你想对那时的自己叮嘱写什么？";  
        },
    });
    var t1=window.setTimeout(pop1,50);
    var t2=window.setTimeout(pop2,200);
    var t3=window.setTimeout(pop3,300);
    function pop1(){
        q1.style.display="block";
    }
    function pop2(){
        q2.style.display="block";
    }
    function pop3(){
        q3.style.display="block";
    }
}
change();
var next=document.getElementById("next");
next.addEventListener("click",function(){
    change();
})

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
function enter(k){
    var sel=Checked("duration");
    localStorage.setItem('period', sel);
    localStorage.setItem('qid',id[k]);
    localStorage.setItem('qtext',text[k]);
    window.location.href="question-detail.html";
}
