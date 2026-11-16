# 🇬🇧 Tech English Interview Log & Feedback Loop

*Osobista baza pytań rekrutacyjnych z obszarów Embedded, C++20, RTOS, RF/RFID oraz Edge-to-AI. Zawiera poprawione odpowiedzi w standardzie korporacyjnym oraz rejestr słownictwa i zwrotów do regularnego utrwalania.*

## 🎯 Zasady Pracy (Pętla Zwrotna & KPI)
1. **1 pytanie dziennie** z podpowiedzią 4–5 kluczowych pojęć (aktywacja słownictwa).
2. **Wymóg 80% trafień (KPI):** W swojej odpowiedzi masz obowiązek użyć w praktyce **minimum 80% podpowiadanych słów/zwrotów** (np. min. 4 z 5). AI na początku oceny podaje dokładny wynik procentowy użycia słownika.
3. **Code Review & Wersja „Pro”:** Krótka korekta naturalności i pisowni + gotowa, wygładzona odpowiedź na rozmowę techniczną.
4. **Powtórki krzyżowe:** AI monitoruje sekcję *Do utrwalenia* i za kilka sesji wraca do tematu, zadając pytanie z innej strony (parafraza), aby sprawdzić opanowanie zwrotów w boju.

---

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
