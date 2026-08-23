export default function TradeResult({ result }) {
  return (
    <div className="ticker-content">
      <p className="wire-label">LATEST HEADLINE</p>
      <h3>{result.trade.headline}</h3>
      <div className="parsed">
        <span>PARSED</span>{result.trade.role} / {result.trade.eventType}
      </div>
      <p className="wire-label">RULES FIRED &amp; PV IMPACT</p>
      <div className="impact-list">
        {result.changes.length ? (
          result.changes.map((change) => (
            <div className="impact" key={change.name}>
              <b>{change.name}</b>
              <span className={change.locked ? "locked-tag" : ""}>
                {change.locked
                  ? "LOCKED"
                  : `${change.delta > 0 ? "+" : ""}${change.delta.toFixed(2)} → ${change.pv.toFixed(2)}`}
              </span>
              <small>{change.rationale}</small>
            </div>
          ))
        ) : (
          <p className="no-impact">No active rule changed PV.</p>
        )}
      </div>
      {result.trade.ruleType && result.trade.rationale && (
        <p className="rationale"><b>{result.trade.ruleType}:</b> {result.trade.rationale}</p>
      )}
    </div>
  );
}