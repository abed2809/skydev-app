import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { type Language, translations } from '../i18n/translations';

interface ContactFormProps {
  lang: Language;
  emailjsServiceId: string;
  emailjsTemplateId: string;
  emailjsPublicKey: string;
}

interface FormState {
  name: string;
  phone: string;
  message: string;
}

interface Errors {
  name?: string;
  phone?: string;
  general?: string;
}

// Israeli phone: mobile 05X-XXXXXXX or landline 0X-XXXXXXX (total 10 digits)
function isValidPhone(p: string): boolean {
  return /^0(5[0-9]|[234679]\d)\d{7}$/.test(p.replace(/[-\s]/g, ''));
}

function isValidName(n: string): boolean {
  return n.trim().length >= 2;
}

export default function ContactForm({
  lang,
  emailjsServiceId,
  emailjsTemplateId,
  emailjsPublicKey,
}: ContactFormProps) {
  const t = translations[lang].contact;
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const e: Errors = {};
    if (!isValidName(form.name)) e.name = t.errors.name;
    if (!isValidPhone(form.phone)) e.phone = t.errors.phone;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      await emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        {
          from_name: form.name,
          phone: form.phone,
          message: form.message || '(No message)',
          to_email: 'skydev65@gmail.com',
        },
        emailjsPublicKey
      );
      setStatus('success');
      setForm({ name: '', phone: '', message: '' });
    } catch {
      setStatus('error');
      setErrors({ general: t.errors.sending });
    }
  };

  return (
    <section id="contact" className="section" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {/* Header */}
          <div className="section-header">
            <div className="section-badge">
              <span>✉</span> {lang === 'en' ? 'Contact' : lang === 'he' ? 'צור קשר' : 'تواصل'}
            </div>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              {t.title}
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: 17, marginTop: 12 }}>{t.subtitle}</p>
          </div>

          {/* Card */}
          <div
            className="glass-card"
            style={{ padding: '48px 40px' }}
          >
            {status === 'success' ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '32px 0',
                  animation: 'fadeUp 0.5s ease',
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 8px 32px rgba(37,99,235,0.35)',
                  }}
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--dark)', marginBottom: 12 }}>
                  {lang === 'en' ? 'Message Sent!' : lang === 'he' ? 'ההודעה נשלחה!' : 'تم الإرسال!'}
                </h3>
                <p style={{ color: 'var(--gray)', fontSize: 16 }}>{t.success}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-outline"
                  style={{ marginTop: 28 }}
                >
                  {lang === 'en' ? 'Send another' : lang === 'he' ? 'שלח עוד' : 'إرسال آخر'}
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {/* Name */}
                  <Field
                    label={t.name}
                    error={errors.name}
                    required
                  >
                    <input
                      type="text"
                      placeholder={t.namePlaceholder}
                      value={form.name}
                      onChange={handleChange('name')}
                      style={inputStyle(!!errors.name)}
                    />
                  </Field>

                  {/* Phone */}
                  <Field
                    label={t.phone}
                    error={errors.phone}
                    required
                  >
                    <input
                      type="tel"
                      placeholder={t.phonePlaceholder}
                      value={form.phone}
                      onChange={handleChange('phone')}
                      style={inputStyle(!!errors.phone)}
                      dir="ltr"
                    />
                  </Field>

                  {/* Message */}
                  <Field label={t.message}>
                    <textarea
                      placeholder={t.messagePlaceholder}
                      value={form.message}
                      onChange={handleChange('message')}
                      rows={4}
                      style={{
                        ...inputStyle(false),
                        resize: 'vertical',
                        minHeight: 100,
                        fontFamily: 'inherit',
                      }}
                    />
                  </Field>

                  {/* General error */}
                  {errors.general && (
                    <p style={{ color: '#DC2626', fontSize: 14, textAlign: 'center' }}>
                      {errors.general}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      fontSize: 17,
                      padding: '18px 0',
                      opacity: status === 'sending' ? 0.7 : 1,
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {status === 'sending' ? (
                      <>
                        <Spinner />
                        {t.sending}
                      </>
                    ) : (
                      <>
                        {t.submit}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Email hint */}
                  <p style={{ textAlign: 'center', color: 'var(--gray)', fontSize: 13 }}>
                    {lang === 'en' ? 'Or email us directly at' : lang === 'he' ? 'או שלח מייל ישירות ל' : 'أو راسلنا على'}{' '}
                    <a
                      href="mailto:skydev65@gmail.com"
                      style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}
                    >
                      skydev65@gmail.com
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: 'var(--dark2)',
          display: 'flex',
          gap: 4,
        }}
      >
        {label}
        {required && <span style={{ color: '#2563EB' }}>*</span>}
      </label>
      {children}
      {error && (
        <p style={{ color: '#DC2626', fontSize: 13, margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 12,
    border: `2px solid ${hasError ? '#DC2626' : 'rgba(37,99,235,0.15)'}`,
    background: hasError ? '#FEF2F2' : '#F8FAFF',
    color: 'var(--dark)',
    fontSize: 15,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };
}

function Spinner() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ animation: 'spin-slow 0.8s linear infinite' }}
    >
      <path d="M21 12a9 9 0 11-6.219-8.56" />
    </svg>
  );
}
