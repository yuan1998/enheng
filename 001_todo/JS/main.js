; (function () {


  /* 定义变量  */
  var task_list, last_id, h3, p, div, content,
    task, ament,
    form = document.getElementById('add_task_bar'),
    list_bar = document.getElementById('task_list_bar'),
    old_list = document.getElementById('old_list'),
    input = document.getElementById('add_input');


  /* 运行函数 */
  init_data();
  input_event();
  render();
  render_two()










  /*  初始化  */
  function init_data() {
    task_list = s.get('task_list')
    last_id = s.get('last_id')
    old_task = s.get('old_task')
    if (!task_list) {
      task_list = [];
      s.set('task_list', task_list);
    }
    if (!last_id) {
      last_id = 0;
      s.set('last_id', last_id);
    }
    if (!old_task) {
      old_task = [];
      s.set('old_task', old_task);
    }
  }

  /*  添加新任务 */
  function add(title, completed) {
    completed = completed || false;
    var new_list = {
      id: s.get('last_id') + 1,
      title: title,
      completed: completed
    }

    task_list.push(new_list);
    sync()
    inc()
  }


  /* 删除任务  */
  function del(id) {

    task_list = s.get('task_list');

    task_list.forEach(function (item, i) {
      if (item.id == id) {
        task_list.splice(i, 1);
      }
    })
    sync();
  }

  /*  同步任务列表   */
  function sync() {
    s.set('task_list', task_list);
  }

  /* 同步任务id  */
  function inc() {
    s.set('last_id', s.get('last_id') + 1);
  }

  /*  输入框事件  */
  function input_event() {
    form.addEventListener('submit', function (each) {
      each.preventDefault();
      val = input.value;
      if (val == '') {
        alert('ccccbb');
      } else {
        add(val);
        render();
        input.value = '';
      }
    })
  }

  /*  把列表渲染到页面  */
  function render(test) {
    del(test);
    task_list = s.get('task_list');
    list_bar.innerHTML = '-----未完成------';
    content = document.createElement('div');
    task_list.forEach(function (each) {
      div = document.createElement('div');
      div.innerHTML = `
      <from class='amend'>
      <input   value='${each.title}'>
      <button type='submit' >/</button>
      </from>
      <button class = 'old_task'>√</button> 
      <button class = 'del_btn'> X </button>
      `
      div.setAttribute('id', each.id);
      content.appendChild(div);
    })
    list_bar.appendChild(content);
    fulil();
    del_event();
  }



  /* 给删除按钮加事件  */
  function del_event() {
    var del_btn = document.getElementsByClassName('del_btn');
    for (var i = 0; i < del_btn.length; i++) {
      del_btn[i].addEventListener('click', function () {
        var test = this.parentNode.id;
        render(test);
      })
    }
  }


  /* 二号渲染？？*/
  function render_two() {
    old_task = s.get('old_task');
    old_list.innerHTML = '-----已完成------';
    content = document.createElement('div');
    for (var i = old_task.length-1; i >= 0; i--) {
      var each = old_task[i];
      div = document.createElement('div');
      div.innerHTML = `
       <span >${each.title}</span>
       <span>完成于：${each.date}</span>
      `
      div.setAttribute('id', each.id);
      content.appendChild(div);
    }
    old_list.appendChild(content);
  }

  /*  旧任务  */
  function huhuhu(id, date) {
    task_list = s.get('task_list');
    old_task = s.get('old_task');
    console.log('1', old_task)
    task_list.forEach(function (each) {
      if (each.id == id) {
        each.date = date;
        console.log(each)
        old_task.push(each)
      }
    })
    console.log('2', old_task)
    s.set('old_task', old_task);

    render(id);
    render_two();
  }


  /*  完成按钮增加事件  */
  function fulil() {
    var task = document.getElementsByClassName('old_task');
    for (var i = 0; i < task.length; i++) {
      task[i].addEventListener('click', function () {
        var myDate = new Date().toLocaleString();
        var test = this.parentNode.id;
        huhuhu(test, myDate);
      })
    }
  }

  /*  便利 */
  function find(id) {
    var juju = task_list.findIndex(function (item) {
      if (item.id == id) {
        return true;
      }
    })
    return juju;
  }

  /*  更改数据  */
  function update(id, title) {
    task_list = s.get("task_list")
    var hahha = find(id);
    if (hahha == -1) { return };

    task_list[hahha].title = title;

    sync();
    render();

  }

  /*  修改事件 */
  function ament_event() {
    ament = document.getElementsByClassName('ament');

  }
})();