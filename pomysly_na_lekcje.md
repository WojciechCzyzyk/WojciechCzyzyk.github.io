# 💡 BANK POMYSŁÓW NA LEKCJE — AKADEMIA APEX (Sarenka Software Kids)

*Zbiór autorskich scenariuszy lekcyjnych generowanych metodą **Need-Driven Learning** (odpowiedź na realne problemy i wyzwania szkolne dzieci).*

---

## 🎯 Pomysł #1: Własny Interaktywny Trener Quizowy (Web + AI + GitHub)
* **Geneza (Prawdziwa potrzeba):** Przygotowanie Bartka do szkolnego konkursu wiedzy o historii Polski w SP nr 2 im. Bolesława Chrobrego w Jeleniej Górze. Zamiast biernego wkuwania dat z kartki – stworzenie własnej aplikacji webowej z podziałem na etapy (sprinty) i systemem rang.
* **Cel dydaktyczny:** Nauka dowolnego przedmiotu szkolnego (historia, przyroda, język angielski, lektury) poprzez grywalizację oraz opanowanie pracy ze strukturami danych (tablice obiektów w JS) i publikację aplikacji w chmurze.
* **Przebieg warsztatów (Mikro-Sprinty):**
  1. **Analiza i struktura danych:** Uczeń wybiera temat nadchodzącego sprawdzianu lub konkursu i przygotowuje bazę pytań z wyjaśnieniami.
  2. **Generowanie silnika z AI:** Przy pomocy Asystenta AI powstaje kod aplikacji w trybie Dark Mode z paskiem postępu, licznikiem punktów i ekranem rang.
  3. **Wdrożenie i Showcase:** Publikacja pliku (np. `quiz_historia.html`) na własnej stronie `nick.github.io` i udostępnienie linku rówieśnikom z klasy do wspólnego treningu.
* **Wartość dla rodzica i ucznia:** Dziecko uczy się materiału dwukrotnie (najpierw tworząc bazę pytań, a potem testując aplikację), zyskuje dumę z własnego narzędzia i staje się liderem technologicznym w klasie.


## 🏆 NOWY KONCEPT KURSU ROCZNEGO: „Mam 5 ze sprawdzianów! — Cyfrowy Warsztat Ucznia”

### 🎯 Główna Idea (Samonapędzający się silnik edukacyjny)
Zamiast uczyć dzieci oderwanych od życia przykładów, uczniowie przez cały rok budują **własny, osobisty kombajn narzędziowy do nauki na żywym materiale ze swojej szkoły**. Tematy zajęć nie są sztywne — **dzieci same przynoszą je w plecakach** (nadchodząca klasówka, trudny dział z matematyki, lista słówek z angielskiego, lektura).

### 🎚️ Architektura Modułowa (Profilowanie pod wiek i poziom grupy)
System opiera się na gotowych „klockach technologicznych”, które instruktor dopasowuje do rocznika:
* **Poziom Junior (np. klasy 3–4 SP):** Generowanie interaktywnych quizów webowych z pomocą AI, cyfrowe fiszki z obrazkami, prosty Szkolny Kanban (zero zapomnianych prac domowych). Nacisk na promptowanie, publikację w chmurze (`nick.github.io`) i natychmiastowy efekt WOW.
* **Poziom Pro (np. klasy 5–8 SP):** Zaawansowane symulatory algorytmiczne w Scratchu (np. *Asystent Dzielenia Pisemnego* z klonowaniem matrycy), aplikacje webowe z syntezatorem mowy (Web Speech API do nauki wymowy słówek), rozbudowane struktury danych w JS oraz praca z gałęziami w Git.

