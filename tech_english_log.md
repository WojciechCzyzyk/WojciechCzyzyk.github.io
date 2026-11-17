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

