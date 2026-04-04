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

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? 'demo';
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? 'ml_default';
const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

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

        <PhoneShowcase
          lang={lang}
          cloudName={CLOUD_NAME}
          uploadPreset={UPLOAD_PRESET}
        />

        <CTASection lang={lang} />

        <ClientLogos lang={lang} />

        <FlowDiagram lang={lang} />

        <ContactForm
          lang={lang}
          emailjsServiceId={EMAILJS_SERVICE}
          emailjsTemplateId={EMAILJS_TEMPLATE}
          emailjsPublicKey={EMAILJS_PUBLIC_KEY}
        />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
