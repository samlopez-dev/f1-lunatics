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

const COUNTRY_CODES: Record<string, string> = {
  "Australia":    "au", "China":        "cn", "Japan":        "jp",
  "Bahrain":      "bh", "Saudi Arabia": "sa", "USA":          "us",
  "Canada":       "ca", "Monaco":       "mc", "Spain":        "es",
  "Austria":      "at", "UK":           "gb", "Belgium":      "be",
  "Hungary":      "hu", "Netherlands":  "nl", "Italy":        "it",
  "Azerbaijan":   "az", "Singapore":    "sg", "Mexico":       "mx",
  "Brazil":       "br", "Qatar":        "qa", "UAE":          "ae",
  "Colombia":     "co",
};

function Flag({ country, size = 16 }: { country: string; size?: number }) {
  const code = COUNTRY_CODES[country] ?? "un";
  return (
    <img
      src={`/flags/${code}.svg`}
      width={size}
      height={Math.round(size * 0.75)}
      alt={country}
      className="inline-block rounded-[2px] shrink-0"
      style={{ objectFit: "cover" }}
    />
  );
}

const MEDAL: Record<number, string> = {
  1: "#d97706", // amber — readable gold
  2: "#6b7280", // medium gray — readable silver  
  3: "#92400e", // brown — readable bronze
};

// ── DARK THEME — balanced, accessible, not harsh ──────────────
const D = {
  main:        "bg-[#0f0f13] text-[#e8e8e8]",
  header:      "border-[#2a2a32]",
  cardBorder:  "border-[#2a2a32]",
  cardBg:      "bg-[#16161c]",
  tableHead:   "bg-[#1a1a22] text-[#888896]",
  tableRow:    "border-[#22222a] hover:bg-[#1c1c24]",
  textPrimary: "text-[#e8e8e8]",
  textMuted:   "text-[#a0a0b0]",
  textFaint:   "text-[#72728a]",
  textVfaint:  "text-[#52526a]",
  divider:     "divide-[#22222a]",
  footerBorder:"border-[#22222a]",
  footerText:  "text-[#52526a]",
  calCard:     "border-[#2a2a32] bg-[#16161c]",
  calDone:     "border-[#22222a] opacity-40",
  tabInactive: "text-[#72728a] hover:text-[#b0b0c0]",
  raceHeader:  "bg-[#1a1a22] border-[#2a2a32]",
  raceHover:   "hover:bg-[#1c1c24]",
  noteText:    "text-[#a0a0b0]",
  noteStrong:  "text-[#c8c8d8]",
  adjDash:     "text-[#52526a]",
  toggleBorder:"border-[#3a3a4a] text-[#a0a0b0] hover:text-[#e8e8e8] hover:border-[#5a5a6a]",
  codeBlock:   "bg-[#1a1a22]",
  positionFallbackBg: "#2a2a3a",
  positionFallbackText: "#72728a",
  sprintPill:  "border border-[#FF8000]/40 text-[#FF8000]",
  adjPill:     "border border-amber-500/40 text-amber-400",
  leaderPill:  "border border-[#e10600]/40 text-[#e10600]",
  cancelledPill: "border border-red-400/40 text-red-400",
};

