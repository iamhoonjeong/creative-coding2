window.addEventListener('load', () => {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.fillStyle = 'white';

  let balls: Ball[] = [];
  let bars: Bar[] = [];
  let barPosition = { x: 300, y: canvas.height * 0.5 };

  class Bar {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    w: number;
    h: number;
    vx: number;
    vy: number;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number) {
      this.canvas = canvas;
      this.context = context;
      this.x = x;
      this.y = y;
      this.w = 10;
      this.h = 100;
      this.vx = 0;
      this.vy = 0;

      window.addEventListener('keydown', (e) => {
        console.log(e.key);
        if (e.key === 'ArrowDown') {
          this.vy = 5;
        }
        if (e.key === 'ArrowUp') {
          this.vy = -5;
        }
        if (e.key === 'ArrowRight') {
          this.vx = 5;
        }
        if (e.key === 'ArrowLeft') {
          this.vx = -5;
        }
      });

      window.addEventListener('keyup', (e) => {
        this.vy = 0;
        this.vx = 0;
      });
    }

    update(x: number, y: number) {
      this.x = x;
      this.y = y;
      if (this.y < 0) this.y = 0;
      if (this.y > canvas.height - this.h) this.y = canvas.height - this.h;
      barPosition.y += this.vy;
      barPosition.x += this.vx;
    }

    draw() {
      this.context.save();
      this.context.translate(this.x, this.y);
      this.context.beginPath();

      this.context.rect(0, 0, 10, 100);
      this.context.fill();

      this.context.restore();
    }
  }

  class Ball {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    speed: number;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number) {
      this.canvas = canvas;
      this.context = context;
      this.radius = 20;
      this.speed = 5;
      this.x = x + this.radius;
      this.y = y - this.radius;
      this.vx = Math.random() < 0.5 ? -this.speed : this.speed;
      this.vy = Math.random() < 0.5 ? -this.speed : this.speed;
    }

    draw() {
      this.context.save();
      this.context.beginPath();
      this.context.translate(this.x, this.y);

      this.context.arc(0, 0, this.radius, 0, Math.PI * 2);
      this.context.fill();

      this.context.restore();
    }

    update() {
      if (this.x <= this.radius || this.x >= canvas.width - this.radius) this.vx *= -1;
      if (this.y <= this.radius || this.y >= canvas.height - this.radius) this.vy *= -1;
      if (
        this.x >= barPosition.x - 10 &&
        this.x <= barPosition.x + this.radius &&
        this.y >= barPosition.y &&
        this.y <= barPosition.y + 100
      )
        this.vx *= -1;

      this.x += this.vx;
      this.y += this.vy;
      if (this.x <= this.radius) console.log('touch');
    }
  }

  function init() {
    balls.push(new Ball(canvas, context, Math.random() * canvas.width, Math.random() * canvas.height));
    bars.push(new Bar(canvas, context, barPosition.x, barPosition.y));
  }

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball) => {
      ball.draw();
      ball.update();
    });

    bars.forEach((bar) => {
      bar.update(barPosition.x, barPosition.y);
      bar.draw();
    });
    requestAnimationFrame(animate);
  }

  init();
  animate();
});
