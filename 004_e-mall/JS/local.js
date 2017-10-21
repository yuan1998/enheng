;(function(){
    "use strict"
    window.a = {
        get:function(key){
            return JSON.parse(localStorage.getItem(key));
        },
        set:function (key,val) {
            localStorage.setItem(key,JSON.stringify(val));
        }
    }
})();