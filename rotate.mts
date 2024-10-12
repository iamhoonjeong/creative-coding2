window.addEventListener('load', () => {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles: Particle[] = [];
  const center = { x: canvas.width * 0.5, y: canvas.height * 0.5 };
  let cursor = { x: 9999, y: 9999 };
  let angle = 0;

  class Particle {
    x: number;
    y: number;
    color: string;
    radius: number;
    distance: number;

    constructor(x, y, color, distance) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = 10;
      this.distance = distance;
    }

    draw() {
      context.save();
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    update() {
      this.draw();
      this.x = center.x + this.distance * Math.cos(angle);
      this.y = center.y + this.distance * Math.sin(angle);
    }
  }

  function init() {
    let particleCount = 600;
    let color = 360 / particleCount;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(center.x + i, center.y + i, `hsl(${color * i}, 150%, 50%)`, i));
    }
  }

  function animate() {
    context.fillStyle = `rgba(0, 0, 0, 0.1)`;
    context.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', (e) => {
    cursor.x = e.x - center.x;
    cursor.y = e.y - center.y;
    angle = Math.atan2(cursor.y, cursor.x);
  });

  init();
  animate();
});
