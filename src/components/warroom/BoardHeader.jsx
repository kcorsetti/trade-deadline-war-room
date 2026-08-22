import { Activity } from "lucide-react";
import HowItWorksButton from "./HowItWorksButton";

export default function BoardHeader({ step, total }) {
  return (
    <header className="board-header">
      <img src="https://media.base44.com/images/public/6a83ba781963ba54b39b263d/6dd4799da_AppLogo.png" alt="Cardinals War Room" className="board-logo" />
      <div className="board-titles">
        <p className="eyebrow">Trade Deadline War Room Tracker</p>
        <h1>Cardinals Trade Value Board</h1>
      </div>
      <HowItWorksButton />
      <div className="live-status"><Activity size={15} /> MANUAL SIMULATION <span>{step}/{total}</span></div>
    </header>
  );
}