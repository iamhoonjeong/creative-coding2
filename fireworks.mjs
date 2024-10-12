window.addEventListener('load', function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var particles = [];
    var mouse = { x: 9999, y: 9999 };
    var gravity = 0.1;
    var fraction = 0.99;
    var Particle = /** @class */ (function () {
        function Particle(x, y, color, velocity) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = velocity;
            this.alpha = 1;
        }
        Particle.prototype.draw = function () {
            context.save();
            context.beginPath();
            context.fillStyle = this.color;
            context.globalAlpha = this.alpha;
            context.arc(this.x, this.y, 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
            context.restore();
        };
        Particle.prototype.update = function () {
            this.draw();
            this.velocity.x *= fraction;
            this.velocity.y *= fraction;
            this.velocity.y += gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= 0.005;
        };
        return Particle;
    }());
    window.addEventListener('click', function (e) {
        mouse.x = e.x;
        mouse.y = e.y;
        var particleCount = 400;
        var angle = (Math.PI * 2) / particleCount;
        var power = 10;
        for (var i = 0; i < particleCount; i++) {
            particles.push(new Particle(mouse.x, mouse.y, "hsl(".concat(Math.random() * 360, ", 50%, 50%)"), {
                x: Math.cos(angle * i) * Math.random() * power,
                y: Math.sin(angle * i) * Math.random() * power,
            }));
        }
    });
    function animate() {
        context.fillStyle = "rgba(0, 0, 0, 0.1)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (particle, index) {
            if (particle.alpha > 0) {
                particle.update();
            }
            else {
                particles.splice(index, 1);
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
});
export {};
