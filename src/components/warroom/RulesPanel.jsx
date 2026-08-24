const RULES = [
  ["marketHeat", "Market Heat", "Role-wide multiplier: +2.5% per trade"],
  ["Scarcity", "Scarcity", "Direct one-player comp adjustment"],
  ["Buyer Exit", "Buyer Exit", "Direct one-player comp adjustment"],
  ["Target Cost Signal", "Target Cost Signal", "Direct one-player comp adjustment"],
];

function formatCurrency(value) {
  const sign = value < 0 ? "-" : "";
  return sign + "$" + Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function RulesPanel({ rules, setRules, players }) {
  const assets = (players || []).filter((p) => p.bucket === "Cardinals Asset");
  const startingSum = assets.reduce((sum, p) => sum + (p.originalPv || 0), 0);
  const currentSum = assets.reduce((sum, p) => sum + (p.pv || 0), 0);
  const change = Number((currentSum - startingSum).toFixed(2));
  const changeClass = change > 0 ? "positive" : change < 0 ? "negative" : "neutral";

  return (
    <aside className="rules-panel">
      <div className="panel-title"><h2>Rules Engine</h2><span>LIVE</span></div>
      <p className="rules-intro">Toggle a layer before advancing the next trade.</p>
      {RULES.map(([key, label, description], index) => <div className="rule" key={key}>
        {index === 1 && <p className="rule-group">TARGETED COMP IMPACT</p>}
        <div><b>{label}</b><small>{description}</small></div>
        <button aria-label={`Toggle ${label}`} aria-pressed={rules[key]} className={`switch ${rules[key] ? "on" : ""}`} onClick={() => setRules((current) => ({ ...current, [key]: !current[key] }))}><span /></button>
      </div>)}
      <div className="legend"><span><i className="dot heat" /> Market-wide</span><span><i className="dot target" /> Player-specific</span></div>
      <div className="portfolio-summary">
        <p className="portfolio-label">TOTAL CARDINALS ASSET VALUE</p>
        <p className="portfolio-value">{formatCurrency(currentSum)}</p>
        <p className={`portfolio-change ${changeClass}`}>
          {change > 0 ? "+" : change < 0 ? "" : ""}{change !== 0 ? formatCurrency(change) : "-"}
          <span className="portfolio-today"> today</span>
        </p>
      </div>
    </aside>
  );
}