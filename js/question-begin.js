$.ajax({
  url:prefix+"getInfo",
  // url:"./json/test.JSON",
                              ///////////////////////// TEST
                              xhrFields: {
                                  withCredentials: true
                              },
                              crossDomain: true,
                              //////////////////////////
  type:"get",
  dataType:"json",
  success:function(data){
      if (data.record==true) {
           document.getElementById("who").innerHTML='<strong>'+data.name+'</strong>';
      }
       else {window.location.href="info.html"}
  },
  error:function(err){
      if (err.status_code == 401) {
          location.href=bbt+encodeURIComponent( location.href );
      }
  }
});
function change(){
    var q1=document.getElementById("q1");
    var q2=document.getElementById("q2");
    var q3=document.getElementById("q3");
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
