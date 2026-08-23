import { useState } from "react";
import BoardHeader from "@/components/warroom/BoardHeader";
import PlayerTable from "@/components/warroom/PlayerTable";
import RulesPanel from "@/components/warroom/RulesPanel";
import TradeTicker from "@/components/warroom/TradeTicker";
import LivePipeline from "@/components/warroom/LivePipeline";
import useTradeSimulation from "@/hooks/useTradeSimulation";
import "@/styles/warroom.css";

export default function WarRoom() {
  const [mode, setMode] = useState("simulation");
  const simulation = useTradeSimulation();
  const assets = simulation.players.filter((player) => player.bucket === "Cardinals Asset");
  const targets = simulation.players.filter((player) => player.bucket === "Trade Target");
  return (
    <main className="war-room">
      <BoardHeader step={simulation.step} total={simulation.trades.length} mode={mode} setMode={setMode} />
      <div className="dashboard-grid">
        <div className="board-column">
          <PlayerTable title="Cardinals Assets" players={assets} step={simulation.step} />
          <PlayerTable title="Trade Targets" players={targets} step={simulation.step} />
        </div>
        {mode === "simulation" ? (
          <TradeTicker result={simulation.result} step={simulation.step} total={simulation.trades.length} onNext={simulation.advance} onReset={simulation.reset} players={simulation.players} onSimulateCustom={simulation.simulateCustomTrade} onClearCustom={simulation.clearCustomTest} customActive={simulation.customActive} />
        ) : (
          <LivePipeline />
        )}
        <RulesPanel rules={simulation.rules} setRules={simulation.setRules} />
      </div>
    </main>
  );
}