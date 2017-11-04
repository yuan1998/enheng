$(function () {

    let todoList = s.get('todoList') || [];
    let lastId = s.get('lastId') || 0;

    window.todo ={
        read:read,
        add:add,
        remove:remove,
        updata:updata,

    };


    function add(obj) {
        if (!obj.title) {
            throw 'add Error';
        }
        obj.id = lastId + 1;
        todoList.push(obj);
        sync();
        inc();
    }

    function remove(id) {
        let index = fIndex(id);
        if (index === -1) {
            throw 'remove Error'
        }
        todoList.splice(index,1);
        sync();
    }

    function updata(id, wrap) {
        let index = fIndex(id);
        if (index === -1) {
            throw 'updata Error'
        }
        Object.assign(todoList[index],wrap);
        sync();
    }
    function read(id) {
        return !!id ?  todoList[fIndex(id)] :  todoList ;
    }

    function sync() {
        console.log(todoList);
        s.set('todoList', todoList);
    }

    function inc() {
        lastId++;
        s.set('lastId', lastId);
    }

    function fIndex(id) {
        return todoList.findIndex(function (value) {
            return value.id === id;
        });
    }


});


$(function () {


    let form = $('#submitForm');
    let input = form.find('input');
    let btn = form.find('button');


    function init() {
        form.add('submit',function (e) {
            e.preventDefault();

        })
    }





});