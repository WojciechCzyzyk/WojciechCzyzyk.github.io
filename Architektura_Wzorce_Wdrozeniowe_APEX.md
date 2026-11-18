# Standardy Architektury i Wzorce Wdrożeniowe — Ekosystem APEX

**Data opracowania:** 18.11.2026  
**Kontekst:** Wnioski inżynierskie i produktowe z budowy i pilotażu systemu *Smart Ward Board (`dyzurka-iot/`)*

---

## 1. Uniwersalny Adapter Danych (Wzorzec Repository / Nadbudowa)
* **Zasada izolacji warstwy danych:** Żaden plik interfejsu (`index.html`, `app.js`, `telefon.html`) nie komunikuje się bezpośrednio z konkretną bazą danych. Cała komunikacja przechodzi przez ustandaryzowany obiekt pośredniczący (np. `WardDB.load()`, `WardDB.save(data)`).
* **Łatwa migracja bez zmiany kodu aplikacji:** Dzięki nadbudowie wymiana darmowego backendu prototypowego (**Firebase Realtime Database**) na produkcyjną bazę relacyjną (**Supabase PostgreSQL EU**) lub tryb lokalny (`localStorage`) wymaga podmiany wyłącznie jednego małego pliku (`db.js`).
* **Odporność na formaty odpowiedzi chmury:** Adapter zawsze normalizuje struktury pobierane z REST API (np. konwersja obiektów indeksowanych `Object.values()` na czyste tablice oraz bezpieczna inicjalizacja brakujących pól).

---

## 2. Architektura Chmurowa i Koszty Utrzymania
* **Środowisko Prototypowe i Pilotażowe (0 zł / mies.):** Połączenie **GitHub Pages** (hosting statyczny ze ścieżkami względnymi) + **Firebase Realtime Database** (plan Spark z przedłużonymi regułami czasowymi lub autoryzacją). Zapewnia pracę 24/7 bez utrzymywania lokalnego serwera.
* **Środowisko Produkcyjne B2B (RODO / Komercyjne):** Połączenie **GitHub Pages / Vercel** + **Supabase (Plan Pro — region EU Frankfurt)**. Oferuje pełny silnik SQL (PostgreSQL), szyfrowanie, codzienne kopie zapasowe oraz rygorystyczną kontrolę dostępu (RLS) przy przewidywalnym, niskim koszcie stałym.
* **Klonowanie pod kolejne placówki:** Nowe wdrożenia (np. *Hematologia*, *Weterynaria*, *Rehabilitacja*) uruchamiamy jako niezależne podkatalogi ze ścieżkami względnymi i osobnym kluczem węzła w bazie danych (np. `/hemaData.json`, `/vetData.json`).

---

## 3. Projektowanie UX „Zero-Training” i Poka-Yoke
* **Przełamywanie oporu przed zmianą:** Zmęczeni pracownicy (personel medyczny, biurowy, techniczny) bronią swoich papierowych kartek z obawy przed skomplikowanymi programami. System musi oszczędzać ich czas od pierwszej sekundy bez konieczności szkoleń.
* **Mechanizmy Poka-Yoke (odporność na błędy użytkownika):**
  * Automatyczne przydzielanie pierwszego wolnego łóżka/stanowiska i przenumerowanie kolejności po każdym ruchu (*Drag & Drop*).
  * Twarde blokady limitów pojemności sal/boksów.
  * **Opóźniony zapis (5-second Debounce):** W tablicach zadań Kanban zmiana statusu utrwala się w historii po 5 sekundach (lub natychmiast przy zamknięciu okna), co pozwala bezstresowo cofnąć przypadkowe kliknięcie bez zaśmiecania kroniki.
* **Pełny Ślad Audytowy (Audit Trail):** Każda akcja (zlecenie lekarza, przygotowanie przez pierwszą pielęgniarkę, podanie przez drugą) zapisuje się jako osobny, nieusuwalny wpis z czasem i podpisem wykonawcy.

---

## 4. Integracja Sprzętowa IoT i Rynek Docelowy
* **Otwarte standardy pomiarowe:** Wykorzystanie protokołu **Web Bluetooth API (BLE GATT)** do bezpośredniego odczytu danych z certyfikowanych ciśnieniomierzy, termometrów i pulsoksymetrów bez ręcznego przepisywania wyników.
* **Najszybszy rynek wejścia (Beachhead Market):** Prywatne kliniki weterynaryjne (szpitaliki dla zwierząt), ośrodki rehabilitacji oraz domy opieki (ZOL) — placówki z krótką ścieżką decyzyjną i niską barierą wdrożeniową.
