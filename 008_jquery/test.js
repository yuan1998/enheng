$(function () {
    "use strict";

    let form = $('form');
    let inp = form.find('input');
    let btn = form.find('button');
    let booksWrap = $('.booksWrap');
    let more = $('.moreBtn');
    more.hide();
    let start;

    function ajaxJsonp(keyword) {
        $.ajax({
            type: "get", //jquey是不支持post方式跨域的
            async: false,
            url: (`https://api.douban.com/v2/book/search?q=${keyword}&start=${start}&count=10`), //跨域请求的URL
            dataType: "jsonp",
            //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonp: "callback",
            //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            jsonpCallback: "success_jsonpCallback",
            //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
            success: function (json) {
                let list = json.books;
                console.log(json);
                render(list);
                form.attr('class', 'searchResult');
                start += 10;
                if (list.length === 10){
                    more.show();
                }else {
                    more.hide();
                }
            },
        });
    }

    form.on('submit', function (e) {
        e.preventDefault();
        start = 0;
        let key = inp.val();
        booksWrap.html('');
        ajaxJsonp(key)
    });

    more.on('click', function () {
        let key = inp.val();
        console.log(start);

        ajaxJsonp(key);

    });

    function render(list) {
        list.forEach(function (e) {
            let item = $('<div class="bookItem row">');
            item.html(`
            <div class="coverImage col col-1">
               <a href="${e.alt}" target="_blank">   
                   <img src="${e.image}" alt="">
               </a>
            </div>
            <div class="bookInfo col col-9">
               <div class="col">
                 <a href="${e.alt}" target="_blank">       
                     <h1 class="bookTitle">${e.title}</h1>
                 </a>
               </div>
               <div class="bookAuthors"></div>
               <p class="bookSummary">${e.summary || '暂无资料'}</p>
               <div class="tags "></div>
               <div class="averageRating">
                    <span class="rating">${e.rating.average}</span>
                    <span class="count">(${e.rating.numRaters}人评价)</span>
               </div>
               <div class="bookPrice">${e.price || '未知.'}</div>
            </div>
            `);
            let tags = item.find('.tags');
            let authors = item.find('.bookAuthors');
            e.author.forEach(function (ee) {
                authors.append(`<span class="author">${ee}</span>`);
            });
            e.tags.forEach(function (ee) {
                tags.append(`<span class="tag">${ee.name}</span>`);
            });
            booksWrap.append(item);
        })
    }


})