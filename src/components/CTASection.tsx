import { type Language, translations } from '../i18n/translations';

interface CTASectionProps {
  lang: Language;
}

export default function CTASection({ lang }: CTASectionProps) {
  const t = translations[lang].services;

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #1E40AF 100%)',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '15%',
          transform: 'translateY(-50%)',
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '10%',
          transform: 'translateY(-50%)',
          width: 250,
          height: 250,
          background: 'radial-gradient(circle, rgba(96,165,250,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
        }}
      >
        {/* Quote marks */}
        <span
          style={{
            fontSize: 80,
            lineHeight: 0.5,
            color: 'rgba(96,165,250,0.3)',
            fontFamily: 'Georgia, serif',
            display: 'block',
          }}
        >
          "
        </span>

        <p
          style={{
            fontSize: 'clamp(22px, 3.5vw, 40px)',
            fontWeight: 700,
            color: 'white',
            maxWidth: 780,
            lineHeight: 1.4,
            letterSpacing: '-0.3px',
          }}
        >
          {t.tagline}
        </p>

        {/* Divider line with stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 60, height: 1, background: 'rgba(96,165,250,0.4)' }} />
          <div style={{ display: 'flex', gap: 6 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#60A5FA" style={{ opacity: 0.8 }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <div style={{ width: 60, height: 1, background: 'rgba(96,165,250,0.4)' }} />
        </div>

        <a href="#contact" className="btn-primary" style={{ fontSize: 18, padding: '20px 52px' }}>
          {t.cta}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
