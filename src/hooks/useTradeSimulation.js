import { useState } from "react";
import { players as playerData, trades as tradeData } from "@/data/deadlineData";

function positionToRole(position) {
  if (position === "SP") return "SP";
  if (position === "RP" || position === "CL") return "RP";
  return "Position Player";
}

const RULE_DIRECTIONS = {
  Scarcity: 0.05,
  "Target Cost Signal": 0.05,
  "Buyer Exit": -0.05,
};

const initialRules = {
  marketHeat: true,
  Scarcity: true,
  "Buyer Exit": true,
  "Target Cost Signal": true,
};

export default function useTradeSimulation() {
  const [players, setPlayers] = useState(() =>
    playerData.map((p) => ({
      ...p,
      role: positionToRole(p.position),
      originalPv: p.pv,
      pv: p.pv,
      delta: 0,
      reason: "—",
      locked: false,
      changedAt: 0,
    }))
  );
  const [rules, setRules] = useState(initialRules);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [heatMultipliers, setHeatMultipliers] = useState({
    SP: 1.0,
    RP: 1.0,
    "Position Player": 1.0,
  });
  const [targetedAdjustments, setTargetedAdjustments] = useState({});

  const advance = () => {
    const trade = tradeData[step];
    if (!trade) return;

    // Bump market heat multiplier for the trade's role (+2.5% additive)
    const newHeat = { ...heatMultipliers };
    if (rules.marketHeat) newHeat[trade.role] += 0.025;

    // Apply targeted comp adjustment or lock
    const newAdjustments = { ...targetedAdjustments };
    const isDealCompleted = trade.ruleType === "Deal Completed";

    if (trade.ruleType && trade.affectedPlayer && !isDealCompleted && rules[trade.ruleType]) {
      newAdjustments[trade.affectedPlayer] =
        (newAdjustments[trade.affectedPlayer] || 0) + (RULE_DIRECTIONS[trade.ruleType] || 0);
    }

    // Recalculate every non-locked player from original PV
    const changes = [];
    const newPlayers = players.map((player) => {
      if (player.locked) return { ...player, delta: 0 };

      const beingLocked = isDealCompleted && trade.affectedPlayer === player.name;

      if (beingLocked) {
        changes.push({
          name: player.name,
          delta: 0,
          pv: player.pv,
          rationale: "Deal Completed: locked",
          locked: true,
        });
        return {
          ...player,
          delta: 0,
          reason: "Deal Completed: locked",
          locked: true,
          changedAt: step + 1,
        };
      }

      const newPv = Number(
        (player.originalPv * newHeat[player.role] * (1 + (newAdjustments[player.name] || 0))).toFixed(2)
      );
      const delta = Number((newPv - player.pv).toFixed(2));

      const reasons = [];
      if (rules.marketHeat && player.role === trade.role)
        reasons.push(`${trade.role} Market Heat +2.5%`);
      if (trade.affectedPlayer === player.name && trade.ruleType && rules[trade.ruleType]) {
        const dir = RULE_DIRECTIONS[trade.ruleType] || 0;
        reasons.push(`${trade.ruleType} ${dir > 0 ? "+" : ""}${(dir * 100).toFixed(0)}%`);
      }

      if (delta !== 0) {
        changes.push({ name: player.name, delta, pv: newPv, rationale: reasons.join(" · ") });
      }

      return {
        ...player,
        pv: newPv,
        delta,
        reason: reasons.join(" · ") || player.reason,
        changedAt: delta !== 0 ? step + 1 : player.changedAt,
      };
    });

    setHeatMultipliers(newHeat);
    setTargetedAdjustments(newAdjustments);
    setPlayers(newPlayers);
    setResult({ trade, changes });
    setStep((value) => value + 1);
  };

  const reset = () => {
    setPlayers(
      playerData.map((p) => ({
        ...p,
        role: positionToRole(p.position),
        originalPv: p.pv,
        pv: p.pv,
        delta: 0,
        reason: "—",
        locked: false,
        changedAt: 0,
      }))
    );
    setRules(initialRules);
    setStep(0);
    setResult(null);
    setHeatMultipliers({ SP: 1.0, RP: 1.0, "Position Player": 1.0 });
    setTargetedAdjustments({});
  };

  return { players, trades: tradeData, rules, setRules, step, result, advance, reset };
}