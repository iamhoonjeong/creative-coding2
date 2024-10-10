window.addEventListener('load', function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var particles = [];
    var center = { x: canvas.width * 0.5, y: canvas.height * 0.5 };
    var cursor = { x: 9999, y: 9999 };
    var angle = 0;
    var Particle = /** @class */ (function () {
        function Particle(x, y, color, distance) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = 10;
            this.distance = distance;
        }
        Particle.prototype.draw = function () {
            context.fillStyle = this.color;
            context.save();
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fill();
            context.restore();
        };
        Particle.prototype.update = function () {
            this.draw();
            this.x = center.x + this.distance * Math.cos(angle);
            this.y = center.y + this.distance * Math.sin(angle);
        };
        return Particle;
    }());
    function init() {
        var particleCount = 600;
        var color = 360 / particleCount;
        for (var i = 0; i < particleCount; i++) {
            particles.push(new Particle(center.x + i, center.y + i, "hsl(".concat(color * i, ", 150%, 50%)"), i));
        }
    }
    function animate() {
        context.fillStyle = "rgba(0, 0, 0, 0.05)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (particle) {
            particle.update();
        });
        requestAnimationFrame(animate);
    }
    window.addEventListener('mousemove', function (e) {
        cursor.x = e.x - center.x;
        cursor.y = e.y - center.y;
        angle = Math.atan2(cursor.y, cursor.x);
    });
    init();
    animate();
});
export {};
