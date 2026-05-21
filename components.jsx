// components.jsx — shared UI primitives for Trending Store

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ─── Icons: minimal 1.5px line set ──────────────────────────────────────────
const Icon = ({ name, size = 18, stroke = 1.5, className = '', style }) => {
  const common = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    className, style,
  };
  switch (name) {
    case 'search':   return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'cart':     return <svg {...common}><path d="M3 4h2l2.5 12h11l2-8H6"/><circle cx="9" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/></svg>;
    case 'user':     return <svg {...common}><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/></svg>;
    case 'menu':     return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'close':    return <svg {...common}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'chev-d':   return <svg {...common}><path d="m6 9 6 6 6-6"/></svg>;
    case 'chev-r':   return <svg {...common}><path d="m9 6 6 6-6 6"/></svg>;
    case 'chev-l':   return <svg {...common}><path d="m15 6-6 6 6 6"/></svg>;
    case 'check':    return <svg {...common}><path d="m5 12 5 5L20 7"/></svg>;
    case 'plus':     return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case 'minus':    return <svg {...common}><path d="M5 12h14"/></svg>;
    case 'phone':    return <svg {...common}><rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/></svg>;
    case 'laptop':   return <svg {...common}><rect x="4" y="5" width="16" height="11" rx="1"/><path d="M2 19h20"/></svg>;
    case 'gamepad':  return <svg {...common}><path d="M6 9h12a4 4 0 0 1 0 8c-1.5 0-2.5-1-3.5-2h-5C8.5 16 7.5 17 6 17a4 4 0 0 1 0-8z"/><path d="M9 12v2M8 13h2M15 13h.01M17 13h.01"/></svg>;
    case 'headphones':return <svg {...common}><path d="M4 13a8 8 0 0 1 16 0"/><rect x="3" y="13" width="4" height="7" rx="1"/><rect x="17" y="13" width="4" height="7" rx="1"/></svg>;
    case 'watch':    return <svg {...common}><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 7V4h6v3M9 17v3h6v-3"/></svg>;
    case 'plug':     return <svg {...common}><path d="M9 4v5M15 4v5M7 9h10v3a5 5 0 0 1-10 0z"/><path d="M12 17v3"/></svg>;
    case 'router':   return <svg {...common}><rect x="3" y="13" width="18" height="6" rx="1"/><path d="M7 16h.01M11 16h.01M12 13V8m-3 0a3 3 0 1 1 6 0M9 5a6 6 0 0 1 6 0"/></svg>;
    case 'tag':      return <svg {...common}><path d="M3 12V4h8l10 10-8 8z"/><circle cx="8" cy="8" r="1.2"/></svg>;
    case 'truck':    return <svg {...common}><path d="M2 6h11v10H2zM13 9h5l3 3v4h-8"/><circle cx="6" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></svg>;
    case 'pin':      return <svg {...common}><path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'whatsapp': return <svg {...common}><path d="M4 20l1.5-4.5A8 8 0 1 1 9 19z"/><path d="M9 10c.5 2 1.5 3.5 4 4l1.5-1.5 2 1-.5 2c-3 0-7-3-7-7l2-.5 1 2z"/></svg>;
    case 'shield':   return <svg {...common}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>;
    case 'globe':    return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>;
    case 'box':      return <svg {...common}><path d="m3 7 9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7M12 11v10"/></svg>;
    case 'star':     return <svg {...common}><path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6L12 16.8 6.6 19.6l1-6L3.3 9.4l6-.9z"/></svg>;
    case 'sliders':  return <svg {...common}><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>;
    case 'spark':    return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>;
    case 'bolt':     return <svg {...common}><path d="M13 3 5 14h6l-1 7 8-11h-6z"/></svg>;
    default: return null;
  }
};

// ─── Brand mark: Trending Store ────────────────────────────────────────────
// Mark = stepped trending-up arrow in accent yellow; wordmark in current color.
const BrandLogo = ({ size = 22 }) => {
  const h = size;
  const w = size * 7.4;
  return (
    <svg width={w} height={h} viewBox="0 0 163 22" fill="none" aria-label="Trending Store">
      {/* trending-up mark */}
      <path d="M3 16 L8 11 L11 13.5 L17 6.5"
            stroke="#F4D44F" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.5 6.5 L17 6.5 L17 10"
            stroke="#F4D44F" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"/>
      {/* divider */}
      <line x1="23" y1="4" x2="23" y2="18"
            stroke="currentColor" strokeOpacity=".22" strokeWidth="1"/>
      {/* wordmark */}
      <text x="28" y="11.5" fontFamily="Inter, sans-serif" fontWeight="700"
            fontSize="9" letterSpacing="1.6" fill="currentColor">TRENDING</text>
      <text x="28" y="20" fontFamily="Inter, sans-serif" fontWeight="500"
            fontSize="8.2" letterSpacing="3.2" fill="#F4D44F" opacity=".95">STORE</text>
    </svg>
  );
};

