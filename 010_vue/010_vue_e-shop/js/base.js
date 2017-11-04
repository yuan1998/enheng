$(function () {
    let Event = new Vue();

    Vue.component('product-wrap', {
        template: '#product-wrap-tpl',
        mounted: function () {
            let me = this;
            this.productList = s.get('productList') || [];
            this.lastProId = s.get('LastProId') || 0;
            Event.$on('getTrees', function (trees) {
                let cache  = JSON.parse(JSON.stringify(trees));
                let ccc = me.formatTrees(cache,0);
                me.catTrees = ccc ;
            });
            console.log(this.catTrees);
        },
        components:{
            
        },
        data: function () {
            return {
                catf: '',
                productItem: {},
                productList: [],
                lastProId: 0,
                catTrees: {},
                trees:[],
            };
        },
        methods: {
            cat: function (e) {
                let that = e.target;
                console.log(this.catTrees)
            },
            del: function (id) {
                let index = this.find_index(id);
                this.productList.splice(index, 1);
                this.sncy();
            },
            find_index: function (id) {
                return this.productList.findIndex(function (e) {
                    return e.id === id;
                })
            },
            sncy: function () {
                s.set('productList', this.productList);
            },
            inc: function () {
                this.lastProId++;
                s.set('lastProId', this.lastProId)
            },
            addupdate: function () {
                let item = this.productItem;
                if (item.title === '' || item.price === '') {
                    throw ' addOrUpdate  error';
                }
                if (this.productItem.id) {
                    let index = this.find_index(this.productItem.id);
                    Object.assign(this.productList[index], item);
                } else {
                    item.id = this.lastProId + 1;
                    this.productList.push(item);
                    this.inc(item.id);
                }
                this.productItem = {};
                this.sncy();
            },
            fillData: function (id) {
                this.productItem = this.productList[(this.find_index(id))];
            },
            formatTrees: function (list, pid) {
                let result = [];
                if (!list[pid]) {
                    return result;
                }
                for (let i of list[pid]) {
                    i.children = this.formatTrees(list, i.id);
                    result.push(i);
                }
                return result;
            },
        },
        watch: {
            productList: {
                deep: true,
                handler: function () {
                    this.sncy();
                }
            }
        }
    });

    Vue.component('cat-wrap', {
        template: '#cat-wrap-tpl',
        data: function () {
            return {
                catItem: {},
                catList: [],
                lastCatId: 0,
            };
        },
        mounted: function () {
            this.catList = s.get('catList') || [];
            this.lastCatId = s.get('lastCatId') || 0;
        },
        methods: {
            del: function (id) {
                let index = this.find_index(id);
                this.catList.splice(index, 1);
                this.sncy();
            },
            find_index: function (id) {
                return this.catList.findIndex(function (e) {
                    return e.id === id;
                })
            },
            is_parent: function (id) {
                return this.catList.findIndex(function (e) {
                    return e.id === id;
                }) > -1;
            },
            sncy: function () {
                s.set('catList', this.catList);
            },
            inc: function () {
                this.lastCatId++;
                s.set('lastCatId', this.lastCatId);
            },
            addupdate: function () {
                let item = this.catItem;
                if (item.title === '') {
                    throw ' addOrUpdate  error';
                }
                if (this.is_parent(item.parentId) || item.parentId === 0) {
                    if (this.catItem.id) {
                        let index = this.find_index(this.catItem.id);
                        Object.assign(this.catList[index], item);
                    } else {
                        item.id = this.lastCatId + 1;
                        this.catList.push(item);
                        this.inc();
                    }
                    this.catItem = {};
                    this.sncy();
                } else
                    throw 'parentId error';
            },
            fillData: function (id) {
                this.catItem = this.catList[(this.find_index(id))];
            },
            getTrees: function () {
                let cache = {};
                this.catList.forEach(function (e) {
                    if (!cache[e.parentId]) {
                        cache[e.parentId] = [];
                    }
                    cache[e.parentId].push(e);
                });
                return cache;
            },

        },
        watch: {
            catList: {
                deep: true,
                handler: function () {
                    this.sncy();
                    Event.$emit('getTrees', this.getTrees())
                }
            }
        }
    });


    new Vue({
        el: '#app',

    });


})