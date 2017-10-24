;(function () {
    "use strict";
    let procure_List;
    let procure_tbody = document.querySelector('#procure_tbody');
    let procure_form = document.querySelector('#procure_form');

    init();

    function init() {
        procure_List = procure.read();
        render();
        procure_form.addEventListener('submit',function (e) {
            e.preventDefault();
            let data = get_form_data(this);
            data.price = parseInt(data.price);
            if (data.id.length) {
                data.id = parseInt(data.id);
                procure.updata(data.id, data);
            }else{
                procure.add(data);
            }
            render();
        })
    }

    function get_form_data(form) {
        let data = {};
        let form_input =  form.querySelectorAll('input');

        form_input.forEach(function (e) {
            let key = e.name;
            let val = e.value;
            data[key] = val;
            e.value = '';
        });
        return data;
    }

    function set_form_data(id,form) {
        let form_input =  form.querySelectorAll('input');
        let item = procure.read(id);
        for(let name in item){
            form_input.forEach(function (e) {
                if(e.name === name){
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
            tr.innerHTML = `
            <td>${e.title}</td>
            <td>${e.price}</td>
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
        btn.addEventListener('click',function () {
            let id = parseInt(this.dataset.id);
            procure.remove(id);
            render();
        })
    }
    
    function updata_Event(btn) {
        btn.addEventListener('click',function () {
            let id = parseInt(this.dataset.id);
            set_form_data(id,procure_form);
        })
    }

})();
