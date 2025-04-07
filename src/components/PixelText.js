import React, { useEffect, useRef } from 'react';

const PixelText = () => {
  const canvasRef = useRef(null);
  let particles = [];
  const mouse = { x: null, y: null };

  const createParticles = (ctx, text, offsetY = 0) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = `150px Arial`;
    ctx.fillText(text, 50, ctx.canvas.height / 2 + offsetY);

    const textData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const tempParticles = [];
    for (let y = 0; y < ctx.canvas.height; y += 6) {
      for (let x = 0; x < ctx.canvas.width; x += 6) {
        const alpha = textData.data[(y * 4 * textData.width) + (x * 4) + 3];
        if (alpha > 128) {
          tempParticles.push({
            x: Math.random() * ctx.canvas.width,
            y: Math.random() * ctx.canvas.height,
            tx: x,
            ty: y,
            vx: 0,
            vy: 0
          });
        }
      }
    }
    return tempParticles;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // canvas.width = window.innerWidth * 0.66;
    canvas.height = 300; // Set fixed height to 500px
    canvas.width=800;
    let currentText = "NoteGenie";
    let isMain = true;

    const switchText = () => {
      currentText = isMain ? "by nurmira" : "NoteGenie";
      isMain = !isMain;
      particles = createParticles(ctx, currentText, isMain ? 0 : 100);
    };

    particles = createParticles(ctx, currentText);

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) {
        let dx = p.tx - p.x;
        let dy = p.ty - p.y;

        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dist < 100) {
          const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
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
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}
    >
      <canvas
        ref={canvasRef}
        style={{}}
      />
    </div>
  );
};

export default PixelText;
