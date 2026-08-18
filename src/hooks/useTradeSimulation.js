import { useState } from "react";
import { placeholderPlayers, placeholderTrades } from "@/data/deadlineData";

const initialRules = { marketHeat: true, Scarcity: true, "Buyer Exit": true, "Target Cost Signal": true };

export default function useTradeSimulation() {
  const [players, setPlayers] = useState(() => placeholderPlayers.map((p) => ({ ...p, delta: 0, reason: "—", locked: false })));
  const [rules, setRules] = useState(initialRules);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);

  const advance = () => {
    const trade = placeholderTrades[step];
    if (!trade) return;
    const changes = [];
    setPlayers((current) => current.map((player) => {
      let factor = 1;
      const reasons = [];
      if (rules.marketHeat && player.role === trade.role) { factor *= 1.025; reasons.push(`${trade.role} Market Heat +2.5%`); }
      if (trade.targetImpact?.playerId === player.id && rules[trade.targetImpact.type]) { factor *= 1 + trade.targetImpact.percent; reasons.push(`${trade.targetImpact.type} ${trade.targetImpact.percent > 0 ? "+" : ""}${trade.targetImpact.percent * 100}%`); }
      const nextPv = Number((player.pv * factor).toFixed(2));
      const delta = Number((nextPv - player.pv).toFixed(2));
      if (delta) changes.push({ name: player.name, delta, pv: nextPv, rationale: reasons.join(" · ") });
      return { ...player, pv: nextPv, delta, reason: reasons.join(" · ") || player.reason, locked: player.locked || trade.lockPlayerIds?.includes(player.id), changedAt: delta ? step + 1 : player.changedAt };
    }));
    setResult({ trade, changes });
    setStep((value) => value + 1);
  };

  return { players, trades: placeholderTrades, rules, setRules, step, result, advance };
}