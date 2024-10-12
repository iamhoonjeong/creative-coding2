window.addEventListener('load', () => {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function animate() {
    requestAnimationFrame(animate);
  }

  animate();
});
