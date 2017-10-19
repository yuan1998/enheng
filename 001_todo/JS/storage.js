;(function(){
  
  window.s = {
    set:function(key,val){
      var val =JSON.stringify(val);
      return localStorage.setItem(key,val)
    },
    get:function(key){
      return JSON.parse(localStorage.getItem(key))
    },

  }

})();