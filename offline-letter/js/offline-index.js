function start() {
    window.location.href = getInfoHtml;
}

var bodyHeight = window.innerHeight;
console.log(bodyHeight);
var totalHeight = document.getElementById("total").offsetHeight;
console.log(totalHeight);
var num = bodyHeight - totalHeight;
document.getElementById("total").style.marginTop = num / 2 + "px";
