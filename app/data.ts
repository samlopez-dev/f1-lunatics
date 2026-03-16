// ============================================================
//  F1 LUNATICS — FANTASY LEAGUE DATA  · 2026 SEASON
//  HOW TO UPDATE: After each race, add the points each team
//  scored that week to the `racePoints` array below.
// ============================================================

export type Team = {
  id: string;
  name: string;
  manager: string;
  country: string;
  racePoints: number[];
  adjustmentPoints: number;
  adjustmentNote?: string;
};

export type Race = {
  round: number;
  name: string;
  circuit: string;
  country: string;
  date: string;
  racetimePST: string;
  completed: boolean;
  sprint: boolean;
  cancelled?: boolean;
  laps: number;
  circuitLengthKm: number;
  previousWinner: string;
  previousWinnerCountry: string;
  lapRecordHolder: string;
  lapRecordTime: string;
};

// ── TEAMS ─────────────────────────────────────────────────────
export const TEAMS: Team[] = [
  {
    id: "tigre",
    name: "Scuderia Tigre",
    manager: "Sammy Lopez",
    country: "Mexico",
    racePoints: [219, 312],
    adjustmentPoints: 0,
  },
  {
    id: "archv",
    name: "ARCHV RACING",
    manager: "Kai Resillas",
    country: "USA",
    racePoints: [200, 318],
    adjustmentPoints: 0,
  },
  {
    id: "cornwheel",
    name: "corn wheel drive",
    manager: "Samantha Giron",
    country: "USA",
    racePoints: [0, 447],
    adjustmentPoints: 135,
    adjustmentNote: "Race 1 points scored on old account (THE MEEPS)",
  },
  {
    id: "proathlete",
    name: "Professional Athlete",
    manager: "Dylan Nino",
    country: "Colombia",
    racePoints: [0, 366],
    adjustmentPoints: 225,
    adjustmentNote: "Race 1 points lost due to account deletion",
  },
  {
    id: "clubz",
    name: "CLUB Z",
    manager: "Daniel Resillas",
    country: "Mexico",
    racePoints: [122, 236],
    adjustmentPoints: 0,
  },
  {
    id: "davesf1221",
    name: "DavesF1221",
    manager: "David Lopez",
    country: "USA",
    racePoints: [97, 265],
    adjustmentPoints: 0,
  },
  {
    id: "solarium",
    name: "Solarium's Squad",
    manager: "Ethan Giron",
    country: "USA",
    racePoints: [60, 269],
    adjustmentPoints: 0,
  },
];

