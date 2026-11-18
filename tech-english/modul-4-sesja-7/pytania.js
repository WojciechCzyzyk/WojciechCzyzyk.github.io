const quizData = [
  {
    question: "1. A nurse in a busy ward logs patient vital signs in seconds by scanning a QR badge and snapping a photo without typing. What UX/architectural concept does this represent?",
    options: [
      "Feature bloat",
      "Legacy system",
      "Zero-friction data entry",
      "Front-end overlay"
    ],
    correct: 2,
    explanation: "'Zero-friction data entry' (wprowadzanie danych bez oporu) oznacza usunięcie zbędnych kliknięć, podmenu i ręcznego wpisywania, dzięki czemu rejestracja pomiarów przy łóżku trwa kilka sekund."
  },
  {
    question: "2. During peak demand on the primary Gemini AI model, the app seamlessly switches to a backup model in under a second without failing. What is this mechanism called?",
    options: [
      "Auto-fallback mechanism",
      "Privacy by design",
      "Feature bloat",
      "Batch export"
    ],
    correct: 0,
    explanation: "'Auto-fallback mechanism' (mechanizm automatycznego przełączania na model zapasowy) gwarantuje niezawodność systemu — gdy główny serwer AI jest przeciążony, kod sam przełącza się na zapasowy model."
  },
  {
    question: "3. The mobile scanner crops only the device screen and never sends patient names or PESEL numbers to external AI APIs. Which architectural principle is applied here?",
    options: [
      "Legacy system refactoring",
      "Front-end sidecar overlay",
      "Audit trail logging",
      "Privacy by design"
    ],
    correct: 3,
    explanation: "'Privacy by design' (ochrona prywatności wpisana w architekturę) oznacza zaprojektowanie systemu od podstaw tak, aby dane wrażliwe pacjentów nigdy nie opuszczały bezpiecznej strefy."
  },
  {
    question: "4. Instead of replacing an old hospital HIS system, you deploy a lightweight web dashboard alongside it to streamline daily ward workflows. What is this architectural pattern called?",
    options: [
      "Front-end overlay (sidecar app)",
      "Zero-friction data entry",
      "Auto-fallback mechanism",
      "Audit trail"
    ],
    correct: 0,
    explanation: "'Front-end overlay (sidecar app)' to lekka, nowoczesna nakładka operacyjna działająca obok ciężkiego systemu głównego (Legacy System), usprawniająca pracę bez kosztownej wymiany całego oprogramowania."
  },
  {
    question: "5. Every time a doctor or nurse updates medications or logs vitals, the system records who did it, what changed, and the exact timestamp. What is this chronological record called?",
    options: [
      "Feature bloat",
      "Audit trail",
      "Legacy system",
      "Auto-fallback mechanism"
    ],
    correct: 1,
    explanation: "'Audit trail' (ślad audytowy) to niepodważalny, chronologiczny rejestr wszystkich działań w systemie (kto, co i kiedy wykonał), kluczowy dla bezpieczeństwa medycznego i rozliczalności."
  },
  {
    question: "6. Over many years, a legacy enterprise application accumulates dozens of unused menus and cluttered settings that slow staff down. What industry term describes this problem?",
    options: [
      "Privacy by design",
      "Audit trail",
      "Front-end overlay",
      "Feature bloat"
    ],
    correct: 3,
    explanation: "'Feature bloat' to przeładowanie oprogramowania zbędnymi, nieużywanymi funkcjami, które komplikują interfejs i spowalniają codzienną pracę personelu."
  }
];
