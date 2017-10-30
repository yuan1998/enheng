;(function () {
    "use strict"

    let all_bar = document.querySelector('#all_product_bar');
    let hot_bar = document.querySelector('#hot_product_bar');
    let new_bar = document.querySelector('#new_product_bar');
    let catBar = document.querySelector('#catBar');
    let catFiller = document.querySelector('#catFiller');
    let mianBar = document.querySelector('#mianBar');
    let productAllWrap = document.querySelector('#productAllWrap');


    init();


    function init() {
        render();
        catBarRender(0, catBar);
    }

    function catBarRender(pid, pBar) {
        let list = cat.getTrees();
        if (!list[pid]) {
            return;
        }
        pBar.innerHTML = '';
        let catL = document.createElement('div');
        let child = document.createElement('div');
        list[pid].forEach(function (e) {
            let div = document.createElement('div');
            div.classList.add('catListItem', 'col-12');
            child.classList.add('subCatList', 'col');
            child.setAttribute('hidden', true);
            div.innerHTML = e.title;
            catL.appendChild(div);
            pBar.appendChild(catL);
            pBar.appendChild(child);
            div.addEventListener('click',function () {
                catProductRender(e.id);
            });
            div.addEventListener('mouseenter', function () {
                child.innerHTML = '';
                catBarRender(e.id, child);
                child.hidden = false;
                mianBar.addEventListener('mouseleave', function () {
                    child.innerHTML = '';
                    child.hidden = true;
                });
            });


        })

    }

    function catProductRender(id) {
        let name = (cat.read(id)).title;

        catFiller.innerHTML=`
        <div class="catName">
        <span class="title">${name}</span>
        <span class="backHome">回到首页</span>
</div>
        `;
        let backHome = catFiller.querySelector('.backHome');
        catFiller.hidden = false;
        console.log(id);
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
        console.log(name);
        new_list.forEach(function (e) {
            let div = document.createElement('div');
            div.classList.add('col', 'col-3', 'product_item');
            div.innerHTML = `
        <img src="https://dummyimage.com/300x400">
        <div>${e.title}</div>
        <div>${e.price}</div>
        `;
            catFiller.appendChild(div);
        });
        productAllWrap.hidden =true;
        backHome.addEventListener('click',function () {
            render();
        })
    }

    function render() {
        catFiller.hidden = true ;

        productAllWrap.hidden =false;
        hot_bar.innerHTML='';
        new_bar.innerHTML='';
        all_bar.innerHTML='';
        let product = procure.read();
        product.forEach(function (e) {
            let div = document.createElement('div');
            div.classList.add('col', 'col-3', 'product_item');
            div.innerHTML = `
        <img src="https://dummyimage.com/300x400">
        <div>${e.title}</div>
        <div>${e.price}</div>
        `;
            console.log(all_bar);
            if (hot.is_list('hotList', e.id)) {
                console.log('hot');
                hot_bar.appendChild(div.cloneNode(true));
            }
            if (hot.is_list('newList', e.id)) {
                console.log('new');
                new_bar.appendChild(div.cloneNode(true));
            }
            all_bar.appendChild(div);
        })
    }
})();