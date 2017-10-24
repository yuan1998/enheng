;(function () {
    "use strict";

    let add_btn = document.querySelector('#add_btn');
    let add_form = document.querySelector('#add_form');
    let add_bar = document.querySelector('#add_bar');
    let add_bar_close = document.querySelector("#add_bar_close");
    let goods_wrap = document.querySelector("#goods_wrap");
    let test = document.querySelector('#test');
    let newCheck = document.querySelector('#newCheck');
    let hotCheck = document.querySelector('#hotCheck');


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
            oneRender(each);
        })
    }

    /*  单个渲染  */
    function oneRender(each) {
        let new_tag,
            newIndex = b.newIndex(each.id),
            hotIndex = b.hotIndex(each.id),
            div = document.createElement('div');
        if (newIndex !== -1) {
            if (hotIndex !== -1) {
                new_tag = String.fromCharCode("0xd83c", "0xdd95") + String.fromCharCode("0xd83d", "0xdd25");
            } else {
                new_tag = String.fromCharCode("0xd83c", "0xdd95");
            }
        } else {
            if (hotIndex !== -1) {
                new_tag = String.fromCharCode("0xd83d", "0xdd25");
            } else {
                new_tag = '-';
            }
        }
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
            let item = b.find(id),
                hotindex = b.Index(id,'hotList'),
                newindex = b.Index(id,'newList'),
                input = add_form.querySelectorAll('input');
            for (let i = 0; i < input.length; i++) {
                if (input[i].type === 'hidden') {
                    continue;
                }
                if (input[i].name === 'hotList' && hotindex !== -1) {
                        input[i].checked = true;
                }
                if (input[i].name === 'newList' && newindex !== -1) {
                        input[i].checked = true;
                }
                if(input[i].type === 'checkbox'){
                    continue;
                }
                for (let j in item) {
                    if (input[i].name === j) {
                        input[i].value = item[j];
                    }
                }
            }
            add_bar.style.display = 'block';
        })

    }

    /*  添加框提交事件 */
    function addFormEvent() {
        add_form.addEventListener('submit', function (e) {
            e.preventDefault();
            let hotD = hotCheck.checked;
            let newD = newCheck.checked;
            if (!test.value) {
                console.log('true');
                let pack = packVal();
                if (hotD) {
                    b.listAdd(hotCheck.name);
                }
                if (newD) {
                    b.listAdd(newCheck.name);
                }
                b.add(pack);
                render();
                add_bar.style.display = 'none';
            } else {
                let id = parseInt(test.value);
                let pack = packVal();
                test.value = '';
                b.listDel(hotCheck.name, id, hotD);
                b.listDel(newCheck.name, id, newD);
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

    /*  添加弹窗关闭按钮  */
    function addFormCloseEvent() {
        add_bar_close.addEventListener('click', function () {
            let input = add_form.querySelectorAll('input');
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
                if (input[i].type === 'checkbox') {
                    input[i].checked = false;
                }
            }
            test.value = '';
            add_bar.style.display = 'none';
        })
    }


    /*  添加按钮弹窗  */
    function addBarEvent() {
        add_btn.addEventListener('click', function () {
            add_bar.style.display = 'block';
        })
    }
})();