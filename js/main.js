// 使用 IIFE 包裹以避免全局变量污染
(function () {
    var loadingBar = document.querySelector(".loading-bar");
    var progress = document.querySelector(".loading-bar .progress");
    var timer = null;
    let pjax;

    function initAni() {
        loadingBar = document.querySelector(".loading-bar");
        progress = document.querySelector(".loading-bar .progress");
    }

    // 初始化 PJAX
    function initPjax() {
        try {
            const Pjax = window.Pjax || function () { };
            pjax = new Pjax({
                selectors: [
                    "head meta",
                    "head title",
                    "body h1",
                    "fake-window",
                    ".pjax-reload"
                ],
                cacheBust: false
            });
        } catch (e) {
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
                element.addEventListener("click", function () {
                    this.classList.toggle("active");
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

    function endLoad() {
        clearInterval(timer);
        progress.style.width = "100%";
        loadingBar.classList.remove("loading");

        setTimeout(function () {
            progress.style.width = 0;
        }, 400);
    }

    // 初始化
    function initialize() {
        initPjax();
        initAni();
        handleCollapsibleElements();
    }


    // 触发器
    // 网页加载完毕后触发
    window.addEventListener('DOMContentLoaded', () => initialize());
    // Pjax 开始时执行的函数
    document.addEventListener("pjax:send", function () {
        var loadingBarWidth = 20;
        var MAX_LOADING_WIDTH = 95;

        loadingBar.classList.add("loading");
        progress.style.width = loadingBarWidth + "%";

        clearInterval(timer);
        timer = setInterval(function () {
            loadingBarWidth += 3;

            if (loadingBarWidth > MAX_LOADING_WIDTH) {
                loadingBarWidth = MAX_LOADING_WIDTH;
            }

            progress.style.width = loadingBarWidth + "%";
        }, 500);
    });
    // 监听 Pjax 完成后，重新加载
    document.addEventListener("pjax:complete", function () {
        handleCollapsibleElements();
        endLoad();
    });
})();
