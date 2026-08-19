import { Activity } from "lucide-react";

export default function BoardHeader({ step, total }) {
  return (
    <header className="board-header">
      <div>
        <p className="eyebrow">Trade Deadline War Room Tracker</p>
        <h1>Cardinals Trade Value Board</h1>
      </div>
      <div className="live-status"><Activity size={15} /> MANUAL SIMULATION <span>{step}/{total}</span></div>
    </header>
  );
}