### 🧱 Baza Klocków / Narzędzi do budowania na zajęciach:
1. **Własny Trener Quizowy (Historia, Przyroda, Geografia, Lektury):** Aplikacja webowa w Dark Mode z podziałem na etapy, paskiem postępu, wyjaśnieniami i systemem rang. Dziecko uczy się raz tworząc bazę pytań, a drugi raz grając w swoją grę i udostępniając link klasie.
2. **Matematyczny Symulator Krok po Kroku (Scratch / JS):** Program, który nie podaje gotowego wyniku, lecz podświetla kolejne etapy obliczeń i uczy zrozumienia algorytmu (ułamki, pola figur, kolejność działań).
3. **Trener Słówek i Wymowy (Języki obce):** Cyfrowe fiszki z licznikiem powtórek i wbudowanym lektorem przeglądarkowym czytającym angielskie/niemieckie słowa.
4. **Generator Pigułek Wiedzy (Polski / Biologia):** Mądre wykorzystanie AI do zamiany 4 stron podręcznika w przejrzystą, interaktywną stronę-ściągawkę przed sprawdzianem.
5. **Szkolny Kanban (Agile w praktyce):** Osobista tablica na GitHub Projects do zarządzania terminami klasówek, lektur i zadań domowych.

### 🚀 Przewaga Rynkowa (USP dla Rodzica):
* **Mierzalny efekt w dzienniku (Librus/Vulcan):** Rodzic widzi realną poprawę ocen i samodzielność dziecka bez ślęczenia nad książkami pod przymusem.
* **Kurs dla każdego profilu ucznia:** Idealny zarówno dla ścisłowców, jak i humanistów potrzebujących lepszych ocen z historii czy języków.
* **Wirusowy marketing w klasie:** Uczeń wrzuca link do swojego quizu na grupę klasową przed sprawdzianem — cała klasa uczy się z aplikacji stworzonej w Akademii APEX.

## 📸 Pomysł #2: Od zdjęcia z podręcznika do własnej aplikacji quizowej (Data Flow & OCR)
* **Źródło inspiracji:** Bartek po sukcesie z trenerem historycznym sam poprosił o stworzenie kolejnego quizu – tym razem na sprawdzian z biologii. Zamiast ręcznego przepisywania definicji, przetestowaliśmy potok przetwarzania zdjęć z podręcznika na gotową aplikację.
* **Cel dydaktyczny:** Zrozumienie pełnego przepływu danych w systemach IT (*Input ➔ Processing ➔ Output*), nauka kontroli jakości danych wejściowych oraz budowanie skalowalnego „Centrum Treningowego” na własnej stronie WWW.
* **Przebieg lekcji (Mikro-Sprinty):**
  1. **Akwizycja i Kontrola Jakości Danych (QA):** Uczeń robi zdjęcia stron z podręcznika lub zeszytu. *Lekcja inżynierska:* zasada **Garbage In, Garbage Out (GIGO)** – jeśli zdjęcie jest ucięte lub nieostre, system (AI) wygeneruje błędne pytania. Uczeń uczy się weryfikować jakość surowych danych przed wrzuceniem ich do procesu.
  2. **Ekstrakcja i Parsowanie (OCR + AI):** Wrzucenie czystych zdjęć do asystenta AI z odpowiednim promptem, aby wyciągnął kluczowe pojęcia, definicje oraz podpisy ze schematów i zamienił je w ustrukturyzowaną bazę pytań.
  3. **Wdrożenie Produkcyjne:** Zapisanie wygenerowanego kodu jako nowego pliku (np. `quiz_biologia.html`) w repozytorium GitHub.
  4. **Rozbudowa Hubu Edukacyjnego (`index.html`):** Dodanie nowego kafelka do sekcji „Moje Centrum Treningowe” na stronie głównej ucznia oraz przygotowanie placeholdera („W przygotowaniu”) na kolejny przedmiot.
* **Profilowanie trudności:**
  - *Poziom Junior (klasy 3–4):* 10 pytań zamkniętych na podstawie jednej strony z podręcznika + proste podpięcie gotowego linku na stronie.
  - *Poziom Pro (klasy 5–8):* Wielostronicowy materiał (np. cały dział z biologii/geografii), własna edycja tablicy pytań w kodzie JS oraz zarządzanie kilkoma modułami w hubie.


