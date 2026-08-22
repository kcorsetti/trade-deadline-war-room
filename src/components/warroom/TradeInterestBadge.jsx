import { useState, useRef } from "react";
import { Users } from "lucide-react";

const TRADE_INTEREST = {
  "Alec Burleson": ["AZ", "CLE", "MIN"],
  "Lars Nootbaar": ["PHI", "AZ", "HOU"],
  "Ivan Herrera": ["TB", "NYY", "CHW"],
  "Reid Detmers": ["CHC", "CHW", "MIN"],
  "Jarren Duran": ["HOU", "PHI", "SD"],
  "Isaac Paredes": ["BOS", "PIT", "SEA"],
};

export default function TradeInterestBadge({ name }) {
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const badgeRef = useRef(null);

  const teams = TRADE_INTEREST[name];
  if (!teams) return null;

  const updateCoords = () => {
    if (badgeRef.current) {
      const rect = badgeRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 6, left: rect.left });
    }
  };

  const open = hovered || pinned;

  return (
    <>
      <span
        ref={badgeRef}
        className="ti-badge"
        onMouseEnter={() => { updateCoords(); setHovered(true); }}
        onMouseLeave={() => setHovered(false)}
        onClick={() => { updateCoords(); setPinned(p => !p); }}
      >
        <Users size={11} />
      </span>
      {open && (
        <div className="ti-card" style={{ top: coords.top, left: coords.left }}>
          <span className="ti-label">Trade Interest</span>
          <span className="ti-teams">{teams.join("  ·  ")}</span>
        </div>
      )}
    </>
  );
}