// ─── Striped product placeholder ───────────────────────────────────────────
const ProductPlaceholder = ({ label = 'product shot', tone = '#1d2238', aspect = '1/1' }) => (
  <div style={{
    aspectRatio: aspect, width: '100%', position: 'relative', overflow: 'hidden',
    background: tone, borderRadius: 6,
    backgroundImage:
      `repeating-linear-gradient(135deg, rgba(255,255,255,.04) 0 1px, transparent 1px 9px)`,
  }}>
    <div style={{
      position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
      color: 'rgba(244,212,79,.55)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase',
    }}>{label}</div>
  </div>
);

// ─── Badge ─────────────────────────────────────────────────────────────────
const Badge = ({ kind = 'new', children }) => {
  const styles = {
    new:    { bg: '#F4D44F', fg: '#0B1F4A', label: 'NEW' },
    hot:    { bg: '#0B1F4A', fg: '#F4D44F', label: 'HOT', border: '#F4D44F' },
    outlet: { bg: 'transparent', fg: '#F4D44F', label: 'OUTLET', border: '#F4D44F' },
    caja:   { bg: 'transparent', fg: '#fff', label: 'CAJA DAÑADA', border: 'rgba(255,255,255,.35)' },
    top:    { bg: '#F4D44F', fg: '#0B1F4A', label: 'TOP' },
    discount:{ bg: '#0B1F4A', fg: '#F4D44F', label: '-19%' },
  };
  const s = styles[kind] || styles.new;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 7px', fontSize: 9.5, fontWeight: 700, letterSpacing: '.08em',
      background: s.bg, color: s.fg, borderRadius: 4,
      border: s.border ? `1px solid ${s.border}` : '1px solid transparent',
      lineHeight: 1, fontFamily: 'Inter, sans-serif',
    }}>{children ?? s.label}</span>
  );
};

const badgeKindFor = (b) => {
  if (!b) return null;
  const m = { NEW:'new', HOT:'hot', OUTLET:'outlet', CAJA:'caja', TOP:'top' };
  if (m[b]) return m[b];
  if (b.startsWith('-')) return 'discount';
  return 'new';
};

// ─── Currency selector (dropdown) ──────────────────────────────────────────
const CurrencyMenu = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const m = CURRENCY_META[value];
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} className="vlt-ccy-btn">
        <span style={{ fontSize: 13 }}>{m.flag}</span>
        <span style={{ fontWeight: 600, fontSize: 12, letterSpacing: '.04em' }}>{value}</span>
        <Icon name="chev-d" size={13} stroke={2}/>
      </button>
      {open && (
        <div className="vlt-ccy-menu">
          {Object.keys(CURRENCY_META).map(c => {
            const cm = CURRENCY_META[c];
            return (
              <button key={c} onClick={() => { onChange(c); setOpen(false); }}
                      className={'vlt-ccy-item ' + (c === value ? 'is-active' : '')}>
                <span style={{ fontSize: 14 }}>{cm.flag}</span>
                <span style={{ fontWeight: 600, fontSize: 12 }}>{c}</span>
                <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,.5)', marginLeft: 'auto' }}>
                  {c === 'USD' ? 'Dólar' : c === 'BRL' ? 'Real' : 'Guaraní'}
                </span>
                {c === value && <Icon name="check" size={13} stroke={2.2}/>}
              </button>
            );
          })}
          <div className="vlt-ccy-foot">
            <Icon name="globe" size={11} stroke={1.6}/>
            <span>Cotización del día · 21 May</span>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Dual price block ──────────────────────────────────────────────────────
const PriceBlock = ({ usd, was, currency, second = 'BRL', size = 'md' }) => {
  const big = size === 'lg' ? 28 : size === 'md' ? 18 : 15;
  const small = size === 'lg' ? 14 : size === 'md' ? 11.5 : 10.5;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: big, fontWeight: 700, letterSpacing: '-.01em', color: '#0B1F4A', fontVariantNumeric: 'tabular-nums' }}>
          {fmtPrice(usd, currency)}
        </span>
        {was && (
          <span style={{ fontSize: small, color: '#94a0b8', textDecoration: 'line-through', fontVariantNumeric: 'tabular-nums' }}>
            {fmtPrice(was, currency)}
          </span>
        )}
      </div>
      <div style={{ fontSize: small, color: '#6b7693', fontVariantNumeric: 'tabular-nums' }}>
        ≈ {fmtPrice(usd, second)}
      </div>
    </div>
  );
};

Object.assign(window, {
  Icon, BrandLogo, ProductPlaceholder, Badge, badgeKindFor,
  CurrencyMenu, PriceBlock,
});