* **Złota Reguła Dydaktyczna APEX (Instant Feedback):** Wdrożenie natychmiastowych, krótkich objaśnień pod każdym pytaniem w quizie okazało się kluczowym sukcesem edukacyjnym – dziecko nie zgaduje na ślepo, tylko od razu rozumie swój błąd i błyskawicznie przyswaja materiał (zatwierdzone jako obowiązkowy standard dla wszystkich aplikacji w Akademii APEX).

### 💡 Pomysł #3: Szkoła Pilotów i Programistów UAV (Programowanie Mini-Dronów)
* **Wiek / Poziom:** Klasy 4–8 (poziom Junior: Scratch / DroneBlocks; poziom Pro: Python + `djitellopy`).
* **Sprzęt:** 2–3 programowalne mini-drony z osłonami śmigieł (np. DJI Tello EDU) + mata lądowiska i bramki slalomowe.
* **Koncepcja:** Połączenie prawdziwej dyscypliny lotniczej (checklista przedstartowa, fizyka siły nośnej, orientacja przestrzenna X/Y/Z i Yaw) z pisaniem kodu sterującego autonomicznym lotem w sali. Dzieci uczą się matematyki i geometrii w 3D (kąty zewnętrzne wielokątów, obliczanie tras na zmiennych) oraz przetwarzania obrazu z kamery drona.
* **Pełny rozkład 28 lekcji:** Zobacz dedykowany plik `syllabus_drony_uav.md`.

### 💡 Pomysł #4: Kieszonkowy Komputer BBC micro:bit v2 (Most między Scratch'em a Elektroniką)
* **Wiek / Poziom:** Klasy 3–6 (Microsoft MakeCode: klocki ➔ automatyczna konwersja na Python / JavaScript).
* **Sprzęt:** 6x płytka BBC micro:bit v2 (5 dla uczniów + 1 instruktorska) + koszyki bateryjne i przewody USB.
* **Koncepcja:** Bezpieczny start w świat elektroniki bez plątaniny przewodów. Wykorzystanie wbudowanych czujników (akcelerometr, kompas, czujnik temperatury, mikrofon, matryca LED 5x5) do budowy cyfrowej kostki do gry, krokomierza, alarmu wstrząsowego oraz bezprzewodowego komunikatora radiowego między stanowiskami uczniów.

### 💡 Pomysł #5: „Aplikacja na zamówienie klienta – architektura modułowa i praca z wymaganiami”
* **Źródło inspiracji:** Koledzy Bartka z klasy po zobaczeniu jego portfolio sami poprosili o stworzenie quizu z historii szkoły (SP2 w Jeleniej Górze) i Bolesława Chrobrego.
* **Cel dydaktyczny:**
  - Nauka zbierania wymagań od „klienta” (czego potrzebują koledzy z klasy przed konkursem).
  - Zrozumienie **architektury modułowej** – dlaczego dzielimy duży kod na 4 małe pliki (`index.html`, `style.css`, `pytania.js`, `silnik.js`), zamiast trzymać wszystko w jednym wielkim pliku.
  - Samodzielna rozbudowa aplikacji: uczeń dopisuje nowe pytania do tablicy w pliku `pytania.js` bez ryzyka zepsucia działania całej gry.
* **Efekt WOW:** Uczeń publikuje gotową aplikację + PDF na swojej stronie i wysyła link klasie, stając się lokalnym liderem technologicznym.


### 💡 Pomysł #6: „Mój cyfrowy ślad – dlaczego używamy Nicku i jak działa blokada Google `noindex`”
* **Źródło inspiracji:** Projektowanie bezpiecznego modelu zgód i prywatności (Privacy by Design) dla niepełnoletnich uczniów w umowie Akademii APEX.
* **Cel dydaktyczny:**
  - Nauka podstaw cyberbezpieczeństwa i ochrony danych osobowych w sieci (dlaczego deweloperzy operują bezpiecznym pseudonimem/nickiem i awatarem zamiast podawać pełne dane adresowe).
  - Zrozumienie różnicy między **stroną dostępną po linku** (dla znajomych i rodziny) a **stroną indeksowaną przez roboty wyszukiwarek** (publiczną dla całego świata).
  - Praktyczna edycja sekcji `<head>` w pliku `index.html` – dodanie znacznika `<meta name="robots" content="noindex, nofollow">` jako cyfrowej tarczy chroniącej stronę przed botami.
