# 🇬🇧 Tech English Interview Log & Feedback Loop

*Osobista baza pytań rekrutacyjnych z obszarów Embedded, C++20, RTOS, RF/RFID oraz Edge-to-AI. Zawiera poprawione odpowiedzi w standardzie korporacyjnym oraz rejestr słownictwa i zwrotów do regularnego utrwalania.*

## 🎯 Zasady Pracy (Pętla Zwrotna & KPI)
1. **1 pytanie dziennie** z podpowiedzią 4–5 kluczowych pojęć (aktywacja słownictwa).
2. **Wymóg 80% trafień (KPI):** W swojej odpowiedzi masz obowiązek użyć w praktyce **minimum 80% podpowiadanych słów/zwrotów** (np. min. 4 z 5). AI na początku oceny podaje dokładny wynik procentowy użycia słownika.
3. **Code Review & Wersja „Pro”:** Krótka korekta naturalności i pisowni + gotowa, wygładzona odpowiedź na rozmowę techniczną.
4. **Powtórki krzyżowe:** AI monitoruje sekcję *Do utrwalenia* i za kilka sesji wraca do tematu, zadając pytanie z innej strony (parafraza), aby sprawdzić opanowanie zwrotów w boju.
-------------------------------------------------
## 🧭 Stały Szkielet Wypowiedzi (Signposting Language)
*Używaj tych 4 łączników jako rusztowania każdej odpowiedzi, żeby zyskać czas na dobór słownictwa technicznego:*
1. **Start (Wprowadzenie):** `First of all, ...` / `To begin with, ...` / `Just to clarify the requirement...` *(Żeby doprecyzować wymaganie...)*
2. **Rozwinięcie (Dodanie argumentu):** `Moreover, ...` / `Furthermore, ...` / `What is more, ...` *(Ponadto / Co więcej...)*
3. **Skutek / Przyczyna:** `Therefore, ...` / `As a result, ...` *(Dlatego / W rezultacie...)*
4. **Podsumowanie i zamknięcie:** `In the end, ...` / `Finally, ...` / `Does that make sense?` *(Czy to brzmi jasno / logicznie?)*

---------------------------------------------------

## 📚 Zalogowane Sesje Treningowe

### Sesja #1 (16.11.2026) — Hardware Input Capture & Interrupt Latency (ARM7)
* **Pytanie rekrutacyjne:** *"How did you ensure microsecond precision when capturing finish-line timestamps on an ARM7 microcontroller without RTOS?"*
* **Wersja „Pro” (Do utrwalenia):**
  > *"In a bare-metal system, polling an input continuously isn't reliable because the CPU is busy executing the main program. To solve this, I used the ARM7 hardware Input Capture feature. When the photocell signal arrives, a dedicated capture register latches the timer value in parallel, completely independent of the CPU execution. It then triggers an interrupt so the firmware can safely read the stored timestamp. Even though context switching introduces some interrupt latency, the measurement itself stays accurate—the only remaining delay is physical signal propagation along the cable, which can be calculated and compensated for in software. Does that make sense?"*
* **Słownictwo i zwroty do utrwalenia (Feedback Loop):**
  - `to latch the timer` — zatrzasnąć stan licznika
  - `triggers an interrupt to read / retrieve` — wyzwala przerwanie, aby odczytać (zamiast *throw interrupts in purpose get*)
  - `in parallel` — równolegle (pisownia)
  - `propagation delay` / `latency` — opóźnienie propagacji / latencja (pisownia)
  - `calculate and compensate for` — obliczyć i skompensować
  - `Does that make sense?` — naturalne zamknięcie wyjaśnienia technicznego (zamiast *Is it clear for you?*)

---

