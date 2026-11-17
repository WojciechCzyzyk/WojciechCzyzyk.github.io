const quizData = [
  {
    question: "1. What does 'separation of concerns' mean in software architecture?",
    options: [
      "Storing HTML, CSS, JavaScript, and data inside one single large file",
      "Dividing an application into distinct sections (styling, logic, data) so each handles a specific responsibility",
      "Deleting old GitHub repositories every week",
      "Running the database on a separate physical continent"
    ],
    correct: 1,
    explanation: "'Separation of concerns' (rozdział odpowiedzialności) oznacza podział projektu na osobne, wyspecjalizowane warstwy (np. style.css, silnik.js, pytania.js), dzięki czemu zmiana wyglądu nie psuje logiki."
  },
  {
    question: "2. How does a shared engine file ('silnik.js') eliminate 'code duplication'?",
    options: [
      "By compressing all images into black-and-white thumbnails",
      "Multiple quiz modules reuse the exact same logic file instead of copying and pasting it into every folder",
      "By blocking users from viewing the source code",
      "By automatically translating JavaScript into C++"
    ],
    correct: 1,
    explanation: "Wspólny plik 'silnik.js' eliminuje 'code duplication' (powielanie kodu) — zamiast kopiować tę samą logikę do 10 folderów, wszystkie moduły korzystają z jednego pliku."
  },
  {
    question: "3. Why does a modular folder structure improve 'scalability'?",
    options: [
      "It makes the monitor screen physically wider",
      "You can easily add new quiz modules or features without rewriting or breaking existing code",
      "It removes the need for a web browser",
      "It slows down page loading speed on mobile phones"
    ],
    correct: 1,
    explanation: "'Scalability' (skalowalność) w tym kontekście oznacza łatwość dokładania kolejnych modułów (np. modul-4, modul-5) bez ryzyka uszkodzenia już działających części."
  },
    {
    question: "4. What is the key benefit of keeping a 'single source of truth' for CSS styles?",
    options: [
      "Every module can have a completely broken layout",
      "Changing a color or font in one central 'style.css' file immediately updates all modules consistently",
      "It prevents students from using dark mode",
      "It automatically deletes unused HTML tags"
    ],
    correct: 1,
    explanation: "'Single source of truth' (jedno źródło prawdy) oznacza, że zmiana stylu w jednym centralnym pliku 'style.css' natychmiast aktualizuje wygląd całej aplikacji we wszystkich podkatalogach."
  },
  {
    question: "5. How does good 'maintainability' save time for a software architect?",
    options: [
      "The code never needs to be tested",
      "Clean, modular files are easy to read, debug, and update months later without hunting through thousands of lines",
      "It eliminates the need for version control like Git",
      "It forces all developers to use the same computer"
    ],
    correct: 1,
    explanation: "'Maintainability' (łatwość utrzymania) sprawia, że dzięki czystym, małym plikom łatwo znaleźć błąd i wprowadzić poprawkę po miesiącach bez przekopywania się przez tysiące linii kodu."
  },
  {
    question: "6. Which phrase means 'rozdział odpowiedzialności' in clean software design?",
    options: [
      "Context pollution",
      "Separation of concerns",
      "Vendor lock-in",
      "Inrush current"
    ],
    correct: 1,
    explanation: "'Separation of concerns' to fundament czystej architektury — każdy plik odpowiada wyłącznie za jedno konkretne zadanie."
  }
];