* **Efekt WOW:** Uczeń świadomie kontroluje widoczność swojego projektu w internecie, a rodzice zyskują 100% poczucie bezpieczeństwa i zaufania do metodyki Akademii.

### 🤖 Autorski System „APEX AI Code Mentor” (Pełna Architektura & Grywalizacja)

#### 1. Filary Systemu (Zamknięta Pętla Edukacyjna)
* **Własny Awatar Ucznia (`avatar_base`):** Na 1–2. zajęciach dziecko projektuje z AI swojego spersonalizowanego bohatera, który staje się jego cyfrową wizytówką i głównym bohaterem kroniki sukcesów.
* **Pamięć i Profilowanie Ucznia (`mentor_log.json`):** Każde repozytorium ucznia (`nick.github.io`) posiada plik logów przechowujący historię: datę, temat, wynik mikro-quizu, wcześniejsze pochwały oraz wskazówki rozwojowe. AI czyta tę historię przed oceną, dzięki czemu nie generuje powtarzalnych szablonów, lecz prowadzi indywidualny, długofalowy mentoring.
* **Okienko Postępu na Żywo na Stronie Ucznia (Grywalizacja):** Na osobistej witrynie dziecka znajduje się kafelek **„🤖 Status od AI Mentora”**, który kilkanaście sekund po zapisaniu kodu wyświetla pochwałę, następną wskazówkę techniczną oraz najnowszą ilustrację z jego awatarem.
* **5-Minutowy Mikro-Quiz na Koniec Zajęć:** Każde warsztaty kończą się krótkim, interaktywnym testem wiedzy z danego dnia. Wynik wpada automatycznie do logu ucznia jako twarde potwierdzenie opanowania materiału.
* **Podwójny Wyzwalacz Automatyzacji (GitHub Actions + LLM/Image API):**
  1. *Zwykły `Commit / Push` podczas lekcji:* Robot analizuje kod (`git diff`) + historię `mentor_log.json` i w 15 sekund aktualizuje tekstowy komentarz w okienku na stronie ucznia (niski koszt, brak spamu graficznego).
  2. *Wyzwalacz `FINAŁ` na koniec zajęć:* Odpala pełny pakiet: zapisuje wynik mikro-quizu do `mentor_log.json`, generuje spersonalizowaną grafikę z udziałem `avatar_base` ucznia w scence z dzisiejszego tematu oraz przygotowuje raport dla odbierającego rodzica według wzorca *Feedback Sandwich* (**1. Konkretna pochwała + 2. Życzliwa wskazówka rozwojowa + 3. Wynik quizu + 4. Link do projektu + 5. Grafika z awatarem**).

#### 2. Plan Wdrożenia w 4 Mikro-Sprintach (Poligon Testowy: `BartekCzyzyk.github.io`)
* **Sprint 1 (Front-End UI):** Dodanie na stronie ucznia kafelka **„🤖 Status od AI Mentora”** wczytującego dane dynamicznie z pliku `status_ai.json` oraz najnowszą grafikę sukcesu.
* **Sprint 2 (Struktura Pamięci):** Utworzenie pliku `mentor_log.json` przechowującego historię lekcji, wyniki mikro-quizów oraz dotychczasowe wskazówki AI.
* **Sprint 3 (Silnik GitHub Actions + AI):** Stworzenie workflow `.github/workflows/ai_mentor.yml` (z bezpiecznikiem `if: github.actor != 'github-actions[bot]'` zapobiegającym pętlom oraz kluczami API w `GitHub Secrets`), obsługującego tryb zwykły (tekst) i tryb `FINAŁ` (tekst + generowanie scenki z `avatar_base`).
* **Sprint 4 (Strumień dla Rodzica):** Przekazanie wygenerowanego podsumowania dnia dla rodzica (przez webhook Make.com / e-mail instruktora) do szybkiej akceptacji i wysyłki w ActiveNow.

