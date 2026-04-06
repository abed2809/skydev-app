/**
 * PhoneShowcase — 3 iPhone-style mockups with Framer Motion carousel.
 * - Auto-rotates every 3s (left → center → right → left)
 * - Mouse parallax (subtle)
 * - Hover scale on center phone
 * - Glow, depth, shadow effects
 * - Cloudinary upload support
 */
import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { type Language, translations } from '../i18n/translations';

interface PhoneItem {
  id: string;
  title: string;
  subtitle: string;
  media: string;      // URL to image or video
  mediaType: 'image' | 'video' | 'empty';
  gradient: string;
}

// ── Demo slides — replace media URLs with real Cloudinary uploads ──────────
const INITIAL_PHONES: PhoneItem[] = [
  {
    id: '1',
    title: 'Slotify',
    subtitle: 'Smart Booking App',
    media: 'https://res.cloudinary.com/dcyznmocy/video/upload/v1775333459/Phone_rec2_kqljyc.mov',
    mediaType: 'video',
    gradient: 'linear-gradient(160deg, #1E3A8A 0%, #2563EB 60%, #60A5FA 100%)',
  },
  {
    id: '2',
    title: 'HAAT Delivery',
    subtitle: 'Multi-Restaurant Platform',
    media: 'https://res.cloudinary.com/dcyznmocy/video/upload/v1775333473/Phone_rec3_da1yaj.mov',
    mediaType: 'video',
    gradient: 'linear-gradient(160deg, #0F172A 0%, #1E293B 50%, #DC2626 100%)',
  },
  {
    id: '3',
    title: 'Sky Dev',
    subtitle: 'Digital Solutions',
    media: 'https://res.cloudinary.com/dcyznmocy/video/upload/v1775333446/Phone_rec1_kr5zl8.mov',
    mediaType: 'video',
    gradient: 'linear-gradient(160deg, #1E1B4B 0%, #312E81 50%, #4F46E5 100%)',
  },
];

// ── Positions for left / center / right ────────────────────────────────────
const POSITIONS = {
  left:   { x: -200, scale: 0.72, rotateY: 22,  z: 0,   opacity: 0.7 },
  center: { x: 0,    scale: 1,    rotateY: 0,   z: 50,  opacity: 1   },
  right:  { x: 200,  scale: 0.72, rotateY: -22, z: 0,   opacity: 0.7 },
};

type Slot = 'left' | 'center' | 'right';

function getSlots(activeIdx: number, total: number): Record<number, Slot> {
  const slots: Record<number, Slot> = {};
  slots[activeIdx]                      = 'center';
  slots[(activeIdx - 1 + total) % total] = 'left';
  slots[(activeIdx + 1) % total]         = 'right';
  return slots;
}

