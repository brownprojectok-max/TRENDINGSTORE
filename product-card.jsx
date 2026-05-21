// product-card.jsx — the workhorse density component

const ProductCard = ({ p, currency, secondary, onAdd, onOpen, inCart, dense = false }) => {
  const [hover, setHover] = useState(false);
  const badge = badgeKindFor(p.badge);
  return (
    <article
      className={'vlt-card ' + (dense ? 'is-dense' : '')}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      onClick={() => onOpen?.(p)}
    >
      <div className="vlt-card-img">
        <ProductPlaceholder label={p.brand} tone={p.tone}/>
        {badge && (
          <div className="vlt-card-badges">
            <Badge kind={badge}>{p.badge}</Badge>
          </div>
        )}
        <button className="vlt-card-quick" onClick={(e) => { e.stopPropagation(); }}>
          <Icon name="star" size={14} stroke={1.7}/>
        </button>
        {p.was && (
          <div className="vlt-card-save">
            -{Math.round((1 - p.usd / p.was) * 100)}%
          </div>
        )}
      </div>

      <div className="vlt-card-body">
        <div className="vlt-card-meta">
          <span className="vlt-card-cat">{CATEGORIES.find(c => c.id === p.cat)?.label}</span>
          <span className="vlt-card-sku">{p.sku}</span>
        </div>
        <h3 className="vlt-card-title">{p.title}</h3>
        <p className="vlt-card-sub">{p.subtitle}</p>

        <div className="vlt-card-price">
          <PriceBlock usd={p.usd} was={p.was} currency={currency} second={secondary} size="sm"/>
        </div>

        <div className="vlt-card-foot">
          <span className="vlt-card-stock">
            <span className="vlt-dot" style={{ background: p.stock > 10 ? '#5ec48a' : '#F4D44F' }}/>
            {p.stock > 10 ? `${p.stock} en stock` : `Últ. ${p.stock} u.`}
          </span>
          <button
            className={'vlt-card-add ' + (inCart ? 'is-in' : '')}
            onClick={(e) => { e.stopPropagation(); onAdd?.(p); }}
          >
            <Icon name={inCart ? 'check' : 'plus'} size={14} stroke={2.2}/>
            <span>{inCart ? 'En cotización' : 'Cotizar'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

Object.assign(window, { ProductCard });