---

## 💡 Pomysł #6: Laboratorium UAV — Autonomiczne Drony, Czujniki i „Latający Szachista” (Ścieżka Zaawansowana / R&D)

* **Źródło inspiracji:** Projektowanie pracowni R&D w ramach kosztorysu PFRON v15 (Eskadra UAV 5+1+1) oraz połączenie lotniczego doświadczenia założyciela z drukiem 3D (Bambu Lab P1S) i elektroniką (ESP32 / micro:bit).
* **Grupa docelowa:** Starsze grupy (klasy 5–8) oraz projekty semestralne / pokazy na Dni Otwarte.
* **Wykorzystywany sprzęt z pracowni:** 5× mini-dron treningowy, 1× dron średni z kamerą i modułem ESP32 (klasy RoboMaster TT), 1× flagowa platforma UAV z kamerą HD i otwartym SDK, drukarka 3D Bambu Lab P1S, dalmierze laserowe ToF VL53L1X, czujniki HC-SR04, sensory środowiskowe BME280/PMS5003, paski LED WS2812B, mikroserwa SG90 i elektromagnesy.

### 🎯 Katalog 7 Misji Warsztatowych (Mikro-Sprinty):

1. **„Latający Szachista” (Projekt Flagowy / Demo Day):**
   * *Cel:* Autonomiczny dron rozgrywający partię szachów na dużej szachownicy podłogowej (1,6 × 1,6 m).
   * *Mechanika:* Kamera dolna rozpoznaje znaczniki ArUco w rogach planszy, silnik szachowy w Pythonie (Stockfish) wylicza ruch, a dron opuszcza na cienkiej lince lekki elektromagnes sterowany z ESP32, podnosząc pionki z neodymowym magnesem i przenosząc je na docelowe pole bez podmuchu śmigieł tuż nad planszą.
2. **Autonomiczny Patrol Posiadłości (Computer Vision):**
   * *Cel:* Zaprogramowanie trasy oblotu posesji po współrzędnych lub punktach orientacyjnych z podglądem na żywo w Pythonie/OpenCV.
   * *Mechanika:* Detekcja otwartej bramy lub obecności osoby w strefie i automatyczna wysyłka zrzutu ekranu z powiadomieniem.
3. **Latająca Stacja Pogodowa i Smogowa (Telemetria Środowiskowa):**
   * *Cel:* Zbadanie pionowego profilu czystości powietrza nad działką (przy ziemi, na 15 m i 30 m wysokości).
   * *Mechanika:* Moduł ESP32 z czujnikami **BME280** (ciśnienie, temperatura, wilgotność) oraz **PMS5003** (pyły zawieszone PM2.5/PM10) zapisuje pomiary na karcie SD, a dzieci rysują wykresy zmian z wysokością.
4. **Latający Radar — Unikanie Przeszkód (*Collision Avoidance*):**
   * *Cel:* Napisanie algorytmu autonomicznego zwiadowcy, który sam wyhamuje i ominie ścianę w korytarzu.
   * *Mechanika:* Wykorzystanie dalmierzy laserowych **ToF VL53L1X** lub ultradźwiękowych **HC-SR04** podpiętych po I2C/GPIO do kontrolera lotu.
5. **Nocna Misja Ratunkowa GOPR (Wizja + Sygnalizacja):**
   * *Cel:* Odnalezienie zaginionego „turysty” (znacznika w terenie) i oznaczenie jego pozycji dla ekipy ratunkowej.
   * *Mechanika:* Po wykryciu celu w kamerze dron zawisa nad nim, uruchamia stroboskop na adresowalnym pasku **LED WS2812B** i nadaje sygnał dźwiękowy buzzerem.
