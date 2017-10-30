;(function () {
    "use strict"

    let catList = a.get('catList') || [];
    var catLastId = a.get('catLastId') || 0;


    window.cat = {
        add: add,
        updata: updata,
        remove: remove,
        read: read,
        in_parent: in_parent,
        getTrees: getTrees,
        getCatName: getCatName,
        formatTrees: formatTrees,
        test: test,
    };

    function add(pack) {
        if (!pack.title) {
            throw 'sorry guys';
        }
        if (find_Index(pack.pid) > -1 || pack.pid === 0) {
            catLastId = catLastId + 1;
            pack.id = catLastId;
            catList.push(pack);
            sync();
            a.set('catLastId', catLastId);
            return;
        }
        throw 'en';
    }

    function remove(id) {
        let index = find_Index(id);
        let list = cat.getTrees();
        list = cat.formatTrees(list,id);
        list = cat.test(list);
        list.push(id);
        let product = procure.read();
        let new_list = product.filter(function (e) {
            return list.find(function (each) {
                return e.catId === each ;
            })
        });
        if(new_list.length > 0){
            throw 'fuuu';
        }
        catList.splice(index, 1);
        sync();
    }

    function updata(id, pack) {
        let index = find_Index(id);
        catList[index] = Object.assign({}, catList[index], pack);
        sync();
    }

    function sync() {
        a.set('catList', catList);
    }


    function read(id) {
        if (id) {
            return catList.find(function (e) {
                return e.id === id;
            })
        }
        return catList;
    }

    function find_Index(id) {
        return catList.findIndex(function (e) {
            return e.id === id;
        })
    }

    function in_parent(id) {
        let index = catList.findIndex(function (e) {
            return e.pid === id;
        });
        return index !== -1;
    }
    



    function getTrees() {
        let list = {};
        catList.forEach(function (e) {
            if (!list[e.pid]) {
                list[e.pid] = [];
            }
            list[e.pid].push(e);
        });
        return list;
    }


    function test(list) {
        let res = [];
        list.forEach(function (e) {
            if (e.children.length > 0) {
                res = res.concat(test(e.children));
            }
            res.push(e.id);
        });
        return res;
    }


    function formatTrees(list, pid) {
        let trees = [];
        if (!list[pid]) {
            return trees;
        }
        for (let e of list[pid]) {
            e.children = formatTrees(list, e.id);
            trees.push(e);
        }
        return trees;
    }

    function getCatName(id) {
        let index = find_Index(id);
        return catList[index].title;
    }


})();
