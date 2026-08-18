import { LockKeyhole } from "lucide-react";

export default function PlayerTable({ title, players, step }) {
  return (
    <section className="table-panel">
      <div className="panel-title"><h2>{title}</h2><span>{players.length} players</span></div>
      <div className="table-scroll"><table><thead><tr><th>Name</th><th>Pos</th><th>PV</th><th>Δ</th><th>Last trigger reason</th></tr></thead>
        <tbody>{players.map((player) => (
          <tr key={player.id} className={`${player.locked ? "locked" : ""} ${player.changedAt === step ? "changed" : ""}`}>
            <td className="player-name">{player.locked && <LockKeyhole size={13} />}{player.name}</td>
            <td>{player.position}</td><td className="pv">{player.pv.toFixed(2)}</td>
            <td className={player.delta > 0 ? "positive" : player.delta < 0 ? "negative" : ""}>{player.delta ? `${player.delta > 0 ? "+" : ""}${player.delta.toFixed(2)}` : "—"}</td>
            <td className="reason">{player.reason}</td>
          </tr>
        ))}</tbody>
      </table></div>
    </section>
  );
}