6. **Zrzut Kapsuły Humanitarnej (CAD + Druk 3D + Serwo):**
   * *Cel:* Precyzyjny zrzut ładunku na spadochronie w wyznaczoną strefę zrzutu.
   * *Mechanika:* Uczniowie projektują w Tinkercadzie i drukują na **Bambu Lab P1S** mechanizm zwalniający na mikroserwie **SG90** oraz kapsułę amortyzującą.

* **Wartość dla portfolio prowadzącego (R&D):** Rozwój własnych kompetencji w zakresie protokołu **MAVLink**, autopilotów **PX4 / ArduPilot**, fuzji sensorów oraz wizji komputerowej w Pythonie.

### 🏆 Standard Produktowy APEX: 3-Warstwowy Format Interaktywnego Quizu („Wizytówka Misji + Fajerwerk Reakcji + Mikro-Wyjaśnienie”)

* **Koncepcja (Wyróżnik rynkowy Akademii APEX):** Odejście od nudnych, formularzowych testów na rzecz autorskiego, grywalizowanego trenera wiedzy, który bawi, angażuje emocjonalnie i od razu tłumaczy materiał w locie.
* **Architektura (Wspólny Silnik `quizy/quiz_silnik.js` + `quizy/quiz_style.css`):** Oddzielenie warstwy logiki i wyglądu (umieszczonych centralnie w katalogu `quizy/`) od lokalnych baz pytań i grafik w podfolderach przedmiotowych (`quizy/geografia/`, `quizy/biologia/`, `quizy/historia/`).
* **Trzy obowiązkowe warstwy każdego nowego quizu:**
  1. **Wizytówka Misji (Nagłówek powitalny pod `<header>`):** Dedykowana ilustracja awatara ucznia w scenerii danego przedmiotu (np. z globusem, mapą i kompasem) + 2–3 zdania motywującego wstępu od twórcy oraz jasno określony cel misji.
  2. **Fajerwerk Reakcji Awatara (Natychmiastowa informacja zwrotna po kliknięciu):** Wyświetlanie spersonalizowanego awatara reagującego na wynik — radosny awatar z fajerwerkami i gratulacjami przy poprawnej odpowiedzi (`bartek_brawo.png`) lub żartobliwie grożący palcem przy błędzie (`bartek_uwaga.png`), z zabezpieczeniem `onerror` we wspólnym silniku.
  3. **Szybkie Wyjaśnienie Nauczycielskie (Dół karty odpowiedzi):** Zachowanie stałego bloku `explanation` pod każdym pytaniem — zwięzłego, przyjaznego objaśnienia przyczyny („dlaczego tak jest”), które utrwala wiedzę bez bezmyślnego wkuwania na pamięć.

## 🇬🇧 Żelazna Zasada Dydaktyczna: „Tech English przez Osmozę” (Contextual Immersion)

* **Cel:** Nie prowadzimy lekcji języka angielskiego, lecz oswajamy uczniów z globalną terminologią IT przy okazji praktycznego działania w kodzie i narzędziach (zero wkuwania słówek, zero bariery wejścia — zajęcia odbywają się po polsku).
* **Mechanizm („Język Doliny Krzemowej”):** Instruktor wprowadza maksymalnie 1–2 angielskie pojęcia na lekcję i używa ich naturalnie w kontekście wykonywanego zadania (np. *Commit, Push, Branch, Merge, Bugfix, Deploy, Sprint, Kanban, Backlog, Clean Code, Single Source of Truth*).
* **Efekt uboczny (Marketing Szeptany):** Dzieci chętnie przenoszą profesjonalnie brzmiące hasła na szkolne korytarze i do rozmów przy obiedzie, co buduje u nich dumę młodego inżyniera, a rodzicom daje natychmiastowy dowód wysokiej jakości warsztatów.

## 🗂️ Filar Dydaktyczny i Marketingowy: „Cyfrowy Porządek i Architektura Informacji”

