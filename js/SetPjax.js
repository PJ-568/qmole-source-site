var pjax = new Pjax({
    selectors: [
        "head meta",
        "head title",
        "body h1",
        "fake-window",
        ".pjax-reload"
    ],
});

function pjax_reload() {
    collapsible();
}

document.addEventListener("pjax:complete", function () {
    pjax_reload();
});