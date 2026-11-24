const quizData = [
  {
    question: "1. Two nurses update the same patient record from their phones at the exact same millisecond, overwriting each other's changes. What is this concurrency bug called?",
    options: [
      "Deadlock",
      "Race condition",
      "Memory leak",
      "Buffer overflow"
    ],
    correct: 1,
    explanation: "'Race condition' (wyścig danych) występuje, gdy dwa równoległe procesy lub użytkownicy modyfikują ten sam zasób bez synchronizacji, a wynik zależy od kolejności zapisu."
  },
  {
    question: "2. To prevent overwriting concurrent edits in a lightweight REST database, you first fetch the latest state, apply your change, and save it back. What pattern is this?",
    options: [
      "Fire-and-forget",
      "Round-robin",
      "Read-modify-write",
      "Polling loop"
    ],
    correct: 2,
    explanation: "'Read-modify-write' (odczytaj – zmodyfikuj – zapisz) to fundamentalny wzorzec integralności danych (stosowany m.in. w telefon.html systemu dyzurka-iot)."
  },
  {
    question: "3. When an electric motor or relay coil switches on, it draws a brief, high spike of current before settling. What is this spike called?",
    options: [
      "Leakage current",
      "Idle current",
      "Inrush current",
      "Eddy current"
    ],
    correct: 2,
    explanation: "'Inrush current' (prąd rozruchowy) to gwałtowny pik prądu podczas załączania obciążenia — kluczowy parametr przy projektowaniu sekwencera zasilania na USB/ESP32."
  },
  {
    question: "4. During automated FOTA testing, you deliberately cut power or corrupt packets mid-update to verify that the device recovers safely. What is this technique called?",
    options: [
      "Code obfuscation",
      "Load balancing",
      "Fault injection",
      "Static analysis"
    ],
    correct: 2,
    explanation: "'Fault injection' (wstrzykiwanie błędów / awarii) to celowe symulowanie krytycznych sytuacji (zanik zasilania, uszkodzony pakiet), aby sprawdzić odporność bootloadera i mechanizmu rollback."
  },
  {
    question: "5. Running automated Python test scripts against a physical microcontroller wired to sensors and power relays on a test bench is known as:",
    options: [
      "SIL (Software-in-the-Loop)",
      "HIL (Hardware-in-the-Loop)",
      "UAT (User Acceptance Testing)",
      "Unit mocking"
    ],
    correct: 1,
    explanation: "'HIL (Hardware-in-the-Loop)' to testy na rzeczywistym sprzęcie podpiętym do stanowiska pomiarowego — kluczowe słowo z ofert Senior Embedded / IoT (np. Knowit)."
  },
  {
    question: "6. On an ARM7 microcontroller, a hardware Input Capture unit automatically freezes the current timer count on a photocell edge without CPU intervention. This is called:",
    options: [
      "Polling the pin",
      "Context switching",
      "Latching the timer",
      "Busy waiting"
    ],
    correct: 2,
    explanation: "'Latching the timer' (zatrzaskiwanie stanu licznika w rejestrze sprzętowym) eliminuje opóźnienia programowe i gwarantuje mikrosekundową precyzję pomiaru czasu."
  },
  {
    question: "7. In a Hard Real-Time system, guaranteeing a predictable, bounded response time on every execution cycle is known as:",
    options: [
      "Deterministic behavior",
      "Asynchronous polling",
      "Dynamic heap allocation",
      "Best-effort delivery"
    ],
    correct: 0,
    explanation: "'Deterministic behavior' (determinizm czasowy) oznacza, że system zawsze zareaguje w ściśle określonym, przewidywalnym oknie czasowym — bez losowych zacięć."
  },
  {
    question: "8. Separating the real-time microcontroller control loop from slow cloud AI APIs using asynchronous queues so network delays never freeze hardware is called:",
    options: [
      "Tight coupling",
      "Blocking execution",
      "Decoupling the hardware layer from the cloud",
      "Synchronous polling"
    ],
    correct: 2,
    explanation: "'Decoupling' (rozsprzęganie / oddzielanie warstw) chroni krytyczne procesy sprzętowe przed opóźnieniami lub awarią sieci i zewnętrznych modeli AI."
  },
  {
    question: "9. In a UHF RFID room setup, when a reader accidentally picks up tags worn by people walking outside in the hallway, those unwanted detections are called:",
    options: [
      "False negatives",
      "False positives",
      "Packet drops",
      "Thermal shutdowns"
    ],
    correct: 1,
    explanation: "'False positives' (fałszywe odczyty / wykrycia pozytywne) to sytuacja, gdy system zgłasza obecność tagu w strefie, mimo że w rzeczywistości znajduje się on za ścianą."
  },
  {
    question: "10. A lightweight operational web app deployed alongside an old hospital or enterprise HIS system to streamline daily tasks without replacing the core software is called:",
    options: [
      "Monolithic core replacement",
      "Front-end Overlay / Sidecar App",
      "Firmware bootloader",
      "Kernel driver"
    ],
    correct: 1,
    explanation: "'Front-end Overlay / Sidecar App' to lekka nakładka działająca obok ciężkiego systemu głównego (Legacy System) — dokładnie tak jak nasza Smart Ward Board!"
  },
  {
    question: "11. An unchangeable, chronological log showing WHO performed an action, WHAT changed, and the exact TIMESTAMP is known as:",
    options: [
      "Cache buffer",
      "Stack trace",
      "Audit trail",
      "Polling queue"
    ],
    correct: 2,
    explanation: "'Audit trail' (ślad audytowy) zapewnia pełną rozliczalność i bezpieczeństwo danych w systemach medycznych, finansowych oraz przemysłowych."
  },
  {
    question: "12. Becoming overly dependent on a single commercial software provider, making it expensive or technically difficult to switch later, is called:",
    options: [
      "Context pollution",
      "Vendor lock-in",
      "Single Source of Truth",
      "Rapid adaptation"
    ],
    correct: 1,
    explanation: "'Vendor lock-in' (uzależnienie od dostawcy) to główny argument przeciwko zamkniętym kombajnom Enterprise na rzecz lekkich, otwartych systemów AI."
  }
];
