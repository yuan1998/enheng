$(function () {
        "use strict";

        let form = $('#searchBar');
        let books = $('#booksWrap');

        let start;
        let cache = 0;

        new Vue({
            el: ('#vueWrap'),
            data: {
                keyword: '',
                searchResult: 'searchResult',
                searchHome: 'searchHome',

                bookList: [],
                one: true,
            },
            mounted: function () {
                this.scroll();
            },
            methods: {
                get_keyword: function () {
                    let key = this.keyword;
                    start = 0;
                    this.bookList = [];
                    this.aJaxJsonp(key);
                },
                aJaxJsonp: function (keyword) {
                    let me = this;
                    $.ajax({
                        type: "get", //jquey是不支持post方式跨域的
                        async: false,
                        url: (`https://api.douban.com/v2/book/search?q=${keyword}&start=${start}&count=10&apikey=0b2bdeda43b5688921839c8ecb20399b`),
                        //跨域请求的URL
                        dataType: "jsonp",
                        //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
                        jsonp: "callback",
                        //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                        jsonpCallback: "success_jsonpCallback",
                        //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
                        success: function (json) {
                            me.bookList = me.bookList.concat(json.books);
                            me.one = false;
                            start += 10;
                            cache = 0;
                        },
                    });
                },
                scroll: function () {
                    let me = this;
                    let win = $(window);
                    win.on('scroll', function () {
                        if (win.scrollTop() + win.height() > $(document).height() -200) {
                            if (cache === 0) {
                                cache++;
                                let key = me.keyword;
                                me.aJaxJsonp(key);
                            }
                        }
                    })
                }
            }
        });
    }
);
