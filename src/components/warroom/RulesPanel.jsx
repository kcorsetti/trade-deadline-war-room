const RULES = [
  ["marketHeat", "Market Heat", "Role-wide multiplier: +2.5% per trade"],
  ["Scarcity", "Scarcity", "Direct one-player comp adjustment"],
  ["Buyer Exit", "Buyer Exit", "Direct one-player comp adjustment"],
  ["Target Cost Signal", "Target Cost Signal", "Direct one-player comp adjustment"],
];

export default function RulesPanel({ rules, setRules }) {
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
    </aside>
  );
}