// ── iPhone frame component ─────────────────────────────────────────────────
function PhoneFrame({
  phone,
  slot,
  onClick,
}: {
  phone: PhoneItem;
  slot: Slot;
  onClick: () => void;
}) {
  const pos = POSITIONS[slot];
  const isCenter = slot === 'center';

  return (
    <motion.div
      onClick={onClick}
      animate={{
        x:       pos.x,
        scale:   pos.scale,
        opacity: pos.opacity,
        rotateY: pos.rotateY,
        zIndex:  pos.z,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      whileHover={isCenter ? { scale: 1.06 } : {}}
      style={{
        position: 'absolute',
        cursor: isCenter ? 'default' : 'pointer',
        transformStyle: 'preserve-3d',
        zIndex: pos.z,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Glow behind center phone */}
      {isCenter && (
        <div style={{
          position: 'absolute',
          inset: '-20%',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.35) 0%, transparent 70%)',
          filter: 'blur(30px)',
          zIndex: -1,
          borderRadius: '50%',
        }} />
      )}

      {/* Phone shell */}
      <div style={{
        width: 240,
        height: 500,
        borderRadius: 44,
        background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #111 100%)',
        padding: 3,
        boxShadow: isCenter
          ? '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 1px rgba(255,255,255,0.15)'
          : '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* Side buttons left */}
        {['72px', '112px', '140px'].map((top, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: -3,
            top,
            width: 3,
            height: i === 0 ? 28 : 40,
            background: '#333',
            borderRadius: '2px 0 0 2px',
          }} />
        ))}
        {/* Power button right */}
        <div style={{
          position: 'absolute',
          right: -3,
          top: 110,
          width: 3,
          height: 60,
          background: '#333',
          borderRadius: '0 2px 2px 0',
        }} />

        {/* Screen */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: 42,
          overflow: 'hidden',
          background: phone.gradient,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute',
            top: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 90,
            height: 28,
            background: '#000',
            borderRadius: 20,
            zIndex: 10,
          }} />

          {/* Content */}
          {phone.mediaType === 'image' && phone.media && (
            <img
              src={phone.media}
              alt={phone.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
            />
          )}
          {phone.mediaType === 'video' && phone.media && (
            <video
              src={phone.media}
              autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
            />
          )}
          {phone.mediaType === 'empty' && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              padding: '0 24px',
              textAlign: 'center',
              marginTop: 30,
            }}>
              {/* App icon placeholder */}
              <div style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                📱
              </div>
            </div>
          )}


          {/* Status bar time */}
          <div style={{
            position: 'absolute',
            top: 16,
            left: 24,
            color: 'white',
            fontSize: 13,
            fontWeight: 700,
          }}>9:41</div>
        </div>
      </div>

    </motion.div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function PhoneShowcase({ lang }: { lang: Language }) {
  const t = translations[lang];
  const phones = INITIAL_PHONES;

  const [activeIdx, setActiveIdx] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax transforms
  const pX = useTransform(mouseX, [-1, 1], [-18, 18]);
  const pY = useTransform(mouseY, [-1, 1], [-10, 10]);

  // Mouse tracking for parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    animate(mouseX, 0, { duration: 0.8, ease: 'easeOut' });
    animate(mouseY, 0, { duration: 0.8, ease: 'easeOut' });
  }, [mouseX, mouseY]);




  const slots = getSlots(activeIdx, phones.length);

  return (
    <section
      id="projects"
      className="section"
      style={{
        background: 'linear-gradient(160deg, #060B18 0%, #0D1B3E 40%, #0A1628 100%)',
        minHeight: 640,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 400,
        background: 'radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56, position: 'relative', zIndex: 1 }}>
        <div className="section-badge" style={{ background: 'rgba(255,255,255,0.08)', color: '#93C5FD', border: '1px solid rgba(255,255,255,0.12)' }}>
          ✦ {t.projects.title}
        </div>
        <h2 style={{ color: 'white', fontSize: 'clamp(24px,3.5vw,44px)', fontWeight: 800, margin: '16px 0 8px' }}>
          {t.projects.subtitle}
        </h2>
      </div>

      {/* Phones stage — same layout on all screen sizes, scaled down on mobile */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="phones-stage-wrapper"
        style={{ x: pX, y: pY, perspective: 1200 }}
      >
        <div style={{ position: 'relative', width: 700, height: 580, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {phones.map((phone, i) => (
            <PhoneFrame
              key={phone.id}
              phone={phone}
              slot={slots[i] ?? 'right'}
              onClick={() => { if (slots[i] !== 'center') setActiveIdx(i); }}
            />
          ))}
        </div>
      </motion.div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: 8, marginTop: 16, position: 'relative', zIndex: 1 }}>
        {phones.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            style={{
              width: i === activeIdx ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === activeIdx ? '#3B82F6' : 'rgba(255,255,255,0.25)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .phones-stage-wrapper {
            transform: scale(0.85) !important;
            transform-origin: center top !important;
            margin-bottom: -88px !important;
          }
        }
        @media (max-width: 480px) {
          .phones-stage-wrapper {
            transform: scale(0.70) !important;
            margin-bottom: -175px !important;
          }
        }
      `}</style>
    </section>
  );
}
