const quizData = [
  {
    question: "1. Choose the correct spelling for software functionalities in: 'We can implement new ___ over the air via Wi-Fi.'",
    options: [
      "feathers",
      "features",
      "futures",
      "feauters"
    ],
    correct: 1,
    explanation: "'Features' to funkcje/funkcjonalności oprogramowania. 'Feathers' to pióra ptaków — klasyczna pułapka pisowni na rozmowach technicznych!"
  },
  {
    question: "2. Which closing phrase sounds most natural and professional after explaining a technical architecture to an interviewer?",
    options: [
      "Is it sound cleat for you?",
      "Is it clear for you?",
      "Does that make sense?",
      "Do you understand my words?"
    ],
    correct: 2,
    explanation: "'Does that make sense?' lub 'Does that sound clear?' to naturalny standard inżynierski w Dolinie Krzemowej — brzmi pewnie i partnersko."
  },
  {
    question: "3. Choose the correct summary connector: '___, before releasing any update, we run automated HIL tests.'",
    options: [
      "In the and,",
      "At the and,",
      "In the end,",
      "On the end,"
    ],
    correct: 2,
    explanation: "'In the end,' (na koniec / w rezultacie) piszemy przez 'end', nigdy 'and'. Świetny łącznik zamykający odpowiedź."
  },
  {
    question: "4. How do you correctly spell 'równolegle' in: 'The capture register latches the timer value ___ with CPU execution'?",
    options: [
      "in paralel",
      "in pararell",
      "in parallel",
      "in paralell"
    ],
    correct: 2,
    explanation: "'In parallel' piszemy przez podwójne 'll' w środku i pojedyncze 'l' na końcu (para-ll-el). Częste słowo w architekturze sprzętowej i wielowątkowej."
  },
  {
    question: "5. Which verb form is grammatically correct after prepositions like 'without' or 'when'?",
    options: [
      "without block the main loop",
      "without blocking the main loop",
      "during modify the database",
      "for avoid data conflicts"
    ],
    correct: 1,
    explanation: "Po przyimkach ('without', 'when', 'before', 'after') czasownik przyjmuje końcówkę '-ing': 'without blocking', 'when modifying'."
  },
  {
    question: "6. Choose the correct noun form after 'each': 'We preserve a single source of truth in ___.'",
    options: [
      "each files",
      "every files",
      "each file",
      "all file"
    ],
    correct: 2,
    explanation: "Po słowach 'each' i 'every' zawsze stawiamy rzeczownik w liczbie pojedynczej: 'in each file' (w każdym pliku)."
  },
  {
    question: "7. How do you naturally say 'znacznie niższy koszt' without double comparison?",
    options: [
      "much more lower cost",
      "more lower cost",
      "much lower cost",
      "most lower cost"
    ],
    correct: 2,
    explanation: "Przymiotnik 'low' stopniujemy przez dodanie '-er' ('lower'), więc nie dodajemy już 'more'. Wzmacniamy go słowem 'much': 'much lower cost'."
  },
  {
    question: "8. Which connector means 'Ponadto / Co więcej' and belongs to our 4-part signposting skeleton?",
    options: [
      "Overthere,",
      "Moreover,",
      "However,",
      "Although,"
    ],
    correct: 1,
    explanation: "'Moreover,' oraz 'Furthermore,' znaczą 'Ponadto / Co więcej' i idealnie rozwijają drugi argument w odpowiedzi technicznej."
  },
  {
    question: "9. Choose the correct spelling for 'na pewno' in: 'We will ___ test this on real hardware before deployment.'",
    options: [
      "for shore",
      "four sure",
      "for sure",
      "for shure"
    ],
    correct: 2,
    explanation: "'For sure' (na pewno) — częsty błąd fonetyczny to zapis 'for shore' (shore = brzeg morski)."
  },
  {
    question: "10. Which phrase sounds most natural when clarifying an ambiguous question from a technical interviewer?",
    options: [
      "Just to clear your ask...",
      "Just to clarify the requirement...",
      "Only for clarify question...",
      "I want make sure what you mean..."
    ],
    correct: 1,
    explanation: "'Just to clarify the requirement...' (Żeby doprecyzować wymaganie...) pokazuje dojrzałość architekta systemowego i kupuje cenne sekundy na ułożenie odpowiedzi."
  },
  {
    question: "11. Choose the correct spelling of the term for network or interrupt delay:",
    options: [
      "latensy",
      "latancy",
      "latency",
      "lattency"
    ],
    correct: 2,
    explanation: "'Latency' (latencja / opóźnienie — przez 'c' i jedno 't') to kluczowe pojęcie zarówno w systemach Hard Real-Time (interrupt latency), jak i w chmurze."
  },
  {
    question: "12. Choose the grammatically correct passive voice sentence: 'Time-critical tasks ___ through hardware interrupts.'",
    options: [
      "are handle",
      "is handled",
      "are handled",
      "handling"
    ],
    correct: 2,
    explanation: "Liczba mnoga ('tasks') + strona bierna ('are' + III forma '-ed'): 'Time-critical tasks are handled through hardware interrupts.'"
  }
];
