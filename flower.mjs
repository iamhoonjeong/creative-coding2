var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.style.backgroundColor = 'green';
var number = 0;
var scale = 10;
function drawFlower() {
    var angle = number * 1;
    var radius = scale * Math.sqrt(number);
    var positionX = radius * Math.sin(angle) + canvas.width * 0.5;
    var positionY = radius * Math.cos(angle) + canvas.height * 0.5;
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
export {};
