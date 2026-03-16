"use client";

import { useState, useEffect } from "react";
import {
  RACES, TEAM_COLORS,
  computeStandings, computeProgressionData,
} from "./data";

const standings = computeStandings();
const progressionData = computeProgressionData();
const completedRaces = RACES.filter((r) => r.completed);
const upcomingRaces = RACES.filter((r) => !r.completed && !r.cancelled);
const leaderPoints = standings[0]?.totalPoints ?? 0;

const MEDAL: Record<number, string> = {
  1: "#FFD700",
  2: "#C0C0C0",
  3: "#CD7F32",
};

const D = {
  main:        "bg-[#0f0f13] text-white",
  header:      "border-white/10",
  cardBorder:  "border-white/10",
  cardBg:      "bg-white/[0.02]",
  tableHead:   "bg-white/5 text-white/40",
  tableRow:    "border-white/5 hover:bg-white/5",
  textMuted:   "text-white/60",
  textFaint:   "text-white/30",
  textVfaint:  "text-white/20",
  divider:     "divide-white/5",
  footerBorder:"border-white/5",
  footerText:  "text-white/20",
  calCard:     "border-white/10 bg-white/[0.02]",
  calDone:     "border-white/5 opacity-40",
  tabInactive: "text-white/40 hover:text-white/70",
  raceHeader:  "bg-white/5 border-white/10",
  raceHover:   "hover:bg-white/5",
  noteText:    "text-white/50",
  noteStrong:  "text-white/70",
  adjDash:     "text-white/20",
  chartGrid:   "rgba(255,255,255,0.06)",
  chartLabel:  "rgba(255,255,255,0.3)",
  toggleBg:    "bg-white/10",
  toggleIcon:  "opacity-40",
};