### Sesja #2 (16.11.2026) — UHF RFID Zone Isolation & RSSI Filtering (Smart School / Chrono Zachar)
* **Wynik KPI słownictwa:** 4 / 5 pojęć (**80%** — zaliczone: `transmit power`, `to filter out`, `RSSI threshold`, `hysteresis`; do utrwalenia: `false positives`).
* **Zwrot doprecyzowujący pytanie rekrutera (Bonus):**
  > *"Just to clarify the requirement—are you asking how I filter out **foreign tags** outside our database, or how I prevent reading **our own tags** when someone just walks past the room in the hallway?"*
* **Pytanie rekrutacyjne:** *"In a UHF RFID system, how do you prevent a reader inside a room from accidentally detecting tags carried by people walking past in the hallway?"*
* **Wersja „Pro” (Do utrwalenia):**
  > *"To prevent **false positives** from the hallway, I combine hardware and software techniques. First, I lower the reader's **transmit power** and calibrate the **RSSI threshold** by measuring the signal at the physical edge of the room. Second, in software, I **filter out** tags that are already active in an adjacent zone, or compare readings from two antennas to pick the **stronger signal**. Finally, I apply **hysteresis** to the RSSI thresholds so a tag near the boundary doesn't bounce back and forth between states. Does that make sense?"*
* **Słownictwo i zwroty do utrwalenia (Feedback Loop):**
  - `Just to clarify the requirement...` — Żeby doprecyzować wymaganie...
  - `foreign tags` / `unregistered tags` — obce / niezarejestrowane tagi (zamiast *alien tags*)
  - `false positives` — fałszywe odczyty (wykrycia spoza strefy)
  - `adjacent zone` — sąsiednia strefa
  - `stronger signal` — silniejszy sygnał (zamiast *more signal*)
  - `apply hysteresis` — zastosować histerezę (np. różny próg RSSI dla wejścia i wyjścia)
  - `bounce back and forth` — przeskakiwać w tę i z powrotem (migotanie stanu na granicy)
 
  - ---

### Sesja #3 (17.11.2026) — Context Engineering & Lightweight AI Copilots (APEX AI Copilot)
* **Wynik KPI słownictwa:** 4 / 5 pojęć (**80%** — zaliczone: `rapid adaptation`, `context pollution`, `Single Source of Truth`, `total cost of ownership (TCO)`; do utrwalenia: `vendor lock-in`).
* **Pytanie rekrutacyjne / B2B:** *"Why do you build custom, lightweight AI Copilots instead of just buying a commercial enterprise suite like Microsoft 365 Copilot?"*
* **Wersja „Pro” (Do utrwalenia):**
  > *"The biggest advantage of my system is **rapid adaptation**—we tailor the solution directly to your exact business goal without bloated features you never use. Moreover, we avoid **vendor lock-in** and **context pollution** by working with a **curated, up-to-date context** that we select together. This gives your team a clean **Single Source of Truth** that actually fits your daily workflow. As a result, the **total cost of ownership (TCO)** is much lower than in heavy enterprise suites. Does that make sense?"*
* **Słownictwo i zwroty do utrwalenia (Feedback Loop):**
  - `rapid adaptation` — szybkie dostosowanie do zmieniających się wymagań
  - `bloated features` — przeładowane, zbędne funkcje (zamiast *oversize function*)
  - `moreover` / `furthermore` — ponadto / co więcej (zamiast *overthere*)
  - `curated, up-to-date context` — wyselekcjonowany, aktualny kontekst (zamiast *actual selection context*)
  - `vendor lock-in` — uzależnienie od jednego dostawcy
  - `much lower` — znacznie niższy (zamiast podwójnego *much more lower*)

---

### Sesja #4 (17.11.2026) — Hardware Abstraction, Power Budget & Relay Arbitration (ESP32 C++20)
* **Wynik KPI słownictwa:** 5 / 5 pojęć (**100%** — zaliczone wszystkie: `inrush current`, `power budget`, `hardware abstraction`, `staggered startup`, `state machine` + wzorcowe użycie łączników `First of all`, `Furthermore`, `Moreover`, `As a result`).
* **Pytanie rekrutacyjne:** *"In your ESP32 smart blinds controller, how do you prevent multiple motors from starting at the exact same millisecond and overloading a limited USB power budget?"*
* **Wersja „Pro” (Do utrwalenia):**
  > *"First of all, I calculate the total power consumption of the controller electronics and the motors, taking into account their **inrush current**. Furthermore, I check how much power the USB source can safely supply to define my **power budget**. To stay within this limit, I implemented **hardware abstraction** via a dedicated sequencer class to **stagger the startup** of each blind. Moreover, I built a software **state machine** to manage the exact movement of every motor. As a result, I have full control over the system's power consumption and prevent voltage drops. Does that make sense?"*
