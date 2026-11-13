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
