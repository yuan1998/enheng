;(function () {
    "use strict";


    initData();


    window.hot = {
        add: add,
        remove: remove,
        updata: updata,
        find_Index: find_Index,
        is_list: is_list,
        read: read,
        get_list: get_list,
    };

    function initData() {
        let newList = a.get('newList');
        let hotList = a.get('newList');
        let iiList = a.get('iiList');

        if (!newList) {
            newList = [];
            sync('newList', newList);
        }
        if (!hotList) {
            hotList = [];
            sync('hotList', hotList);
        }
        if (!iiList) {
            iiList = [];
            sync('iiList', iiList);
        }
    }


    function add(listName, id) {
        let list = get_list(listName);
        (!id) ? id = a.get('procure_Id_List') + 1 : id;
        let index = find_Index(id, list);
        if (index > -1) {
            return;
        }
        list.push(parseInt(id));
        sync(listName, list);
    }

    function remove(id, listName) {
        let list = get_list(listName);
        id = parseInt(id);
        let index = find_Index(id, list);
        if (index === -1) {
            return;
        }
        list.splice(index, 1);
        sync(listName, list);
    }

    function updata(id, bool, list) {
        id = parseInt(id);
        if (bool) {
            add(list, id);
        } else {
            remove(id, list);
        }
    }

    function find_Index(id, list) {
        return list.findIndex(function (e) {
            return e === id;
        })
    }

    function sync(listName, list) {
        a.set(listName, list);
    }

    function is_list(listName, id) {
        let list = get_list(listName);
        let index = list.findIndex(function (e) {
            return e === id;
        });
        return index > -1;
    }

    function read(list, id) {
        let list = get_list(list);
        if (id) {
            let index = find_Index(id, list);
            if (index === -1)
                return;
            return list(index);
        }
    }

    function get_list(list) {
        return a.get(list);
    }

})();