* **Obietnica dla rodzica (Bonus życiowy):** Uczymy dziecko nie tylko pisania kodu, ale też **zarządzania wiedzą i porządkowania informacji** (*Information Architecture* & *Single Source of Truth*). Koniec z chaosem na Pulpicie, zgubionymi plikami i nerwowym szukaniem notatek przed klasówką.
* **Jak ćwiczymy to na warsztatach:**
  - **Czysta struktura katalogów:** Od pierwszej lekcji oddzielamy kod, wygląd i dane w osobnych plikach (*Separation of Concerns*), stosując przejrzyste nazewnictwo.
  - **Własna baza wiedzy i log postępów:** Uczeń prowadzi uporządkowany dziennik swoich projektów oraz buduje tematyczne repozytoria (np. osobne katalogi pod historię, biologię, matematykę), z których błyskawicznie korzysta przed sprawdzianem.
* **Wartość długofalowa:** Nawyk układania informacji w logiczne struktury obniża stres szkolny, uczy samodzielności i stanowi fundament pracy nowoczesnego inżyniera oraz menedżera.

## 🧱 Żelazny Standard Prowadzenia Lekcji: „Instrukcja LEGO & Kaizen” (Micro-Steps)

* **Cel (Zero Chaosu w 45–60 min):** Uczeń na jednych zajęciach buduje od zera działającą aplikację (np. quiz, kalkulator, grę), nie marnując czasu na szukanie opcji w interfejsie i nie gubiąc się w dużym kodzie.
* **5 Żelaznych Zasad „Instrukcji LEGO”:**
  1. **Tablica Kanban jako „Plansza Gry”:** Na starcie lekcji uczeń zakłada 3–4 krótkie karty zadań (`Do zrobienia` ➔ `W trakcie` ➔ `Gotowe`). Po każdym małym kroku fizycznie przesuwa kartę w prawo, czując natychmiastowy postęp.
  2. **1 Klocek = 1 Plik = 1 Commit:** Nigdy nie tworzymy kilku plików naraz. Krok po kroku: najpierw `style.css` (wygląd), potem `index.html` (szkielet), następnie `silnik.js` (logika), a na końcu `pytania.js` (dane).
  3. **Bezpieczne Porcje Kodu (Max 3 elementy na wklejenie):** Duże tablice danych (np. 10 pytań) dzielimy na małe paczki po 3 obiekty. Eliminuje to błędy składniowe (brakujące nawiasy/przecinki) i przyspiesza wklejanie.
  4. **Podlinkowane Skróty na Wierzchu (*Zero Searching*):** Materiały lekcyjne zawierają bezpośrednie linki do odpowiednich katalogów i narzędzi, aby uczeń nie tracił czasu na przeklikiwanie menu.
  5. **Retrospektywa Kaizen na Koniec Lekcji:** Po testach aplikacji wspólnie z dziećmi wyłapujemy, co sprawiło trudność, i zapisujemy krótką zasadę (*Poka-Yoke*), aby w kolejnym projekcie błąd się nie powtórzył.

### 🌟 Autorskie Wyróżniki Metodyczne Akademii APEX (Wypracowane na Poligonie R&D)

* **1. Zaprogramowany Copilot vs. „Surowy Czat w Domu”:** Rodzic często myśli: *„Włączę dziecku ChatGPT lub Gemini w domu i będzie to samo”*. Surowy model bez naszych autorskich reguł (*Behavioral Guardrails*) zasypuje dziecko ścianą tekstu i tworzy chaos (*Information Overload*). Nasz system jest zaprogramowany tak, by podawać wiedzę jak **instrukcję LEGO** — jeden mały klocek na raz, z bezpiecznymi paczkami kodu (max 3 elementy) i bezpośrednimi linkami pod ręką.
* **2. AI jako Osobisty „Mentor-Kumpel” i Poczucie Przynależności:** Wolne, nieprzeładowane tempo pracy sprawia, że uczeń na bieżąco zgłasza własne poprawki i personalizuje swojego asystenta (np. *„tłumacz mi na przykładach z Robloxa / Scratcha”*, *„wplataj słówka z hiszpańskiego”*). Dziecko traktuje swój plik kontekstu jak osobistego kumpla, do którego chętnie wraca na kolejne zajęcia, aby pochwalić się piątką ze sprawdzianu i budować swoje portfolio.
* **3. Kulturowe Smaczki Inżynierskie zamiast Suchego Kodu:** W trakcie rozwiązywania problemów wplatamy autentyczne pojęcia ze świata wielkiej inżynierii i przemysłu — japońskie *Kaizen* (ciągłe doskonalenie), *Poka-Yoke* (zapobieganie błędom u źródła) czy łacińskie *Veni, vidi, vici*. Dzieci uwielbiają te hasła i z dumą chwalą się nimi po zajęciach.


  - ### 🧱 Karta Scenariusza Lekcji Pokazowej (60 min): „Moja Pierwsza Mini-Strona i Quiz z AI”
