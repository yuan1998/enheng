;(function () {
    "use strict"

    let add_cat_form = document.querySelector('#add_cat_form');
    let cat_list = document.querySelector('#cat_list');


    init();

    function init() {
        render();
        add_cat_form.addEventListener('submit', function (e) {
            e.preventDefault();
            let data = get_form_data(this);
            data.pid = parseInt(data.pid);
            if (data.id.length) {
                data.id = parseInt(data.id);
                cat.updata(data.id, data);
            } else {
                cat.add(data);
            }
            reFormVal(this);
            render();
        })
    }

    function reFormVal(form) {
        let input = form.querySelectorAll('input');
        input.forEach(function (e) {
            e.value = '';
        })
    }


    function get_form_data(form) {
        let data = {};
        let form_input = form.querySelectorAll('[name]');
        form_input.forEach(function (e) {
            let key = e.name;
            let val = e.value;
            data[key] = val;
        });
        return data;
    }

    function set_from_data(from, item) {
        let form_input = from.querySelectorAll('[name]');
        form_input.forEach(function (e) {
            for (let iu in item) {
                if (e.name === iu) {
                    e.value = item[iu];
                }
            }
        })
    }


    function render() {
        let catList = cat.read();
        cat_list.innerHTML = '';
        catList.forEach(function (e) {
            let tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${e.id}</td>
            <td>${e.title}</td>
            <td>${e.pid}</td>
            <td>
            <button data-id="${e.id}" class="updata_btn">更新</button>
            <button data-id="${e.id}" class="remove_btn" >删除</button>
            </td>
            `
            cat_list.insertBefore(tr, cat_list.firstChild);
            updata_Event(tr.querySelector('.updata_btn'));
            remove_Event(tr.querySelector('.remove_btn'));
        })
    }

    function updata_Event(btn) {
        btn.addEventListener('click', function () {
            let id = parseInt(this.dataset.id);
            let item = cat.read(id);
            set_from_data(add_cat_form, item);
        })
    }

    function remove_Event(btn) {
        btn.addEventListener('click', function () {
            let id = parseInt(this.dataset.id);
            cat.remove(id);
            render();
        })
    }
})();