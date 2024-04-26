// 使用 IIFE 包裹以避免全局变量污染
(function() {
    // 使用 let 声明局部变量以减少变量污染
    let pjax;

    // 初始化 PJAX
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
            });
        } catch(e){
            console.log('PJAX 初始化出错：' + e);
        }
    }

    // 折叠元素的函数，增加了异常处理和一些优化
    function handleCollapsibleElements() {
        try {
            let cont = document.querySelectorAll('.collapse-content');
            cont.forEach(element => element.classList.toggle("tmp-block"));

            let coll = document.querySelectorAll('.collapsible');
            coll.forEach(element => {
                element.addEventListener("click", function() {
                    let content = this.nextElementSibling;
                    if (content && content.style.display === "block") {
                        content.style.display = "none";
                    } else if (content) {
                        content.style.display = "block";
                    }
                });
            });
        } catch (e) {
            console.log('处理可折叠元素时出错：' + e);
        }
    }


    // 初始化函数，改进了命名
    function initialize() {
        initPjax();
        handleCollapsibleElements();
    }


    // 触发器
    // 网页加载完毕后触发
    window.addEventListener('DOMContentLoaded', () => initialize());
    // 监听 Pjax 完成后，重新加载
    document.addEventListener("pjax:complete", function() {
        handleCollapsibleElements();
    });
})();