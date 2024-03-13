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

collapsible();