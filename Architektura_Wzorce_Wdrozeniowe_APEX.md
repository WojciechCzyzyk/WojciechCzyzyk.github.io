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


## 5. Model Szybkiej Nakładki Operacyjnej (Fast Front-End Overlay / Sidecar App)
* **Współistnienie zamiast kosztownej wymiany:** W średnich i dużych organizacjach (szpitale z systemami HIS, firmy z systemami ERP) wymiana głównego oprogramowania bywa zablokowana przez wieloletnie umowy, rozliczenia lub działy IT. W takich miejscach wdrażamy aplikację jako **niezależną, lekką warstwę operacyjną** stojącą obok systemu głównego.
* **Błyskawiczna rejestracja w biegu:** Pracownicy na pierwszej linii (przy łóżku pacjenta, na hali, na obchodzie) nie męczą się z przeklikiwaniem kilkunastu zakładek ciężkiego systemu — rejestrują powtarzalne czynności jednym kliknięciem na telefonie lub tablecie.
* **Zbiorczy eksport do systemu głównego:** Na koniec zmiany lub etapu pracy nakładka generuje gotowe, czyste podsumowanie (wydruk A4, tekst gotowy do wklejenia przez `Ctrl + V` lub plik CSV/API), dzięki czemu przeniesienie danych do głównego systemu zajmuje kilkanaście sekund zamiast kilkudziesięciu minut.

* # Standard Dydaktyczny Akademii — Architektura „1 Sekcja = 1 Mały Plik” (SOP)

## 1. Założenie Pedagogiczne (Zero Przeładowania Poznawczego)
Dziecko oraz początkujący kursant nie mogą zaczynać nauki od przeglądania kilkusetlinijkowego pliku HTML przeładowanego stylami i skryptami. Zamiast tego stosujemy **rozdzielenie odpowiedzialności** w najprostszej możliwej formie:
* **Szkielet główny (`index.html`):** Krótki kontener (ok. 30 linijek), w którym każda kolejna treść to **jedna powtarzalna linijka** `<section class="card" data-plik="sekcje/nazwa.html"></section>`.
* **Warstwa wyglądu (`style.css`):** Wydzielona całkowicie poza widok edytowanego tekstu, dzięki czemu uczeń nie zepsuje układu strony podczas pisania.
* **Klocki treści (`sekcje/*.html`):** Każdy temat (np. opis ulubionej gry, zadanie z matematyki, rysunek) to osobny, 5–10 linijkowy plik zawierający wyłącznie nagłówek i treść.

## 2. Powtarzalna Instrukcja Lekcyjna (3 Kroki dla Prowadzącego i Asystenta)
1. **Utwórz nowy mały plik** w folderze `sekcje/` (np. `sekcje/moja_gra.html`) i wpisz w nim tytuł oraz krótki opis.
2. **Skopiuj jedną linijkę** w pliku `index.html` i podaj w niej nazwę nowego pliku (`data-plik="sekcje/moja_gra.html"`).
3. **Odśwież stronę** i zobacz swój nowy kafelek na żywo.

## 3. Korzyści Operacyjne dla Akademii
* **Standaryzacja zajęć:** Lekcje przebiegają według przewidywalnego schematu bez konieczności wymyślania zadań na bieżąco.
* **Łatwe delegowanie i wsparcie asystentów:** Osoba wspierająca (np. Natalka lub starszy brat Bartek jako młodszy mentor) nie musi znać zaawansowanego programowania — pilnuje jedynie powtarzalnej, 3-krokowej instrukcji.
* **Spójność z praktyką inżynierską:** Kursant od pierwszego dnia wyrabia nawyk porządkowania kodu i dzielenia projektu na małe, niezależne moduły.