*Wersja w standardzie „Instrukcja LEGO” dla Instruktora oraz Młodego Asystenta (11-letniego Bartka) — odpowiednia zarówno dla grupy dzieci (10–14 lat), jak i duetów „Rodzic + Dziecko”:*

* **1. Przygotowanie „Planszy Gry” (Tablica Kanban — 5 min):**
  - Na start instruktor lub Bartek ustawia na tablicy 3 kolumny (`Do zrobienia` ➔ `W trakcie` ➔ `Gotowe`) z **5 kartami zadań**: `Klocek Wyglądu`, `Klocek Szkieletu`, `Klocek Mózgu i Danych`, `Runda Bonusowa AI` oraz `Moja Wizytówka i Grafika`.

* **2. Klocek Wyglądu (`style.css` — 8 min):**
  - Uczniowie przesuwają Kartę 1 na `W trakcie`. Wklejają gotowy styl ciemnego motywu kosmicznego, zmieniając tylko swój ulubiony kolor przycisku, i przesuwają kartę na `Gotowe`.

* **3. Klocek Szkieletu (`index.html` — 8 min):**
  - Uczniowie przesuwają Kartę 2 na `W trakcie` i wklejają szkielet strony.
  - **Smaczek inżynierski:** Wprowadzamy japońskie pojęcie *Poka-Yoke* (zabezpieczenie przed pomyłką u źródła — dlatego pilnujemy dokładnych nazw plików).

* **4. Klocek Mózgu i Danych (`app.js` + Wolny Wybór Tematu — 15 min):**
  - Uczniowie przesuwają Kartę 3 na `W trakcie` i wybierają temat swojego testu z listy inspiracji (*Matematyka klasa 3*, *Ortografia bez błędów*, *Najlepsi piłkarze*, *Tajemnice kosmosu*, *Mistrz Minecrafta*) lub wymyślają własny.
  - Wklejają wygenerowaną przez Copilota **bezpieczną paczkę max 3 pytań** i testują quiz w przeglądarce.
  - **Smaczek inżynierski:** Po pierwszym udanym uruchomieniu sala przybija piątkę z hasłem *Veni, vidi, vici*, a po szybkiej poprawce *Kaizen* uczniowie rozwiązują nawzajem swoje autorskie quizy.

* **5. Runda Bonusowa: „Niespodzianka AI” (10 min):**
  - Po odhaczeniu Karty 3 Copilot proponuje każdemu dziecku **inną niespodziankę** dopasowaną do jego pasji (np. licznik punktów *Combo*, ukryty *Easter Egg* dla hakera, dźwięk zwycięstwa). W sali powstaje twórczy szum (*„Zobacz co mi AI wymyślił, masz to samo?!”*).

* **6. Finał: Spersonalizowana Wizytówka „O Mnie” + Grafika Tematyczna (10 min):**
  - Na koniec zajęć AI generuje spersonalizowany opis pasji ucznia (np. *„Cześć! Jestem Krzyś, uwielbiam piłkę nożną — sprawdź, czy zdasz mój autorski test!”*) oraz dedykowany obrazek tematyczny.
  - Uczeń wkleja ten blok na górę swojej strony, dzięki czemu **wychodzi z lekcji pokazowej z własną, działającą mini-stroną internetową (wizytówka + grafika + autorski quiz)**, którą od razu otwiera na telefonie rodziców po wyjściu z sali.


