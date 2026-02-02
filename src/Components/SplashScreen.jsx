import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
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
        if (type === 'logo') drawLogo(); else drawSimpleText(text);
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
      
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
      }
      animationId = requestAnimationFrame(animate);
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
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        // Linear gradient: Black base with a subtle 10% opacity Red tint
        background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(40,0,0,1) 100%)'
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
  );
}