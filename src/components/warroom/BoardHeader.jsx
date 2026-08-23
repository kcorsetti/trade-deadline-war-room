import { Activity, Radio } from "lucide-react";
import HowItWorksButton from "./HowItWorksButton";

export default function BoardHeader({ step, total, mode, setMode }) {
  return (
    <header className="board-header">
      <img src="https://media.base44.com/images/public/6a83ba781963ba54b39b263d/6dd4799da_AppLogo.png" alt="Cardinals War Room" className="board-logo" />
      <div className="board-titles">
        <p className="eyebrow">Trade Deadline War Room Tracker</p>
        <h1>Cardinals Trade Value Board</h1>
      </div>
      <div className="mode-toggle">
        <button className={mode === "simulation" ? "active" : ""} onClick={() => setMode("simulation")}>Simulation Mode</button>
        <button className={mode === "live" ? "active" : ""} onClick={() => setMode("live")}>Live Mode</button>
      </div>
      <HowItWorksButton />
      <div className="live-status">
        {mode === "simulation" ? <><Activity size={15} /> MANUAL SIMULATION <span>{step}/{total}</span></> : <><Radio size={15} /> LIVE MODE <span>Architecture Ready</span></>}
      </div>
    </header>
  );
}