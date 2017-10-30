;(function () {
        "use strict";
/*
        let data = [
            {id: 4, name: '祖先的同学的儿子', pid: 3},
            {id: 5, name: '祖先的儿子', pid: 2},
            {id: 6, name: '祖先的儿子的儿子', pid: 5},
            {id: 7, name: '祖先的儿子的女儿', pid: 5},
            {id: 8, name: '祖先的儿子的女儿的儿子', pid: 6},
            {id: 9, name: '祖先的儿子的女儿的儿子', pid: 6},
            {id: 2, name: '祖先', pid: 1},
            {id: 3, name: '祖先的同学', pid: 1},
            {id: 1, name: 'GOD', pid: 0},
        ];
        */

        let data = [
            {
                id:1,
                name :"一级分类：1",
                pid :0,
            },
            {
                id:2,
                name :"二级分类：1",
                pid :1,
            },
            {
                id:3,
                name :"三级分类：3",
                pid :2,
            },
            {
                id:4,
                name :"一级分类：2",
                pid :0,
            },
            {
                id:7,
                name :"f级分类：2",
                pid :4,
            },
            {
                id:10,
                name :"f级分类：2",
                pid :7,
            },
            {
                id:9,
                name :"f级分类：2",
                pid :10,
            },
            {
                id:12,
                name :"f级分类：2",
                pid :9,
            },
            {
                id:15,
                name :"f级分类：2",
                pid :12,
            },
            {
                id:13,
                name :"f级分类：2",
                pid :15,
            },
        ];


        let div = document.querySelector('#test');
        let children = div.querySelector('.children');


        getTrees(data, 0);


        function getTrees(list, pid) {
            let pList = {};
            list.forEach(function (e) {
                if (!pList[e.pid]) {
                    pList[e.pid] = [];
                }
                pList[e.pid].push(e);
            });
            formatTrees(pList, pid, children);
        }
/*
        function test(list,pid,childern_item) {
            if (!list[pid]) {
                return;
            }

            let ul = document.createElement('ul');
            list[pid].forEach(function(e){
                let li = document.createElement('li');
                let childUl = document.createElement('span');
                li.innerHTML = e.name;
                ul.appendChild(li);
                childUl.innerHTML =test(list,e.id,ul) || '';
                ul.appendChild(childUl);
            });
            childern_item.appendChild(ul);
        }

*/
        function formatTrees(list, pid, el_children) {
            el_children.innerHTML = ``;
            if (!list[pid]) {
                return;
            }
            let div = document.createElement('div');
            div.innerHTML = `
            <select>
              <option>-请输入-</option>
            </select>
            <span class="children"></span>
            `;
            let child = div.querySelector('.children');
            let select = div.querySelector('select');
            list[pid].forEach(function (e) {
                let option = document.createElement('option');
                option.innerHTML = e.name;
                option.value = e.id;
                select.appendChild(option);
            });
            el_children.appendChild(div);
            select.addEventListener('change', function () {
                formatTrees(list, this.value, child);
            })

        }
    }

    /*

    function getTrees(List, pid) {
        let items = {};
        for (let i = 0; i < list.length; i++) {
           let key = list[i].pid;
           if(items[key]){
              items[key].push(list[i]);
           }else{
               items[key] = [];
               items[key].push(list[i]);
           }
        }
        return formatTrees(items,pid);
    }

    function formatTrees(list,pid) {
        let result = [];
        if(!list[pid]){
            return result ;
        }
        for(let i of list[pid]){
            i.children = formatTrees(list,i.id);
            result.push(i);
        }
        return result ;
    }

    let a = getTrees(list,0);
    console.log(a);
    */


    /*

            let data = [
                {id: '01', name: "A"},
                {id: '0101', name: "A1"},
                {id: '0103', name: "A3"},
                {id: '0102', name: "A2"},
                {id: '0202', name: "B2"},
                {id: '0301', name: "C1"},
                {id: '0303', name: "C3"},
                {id: '0302', name: "C2"},
                {id: '02', name: "B"},
                {id: '0201', name: "B1"},
                {id: '020101', name: "B11"},
                {id: '030103', name: "C13"},
                {id: '03010301', name: "C131"},
                {id: '03010302', name: "C132"},
                {id: '0203', name: "B3"},
                {id: '03', name: "C"},
                {id: '030101', name: "C11"},
                {id: '030102', name: "C12"},
                {id: '0301030101', name: "C1311"},
                {id: '0301030201', name: "C1321"},
                {id: '04', name: 'D'},
                {id: '0401', name: 'D1'},
                {id: '0402', name: 'D2'},
                {id: '040201', name: 'D21'},
                {id: '04020101', name: 'D211'},
                {id: '04020102', name: 'D212'},
                {id: '05', name: 'E'},
                {id: '0501', name: 'E1'},
            ];


            getTrees(data);

            function getTrees(list) {
                let item = [];
                let listD = {};
                for (let i = 0; i < list.length; i++) {
                    let ii = list[i];
                    if (ii.name.length === 1) {
                        item.push([ii.name]);
                    }
                }


                list.forEach(function (e) {
                    item.forEach(function (ee) {
                        if (e.name.includes(ee)) {
                            if (!listD[ee]) {
                                listD[ee] = [];
                            }
                            listD[ee].push(e.name);
                        }
                    })
                });

                let level = [];
                for (let ji in listD) {

                    let cl1 = {};

                    listD[ji].forEach(function (e) {
                        if (e.length) {
                            let ko = e.length;
                            if (!cl1[ko]) {
                                cl1[ko] = [];
                            }
                            cl1[ko].push(e);
                        }
                    });

                    let keys = Object.keys(cl1);

                    for (let j = keys.length; j > 1; j--) {
                        let koo = j - 1;
                        if (j === 2) {
                            cl1[koo].push(cl1[j]);
                            level.push(cl1[koo]);
                            continue;
                        }
                        cl1[koo].push(cl1[j]);
                    }
                }
                console.log(level);
            }
        }
        */

)();