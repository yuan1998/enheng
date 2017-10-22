;(function () {
    "use strict"
    let taskList;
    let taskLastId;


    /*  RUN  */
    init();
    // add('xiao');
    // del(1);
    // updata(1,{visible:true});

    window.b = {
        add: add,
        del: del,
        updata: updata,
        find: find,
        findIndex: findIndex,
        dateTimeDiff: dateTimeDiff,
        visible: visible,
    };

    /*  init  */
    function init() {
        taskLastId = a.get('taskLastId', taskLastId);
        taskList = a.get('taskList', taskList);
        if (!taskList) {
            taskList = [
                {"id":1,"title":"Write what you want todo.","date":new Date(),"visible":true},
                {"id":2,"title":"Or sleep?","date":new Date(),"visible":true},
                {"id":3,"title":"Do housework?","date":new Date(),"visible":true},
                {"id":4,"title":"Homework?","date":new Date(),"visible":true},
                {"id":5,"title":"What are you todo?","date":new Date(),"visible":true},
            ];
            sync();
        }
        if (!taskLastId) {
            taskLastId = 5;
            a.set('taskLastId', taskLastId);
        }

    }

    /*  add  */
    function add(title) {
        if (!title) {
            alert('广东人民给你拜年了');
            return;
        }
        let pack = {};
        pack.id = a.get('taskLastId') + 1;
        pack.title = title;
        pack.date = new Date();
        pack.visible = true;
        taskList.push(pack);
        sync();
        a.set('taskLastId', pack.id);
    }

    /*  del  */
    function del(id) {
        let index = findIndex(id);
        if (index === -1) {
            alert('none');
            return;
        }
        taskList.splice(index, 1);
        sync();
    }

    /*  visible  */
    function visible(id, bool) {
        let index = findIndex(id);
        if (index === -1) {
            alert('none');
            return;
        }
        taskList[index].visible = bool;
        if (bool === false) {
            taskList[index].overDate = new Date();
        }
        let iii = taskList.splice(index, 1);
        taskList = taskList.concat(iii);
        sync();
    }

    /*  updata  */
    function updata(id, pack) {
        taskList = a.get('taskList');
        console.log(id);
        let index = findIndex(id);
        console.log(taskList);
        console.log(index);
        console.log(taskList[index]);
        taskList[index] = Object.assign({}, taskList[index], pack);
        sync();
    }

    /*  find & findIndex  */
    function find(id) {
        return taskList.find(function (e) {
            return e.id === id;
        })
    }

    function findIndex(id) {
        return taskList.findIndex(function (e) {
            return e.id === id;
        })
    }

    /*  sync   */
    function sync() {
        a.set('taskList', taskList);
    }

    /*  time  */
    function dateTimeDiff(oldtime) {
        let oldTime = new Date(oldtime).getTime();
        let now = new Date().getTime();
        if (oldTime > now) {
            alert("!!!");
            return;
        }
        let result;
        let time = now - oldTime;
        let secoun = 1000;
        let min = secoun * 60;
        let hour = min * 60;
        let day = hour * 24;
        let week = day * 7;
        let mon = day * 30;
        let year = mon * 12;
        let yearC = time / year;
        let monC = time / mon;
        let weekC = time / week;
        let dayC = time / day;
        let hourC = time / hour;
        let minC = time / min;
        let secounC = time / secoun;
        if (yearC >= 1) {
            result = '' + parseInt(yearC) + '年前';
        } else if (monC >= 1) {
            result = '' + parseInt(monC) + '月前';
        } else if (weekC >= 1) {
            result = '' + parseInt(weekC) + '周前';
        } else if (dayC >= 1) {
            result = '' + parseInt(dayC) + '天前';
        } else if (hourC >= 1) {
            result = '' + parseInt(hourC) + '小时前';
        } else if (minC >= 1) {
            result = '' + parseInt(minC) + '分钟前';
        } else if (secounC >= 1) {
            result = '' + parseInt(secounC) + '秒前';
        } else result = '' + '刚刚';
        return result;
    }
})();