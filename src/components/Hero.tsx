import { useEffect, useRef } from 'react';
import { type Language, translations } from '../i18n/translations';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang].hero;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating particles background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 3 + 1,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`;
        ctx.fill();
      });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 40%, #1E40AF 70%, #1D4ED8 100%)',
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Blob decorations */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
          animation: 'blob 12s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(96,165,250,0.2) 0%, transparent 70%)',
          animation: 'blob 16s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '120px 28px 80px',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 100,
            padding: '8px 20px',
            marginBottom: 32,
            animation: 'fadeUp 0.6s ease forwards',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#60A5FA', display: 'inline-block', animation: 'pulse-ring 2s infinite' }} />
          <span style={{ color: '#BFDBFE', fontWeight: 600, fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase' }}>
            {t.badge}
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 900,
            color: 'white',
            lineHeight: 1.08,
            marginBottom: 24,
            animation: 'fadeUp 0.7s 0.1s ease forwards',
            opacity: 0,
            letterSpacing: '-1px',
          }}
        >
          {t.title}{' '}
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #60A5FA, #93C5FD, #BFDBFE)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t.titleHighlight}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(16px, 2.2vw, 22px)',
            color: '#BFDBFE',
            maxWidth: 620,
            margin: '0 auto 48px',
            lineHeight: 1.7,
            fontWeight: 400,
            animation: 'fadeUp 0.7s 0.2s ease forwards',
            opacity: 0,
          }}
        >
          {t.subtitle}
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeUp 0.7s 0.3s ease forwards',
            opacity: 0,
          }}
        >
          <a href="#projects" className="btn-primary" style={{ fontSize: 17, padding: '18px 40px' }}>
            {t.cta}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', fontSize: 17, padding: '18px 40px' }}>
            {translations[lang].nav.contact}
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            color: 'rgba(255,255,255,0.5)',
            fontSize: 12,
            animation: 'fadeIn 1s 1s ease forwards',
            opacity: 0,
          }}
        >
          <div
            style={{
              width: 24,
              height: 40,
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: 12,
              position: 'relative',
            }}
          >
            <div
              style={{
                width: 4,
                height: 8,
                background: 'white',
                borderRadius: 2,
                position: 'absolute',
                top: 6,
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'float 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(96,165,250,0.6); }
          70%  { box-shadow: 0 0 0 8px rgba(96,165,250,0); }
          100% { box-shadow: 0 0 0 0 rgba(96,165,250,0); }
        }
      `}</style>
    </section>
  );
}
