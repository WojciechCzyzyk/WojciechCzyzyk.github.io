// === UNIWERSALNY ADAPTER BAZY DANYCH (dyzurka-iot/db.js) ===
// Zostaw FIREBASE_URL puste ("") dla trybu natychmiastowego (localStorage),
// albo wklej adres darmowej bazy Firebase Realtime Database dla synchronizacji na żywo Telefon <-> Laptop!
const FIREBASE_URL = "";

const USERS = {
  "lekarz":  { pin: "5678", name: "Lek. Piotr N.", role: "lekarz", label: "Lekarz Dyżurny" },
  "dyzurka": { pin: "1234", name: "Piel. Anna K.", role: "pielegniarka", label: "Pielęgniarka" },
  "opiekun": { pin: "3333", name: "Opiekun Janusz B.", role: "opiekun", label: "Opiekun Medyczny" }
};

const DEFAULT_ROOMS = ["Sala 1", "Sala 2", "Sala 3", "Sala 4", "Sala Pooperacyjna"];

const DEFAULT_PATIENTS = [
  {
    id: "PAT-101",
    qr: "QR-S1-L1",
    name: "Jan K. (64 l.)",
    room: "Sala 1",
    bed: "Łóżko 1",
    alertNote: "Kontrola ciśnienia co 4h",
    medications: "Ramipril 5mg (rano), Pomiar RR 3x dziennie",
    history: [
      { date: "14.11 08:00", type: "pomiar", sys: 145, dia: 92, pulse: 80, temp: 36.8, author: "Piel. Anna K.", comment: "Przyjęcie na oddział, lekkie nadciśnienie." },
      { date: "15.11 08:00", type: "pomiar", sys: 138, dia: 86, pulse: 76, temp: 36.7, author: "Piel. Anna K.", comment: "Po lekach stabilizacja." },
      { date: "16.11 08:00", type: "pomiar", sys: 132, dia: 82, pulse: 74, temp: 36.6, author: "Piel. Anna K.", comment: "Samopoczucie dobre." },
      { date: "17.11 17:30", type: "pomiar", sys: 128, dia: 80, pulse: 72, temp: 36.6, author: "Piel. Anna K.", comment: "Parametry w normie." }
    ]
  },
  {
    id: "PAT-102",
    qr: "QR-S2-L2",
    name: "Tomasz W. (43 l.)",
    room: "Sala 2",
    bed: "Łóżko 2",
    alertNote: "Wstawanie wyłącznie w gorsecie!",
    medications: "Paracetamol 1g doraźnie przy bólu, pionizacja tylko w gorsecie",
    history: [
      { date: "15.11 08:00", type: "pomiar", sys: 122, dia: 78, pulse: 74, temp: 37.1, author: "Piel. Anna K.", comment: "Stan po zabiegu stabilny." },
      { date: "16.11 08:00", type: "pomiar", sys: 120, dia: 76, pulse: 70, temp: 36.8, author: "Piel. Anna K.", comment: "Pionizacja w gorsecie bez zawrotów głowy." },
      { date: "17.11 17:45", type: "pomiar", sys: 118, dia: 75, pulse: 68, temp: 36.6, author: "Piel. Anna K.", comment: "Spacer po korytarzu ok." }
    ]
  },
  {
    id: "PAT-103",
    qr: "QR-S4-L1",
    name: "Maria Z. (71 l.)",
    room: "Sala 4",
    bed: "Łóżko 1",
    alertNote: "⚠️ Obserwacja gorączki",
    medications: "Pyralgina 1g i.v. przy temp. >38.0°C, nawadnianie",
    history: [
      { date: "16.11 18:00", type: "pomiar", sys: 140, dia: 88, pulse: 88, temp: 37.9, author: "Piel. Anna K.", comment: "Stan podgorączkowy wieczorem." },
      { date: "17.11 17:50", type: "pomiar", sys: 152, dia: 95, pulse: 96, temp: 38.4, author: "Piel. Anna K.", comment: "⚠️ AI: Nagły wzrost temp. (+0.5°C) oraz ciśnienia (+12 mmHg) — zgłoszono lekarzowi." }
    ]
  }
];

const WardDB = {
  async load() {
    if (FIREBASE_URL) {
      const res = await fetch(`${FIREBASE_URL}/wardData.json`);
      const data = await res.json();
      if (data && data.patients) return data;
    }
    const raw = localStorage.getItem("apex_ward_db_v2");
    if (raw) return JSON.parse(raw);
    const initial = {
      rooms: DEFAULT_ROOMS,
      patients: DEFAULT_PATIENTS,
      logs: [
        { time: "17.11 17:50", text: "Piel. Anna K. zapisała pomiar dla Maria Z. (Sala 4 / Łóżko 1) — ⚠️ AI wykrył nagły wzrost temp. 38.4°C!", alert: true },
        { time: "17.11 17:45", text: "Piel. Anna K. zapisała pomiar dla Tomasz W. (Sala 2 / Łóżko 2).", alert: false }
      ]
    };
    await this.save(initial);
    return initial;
  },

  async save(data) {
    localStorage.setItem("apex_ward_db_v2", JSON.stringify(data));
    if (FIREBASE_URL) {
      await fetch(`${FIREBASE_URL}/wardData.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    }
  }
};
