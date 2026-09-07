import React, { useEffect, useRef } from 'react';

export default function SmokeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for dynamic interactive smoke drift
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Smoke Particle Class
    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + Math.random() * 100;
        this.radius = Math.random() * 80 + 40;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -(Math.random() * 0.6 + 0.3);
        this.opacity = Math.random() * 0.15 + 0.05;
        this.maxOpacity = this.opacity;
        this.life = 0;
        this.maxLife = Math.random() * 600 + 400;

        // Color variants: Imperial Amber Gold (#f59e0b), Royal Velvet Purple (#a855f7), Deep Gold (#d97706), Deep Violet (#7e22ce)
        const colors = [
          { r: 245, g: 158, b: 11 }, // Imperial Amber Gold
          { r: 168, g: 85, b: 247 }, // Royal Velvet Purple
          { r: 217, g: 119, b: 6 },  // Deep Gold
          { r: 126, g: 34, b: 206 }  // Deep Royal Violet
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.life++;
        this.x += this.vx + (mouse.x - width / 2) * 0.00008;
        this.y += this.vy;

        // Expand radius as smoke rises
        this.radius += 0.12;

        // Fade in then out
        if (this.life < 100) {
          this.opacity = (this.life / 100) * this.maxOpacity;
        } else if (this.life > this.maxLife - 100) {
          this.opacity = ((this.maxLife - this.life) / 100) * this.maxOpacity;
        }

        if (this.life >= this.maxLife || this.y < -this.radius || this.x < -this.radius || this.x > width + this.radius) {
          this.reset();
        }
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Smoke Ring Particle Class (Realistic Hookah Smoke Rings)
    class SmokeRing {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + Math.random() * 80;
        this.radius = Math.random() * 15 + 10;
        this.thickness = Math.random() * 8 + 4;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = -(Math.random() * 0.8 + 0.4);
        this.opacity = Math.random() * 0.25 + 0.1;
        this.maxOpacity = this.opacity;
        this.life = 0;
        this.maxLife = Math.random() * 500 + 350;
      }

      update() {
        this.life++;
        this.x += this.vx + (mouse.x - width / 2) * 0.0001;
        this.y += this.vy;
        this.radius += 0.25; // Smoke ring expands as it rises

        if (this.life < 80) {
          this.opacity = (this.life / 80) * this.maxOpacity;
        } else if (this.life > this.maxLife - 80) {
          this.opacity = ((this.maxLife - this.life) / 80) * this.maxOpacity;
        }

        if (this.life >= this.maxLife || this.y < -this.radius * 2) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.lineWidth = this.thickness;
        ctx.strokeStyle = `rgba(245, 158, 11, ${this.opacity * 0.6})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Ember Spark Particle Class (Glowing Coconut Charcoal Coals)
    class Ember {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
        this.size = Math.random() * 3 + 1.2;
        this.vx = (Math.random() - 0.5) * 1.1;
        this.vy = -(Math.random() * 1.6 + 0.6);
        this.alpha = Math.random() * 0.85 + 0.25;
        this.pulse = Math.random() * 0.08;

        // Fiery Ember Colors: Hot Red, Bright Orange, Amber Gold
        const emberColors = ['#f59e0b', '#f97316', '#ef4444', '#fbbf24'];
        this.color = emberColors[Math.floor(Math.random() * emberColors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha += Math.sin(Date.now() * 0.006) * this.pulse;

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.shadowBlur = 16;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, this.alpha));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles
    const particleCount = Math.min(Math.floor(width / 30), 55);
    const ringCount = Math.min(Math.floor(width / 70), 16);
    const emberCount = Math.min(Math.floor(width / 20), 80);

    const particles = Array.from({ length: particleCount }, () => new Particle());
    const rings = Array.from({ length: ringCount }, () => new SmokeRing());
    const embers = Array.from({ length: emberCount }, () => new Ember());

    // Render loop
    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw smoke cloud particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw expanding smoke rings
      rings.forEach((r) => {
        r.update();
        r.draw();
      });

      // Draw glowing ember sparks
      embers.forEach((e) => {
        e.update();
        e.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-90"
    />
  );
}
