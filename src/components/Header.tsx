import { useState, useEffect } from 'react';
import { type Language, langLabels, translations } from '../i18n/translations';
import logo from '../assets/logo.png';

interface HeaderProps {
  lang: Language;
  onLangChange: (l: Language) => void;
}

const LANGS: Language[] = ['en', 'he', 'ar'];

export default function Header({ lang, onLangChange }: HeaderProps) {
  const t = translations[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const isRTL = lang === 'he' || lang === 'ar';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: t.home, href: '#home' },
    { label: t.projects, href: '#projects' },
    { label: t.process, href: '#process' },
    { label: t.contact, href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background 0.4s ease, box-shadow 0.4s ease',
        background: scrolled ? 'rgba(240, 246, 255, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(37,99,235,0.1)' : 'none',
        boxShadow: scrolled ? '0 4px 24px rgba(37,99,235,0.08)' : 'none',
      }}
    >
      {/* Use relative container with absolute-pinned logo & lang toggle
          so both are ALWAYS exactly 20px from their viewport edge,
          regardless of RTL / LTR direction */}
      <div
        style={{
          position: 'relative',
          maxWidth: 1200,
          margin: '0 auto',
          height: 72,
        }}
      >
        {/* Logo — pinned exactly 20px from start edge (right in RTL, left in LTR) */}
        <a
          href="#home"
          style={{
            position: 'absolute',
            top: '50%',
            left: isRTL ? undefined : 0,
            right: isRTL ? 0 : undefined,
            transform: 'translateY(-50%)',
            display: 'block',
            textDecoration: 'none',
          }}
        >
          <img src={logo} alt="Sky Dev" style={{ height: 150, width: 'auto', display: 'block' }} />
        </a>

        {/* Desktop nav — centred */}
        <nav
          className="hide-mobile"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 36,
            whiteSpace: 'nowrap',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: 'var(--dark2)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: 15,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dark2)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Language toggle — pinned exactly 20px from end edge (left in RTL, right in LTR) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: isRTL ? 0 : undefined,
            right: isRTL ? undefined : 0,
            transform: 'translateY(-50%)',
            display: 'flex',
            background: 'rgba(37,99,235,0.07)',
            borderRadius: 100,
            padding: 4,
            gap: 2,
            border: '1px solid rgba(37,99,235,0.15)',
          }}
        >
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => onLangChange(l)}
              style={{
                width: 40,
                height: 32,
                borderRadius: 100,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 0.5,
                transition: 'background 0.25s ease, color 0.25s ease',
                background: lang === l ? 'var(--primary)' : 'transparent',
                color: lang === l ? '#fff' : 'var(--gray)',
              }}
            >
              {langLabels[l]}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
