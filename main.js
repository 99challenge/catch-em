var main = (function () {

    var canvas, ctx;
    var score;
    var mouseDown = false;
    var currentBars = [];
    var currentBar = [];
    var balls = [];

    function Ball(x) {
        this.x = x;
        this.y = 0;

        this.draw = function () {
            ctx.beginPath();
            ctx.fillStyle = '#456565';
            ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        };

        this.update = function () {
            this.y += 2;
        };
    }

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
        ctx.save();
    };

    var createBall = function () {
        var rndX = Math.random() * window.innerWidth;
        balls.push(new Ball(rndX));
    };

    var draw = function () {

        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0, l = balls.length; i < l; i++) {
            balls[i].draw();
        }

        ctx.restore();

    };

    var update = function () {

        var i, j, k, l;

        for (i = 0, l = balls.length; i < l; i++) {
            balls[i].update();
        }

        i = balls.length;
        while (i--) {
            var ball = balls[i];

            if (ball.y >= canvas.height) {
                balls.splice(i, 1);
            }

            // Check collision with bars
            for (j = 0; j < currentBars.length; j++) {

                var bar = currentBars[j];
                var leftX = bar[0].x;
                var rightX = bar[bar.length - 1].x;

                for (k = 0; k < bar.length; k++) {
                    if (ball.y >= bar[k].y && ball.x >= leftX && ball.x <= rightX) {
                        balls.splice(i, 1);
                        break;
                    }
                }
            }
        }
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
            currentBars.push(currentBar);
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

        // Start loops
        (function ballProduction() {
            var rand = Math.round(Math.random() * (1500 - 500)) + 500;
            setTimeout(function() {
                createBall();
                ballProduction();
            }, rand);
        }());
        loop();
    };

    return {
        'init': init
    }

})();

window.onload = main.init;