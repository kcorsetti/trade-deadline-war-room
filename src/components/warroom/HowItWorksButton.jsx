import { useState } from "react";
import { Info, X } from "lucide-react";

export default function HowItWorksButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="how-button" onClick={() => setOpen(true)}>
        <Info size={14} /> How This Works
      </button>
      {open && (
        <div className="how-overlay" onClick={() => setOpen(false)}>
          <div className="how-modal" onClick={e => e.stopPropagation()}>
            <div className="how-modal-header">
              <h2>How This Works</h2>
              <button className="how-close" onClick={() => setOpen(false)}><X size={18} /></button>
            </div>
            <div className="how-body">
              <div className="how-section">
                <span className="how-label">PV Calculation</span>
                <p>Baseline WAR is drawn from recent performance — current-season stats prorated to a 162-game pace, with an analyst override capability. That WAR is converted to an open-market dollar value via tiered $/WAR rates and a position weight, minus the player's actual salary cost. The resulting surplus is projected across the player's remaining years of club control and discounted to present value.</p>
              </div>
              <div className="how-section">
                <span className="how-label">PV Adjustments</span>
                <p>Two layers move PV in real time. <b>Market Heat</b> is automatic and role-wide — every trade fires a heat multiplier across the affected position group. <b>Targeted Comp Impact</b> is curated per trade, applying one of three rule types: <i>Scarcity</i> (a comparable asset leaves the market), <i>Buyer Exit</i> (a plausible suitor drops out), or <i>Target Cost Signal</i> (a comparable deal sets a new price benchmark). Each rule's rationale is displayed in the Deadline Wire as it fires.</p>
              </div>
              <p className="how-disclaimer">Dataset, valuation formula, and adjustment rules are illustrative placeholders demonstrating the automation architecture, not a representation of any team's actual internal model.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}