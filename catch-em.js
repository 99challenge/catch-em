var main = (function () {

    var canvas, ctx;
    var score;
    var mouseDown = false;
    var currentBar = [];

    var drawBar = function () {
        ctx.beginPath();
        ctx.moveTo(currentBar[0].x, currentBar[0].y);

        for (var i = 1, l = currentBar.length; i < l; i++) {
            var point = currentBar[i];
            ctx.lineTo(point.x, point.y);
        }

        ctx.lineWidth = 3;
        ctx.strokeStyle = 'blue';
        ctx.stroke();
        ctx.closePath();
    };

    function Ball(x) {
        this.x = x;
        this.y = 0;

        this.draw = function () {

        }
    }

    var draw = function () {
        var rndX = Math.random() * window.innerWidth;
        var ball = new Ball(rndX);


    };

    var update = function () {

    };

    var loop = function _loop () {
        window.requestAnimationFrame(_loop);

        update();
        draw();
    };

    var init = function () {

        canvas = document.getElementById('world');
        ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('mousedown', function (e) {
            mouseDown = true;
            currentBar = [];
            currentBar.push({
                'x': e.clientX,
                'y': e.clientY
            });
        });

        window.addEventListener('mouseup', function () {
            mouseDown = false;
        });

        window.addEventListener('mousemove', function (e) {
            if (mouseDown) {
                currentBar.push({
                    'x': e.clientX,
                    'y': e.clientY
                });

                drawBar();
            }
        });

        loop();
    };

    return {
        'init': init
    }

})();

window.onload = main.init;