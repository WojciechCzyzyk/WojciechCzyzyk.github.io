const quizData = [
  {
    question: "1. What is the main disadvantage of continuous 'polling' compared to an event-driven architecture?",
    options: [
      "It requires a physical USB cable between servers",
      "It wastes CPU cycles, bandwidth, and API limits by repeatedly asking if new data exists",
      "It automatically deletes old JSON files",
      "It only works with heavy SQL databases"
    ],
    correct: 1,
    explanation: "'Polling' (cykliczne odpytywanie) przypomina ciągłe wyglądanie przez okno co kilka sekund — marnuje zasoby, limity zapytań i energię, nawet gdy nic nowego się nie wydarzyło."
  },
  {
    question: "2. How does a 'webhook' work in modern automation pipelines (e.g., GitHub + Make.com)?",
    options: [
      "It acts like a doorbell—immediately sending an HTTP POST payload the exact moment an event happens",
      "It scans the entire internet every midnight for updates",
      "It compresses images into PDF files",
      "It replaces the need for an internet connection"
    ],
    correct: 0,
    explanation: "'Webhook' działa jak sprzętowe przerwanie lub dzwonek do drzwi — w chwili wystąpienia zdarzenia źródło natychmiast wysyła paczkę danych (HTTP POST) bez zbędnego czekania."
  },
  {
    question: "3. Why do we use a single JSON file as 'persistent memory' for lightweight AI workflows?",
    options: [
      "Because JSON files can run 3D graphics faster than C++",
      "It preserves context across runs while eliminating the infrastructure overhead of a heavy SQL database",
      "Because SQL databases cannot store text",
      "It prevents users from editing files on GitHub"
    ],
    correct: 1,
    explanation: "Lekki plik JSON jako 'persistent memory' (trwała pamięć między uruchomieniami) zachowuje historię postępów przy zerowym narzucie ('overhead') utrzymania serwera bazodanowego."
  },

    {
    question: "4. What happens when 10 students push code at the exact same second to a Make.com webhook?",
    options: [
      "9 requests are lost permanently",
      "The webhook queue buffers the events (FIFO) and processes them sequentially without data loss",
      "The server shuts down for maintenance",
      "All 10 students receive the exact same answer"
    ],
    correct: 1,
    explanation: "Kolejka webhooków ('queuing') działa jak bufor FIFO po przerwaniu sprzętowym — układa wszystkie zdarzenia w poczekalni i przetwarza je po kolei bez gubienia danych."
  },
  {
    question: "5. What does 'out of the box' mean when describing an event-driven platform?",
    options: [
      "You have to write all networking protocols from scratch in C",
      "Key features like queuing, retries, and HTTP acknowledgments work immediately without extra setup",
      "The software only runs on Raspberry Pi hardware",
      "It requires buying an external SQL server license"
    ],
    correct: 1,
    explanation: "'Out of the box' oznacza funkcjonalność gotową od razu po wyjęciu z pudełka — np. automatyczne kolejkowanie i ponawianie prób ('queuing and retries') w razie błędu sieci."
  },
  {
    question: "6. Which phrase best describes 'zbędne obciążenie zasobów, kosztów lub infrastruktury'?",
    options: [
      "Rapid adaptation",
      "Infrastructure overhead",
      "Hardware abstraction",
      "Inrush current"
    ],
    correct: 1,
    explanation: "'Infrastructure overhead' to zbędny narzut zasobów, czasu i kosztów utrzymania ciężkich systemów tam, gdzie wystarczy lekkie rozwiązanie."
  }
];

