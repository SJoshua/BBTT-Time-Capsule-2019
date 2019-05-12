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
        url:prefix+"getQuestions",
        // url:"./json/test2.JSON",
        type:"get",
        dataType:"json",
        success:function(data){
            var i=0; var id1,id2,id3; 
            for (var num in data){
                i++;
                console.log(num+" "+data[num]);
                // id[i]=num;
                // text[i]=data.num;
                if (i==1) {
                    id1=num;
                    q1.innerText=data[num];
                }
                if (i==2) {
                    id2=num;
                    q2.innerText=data[num];
                }
                if (i==3) {
                    id3=num;
                    q3.innerText=data[num];
                }
            }
            // q1.innerHTML="<strong>Q&nbsp</strong>"+"你有没有一次偷偷哭过？";
            // q2.innerHTML="<strong>Q&nbsp</strong>"+"在你想象中，最可怕的心理折磨是什么？";
            // q3.innerHTML="<strong>Q&nbsp</strong>"+"也许未来的自己很忙碌，经常不记得吃早饭，你想对那时的自己叮嘱写什么？";  
        }
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
    if (k==1) {
        localStorage.setItem('qid', id1);
        localStorage.setItem('question',q1.innerText);
    };
    if (k==2) {
        localStorage.setItem('qid', id2);
        localStorage.setItem('question',q2.innerText);
    };
    if (k==3) {
        localStorage.setItem('qid', id3);
        localStorage.setItem('question',q3.innerText);
    };
    window.location.href="question-detail.html";
}
