let userList = [];
let lastId = 0;



let i = new Vue({
    el: '#edge',
    data: {
        newItem:{},
        userList:userList,
    },
    methods:{
        addBtn:function () {
            let newItem = Object.assign({},this.newItem);
            if(!!newItem.id){
                let index = this.find_Index(parseInt(newItem.id));
                Object.assign(userList[index],newItem);
            }else{
                newItem.id = lastId +1 ;
                lastId++;
                userList.push(newItem)
            }
            this.newItem={};
        },
        remove:function (i) {
            userList.splice(i,1);
        },
        fill_update:function (i) {
            this.newItem = userList[i];
        },
        update:function () {
        },
        find_Index:function (id) {
            return userList.findIndex(function (value) {
                return value.id === id ;
            })
        }
    }

});

console.log(i);


