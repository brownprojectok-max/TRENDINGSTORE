// screens.jsx — Home, Catalog, Product Detail, Quote

// ════════════════════════════════════════════════════════════════════════════
// SCREEN 1 · HOME
// ════════════════════════════════════════════════════════════════════════════
const HomeScreen = ({ currency, secondary, addToCart, cartIds, openProduct, navigate }) => (
  <div className="vlt-screen" data-screen-label="01 Home">
    {/* Hero */}
    <section className="vlt-hero">
      <div className="vlt-hero-inner">
        <div className="vlt-hero-copy">
          <span className="vlt-eyebrow vlt-eyebrow-y">
            <span className="vlt-pulse-dot"/> LANZAMIENTO · SEMANA 21
          </span>
          <h1 className="vlt-hero-title">
            La nueva línea<br/>
            <span className="vlt-hero-accent">iPhone&nbsp;15&nbsp;Pro</span><br/>
            ya disponible al mayorista.
          </h1>
          <p className="vlt-hero-sub">
            Importación directa desde Miami. Cotización dual USD&nbsp;/&nbsp;BRL
            con liberación aduanera en 48&nbsp;horas.
          </p>
          <div className="vlt-hero-cta">
            <button className="vlt-btn-primary" onClick={() => navigate('catalog')}>
              Ver catálogo <Icon name="chev-r" size={15} stroke={2.2}/>
            </button>
            <button className="vlt-btn-ghost" onClick={() => openProduct(PRODUCTS[0])}>
              Ficha técnica
            </button>
          </div>
          <div className="vlt-hero-meta">
            {[
              ['1.284', 'modelos disponibles'],
              ['48 h', 'liberación aduanera'],
              ['3', 'monedas en tiempo real'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="vlt-hero-meta-n">{n}</div>
                <div className="vlt-hero-meta-l">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="vlt-hero-art">
          <div className="vlt-hero-art-frame">
            <ProductPlaceholder label="iPhone 15 Pro · Titanium" tone="#0F2A5C" aspect="4/5"/>
            <div className="vlt-hero-art-tag">
              <Badge kind="new"/>
              <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
                <span style={{ fontSize: 10.5, color:'#fff', opacity:.55, letterSpacing:'.08em' }}>DESDE</span>
                <span style={{ fontSize: 22, fontWeight: 700, color:'#fff', fontVariantNumeric:'tabular-nums', letterSpacing:'-.01em' }}>
                  {fmtPrice(1149, currency)}
                </span>
                <span style={{ fontSize: 11, color:'#F4D44F', fontVariantNumeric:'tabular-nums' }}>
                  ≈ {fmtPrice(1149, secondary)}
                </span>
              </div>
            </div>
            <div className="vlt-hero-art-pill">
              <span className="vlt-pulse-dot vlt-pulse-y"/> 42&nbsp;en&nbsp;stock&nbsp;CDE
            </div>
          </div>
        </div>
      </div>
      <div className="vlt-hero-ticker">
        <div className="vlt-ticker-track">
          {Array.from({length: 2}).flatMap((_, i) =>
            ['NUEVO · MacBook Air M3 desde U$ 1.499', 'OUTLET · Galaxy S24 Ultra -19%',
             'STOCK · PS5 Slim · 53 unidades CDE', 'CAJA DAÑADA · ROG Zephyrus -8%',
             'EXPRESS · Envío 48h a São Paulo · Foz · ASU'].map((t, j) => (
              <span key={`${i}-${j}`} className="vlt-ticker-item">
                <span className="vlt-pulse-dot vlt-pulse-y"/>{t}
              </span>
            ))
          )}
        </div>
      </div>
    </section>

    {/* Categories grid */}
    <section className="vlt-sec vlt-sec-cats">
      <div className="vlt-sec-hd">
        <div>
          <span className="vlt-eyebrow">01 — Catálogo</span>
          <h2 className="vlt-sec-title">Navegá por categoría</h2>
        </div>
        <a href="#" onClick={(e)=>{e.preventDefault(); navigate('catalog');}} className="vlt-sec-link">
          Ver todas <Icon name="chev-r" size={13} stroke={2}/>
        </a>
      </div>
      <div className="vlt-cat-grid">
        {CATEGORIES.map((c, i) => (
          <button key={c.id} onClick={() => navigate('catalog')} className="vlt-cat-tile" style={{ animationDelay: `${i * 30}ms` }}>
            <span className="vlt-cat-tile-ico"><Icon name={c.icon} size={20} stroke={1.5}/></span>
            <span style={{ display:'flex', flexDirection:'column', gap:2, flex:1, textAlign:'left' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0B1F4A' }}>{c.label}</span>
              <span style={{ fontSize: 11, color: '#6b7693' }}>{c.count} productos</span>
            </span>
            <Icon name="chev-r" size={14} stroke={2} className="vlt-cat-tile-arr"/>
          </button>
        ))}
      </div>
    </section>

    {/* Featured products */}
    <section className="vlt-sec">
      <div className="vlt-sec-hd">
        <div>
          <span className="vlt-eyebrow">02 — Destacados</span>
          <h2 className="vlt-sec-title">Top del mayorista esta semana</h2>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap: 16 }}>
          <a href="#" onClick={(e)=>{e.preventDefault();}} className="vlt-pill is-active">Más vendidos</a>
          <a href="#" onClick={(e)=>{e.preventDefault();}} className="vlt-pill">Nuevos</a>
          <a href="#" onClick={(e)=>{e.preventDefault();}} className="vlt-pill">Outlet</a>
        </div>
      </div>
      <div className="vlt-prod-grid">
        {PRODUCTS.slice(0, 8).map(p => (
          <ProductCard key={p.id} p={p} currency={currency} secondary={secondary}
                       inCart={cartIds.has(p.id)} onAdd={addToCart} onOpen={openProduct}/>
        ))}
      </div>
    </section>

    {/* CTA strip */}
    <section className="vlt-cta-strip">
      <div className="vlt-cta-strip-inner">
        <div>
          <span className="vlt-eyebrow vlt-eyebrow-y">CRÉDITO MAYORISTA</span>
          <h3 style={{ fontSize: 24, fontWeight: 700, color:'#fff', marginTop: 6, letterSpacing:'-.01em', textWrap: 'balance' }}>
            Cotizá hoy. Pagá en 30, 60 o 90 días.
          </h3>
          <p style={{ fontSize: 13, color:'rgba(255,255,255,.65)', marginTop: 8, maxWidth: 480, lineHeight: 1.55 }}>
            Línea de crédito de hasta US$ 50.000 para revendedores
            registrados. Aprobación en 24h.
          </p>
        </div>
        <button className="vlt-btn-primary">Solicitar acceso comercial</button>
      </div>
    </section>
  </div>
);

// ════════════════════════════════════════════════════════════════════════════
// SCREEN 2 · CATALOG
// ════════════════════════════════════════════════════════════════════════════
const FilterGroup = ({ title, defaultOpen = true, count, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="vlt-filter">
      <button className="vlt-filter-hd" onClick={() => setOpen(o => !o)}>
        <span style={{ fontWeight: 600, fontSize: 12.5, color: '#0B1F4A', letterSpacing:'.01em' }}>{title}</span>
        <span style={{ display:'inline-flex', alignItems:'center', gap: 8 }}>
          {count != null && <span style={{ fontSize: 11, color: '#6b7693' }}>{count}</span>}
          <Icon name="chev-d" size={13} stroke={2}
                style={{ transform: open ? 'none' : 'rotate(-90deg)', transition: 'transform .2s' }}/>
        </span>
      </button>
      {open && <div className="vlt-filter-body">{children}</div>}
    </div>
  );
};

const CatalogScreen = ({ currency, secondary, addToCart, cartIds, openProduct }) => {
  const [activeBrands, setActiveBrands] = useState(new Set(['Apple', 'Samsung']));
  const [priceMin, setPriceMin] = useState(199);
  const [priceMax, setPriceMax] = useState(3299);
  const [sort, setSort] = useState('relevance');
  const [view, setView] = useState('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleBrand = (b) => {
    setActiveBrands(prev => {
      const next = new Set(prev);
      next.has(b) ? next.delete(b) : next.add(b);
      return next;
    });
  };

  const allItems = useMemo(() => {
    // duplicate base products to get density
    const out = [];
    for (let i = 0; i < 3; i++) {
      PRODUCTS.forEach((p, j) => {
        out.push({ ...p, id: `${p.id}-${i}`, _baseId: p.id, _idx: i * PRODUCTS.length + j });
      });
    }
    return out;
  }, []);

  return (
    <div className="vlt-screen" data-screen-label="02 Catalog">
      {/* Breadcrumb + title */}
      <div className="vlt-crumb-wrap">
        <div className="vlt-crumb">
          <a href="#" onClick={e=>e.preventDefault()}>Inicio</a>
          <Icon name="chev-r" size={11} stroke={2}/>
          <a href="#" onClick={e=>e.preventDefault()}>Catálogo</a>
          <Icon name="chev-r" size={11} stroke={2}/>
          <span style={{ color: '#0B1F4A', fontWeight: 600 }}>Smartphones</span>
        </div>
        <h1 className="vlt-cat-title">
          Smartphones <span style={{ color:'#6b7693', fontWeight: 400 }}>· 1.284 productos</span>
        </h1>
        <p className="vlt-cat-desc">
          iPhone, Galaxy, Xiaomi y más. Cotización al instante en USD, BRL y ₲.
          Stock garantizado en Ciudad del Este, Asunción y Foz.
        </p>
      </div>

      {/* Toolbar */}
      <div className="vlt-toolbar">
        <button className="vlt-toolbar-filter" onClick={() => setMobileFiltersOpen(true)}>
          <Icon name="sliders" size={15} stroke={1.7}/>
          <span>Filtros</span>
          <span className="vlt-toolbar-filter-n">{activeBrands.size + 2}</span>
        </button>
        <div className="vlt-chips">
          {[...activeBrands].map(b => (
            <button key={b} className="vlt-chip" onClick={() => toggleBrand(b)}>
              {b}<Icon name="close" size={11} stroke={2.4}/>
            </button>
          ))}
          <button className="vlt-chip">{fmtPrice(priceMin, currency)}–{fmtPrice(priceMax, currency)}<Icon name="close" size={11} stroke={2.4}/></button>
          <button className="vlt-chip">256GB+<Icon name="close" size={11} stroke={2.4}/></button>
          <button className="vlt-chip-clear">Limpiar todo</button>
        </div>
        <div className="vlt-toolbar-right">
          <label className="vlt-toolbar-sort">
            <span>Ordenar:</span>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="relevance">Relevancia</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
              <option value="new">Más nuevos</option>
              <option value="stock">Más stock</option>
            </select>
            <Icon name="chev-d" size={12} stroke={2.2}/>
          </label>
          <div className="vlt-toolbar-view">
            <button className={view === 'grid' ? 'is-active' : ''} onClick={() => setView('grid')} aria-label="Grid">
              <svg width="14" height="14" viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor"/><rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor"/><rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor"/><rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor"/></svg>
            </button>
            <button className={view === 'list' ? 'is-active' : ''} onClick={() => setView('list')} aria-label="List">
              <svg width="14" height="14" viewBox="0 0 16 16"><rect x="1" y="2" width="14" height="3" rx="1" fill="currentColor"/><rect x="1" y="7" width="14" height="3" rx="1" fill="currentColor"/><rect x="1" y="12" width="14" height="3" rx="1" fill="currentColor"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Body grid */}
      <div className="vlt-catalog">
        <aside className={'vlt-filters ' + (mobileFiltersOpen ? 'is-open' : '')}>
          <div className="vlt-filters-hd">
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0B1F4A', letterSpacing:'.01em' }}>Filtros</span>
            <button className="vlt-filters-close" onClick={() => setMobileFiltersOpen(false)} aria-label="Close">
              <Icon name="close" size={16} stroke={2}/>
            </button>
          </div>

          <FilterGroup title="Marcas" count={BRANDS.length}>
            <div className="vlt-brand-list">
              {BRANDS.slice(0, 9).map(b => (
                <label key={b} className="vlt-check">
                  <input type="checkbox" checked={activeBrands.has(b)} onChange={() => toggleBrand(b)}/>
                  <span className="vlt-check-box"><Icon name="check" size={11} stroke={3}/></span>
                  <span style={{ flex: 1 }}>{b}</span>
                  <span className="vlt-check-n">{Math.floor(Math.random() * 80) + 20}</span>
                </label>
              ))}
              <button className="vlt-link-y" style={{ marginTop: 4 }}>+ Ver 7 más</button>
            </div>
          </FilterGroup>

          <FilterGroup title="Rango de precios">
            <div className="vlt-price-range">
              <div className="vlt-price-vis">
                <div className="vlt-price-bars">
                  {[3,5,8,12,18,22,28,24,18,14,9,6,4,3,2].map((h,i) => (
                    <span key={i} style={{ height: `${h * 2.2}px`, opacity: i > 1 && i < 11 ? 1 : .35 }}/>
                  ))}
                </div>
                <div className="vlt-price-track">
                  <div className="vlt-price-fill" style={{ left: '6%', right: '20%' }}/>
                  <span className="vlt-price-knob" style={{ left: '6%' }}/>
                  <span className="vlt-price-knob" style={{ left: '80%' }}/>
                </div>
              </div>
              <div className="vlt-price-inputs">
                <label>
                  <span>Mín.</span>
                  <input type="text" value={fmtPrice(priceMin, currency)} readOnly/>
                </label>
                <span style={{ color:'#94a0b8' }}>—</span>
                <label>
                  <span>Máx.</span>
                  <input type="text" value={fmtPrice(priceMax, currency)} readOnly/>
                </label>
              </div>
            </div>
          </FilterGroup>

          <FilterGroup title="Capacidad / RAM">
            <div className="vlt-tag-grid">
              {['64GB', '128GB', '256GB', '512GB', '1TB', '2TB'].map((c, i) => (
                <button key={c} className={'vlt-tag ' + (i === 2 || i === 3 ? 'is-active' : '')}>{c}</button>
              ))}
            </div>
            <div className="vlt-tag-grid" style={{ marginTop: 8 }}>
              {['4GB', '8GB', '16GB', '32GB', '64GB'].map(r => (
                <button key={r} className="vlt-tag">{r}</button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Estado">
            {[
              ['Nuevo · sellado', 412],
              ['Outlet', 87],
              ['Caja dañada', 24],
              ['Refurbish oficial', 51],
            ].map(([l, n]) => (
              <label key={l} className="vlt-check">
                <input type="checkbox" defaultChecked={l === 'Nuevo · sellado'}/>
                <span className="vlt-check-box"><Icon name="check" size={11} stroke={3}/></span>
                <span style={{ flex: 1 }}>{l}</span>
                <span className="vlt-check-n">{n}</span>
              </label>
            ))}
          </FilterGroup>

          <FilterGroup title="Disponibilidad" defaultOpen={false}>
            <label className="vlt-check"><input type="checkbox" defaultChecked/><span className="vlt-check-box"><Icon name="check" size={11} stroke={3}/></span><span style={{flex:1}}>Stock CDE</span><span className="vlt-check-n">284</span></label>
            <label className="vlt-check"><input type="checkbox"/><span className="vlt-check-box"><Icon name="check" size={11} stroke={3}/></span><span style={{flex:1}}>Stock ASU</span><span className="vlt-check-n">142</span></label>
            <label className="vlt-check"><input type="checkbox"/><span className="vlt-check-box"><Icon name="check" size={11} stroke={3}/></span><span style={{flex:1}}>Importación 48h</span><span className="vlt-check-n">512</span></label>
          </FilterGroup>

          <button className="vlt-btn-primary" style={{ width: '100%', justifyContent:'center', marginTop: 4 }}>
            Aplicar (284)
          </button>
        </aside>

        <main className="vlt-results">
          <div className={'vlt-prod-grid ' + (view === 'list' ? 'is-list' : 'is-cat')}>
            {allItems.slice(0, 24).map(p => (
              <ProductCard key={p.id} p={p} currency={currency} secondary={secondary}
                           inCart={cartIds.has(p._baseId)} onAdd={(item) => addToCart({ ...p, id: p._baseId })}
                           onOpen={() => openProduct({ ...p, id: p._baseId })} dense/>
            ))}
          </div>
          <div className="vlt-pager">
            <button className="vlt-pager-btn"><Icon name="chev-l" size={13} stroke={2.2}/></button>
            {[1,2,3,4,5,6].map(n => (
              <button key={n} className={'vlt-pager-btn ' + (n === 1 ? 'is-active' : '')}>{n}</button>
            ))}
            <span style={{ padding: '0 6px', color:'#94a0b8', fontSize: 12 }}>…</span>
            <button className="vlt-pager-btn">54</button>
            <button className="vlt-pager-btn"><Icon name="chev-r" size={13} stroke={2.2}/></button>
            <span style={{ marginLeft: 'auto', fontSize: 12, color:'#6b7693' }}>
              24 de 1.284 resultados
            </span>
          </div>
        </main>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// SCREEN 3 · PRODUCT DETAIL
// ════════════════════════════════════════════════════════════════════════════
const ProductScreen = ({ p, currency, secondary, addToCart, cartIds, openProduct, navigate }) => {
  const product = p || PRODUCTS[0];
  const [qty, setQty] = useState(5);
  const [imgIdx, setImgIdx] = useState(0);
  const [tab, setTab] = useState('specs');
  const [variant, setVariant] = useState('256');
  const [color, setColor] = useState(0);

  const galleryTones = [product.tone, '#1a2a45', '#0F2A5C', '#231d38', '#1d3338'];

  const subtotalUSD = product.usd * qty;

  const related = PRODUCTS.filter(x => x.cat === product.cat && x.id !== product.id).slice(0, 4);

  return (
    <div className="vlt-screen" data-screen-label="03 Product detail">
      <div className="vlt-crumb-wrap">
        <div className="vlt-crumb">
          <a href="#" onClick={(e)=>{e.preventDefault(); navigate('home');}}>Inicio</a>
          <Icon name="chev-r" size={11} stroke={2}/>
          <a href="#" onClick={(e)=>{e.preventDefault(); navigate('catalog');}}>Catálogo</a>
          <Icon name="chev-r" size={11} stroke={2}/>
          <a href="#" onClick={(e)=>{e.preventDefault(); navigate('catalog');}}>{CATEGORIES.find(c=>c.id===product.cat)?.label}</a>
          <Icon name="chev-r" size={11} stroke={2}/>
          <span style={{ color: '#0B1F4A', fontWeight: 600 }}>{product.title}</span>
        </div>
      </div>

      <div className="vlt-pd">
        {/* Gallery */}
        <div className="vlt-pd-gallery">
          <div className="vlt-pd-main">
            <ProductPlaceholder label={product.title} tone={galleryTones[imgIdx]} aspect="1/1"/>
            {product.badge && (
              <div style={{ position:'absolute', top: 16, left: 16, display:'flex', gap: 6 }}>
                <Badge kind={badgeKindFor(product.badge)}>{product.badge}</Badge>
              </div>
            )}
            <div className="vlt-pd-zoom">
              <Icon name="plus" size={14} stroke={2}/> Zoom 4K
            </div>
          </div>
          <div className="vlt-pd-thumbs">
            {galleryTones.map((t, i) => (
              <button key={i} onClick={() => setImgIdx(i)}
                      className={'vlt-pd-thumb ' + (imgIdx === i ? 'is-active' : '')}>
                <ProductPlaceholder label="" tone={t} aspect="1/1"/>
              </button>
            ))}
          </div>
        </div>

        {/* Right: title + price + quote box */}
        <div className="vlt-pd-info">
          <div className="vlt-pd-meta">
            <span className="vlt-pd-brand">{product.brand}</span>
            <span className="vlt-pd-sku">SKU · {product.sku}</span>
            <span className="vlt-pd-stock">
              <span className="vlt-dot" style={{ background:'#5ec48a' }}/>
              {product.stock} en stock CDE
            </span>
          </div>
          <h1 className="vlt-pd-title">{product.title}</h1>
          <p className="vlt-pd-sub">{product.subtitle}</p>

          {/* Multi-currency price card */}
          <div className="vlt-pd-pricecard">
            <div className="vlt-pd-pricecard-hd">
              <span style={{ fontSize: 11, color:'rgba(255,255,255,.6)', letterSpacing:'.06em' }}>PRECIO MAYORISTA UNITARIO</span>
              {product.was && (
                <span className="vlt-pd-save">Ahorro {Math.round((1 - product.usd/product.was)*100)}%</span>
              )}
            </div>
            <div className="vlt-pd-pricecard-rows">
              {Object.keys(CURRENCY_META).map((c) => {
                const main = c === currency;
                return (
                  <div key={c} className={'vlt-pd-price-row ' + (main ? 'is-main' : '')}>
                    <span className="vlt-pd-price-flag">{CURRENCY_META[c].flag}</span>
                    <span className="vlt-pd-price-ccy">{c}</span>
                    <span className="vlt-pd-price-amt">{fmtPrice(product.usd, c)}</span>
                    {main && <span className="vlt-pd-price-tag">moneda activa</span>}
                  </div>
                );
              })}
            </div>
            <div className="vlt-pd-pricecard-foot">
              <Icon name="bolt" size={11} stroke={1.8} style={{ color: '#F4D44F' }}/>
              Cotización actualizada hace 12 min · BCP
            </div>
          </div>

          {/* Variants */}
          <div className="vlt-pd-opt">
            <div className="vlt-pd-opt-hd">
              <span>Almacenamiento</span>
              <span style={{ color:'#6b7693' }}>seleccionado · {variant}GB</span>
            </div>
            <div className="vlt-tag-grid">
              {['128', '256', '512', '1024'].map(v => (
                <button key={v}
                        className={'vlt-tag ' + (variant === v ? 'is-active' : '')}
                        onClick={() => setVariant(v)}>
                  {v === '1024' ? '1TB' : `${v}GB`}
                </button>
              ))}
            </div>
          </div>

          <div className="vlt-pd-opt">
            <div className="vlt-pd-opt-hd">
              <span>Color</span>
              <span style={{ color:'#6b7693' }}>{['Titanio Natural', 'Titanio Negro', 'Titanio Azul', 'Titanio Blanco'][color]}</span>
            </div>
            <div style={{ display:'flex', gap: 8 }}>
              {[
                ['#9a9690', '#1c1c1e', '#3b4f6b', '#e9e5dd'],
              ][0].map((c, i) => (
                <button key={i} onClick={() => setColor(i)}
                        className={'vlt-pd-swatch ' + (color === i ? 'is-active' : '')}
                        style={{ background: c }}/>
              ))}
            </div>
          </div>

          {/* Qty + actions */}
          <div className="vlt-pd-actions">
            <div className="vlt-pd-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Menos">
                <Icon name="minus" size={14} stroke={2.2}/>
              </button>
              <input value={qty} onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))}/>
              <button onClick={() => setQty(q => q + 1)} aria-label="Más">
                <Icon name="plus" size={14} stroke={2.2}/>
              </button>
            </div>
            <button className="vlt-btn-primary vlt-btn-primary-lg"
                    onClick={() => addToCart(product, qty)}>
              <Icon name="cart" size={15} stroke={2}/>
              Añadir {qty} a cotización · {fmtPrice(subtotalUSD, currency)}
            </button>
            <button className="vlt-btn-whatsapp" aria-label="WhatsApp">
              <Icon name="whatsapp" size={17} stroke={1.7}/>
              <span className="vlt-hide-sm">Asesor</span>
            </button>
          </div>

          {/* Quick benefits */}
          <div className="vlt-pd-benefits">
            {[
              ['truck', 'Express 48h', 'a São Paulo y Asunción'],
              ['shield', 'Garantía 12m', 'cobertura regional'],
              ['globe', '3 monedas', 'cotización en vivo'],
            ].map(([ico, t, s]) => (
              <div key={t}>
                <Icon name={ico} size={16} stroke={1.6} style={{ color: '#F4D44F' }}/>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#0B1F4A' }}>{t}</div>
                  <div style={{ fontSize: 11, color: '#6b7693' }}>{s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="vlt-pd-tabs">
        <div className="vlt-pd-tabs-hd">
          {[['specs', 'Especificaciones'], ['logis', 'Logística'], ['warr', 'Garantía'], ['rev', 'Reseñas (124)']].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={tab === k ? 'is-active' : ''}>{l}</button>
          ))}
        </div>
        {tab === 'specs' && (
          <div className="vlt-pd-specs">
            {[
              ['Pantalla', '6.1" Super Retina XDR · 120 Hz'],
              ['Procesador', 'Apple A17 Pro · 3 nm'],
              ['Cámara', '48 MP + 12 MP UW + 12 MP Tele 3×'],
              ['Batería', '3.274 mAh · USB-C 27W'],
              ['Material', 'Titanio grado 5 · vidrio cerámico'],
              ['Conectividad', 'Wi-Fi 6E · 5G · Thread · BT 5.3'],
              ['Dimensiones', '146,6 × 70,6 × 8,25 mm · 187 g'],
              ['Resistencia', 'IP68 · 6 m / 30 min'],
              ['Sistema', 'iOS 17 · 5 años de updates'],
              ['Caja incluye', 'Cable USB-C, documentación'],
            ].map(([k, v]) => (
              <div key={k} className="vlt-pd-spec-row">
                <span>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        )}
        {tab === 'logis' && (
          <div style={{ display:'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, fontSize: 13, color:'#0B1F4A' }}>
            {[
              ['Ciudad del Este', 'Retiro inmediato', '42 u'],
              ['Asunción', 'Envío 24h', '14 u'],
              ['Foz do Iguaçu', 'Envío 24h', '8 u'],
              ['São Paulo', 'Express 48h', 'Import'],
              ['Buenos Aires', 'Aéreo 72h', 'Import'],
              ['Santiago', 'Aéreo 72h', 'Import'],
            ].map(([c, t, n]) => (
              <div key={c} className="vlt-pd-logis-card">
                <div style={{ fontSize: 11, color:'#6b7693', letterSpacing:'.06em' }}>SUCURSAL</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 2 }}>{c}</div>
                <div style={{ fontSize: 12, color:'#6b7693', marginTop: 6 }}>{t}</div>
                <div style={{ marginTop: 8, fontSize: 11, fontWeight: 700, color:'#0B1F4A', background:'#F4D44F', display:'inline-block', padding:'3px 8px', borderRadius: 4 }}>{n}</div>
              </div>
            ))}
          </div>
        )}
        {tab === 'warr' && (
          <div style={{ fontSize: 13.5, color:'#0B1F4A', lineHeight: 1.6, maxWidth: 720 }}>
            <p style={{ marginBottom: 12 }}>
              <b>Garantía importadora Trending Store · 12 meses</b> con cobertura en
              Paraguay, Brasil, Argentina y Chile. Cubre defectos de fabricación,
              fallos de batería bajo 80% de capacidad y problemas de software no
              imputables al usuario.
            </p>
            <p>
              Para activar la garantía, conservá la factura electrónica enviada
              al correo del comprador y el código SKU impreso en la caja. Tiempo
              promedio de resolución: <b>5 días hábiles</b>.
            </p>
          </div>
        )}
        {tab === 'rev' && (
          <div style={{ fontSize: 13.5, color:'#6b7693' }}>124 reseñas verificadas · 4,8 / 5</div>
        )}
      </div>

      {/* Related */}
      <div className="vlt-sec">
        <div className="vlt-sec-hd">
          <div>
            <span className="vlt-eyebrow">Relacionados</span>
            <h2 className="vlt-sec-title" style={{ fontSize: 22 }}>Otros en {CATEGORIES.find(c=>c.id===product.cat)?.label}</h2>
          </div>
        </div>
        <div className="vlt-prod-grid">
          {related.map(rp => (
            <ProductCard key={rp.id} p={rp} currency={currency} secondary={secondary}
                         inCart={cartIds.has(rp.id)} onAdd={addToCart} onOpen={openProduct}/>
          ))}
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// SCREEN 4 · QUOTE / CART
// ════════════════════════════════════════════════════════════════════════════
const QuoteScreen = ({ cart, setCart, currency, navigate, openProduct }) => {
  const lines = cart.length ? cart : [];
  const subtotal = lines.reduce((s, l) => s + l.usd * l.qty, 0);
  const discount = subtotal * 0.05;
  const tax = (subtotal - discount) * 0.10;
  const total = subtotal - discount + tax;

  const updateQty = (id, dq) => {
    setCart(prev => prev.map(l => l.id === id ? { ...l, qty: Math.max(1, l.qty + dq) } : l));
  };
  const removeLine = (id) => setCart(prev => prev.filter(l => l.id !== id));

  if (!lines.length) {
    return (
      <div className="vlt-screen" data-screen-label="04 Quote (empty)">
        <div className="vlt-empty">
          <div className="vlt-empty-ico"><Icon name="cart" size={36} stroke={1.3}/></div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color:'#0B1F4A', letterSpacing:'-.01em' }}>Tu cotización está vacía</h2>
          <p style={{ fontSize: 13.5, color:'#6b7693', marginTop: 8, marginBottom: 20, maxWidth: 380 }}>
            Agregá productos desde el catálogo y compará el total automáticamente en USD, BRL y ₲.
          </p>
          <button className="vlt-btn-primary" onClick={() => navigate('catalog')}>
            Ir al catálogo <Icon name="chev-r" size={14} stroke={2.2}/>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vlt-screen" data-screen-label="04 Quote">
      <div className="vlt-crumb-wrap">
        <div className="vlt-crumb">
          <a href="#" onClick={(e)=>{e.preventDefault(); navigate('home');}}>Inicio</a>
          <Icon name="chev-r" size={11} stroke={2}/>
          <span style={{ color: '#0B1F4A', fontWeight: 600 }}>Cotización en proceso</span>
        </div>
        <h1 className="vlt-cat-title">
          Mi cotización <span style={{ color:'#6b7693', fontWeight: 400 }}>· {lines.length} {lines.length === 1 ? 'producto' : 'productos'}</span>
        </h1>
        <p className="vlt-cat-desc">
          Total reflejado simultáneamente en las tres monedas. Cotización válida
          por 48 horas desde su generación · <b>TRS-Q-2026-{Math.floor(Math.random()*9000)+1000}</b>
        </p>
      </div>

      <div className="vlt-quote">
        {/* Table */}
        <div className="vlt-quote-tbl">
          <div className="vlt-quote-tbl-hd">
            <span>Producto</span>
            <span>SKU</span>
            <span style={{ textAlign:'center' }}>Cant.</span>
            <span style={{ textAlign:'right' }}>USD</span>
            <span style={{ textAlign:'right' }}>BRL</span>
            <span style={{ textAlign:'right' }}>₲</span>
            <span/>
          </div>
          {lines.map(l => (
            <div key={l.id} className="vlt-quote-row">
              <div className="vlt-quote-prod">
                <div style={{ width: 56, height: 56, flexShrink: 0 }}>
                  <ProductPlaceholder label="" tone={l.tone} aspect="1/1"/>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap: 2, minWidth: 0 }}>
                  <button onClick={() => openProduct(l)} className="vlt-quote-title">{l.title}</button>
                  <span style={{ fontSize: 11.5, color:'#6b7693' }}>{l.brand} · {l.subtitle}</span>
                </div>
              </div>
              <span className="vlt-quote-sku">{l.sku}</span>
              <div className="vlt-quote-qty">
                <button onClick={() => updateQty(l.id, -1)}><Icon name="minus" size={11} stroke={2.4}/></button>
                <span>{l.qty}</span>
                <button onClick={() => updateQty(l.id, 1)}><Icon name="plus" size={11} stroke={2.4}/></button>
              </div>
              <span className="vlt-quote-amt vlt-quote-amt-main">{fmtPrice(l.usd * l.qty, 'USD')}</span>
              <span className="vlt-quote-amt">{fmtPrice(l.usd * l.qty, 'BRL')}</span>
              <span className="vlt-quote-amt">{fmtPrice(l.usd * l.qty, 'PYG')}</span>
              <button onClick={() => removeLine(l.id)} className="vlt-quote-x" aria-label="Eliminar">
                <Icon name="close" size={14} stroke={2}/>
              </button>
            </div>
          ))}

          {/* Mobile cards version (CSS-hidden on desktop) */}
          <div className="vlt-quote-mob">
            {lines.map(l => (
              <div key={l.id + '-m'} className="vlt-quote-mob-card">
                <div style={{ display:'flex', gap: 10, alignItems:'flex-start' }}>
                  <div style={{ width: 56, height: 56, flexShrink: 0 }}>
                    <ProductPlaceholder label="" tone={l.tone} aspect="1/1"/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color:'#0B1F4A', lineHeight: 1.3 }}>{l.title}</div>
                    <div style={{ fontSize: 11, color:'#6b7693', marginTop: 2 }}>{l.sku}</div>
                  </div>
                  <button onClick={() => removeLine(l.id)} className="vlt-quote-x">
                    <Icon name="close" size={14} stroke={2}/>
                  </button>
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 12 }}>
                  <div className="vlt-quote-qty">
                    <button onClick={() => updateQty(l.id, -1)}><Icon name="minus" size={11} stroke={2.4}/></button>
                    <span>{l.qty}</span>
                    <button onClick={() => updateQty(l.id, 1)}><Icon name="plus" size={11} stroke={2.4}/></button>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color:'#0B1F4A', fontVariantNumeric:'tabular-nums' }}>
                      {fmtPrice(l.usd * l.qty, currency)}
                    </div>
                    <div style={{ fontSize: 10.5, color:'#6b7693', fontVariantNumeric:'tabular-nums' }}>
                      ≈ {fmtPrice(l.usd * l.qty, currency === 'USD' ? 'BRL' : 'USD')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="vlt-quote-cont">
            <button className="vlt-link-y" onClick={() => navigate('catalog')}>← Seguir agregando productos</button>
          </div>
        </div>

        {/* Summary */}
        <aside className="vlt-quote-sum">
          <div style={{ fontSize: 13, fontWeight: 700, color:'#0B1F4A', letterSpacing:'.01em' }}>
            Resumen de cotización
          </div>

          <div className="vlt-quote-sum-totals">
            <div className="vlt-quote-sum-row">
              <span>Subtotal · {lines.length} prod.</span>
              <span>{fmtPrice(subtotal, currency)}</span>
            </div>
            <div className="vlt-quote-sum-row vlt-quote-sum-row-disc">
              <span>Descuento mayorista (5%)</span>
              <span>− {fmtPrice(discount, currency)}</span>
            </div>
            <div className="vlt-quote-sum-row">
              <span>Impuestos estimados (10%)</span>
              <span>{fmtPrice(tax, currency)}</span>
            </div>
            <div className="vlt-quote-sum-row">
              <span>Logística CDE → Destino</span>
              <span style={{ color:'#5ec48a', fontWeight: 600 }}>Incluido</span>
            </div>
          </div>

          {/* Tri-currency total */}
          <div className="vlt-quote-tri">
            <div className="vlt-quote-tri-hd">TOTAL EN 3 MONEDAS</div>
            {Object.keys(CURRENCY_META).map((c, i) => (
              <div key={c} className={'vlt-quote-tri-row ' + (c === currency ? 'is-main' : '')}>
                <span style={{ fontSize: 13 }}>{CURRENCY_META[c].flag}</span>
                <span className="vlt-quote-tri-ccy">{c}</span>
                <span className="vlt-quote-tri-amt">{fmtPrice(total, c)}</span>
              </div>
            ))}
          </div>

          <button className="vlt-btn-primary vlt-btn-primary-lg" style={{ width:'100%', justifyContent:'center' }}>
            <Icon name="check" size={15} stroke={2.4}/> Confirmar y enviar cotización
          </button>
          <button className="vlt-btn-whatsapp vlt-btn-whatsapp-lg">
            <Icon name="whatsapp" size={16} stroke={1.7}/>
            Negociar por WhatsApp con asesor
          </button>

          <div className="vlt-quote-trust">
            <div><Icon name="shield" size={12} stroke={1.7} style={{ color:'#F4D44F' }}/> Cotización válida 48h</div>
            <div><Icon name="bolt" size={12} stroke={1.7} style={{ color:'#F4D44F' }}/> Cambio fijo a partir de la confirmación</div>
            <div><Icon name="truck" size={12} stroke={1.7} style={{ color:'#F4D44F' }}/> Liberación aduanera incluida</div>
          </div>
        </aside>
      </div>
    </div>
  );
};

Object.assign(window, { HomeScreen, CatalogScreen, ProductScreen, QuoteScreen });
