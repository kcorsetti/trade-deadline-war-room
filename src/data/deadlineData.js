export const placeholderPlayers = [
  { id: "cardinal-sp", name: "Cardinals Asset A", bucket: "Cardinals Asset", position: "SP", role: "SP", pv: 18.0 },
  { id: "cardinal-rp", name: "Cardinals Asset B", bucket: "Cardinals Asset", position: "RP", role: "RP", pv: 9.0 },
  { id: "target-sp", name: "Trade Target A", bucket: "Trade Target", position: "SP", role: "SP", pv: 24.0 },
  { id: "target-position", name: "Trade Target B", bucket: "Trade Target", position: "OF", role: "Position Player", pv: 21.0 },
];

export const placeholderTrades = [
  {
    id: "trade-1",
    headline: "Placeholder wire headline: starting pitcher changes clubs",
    role: "SP",
    eventType: "League trade",
    targetImpact: { playerId: "target-sp", type: "Scarcity", percent: 0.05, rationale: "A comparable starter leaving the market tightens remaining supply." },
  },
  {
    id: "trade-2",
    headline: "Placeholder wire headline: Cardinals complete a bullpen trade",
    role: "RP",
    eventType: "Cardinals trade",
    lockPlayerIds: ["cardinal-rp"],
  },
  {
    id: "trade-3",
    headline: "Placeholder wire headline: position-player buyer exits market",
    role: "Position Player",
    eventType: "League trade",
    targetImpact: { playerId: "target-position", type: "Buyer Exit", percent: -0.05, rationale: "One plausible buyer filling its need reduces demand for this target." },
  },
];