;(function () {
    "use strict";

    let link_list = document.querySelectorAll('[data-link]');
    let page_list = document.querySelectorAll('[data-page]');

    init();

    function init() {
        let page = a.get('currentPage') || 'home';
        pageRender(page);
        linkEvent();
    }


    function linkEvent() {
        link_list.forEach(function (e) {
            e.addEventListener('click', function () {
                let page = e.dataset.link;
                a.set('currentPage', page);
                pageRender(page);
            })
        });
    }

    function pageRender(page) {
        page_list.forEach(function (e) {
            e.hidden = e.dataset.page !== page;
        })
    }


})();