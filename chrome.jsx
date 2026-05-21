// chrome.jsx — header (commercial tech) + footer

// ─── Top utility strip ──────────────────────────────────────────────────────
const TopStrip = () => (
  <div className="vlt-strip">
    <div className="vlt-strip-inner">
      <span><Icon name="truck" size={12} stroke={1.6}/> Envío a 12 países · LATAM</span>
      <span className="vlt-strip-dot">·</span>
      <span><Icon name="shield" size={12} stroke={1.6}/> Garantía importadora 12 meses</span>
      <span className="vlt-strip-dot">·</span>
      <span className="vlt-strip-hide-sm"><Icon name="bolt" size={12} stroke={1.6}/> Cotización en 3 monedas en tiempo real</span>
      <span style={{ marginLeft: 'auto' }} className="vlt-strip-hide-sm">Hablar con un asesor: <b style={{ color:'#F4D44F' }}>+595 981 234 567</b></span>
    </div>
  </div>
);

// ─── Header ─────────────────────────────────────────────────────────────────
const Header = ({ nav, navigate, currency, setCurrency, cartCount, openCart, onSearch }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [search, setSearch] = useState('');

  const navLinks = [
    { id: 'home', label: 'Inicio' },
    { id: 'catalog', label: 'Catálogo' },
    { id: 'product', label: 'Smartphones' },
    { id: 'quote', label: 'Cotización' },
  ];

  return (
    <header className="vlt-hdr">
      <TopStrip/>
      <div className="vlt-hdr-main">
        <div className="vlt-hdr-row">
          <button className="vlt-hdr-burger" onClick={() => setMobileMenu(m => !m)} aria-label="Menu">
            <Icon name={mobileMenu ? 'close' : 'menu'} size={20} stroke={1.6}/>
          </button>

          <a href="#" onClick={(e)=>{e.preventDefault(); navigate('home');}}
             className="vlt-hdr-brand" style={{ color: '#fff' }}>
            <BrandLogo size={20}/>
          </a>

          <div className="vlt-hdr-search">
            <Icon name="search" size={16} stroke={1.7} style={{ color: 'rgba(255,255,255,.5)' }}/>
            <input
              type="text" value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { onSearch?.(search); navigate('catalog'); } }}
              placeholder="Buscar por modelo, SKU o marca…"/>
            <kbd>⌘K</kbd>
          </div>

          <div className="vlt-hdr-actions">
            <CurrencyMenu value={currency} onChange={setCurrency}/>
            <button className="vlt-hdr-icon-btn vlt-hide-sm" aria-label="Cuenta">
              <Icon name="user" size={18} stroke={1.7}/>
            </button>
            <button className="vlt-hdr-cart" onClick={openCart} aria-label="Cotización">
              <Icon name="cart" size={18} stroke={1.7}/>
              <span className="vlt-hide-md">Cotización</span>
              {cartCount > 0 && <span className="vlt-hdr-cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Mobile-only search row */}
        <div className="vlt-hdr-search-mobile">
          <Icon name="search" size={16} stroke={1.7} style={{ color: 'rgba(255,255,255,.5)' }}/>
          <input
            type="text" value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { onSearch?.(search); navigate('catalog'); } }}
            placeholder="Buscar productos…"/>
        </div>

        {/* Category bar */}
        <nav className="vlt-hdr-cats">
          <button className="vlt-cat-all" onClick={() => setCatOpen(o => !o)}>
            <Icon name="menu" size={14} stroke={2}/>
            <span>Todas las categorías</span>
            <Icon name="chev-d" size={13} stroke={2}/>
          </button>
          <div className="vlt-cat-links">
            {navLinks.map(l => (
              <a key={l.id} href="#"
                 onClick={(e)=>{e.preventDefault(); navigate(l.id);}}
                 className={'vlt-cat-link ' + (nav === l.id ? 'is-active' : '')}>
                {l.label}
              </a>
            ))}
            <span className="vlt-cat-sep"/>
            {CATEGORIES.slice(0, 5).map(c => (
              <a key={c.id} href="#" onClick={(e)=>{e.preventDefault(); navigate('catalog');}}
                 className="vlt-cat-link vlt-cat-link-muted">
                {c.label}
                <span className="vlt-cat-count">{c.count}</span>
              </a>
            ))}
            <a href="#" onClick={(e)=>{e.preventDefault(); navigate('catalog');}}
               className="vlt-cat-link vlt-cat-link-pop">
              <span className="vlt-pulse-dot"/> Outlet
            </a>
          </div>
        </nav>

        {/* Mega-menu */}
        {catOpen && (
          <div className="vlt-megamenu" onMouseLeave={()=>setCatOpen(false)}>
            <div className="vlt-megamenu-grid">
              {CATEGORIES.map(c => (
                <a key={c.id} href="#"
                   onClick={(e)=>{e.preventDefault(); setCatOpen(false); navigate('catalog');}}
                   className="vlt-megamenu-item">
                  <span className="vlt-megamenu-ico"><Icon name={c.icon} size={16} stroke={1.6}/></span>
                  <span style={{ display:'flex', flexDirection:'column', gap:1 }}>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{c.label}</span>
                    <span style={{ fontSize: 11, color:'rgba(255,255,255,.5)' }}>{c.count} productos</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Mobile drawer */}
        {mobileMenu && (
          <div className="vlt-mobile-drawer">
            {navLinks.map(l => (
              <a key={l.id} href="#" onClick={(e)=>{e.preventDefault(); setMobileMenu(false); navigate(l.id);}}
                 className={'vlt-mob-link ' + (nav === l.id ? 'is-active' : '')}>
                {l.label}<Icon name="chev-r" size={14} stroke={2}/>
              </a>
            ))}
            <div className="vlt-mob-sep">Categorías</div>
            {CATEGORIES.map(c => (
              <a key={c.id} href="#" onClick={(e)=>{e.preventDefault(); setMobileMenu(false); navigate('catalog');}}
                 className="vlt-mob-link">
                <span style={{ display:'inline-flex', alignItems:'center', gap:10 }}>
                  <Icon name={c.icon} size={15} stroke={1.6}/> {c.label}
                </span>
                <span style={{ fontSize: 11, color:'rgba(255,255,255,.5)' }}>{c.count}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

// ─── Footer ────────────────────────────────────────────────────────────────
const Footer = () => {
  const linkCols = [
    { title: 'Comprar', links: ['Smartphones', 'Notebooks', 'Audio Pro', 'Gaming', 'Outlet', 'Lanzamientos'] },
    { title: 'Cuenta', links: ['Mi cotización', 'Historial', 'Asesor asignado', 'Crédito comercial'] },
    { title: 'Empresa', links: ['Sobre Trending Store', 'Sucursales', 'Trabajá con nosotros', 'Prensa'] },
  ];
  return (
    <footer className="vlt-ftr">
      {/* Logistics row */}
      <div className="vlt-ftr-logis">
        {[
          { ico:'truck',  t:'Aduana y logística', s:'Importación directa CDE → ASU → SP' },
          { ico:'shield', t:'Garantía oficial',   s:'12 meses con cobertura regional' },
          { ico:'globe',  t:'3 monedas en vivo',  s:'USD · BRL · ₲  actualizado cada 4h' },
          { ico:'whatsapp',t:'Asesor humano',     s:'WhatsApp directo · L-V 8 a 18h' },
        ].map((b,i) => (
          <div key={i} className="vlt-ftr-logis-card">
            <span className="vlt-ftr-logis-ico"><Icon name={b.ico} size={20} stroke={1.5}/></span>
            <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{b.t}</span>
              <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,.55)' }}>{b.s}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Brand grid */}
      <div className="vlt-ftr-brands">
        <div className="vlt-ftr-brands-hd">
          <span className="vlt-eyebrow" style={{ color: '#F4D44F' }}>Marcas oficiales</span>
          <span style={{ fontSize: 11.5, color:'rgba(255,255,255,.5)' }}>Importador autorizado · 86 marcas</span>
        </div>
        <div className="vlt-ftr-brands-grid">
          {BRANDS.map(b => (
            <div key={b} className="vlt-brand-tile">{b}</div>
          ))}
        </div>
      </div>

      {/* Stores map */}
      <div className="vlt-ftr-stores">
        <div>
          <span className="vlt-eyebrow" style={{ color: '#F4D44F' }}>Tiendas físicas</span>
          <div style={{ fontSize: 20, fontWeight: 700, color:'#fff', marginTop: 4, letterSpacing:'-.01em' }}>
            6 sucursales en LATAM
          </div>
          <div style={{ fontSize: 12.5, color:'rgba(255,255,255,.6)', marginTop:6, lineHeight:1.55, maxWidth: 360 }}>
            Showroom & retiro inmediato en Ciudad del Este, Asunción, Foz, São Paulo, Buenos Aires y Santiago.
          </div>
        </div>
        <div className="vlt-ftr-map">
          {[
            ['Ciudad del Este', 'Av. Monseñor Rodríguez 1280'],
            ['Asunción', 'Shopping del Sol · L-204'],
            ['Foz do Iguaçu', 'Av. Brasil 2210'],
            ['São Paulo', 'R. Santa Ifigênia 487'],
            ['Buenos Aires', 'Av. Corrientes 1845'],
            ['Santiago', 'Mall Plaza Vespucio'],
          ].map(([c, addr]) => (
            <div key={c} className="vlt-ftr-store">
              <Icon name="pin" size={13} stroke={1.7} style={{ color: '#F4D44F', flexShrink: 0, marginTop: 2 }}/>
              <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{c}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,.5)' }}>{addr}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="vlt-ftr-links">
        <div className="vlt-ftr-brand-col">
          <BrandLogo size={22}/>
          <p style={{ fontSize: 12, color:'rgba(255,255,255,.55)', lineHeight: 1.6, marginTop: 12, maxWidth: 280 }}>
            Mayorista oficial de electrónica y hardware para LATAM. Cotización
            instantánea en USD, Real y Guaraní.
          </p>
        </div>
        {linkCols.map((col, i) => (
          <div key={i} className="vlt-ftr-link-col">
            <div className="vlt-ftr-link-hd">{col.title}</div>
            {col.links.map(l => <a key={l} href="#" onClick={e=>e.preventDefault()}>{l}</a>)}
          </div>
        ))}
      </div>

      <div className="vlt-ftr-base">
        <span>© 2026 Trending Store Importadora S.A. — RUC 800-XXX-1</span>
        <span style={{ marginLeft: 'auto', display:'inline-flex', gap: 16 }}>
          <a href="#" onClick={e=>e.preventDefault()}>Términos</a>
          <a href="#" onClick={e=>e.preventDefault()}>Privacidad</a>
          <a href="#" onClick={e=>e.preventDefault()}>Política aduanera</a>
        </span>
      </div>
    </footer>
  );
};

Object.assign(window, { Header, Footer });
