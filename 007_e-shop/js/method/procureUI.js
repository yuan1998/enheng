;(function () {
    "use strict";

    let procure_List = a.get('procure_List') || [];
    let procure_Id_List = a.get('procure_Id_List') || 0;
    sync();
    a.set('procure_Id_List', procure_Id_List);

    window.procure = {
        add: add,
        remove: remove,
        updata: updata,
        read: read,

    };

    function add(pack) {
        let id = a.get('procure_Id_List') + 1;
        pack.id = id;
        procure_List.push(pack);
        sync();
        a.set('procure_Id_List', id);
    }

    function remove(id) {
        let index = find_Index(id);
        procure_List.splice(index, 1);
        sync();
    }

    function updata(id, pack) {
        let index = find_Index(id);
        procure_List[index] = Object.assign({}, procure_List[index], pack);
        sync();
    }

    function sync() {
        a.set('procure_List', procure_List);
    }


    function read(id) {
        if (id) {
            return procure_List.find(function (e) {
                return e.id === id;
            })
        }
        return procure_List;
    }

    function find_Index(id) {
        return procure_List.findIndex(function (e) {
            return e.id === id;
        })
    }

})();