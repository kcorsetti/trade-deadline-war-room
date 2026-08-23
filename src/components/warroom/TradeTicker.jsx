import { useState } from "react";
import { ArrowRight, Radio, RotateCcw } from "lucide-react";
import TradeResult from "./TradeResult";
import CustomTradeForm from "./CustomTradeForm";

export default function TradeTicker({ result, step, total, onNext, onReset, players, onSimulateCustom, onClearCustom, customActive }) {
  const [wireMode, setWireMode] = useState("queued");
  const done = step >= total;
  return (
    <section className="ticker-panel">
      <div className="panel-title">
        <h2><Radio size={16} /> Simulation Wire</h2>
        {wireMode === "queued" && <span>Event {step || "—"} of {total}</span>}
      </div>
      <div className="wire-toggle">
        <button className={wireMode === "queued" ? "active" : ""} onClick={() => setWireMode("queued")}>Queued Trades</button>
        <button className={wireMode === "custom" ? "active" : ""} onClick={() => setWireMode("custom")}>Custom Trade</button>
      </div>
      {wireMode === "queued" ? (
        <>
          {result ? <TradeResult result={result} /> : <div className="ticker-empty">Advance the wire to process the first trade.</div>}
          <div className="button-row">
            <button className="next-button" onClick={onNext} disabled={done}>
              {done ? "Simulation complete" : <>Next trade <ArrowRight size={16} /></>}
            </button>
            <button className="reset-button" onClick={onReset} disabled={step === 0}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </>
      ) : (
        <>
          {result ? <TradeResult result={result} /> : <div className="ticker-empty">Configure a custom trade below to test its impact.</div>}
          <CustomTradeForm players={players} onSimulate={onSimulateCustom} onClear={onClearCustom} customActive={customActive} />
        </>
      )}
    </section>
  );
}