import { useState, useEffect } from 'react';
import './index.css';
import { type Language, directions } from './i18n/translations';
import Header from './components/Header';
import Hero from './components/Hero';
import PhoneShowcase from './components/PhoneShowcase';
import CTASection from './components/CTASection';
import ClientLogos from './components/ClientLogos';
import FlowDiagram from './components/FlowDiagram';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

// ── Config ─────────────────────────────────────────────────────────────────
// 1. Create a free account at https://cloudinary.com
//    Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env
// 2. Create a free EmailJS account at https://www.emailjs.com
//    Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY in .env
// ───────────────────────────────────────────────────────────────────────────

const WA_LINK = `https://wa.me/972509005941?text=${encodeURIComponent('שלום, אני מעוניין/ת לשמוע עוד על השירות שלכם')}`;

export default function App() {
  const [lang, setLang] = useState<Language>('he');

  // Apply RTL/LTR to document
  useEffect(() => {
    const dir = directions[lang];
    document.documentElement.lang = lang;
    document.body.setAttribute('dir', dir);
    document.documentElement.setAttribute('dir', dir);
  }, [lang]);

  // Inject Cloudinary Upload Widget script once
  useEffect(() => {
    if (document.getElementById('cloudinary-widget-script')) return;
    const script = document.createElement('script');
    script.id = 'cloudinary-widget-script';
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Header lang={lang} onLangChange={setLang} />

      <main>
        <Hero lang={lang} />

        <PhoneShowcase lang={lang} />

        <CTASection lang={lang} />

        <ClientLogos lang={lang} />

        <FlowDiagram lang={lang} />

        <ContactForm
          lang={lang}
          emailjsServiceId="skydev65@gmail.com"
          emailjsTemplateId="template_mxxh0wy"
          emailjsPublicKey="8dz8valwn6Biptq4f"
        />
      </main>

      <Footer lang={lang} />

      {/* WhatsApp floating button */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          zIndex: 9999,
          width: 62,
          height: 62,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
          textDecoration: 'none',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,211,102,0.7)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.5)'; }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
          <path d="M16.01 2C8.27 2 2 8.27 2 16.01c0 2.47.66 4.78 1.82 6.78L2 30l7.5-1.8A13.94 13.94 0 0016.01 30C23.74 30 30 23.74 30 16.01S23.74 2 16.01 2zm0 25.3c-2.23 0-4.41-.6-6.3-1.74l-.45-.27-4.67 1.12 1.24-4.53-.3-.47A11.3 11.3 0 014.7 16.01c0-6.24 5.08-11.31 11.31-11.31S27.33 9.77 27.33 16.01 22.25 27.3 16.01 27.3zm6.2-8.47c-.34-.17-2.01-.99-2.32-1.1-.31-.11-.54-.17-.76.17-.23.34-.87 1.1-1.07 1.33-.2.22-.39.25-.73.08-.34-.17-1.43-.53-2.73-1.68-1.01-.9-1.69-2-1.89-2.34-.2-.34-.02-.52.15-.69.15-.15.34-.39.51-.59.17-.2.22-.34.34-.56.11-.23.06-.42-.03-.59-.08-.17-.76-1.83-1.04-2.51-.28-.66-.56-.57-.76-.58l-.65-.01c-.22 0-.59.08-.9.42-.31.34-1.18 1.15-1.18 2.81s1.21 3.26 1.38 3.49c.17.22 2.38 3.63 5.77 5.09.81.35 1.44.56 1.93.71.81.26 1.55.22 2.13.14.65-.1 2.01-.82 2.29-1.61.28-.79.28-1.47.2-1.61-.09-.14-.31-.22-.65-.39z"/>
        </svg>
      </a>

      <style>{`
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.5), 0 0 0 0 rgba(37,211,102,0.4); }
          50% { box-shadow: 0 4px 20px rgba(37,211,102,0.5), 0 0 0 14px rgba(37,211,102,0); }
        }
        .wa-float { animation: waPulse 2.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
