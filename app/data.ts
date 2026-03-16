// ============================================================
//  F1 LUNATICS — FANTASY LEAGUE DATA  · 2026 SEASON
//  HOW TO UPDATE: After each race, add the points each team
//  scored that week to the `racePoints` array below.
// ============================================================

export type Team = {
  id: string;
  name: string;
  manager: string;
  flag: string;
  // Points earned per race in order (index 0 = Race 1, etc.)
  // Add a new number after every race weekend!
  racePoints: number[];
  // Extra points added due to account transfer issues
  adjustmentPoints: number;
  adjustmentNote?: string;
};

export type Race = {
  round: number;
  name: string;
  circuit: string;
  country: string;
  flag: string;
  date: string;
  completed: boolean;
  sprint: boolean;
};

// ── TEAMS ─────────────────────────────────────────────────────
// racePoints: index 0 = Australian GP, index 1 = Chinese GP, etc.
// After each race, add the new score to every team's array.
export const TEAMS: Team[] = [
  {
    id: "tigre",
    name: "Scuderia Tigre",
    manager: "Sammy Lopez",
    flag: "🇲🇽",
    racePoints: [266, 265],
    adjustmentPoints: 0,
  },
  {
    id: "archv",
    name: "ARCHV RACING",
    manager: "Kai Resillas",
    flag: "🇺🇸",
    racePoints: [259, 259],
    adjustmentPoints: 0,
  },
  {
    id: "cornwheel",
    name: "corn wheel drive",
    manager: "Sam Giron",
    flag: "🇺🇸",
    racePoints: [224, 223],
    adjustmentPoints: 135,
    adjustmentNote: "Points from Race 1 lost due to account transfer",
  },
  {
    id: "proathlete",
    name: "Professional Athlete",
    manager: "Dylan Nino",
    flag: "🇨🇴",
    racePoints: [183, 183],
    adjustmentPoints: 225,
    adjustmentNote: "Points from Race 1 lost due to account transfer",
  },
  {
    id: "clubz",
    name: "CLUB Z",
    manager: "Daniel Resillas",
    flag: "🇲🇽",
    racePoints: [179, 179],
    adjustmentPoints: 0,
  },
  {
    id: "solarium",
    name: "Solarium's Squad",
    manager: "Ethan Giron",
    flag: "🇺🇸",
    racePoints: [165, 164],
    adjustmentPoints: 0,
  },
];

