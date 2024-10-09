const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.style.backgroundColor = 'green';

let number = 0;
let scale = 10;

function drawFlower() {
  let angle = number * 1;
  let radius = scale * Math.sqrt(number);
  let positionX = radius * Math.sin(angle) + canvas.width * 0.5;
  let positionY = radius * Math.cos(angle) + canvas.height * 0.5;

  context.fillStyle = 'red';
  context.strokeStyle = 'blue';
  context.lineWidth = 5;
  context.beginPath();
  context.arc(positionX, positionY, 20, 0, Math.PI * 2);
  context.closePath();
  context.fill();
  context.stroke();

  number += 3;
}

function animate() {
  // context.clearRect(0, 0, canvas.width, canvas.height);
  drawFlower();

  requestAnimationFrame(animate);
}
animate();
