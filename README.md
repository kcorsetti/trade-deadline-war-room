# Cardinals Trade Value Board

A trade-deadline "war room" simulation that automates present-value adjustments for a roster of players as trades occur around the league. This is built to demonstrate how AI can remove the manual, repetitive work of re-pricing assets on trade deadline day, so analysts can spend that time on evaluation and negotiation instead.

**Live demo:** https://cardinal-trade-board.base44.app/

> This is an independent personal project. It is not affiliated with, endorsed by, or built on behalf of the St. Louis Cardinals, Major League Baseball, or any MLB club.

---

## What this is

Every player on the board carries a PV: a dollar-denominated surplus-value estimate. As trades happen elsewhere in the league, the board updates automatically where some effects apply broadly across a whole position group, others target one specific player with a stated reason, and every change shows its rationale rather than just a number moving.

The point of this project isn't the specific valuations, but the automation layer sitting on top of them. The rules and dataset here are a stand-in for whatever valuation model an actual front office already trusts; what's being demonstrated is that the process of watching for trades and updating values can be automated, with a human reviewing and overriding the output rather than doing the recalculation by hand.

**Core features:**
- **Simulation Wire:** replays real, curated trades from an actual MLB trade deadline in sequence, showing each one's effect on the board
- **Custom Trade:** test a hypothetical trade scenario of your own, independent of the scripted sequence
- **Live Mode:** a display of the architecture that would drive this off real trade-news headlines, including the actual parsing pipeline (headline in, structured event out) and an RSS-based ingestion approach; shown for illustration, not connected to a live feed
- **Rules Engine:** every adjustment rule is visible and independently toggle-able, so it's clear the logic is swappable, not hardcoded
- **How This Works:** a plain-language explainer of the calculation and adjustment methodology, built into the app itself

## How PV is calculated

Each player's PV is a projected surplus value: what they'd be worth on the open market, minus what they actually cost, summed across their remaining years of team control and discounted to present value.

- **Baseline performance:** a recency-weighted average of recent seasons (with the current season prorated to a full-season pace), with a documented manual override available for cases the formula misreads (a real breakout, a rookie with too small a sample, etc.)
- **Market value:** baseline performance converted to open-market dollars using tiered $/WAR rates, with a modest position weight (starters priced above relievers)
- **Cost:** actual or estimated salary for pre-arbitration minimum, an arbitration estimate, or a signed contract's AAV
- **Time horizon:** projected across each remaining year of control, with the current season treated as a partial-year stub and future years discounted back to present value

## How PV adjusts as trades occur

Two layers, both feeding the same underlying formula:

- **Market Heat** *(automatic, board-wide):* every trade nudges a small multiplier for its broad role category (starting pitching, relief pitching, position players) where each departure thins the remaining pool at that role, so everyone left in that category ticks up slightly. No per-player mapping required.
- **Targeted Comp Impact** *(curated):* a smaller set of trades also carry a direct, named effect on one specific player, tagged as one of three types: **Scarcity** (a direct comp gets traded, remaining sellers gain value), **Buyer Exit** (a plausible suitor fills its need elsewhere, demand drops), or **Target Cost Signal** (a trade target's own club signals its stance, shifting acquisition cost).

## Tech stack

React, built and exported via [Base44](https://base44.com). UI components from shadcn/ui and Radix, icons from Lucide.

## Running locally

```bash
git clone https://github.com/kcorsetti/trade-deadline-war-room.git
cd trade-deadline-war-room
npm install
npm run dev
```

Open the local URL Vite prints in the terminal. The trade-board data and logic (`src/data/deadlineData.js`, `src/hooks/useTradeSimulation.js`) run entirely client-side and don't require any backend connection to explore.

## A note on the data

Every player, PV figure, valuation formula, and adjustment rule in this project is an **illustrative placeholder** built to demonstrate the automation architecture. None of it reflects any team's actual internal valuations, methodology, or proprietary data. Real player names are used against a fictional valuation model for realism, not accuracy.

## Author

Built by Ken Corsetti: https://www.linkedin.com/in/kcorsetti/ / https://wbanalytics.substack.com/.
