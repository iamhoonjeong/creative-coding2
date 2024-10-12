window.addEventListener('load', () => {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles: Particle[] = [];
  let mouse = { x: 9999, y: 9999 };
  let gravity = 0.1;
  let fraction = 0.99;

  class Particle {
    x: number;
    y: number;
    color: string;
    velocity: { x: number; y: number };
    alpha: number;

    constructor(x, y, color, velocity) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.velocity = velocity;
      this.alpha = 1;
    }

    draw() {
      context.save();
      context.beginPath();
      context.fillStyle = this.color;
      context.globalAlpha = this.alpha;

      context.arc(this.x, this.y, 5, 0, Math.PI * 2);
      context.fill();

      context.closePath();
      context.restore();
    }

    update() {
      this.draw();

      this.velocity.x *= fraction;
      this.velocity.y *= fraction;
      this.velocity.y += gravity;
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= 0.005;
    }
  }

  window.addEventListener('click', (e) => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;

    let particleCount = 400;
    let angle = (Math.PI * 2) / particleCount;
    let power = 10;

    for (let i = 0; i < particleCount; i++) {
      particles.push(
        new Particle(mouse.x, mouse.y, `hsl(${Math.random() * 360}, 50%, 50%)`, {
          x: Math.cos(angle * i) * Math.random() * power,
          y: Math.sin(angle * i) * Math.random() * power,
        }),
      );
    }
  });

  function animate() {
    context.fillStyle = `rgba(0, 0, 0, 0.1)`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      if (particle.alpha > 0) {
        particle.update();
      } else {
        particles.splice(index, 1);
      }
    });
    requestAnimationFrame(animate);
  }

  animate();
});
