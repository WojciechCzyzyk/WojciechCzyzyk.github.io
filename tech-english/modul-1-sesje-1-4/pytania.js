const quizData = [
  {
    question: "1. What does 'to latch the timer' mean in an ARM7 Input Capture peripheral?",
    options: [
      "To reset the CPU clock when an error occurs",
      "To freeze and store the exact timer value in a hardware register on an input edge",
      "To disable all hardware interrupts permanently",
      "To slow down the main program loop"
    ],
    correct: 1,
    explanation: "'To latch the timer' oznacza sprzętowe zatrzaśnięcie i zapisanie dokładnej wartości licznika w rejestrze w chwili pojawienia się zbocza sygnału, bez udziału CPU."
  },
  {
    question: "2. Which phrase sounds most natural when asking a technical interviewer to clarify a requirement?",
    options: [
      "Tell me what you want exactly.",
      "Just to clarify the requirement—are you asking about X or Y?",
      "Your question is not clear for me.",
      "Repeat your question please."
    ],
    correct: 1,
    explanation: "'Just to clarify the requirement...' to profesjonalny zwrot inżynierski pozwalający upewnić się, czego dokładnie dotyczy pytanie przed udzieleniem odpowiedzi."
  },
  {
    question: "3. In UHF RFID systems, what are 'false positives'?",
    options: [
      "Tags that are physically damaged and cannot be read",
      "Unwanted reads of tags located outside the target zone (e.g., walking past in the hallway)",
      "Batteries running low in active RFID sensors",
      "Antennas working at maximum transmit power"
    ],
    correct: 1,
    explanation: "'False positives' to fałszywe odczyty — np. przypadkowe wykrycie przez czytnik w sali tagów osób przechodzących obok na korytarzu."
  },

    {
    question: "4. Why do we 'apply hysteresis' to RSSI thresholds at the physical boundary of an RFID zone?",
    options: [
      "To increase the Wi-Fi transfer speed",
      "To prevent a tag near the boundary from bouncing back and forth between states",
      "To erase data stored in the RFID tag memory",
      "To reduce the physical size of the antenna"
    ],
    correct: 1,
    explanation: "'Apply hysteresis' (zastosowanie histerezy, czyli osobnego progu RSSI dla wejścia i wyjścia) zapobiega migotaniu stanu ('bouncing back and forth') na granicy strefy."
  },
  {
    question: "5. What is 'context pollution' in AI Copilot architectures?",
    options: [
      "Overheating of the GPU during model training",
      "Degradation of AI accuracy caused by indexing noisy, outdated, or irrelevant files",
      "Loss of internet connection to the cloud API",
      "Encrypting local Markdown files with a password"
    ],
    correct: 1,
    explanation: "'Context pollution' to zanieczyszczenie pamięci AI szumem informacyjnym ze starych maili i nieaktualnych plików, co prowadzi do halucynacji."
  },
  {
    question: "6. What risk does 'vendor lock-in' describe in enterprise software?",
    options: [
      "Locking the server room door with an RFID badge",
      "Becoming dependent on a single provider's rigid ecosystem with high switching costs",
      "Using open-source tools like GitHub Actions and Python",
      "Backing up JSON files to an external hard drive"
    ],
    correct: 1,
    explanation: "'Vendor lock-in' to uzależnienie od jednego dostawcy i jego zamkniętego, sztywnego systemu, z którego bardzo trudno i drogo zrezygnować."
  },

    {
    question: "7. What does 'inrush current' refer to in an ESP32 motor controller?",
    options: [
      "The steady-state current drawn when the microcontroller is in deep sleep",
      "The brief, high instantaneous current spike drawn when a motor or relay turns on",
      "The leakage current through a disconnected wire",
      "The wireless signal strength of the ESP32 antenna"
    ],
    correct: 1,
    explanation: "'Inrush current' to chwilowy, wysoki skok prądu rozruchowego w ułamku sekundy podczas uruchamiania silnika lub przekaźnika."
  },
  {
    question: "8. How does 'hardware abstraction' (like a BlindsSequencer class) improve C++20 firmware?",
    options: [
      "It separates business logic from low-level GPIO/relay control, making code modular and testable",
      "It doubles the physical voltage of the USB port",
      "It replaces the need for a microcontroller",
      "It automatically translates C++ into Python"
    ],
    correct: 0,
    explanation: "'Hardware abstraction' (izolacja sprzętowa) oddziela czystą logikę sterowania od fizycznych pinów i przekaźników, ułatwiając rozwój i testy."
  },
  {
    question: "9. Why do we 'stagger the startup' of multiple blind motors?",
    options: [
      "To make all blinds move at slightly different speeds",
      "To introduce controlled delays between motor starts so peak current stays within the power budget",
      "To save flash memory on the ESP32",
      "To turn off the Wi-Fi radio permanently"
    ],
    correct: 1,
    explanation: "'To stagger the startup' (rozłożyć rozruch w czasie) oznacza uruchamianie silników po kolei z małym opóźnieniem, aby nie przekroczyć budżetu mocy (power budget)."
  },
  {
    question: "10. Which linking phrase best introduces an additional technical argument in an interview?",
    options: [
      "Overthere, ...",
      "Moreover, ...",
      "In the and, ...",
      "By the way, ..."
    ],
    correct: 1,
    explanation: "'Moreover,' (lub 'Furthermore,') to profesjonalny łącznik oznaczający 'Ponadto / Co więcej', idealny do rozwijania argumentacji technicznej."
  }
];

