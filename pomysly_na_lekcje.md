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

# 💡 BANK POMYSŁÓW NA LEKCJE & KURS „MAM 5 ZE SPRAWDZIANÓW!” — AKADEMIA APEX

*Zbiór autorskich scenariuszy i architektura nowego kursu rocznego opartego na filozofii **Need-Driven Learning** (nauka IT poprzez rozwiązywanie realnych, bieżących wyzwań szkolnych uczniów).*

---

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

### 🤖 Autorski System „APEX AI Code Mentor” (Automatyczne Code Review & Grywalizacja)
* **Koncepcja systemu:** Własny silnik dydaktyczny oparty na automatyzacji **GitHub Actions** oraz modelach językowych (LLM), który analizuje rzeczywisty kod pisany przez ucznia po każdym zatwierdzeniu zmian (`Commit / Push`) i prowadzi jego indywidualną historię rozwoju.
* **Pamięć i profilowanie postępów (`mentor_log`):** System przechowuje historię wcześniejszych wpisów i postępów konkretnego dziecka. Dzięki temu AI nie generuje powtarzalnych szablonów, lecz odnosi się do realnej ścieżki ucznia (np. docenia wyeliminowanie błędów z poprzednich zajęć i proponuje kolejne wyzwanie dopasowane do jego tempa).
* **Okienko postępu na żywo na stronie ucznia (Grywalizacja):** Na osobistej witrynie każdego dziecka (`nick.github.io`) znajduje się dedykowany widget **„Status od AI Mentora”**, który kilkanaście sekund po zapisaniu kodu wyświetla spersonalizowaną pochwałę oraz kolejną wskazówkę techniczną. Wyzwala to zdrową rywalizację, dumę z własnych rozwiązań i natychmiastową informację zwrotną na sali.
* **Podwójny strumień wyjściowy (Uczeń + Rodzic):** Z jednej analizy kodu (`git diff` + historia logów) system generuje dwa osobne komunikaty:
  1. **Dla ucznia (na stronę WWW):** Krótki, motywujący feedback techniczny w stylu partnerskiego mentora.
  2. **Dla rodzica (raport po zajęciach):** Zrozumiałe podsumowanie oparte na wzorcu *Feedback Sandwich* (konkretna pochwała za efekt + życzliwa wskazówka rozwojowa + bezpośredni link do działającego projektu).


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



