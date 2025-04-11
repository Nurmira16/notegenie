import React, { useEffect, useRef } from 'react';

const PixelText = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  const createParticles = (ctx, text, offsetY = 0) => {
    // Your existing createParticles function
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.height = 300;
    canvas.width = 800;
    let currentText = "NoteGenie";
    let isMain = true;

    const switchText = () => {
      currentText = isMain ? "by nurmira" : "NoteGenie";
      isMain = !isMain;
      particles = createParticles(ctx, currentText, isMain ? 0 : 100);
    };

    let particles = createParticles(ctx, currentText);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) {
        let dx = p.tx - p.x;
        let dy = p.ty - p.y;

        const dist = Math.hypot(p.x - mouseRef.current.x, p.y - mouseRef.current.y);
        if (dist < 100) {
          const angle = Math.atan2(p.y - mouseRef.current.y, p.x - mouseRef.current.x);
          const repelForce = (100 - dist) / 10;
          p.vx += Math.cos(angle) * repelForce;
          p.vy += Math.sin(angle) * repelForce;
        }

        p.vx += dx * 0.01;
        p.vy += dy * 0.01;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#bdbff6";
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    animate();

    const interval = setInterval(() => {
      switchText();
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []); // Empty dependency array to run the effect once on mount

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PixelText;
