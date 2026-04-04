/**
 * FlowDiagram — Animated sequential timeline.
 * Steps reveal one-by-one: dot lights up → text fades in → line draws down → next dot.
 * After all 6 shown it resets and loops forever.
 */
import { useState, useEffect, useRef } from 'react';
import { type Language, translations } from '../i18n/translations';

interface FlowDiagramProps { lang: Language; }

// Timing (ms)
const DOT_DELAY  = 0;    // dot appears immediately when step triggers
const TEXT_DELAY = 300;  // text fades in 300ms after dot
const LINE_START = 700;  // line starts drawing 700ms after dot
const LINE_DUR   = 600;  // line takes 600ms to draw fully
const NEXT_STEP  = 1500; // next step triggers 1500ms after current

export default function FlowDiagram({ lang }: FlowDiagramProps) {
  const t = translations[lang].flow;
  const isRTL = lang === 'he' || lang === 'ar';

  // revealedDots[i] = true when dot i should show
  const [dots, setDots]   = useState<boolean[]>(Array(6).fill(false));
  // revealedText[i] = true when text i should show
  const [texts, setTexts] = useState<boolean[]>(Array(6).fill(false));
  // drawnLines[i] = true when line i→i+1 should be fully drawn
  const [lines, setLines] = useState<boolean[]>(Array(5).fill(false));

  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Entrance trigger
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Sequential animation loop
  useEffect(() => {
    if (!visible) return;

    function clearAll() {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    }

    function reset() {
      setDots(Array(6).fill(false));
      setTexts(Array(6).fill(false));
      setLines(Array(5).fill(false));
    }

    function schedule(fn: () => void, ms: number) {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
    }

    function run() {
      clearAll();
      reset();

      for (let i = 0; i < 6; i++) {
        const base = i * NEXT_STEP;

        // 1. Dot lights up
        schedule(() => {
          setDots(prev => { const n = [...prev]; n[i] = true; return n; });
        }, base + DOT_DELAY);

        // 2. Text fades in
        schedule(() => {
          setTexts(prev => { const n = [...prev]; n[i] = true; return n; });
        }, base + TEXT_DELAY);

        // 3. Line draws to next dot (except last step)
        if (i < 5) {
          schedule(() => {
            setLines(prev => { const n = [...prev]; n[i] = true; return n; });
          }, base + LINE_START);
        }
      }

      // No loop — runs once only
    }

    run();
    return () => clearAll();
  }, [visible]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section"
      style={{ background: '#F5F7FB' }}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <span>⚡</span>{' '}
            {lang === 'en' ? 'Our Process' : lang === 'he' ? 'תהליך העבודה' : 'طريقة عملنا'}
          </div>
          <h2 className="section-title" style={{ marginTop: 16 }}>
            {t.title.includes('Sky Dev') ? (
              <>{t.title.replace('Sky Dev', '')} <span>Sky Dev</span></>
            ) : (
              <span>{t.title}</span>
            )}
          </h2>
        </div>

        {/* Timeline */}
        <div
          style={{
            maxWidth: 640,
            margin: '0 auto',
            direction: 'ltr', // keep layout consistent regardless of page dir
          }}
        >
          {t.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 0 }}>

              {/* ── Left column: dot + line ── */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: 0,
                width: 48,
              }}>
                {/* Dot */}
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: dots[i]
                    ? 'linear-gradient(135deg, #1E40AF, #3B82F6)'
                    : 'rgba(37,99,235,0.12)',
                  boxShadow: dots[i]
                    ? '0 0 0 5px rgba(37,99,235,0.15), 0 0 20px rgba(37,99,235,0.45)'
                    : 'none',
                  transform: dots[i] ? 'scale(1)' : 'scale(0.3)',
                  transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), background 0.3s, box-shadow 0.4s',
                  marginTop: 4,
                  position: 'relative',
                  zIndex: 2,
                }}>
                  {/* Inner white dot */}
                  {dots[i] && (
                    <div style={{
                      position: 'absolute',
                      inset: 5,
                      borderRadius: '50%',
                      background: 'white',
                      opacity: 0.9,
                    }} />
                  )}
                </div>

                {/* Line to next step */}
                {i < 5 && (
                  <div style={{
                    width: 3,
                    borderRadius: 2,
                    background: 'linear-gradient(180deg, #2563EB 0%, rgba(59,130,246,0.25) 100%)',
                    height: lines[i] ? 72 : 0,
                    transition: `height ${LINE_DUR}ms cubic-bezier(0.4,0,0.2,1)`,
                    marginTop: 4,
                    marginBottom: 4,
                  }} />
                )}
              </div>

              {/* ── Right column: step content ── */}
              <div
                style={{
                  paddingBottom: i < 5 ? 16 : 0,
                  paddingTop: 0,
                  paddingLeft: 20,
                  paddingRight: 8,
                  flex: 1,
                  direction: isRTL ? 'rtl' : 'ltr',
                  opacity:   texts[i] ? 1 : 0,
                  transform: texts[i]
                    ? 'translateX(0)'
                    : isRTL ? 'translateX(16px)' : 'translateX(-16px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  minHeight: i < 5 ? 80 : 0,
                }}
              >
                {/* Step number + icon */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 4,
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                }}>
                  <span style={{
                    fontSize: 20,
                    lineHeight: 1,
                  }}>{step.icon}</span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#2563EB',
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: '#0F172A',
                  margin: '0 0 5px',
                  lineHeight: 1.3,
                }}>
                  {step.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: 14,
                  color: '#64748B',
                  margin: 0,
                  lineHeight: 1.65,
                }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
