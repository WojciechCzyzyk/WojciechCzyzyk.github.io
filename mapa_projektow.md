# 🗺️ Centralna Mapa Projektów i Zasobów (Single Source of Truth)

*Plik stanowi jedyne źródło prawdy o strukturze plików we wszystkich repozytoriach ekosystemu. Aktualizowany wyłącznie wtedy, gdy powstaje, znika lub zmienia lokalizację konkretny plik.*

---

## 1. Centralne Repozytorium Kontekstu i Portfolio
* **Repozytorium:** `https://raw.githubusercontent.com/WojciechCzyzyk/WojciechCzyzyk.github.io/refs/heads/main/`
* **Strona WWW:** `https://wojciechczyzyk.github.io`
* **Pliki w repozytorium:**
  - `AI_context.md` — główna pamięć operacyjna i logi postępów
  - `mapa_projektow.md` — bieżący rejestr wszystkich plików w ekosystemie
  - `tech_english_log.md` — dziennik treningowy Tech English z pętlą zwrotną (KPI 80%)
  - `index.html` — główna witryna portfolio (Edge-to-AI, Embedded, R&D)
  - `favicon_wc.png` — ikona mikroprocesora WC (64×64 px)
  - `sitemap.xml` — mapa witryny dla Google Search Console
  - `CV.md` — modułowe CV inżynierskie
  - `KARIERA_AI.md` — strategia rekrutacyjna i profil kompetencji
  - `PROJEKT_STORY.md` — historia projektów i wdrożeń
  - `inne/BIOGRAFIA_WOJTKA.md` — oś życiowa i osiągnięcia (szybownictwo, rajdy rowerowe)
  - `sarenka_biznes.md` — strategia biznesowa, finansowa i B2B Akademii APEX
  - `docs/sarenka/umowa_NDA_APEX.md` — wzór umowy o zachowaniu poufności (NDA)
  - `procedury_APEX.md` — centralny rejestr procedur operacyjnych SOP
  - `zasady_lekcji_probnych.md` — procedura zarządzania lekcjami próbnymi
  - `pomysly_na_lekcje.md` — bank autorskich scenariuszy warsztatowych APEX
  - `pomysly_na_quiz.md` — katalog formatów aplikacji edukacyjnych
  - `docs/PZON_wskazowki_lekarz.md` — wytyczne do zaświadczenia lekarskiego PZON
  - `docs/Karta_Koncepcyjna_Apex_AI_Copilot.pdf` — jednostronicowa ulotka ofertowa autorskich systemów APEX AI Copilot i Edge-to-AI (katalog dokumentów i załączników WWW)

---

## 2. Repozytorium Embedded C++20 (Sterownik Rolet)
* **Repozytorium:** `https://raw.githubusercontent.com/WojciechCzyzyk/esp32-smart-blinds/refs/heads/main/`
* **Pliki w repozytorium:**
  - `src/main.cpp` — główny plik uruchomieniowy ESP32
  - `BlindsManager.h` / `BlindsManager.cpp` — logika biznesowa i matematyka pozycji % (C++20)
  - `BlindsSequencer.h` / `BlindsSequencer.cpp` — sekwencjoner mocy i arbitraż przekaźników (budżet USB)
  - `platformio.ini` — konfiguracja środowiska i flag kompilatora (`-std=gnu++20`)
  - `logika_sterowania.md` / `funkcje_steruje_rolet.md` — dokumentacja architektury
  - `tests/BlindsController.h` / `tests/BlindsController.cpp` — archiwalny kod testowy

---

## 3. Repozytorium Akademii Cyfrowej Inżynierii APEX (Sarenka Software Kids)
* **Repozytorium:** `https://raw.githubusercontent.com/WojciechCzyzyk/sarenka/refs/heads/main/`
* **Strona WWW:** `wojciechczyzyk.github.io/sarenka/`
* **Pliki w repozytorium:**
  - `index.html` — główny Landing Page szkoły (Syllabus, FAQ, UAT, SEO)
  - `style.css` — odseparowany arkusz stylów Dark Mode / RWD
  - `rezerwacja.html` — formularz zapisów (dwukanałowy AJAX: Formspree + Make.com)
  - `szkola.html` — oferta warsztatów B2B dla szkół podstawowych
  - `odpowiedz.html` — ekran potwierdzenia zgłoszenia
  - `favicon_sarenka.png` — ikona sarenki z porożem `< >` (64×64 px)

---

## 4. Repozytorium Mentorskie i Poligon Edukacyjny (Bartek)
* **Repozytorium:** `https://raw.githubusercontent.com/BartekCzyzyk/BartekCzyzyk.github.io/refs/heads/main/`
* **Strona WWW:** `https://bartekczyzyk.github.io/`
* **Pliki w repozytorium:**
  - `index.html` — strona główna portfolio i centrum treningowego (z blokadą `noindex`)
  - `www/agile-style.css` — arkusz stylów witryny
  - `favicon_bartek.png` — ikona `BC` z przyciskiem Play (64×64 px)
  - `.github/workflows/ai_mentor.yml` — potok CI/CD robota *APEX AI Code Mentor* (z Watchdogiem 2 min i `thinkingBudget: 0`)
  - `mentor/mentor.css` / `mentor/mentor.js` — widżet wyświetlający komentarze AI na żywo
  - `mentor/status_ai.json` — aktualny komunikat na wyświetlacz
  - `mentor/mentor_log.json` — pamięć długoterminowa postępów ucznia
  - `AI_context_junior.md` / `asystent_dzielenia.md` — kontekst deweloperski juniora i projekt Scratch
  - `quizy/quiz_silnik.js` / `quizy/quiz_stopka.js` — współdzielony silnik quizów i stopka atrybucyjna
  - `quizy/historia/konkurs_szkolny_sp2.html` — trening ogólny z historii Polski
  - `quizy/historia/quiz_sp2_chrobry.html` / `quiz_sp2.css` / `quiz_sp2_pytania.js` / `quiz_sp2_silnik.js` — modułowy quiz o SP nr 2 i Bolesławie Chrobrym
  - `quizy/historia/Kompendium_SP2_Chrobry_Bartek.pdf` — ściągawka PDF do druku
  - `quizy/historia/nauka_do_konkursu_historia.jpg` / `konkurs_sp2.jpg` / `konkurs_igor_julek.jpg` — grafiki awatarów i drużyn klasy 5B
  - `quizy/biologia/test_z_bud_komorek.html` / `komorki_obrazki.html` — aplikacje treningowe z biologii
  - `quizy/geografia/test_geografia.html` / `geografia_pytania.js` + 6 grafik `geo_*.jpg` — modułowy trener geografii Polski

---

## 5. Repozytorium Pilotażowe B2B: Smart School RFID + AI
* **Repozytorium:** `https://raw.githubusercontent.com/WojciechCzyzyk/smart-school-ai/refs/heads/main/`
* **Strona WWW:** `wojciechczyzyk.github.io/smart-school-ai/`
* **Pliki w repozytorium:**
  - `index.html` — interaktywna prezentacja kokpitu świetlicy (Drag & Drop, strefy UHF RFID / NFC, radiowęzeł TTS, alerty AI) oraz powiązane moduły CSS/JS