// ── 2026 RACE CALENDAR ────────────────────────────────────────
export const RACES: Race[] = [
  { round: 1,  name: "Australian GP",          circuit: "Albert Park Circuit",                country: "Australia",    flag: "🇦🇺", date: "2026-03-08", completed: true,  sprint: false },
  { round: 2,  name: "Chinese GP",             circuit: "Shanghai International Circuit",     country: "China",        flag: "🇨🇳", date: "2026-03-15", completed: true,  sprint: true  },
  { round: 3,  name: "Japanese GP",            circuit: "Suzuka International Racing Course", country: "Japan",        flag: "🇯🇵", date: "2026-03-29", completed: false, sprint: false },
  { round: 4,  name: "Bahrain GP",             circuit: "Bahrain International Circuit",      country: "Bahrain",      flag: "🇧🇭", date: "2026-04-12", completed: false, sprint: false },
  { round: 5,  name: "Saudi Arabian GP",       circuit: "Jeddah Corniche Circuit",            country: "Saudi Arabia", flag: "🇸🇦", date: "2026-04-19", completed: false, sprint: false },
  { round: 6,  name: "Miami GP",               circuit: "Miami International Autodrome",      country: "USA",          flag: "🇺🇸", date: "2026-05-03", completed: false, sprint: true  },
  { round: 7,  name: "Canadian GP",            circuit: "Circuit Gilles Villeneuve",          country: "Canada",       flag: "🇨🇦", date: "2026-05-24", completed: false, sprint: true  },
  { round: 8,  name: "Monaco GP",              circuit: "Circuit de Monaco",                  country: "Monaco",       flag: "🇲🇨", date: "2026-06-07", completed: false, sprint: false },
  { round: 9,  name: "Barcelona-Catalunya GP", circuit: "Circuit de Barcelona-Catalunya",     country: "Spain",        flag: "🇪🇸", date: "2026-06-14", completed: false, sprint: false },
  { round: 10, name: "Austrian GP",            circuit: "Red Bull Ring",                      country: "Austria",      flag: "🇦🇹", date: "2026-06-28", completed: false, sprint: false },
  { round: 11, name: "British GP",             circuit: "Silverstone Circuit",                country: "UK",           flag: "🇬🇧", date: "2026-07-05", completed: false, sprint: true  },
  { round: 12, name: "Belgian GP",             circuit: "Circuit de Spa-Francorchamps",       country: "Belgium",      flag: "🇧🇪", date: "2026-07-19", completed: false, sprint: false },
  { round: 13, name: "Hungarian GP",           circuit: "Hungaroring",                        country: "Hungary",      flag: "🇭🇺", date: "2026-07-26", completed: false, sprint: false },
  { round: 14, name: "Dutch GP",               circuit: "Circuit Zandvoort",                  country: "Netherlands",  flag: "🇳🇱", date: "2026-08-23", completed: false, sprint: true  },
  { round: 15, name: "Italian GP",             circuit: "Autodromo Nazionale Monza",          country: "Italy",        flag: "🇮🇹", date: "2026-09-06", completed: false, sprint: false },
  { round: 16, name: "Madrid GP",              circuit: "Madring Street Circuit",             country: "Spain",        flag: "🇪🇸", date: "2026-09-13", completed: false, sprint: false },
  { round: 17, name: "Azerbaijan GP",          circuit: "Baku City Circuit",                  country: "Azerbaijan",   flag: "🇦🇿", date: "2026-09-26", completed: false, sprint: false },
  { round: 18, name: "Singapore GP",           circuit: "Marina Bay Street Circuit",          country: "Singapore",    flag: "🇸🇬", date: "2026-10-11", completed: false, sprint: true  },
  { round: 19, name: "US GP",                  circuit: "Circuit of the Americas",            country: "USA",          flag: "🇺🇸", date: "2026-10-25", completed: false, sprint: false },
  { round: 20, name: "Mexico City GP",         circuit: "Autodromo Hermanos Rodriguez",       country: "Mexico",       flag: "🇲🇽", date: "2026-11-01", completed: false, sprint: false },
  { round: 21, name: "São Paulo GP",           circuit: "Autodromo Jose Carlos Pace",         country: "Brazil",       flag: "🇧🇷", date: "2026-11-08", completed: false, sprint: false },
  { round: 22, name: "Las Vegas GP",           circuit: "Las Vegas Strip Circuit",            country: "USA",          flag: "🇺🇸", date: "2026-11-21", completed: false, sprint: false },
  { round: 23, name: "Qatar GP",               circuit: "Lusail International Circuit",       country: "Qatar",        flag: "🇶🇦", date: "2026-11-29", completed: false, sprint: false },
  { round: 24, name: "Abu Dhabi GP",           circuit: "Yas Marina Circuit",                 country: "UAE",          flag: "🇦🇪", date: "2026-12-06", completed: false, sprint: false },
];

// ── TEAM COLORS (for chart lines) ─────────────────────────────
export const TEAM_COLORS: Record<string, string> = {
  tigre:      "#dd3630",
  archv:      "#01aa55",
  cornwheel:  "#4141e9",
  proathlete: "#27F4D2",
  clubz:      "#FFD700",
  solarium:   "#FF87BC",
};

// ── COMPUTED STANDINGS ─────────────────────────────────────────
export type StandingEntry = {
  team: Team;
  totalPoints: number;
  raceTotal: number;
  position: number;
  gap: number;
};

export function computeStandings(): StandingEntry[] {
  const entries = TEAMS.map((team) => {
    const raceTotal = team.racePoints.reduce((sum, p) => sum + p, 0);
    const totalPoints = raceTotal + team.adjustmentPoints;
    return { team, totalPoints, raceTotal, position: 0, gap: 0 };
  }).sort((a, b) => b.totalPoints - a.totalPoints);

  const leader = entries[0]?.totalPoints ?? 0;
  return entries.map((e, i) => ({
    ...e,
    position: i + 1,
    gap: leader - e.totalPoints,
  }));
}

// Cumulative points after each completed race (for progression chart)
export function computeProgressionData() {
  const completedCount = RACES.filter((r) => r.completed).length;
  return TEAMS.map((team) => {
    const cumulative: number[] = [];
    let running = team.adjustmentPoints;
    for (let i = 0; i < completedCount; i++) {
      running += team.racePoints[i] ?? 0;
      cumulative.push(running);
    }
    return { team, cumulative };
  });
}