* **Słownictwo i zwroty do utrwalenia (Feedback Loop):**
  - `calculate power consumption` — obliczyć pobór mocy (zamiast *count consumption*)
  - `supply power to a device` — dostarczyć zasilanie do urządzenia (zamiast *distribute to a tool*)
  - `to stagger the startup` / `staggered startup` — rozłożyć rozruch w czasie / sekwencyjny rozruch
  - `prevent voltage drops` — zapobiegać spadkom napięcia
  - `taking into account...` — biorąc pod uwagę...

---

### Sesja #5 (17.11.2026) — Event-Driven Pipelines, Webhooks & Persistent Context (Make.com / JSON)
* **Wynik KPI słownictwa:** 5 / 5 pojęć (**100%** — zaliczone wszystkie: `overhead`, `persistent memory`, `polling`, `webhook`, `event-driven architecture` + pełny zestaw łączników `First of all`, `Moreover`, `As a result`, `Finally`).
* **Pytanie architektoniczne:** *"Why do you use an event-driven architecture with webhooks and lightweight JSON files instead of polling APIs continuously or deploying a heavy SQL database?"*
* **Wersja „Pro” (Do utrwalenia):**
  > *"First of all, I want to reduce infrastructure **overhead** and keep the architecture simple—for lightweight workflows, you don't need a heavy **SQL database**. Moreover, using a single JSON file as **persistent memory** eliminates unnecessary complexity and maintenance costs. Instead of wasting resources on continuous **polling**, we rely on **webhooks** and platforms like Make.com. Finally, their built-in **event-driven architecture** handles queuing and retries out of the box, giving us reliable data delivery. Does that make sense?"*
* **Słownictwo i zwroty do utrwalenia (Feedback Loop):**
  - `SQL database` — baza danych SQL (zamiast *SQL base*)
  - `out of the box` — od razu po wyjęciu z pudełka / wbudowane standardowo
  - `queuing and retries` — kolejkowanie i ponawianie prób (w razie błędu sieci)
  - `maintenance costs` — koszty utrzymania
  - `reliable data delivery` — niezawodne dostarczanie danych
 
  - ---

### Sesja #6 (17.11.2026) — Modular Architecture & Separation of Concerns (`tech-english/`)
* **Wynik KPI słownictwa:** 5 / 5 pojęć (**100%** — zaliczone wszystkie: `maintainability`, `scalability`, `separation of concerns`, `code duplication`, `single source of truth` + pełny szkielet `First of all`, `Moreover`, `As a result`, `Does that make sense?`).
* **Pytanie architektoniczne:** *"Why do you split your web application into separate CSS, engine JS, and modular data folders instead of putting everything into one single HTML file?"*
* **Wersja „Pro” (Do utrwalenia):**
  > *"First of all, the most important things are **maintainability** and **scalability**—you can add new modules in a relatively easy way. Moreover, thanks to **separation of concerns**, you completely eliminate **code duplication** across the project. As a result, you always preserve a **single source of truth** in each file for your styling and core logic. Does that make sense?"*
* **Słownictwo i zwroty do utrwalenia (Feedback Loop):**
  - `new features / modules` — nowe funkcjonalności / moduły (zamiast *similar function*)
  - `eliminate code duplication` — wyeliminować powielanie kodu
  - `in each file` — w każdym pliku (po *each* zawsze liczba pojedyncza)
  - `preserve a single source of truth` — zachować jedno źródło prawdy

