var main = (function () {

    var canvas, ctx;
    var score = 0;
    var mouseDown = false;
    var currentBars = [];
    var currentBar = [];
    var balls = [];
    var colours = ['red', 'green', 'blue', 'yellow', 'black'];
    var currentColour;

    function Ball(x, colour) {
        this.x = x;
        this.y = 0;
        this.colour = colour;

        this.draw = function () {
            circle(this.x, this.y, 5, this.colour);
        };

        this.update = function () {
            this.y += 2;
        };
    }


    var circle = function (x, y, r, colour) {
        ctx.beginPath();
        ctx.fillStyle = colour;
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    };

    var drawBar = function (bar) {
        ctx.beginPath();
        ctx.moveTo(bar[0].x, bar[0].y);

        for (var i = 1, l = bar.length; i < l; i++) {
            var point = bar[i];
            ctx.lineTo(point.x, point.y);
        }

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#d3d3d3';
        ctx.stroke();
    };

    var createBall = function () {
        var rndX = Math.random() * window.innerWidth;
        var colour = colours[Math.floor(Math.random() * colours.length)];
        balls.push(new Ball(rndX, colour));
    };

    var draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var i, l;

        for (i = 0, l = balls.length; i < l; i++) {
            balls[i].draw();
        }

        for (i = 0, l = currentBars.length; i < l; i++) {
            drawBar(currentBars[i]);
        }

        circle(canvas.width / 2, canvas.height, 30, currentColour);
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
        currentColour = colours[Math.floor(Math.random() * colours.length)];

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
            drawBar(currentBar);
            currentBars.push(currentBar);
        });

        window.addEventListener('mousemove', function (e) {
            

            if (mouseDown) {
                currentBar.push({
                    'x': e.clientX,
                    'y': e.clientY
                });
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