// ── 2026 RACE CALENDAR ────────────────────────────────────────
export const RACES: Race[] = [
  { round: 1,  name: "Australian GP",          circuit: "Albert Park Circuit",                country: "Australia",    date: "2026-03-07", racetimePST: "8:00 PM",  completed: true,  sprint: false, laps: 58, circuitLengthKm: 5.278, previousWinner: "George Russell",    previousWinnerCountry: "UK",          lapRecordHolder: "Charles Leclerc",  lapRecordTime: "1:20.235" },
  { round: 2,  name: "Chinese GP",             circuit: "Shanghai International Circuit",     country: "China",        date: "2026-03-15", racetimePST: "12:00 AM", completed: true,  sprint: true,  laps: 56, circuitLengthKm: 5.451, previousWinner: "Kimi Antonelli",    previousWinnerCountry: "Italy",       lapRecordHolder: "Michael Schumacher",lapRecordTime: "1:32.238" },
  { round: 3,  name: "Japanese GP",            circuit: "Suzuka International Racing Course", country: "Japan",        date: "2026-03-29", racetimePST: "10:00 PM", completed: false, sprint: false, laps: 53, circuitLengthKm: 5.807, previousWinner: "Max Verstappen",    previousWinnerCountry: "Netherlands", lapRecordHolder: "Lap Record",        lapRecordTime: "1:30.983" },
  { round: 4,  name: "Bahrain GP",             circuit: "Bahrain International Circuit",      country: "Bahrain",      date: "2026-04-12", racetimePST: "8:00 AM",  completed: false, sprint: false, cancelled: true, laps: 57, circuitLengthKm: 5.412, previousWinner: "Max Verstappen", previousWinnerCountry: "Netherlands", lapRecordHolder: "Pedro de la Rosa", lapRecordTime: "1:31.447" },
  { round: 5,  name: "Saudi Arabian GP",       circuit: "Jeddah Corniche Circuit",            country: "Saudi Arabia", date: "2026-04-19", racetimePST: "10:00 AM", completed: false, sprint: false, cancelled: true, laps: 50, circuitLengthKm: 6.174, previousWinner: "Max Verstappen", previousWinnerCountry: "Netherlands", lapRecordHolder: "Max Verstappen",  lapRecordTime: "1:30.734" },
  { round: 6,  name: "Miami GP",               circuit: "Miami International Autodrome",      country: "USA",          date: "2026-05-03", racetimePST: "1:00 PM",  completed: false, sprint: true,  laps: 57, circuitLengthKm: 5.412, previousWinner: "Lando Norris",      previousWinnerCountry: "UK",          lapRecordHolder: "Max Verstappen",   lapRecordTime: "1:29.708" },
  { round: 7,  name: "Canadian GP",            circuit: "Circuit Gilles Villeneuve",          country: "Canada",       date: "2026-05-24", racetimePST: "1:00 PM",  completed: false, sprint: true,  laps: 70, circuitLengthKm: 4.361, previousWinner: "Max Verstappen",    previousWinnerCountry: "Netherlands", lapRecordHolder: "Valtteri Bottas",  lapRecordTime: "1:13.078" },
  { round: 8,  name: "Monaco GP",              circuit: "Circuit de Monaco",                  country: "Monaco",       date: "2026-06-07", racetimePST: "6:00 AM",  completed: false, sprint: false, laps: 78, circuitLengthKm: 3.337, previousWinner: "Charles Leclerc",   previousWinnerCountry: "Monaco",      lapRecordHolder: "Lewis Hamilton",   lapRecordTime: "1:12.909" },
  { round: 9,  name: "Barcelona-Catalunya GP", circuit: "Circuit de Barcelona-Catalunya",     country: "Spain",        date: "2026-06-14", racetimePST: "6:00 AM",  completed: false, sprint: false, laps: 66, circuitLengthKm: 4.657, previousWinner: "Max Verstappen",    previousWinnerCountry: "Netherlands", lapRecordHolder: "Max Verstappen",   lapRecordTime: "1:16.330" },
  { round: 10, name: "Austrian GP",            circuit: "Red Bull Ring",                      country: "Austria",      date: "2026-06-28", racetimePST: "6:00 AM",  completed: false, sprint: false, laps: 71, circuitLengthKm: 4.318, previousWinner: "George Russell",    previousWinnerCountry: "UK",          lapRecordHolder: "Carlos Sainz",     lapRecordTime: "1:05.619" },
  { round: 11, name: "British GP",             circuit: "Silverstone Circuit",                country: "UK",           date: "2026-07-05", racetimePST: "7:00 AM",  completed: false, sprint: true,  laps: 52, circuitLengthKm: 5.891, previousWinner: "Lando Norris",      previousWinnerCountry: "UK",          lapRecordHolder: "Max Verstappen",   lapRecordTime: "1:27.097" },
  { round: 12, name: "Belgian GP",             circuit: "Circuit de Spa-Francorchamps",       country: "Belgium",      date: "2026-07-19", racetimePST: "6:00 AM",  completed: false, sprint: false, laps: 44, circuitLengthKm: 7.004, previousWinner: "Lewis Hamilton",    previousWinnerCountry: "UK",          lapRecordHolder: "Valtteri Bottas",  lapRecordTime: "1:46.286" },
  { round: 13, name: "Hungarian GP",           circuit: "Hungaroring",                        country: "Hungary",      date: "2026-07-26", racetimePST: "6:00 AM",  completed: false, sprint: false, laps: 70, circuitLengthKm: 4.381, previousWinner: "Oscar Piastri",     previousWinnerCountry: "Australia",   lapRecordHolder: "Lewis Hamilton",   lapRecordTime: "1:16.627" },
  { round: 14, name: "Dutch GP",               circuit: "Circuit Zandvoort",                  country: "Netherlands",  date: "2026-08-23", racetimePST: "6:00 AM",  completed: false, sprint: true,  laps: 72, circuitLengthKm: 4.259, previousWinner: "Lando Norris",      previousWinnerCountry: "UK",          lapRecordHolder: "Max Verstappen",   lapRecordTime: "1:11.097" },
  { round: 15, name: "Italian GP",             circuit: "Autodromo Nazionale Monza",          country: "Italy",        date: "2026-09-06", racetimePST: "6:00 AM",  completed: false, sprint: false, laps: 53, circuitLengthKm: 5.793, previousWinner: "Charles Leclerc",   previousWinnerCountry: "Monaco",      lapRecordHolder: "Rubens Barrichello",lapRecordTime: "1:21.046" },
  { round: 16, name: "Madrid GP",              circuit: "Madring Street Circuit",             country: "Spain",        date: "2026-09-13", racetimePST: "6:00 AM",  completed: false, sprint: false, laps: 55, circuitLengthKm: 5.47,  previousWinner: "TBD",               previousWinnerCountry: "Spain",       lapRecordHolder: "TBD",              lapRecordTime: "TBD" },
  { round: 17, name: "Azerbaijan GP",          circuit: "Baku City Circuit",                  country: "Azerbaijan",   date: "2026-09-26", racetimePST: "4:00 AM",  completed: false, sprint: false, laps: 51, circuitLengthKm: 6.003, previousWinner: "Oscar Piastri",     previousWinnerCountry: "Australia",   lapRecordHolder: "Charles Leclerc",  lapRecordTime: "1:43.009" },
  { round: 18, name: "Singapore GP",           circuit: "Marina Bay Street Circuit",          country: "Singapore",    date: "2026-10-11", racetimePST: "5:00 AM",  completed: false, sprint: true,  laps: 62, circuitLengthKm: 5.063, previousWinner: "Lando Norris",      previousWinnerCountry: "UK",          lapRecordHolder: "Lewis Hamilton",   lapRecordTime: "1:35.867" },
  { round: 19, name: "US GP",                  circuit: "Circuit of the Americas",            country: "USA",          date: "2026-10-25", racetimePST: "1:00 PM",  completed: false, sprint: false, laps: 56, circuitLengthKm: 5.513, previousWinner: "Carlos Sainz",      previousWinnerCountry: "Spain",       lapRecordHolder: "Charles Leclerc",  lapRecordTime: "1:36.169" },
  { round: 20, name: "Mexico City GP",         circuit: "Autodromo Hermanos Rodriguez",       country: "Mexico",       date: "2026-11-01", racetimePST: "12:00 PM", completed: false, sprint: false, laps: 71, circuitLengthKm: 4.304, previousWinner: "Carlos Sainz",      previousWinnerCountry: "Spain",       lapRecordHolder: "Valtteri Bottas",  lapRecordTime: "1:17.774" },
  { round: 21, name: "São Paulo GP",           circuit: "Autodromo Jose Carlos Pace",         country: "Brazil",       date: "2026-11-08", racetimePST: "9:00 AM",  completed: false, sprint: false, laps: 71, circuitLengthKm: 4.309, previousWinner: "Max Verstappen",    previousWinnerCountry: "Netherlands", lapRecordHolder: "Valtteri Bottas",  lapRecordTime: "1:10.540" },
  { round: 22, name: "Las Vegas GP",           circuit: "Las Vegas Strip Circuit",            country: "USA",          date: "2026-11-21", racetimePST: "8:00 PM",  completed: false, sprint: false, laps: 50, circuitLengthKm: 6.201, previousWinner: "Carlos Sainz",      previousWinnerCountry: "Spain",       lapRecordHolder: "Oscar Piastri",    lapRecordTime: "1:33.820" },
  { round: 23, name: "Qatar GP",               circuit: "Lusail International Circuit",       country: "Qatar",        date: "2026-11-29", racetimePST: "8:00 AM",  completed: false, sprint: false, laps: 57, circuitLengthKm: 5.380, previousWinner: "Max Verstappen",    previousWinnerCountry: "Netherlands", lapRecordHolder: "Max Verstappen",   lapRecordTime: "1:24.319" },
  { round: 24, name: "Abu Dhabi GP",           circuit: "Yas Marina Circuit",                 country: "UAE",          date: "2026-12-06", racetimePST: "5:00 AM",  completed: false, sprint: false, laps: 58, circuitLengthKm: 5.281, previousWinner: "Lando Norris",      previousWinnerCountry: "UK",          lapRecordHolder: "Max Verstappen",   lapRecordTime: "1:26.103" },
];

// ── TEAM COLORS ───────────────────────────────────────────────
export const TEAM_COLORS: Record<string, string> = {
  tigre:      "#e10600",
  archv:      "#2563eb",
  cornwheel:  "#c45e00",
  proathlete: "#0d9488",
  clubz:      "#b45309",
  davesf1221: "#7c3aed",
  solarium:   "#db2777",
};

// ── COMPUTED STANDINGS ────────────────────────────────────────
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