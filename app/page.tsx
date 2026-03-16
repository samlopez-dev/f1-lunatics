"use client";

import { useState } from "react";
import {
  RACES, TEAM_COLORS,
  computeStandings, computeProgressionData,
} from "./data";

const standings = computeStandings();
const progressionData = computeProgressionData();
const completedRaces = RACES.filter((r) => r.completed);
const upcomingRaces = RACES.filter((r) => !r.completed);
const leaderPoints = standings[0]?.totalPoints ?? 0;

// Position medal colors
const MEDAL: Record<number, string> = {
  1: "#FFD700",
  2: "#C0C0C0",
  3: "#CD7F32",
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"standings" | "races" | "chart" | "calendar">("standings");

  return (
    <main className="min-h-screen bg-[#0f0f13] text-white">

      {/* ── HEADER ── */}
      <header className="relative border-b border-white/10 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e10600]" />
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/f1-logo.png"
              alt="F1 Lunatics logo"
            />
            <div>
              <p className="text-[#e10600] text-[10px] font-black tracking-[0.4em] uppercase mb-2">
                Fantasy League · 2026 Season
              </p>
              <h1 className="text-6xl sm:text-7xl font-black uppercase tracking-tighter leading-none">
                F1 <span className="text-[#e10600]">Lunatics</span>
              </h1>
            </div>
          </div>
          <div className="flex gap-6 text-right">
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-widest">Races Done</p>
              <p className="text-3xl font-black">{completedRaces.length}<span className="text-white/20 text-lg">/{RACES.length}</span></p>
            </div>
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-widest">Next Race</p>
              <p className="text-base font-bold leading-tight">{upcomingRaces[0]?.flag} {upcomingRaces[0]?.name.replace(" GP", "")}</p>
              <p className="text-white/30 text-xs">{upcomingRaces[0] ? formatDate(upcomingRaces[0].date) : "—"}</p>
            </div>
          </div>
        </div>

        {/* Nav tabs */}
        <div className="max-w-5xl mx-auto px-6 flex gap-1 mt-2">
          {(["standings", "races", "chart", "calendar"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-all rounded-t-lg ${
                activeTab === tab
                  ? "bg-[#e10600] text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {tab === "standings" ? "🏆 Standings" :
               tab === "races"     ? "🏁 Results"   :
               tab === "chart"     ? "📈 Progress"  :
                                     "📅 Calendar"  }
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* ── STANDINGS ── */}
        {activeTab === "standings" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5 text-white/40 text-[10px] uppercase tracking-widest">
                    <th className="py-3 px-5 text-left w-14">Pos</th>
                    <th className="py-3 px-5 text-left">Team</th>
                    <th className="py-3 px-5 text-left hidden sm:table-cell">Manager</th>
                    <th className="py-3 px-5 text-right hidden md:table-cell">Race Pts</th>
                    <th className="py-3 px-5 text-right hidden md:table-cell">Adj</th>
                    <th className="py-3 px-5 text-right">Total</th>
                    <th className="py-3 px-5 text-right hidden sm:table-cell">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((entry) => {
                    const color = TEAM_COLORS[entry.team.id] ?? "#888";
                    return (
                      <tr key={entry.team.id} className="border-t border-white/5 hover:bg-white/5 transition-colors group">
                        <td className="py-4 px-5">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                            style={{
                              background: MEDAL[entry.position] ?? "#ffffff10",
                              color: MEDAL[entry.position] ? "#000" : "#ffffff60",
                            }}
                          >
                            {entry.position}
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-1 h-10 rounded-full shrink-0" style={{ background: color }} />
                            <div>
                              <p className="font-black text-sm leading-tight">{entry.team.name}</p>
                              <p className="text-white/30 text-xs sm:hidden">{entry.team.flag} {entry.team.manager}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-5 hidden sm:table-cell">
                          <span className="text-sm text-white/60">{entry.team.flag} {entry.team.manager}</span>
                        </td>
                        <td className="py-4 px-5 text-right hidden md:table-cell text-white/50">
                          {entry.raceTotal}
                        </td>
                        <td className="py-4 px-5 text-right hidden md:table-cell">
                          {entry.team.adjustmentPoints > 0 ? (
                            <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 font-bold">
                              +{entry.team.adjustmentPoints}*
                            </span>
                          ) : (
                            <span className="text-white/20">—</span>
                          )}
                        </td>
                        <td className="py-4 px-5 text-right">
                          <span className="text-xl font-black" style={{ color }}>{entry.totalPoints}</span>
                        </td>
                        <td className="py-4 px-5 text-right hidden sm:table-cell text-white/30 text-sm">
                          {entry.gap === 0 ? <span className="text-[#e10600] font-black text-xs">LEADER</span> : `-${entry.gap}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footnote */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm">
              <p className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-2">⚠️ Points Adjustment Note</p>
              <p className="text-white/50 text-xs leading-relaxed">
                <strong className="text-white/70">Professional Athlete</strong> (+225 pts) and{" "}
                <strong className="text-white/70">corn wheel drive</strong> (+135 pts) had to create new Fantasy accounts
                after losing access to their originals. These adjusted points represent their Race 1 scores that could
                not be transferred to the new accounts.
              </p>
            </div>
          </div>
        )}

        {/* ── RACE RESULTS ── */}
        {activeTab === "races" && (
          <div className="space-y-4 animate-in fade-in">
            {completedRaces.length === 0 ? (
              <div className="text-center py-20 text-white/30">No races completed yet.</div>
            ) : (
              [...completedRaces].reverse().map((race) => (
                <div key={race.round} className="rounded-2xl border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 bg-white/5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{race.flag}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-black uppercase tracking-wide">{race.name}</p>
                          {race.sprint && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FF8000]/20 text-[#FF8000] font-black uppercase tracking-wider">Sprint</span>
                          )}
                        </div>
                        <p className="text-xs text-white/30">{race.circuit} · {formatDate(race.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/20 text-xs uppercase tracking-widest">Round</p>
                      <p className="text-3xl font-black text-white/20">{race.round}</p>
                    </div>
                  </div>
                  <div className="divide-y divide-white/5">
                    {standings
                      .slice()
                      .sort((a, b) => (b.team.racePoints[race.round - 1] ?? 0) - (a.team.racePoints[race.round - 1] ?? 0))
                      .map((entry, idx) => {
                        const pts = entry.team.racePoints[race.round - 1] ?? 0;
                        const color = TEAM_COLORS[entry.team.id] ?? "#888";
                        return (
                          <div key={entry.team.id} className="flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-colors">
                            <span className="text-xs font-black text-white/30 w-4">{idx + 1}</span>
                            <div className="w-1 h-6 rounded-full" style={{ background: color }} />
                            <div className="flex-1">
                              <p className="font-bold text-sm">{entry.team.name}</p>
                              <p className="text-white/30 text-xs">{entry.team.flag} {entry.team.manager}</p>
                            </div>
                            <span className="font-black text-lg" style={{ color }}>{pts > 0 ? `+${pts}` : "—"}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── PROGRESSION CHART ── */}
        {activeTab === "chart" && (
          <div className="animate-in fade-in">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-6">Cumulative Points After Each Race</p>
              <ProgressionChart />
            </div>
          </div>
        )}

        {/* ── CALENDAR ── */}
        {activeTab === "calendar" && (
          <div className="animate-in fade-in space-y-3">
            {RACES.map((race) => (
              <div
                key={race.round}
                className={`flex items-center gap-4 rounded-xl border px-5 py-4 transition-all ${
                  race.completed
                    ? "border-white/5 opacity-40"
                    : "border-white/10 hover:border-[#e10600]/30 bg-white/[0.02]"
                }`}
              >
                <span className="text-3xl shrink-0">{race.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-black uppercase tracking-wide text-sm">{race.name}</p>
                    {race.sprint && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FF8000]/20 text-[#FF8000] font-black uppercase tracking-wider">Sprint</span>
                    )}
                  </div>
                  <p className="text-white/30 text-xs truncate">{race.circuit}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-white/40">{formatDate(race.date)}</p>
                  {race.completed ? (
                    <span className="text-[10px] text-white/20 uppercase tracking-widest">Completed</span>
                  ) : (
                    <span className="text-[10px] text-[#e10600] font-black uppercase tracking-widest">Round {race.round}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 mt-12 py-6 text-center text-xs text-white/20">
        F1 Lunatics · 2026 Fantasy League · Edit <code className="bg-white/10 px-1 py-0.5 rounded">app/data.ts</code> after each race
      </footer>
    </main>
  );
}

// ── PROGRESSION CHART ────────────────────────────────────────
function ProgressionChart() {
  const data = computeProgressionData();
  const completedCount = completedRaces.length;
  if (completedCount === 0) {
    return <p className="text-center text-white/30 py-10">No races completed yet.</p>;
  }

  const allValues = data.flatMap((d) => d.cumulative);
  const maxVal = Math.max(...allValues, 1);
  const minVal = 0;
  const range = maxVal - minVal;

  const W = 600;
  const H = 300;
  const PAD = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  function xPos(i: number) {
    return PAD.left + (i / Math.max(completedCount - 1, 1)) * chartW;
  }
  function yPos(val: number) {
    return PAD.top + chartH - ((val - minVal) / range) * chartH;
  }

  const raceLabels = completedRaces.map((r) => r.name.replace(" GP", "").replace("Australian", "AUS").replace("Chinese", "CHN"));

  return (
    <div className="space-y-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 320 }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
          const y = PAD.top + chartH * (1 - frac);
          const val = Math.round(minVal + range * frac);
          return (
            <g key={frac}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="white" strokeOpacity={0.06} strokeDasharray="4 4" />
              <text x={PAD.left - 8} y={y + 4} textAnchor="end" fontSize={9} fill="rgba(255,255,255,0.3)">{val}</text>
            </g>
          );
        })}

        {/* Race labels on x-axis */}
        {completedRaces.map((race, i) => (
          <text
            key={race.round}
            x={xPos(i)}
            y={H - PAD.bottom + 16}
            textAnchor="middle"
            fontSize={9}
            fill="rgba(255,255,255,0.3)"
          >
            {raceLabels[i]}
          </text>
        ))}

        {/* Lines per team */}
        {data.map(({ team, cumulative }) => {
          const color = TEAM_COLORS[team.id] ?? "#888";
          const points = cumulative.map((val, i) => `${xPos(i)},${yPos(val)}`).join(" ");
          const lastX = xPos(cumulative.length - 1);
          const lastY = yPos(cumulative[cumulative.length - 1] ?? 0);
          return (
            <g key={team.id}>
              <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth={2.5}
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={0.9}
              />
              {cumulative.map((val, i) => (
                <circle key={i} cx={xPos(i)} cy={yPos(val)} r={4} fill={color} />
              ))}
              {/* Final label */}
              <text x={lastX + 6} y={lastY + 4} fontSize={8} fill={color} fontWeight="bold">
                {cumulative[cumulative.length - 1]}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center">
        {data.map(({ team }) => {
          const color = TEAM_COLORS[team.id] ?? "#888";
          return (
            <div key={team.id} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ background: color }} />
              <span className="text-white/60">{team.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── HELPERS ──────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}