const L = {
  main:        "bg-[#f0f0f0] text-[#111]",
  header:      "border-black/10",
  cardBorder:  "border-black/10",
  cardBg:      "bg-black/[0.02]",
  tableHead:   "bg-black/5 text-black/40",
  tableRow:    "border-black/5 hover:bg-black/[0.04]",
  textMuted:   "text-black/50",
  textFaint:   "text-black/30",
  textVfaint:  "text-black/20",
  divider:     "divide-black/5",
  footerBorder:"border-black/10",
  footerText:  "text-black/30",
  calCard:     "border-black/10 bg-white",
  calDone:     "border-black/5 opacity-40",
  tabInactive: "text-black/40 hover:text-black/70",
  raceHeader:  "bg-black/5 border-black/10",
  raceHover:   "hover:bg-black/[0.03]",
  noteText:    "text-black/50",
  noteStrong:  "text-black/70",
  adjDash:     "text-black/20",
  chartGrid:   "rgba(0,0,0,0.06)",
  chartLabel:  "rgba(0,0,0,0.3)",
  toggleBg:    "bg-black/10",
  toggleIcon:  "opacity-30",
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"standings" | "races" | "chart" | "calendar">("standings");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("f1-theme");
    if (saved === "light") setIsDark(false);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("f1-theme", next ? "dark" : "light");
  }

  const t = isDark ? D : L;

  return (
    <main className={`min-h-screen transition-colors duration-300 ${t.main}`}>

      {/* ── HEADER ── */}
      <header className={`relative border-b overflow-hidden ${t.header}`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/f1-logo.png"
              alt="F1 Lunatics"
              className="h-56 sm:h-56 object-contain shrink-0"
            />
            <p className={`hidden sm:block text-base font-bold tracking-[0.2em] uppercase ${isDark ? "text-white" : "text-[#111]"}`}>
              F1 Lunatics · 2026 Season
            </p>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-right shrink-0">
            <div>
              <p className={`text-[9px] sm:text-[10px] uppercase tracking-widest ${t.textFaint}`}>Races Done</p>
              <p className="text-xl sm:text-3xl font-black">{completedRaces.length}<span className={`text-sm sm:text-lg ${t.textVfaint}`}>/{RACES.length}</span></p>
            </div>
            <div>
              <p className={`text-[9px] sm:text-[10px] uppercase tracking-widest ${t.textFaint}`}>Next Race</p>
              <p className="text-sm sm:text-base font-bold leading-tight">{upcomingRaces[0]?.flag} {upcomingRaces[0]?.name.replace(" GP", "")}</p>
              <p className={`text-[10px] sm:text-xs ${t.textFaint}`}>{upcomingRaces[0] ? formatDate(upcomingRaces[0].date) : "—"}</p>
            </div>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${t.toggleBg} hover:scale-110`}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Nav tabs */}
        <div className="max-w-5xl mx-auto px-6 flex gap-1 mt-2">
          {(["standings", "races", "chart", "calendar"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all rounded-t-lg ${
                activeTab === tab
                  ? "bg-[#e10600] text-white"
                  : t.tabInactive
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
            <div className={`rounded-2xl overflow-hidden border ${t.cardBorder}`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className={`${t.tableHead} text-[10px] uppercase tracking-widest`}>
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
                      <tr key={entry.team.id} className={`border-t transition-colors ${t.tableRow}`}>
                        <td className="py-4 px-5">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                            style={{
                              background: MEDAL[entry.position] ?? (isDark ? "#ffffff10" : "#00000010"),
                              color: MEDAL[entry.position] ? "#000" : (isDark ? "#ffffff60" : "#00000060"),
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
                              <p className={`text-xs sm:hidden ${t.textFaint}`}>{entry.team.flag} {entry.team.manager}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-5 hidden sm:table-cell">
                          <span className={`text-sm ${t.textMuted}`}>{entry.team.flag} {entry.team.manager}</span>
                        </td>
                        <td className={`py-4 px-5 text-right hidden md:table-cell ${t.textMuted}`}>
                          {entry.raceTotal}
                        </td>
                        <td className="py-4 px-5 text-right hidden md:table-cell">
                          {entry.team.adjustmentPoints > 0 ? (
                            <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 font-bold">
                              +{entry.team.adjustmentPoints}*
                            </span>
                          ) : (
                            <span className={t.adjDash}>—</span>
                          )}
                        </td>
                        <td className="py-4 px-5 text-right">
                          <span className="text-xl font-black" style={{ color }}>{entry.totalPoints}</span>
                        </td>
                        <td className={`py-4 px-5 text-right hidden sm:table-cell text-sm ${t.textFaint}`}>
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
              <p className={`text-xs leading-relaxed ${t.noteText}`}>
                <strong className={t.noteStrong}>Professional Athlete</strong> (+225 pts) and{" "}
                <strong className={t.noteStrong}>corn wheel drive</strong> (+135 pts) had to create new Fantasy accounts
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
              <div className={`text-center py-20 ${t.textFaint}`}>No races completed yet.</div>
            ) : (
              [...completedRaces].reverse().map((race) => (
                <div key={race.round} className={`rounded-2xl border overflow-hidden ${t.cardBorder}`}>
                  <div className={`flex items-center justify-between px-5 py-4 border-b ${t.raceHeader}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{race.flag}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-black uppercase tracking-wide">{race.name}</p>
                          {race.sprint && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FF8000]/20 text-[#FF8000] font-black uppercase tracking-wider">Sprint</span>
                          )}
                        </div>
                        <p className={`text-xs ${t.textFaint}`}>{race.circuit} · {formatDate(race.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs uppercase tracking-widest ${t.textVfaint}`}>Round</p>
                      <p className={`text-3xl font-black ${t.textVfaint}`}>{race.round}</p>
                    </div>
                  </div>
                  <div className={`divide-y ${t.divider}`}>
                    {standings
                      .slice()
                      .sort((a, b) => (b.team.racePoints[race.round - 1] ?? 0) - (a.team.racePoints[race.round - 1] ?? 0))
                      .map((entry, idx) => {
                        const pts = entry.team.racePoints[race.round - 1] ?? 0;
                        const color = TEAM_COLORS[entry.team.id] ?? "#888";
                        return (
                          <div key={entry.team.id} className={`flex items-center gap-4 px-5 py-3 transition-colors ${t.raceHover}`}>
                            <span className={`text-xs font-black w-4 ${t.textFaint}`}>{idx + 1}</span>
                            <div className="w-1 h-6 rounded-full" style={{ background: color }} />
                            <div className="flex-1">
                              <p className="font-bold text-sm">{entry.team.name}</p>
                              <p className={`text-xs ${t.textFaint}`}>{entry.team.flag} {entry.team.manager}</p>
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
            <div className={`rounded-2xl border p-6 ${t.cardBorder} ${t.cardBg}`}>
              <p className={`text-xs uppercase tracking-widest mb-6 ${t.textFaint}`}>Cumulative Points After Each Race</p>
              <ProgressionChart isDark={isDark} />
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
                  race.completed || race.cancelled
                    ? t.calDone
                    : t.calCard
                }`}
              >
                <span className="text-3xl shrink-0">{race.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`font-black uppercase tracking-wide text-sm ${race.cancelled ? "line-through" : ""}`}>{race.name}</p>
                    {race.sprint && !race.cancelled && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FF8000]/20 text-[#FF8000] font-black uppercase tracking-wider">Sprint</span>
                    )}
                  </div>
                  <p className={`text-xs truncate ${t.textFaint}`}>{race.circuit}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-xs ${t.textFaint}`}>{formatDate(race.date)}</p>
                  {!race.cancelled && !race.completed && (
                    <p className={`text-[10px] ${t.textFaint}`}>{race.racetimePST} PST</p>
                  )}
                  {race.completed ? (
                    <span className={`text-[10px] uppercase tracking-widest ${t.textVfaint}`}>Completed</span>
                  ) : race.cancelled ? (
                    <span className="text-[10px] text-red-500/60 font-black uppercase tracking-widest">Cancelled</span>
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
      <footer className={`border-t mt-12 py-6 text-center text-xs ${t.footerBorder} ${t.footerText}`}>
        Site made by Sammy Lopez · F1 Lunatics · 2026 Fantasy League · Edit <code className={`px-1 py-0.5 rounded ${isDark ? "bg-white/10" : "bg-black/10"}`}>app/data.ts</code> after each race
      </footer>
    </main>
  );
}

// ── PROGRESSION CHART ────────────────────────────────────────
function ProgressionChart({ isDark }: { isDark: boolean }) {
  const data = computeProgressionData();
  const completedCount = completedRaces.length;
  if (completedCount === 0) {
    return <p className="text-center py-10 opacity-30">No races completed yet.</p>;
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

  const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const labelColor = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";

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
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
          const y = PAD.top + chartH * (1 - frac);
          const val = Math.round(minVal + range * frac);
          return (
            <g key={frac}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke={gridColor} strokeDasharray="4 4" />
              <text x={PAD.left - 8} y={y + 4} textAnchor="end" fontSize={9} fill={labelColor}>{val}</text>
            </g>
          );
        })}
        {completedRaces.map((race, i) => (
          <text key={race.round} x={xPos(i)} y={H - PAD.bottom + 16} textAnchor="middle" fontSize={9} fill={labelColor}>
            {raceLabels[i]}
          </text>
        ))}
        {data.map(({ team, cumulative }) => {
          const color = TEAM_COLORS[team.id] ?? "#888";
          const points = cumulative.map((val, i) => `${xPos(i)},${yPos(val)}`).join(" ");
          const lastX = xPos(cumulative.length - 1);
          const lastY = yPos(cumulative[cumulative.length - 1] ?? 0);
          return (
            <g key={team.id}>
              <polyline points={points} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" opacity={0.9} />
              {cumulative.map((val, i) => (
                <circle key={i} cx={xPos(i)} cy={yPos(val)} r={4} fill={color} />
              ))}
              <text x={lastX + 6} y={lastY + 4} fontSize={8} fill={color} fontWeight="bold">
                {cumulative[cumulative.length - 1]}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-3 justify-center">
        {data.map(({ team }) => {
          const color = TEAM_COLORS[team.id] ?? "#888";
          return (
            <div key={team.id} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ background: color }} />
              <span className="opacity-60">{team.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}