# 🗺️ Centralna Mapa Projektów i Zasobów (Single Source of Truth)

*Plik stanowi jedyne źródło prawdy o strukturze plików we wszystkich repozytoriach ekosystemu. Aktualizowany wyłącznie wtedy, gdy powstaje, znika lub zmienia lokalizację konkretny plik.*

---

## 1. Centralne Repozytorium Kontekstu i Portfolio
* **Repozytorium:** `https://raw.githubusercontent.com/WojciechCzyzyk/WojciechCzyzyk.github.io/refs/heads/main/`
* **Strona WWW:** `https://wojciechczyzyk.github.io`
* **Katalog główny (Core & Portfolio):**
  - `ai_context.md` — główna pamięć operacyjna i logi postępów
  - `mapa_projektow.md` — bieżący rejestr wszystkich plików w ekosystemie (Single Source of Truth)
  - `tech_english_log.md` — dziennik treningowy Tech English z pętlą zwrotną (KPI 80%)
  - `index.html` — główna witryna portfolio (Edge-to-AI, Embedded, R&D)
  - `style.css` — arkusz stylów głównej witryny portfolio
  - `favicon_wc.png` — ikona mikroprocesora WC (64×64 px)
  - `sitemap.xml` — mapa witryny dla Google Search Console
  - `README.md` — opis główny repozytorium na GitHubie
  - `sarenka_biznes.md` — strategia biznesowa, finansowa i B2B Akademii APEX
  - `pomysly_na_lekcje.md` — bank autorskich scenariuszy warsztatowych APEX
  - `pomysly_na_quiz.md` — katalog formatów aplikacji edukacyjnych
  - `apex_copilot_biznes.md` — strategia wdrożeń B2B, przewagi i metodyka APEX AI Copilot (oddzielona od edukacji)
  - `Architektura_Wzorce_Wdrozeniowe_APEX.md` — obowiązujące standardy architektoniczne (wzorzec uniwersalnego adaptera DB, chmura, UX Zero-Training, Poka-Yoke oraz ścieżka klonowania i wdrożeń B2B)
  - `zalety_systemu.md` — rejestr przewag konkurencyjnych, metafor sprzedażowych („telewizor z pilotem”) i obserwacji z oddziału dla systemu Smart Ward Board
  - `ekosystem_rodzinny.jpg` — zbiorcza ilustracja zespołu rodzinnego (Bartek, Krzyś, Olusia i dwa koty w akcji).
  - `olusia_studio.jpg` — ilustracja Działu Kreatywnego & UX (Olusia rysująca na podłodze w towarzystwie dwóch kotów).

* **Podkatalog `living-ai/` (Architektura Samodoskonalących się Systemów AI):**
  - `living-ai/index.html` — dedykowana podstrona prezentująca koncepcję *Living AI Systems* (*Continual Learning & Context Engineering*), 4-etapową pętlę adaptacji, porównanie z systemami Enterprise oraz 3 żywe wdrożenia


* **Podkatalog `docs/` (Dokumenty ofertowe, CV, formalne i załączniki WWW):**
  - `docs/wojciech_czyzyk_CV.md` — modułowe CV inżynierskie
  - `docs/Karta_Koncepcyjna_Apex_AI_Copilot.pdf` — jednostronicowa ulotka ofertowa autorskich systemów APEX AI Copilot i Edge-to-AI
  - `docs/PZON_wskazowki_lekarz.md` — wytyczne do zaświadczenia lekarskiego PZON
  - `docs/sarenka/umowa_NDA_APEX.md` — wzór umowy o zachowaniu poufności (NDA)
* **Podkatalog `inne/` (Materiały uzupełniające, techniczne i biograficzne):**
  - `inne/ai_start.md` — podręczny link startowy do inicjalizacji sesji AI
  - `inne/biografia_wojtka.md` — oś życiowa i osiągnięcia (szybownictwo, rajdy rowerowe)
  - `inne/projekt-story-smart-blinds.md` — historia powstania i architektura sterownika rolet ESP32
  - `inne/strategia-rozwoju-zawodowego.md` — strategia rekrutacyjna i profil kompetencji
  - `inne/syllabus_drony_uav.md` — szczegółowy program i koncepcje modułu dronowego UAV
  - `inne/wifi_dom.md` — dokumentacja architektury sieci domowej
  - `inne/wskazowki-github.md` — robocze notatki i wytyczne dotyczące GitHuba
