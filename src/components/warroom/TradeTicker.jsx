import { ArrowRight, Radio } from "lucide-react";

export default function TradeTicker({ result, step, total, onNext }) {
  const done = step >= total;
  return (
    <section className="ticker-panel">
      <div className="panel-title">
        <h2><Radio size={16} /> Deadline Wire</h2>
        <span>Event {step || "—"} of {total}</span>
      </div>
      {!result ? (
        <div className="ticker-empty">Advance the wire to process the first trade.</div>
      ) : (
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
      )}
      <button className="next-button" onClick={onNext} disabled={done}>
        {done ? "Simulation complete" : <>Next trade <ArrowRight size={16} /></>}
      </button>
    </section>
  );
}