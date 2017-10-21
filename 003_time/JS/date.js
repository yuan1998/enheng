;(function () {
    'use strict';

    /* 函数运行区*/
    dateTime();
    /*  */



    /* 日期时间*/
    function dateTime(){
        let oldTime = new Date("2000/12/1");
        console.log(oldTime.getTime());
        let newTime = (new Date().getTime()) - (new Date(oldTime).getTime());

        console.log(newTime);
    }
})();