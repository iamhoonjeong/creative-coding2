const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    let cx = width * 0.5;
    let cy = height * 0.5;
    let w = width * 0.8;
    let h = height * 0.2;

    let angle = (135 / 180) * Math.PI;
    let rx = Math.cos(angle) * w;
    let ry = Math.sin(angle) * w;

    context.strokeStyle = 'blue';

    context.save();
    context.translate(cx, cy);
    context.translate(rx * -0.5, (ry + h) * -0.5);

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(rx, ry);
    context.lineTo(rx, ry + h);
    context.lineTo(0, h);
    context.closePath();
    context.stroke();

    context.restore();
  };
};

canvasSketch(sketch, settings);