* **Podkatalog `inne/bartek/` (Archiwalne i robocze materiały rozwojowe Bartka):**
  - `inne/bartek/projekt-bartka-dzielenie-pisemne.md` — koncepcja i logika projektu asystenta dzielenia pisemnego w Scratchu
  - `inne/bartek/dziel_bartek.md` — robocze notatki algorytmiczne do dzielenia pisemnego
  - `inne/bartek/historia_Polski.md` — materiały źródłowe do quizów historycznych
  - `inne/bartek/bartek-tmp.html` — roboczy szablon HTML poligonu
* * **Podkatalog `tech-english/` (Interaktywny Poligon Tech English & R&D):**
  - `index.html` — główny Hub poligonu z opisem metody KPI 80% i kartami modułów
  - `tstyle.css` — wspólny arkusz stylów dla Huba i podmodułów quizów
  - `silnik.js` — uniwersalny silnik testów z wyjaśnieniami inżynierskimi
  - `modul-1-sesje-1-4/index.html` — widok pierwszego quizu (Sesje #1–#4)
  - `modul-1-sesje-1-4/pytania.js` — baza 10 pytań z obszarów ARM7, UHF RFID, Context Engineering i ESP32
  - `modul-2-sesja-5/index.html` — widok drugiego quizu (Sesja #5: Event-Driven & Webhooks)
  - `modul-2-sesja-5/pytania.js` — baza 6 pytań z obszaru architektury zdarzeniowej i pamięci JSON
  - `modul-3-sesja-6/index.html` — widok trzeciego quizu (Sesja #6: Modular Architecture & Separation of Concerns)
  - `modul-3-sesja-6/pytania.js` — baza 6 pytań z obszaru modularności, eliminacji duplikacji i Single Source of Truth
  - `modul-4-sesja-7/pytania.js — baza 6 pytań B2B SaaS & Medical IT Architecture
  -  modul-4-sesja-7/index.html — widok czwartego quizu (Sesja #7: B2B SaaS & Medical IT)
   - modul-4-sesja-7/pytania.js — baza 6 pytań z obszaru UX, Auto-Fallback AI, RODO i architektury Sidecar App

* **Podkatalog `dyzurka-iot/` (System Smart Ward Board & Mobile QR — Kokpit Oddziału):**
  - `index.html` — główny kokpit dyżurki (tablica sal 404–408 i 413–414, obchód lekarski, tablica zadań Kanban z filtrem statusów, opis ogólny pacjenta, zarządzanie personelem oraz raporty: Zmiany, Dnia Pacjenta i Dnia Oddziału + AI)
  - `telefon.html` — mobilny terminal przyłóżkowy („pilot do systemu”: skaner plakietek QR na żywo przez `BarcodeDetector` + `jsQR`, odczyt ekranów mierników i odręcznych notatek przez Gemini Vision AI z Auto-Fallback, dyktowanie głosowe oraz odhaczanie zadań Kanban przy łóżku)
  - `app.js` — logika biznesowa, Drag & Drop z blokadami Poka-Yoke, generator plakietek QR łóżka A6, silnik Kanban, wykresy trendów SVG oraz generatory raportów dobowych i zmiany AI (druk A4 + kopiowanie do HIS)
  - `db.js` — uniwersalny adapter warstwy danych (Firebase Realtime Database REST API z blokadą pustego zapisu, izolowany rejestr odwiedzin oraz fallback `localStorage`)
  - `style.css` — wysokokontrastowy arkusz stylów klinicznych (Dark Mode / RWD)
  - `README.md` — dokumentacja techniczna architektury, ról i wdrożenia katalogu
* **Podkatalog `krzys/` (Strefa Junior Testera — architektura modułowa *1 sekcja = 1 plik*):**
  * `krzys/index.html` — lekki szkielet kontenera ładujący dynamicznie sekcje z podkatalogu `sekcje/`.
  * `krzys/style.css` — wydzielony arkusz stylów strefy Krzysia.
  * `krzys/sekcje/powitanie.html` — blok powitalny i baner.
  * `krzys/sekcje/minecraft.html` — pierwsza recenzja gry i werdykt testera.
  * `krzys/sekcje/wyzwania.html` — interaktywna lista wyzwań (+100 XP).

* **Podkatalog `ola/` (Strefa CEO & UX Designer — architektura modułowa *1 sekcja = 1 plik*):**
  - `ola/index.html` — główny szkielet kontenera ładujący dynamicznie sekcje z podkatalogu `sekcje/`
  - `ola/style.css` — wydzielony arkusz stylów strefy kreatywnej Olusi
  - `ola/sekcje/powitanie.html` — blok powitalny CEO & UX Designer
  - `ola/sekcje/tablica.html` — interaktywna tablica do rysowania palcem (`<canvas>`)
  - `ola/sekcje/galeria.html` — galeria ilustracji z ciepłymi opisami w stylu IT
  - `ola/sekcje/ola_puzzle.jpg` — ilustracja układania puzzli z jednorożcem pod nadzorem kociego Działu QA
  - `ola/sekcje/ola_most_klocki.jpg` — ilustracja testów wytrzymałościowych mostu z klocków (CEO & UX Designer)
  - `ola/sekcje/ola_rolki.jpg` — panoramiczna ilustracja pętli `while(true)` na rolkach wokół komina ze sznurkiem i kotami
  - `ola/sekcje/komiks_sprint_404.jpg` — 4-kadrowy komiks z udziałem całej domowej ekipy R&D (Bata, Ys, Olusia i koty) o porannym stand-upie i błędzie 404




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
  - 
### 📦 Pakiet Materiałów: Lekcja Próbna APEX (Karty Kanban + Przewodniki)
* **Scenariusz zbiorczy (bez kodu):** `Scenariusz_Lekcji_Probnej_APEX_Bez_Kodu.pdf`
* **Instrukcja konfiguracji tablicy Kanban dla Junior Mentora:** `Instrukcja_Kanban_Bartek_APEX.pdf` (`instrukcja_kanban_bartek.md`)
* **11 atomowych kart zadań pod GitHub Projects (Kanban):**
  * `etap_0_konto_i_pages.md` — Rejestracja konta GitHub i uruchomienie GitHub Pages
  * `etap_1_architektura_i_style.md` — Utworzenie głównego arkusza stylów `style.css`
  * `etap_1_architektura_i_index.md` — Utworzenie szkieletu `index.html` z 3 kontenerami `iframe`
  * `etap_1_architektura_i_o_mnie.md` — Utworzenie folderu `sekcje/` i pliku `sekcje/o-mnie.html`
  * `etap_1_architektura_i_pasje.md` — Utworzenie pliku `sekcje/pasje.html`
  * `etap_1_architektura_i_cele.md` — Utworzenie pliku `sekcje/cele.html`
  * `etap_2A_1_tekst_o_mnie.md` — Generowanie opisu „O mnie” z AI i wklejenie do kodu
  * `etap_2A_2_obrazek_o_mnie.md` — Generowanie awatara z AI i osadzenie w `sekcje/o-mnie.html`
  * `etap_2B_1_bonus_tekst_pasje.md` — Misja bonusowa: generowanie listy pasji z AI
  * `etap_2B_2_bonus_obrazek_pasje.md` — Misja bonusowa: generowanie grafiki do sekcji pasji
  * `etap_3_final.md` (`etap_3_final.pdf`) — Premiera na smartfonie i wyzwanie podsumowujące 80% KPI Tech English

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
  - `quizy/biologia/test_z_bud_komorek.html` / `komorki_obrazki.html` / `bata_rysuje_bilogia.jpg` — aplikacje treningowe i grafika wizytówki z biologii


---

## 5. Repozytorium Pilotażowe B2B: Smart School RFID + AI
* **Repozytorium:** `https://raw.githubusercontent.com/WojciechCzyzyk/smart-school-ai/refs/heads/main/`
* **Strona WWW:** `wojciechczyzyk.github.io/smart-school-ai/`
* **Pliki w repozytorium:**
  - `index.html` — interaktywna prezentacja kokpitu świetlicy (Drag & Drop, strefy UHF RFID / NFC, radiowęzeł TTS, alerty AI) oraz powiązane moduły CSS/JS
