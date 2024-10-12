window.addEventListener('load', () => {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  class Particle {
    effect: Effect;
    x: number;
    y: number;
    ix: number;
    iy: number;
    vx: number;
    vy: number;
    dx: number;
    dy: number;
    color: string;
    size: number;
    distance: number;
    force: number;
    angle: number;
    ease: number;
    frictions: number;

    constructor(effect: Effect, x: number, y: number, color: string) {
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

    draw() {
      this.effect.context.fillStyle = this.color;
      this.effect.context.fillRect(this.x, this.y, this.size, this.size);
    }

    update() {
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
    }
  }

  class Effect {
    context: CanvasRenderingContext2D;
    canvasWidth: number;
    canvasHeight: number;
    maxTextWidth: number;
    fontSize: number;
    lineHeight: number;
    textX: number;
    textY: number;
    particles: any[];
    gap: number;
    cursor: { radius: number; x: number; y: number };

    constructor(context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
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
        radius: 20000,
        x: 9999,
        y: 9999,
      };

      window.addEventListener('mousemove', (e) => {
        this.cursor.x = (e.offsetX / canvas.offsetWidth) * canvas.width;
        this.cursor.y = (e.offsetY / canvas.offsetHeight) * canvas.height;
      });
    }

    wrapText(text: string) {
      const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
      gradient.addColorStop(0.3, 'orange');
      gradient.addColorStop(0.5, 'white');
      gradient.addColorStop(0.7, 'pink');

      this.context.fillStyle = gradient;
      this.context.font = `${this.fontSize}px Montserrat`;
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';

      let linesArray: any[] = [];
      let lineCounter = 0;
      let line = '';
      let words = text.split(' ');

      for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + ' ';

        if (this.context.measureText(testLine).width > this.maxTextWidth) {
          line = words[i] + ' ';
          lineCounter++;
        } else {
          line = testLine;
        }
        linesArray[lineCounter] = line;
      }

      let textHeight = this.lineHeight * lineCounter;
      this.textY = this.canvasHeight * 0.5 - textHeight * 0.5;

      linesArray.forEach((el, index) => {
        this.context.fillText(el, this.textX, this.textY + index * this.lineHeight);
      });

      this.convertToParticle();
    }

    convertToParticle() {
      this.particles = [];
      const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      for (let y = 0; y < this.canvasHeight; y += this.gap) {
        for (let x = 0; x < this.canvasWidth; x += this.gap) {
          const index = (y * this.canvasWidth + x) * 4;
          const alpha = pixels[index + 3];

          if (alpha > 0) {
            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];
            const color = `rgb(${r}, ${g}, ${b})`;

            this.particles.push(new Particle(this, x, y, color));
          }
        }
      }
    }

    render() {
      this.particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
    }

    resize(width: number, height: number) {
      this.canvasWidth = width;
      this.canvasHeight = height;
      this.textX = this.canvasWidth * 0.5;
      this.textY = this.canvasHeight * 0.5;
      this.maxTextWidth = this.canvasWidth * 0.8;
    }
  }

  const effect = new Effect(context, canvas.width, canvas.height);
  effect.wrapText('HERE IS THE THING, PARTICLES');

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

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
