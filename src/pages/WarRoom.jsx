import BoardHeader from "@/components/warroom/BoardHeader";
import PlayerTable from "@/components/warroom/PlayerTable";
import RulesPanel from "@/components/warroom/RulesPanel";
import TradeTicker from "@/components/warroom/TradeTicker";
import useTradeSimulation from "@/hooks/useTradeSimulation";
import "@/styles/warroom.css";

export default function WarRoom() {
  const simulation = useTradeSimulation();
  const assets = simulation.players.filter((player) => player.bucket === "Cardinals Asset");
  const targets = simulation.players.filter((player) => player.bucket === "Trade Target");
  return (
    <main className="war-room">
      <BoardHeader step={simulation.step} total={simulation.trades.length} />
      <div className="dashboard-grid">
        <div className="board-column">
          <PlayerTable title="Cardinals Assets" players={assets} step={simulation.step} />
          <PlayerTable title="Trade Targets" players={targets} step={simulation.step} />
        </div>
        <TradeTicker result={simulation.result} step={simulation.step} total={simulation.trades.length} onNext={simulation.advance} onReset={simulation.reset} />
        <RulesPanel rules={simulation.rules} setRules={simulation.setRules} />
      </div>
    </main>
  );
}