window.addEventListener('load', function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle = 'white';
    var balls = [];
    var bars = [];
    var barPosition = { x: 300, y: canvas.height * 0.5 };
    var Bar = /** @class */ (function () {
        function Bar(canvas, context, x, y) {
            var _this = this;
            this.canvas = canvas;
            this.context = context;
            this.x = x;
            this.y = y;
            this.w = 10;
            this.h = 100;
            this.vx = 0;
            this.vy = 0;
            window.addEventListener('keydown', function (e) {
                console.log(e.key);
                if (e.key === 'ArrowDown') {
                    _this.vy = 5;
                }
                if (e.key === 'ArrowUp') {
                    _this.vy = -5;
                }
                if (e.key === 'ArrowRight') {
                    _this.vx = 5;
                }
                if (e.key === 'ArrowLeft') {
                    _this.vx = -5;
                }
            });
            window.addEventListener('keyup', function (e) {
                _this.vy = 0;
                _this.vx = 0;
            });
        }
        Bar.prototype.update = function (x, y) {
            this.x = x;
            this.y = y;
            if (this.y < 0)
                this.y = 0;
            if (this.y > canvas.height - this.h)
                this.y = canvas.height - this.h;
            barPosition.y += this.vy;
            barPosition.x += this.vx;
        };
        Bar.prototype.draw = function () {
            this.context.save();
            this.context.translate(this.x, this.y);
            this.context.beginPath();
            this.context.rect(0, 0, 10, 100);
            this.context.fill();
            this.context.restore();
        };
        return Bar;
    }());
    var Ball = /** @class */ (function () {
        function Ball(canvas, context, x, y) {
            this.canvas = canvas;
            this.context = context;
            this.radius = 20;
            this.speed = 5;
            this.x = x + this.radius;
            this.y = y - this.radius;
            this.vx = Math.random() < 0.5 ? -this.speed : this.speed;
            this.vy = Math.random() < 0.5 ? -this.speed : this.speed;
        }
        Ball.prototype.draw = function () {
            this.context.save();
            this.context.beginPath();
            this.context.translate(this.x, this.y);
            this.context.arc(0, 0, this.radius, 0, Math.PI * 2);
            this.context.fill();
            this.context.restore();
        };
        Ball.prototype.update = function () {
            if (this.x <= this.radius || this.x >= canvas.width - this.radius)
                this.vx *= -1;
            if (this.y <= this.radius || this.y >= canvas.height - this.radius)
                this.vy *= -1;
            if (this.x >= barPosition.x - 10 &&
                this.x <= barPosition.x + this.radius &&
                this.y >= barPosition.y &&
                this.y <= barPosition.y + 100)
                this.vx *= -1;
            this.x += this.vx;
            this.y += this.vy;
            if (this.x <= this.radius)
                console.log('touch');
        };
        return Ball;
    }());
    function init() {
        balls.push(new Ball(canvas, context, Math.random() * canvas.width, Math.random() * canvas.height));
        bars.push(new Bar(canvas, context, barPosition.x, barPosition.y));
    }
    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        balls.forEach(function (ball) {
            ball.draw();
            ball.update();
        });
        bars.forEach(function (bar) {
            bar.update(barPosition.x, barPosition.y);
            bar.draw();
        });
        requestAnimationFrame(animate);
    }
    init();
    animate();
});
export {};
