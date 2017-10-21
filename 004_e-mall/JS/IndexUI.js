;(function () {
    "use strict";

    let add_btn = document.querySelector('#add_btn');
    let add_form = document.querySelector('#add_form');
    let add_bar = document.querySelector('#add_bar');
    let add_bar_close = document.querySelector("#add_bar_close");
    let goods_wrap = document.querySelector("#goods_wrap");
    let test = document.querySelector('#test');


    /*  函数运行  */
    init();

    /*  测试  */

    /*  init  */
    function init() {
        addBarEvent();
        addFormEvent();
        addFormCloseEvent();
        render();
    }


    /*  render  */
    function render() {
        let goodsList = a.get('goodsList');
        goods_wrap.innerHTML = '';
        goodsList.forEach(function (each) {
            let new_tag;
            if (each.new) {
                if (each.hot) {
                    new_tag = String.fromCharCode("0xd83c", "0xdd95") + String.fromCharCode("0xd83d", "0xdd25");
                } else {
                    new_tag = String.fromCharCode("0xd83c", "0xdd95");
                }
            } else {
                if (each.hot) {
                    new_tag = String.fromCharCode("0xd83d", "0xdd25");
                } else {
                    new_tag = '-';
                }
            }
            let div = document.createElement('div');
            div.innerHTML = `
            <span class="col id col-1">${each.id}</span>
            <span class="col tag col-1">${new_tag}</span>
            <span class="col goods_title col-2">${each.title}</span>
            <span class="col goods_info col-2">${each.info}</span>
            <span class="col goods_price col-1">${each.price}</span> 
            <span class="col create_date col-2">${new Date(each.date).toLocaleString()}</span>
            <span class="col btnBar col-3">
            <button class="updata_btn">更改</button>  
            <button class="del_btn">删除</button>  
            </span>
            `;
            div.setAttribute('class', 'row');
            div.setAttribute('data-id', each.id);
            goods_wrap.insertBefore(div, goods_wrap.firstChild);
            updataEvent(div.querySelector('.updata_btn'), each.id);
            delEvent(div.querySelector('.del_btn'), each.id);
        })
    }

    /*  删除数据  */
    function delEvent(btn, id) {
        btn.addEventListener('click', function () {
            b.del(id);
            render();
        })
    }

    /*  更新数据  */
    function updataEvent(btn, id) {
        btn.addEventListener('click', function () {
            test.value = id;
            let item = b.find(id);
            let input = add_form.querySelectorAll('input');
            for (let i = 0; i < input.length; i++) {
                if (input[i].type === 'hidden') {
                    continue;
                }
                for (let j in item) {
                    if (input[i].name === j) {
                        if (input[i].type === 'checkbox') {
                            input[i].checked = item[j];
                            continue;
                        }
                        input[i].value = item[j];
                    }
                }
            }
            add_bar.style.display = 'block';
            console.log(test.value);
        })

    }

    /*  add_form_event  */
    function addFormEvent() {
        add_form.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log(test.value);
            if (!test.value) {
                console.log('true');
                let pack = packVal();
                b.add(pack);
                render();
                add_bar.style.display = 'none';
            } else {
                console.log('false');
                let id = parseInt(test.value);
                let pack = packVal();
                test.value = '';
                b.updata(id, pack);
                render();
                add_bar.style.display = 'none';
            }

        });
    }

    /*  取值  */
    function packVal() {
        let input = add_form.querySelectorAll('input');
        let pack = {};
        for (let i = 0; i < input.length; i++) {
            if (input[i].type === 'hidden') {
                continue;
            }
            if (input[i].type === 'checkbox') {
                pack[input[i].name] = input[i].checked;
                input[i].checked = false;
                continue;
            }
            let key = input[i].name;
            let val = input[i].value;
            pack[key] = val;
            input[i].value = '';
        }
        return pack;
    }

    /*  add_form_close_event  */
    function addFormCloseEvent() {
        add_bar_close.addEventListener('click', function () {
            let input = add_form.querySelectorAll('input');
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
                if (input[i].type === 'checkbox'){
                    input[i].checked = false;
                }
            }
            test.value = '';
            add_bar.style.display = 'none';
        })
    }


    /*  add_bar_event  */
    function addBarEvent() {
        add_btn.addEventListener('click', function () {
            add_bar.style.display = 'block';
        })
    }
})();