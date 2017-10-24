;(function () {
    "use strict";

    let link_list = document.querySelectorAll('[data-link]');
    let page_list = document.querySelectorAll('[data-page]');

    let admin_link = document.querySelectorAll('[data-admin-link]');
    let admin_page = document.querySelectorAll('[data-admin-page]');



    init();

    function init() {
        let page = a.get('currentPage') || 'home';
        pageRender(page);
        Render('admin_procure',admin_page);
        Event(admin_link);
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

    function Render(page,list) {
        list.forEach(function (e) {
            e.hidden = e.dataset.adminPage !== page;
        })
    }
    function Event(list) {
        list.forEach(function (e) {
            e.addEventListener('click', function () {
                let page = e.dataset.adminLink;
                Render(page,admin_page);
            })
        });
    }


})();