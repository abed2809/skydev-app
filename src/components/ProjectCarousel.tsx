import { useState, useRef, useCallback } from 'react';
import { type Language, translations } from '../i18n/translations';
import { type Project } from '../types';

interface ProjectCarouselProps {
  lang: Language;
  cloudName: string;
  uploadPreset: string;
}

const DEMO_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Slotify',
    image: '',
    type: 'app',
    description: 'Smart booking app for salons & barbershops',
  },
  {
    id: '2',
    title: 'HAAT Delivery',
    image: '',
    type: 'app',
    description: 'Multi-restaurant delivery platform',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const colors = [
    ['#1E40AF', '#3B82F6'],
    ['#0F172A', '#1E3A8A'],
    ['#1E3A8A', '#2563EB'],
    ['#312E81', '#4F46E5'],
  ];
  const [c1, c2] = colors[index % colors.length];

  return (
    <div
      style={{
        minWidth: 300,
        height: 400,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        boxShadow: '0 8px 32px rgba(37,99,235,0.18)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 24px 56px rgba(37,99,235,0.32)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,99,235,0.18)';
      }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
            }}
          >
            {project.type === 'app' ? '📱' : '🌐'}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500 }}>
            {project.title}
          </span>
        </div>
      )}

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 24,
        }}
      >
        <span
          style={{
            background: 'rgba(37,99,235,0.85)',
            color: 'white',
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: 100,
            width: 'fit-content',
            letterSpacing: 1,
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          {project.type}
        </span>
        <h3 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: 0 }}>
          {project.title}
        </h3>
        {project.description && (
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: '4px 0 0' }}>
            {project.description}
          </p>
        )}
      </div>
    </div>
  );
}

function UploadCard({
  onClick,
  label,
  hint,
}: {
  onClick: () => void;
  label: string;
  hint: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: 300,
        height: 400,
        borderRadius: 20,
        border: `2px dashed ${hovered ? 'var(--primary)' : 'rgba(37,99,235,0.3)'}`,
        background: hovered ? 'rgba(37,99,235,0.06)' : 'rgba(37,99,235,0.02)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: hovered ? 'var(--primary)' : 'var(--primary-pale)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={hovered ? 'white' : 'var(--primary)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <div style={{ textAlign: 'center', padding: '0 24px' }}>
        <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
          {label}
        </p>
        <p style={{ color: 'var(--gray)', fontSize: 13 }}>{hint}</p>
      </div>
    </div>
  );
}

export default function ProjectCarousel({ lang, cloudName, uploadPreset }: ProjectCarouselProps) {
  const t = translations[lang].projects;
  const [projects, setProjects] = useState<Project[]>(DEMO_PROJECTS);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const openCloudinary = useCallback(() => {
    if (!(window as unknown as Record<string, unknown>).cloudinary) {
      alert('Cloudinary not loaded. Check your VITE_CLOUDINARY_CLOUD_NAME in .env');
      return;
    }
    const widget = (window as unknown as { cloudinary: { createUploadWidget: (opts: object, cb: (err: unknown, result: { event: string; info: { secure_url: string; resource_type: string } }) => void) => { open: () => void } } }).cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ['local', 'url', 'camera'],
        multiple: true,
        resourceType: 'auto',
        maxFileSize: 50000000,
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov'],
      },
      (error: unknown, result: { event: string; info: { secure_url: string; resource_type: string } }) => {
        if (!error && result.event === 'success') {
          const newProject: Project = {
            id: Date.now().toString(),
            title: `Project ${projects.length + 1}`,
            image: result.info.secure_url,
            type: result.info.resource_type === 'video' ? 'website' : 'app',
          };
          setProjects((prev) => [...prev, newProject]);
        }
      }
    );
    widget.open();
  }, [cloudName, uploadPreset, projects.length]);

  // Drag to scroll
  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };
  const stopDrag = () => { isDragging.current = false; };

  return (
    <section id="projects" className="section" style={{ background: 'white' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span>✦</span> {t.title}
          </div>
          <h2 className="section-title" style={{ marginTop: 16 }}>
            {t.subtitle}
          </h2>
        </div>
      </div>

      {/* Carousel track */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        style={{
          display: 'flex',
          gap: 24,
          overflowX: 'auto',
          padding: '8px 40px 32px',
          cursor: isDragging.current ? 'grabbing' : 'grab',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          userSelect: 'none',
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
        <UploadCard onClick={openCloudinary} label={t.uploadBtn} hint={t.uploadHint} />
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 8 }}>
        {projects.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === 0 ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === 0 ? 'var(--primary)' : 'var(--light-gray)',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
