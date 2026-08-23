import { useState } from "react";
import { FlaskConical, Trash2 } from "lucide-react";

const ROLES = ["SP", "RP", "Position Player"];
const RULE_TYPES = ["Scarcity", "Buyer Exit", "Target Cost Signal"];

export default function CustomTradeForm({ players, onSimulate, onClear, customActive }) {
  const [role, setRole] = useState("SP");
  const [affectedPlayer, setAffectedPlayer] = useState("");
  const [ruleType, setRuleType] = useState("");
  const [magnitude, setMagnitude] = useState(5);
  const [headline, setHeadline] = useState("");

  const resetForm = () => {
    setRole("SP");
    setAffectedPlayer("");
    setRuleType("");
    setMagnitude(5);
    setHeadline("");
  };

  const handleSubmit = () => {
    onSimulate({ role, affectedPlayer, ruleType, magnitude, headline });
    resetForm();
  };

  const handleClear = () => {
    onClear();
    resetForm();
  };

  return (
    <div className="custom-form">
      <label className="form-label">Role (drives Market Heat)</label>
      <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
      </select>

      <label className="form-label">Affects specific player (optional)</label>
      <select className="form-select" value={affectedPlayer} onChange={e => { setAffectedPlayer(e.target.value); if (!e.target.value) setRuleType(""); }}>
        <option value="">None (role-wide heat only)</option>
        {players.map(p => <option key={p.name} value={p.name}>{p.name} ({p.position})</option>)}
      </select>

      {affectedPlayer && (
        <>
          <label className="form-label">Rule Type</label>
          <select className="form-select" value={ruleType} onChange={e => setRuleType(e.target.value)}>
            <option value="">Select rule type</option>
            {RULE_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          <label className="form-label">Magnitude: {magnitude}%</label>
          <input type="range" min="5" max="10" step="1" value={magnitude} onChange={e => setMagnitude(Number(e.target.value))} className="form-slider" />
        </>
      )}

      <label className="form-label">Headline (optional)</label>
      <input type="text" className="form-input" value={headline} onChange={e => setHeadline(e.target.value)} placeholder="e.g. SEA acquires Reid Detmers for prospects" />

      <div className="button-row">
        <button className="next-button" onClick={handleSubmit} disabled={!!affectedPlayer && !ruleType}>
          <FlaskConical size={14} /> Simulate this trade
        </button>
        {customActive && (
          <button className="reset-button" onClick={handleClear}>
            <Trash2 size={14} /> Clear test
          </button>
        )}
      </div>
    </div>
  );
}