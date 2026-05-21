// app.jsx — root + navigation + tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#F4D44F",
  "primaryDark": "#0B1F4A",
  "density": "regular",
  "showTicker": true,
  "fontStack": "Inter"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [nav, setNav] = useState('home');
  const [currency, setCurrency] = useState('USD');
  const [cart, setCart] = useState([
    { ...PRODUCTS[0], qty: 5 },
    { ...PRODUCTS[3], qty: 2 },
    { ...PRODUCTS[7], qty: 10 },
  ]);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [transitioning, setTransitioning] = useState(false);

  const cartIds = useMemo(() => new Set(cart.map(c => c.id)), [cart]);
  const cartCount = cart.reduce((s, l) => s + l.qty, 0);

  const secondary = currency === 'USD' ? 'BRL' : currency === 'BRL' ? 'USD' : 'USD';

  const navigate = useCallback((target) => {
    if (target === nav) return;
    setTransitioning(true);
    setTimeout(() => {
      setNav(target);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTransitioning(false);
    }, 140);
  }, [nav]);

  const addToCart = useCallback((p, qty = 1) => {
    setCart(prev => {
      const i = prev.findIndex(l => l.id === p.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { ...p, qty }];
    });
    // Toast
    showToast(`✓ ${p.title} añadido a la cotización`);
  }, []);

  const openProduct = useCallback((p) => {
    setSelectedProduct(p);
    navigate('product');
  }, [navigate]);

  // toast system
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const showToast = useCallback((msg) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  // CSS-vars from tweaks
  const rootStyle = {
    '--vlt-accent': t.accent,
    '--vlt-primary': t.primaryDark,
    '--vlt-font': t.fontStack === 'Inter'
      ? `"Inter", ui-sans-serif, system-ui, sans-serif`
      : t.fontStack === 'IBM Plex'
      ? `"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif`
      : `"Space Grotesk", ui-sans-serif, system-ui, sans-serif`,
    '--vlt-density': t.density === 'compact' ? '.85' : t.density === 'comfy' ? '1.1' : '1',
  };

  const screens = {
    home:    <HomeScreen    currency={currency} secondary={secondary} addToCart={addToCart} cartIds={cartIds} openProduct={openProduct} navigate={navigate}/>,
    catalog: <CatalogScreen currency={currency} secondary={secondary} addToCart={addToCart} cartIds={cartIds} openProduct={openProduct}/>,
    product: <ProductScreen p={selectedProduct} currency={currency} secondary={secondary} addToCart={addToCart} cartIds={cartIds} openProduct={openProduct} navigate={navigate}/>,
    quote:   <QuoteScreen   cart={cart} setCart={setCart} currency={currency} navigate={navigate} openProduct={openProduct}/>,
  };

  return (
    <div className="vlt-root" style={rootStyle} data-density={t.density}>
      <Header
        nav={nav}
        navigate={navigate}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={cartCount}
        openCart={() => navigate('quote')}
        onSearch={() => {}}
      />

      <main className={'vlt-main ' + (transitioning ? 'is-fading' : '')}>
        {screens[nav]}
      </main>

      <Footer/>

      {toast && (
        <div className="vlt-toast">
          <Icon name="check" size={14} stroke={2.4} style={{ color: '#F4D44F' }}/>
          <span>{toast}</span>
        </div>
      )}

      <TweaksPanel>
        <TweakSection label="Identidad visual"/>
        <TweakColor
          label="Azul principal"
          value={t.primaryDark}
          options={['#0B1F4A', '#0a1830', '#11264f', '#1a1f3a']}
          onChange={(v) => setTweak('primaryDark', v)}
        />
        <TweakColor
          label="Amarillo acento"
          value={t.accent}
          options={['#F4D44F', '#FFB400', '#FFD53D', '#E8FF59']}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakSelect
          label="Tipografía"
          value={t.fontStack}
          options={['Inter', 'IBM Plex', 'Space Grotesk']}
          onChange={(v) => setTweak('fontStack', v)}
        />
        <TweakSection label="Layout"/>
        <TweakRadio
          label="Densidad"
          value={t.density}
          options={['compact', 'regular', 'comfy']}
          onChange={(v) => setTweak('density', v)}
        />
        <TweakToggle
          label="Ticker hero"
          value={t.showTicker}
          onChange={(v) => setTweak('showTicker', v)}
        />
        <TweakSection label="Navegación"/>
        <TweakRadio
          label="Pantalla"
          value={nav}
          options={['home', 'catalog', 'product', 'quote']}
          onChange={navigate}
        />
        <TweakRadio
          label="Moneda activa"
          value={currency}
          options={['USD', 'BRL', 'PYG']}
          onChange={setCurrency}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
