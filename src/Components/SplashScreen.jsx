import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
    // --- Mesh effect state ---
    const meshRef = useRef({ points: [], mouse: { x: null, y: null } });
  const canvasRef = useRef(null);

  useEffect(() => {
            // Mouse move handler for mesh interaction
            function handleMeshMouseMove(e) {
              meshRef.current.mouse.x = e.clientX;
              meshRef.current.mouse.y = e.clientY;
            }
            window.addEventListener('mousemove', handleMeshMouseMove);
        // --- Mesh effect setup ---
        function initMesh() {
          const mesh = meshRef.current;
          const meshPoints = [];
          const meshCount = 38;
          const w = canvasRef.current.width;
          const h = canvasRef.current.height;
          for (let i = 0; i < meshCount; i++) {
            meshPoints.push({
              x: Math.random() * w,
              y: Math.random() * h,
              vx: (Math.random() - 0.5) * 0.3,
              vy: (Math.random() - 0.5) * 0.3,
              color: i % 2 === 0 ? '255,0,0' : '255,255,255',
            });
          }
          mesh.points = meshPoints;
        }

        function animateMesh(ctx) {
          const mesh = meshRef.current;
          const mouse = mesh.mouse;
          // Move points, interact with mouse
          for (let pt of mesh.points) {
            // Interactive: points are repelled by mouse
            if (mouse.x !== null && mouse.y !== null) {
              const dx = pt.x - mouse.x;
              const dy = pt.y - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 120) {
                // Repel from mouse
                const angle = Math.atan2(dy, dx);
                pt.x += Math.cos(angle) * 2.5 * (120 - dist) / 120;
                pt.y += Math.sin(angle) * 2.5 * (120 - dist) / 120;
              }
            }
            pt.x += pt.vx;
            pt.y += pt.vy;
            // Bounce off edges
            if (pt.x < 0 || pt.x > ctx.canvas.width) pt.vx *= -1;
            if (pt.y < 0 || pt.y > ctx.canvas.height) pt.vy *= -1;
          }
          // Draw lines
          for (let i = 0; i < mesh.points.length; i++) {
            for (let j = i + 1; j < mesh.points.length; j++) {
              const dx = mesh.points[i].x - mesh.points[j].x;
              const dy = mesh.points[i].y - mesh.points[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 160) {
                ctx.beginPath();
                ctx.moveTo(mesh.points[i].x, mesh.points[i].y);
                ctx.lineTo(mesh.points[j].x, mesh.points[j].y);
                ctx.strokeStyle = `rgba(${mesh.points[i].color},0.18)`;
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          }
          // Draw points
          for (let pt of mesh.points) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(${pt.color})`;
            ctx.fill();
            // Optionally: draw some circles
            if (Math.random() < 0.01) {
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, 12 + Math.random() * 10, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(${pt.color},0.08)`;
              ctx.lineWidth = 1.2;
              ctx.stroke();
            }
          }
        }
      initMesh();
    // Burst effect: create a burst of particles at the center
    function burstParticles() {
      const burstCount = 80;
      const burstParticles = [];
      const centerX = canvasRef.current.width / 2;
      const centerY = canvasRef.current.height / 2;
      for (let i = 0; i < burstCount; i++) {
        const angle = (2 * Math.PI * i) / burstCount;
        const speed = Math.random() * 6 + 4;
        const color = i % 2 === 0 ? '255,0,0' : '255,255,255';
        burstParticles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 3,
          opacity: 1,
          color,
        });
      }
      let burstFrame = 0;
      function animateBurst() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.save();
        for (let p of burstParticles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
          ctx.fill();
          p.x += p.vx;
          p.y += p.vy;
          p.opacity -= 0.025;
        }
        ctx.restore();
        burstFrame++;
        if (burstFrame < 40) {
          requestAnimationFrame(animateBurst);
        }
      }
      animateBurst();
    }
    // Schedule burst effect at the start
    setTimeout(burstParticles, 300);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particleArray = [];
    const mouse = { x: null, y: null, radius: 100 };
    const timers = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor(x, y, behavior, color) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = 2;
        this.density = (Math.random() * 30) + 1;
        this.opacity = 0;
        this.color = color;
        
        if (behavior === 'random') {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        } else if (behavior === 'center') {
          this.x = canvas.width / 2;
          this.y = canvas.height / 2;
          this.opacity = 1;
        }
      }

      draw() {
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (this.opacity < 1) this.opacity += 0.015;
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= forceDirectionX * force * this.density;
          this.y -= forceDirectionY * force * this.density;
        } else {
          if (this.x !== this.baseX) {
            let dxMove = this.x - this.baseX;
            this.x -= dxMove / 10;
          }
          if (this.y !== this.baseY) {
            let dyMove = this.y - this.baseY;
            this.y -= dyMove / 10;
          }
        }
      }

      fadeOut() {
        if (this.opacity > 0) this.opacity -= 0.05;
      }
    }

    function drawSimpleText(text) {
        let fontSize = Math.min(canvas.width / 8, 130);
        ctx.font = 'bold ' + fontSize + 'px Verdana';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const textWidth = ctx.measureText(text).width;
        const startX = (canvas.width - textWidth) / 2;
        const middlePoint = startX + (textWidth / 2);

        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.save(); ctx.beginPath(); ctx.rect(0, 0, middlePoint, canvas.height); ctx.clip();
        ctx.fillText(text, canvas.width/2, canvas.height/2); ctx.restore();

        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.save(); ctx.beginPath(); ctx.rect(middlePoint, 0, canvas.width, canvas.height); ctx.clip();
        ctx.fillText(text, canvas.width/2, canvas.height/2); ctx.restore();
    }

    function drawLogo() {
        let fontSize = Math.min(canvas.width / 8, 150);
        ctx.font = 'bold ' + fontSize + 'px Verdana';
        ctx.textBaseline = 'middle';
        const text1 = "Vyronex "; const text2 = "Motors";
        const totalWidth = ctx.measureText(text1).width + ctx.measureText(text2).width;
        const startX = (canvas.width - totalWidth) / 2;
        const centerY = canvas.height / 2;
        ctx.textAlign = 'left';
        ctx.fillStyle = 'white'; ctx.fillText(text1, startX, centerY);
        ctx.fillStyle = 'red'; ctx.fillText(text2, startX + ctx.measureText(text1).width, centerY);
    }

    function init(text, type, behavior) {
        particleArray = [];
        ctx.clearRect(0,0, canvas.width, canvas.height);
        if (type === 'logo') {
          drawLogo();
        } else {
          drawSimpleText(text);
        }
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < imgData.height; y += 4) {
            for (let x = 0; x < imgData.width; x += 4) {
                const index = (y * 4 * imgData.width) + (x * 4);
                if (imgData.data[index + 3] > 128) {
                    let color = (imgData.data[index] > 200 && imgData.data[index+1] < 100) ? '255, 0, 0' : '255, 255, 255';
                    particleArray.push(new Particle(x, y, behavior, color));
                }
            }
        }
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    let animationId;
    function animate() {
      // Clear the canvas every frame to avoid ghosting
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw mesh background
      animateMesh(ctx);
      // Draw main particles/text
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
      }
      animationId = requestAnimationFrame(animate);
      // Re-init mesh on resize
      window.addEventListener('resize', initMesh);
    }
    animate();

    timers.push(setTimeout(() => init('CHINMAY', 'text', 'random'), 500));
    timers.push(setTimeout(() => {
        let fade = setInterval(() => particleArray.forEach(p => p.fadeOut()), 20);
        setTimeout(() => clearInterval(fade), 600);
    }, 2500));

    timers.push(setTimeout(() => init('LAUNCHES', 'text', 'center'), 2900));
    timers.push(setTimeout(() => {
        let fade = setInterval(() => particleArray.forEach(p => p.fadeOut()), 20);
        setTimeout(() => clearInterval(fade), 600);
    }, 5800));

    timers.push(setTimeout(() => init(null, 'logo', 'random'), 6600));
    timers.push(setTimeout(() => {
        let fade = setInterval(() => particleArray.forEach(p => p.fadeOut()), 20);
        setTimeout(() => clearInterval(fade), 1000);
    }, 10000));

    timers.push(setTimeout(() => { if (onComplete) onComplete(); }, 11000));

    return () => {
          window.removeEventListener('mousemove', handleMeshMouseMove);
        window.removeEventListener('resize', initMesh);
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden splash-glow"
      style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(40,0,0,1) 100%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ background: 'transparent' }}
      />
    </motion.div>
  // Add CSS for glowing border effect
  // You can place this in App.css or here as a styled-jsx block
  // .splash-glow {
  //   box-shadow: 0 0 40px 10px #ff0000, 0 0 80px 20px #fff inset;
  //   border-radius: 30px;
  //   animation: splashGlowPulse 2s infinite alternate;
  // }
  // @keyframes splashGlowPulse {
  //   0% { box-shadow: 0 0 40px 10px #ff0000, 0 0 80px 20px #fff inset; }
  //   100% { box-shadow: 0 0 80px 20px #ff0000, 0 0 120px 40px #fff inset; }
  // }
  );
}