; (function () {
  'use strict'
  var read,
    input,
    wrap,
    i,
    div,
    article_list,
    comment_list,
    article_form = document.querySelector('#article_form'),
    article_content_bar = document.querySelector('#article_content_bar');



  init();

  /** 初始化  （文章添加事件 */
  function init() {
    render();
    input = article_form.children;
    article_form.addEventListener('submit', function (e) {
      wrap = {};
      e.preventDefault();
      for (var i = 0; i < input.length; i++) {
        if (input[i].nodeName == "INPUT" || input[i].nodeName == "TEXTAREA") {
          var key = input[i].getAttribute('name');
          var val = input[i].value;
          wrap[key] = val;
          input[i].value = '';
        }
      }
      wrap.id = s.get('article_id_list') + 1;
      b.add(wrap);
      console.log(wrap);
      one_render(wrap.id);
    })
  }

  /** 删除按钮事件 */
  function del_even(el) {
    el.addEventListener('click', function () {
      var id = this.parentNode.id;
      b.del(id)
      this.parentNode.innerHTML = '';
    })
  }


  /** 渲染 */
  function render() {
    article_content_bar.innerHTML = '';
    article_list = s.get('article_list');

    for (var i = 0; i < article_list.length; i++) {
      var each = article_list[i];
      if (each.visible) {
        one_render(each.id);
      }
    }
  }


  /** 单个渲染*/
  function one_render(id) {
    var each = b.find(id);

    div = document.createElement('div')
    div.innerHTML = `
      <h3 class="title">${each.title}</h3>
      <p class="content">${each.content}</p>
      <p>${'作者： ' + each.author + '   创建日期：   ' + each.date}</p>
      <button class= "del_btn"> 点我删除</button>
      <button class="compile_btn">编辑</button>
      <form class="comment_form">
        <input type="text" class="comment_input">
        <input type="text" class="comment_user_input">
        <button type=""submit > 评论 </button>
      </form>
      <form class="compile">
        <input class="compile_title" value="${each.title}">
        <textarea class="comile_content" cols="30" rows="10">${each.content}</textarea>
        <button class="update_btn" type="submit">更新</button>
        <button class="colse_btn">X</button>
      </form>
      <div class="comment_bar">评论：</div>
      `;
    div.setAttribute('class', 'article');
    div.setAttribute('id', each.id);
    article_content_bar.insertBefore(div,article_content_bar.firstChild);

    var comment_form = div.querySelector('.comment_form'),
    comment_input = div.querySelector('.comment_input'),
    comment_bar = div.querySelector('.comment_bar'),
    comment_user_input =div.querySelector('.comment_user_input'),
    del_btn = div.querySelector('.del_btn'),
    compile_btn = div.querySelector('.compile_btn'),
    compile = div.querySelector('.compile'),
    compile_title = div.querySelector('.compile_title'),
    comile_content = div.querySelector('.comile_content'),
    colse_btn = div.querySelector('.colse_btn'),
    content = div.querySelector('.content'),
    title = div.querySelector('.title');


    commentBarEvent(comment_form,comment_input,each.id,comment_bar,comment_user_input);
    del_even(del_btn);
    compile_event(compile_btn,compile);
    update_btn_event(compile_title,comile_content,compile,colse_btn,content,title);
    comment_render(each.id,comment_bar);
  }
  /**编辑按钮事件 */
  function compile_event(each,bar){
    each.addEventListener('click',function(e){
      e.preventDefault();
      console.log(bar.style.display)  
      bar.style.display = 'block';
    })

  }

  /**更新按钮事件 */
  function update_btn_event(title_input,content_input,update_form,colse_btn,content,title){
    update_form.addEventListener('submit',function(yi){
      yi.preventDefault();
      var id = this.parentNode.id;
      var pack = {
        title : title_input.value,
        content :content_input.value,
      }

      b.update(id,pack);
      content.innerHTML= content_input.value;
      title.innerHTML = title_input.value;
      update_form.style.display = 'none';
    })
    colse_btn.addEventListener('click',function(e){
      update_form.style.display = 'none';  
    })
  }



  /**评论渲染 */
  function comment_render(id,bar){
    comment_list =s.get('comment_list');
    comment_list.forEach(function(each){
      if(each.id == id){
        comment_item_render(each,bar);
      }
    })

  }

  /**单条评论渲染 */
  function comment_item_render(each,bar){
    if(!each.comment){
      console.log("没内容")
      return;
    }
    console.log('each.user',each.user)
    div = document.createElement('div')
    div.innerHTML=`
    <div>
    <div>${each.user} : ${each.comment}</div>
    </div>
    `
    div.setAttribute('class','comment_item')
    bar.appendChild(div);
  }


  /**评论按钮事件 */
  function commentBarEvent(btn,input,id,bar,user){
    btn.addEventListener('submit',function(e){
      e.preventDefault();
      user.value? user.value=user.value : user.value='匿名';

      var each = {
        user:user.value,
        comment:input.value,
      }
      input.value='';
      user.value ='';
      b.comment(id,each);
      comment_item_render(each,bar);
    })
  }

})();