;(function () {
    "use strict";
    let procure_List;
    let procure_tbody = document.querySelector('#procure_tbody');
    let procure_form = document.querySelector('#procure_form');
    let select_bar = document.querySelector('#select_bar');


    init();

    function init() {
        procure_List = procure.read();
        render();
        selectRender(select_bar, 0);
        procure_form.addEventListener('submit', function (e) {
            e.preventDefault();
            let data = get_form_data(this);
            data.price = parseInt(data.price);
            if(!data.catId){
                throw 'error';
            }
            if (data.id.length) {
                data.id = parseInt(data.id);
                checkbox(this, data.id);
                procure.updata(data.id, data);
            } else {
                checkbox(this);
                procure.add(data);
            }
            reFormVal(this);
            render();
            selectRender(select_bar, 0);
        })
    }



    function selectRender(bar, pid) {
        let list = cat.getTrees();
        if (!list[pid]) {
            bar.innerHTML = '';
            return;
        }
        console.log(pid);
        bar.innerHTML = '';
        let span = document.createElement('span');
        span.innerHTML = `
            <select>
              <option>-请输入-</option>
            </select>
            <span class="children"></span>
            `;
        let select = span.querySelector('select');
        let childList = span.querySelector('.children');
        list[pid].forEach(function (e) {
            let option = document.createElement('option');
            option.innerHTML = e.title;
            option.value = e.id;
            select.appendChild(option);
        });
        bar.appendChild(span);

        select.addEventListener('change', function () {
            selectRender(childList, this.value);

        })

    }

    function checkbox(form, id) {
        let checkboxList = form.querySelectorAll('[data-name]');
        checkboxList.forEach(function (e) {
            let name = e.dataset.name;
            let bool = e.checked;
            if (id) {
                hot.updata(id, bool, name);
            } else {
                if (bool) {
                    hot.add(name);
                }
            }
        })
    }

    function get_form_data(form) {
        let data = {};
        let form_input = form.querySelectorAll('[name]');
        let selectAll = form.querySelectorAll('select');
        form_input.forEach(function (e) {
            let key = e.name;
            let val = e.value;
            data[key] = val;
        });
        data.catId = parseInt((selectAll[selectAll.length-1].value));
        return data;
    }

    function reFormVal(form) {
        let input = form.querySelectorAll('input');
        input.forEach(function (e) {
            if (e.type === 'checkbox') {
                e.checked = false;
            }
            e.value = '';
        })
    }

    function set_form_data(id, form) {
        let form_input = form.querySelectorAll('input');
        let checkboxList = form.querySelectorAll('[data-name]');
        checkboxList.forEach(function (e) {
            let list = a.get(e.dataset.name);
            let index = hot.find_Index(id, list);
            e.checked = index > -1;
        });
        let item = procure.read(id);
        for (let name in item) {
            form_input.forEach(function (e) {
                if (e.name === name) {
                    e.value = item[name];
                }
            })
        }
    }


    function render() {
        let list = procure.read();
        procure_tbody.innerHTML = '';
        list.forEach(function (e) {
            let tr = document.createElement('tr');
            let newTag = '';
            let hotTag = '';
            let iiTag = '';

            if (hot.find_Index(e.id, a.get('newList')) > -1) {
                newTag = ' 新品 ';
            }
            if (hot.find_Index(e.id, a.get('hotList')) > -1) {
                hotTag = ' 热卖 ';
            }
            if (hot.find_Index(e.id, a.get('iiList')) > -1) {
                iiTag = ' 双十一 ';
            }
            if (newTag === '' && hotTag === '' && iiTag === '') {
                newTag = '-';
            }
            tr.innerHTML = `
            <td>${e.id}</td>
            <td data-tag="tag" class="">${newTag + '' + hotTag + '' + iiTag}</td>
            <td>${e.title}</td>
            <td>${e.price}</td>
            <td>${cat.getCatName(e.catId)}</td>
            <td>
            <button data-id="${e.id}" class="updata_btn">更新</button>
            <button data-id="${e.id}" class="remove_btn" >删除</button>
            </td>
            `;


            procure_tbody.insertBefore(tr, procure_tbody.firstChild);
            updata_Event(tr.querySelector('.updata_btn'));
            remove_Event(tr.querySelector('.remove_btn'));
        })
    }

    function remove_Event(btn) {
        btn.addEventListener('click', function () {
            let id = parseInt(this.dataset.id);
            procure.remove(id);
            hot.remove(id, 'hotList');
            hot.remove(id, 'newList');
            hot.remove(id, 'iiList');
            render();
        })
    }

    function updata_Event(btn) {
        btn.addEventListener('click', function () {
            let id = parseInt(this.dataset.id);
            set_form_data(id, procure_form);
        })
    }

})();
