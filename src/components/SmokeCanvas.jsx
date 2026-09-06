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

        // Color variants: Amber Gold (#f59e0b), Velvet Purple (#a855f7), Cyan Chill (#06b6d4)
        const colors = [
          { r: 245, g: 158, b: 11 }, // Amber Gold
          { r: 168, g: 85, b: 247 }, // Purple Smoke
          { r: 6, g: 182, b: 212 },   // Ice Cyan
          { r: 236, g: 72, b: 153 }   // Neon Magenta
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

    // Ember Spark Particle Class (Glowing Charcoals effect)
    class Ember {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
        this.size = Math.random() * 2.5 + 1;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = -(Math.random() * 1.2 + 0.5);
        this.alpha = Math.random() * 0.8 + 0.2;
        this.pulse = Math.random() * 0.05;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha += Math.sin(Date.now() * 0.005) * this.pulse;

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#f59e0b';
        ctx.fillStyle = `rgba(245, 158, 11, ${Math.max(0.1, Math.min(1, this.alpha))})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles
    const particleCount = Math.min(Math.floor(width / 35), 45);
    const emberCount = Math.min(Math.floor(width / 25), 60);

    const particles = Array.from({ length: particleCount }, () => new Particle());
    const embers = Array.from({ length: emberCount }, () => new Ember());

    // Render loop
    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw smoke cloud particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw ember glowing particles
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
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
