document.getElementById("who").innerHTML='<strong>'+localStorage.getItem('username')+'</strong>'+'  同学';
function change(){
    var q1=document.getElementById("q1");
    var q2=document.getElementById("q2");
    var q3=document.getElementById("q3");
    q1.style.display="none";
    q2.style.display="none";
    q3.style.display="none";
    $.ajax({
        url:prefix+"getQuestions",
        type:"get",
        dataType:"json",
                    ///////////////////////// TEST
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    //////////////////////////
        success:function(data){
            var i=0;
            id=new Array(4);
            text=new Array(4);
            for (var num in data.question_list){
                console.log(num+" "+data.question_list[num]);
                i++;
                id[i]=num;
                text[i]=data.question_list[num];
            }
            q1.innerHTML="<strong>Q&nbsp</strong>"+text[1];
            q2.innerHTML="<strong>Q&nbsp</strong>"+text[2];
            q3.innerHTML="<strong>Q&nbsp</strong>"+text[3]; 
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
    var sel="";
    sel=Checked("duration");
    console.log(sel);
    if (sel=="undefined") {showError("还没选活动周期哦~")}
     else{
        localStorage.setItem('qperiod', sel);
        localStorage.setItem('qid',id[k]);
        localStorage.setItem('qtext',text[k]);
        console.log(sel);
        console.log(localStorage.getItem('qperiod'));
        window.location.href="question-detail.html";
     }
}
