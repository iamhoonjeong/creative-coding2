"use strict";
window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    function animate() {
        requestAnimationFrame(animate);
    }
    animate();
});
