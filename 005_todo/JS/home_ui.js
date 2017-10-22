;(function () {
    "use strict"

    /*  let  */
    let taskList = a.get('taskList');
    let addTaskInput = document.querySelector('#addTaskInput');
    let addTaskForm = document.querySelector('#addTaskForm');
    let taskBar = document.querySelector('#taskBar');
    let overTaskBar = document.querySelector('#overTaskBar');
    let updataBar = document.querySelector('#updataBar');
    let updataForm = document.querySelector('#updataForm');
    let updataInput = document.querySelector('#updataInput');
    let updataCloseBtn = document.querySelector('#updataCloseBtn');
    init();

    /*  init  */
    function init() {
        random();
        render();
        addEvent();
        updataCloseBtnEvent();
        updataEvent();
    }


    /*  random  */
    function random() {
        let tip = ['吃了吗？', '睡了吗？', '写作业了吗？', '是不是有什么家务忘记了？', '不再想想还有什么需要做的吗？', '再不找一点东西做的话就要成为废人了！', '没事做就滚回去睡觉吧'];
        let i = Math.floor(Math.random() * (tip.length));
        addTaskInput.placeholder = tip[i];
    }

    /*  render  */
    function render() {
        let taskList = a.get('taskList');
        taskBar.innerHTML = '';
        overTaskBar.innerHTML = '';
        let j = 0;
        for (let i = taskList.length - 1; i >= 0; i--) {
            let e = taskList[i];
            let div = document.createElement('div');
            let time;
            if (e.visible) {
                time = b.dateTimeDiff(e.date);
            } else {
                let date = new Date().getTime() - new Date(e.overDate).getTime();
                if (date < 172800000) {
                    time = b.dateTimeDiff(e.overDate);
                } else {
                    continue;
                }
            }
            div.innerHTML = `
                 <label for="input${e.id}" class=""><input id="input${e.id}" type="checkbox" name="over" class="outBtn col"></label>
                <span class="title col ">${e.title}</span>
                <span class="date col ">${time}</span>
                <button class="editBtn ">&#x270e;</button>
                <button class="delBtn ">&#x2718;</button>
                <button class="mark"></button>
            `;
            let bbbtn = div.querySelector('.outBtn');
            div.setAttribute('data-id', e.id);
            div.setAttribute('class', 'item row');
            console.log(e.visible);
            if (e.visible) {
                bbbtn.checked = false;
                taskBar.appendChild(div);
            } else {
                if (j < 6) {
                    console.log('1');
                    bbbtn.checked = true;
                    overTaskBar.appendChild(div);
                    j++;
                } else {
                    console.log('1');
                    continue;
                }
            }
            delEvent(div.querySelector('.delBtn'), e.id);
            overEvent(div.querySelector('.outBtn'), e.id);
            editBtnEvent(div.querySelector('.editBtn'), e.id, e.title);
        }
        if (j === 0) {
            let div = document.createElement('div');
            div.innerHTML = `
            <span class="col col-12 waring">Nothing.</span>
            `;
            div.setAttribute('class', 'row center');
            overTaskBar.appendChild(div);
        }
    }


    /*                   Event                     */

    /*  addEven  */
    function addEvent() {
        addTaskForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let val = addTaskInput.value;
            if (val === '') {
                alert('!!!');
                return;
            }
            addTaskInput.value = '';
            b.add(val);
            render();
        })
    }

    /*  overEvent  */
    function overEvent(btn, id) {
        btn.addEventListener('click', function () {
            if (btn.checked) {
                b.visible(id, false);
                render();
            } else {
                b.visible(id, true);
                render();
            }
        })
    }

    /*  delEvent  */
    function delEvent(btn, id) {
        btn.addEventListener('click', function () {
            b.del(id);
            render();
        })
    }

    /*  editBtnEvent */
    function editBtnEvent(btn, id, val) {
        btn.addEventListener('click', function () {
            updataBar.style.display = 'block';
            updataInput.value = val;
            updataForm.setAttribute('data-id', id);
        })
    }

    /*  updataCloseBtnEvent  */
    function updataCloseBtnEvent() {
        updataCloseBtn.addEventListener('click', function () {
            updataBar.style.display = 'none';
            updataInput.value = '';
        })
    }

    /*  updataEvent  */
    function updataEvent() {
        updataForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let key = updataInput.name;
            let pack = {};
            pack[key] = updataInput.value;
            let id = parseInt(this.dataset.id);
            console.log(id, pack);
            b.updata(id, pack);
            render();
            updataInput.value = '';
            updataBar.style.display = 'none';
        })
    }

})();
