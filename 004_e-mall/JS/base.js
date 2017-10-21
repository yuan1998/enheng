;(function () {
    "use strict";
    let goodsList;
    let goodsIdList;
    let oldGoodsList;
    /*  函数运行  */
    init();

    /*  全局  */
    window.b = {
        add:add,
        updata:updata,
        del:del,
        read:read,
        find:find,
        findIndex:findIndex
    };
    /*  检测  */

    /*  初始化  */
    function init() {
        goodsList = a.get("goodsList");
        goodsIdList = a.get("goodsIdList");
        oldGoodsList = a.get("oldGoodsList");
        if  (!oldGoodsList){
            oldGoodsList = [];
            a.set("oldGoodsList",oldGoodsList);
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
        if(!pack.title || !pack.info || !pack.price){
            console.log('请嚟翻屋企，唔该');
            return;
        }
        let id = a.get("goodsIdList");
        pack.id = id + 1;
        pack.date = new Date();
        pack.visible = true;
        pack.price = parseFloat(pack.price).toFixed(2);
        if(pack.price === 'NaN') {
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
        let goodsInfo = goodsList[index] ;
        pack.price = parseFloat(pack.price).toFixed(2);
        goodsList[index] = Object.assign({},goodsInfo,pack);
        sync();
    }

    /*  删  */
    function del(id) {
        let index = findIndex(id);
        goodsList[index].visible = false ;
        goodsList.forEach(function (e,i) {
            if(!e.visible){
                oldGoodsList.push(e);
                goodsList.splice(i,1);
            }
        });
        sync();
        a.set("oldGoodsList",oldGoodsList);
    }

    /*  读  */
    function read(id) {
        if(id){
            return find(id);
        }
        return goodsList ;
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
})();