;(function () {
    "use strict";

    let link_list = document.querySelectorAll('[data-link]');
    let page_list = document.querySelectorAll('[data-page]');

    let admin_link = document.querySelectorAll('[data-admin-link]');
    let admin_page = document.querySelectorAll('[data-admin-page]');
    let authorize_page = document.querySelectorAll('[data-authorize-page]');
    let authorize_link = document.querySelectorAll('[data-authorize-link]');


    init();

    function init() {
        let page = a.get('currentPage') || 'home';
        pageRender(page);
        adminRender('', admin_page);
        authorizeRender('login', authorize_page);
        adminEvent(admin_link);
        authorizeEvent(authorize_link);
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

    function adminRender(page, list) {
        list.forEach(function (e) {
            e.hidden = e.dataset.adminPage !== page;
        })
    }

    function authorizeRender(page, list) {
        list.forEach(function (e) {
            e.hidden = e.dataset.authorizePage !== page;
        })
    }

    function adminEvent(list) {
        list.forEach(function (e) {
            e.addEventListener('click', function () {
                let page = e.dataset.adminLink;
                adminRender(page, admin_page);
            })
        });
    }

    function authorizeEvent(list) {
        list.forEach(function (e) {
            e.addEventListener('click', function () {
                let page = e.dataset.authorizeLink;
                authorizeRender(page, authorize_page);
            })
        });
    }


})();