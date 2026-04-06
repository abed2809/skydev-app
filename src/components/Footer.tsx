import { type Language, translations } from '../i18n/translations';
import logo from '../assets/logo.png';

interface FooterProps {
  lang: Language;
}

const INSTAGRAM_URL =
  'https://www.instagram.com/skydev_1?igsh=NjlhM3p2ZHk3b2xj&utm_source=qr';

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang].footer;
  const nav = translations[lang].nav;

  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        color: 'rgba(255,255,255,0.7)',
        paddingTop: 56,
        paddingBottom: 32,
      }}
    >
      <div className="container">
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 48,
            marginBottom: 48,
            paddingBottom: 48,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="Sky Dev"
              style={{ height: 120, objectFit: 'contain', filter: 'brightness(1.2)', marginBottom: 16 }}
            />
            <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 240, color: 'rgba(255,255,255,0.55)' }}>
              {lang === 'en'
                ? 'Building digital experiences that help businesses grow and succeed.'
                : lang === 'he'
                ? 'בונים חוויות דיגיטליות שעוזרות לעסקים לצמוח ולהצליח.'
                : 'نبني تجارب رقمية تساعد الأعمال على النمو والنجاح.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom: 20, letterSpacing: 0.5 }}>
              {lang === 'en' ? 'Quick Links' : lang === 'he' ? 'קישורים מהירים' : 'روابط سريعة'}
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: nav.home, href: '#home' },
                { label: nav.projects, href: '#projects' },
                { label: nav.process, href: '#process' },
                { label: nav.contact, href: '#contact' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 500,
                    transition: 'color 0.2s',
                    width: 'fit-content',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#60A5FA')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom: 20, letterSpacing: 0.5 }}>
              {lang === 'en' ? 'Get In Touch' : lang === 'he' ? 'צור קשר' : 'تواصل معنا'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a
                href="mailto:skydev65@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: 14,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#60A5FA')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                <EmailIcon />
                skydev65@gmail.com
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: 14,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#E1306C')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                <InstagramIcon size={16} />
                @skydev_1
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{t.rights}</p>

          {/* Instagram button */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 22px',
              borderRadius: 100,
              background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 14,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 4px 16px rgba(253,29,29,0.35)',
              letterSpacing: 0.3,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)';
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(253,29,29,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(253,29,29,0.35)';
            }}
          >
            <InstagramIcon size={18} />
            {t.followUs}
          </a>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
