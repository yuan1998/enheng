;(function () {
    "use strict";
    let goodsList;
    let goodsIdList;
    let oldGoodsList;
    let hotList;
    let newList;
    /*  函数运行  */
    init();

    /*  全局  */
    window.b = {
        add: add,
        updata: updata,
        del: del,
        read: read,
        find: find,
        findIndex: findIndex,
        listAdd: listAdd,
        listDel: listDel,
        hotIndex: hotIndex,
        newIndex: newIndex,
        Index: Index,
    };
    /*  检测  */

    /*  初始化  */
    function init() {
        goodsList = a.get("goodsList");
        goodsIdList = a.get("goodsIdList");
        hotList = a.get("hotList");
        newList = a.get("newList");
        if (!hotList) {
            hotList = [];
            a.set("hotList", hotList);
        }
        if (!newList) {
            newList = [];
            a.set("newList", newList);
        }
        if (!goodsIdList) {
            goodsIdList = 0;
            a.set('goodsIdList', goodsIdList);
        }
        if (!goodsList) {
            goodsList = [];
            a.set('goodsList', goodsList);
        }
    }

    /*  增加  */
    function add(pack) {
        if (!pack.title || !pack.info || !pack.price) {
            console.log('翻屋企啦，唔该');
            return;
        }
        let id = a.get("goodsIdList");
        pack.id = id + 1;
        pack.date = new Date();
        pack.visible = true;
        pack.price = parseFloat(pack.price).toFixed(2);
        if (pack.price === 'NaN') {
            alert('去你的价格');
            return;
        }
        goodsList.push(pack);
        id++;
        sync();
        console.log('1');
        a.set('goodsIdList', id);

    }

    /*  同步列表  */
    function sync() {
        a.set('goodsList', goodsList);
    }

    /*  更新  */
    function updata(id, pack) {
        let index = findIndex(id);
        pack.price = parseFloat(pack.price).toFixed(2);
        if (pack.price === 'NaN') {
            alert('去你的价格');
            return;
        }
        goodsList[index] = Object.assign({}, goodsList[index], pack);
        sync();
    }

    /*  删  */
    function del(id) {
        let index = findIndex(id);
        goodsList.splice(index, 1);
        listDel('hotList', id, false);
        listDel('newList', id, false);
        sync();
    }
    /*  读  */
    function read(id) {
        if (id) {
            return find(id);
        }
        return goodsList;
    }

    /*  查找  */
    function find(id) {
        return goodsList.find(function (e) {
            return e.id === id;
        })
    }

    function findIndex(id) {
        return goodsList.findIndex(function (e) {
            return e.id === id;
        })
    }

    function hotIndex(id) {
        hotList = a.get("hotList");
        return hotList.findIndex(function (e) {
            return e === id;
        })
    }

    function newIndex(id) {
        newList = a.get("newList");
        return newList.findIndex(function (e) {
            return e === id;
        })
    }

    function Index(id, name) {
        name = a.get(name);
        return name.findIndex(function (e) {
            return e === id;
        })
    }

    /*  hot添加  */
    function listAdd(name) {
        let list = a.get(name);
        let id = a.get('goodsIdList') + 1;
        list.push(id);
        a.set(name, list);

    }

    /*  hot删除  */
    function listDel(name, id, bool) {
        let list = a.get(name);
        let index = Index(id, name);
        if (bool) {
            if (index === -1) {
                list.push(id);
                a.set(name, list);
            }
        } else {
            if (index !== -1) {
                list.splice(index, 1);
                a.set(name, list);
            }
        }
    }
})();