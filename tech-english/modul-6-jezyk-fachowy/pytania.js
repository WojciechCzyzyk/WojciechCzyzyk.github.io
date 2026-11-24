const quizData = [
  {
    question: "1. Everyday phrasing: 'read memory after programming and check that memory is the same like firmware'. What is the professional Embedded term?",
    options: [
      "do a memory double-check",
      "perform a read-back verification",
      "make firmware comparison",
      "check flash equality"
    ],
    correct: 1,
    explanation: "'Perform a read-back verification' to profesjonalny termin oznaczający odczytanie zawartości pamięci Flash po programowaniu i porównanie jej z plikiem binarnym."
  },
  {
    question: "2. Everyday phrasing: 'throw interrupts in purpose get timestamp'. How does a Senior Embedded Engineer say this?",
    options: [
      "send interrupt for taking time",
      "puts interrupt to catch clock",
      "triggers an interrupt to retrieve the timestamp",
      "throws event to read timer"
    ],
    correct: 2,
    explanation: "Przerwania sprzętowe nie są 'rzucane' ('throw' dotyczy wyjątków w C++), lecz 'wyzwalane' ('trigger an interrupt'), a dane się 'pobiera/odczytuje' ('retrieve / read')."
  },
  {
    question: "3. Everyday phrasing: 'alien tags' (RFID tags outside our system database). What is the proper industry term?",
    options: [
      "strange tags",
      "foreign / unregistered tags",
      "outside chips",
      "unknown guest cards"
    ],
    correct: 1,
    explanation: "W systemach RFID i telekomunikacji obce identyfikatory spoza naszej bazy określamy jako 'foreign tags' lub 'unregistered tags' (nigdy 'alien tags')."
  },
  {
    question: "4. Everyday phrasing: 'oversize functions' (software overloaded with unnecessary, unused menus). What is the professional IT term?",
    options: [
      "heavy user buttons",
      "bloated features / feature bloat",
      "big menu options",
      "overloaded code blocks"
    ],
    correct: 1,
    explanation: "'Bloated features' lub 'feature bloat' to branżowy termin opisujący przeładowanie systemu zbędnymi, nieużywanymi funkcjami, które komplikują obsługę."
  },
  {
    question: "5. Everyday phrasing: 'count consumption' (measuring how much electricity the controller and motors use). How do engineers phrase this?",
    options: [
      "sum electricity usage",
      "count energy eating",
      "calculate power consumption",
      "measure current appetite"
    ],
    correct: 2,
    explanation: "Pobór mocy zawsze 'obliczamy' ('calculate power consumption'), nie 'liczymy jak jabłka' ('count')."
  },
  {
    question: "6. Everyday phrasing: 'distribute power to a tool'. What is the standard hardware engineering phrase?",
    options: [
      "supply power to a device",
      "give current to machine",
      "push voltage into tool",
      "send energy to hardware"
    ],
    correct: 0,
    explanation: "Urządzeniom elektronicznym 'dostarczamy zasilanie' ('supply power to a device' lub 'power a device')."
  },
  {
    question: "7. Everyday phrasing: 'make a medical procedure' (in our Smart Ward Board hospital system). Which verb is natural in English?",
    options: [
      "do medical action",
      "create nurse task",
      "perform a medical procedure",
      "make ward operation"
    ],
    correct: 2,
    explanation: "Zabiegi, procedury, testy i pomiary w języku angielskim 'wykonujemy' czasownikiem 'perform' ('perform a medical procedure', 'perform a test')."
  },
  {
    question: "8. Everyday phrasing: 'the tag status jumps back and forth near the doorway'. How do we describe this signal behavior professionally?",
    options: [
      "the tag bounces back and forth between states (so we apply hysteresis)",
      "the tag makes ping-pong on the line",
      "the reader is confused by the signal",
      "the signal jumps left and right"
    ],
    correct: 0,
    explanation: "'Bounce back and forth between states' (migotanie stanu na granicy strefy) rozwiązujemy przez 'apply hysteresis' (zastosowanie histerezy progowej)."
  },
  {
    question: "9. Everyday phrasing: 'SQL base' or 'actual selection context'. Which pair sounds like a real System Architect?",
    options: [
      "SQL storage & real chosen text",
      "SQL database & curated, up-to-date context",
      "SQL table base & present selected memory",
      "SQL file & actual context"
    ],
    correct: 1,
    explanation: "Baza danych to zawsze 'database' (nie 'base'), a 'actual' po angielsku znaczy 'rzeczywisty' (false friend!) — 'aktualny' to 'up-to-date' lub 'current'."
  },
  {
    question: "10. Everyday phrasing: 'to maintaince that problem'. How do engineers naturally say they resolve an issue?",
    options: [
      "to keep that problem",
      "to service this bug",
      "to handle / solve that issue",
      "to make maintenance of bug"
    ],
    correct: 2,
    explanation: "'To handle that issue' lub 'to resolve that issue' — w IT 'obsługujemy' lub 'rozwiązujemy' zgłoszenia/problemy ('issues'), a 'utrzymujemy' ('maintain') cały system."
  },
  {
    question: "11. Everyday phrasing: 'start motors one by one with a delay so USB power doesn't die'. What is the architectural phrasing?",
    options: [
      "delay motor power on USB",
      "start engines slowly for safety",
      "stagger the startup to stay within the power budget",
      "turn on relays with sleep timer"
    ],
    correct: 2,
    explanation: "'Stagger the startup to stay within the power budget' (rozłożyć rozruch w czasie, aby zmieścić się w budżecie mocy) to czysty język inżyniera systemów wbudowanych."
  },
  {
    question: "12. Everyday phrasing: 'check if the program works stable'. Which phrasing sounds natural on a Senior Embedded interview?",
    options: [
      "check if code goes good",
      "monitor system stability / ensure the firmware runs stably",
      "verify program works without crash",
      "see if software is steady"
    ],
    correct: 1,
    explanation: "Zamiast potocznego 'works stable' mówimy 'monitor system stability' (monitorować stabilność systemu) lub 'ensure the firmware runs stably' (przysłówek z końcówką '-ly')."
  }
];
