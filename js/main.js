// PJAX 集成
let pjax;    //// 使其能全局访问
//// 初始化 PJAX
function initPjax(){
    try{
        pjax = new Pjax({
            selectors: [
                "head meta",
                "head title",
                "body h1",
                "fake-window",
                ".pjax-reload"
            ]
        })
    }
    catch(e){
        console.log('PJAX 初始化出错：' + e);
    }
}

document.addEventListener("pjax:complete", function () {
    collapsible();
});


// 折叠元素
function collapsible () {
    var cont = document.querySelectorAll('.collapse-content');
    if (cont) {
        for (var i = 0; i < cont.length; i++) {
            cont[i].classList.toggle("tmp-block");
        }
    }
    cont = null;
    var coll = document.querySelectorAll('.collapsible');
    if (coll) {
        for (var i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
    }
}


// 初始化
function 初始化() {
    initPjax();    //// 初始化 PJAX
    collapsible();
}


// 触发器
//// 网页加载完毕后触发
window.addEventListener('load', () => 初始化());
//// 监听 Pjax 完成后，重新加载
document.addEventListener("pjax:complete", function () {
    collapsible();
})