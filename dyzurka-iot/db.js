// === UNIWERSALNY ADAPTER BAZY DANYCH (dyzurka-iot/db.js) ===
const FIREBASE_URL = "https://apex-dyzurka-demo-default-rtdb.europe-west1.firebasedatabase.app";

const USERS = {
  "lekarz":  { pin: "1111", name: "Admin", role: "lekarz", label: "Lekarz Dyżurny" },
  "dyzurka": { pin: "2222", name: "Admin", role: "pielegniarka", label: "Pielęgniarka" },
  "opiekun": { pin: "3333", name: "Admin", role: "opiekun", label: "Opiekun Medyczny" }
};

// Definicja sal: standard = liczba stałych łóżek, max = maksymalny limit z dostawką
const ROOM_CONFIG = {
  "Sala 404": { standard: 3, max: 4 },
  "Sala 405": { standard: 3, max: 4 },
  "Sala 406": { standard: 3, max: 4 },
  "Sala 407": { standard: 3, max: 4 },
  "Sala 408": { standard: 3, max: 4 },
  "Sala 413": { standard: 1, max: 1 },
  "Sala 414": { standard: 1, max: 1 }
};

const DEFAULT_ROOMS = Object.keys(ROOM_CONFIG);

const DEFAULT_PATIENTS = [
  {
    id: "PAT-101",
    qr: "QR-404-L1",
    name: "Jan K. (64 l.)",
    room: "Sala 404",
    bed: "Łóżko 1",
    alertNote: "Kontrola RR co 4h",
    medications: "Ramipril 5mg (rano), Pomiar RR 3x dziennie",
    history: [
      { date: "15.11 08:00", type: "pomiar", sys: 145, dia: 92, pulse: 80, temp: 36.8, author: "Piel. Anna K.", comment: "Przyjęcie na oddział." },
      { date: "16.11 08:00", type: "pomiar", sys: 132, dia: 82, pulse: 74, temp: 36.6, author: "Piel. Anna K.", comment: "Stabilizacja po lekach." },
      { date: "17.11 17:30", type: "pomiar", sys: 128, dia: 80, pulse: 72, temp: 36.6, author: "Piel. Anna K.", comment: "Parametry w normie." }
    ]
  },
  {
    id: "PAT-102",
    qr: "QR-405-L2",
    name: "Tomasz W. (43 l.)",
    room: "Sala 405",
    bed: "Łóżko 2",
    alertNote: "Wstawanie w gorsecie!",
    medications: "Paracetamol 1g doraźnie, pionizacja wyłącznie w gorsecie",
    history: [
      { date: "16.11 08:00", type: "pomiar", sys: 120, dia: 76, pulse: 70, temp: 36.8, author: "Piel. Anna K.", comment: "Pionizacja w gorsecie OK." },
      { date: "17.11 17:45", type: "pomiar", sys: 118, dia: 75, pulse: 68, temp: 36.6, author: "Piel. Anna K.", comment: "Spacer po korytarzu bez dolegliwości." }
    ]
  },
  {
    id: "PAT-103",
    qr: "QR-413-L1",
    name: "Maria Z. (71 l.)",
    room: "Sala 413",
    bed: "Łóżko 1",
    alertNote: "⚠️ Obserwacja gorączki",
    medications: "Pyralgina 1g i.v. przy temp. >38.0°C",
    history: [
      { date: "16.11 18:00", type: "pomiar", sys: 140, dia: 88, pulse: 88, temp: 37.9, author: "Piel. Anna K.", comment: "Stan podgorączkowy." },
      { date: "17.11 17:50", type: "pomiar", sys: 152, dia: 95, pulse: 96, temp: 38.4, author: "Piel. Anna K.", comment: "⚠️ AI: Nagły wzrost temp. (+0.5°C) oraz ciśnienia (+12 mmHg)." }
    ]
  }
];

const WardDB = {
  getDefaultData() {
    return {
      users: { ...USERS },
      rooms: DEFAULT_ROOMS,
      patients: DEFAULT_PATIENTS,
      logs: [
        { time: "17.11 17:50", text: "Piel. Anna K. zapisała pomiar dla Maria Z. (Sala 413) — ⚠️ AI wykrył temp. 38.4°C!", alert: true },
        { time: "17.11 17:45", text: "Piel. Anna K. zapisała pomiar dla Tomasz W. (Sala 405).", alert: false }
      ]
    };
  },

  async load() {
    if (FIREBASE_URL) {
      try {
        const res = await fetch(`${FIREBASE_URL}/wardData.json`);
        const data = await res.json();
        if (data && !data.error) {
          const users = data.users && Object.keys(data.users).length > 0 ? data.users : { ...USERS };
          const rooms = data.rooms ? Object.values(data.rooms) : DEFAULT_ROOMS;
          
          const patients = data.patients ? Object.values(data.patients).map(p => ({
            ...p,
            history: p.history ? Object.values(p.history) : [],
            tasks: p.tasks ? Object.values(p.tasks) : []
          })) : [];
          const logs = data.logs ? Object.values(data.logs) : [];
          if (rooms.length > 0 && patients.length > 0) {
            return { users, rooms, patients, logs };
          }
        }
      } catch (e) {
        console.warn("Błąd połączenia z Firebase:", e);
      }
    }
    const initial = this.getDefaultData();
    await this.save(initial);
    return initial;
  },

  async save(data) {
    localStorage.setItem("apex_ward_db_v3", JSON.stringify(data));
    if (FIREBASE_URL) {
      try {
        await fetch(`${FIREBASE_URL}/wardData.json`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
      } catch (e) {
        console.warn("Nie udało się zapisać do Firebase:", e);
      }
    }
  }
};

