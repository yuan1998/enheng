; (function () {
  var article_list,
    article_id_list,
    comment_list,
    visible,
    user,
    index,
    time;

    
    
    /**函数 */
    init();
    // new_add({title:'buhaoyisi',content:'ssbu'});
    // comment(2, { user:'kuku', comment: 'enheng?' })
    // update(1, { title: 'vigin', test: 'test' });
    
    
    window.b ={
      article_list : article_list,
      comment_list:comment_list,
      del:del,
      update:update,
      add:new_add,
      read:read,
      find:find,
      comment:comment,
    }





  /**初始 */
  function init() {
    article_list = s.get("article_list");
    article_id_list = s.get('article_id_list');
    comment_list = s.get('comment_list')
    if (!article_list) {
      article_list = [];
      s.set('article_list', article_list);
    }
    if (!article_id_list) {
      article_id_list = 0;
      s.set('article_id_list', article_id_list);
    }
    if (!comment_list) {
      comment_list = [];
      s.set('comment_list', comment_list);
    }
  }


  /** 新的添加内容 */
  function new_add(pack) {
    var new_article = pack;
    if (!new_article.title || !new_article.content) {
      console.log('没有内容');
      return;
    }
    if(!new_article.author){
      new_article.author = '匿名';
    }

    new_article.date = new Date().toLocaleString();
    new_article.visible = true;
    article_list.push(new_article);
    sync();
    inc();
  }


  /* 添加内容 */
  /*
  function add(title, content, author, visible) {
    if (!title || !content) {
      console.log('没有内容')
      return;
    }
    article_list = s.get('article_list');
    author = author || '匿名';
    visible = visible || true;
    time = new Date().toLocaleString();

    var new_content = {
      id: s.get('article_id_list') + 1,
      title: title,
      content: content,
      author: author,
      time: time,
      visible: visible,
      comment: [],
    }
    article_list.push(new_content);
    sync();
    inc();
  }
  */

  /**查找索引 */
  function find_index(index) {
    return article_list.findIndex(function (each) {
      if (each.id == index) {
        return true;
      }
    })
  }
  /** 删除 */
  function del(id) {
    index = find_index(id);
    if (index != -1) {
      article_list[index].visible = false;
    }
    sync();
  }


  /**更新  */
  /*
  function update(id, title, content) {
    index = find_index(id);
    if (title) {
      article_list[index].title = title.title
    }
    if (content) {
      article_list[index].content = content.content;
    }
    sync();
  }
  */

  /** 新的更新 */
  function update(id, pack) {
    var index = find_index(id)
    var article = article_list[index];
    article_list[index] = Object.assign({}, article, pack);
    sync();
  }


  /** 同步   */
  function sync() {
    s.set('article_list', article_list)
  }


  /** id自增 */
  function inc() {
    article_id_list++;
    s.set('article_id_list', article_id_list)
  }



  /**搜索 */
  function search(key) {
    var wrap = []
    article_list.forEach(function (each) {
      var condition = each.title.includes(key);
      if (condition) {
        wrap.push(each)
      }
    })
    return wrap;
  }


  /**评论     直接插入文章列表中   */
  /*
  function comment(id, content) {
    index = find_index(id);
    time = new Date().toLocaleString()
    if (!content.user) {
      content.user = '匿名';
    }
    if (!content.comment) {
      console.log('error')
    } else {
      content.id = article_list[index].id
      content.time = time;
      content.visible = true;
      article_list[index].comment.push(content);
      sync()
    }

  }
  */

  /* 评论     加入新的列表中    */
  function comment(id, content) {
    index = find_index(id);
    time = new Date().toLocaleString()
    if (!content.user) {
      content.user = '匿名';
    }
    if (!content.comment) {
      console.log('error')
    } else {
      content.id = article_list[index].id
      content.time = time;
      content.visible = true;
      comment_list.push(content);
      s.set('comment_list', comment_list)
    }

  }

  /** find */
  function find(id) {
    return article_list.find(function (each) {
      return each.id == id;
    })
  }


  /** 读 */
  function read(id) {
    if (id)
      return find(id);
    return article_list;
  }

  /**测试区 */
  console.log(s.get('article_list'))
  console.log(s.get('article_id_list'))
  console.log(s.get('comment_list'))
})();

