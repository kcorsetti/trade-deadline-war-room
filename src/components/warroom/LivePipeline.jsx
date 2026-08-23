import { useState } from "react";
import { Radio, ChevronDown, ChevronRight } from "lucide-react";

export default function LivePipeline() {
  const [showLogic, setShowLogic] = useState(false);
  return (
    <section className="ticker-panel live-pipeline">
      <div className="panel-title">
        <h2><Radio size={16} /> Live Feed</h2>
        <span className="ready-badge">Architecture Ready</span>
      </div>
      <div className="ticker-content">
        <p className="wire-label">LIVE PIPELINE</p>
        <p className="pipeline-desc">A raw trade headline arrives from a live news source. An LLM call parses it into the same structured format the queued events already use: role, players involved, and teams. The same Market Heat and Targeted Comp Impact rules fire automatically on every incoming event. No manual event curation is needed in live mode, since the parser identifies and maps those effects automatically instead of relying on a pre-built event list.







        </p>
        <button className="logic-toggle" onClick={() => setShowLogic((s) => !s)}>
          {showLogic ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          View parsing logic
        </button>
        {showLogic && (
          <>
          <p className="wire-label" style={{ marginTop: 14 }}>INGESTION LAYER</p>
          <div className="code-block">
            <pre>{`fetchLatestHeadlines() {

  // Poll MLB Trade Rumors' public transactions
  // RSS feed on a 30-second interval.
  setInterval(async () => {
    feed = await fetch(
      "https://www.mlbtraderumors.com/feed/atom"
    )
    entries = parseFeed(feed)

    for (entry of entries) {
      if (isNew(entry)) {
        headline = entry.title
        // Pass into the same parser the
        // simulation already uses
        parseTradeHeadline(headline)
      }
    }
  }, 30000)
}`}</pre>
          </div>
          <p className="wire-label" style={{ marginTop: 14 }}>PARSING LOGIC</p>
          <div className="code-block">
            <pre>{`parseTradeHeadline(headline) {

  // 1. Send the raw headline to the LLM with a
  //    schema describing the structured event format
  llmResponse = InvokeLLM({
    prompt: "Extract trade details from this headline: "
            + headline,
    response_json_schema: {
      acquiring_team: string,   // team getting the player
      trading_team:   string,   // team giving up the player
      player_name:    string,   // who was traded
      player_role:    string,   // SP, RP, or Position Player
      deal_type:      string,   // trade, waiver, cash, etc.
    }
  })

  // 2. Map the LLM output into the same
  //    structured event the simulation uses
  structuredEvent = {
    headline:    headline,
    role:        llmResponse.player_role,
    eventType:   llmResponse.deal_type,
    affectedPlayer: matchToRoster(
                       llmResponse.player_name),
    teams: [
      llmResponse.acquiring_team,
      llmResponse.trading_team
    ]
  }

  // 3. Fire the same rules the manual
  //    simulation already runs
  applyMarketHeat(structuredEvent)
  applyTargetedCompImpact(structuredEvent)

  return structuredEvent
}`}</pre>
          </div>
          </>
        )}
      </div>
    </section>);

}