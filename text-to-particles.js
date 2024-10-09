window.addEventListener('load', function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = "".concat(window.innerWidth, "px");
    canvas.style.height = "".concat(window.innerHeight, "px");
    var Particle = /** @class */ (function () {
        function Particle(effect, x, y, color) {
            this.effect = effect;
            this.x = Math.random() * this.effect.canvasWidth;
            this.y = this.effect.canvasHeight;
            this.ix = x;
            this.iy = y;
            this.vx = 0;
            this.vy = 0;
            this.dx = 0;
            this.dy = 0;
            this.distance = 0;
            this.force = 0;
            this.angle = 0;
            this.ease = Math.random() * 0.1 + 0.005;
            this.frictions = Math.random() * 0.5 + 0.15;
            this.color = color;
            this.size = this.effect.gap;
        }
        Particle.prototype.draw = function () {
            this.effect.context.fillStyle = this.color;
            this.effect.context.fillRect(this.x, this.y, this.size, this.size);
        };
        Particle.prototype.update = function () {
            this.dx = this.effect.cursor.x - this.x;
            this.dy = this.effect.cursor.y - this.y;
            this.distance = this.dx * this.dx + this.dy * this.dy;
            this.force = -this.effect.cursor.radius / this.distance;
            if (this.distance < this.effect.cursor.radius) {
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }
            this.x += (this.vx *= this.frictions) + (this.ix - this.x) * this.ease;
            this.y += (this.vy *= this.frictions) + (this.iy - this.y) * this.ease;
        };
        return Particle;
    }());
    var Effect = /** @class */ (function () {
        function Effect(context, canvasWidth, canvasHeight) {
            var _this = this;
            this.context = context;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.maxTextWidth = this.canvasWidth * 0.8;
            this.fontSize = 120;
            this.lineHeight = this.fontSize * 0.9;
            this.textX = this.canvasWidth * 0.5;
            this.textY = this.canvasHeight * 0.5;
            this.particles = [];
            this.gap = 1;
            this.cursor = {
                radius: 200000,
                x: 9999,
                y: 9999,
            };
            window.addEventListener('mousemove', function (e) {
                _this.cursor.x = (e.offsetX / canvas.offsetWidth) * canvas.width;
                _this.cursor.y = (e.offsetY / canvas.offsetHeight) * canvas.height;
            });
        }
        Effect.prototype.wrapText = function (text) {
            var _this = this;
            var gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
            gradient.addColorStop(0.3, 'orange');
            gradient.addColorStop(0.5, 'white');
            gradient.addColorStop(0.7, 'pink');
            this.context.fillStyle = gradient;
            this.context.font = "".concat(this.fontSize, "px Montserrat");
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            var linesArray = [];
            var lineCounter = 0;
            var line = '';
            var words = text.split(' ');
            for (var i = 0; i < words.length; i++) {
                var testLine = line + words[i] + ' ';
                if (this.context.measureText(testLine).width > this.maxTextWidth) {
                    line = words[i] + ' ';
                    lineCounter++;
                }
                else {
                    line = testLine;
                }
                linesArray[lineCounter] = line;
            }
            var textHeight = this.lineHeight * lineCounter;
            this.textY = this.canvasHeight * 0.5 - textHeight * 0.5;
            linesArray.forEach(function (el, index) {
                _this.context.fillText(el, _this.textX, _this.textY + index * _this.lineHeight);
            });
            this.convertToParticle();
        };
        Effect.prototype.convertToParticle = function () {
            this.particles = [];
            var pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            for (var y = 0; y < this.canvasHeight; y += this.gap) {
                for (var x = 0; x < this.canvasWidth; x += this.gap) {
                    var index = (y * this.canvasWidth + x) * 4;
                    var alpha = pixels[index + 3];
                    if (alpha > 0) {
                        var r = pixels[index];
                        var g = pixels[index + 1];
                        var b = pixels[index + 2];
                        var color = "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
                        this.particles.push(new Particle(this, x, y, color));
                    }
                }
            }
        };
        Effect.prototype.render = function () {
            this.particles.forEach(function (particle) {
                particle.update();
                particle.draw();
            });
        };
        Effect.prototype.resize = function (width, height) {
            this.canvasWidth = width;
            this.canvasHeight = height;
            this.textX = this.canvasWidth * 0.5;
            this.textY = this.canvasHeight * 0.5;
            this.maxTextWidth = this.canvasWidth * 0.8;
        };
        return Effect;
    }());
    var effect = new Effect(context, canvas.width, canvas.height);
    effect.wrapText('HERE IS THE THING, PARTICLES');
    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
        canvas.style.width = "".concat(window.innerWidth, "px");
        canvas.style.height = "".concat(window.innerHeight, "px");
        effect.wrapText('HERE IS THE THING, PARTICLES');
        effect.resize(canvas.width, canvas.height);
    });
    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        effect.render();
        requestAnimationFrame(animate);
    }
    animate();
});
