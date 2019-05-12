var bodyHeight = window.innerHeight;
console.log(bodyHeight);
var mainHeight = document.getElementById("main").offsetHeight;
console.log(mainHeight);
var num = bodyHeight - mainHeight;
document.getElementById("btn").style.height = num + "px";