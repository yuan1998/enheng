var $html = document.querySelector('html');
var $body = document.querySelector('body');
var arr = ['我老尹从不打王者荣耀', '这简直了', '你很棒棒哦', '哎呀，他妈简直了', '等一下哦，我打个电话问问北京市市长，帮你问问'
    , '哎呀，真是..', '哎，这不是小野吗？', '那也行', '不行我想给你打个一百万'];
var colorArr = ['#EACF02', '#EACF02', '#f17c67', '#f17c67', '#f17c67', '#8F1D78', '#56A36C', '#2E68AA','#FFCC33'
    ,'#FF6633','#FF3366','#33CCFF','#FF33CC','#660066','#663300','#330066','#000066','#660033'];

$html.addEventListener('click', function (e) {
    var $el = document.createElement('b');
    $el.style.position = 'absolute';
    var x = e.pageX;
    var y = e.pageY;
    var index = Math.random() * arr.length | 0;
    $el.style.top = (y - 20) + 'px';
    $el.style.left = (x - 20) + 'px';
    $el.style.zIndex = 10;
    $el.style.fontSize = 10;
    $el.style.cursor = 'default';
    $el.innerText = arr[index];

    $body.appendChild($el);

    var anim;
    var increase = 0;

    // setTimeout(function () {
    anim = setInterval(function () {
        if (++increase === 150) {
            clearInterval(anim);
            $body.removeChild($el);
        }
        $el.style.color = colorArr[(Math.random() * colorArr.length | 0)];
        $el.style.top = y - 20 - increase + "px";
        $el.style.opacity = (150 - increase) / 120;
    }, 5);
    // }, 70);
    $body.appendChild($el);
});