// ── LIGHT THEME — balanced, accessible, not washed out ────────
const L = {
  main:        "bg-[#f4f4f6] text-[#1a1a1a]",
  header:      "border-[#dddde4]",
  cardBorder:  "border-[#dddde4]",
  cardBg:      "bg-white",
  tableHead:   "bg-[#ececf0] text-[#666672]",
  tableRow:    "border-[#e8e8ee] hover:bg-[#f0f0f4]",
  textPrimary: "text-[#1a1a1a]",
  textMuted:   "text-[#555560]",
  textFaint:   "text-[#888896]",
  textVfaint:  "text-[#aaaabc]",
  divider:     "divide-[#e8e8ee]",
  footerBorder:"border-[#dddde4]",
  footerText:  "text-[#aaaabc]",
  calCard:     "border-[#dddde4] bg-white",
  calDone:     "border-[#e8e8ee] opacity-40",
  tabInactive: "text-[#888896] hover:text-[#444450]",
  raceHeader:  "bg-[#ececf0] border-[#dddde4]",
  raceHover:   "hover:bg-[#f0f0f4]",
  noteText:    "text-[#555560]",
  noteStrong:  "text-[#2a2a2a]",
  adjDash:     "text-[#aaaabc]",
  toggleBorder:"border-[#ccccda] text-[#555560] hover:text-[#1a1a1a] hover:border-[#aaaabc]",
  codeBlock:   "bg-[#ececf0]",
  positionFallbackBg: "#e0e0e8",
  positionFallbackText: "#888896",
  sprintPill:  "border border-[#FF8000]/50 text-[#c05800]",
  adjPill:     "border border-amber-500/50 text-amber-600",
  leaderPill:  "border border-[#e10600]/40 text-[#e10600]",
  cancelledPill: "border border-red-400/50 text-red-500",
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
            <p className={`hidden sm:block text-base font-bold tracking-[0.2em] uppercase ${t.textPrimary}`}>
              F1 Lunatics · 2026 Season
            </p>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-right shrink-0">
            <div>
              <p className={`text-[9px] sm:text-[10px] uppercase tracking-widest ${t.textFaint}`}>Races Done</p>
              <p className={`text-xl sm:text-3xl font-black ${t.textPrimary}`}>
                {completedRaces.length}
                <span className={`text-sm sm:text-lg ${t.textVfaint}`}>/{RACES.length}</span>
              </p>
            </div>
            <div>
              <p className={`text-[9px] sm:text-[10px] uppercase tracking-widest ${t.textFaint}`}>Next Race</p>
              <p className={`text-sm sm:text-base font-bold leading-tight ${t.textPrimary} flex items-center justify-end gap-1.5`}>
                {upcomingRaces[0] && <Flag country={upcomingRaces[0].country} size={16} />}
                {upcomingRaces[0]?.name.replace(" GP", "")}
              </p>
              <p className={`text-[10px] sm:text-xs ${t.textFaint}`}>{upcomingRaces[0] ? formatDate(upcomingRaces[0].date) : "—"}</p>
            </div>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${t.toggleBorder}`}
            >
              {isDark ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                  Light
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                  Dark
                </>
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
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all rounded-t-lg ${
                activeTab === tab ? "bg-[#e10600] text-white" : t.tabInactive
              }`}
            >
              {tab === "standings" && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                </svg>
              )}
              {tab === "races" && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>
                </svg>
              )}
              {tab === "chart" && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                </svg>
              )}
              {tab === "calendar" && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
                </svg>
              )}
              {tab === "standings" ? "Standings" :
               tab === "races"     ? "Results"   :
               tab === "chart"     ? "Progress"  :
                                     "Calendar"  }
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
                    <th className="py-3 px-5 text-left w-14">
                      <span className="flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
                        Pos
                      </span>
                    </th>
                    <th className="py-3 px-5 text-left">
                      <span className="flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                        Team
                      </span>
                    </th>
                    <th className="py-3 px-5 text-left hidden sm:table-cell">
                      <span className="flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                        Manager
                      </span>
                    </th>
                    <th className="py-3 px-5 text-right hidden md:table-cell">
                      <span className="flex items-center justify-end gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                        Race Pts
                      </span>
                    </th>
                    <th className="py-3 px-5 text-right hidden md:table-cell">
                      <span className="flex items-center justify-end gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                        Adj
                      </span>
                    </th>
                    <th className="py-3 px-5 text-right">
                      <span className="flex items-center justify-end gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                        Total
                      </span>
                    </th>
                    <th className="py-3 px-5 text-right hidden sm:table-cell">
                      <span className="flex items-center justify-end gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        Gap
                      </span>
                    </th>
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
                              background: MEDAL[entry.position] ?? t.positionFallbackBg,
                              color: MEDAL[entry.position] ? "#ffffff" : t.positionFallbackText,
                            }}
                          >
                            {entry.position}
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-1 h-10 rounded-full shrink-0" style={{ background: color }} />
                            <div>
                              <p className={`font-black text-sm leading-tight ${t.textPrimary}`}>{entry.team.name}</p>
                              <p className={`text-xs sm:hidden ${t.textFaint}`}><Flag country={entry.team.country} size={12} /> {entry.team.manager}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-5 hidden sm:table-cell">
                          <span className={`text-sm ${t.textMuted} flex items-center gap-1.5`}><Flag country={entry.team.country} size={14} /> {entry.team.manager}</span>
                        </td>
                        <td className={`py-4 px-5 text-right hidden md:table-cell ${t.textMuted}`}>
                          {entry.raceTotal}
                        </td>
                        <td className="py-4 px-5 text-right hidden md:table-cell">
                          {entry.team.adjustmentPoints > 0 ? (
                            <span className={`text-xs px-2 py-1 rounded-full font-bold ${t.adjPill}`}>
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
                          {entry.gap === 0 ? <span className={`text-[10px] font-black px-2 py-1 rounded-full ${t.leaderPill}`}>LEADER</span> : `-${entry.gap}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footnote */}
            <div className={`rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm`}>
              <p className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-2">⚠️ Points Adjustment Note</p>
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
                      <span className="text-3xl"><Flag country={race.country} size={32} /></span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className={`font-black uppercase tracking-wide ${t.textPrimary}`}>{race.name}</p>
                          {race.sprint && (
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${t.sprintPill}`}>Sprint</span>
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
                              <p className={`font-bold text-sm ${t.textPrimary}`}>{entry.team.name}</p>
                              <p className={`text-xs ${t.textFaint} flex items-center gap-1.5`}><Flag country={entry.team.country} size={12} /> {entry.team.manager}</p>
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
                  race.completed || race.cancelled ? t.calDone : t.calCard
                }`}
              >
                <span className="shrink-0"><Flag country={race.country} size={32} /></span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`font-black uppercase tracking-wide text-sm ${race.cancelled ? "line-through" : ""} ${t.textPrimary}`}>{race.name}</p>
                    {race.sprint && !race.cancelled && (
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${t.sprintPill}`}>Sprint</span>
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
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${t.cancelledPill}`}>Cancelled</span>
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
        Site made by Sammy Lopez · F1 Lunatics · 2026 Fantasy League
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

  const gridColor  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const labelColor = isDark ? "#72728a"                : "#888896";

  function xPos(i: number) {
    return PAD.left + (i / Math.max(completedCount - 1, 1)) * chartW;
  }
  function yPos(val: number) {
    return PAD.top + chartH - ((val - minVal) / range) * chartH;
  }

  const raceLabels = completedRaces.map((r) =>
    r.name.replace(" GP", "").replace("Australian", "AUS").replace("Chinese", "CHN")
  );

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
              <span className={isDark ? "text-[#a0a0b0]" : "text-[#555560]"}>{team.name}</span>
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