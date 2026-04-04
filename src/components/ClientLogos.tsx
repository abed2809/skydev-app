import { type Language, translations } from '../i18n/translations';
import logoGentlemen from '../assets/Logo_GentelMen.jpg';
import logoQSystems from '../assets/Logo_QSystems.jpg';
import logoReem from '../assets/Logo_Reem.jpg';
import logoSaj from '../assets/Logo_SajElSham.jpg';

interface ClientLogosProps {
  lang: Language;
}

interface LogoItem {
  name: string;
  initials: string;
  bg: string;
  fg: string;
  image?: string;
}

const LOGOS: LogoItem[] = [
  { name: 'Gentlemen',  initials: 'GM', bg: '#fff', fg: '#000', image: logoGentlemen },
  { name: 'QSystems',   initials: 'QS', bg: '#fff', fg: '#000', image: logoQSystems },
  { name: 'Details by Reem', initials: 'DR', bg: '#fff', fg: '#000', image: logoReem },
  { name: 'Saj Alshaam', initials: 'SA', bg: '#fff', fg: '#000', image: logoSaj },
];

const CARD_SIZE = 140;
const GAP = 24;

// סט אחד = 3 חזרות של הלוגואים = 24 כרטיסים ≈ 3936px >> כל מסך
// ALL_LOGOS = 2 סטים → האנימציה תזיז -50% (סט אחד), הנוף זהה → לולאה חלקה
const SET = [...LOGOS, ...LOGOS, ...LOGOS];
const ALL_LOGOS = [...SET, ...SET];

function LogoCard({ logo }: { logo: LogoItem }) {
  return (
    <div
      style={{
        width: CARD_SIZE,
        height: CARD_SIZE,
        borderRadius: 28,
        background: 'white',
        boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {logo.image ? (
        <img
          src={logo.image}
          alt={logo.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: logo.bg,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <span style={{ color: logo.fg, fontWeight: 900, fontSize: 32, letterSpacing: 1 }}>
            {logo.initials}
          </span>
          <span style={{ color: logo.fg, fontWeight: 600, fontSize: 11, opacity: 0.8 }}>
            {logo.name}
          </span>
        </div>
      )}
    </div>
  );
}

export default function ClientLogos({ lang }: ClientLogosProps) {
  const t = translations[lang].clients;

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0d1b2a 0%, #1a2d4a 50%, #0f2035 100%)',
        padding: '80px 0',
        overflow: 'hidden',
      }}
    >
      {/* כותרת */}
      <div className="container" style={{ marginBottom: 48, textAlign: 'center' }}>
        <div
          className="section-badge"
          style={{
            background: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <span>★</span> {t.title}
        </div>
      </div>

      {/* direction: ltr חובה — בלעדיו RTL הופך את הflex ומשאיר חלל מימין */}
      <div
        style={{
          overflow: 'hidden',
          direction: 'ltr',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: GAP,
            padding: '12px 0',
            width: 'max-content',
            animation: 'clientScroll 100s linear infinite',
          }}
        >
          {ALL_LOGOS.map((logo, i) => (
            <LogoCard key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes clientScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
