# 🚁 SYLLABUS ROCZNY: Szkoła Pilotów i Programistów UAV (28 Lekcji)
**Akademia Cyfrowej Inżynierii APEX (Sarenka Software Kids)**  
*Opracowanie merytoryczne: Pilot Szybowcowy III Klasy & Senior Embedded Engineer*

---

## 🧭 KWARTAŁ I: Podstawy Lotnictwa, BHP i Pierwsze Kroki w Scratchu (Lekcje 1–7)
*Cel: Zaszczepienie lotniczej dyscypliny, opanowanie 4 osi sterowania oraz pierwszych autonomicznych startów i lądowań.*

* **Lekcja 1: Odprawa Przedlotowa (Briefing) i Fizyka Lotu.** Jak lata wielowirnikowiec (siła nośna, moment obrotowy śmigieł, dlaczego dwa śmigła kręcą się w lewo, a dwa w prawo). Bezpieczeństwo w strefie lotów (strefa buforowa, osłony śmigieł, hasło alarmowe „STOP / LĄDOWANIE AWARYJNE”).
* **Lekcja 2: Checklista Przedstartowa i Pierwszy Zawis.** Tworzenie własnej papierowej i cyfrowej checklisty (bateria > 30%, śmigła, kalibracja IMU, czysta mata). Połączenie drona z laptopem i pierwszy skrypt w Scratchu: *Start ➔ Zawis 3 s ➔ Lądowanie*.
* **Lekcja 3: Cztery Osie Pilota (Throttle, Yaw, Pitch, Roll).** Zrozumienie układu współrzędnych w 3D (góra/dół, obrót wokół własnej osi, przód/tył, lewo/prawo). Precyzyjne przesunięcia o zadaną liczbę centymetrów (`50 cm`, `100 cm`).
* **Lekcja 4: Lot po Kwadratowej Krąg-Trasie (Pętle `powtórz`).** Wykorzystanie pętli do optymalizacji kodu. Porównanie długiego kodu „linijka po linijce” z czystą pętlą `powtórz 4 razy`.
* **Lekcja 5: Geometria w Powietrzu – Trójkąt i Sześciokąt (Kąty Zewnętrzne).** Praktyczna lekcja matematyki w 3D: dlaczego wpisanie `60°` w trójkącie równobocznym psuje trasę i jak obliczyć kąt zewnętrzny (`180° - kąt wewnętrzny`).
* **Lekcja 6: Zmiana Wysokości i Lot Schodkowy (Profil Pionowy).** Łączenie ruchu w poziomie (`Pitch`) ze zmianą pułapu (`Throttle`). Omijanie niskich przeszkód (przelot nad kartonowym „wzgórzem”).
* **Lekcja 7: Egzamin Praktyczny I Kwartału – „Licencja Kadeta UAV”.** Samodzielne napisanie trasy „Koniczynka” (4 pętle ze zmianą wysokości) i lądowanie w wyznaczonym kwadracie 1x1 m.

---

## 🎯 KWARTAŁ II: Nawigacja Precyzyjna, Zmienne i Misje Slalomowe (Lekcje 8–14)
*Cel: Wprowadzenie zmiennych, pomiarów terenowych, kalibracji dryfu i precyzyjnego pilotażu bez kontroli wzrokowej.*

* **Lekcja 8: Zmienne w Lotnictwie (Prędkość, Pułap, Dystans).** Zastępowanie sztywnych liczb („magic numbers”) zmiennymi w Scratchu (`predkosc_przelotowa`, `wysokosc_bezpieczna`).
* **Lekcja 9: Pomiary Terenowe i Planowanie Trasy (Mapa Lotnicza).** Uczniowie dostają miarkę, mierzą rozstaw bramek w sali, rysują plan lotu na kartce i przeliczają centymetry na komendy w kodzie.
* **Lekcja 10: Misja „Bramki Slalomowe” (Przelot przez Obręcze).** Zaprogramowanie płynnego przelotu przez dwie obręcze ustawione na różnych wysokościach.
* **Lekcja 11: Lądowanie na Punkt (Konkurencja Szybowcowa).** Nawiązanie do zawodów szybowcowych: start z bazy, wykonanie rundy po sali i przyziemienie dokładnie w środku tarczy punktowej (100 / 50 / 20 pkt).
* **Lekcja 12: Lot po Krzywej i Łukach (`go` / lot po współrzędnych X, Y, Z).** Wyjście poza proste kąty 90° – lot po przekątnej sali z jednoczesnym wznoszeniem się.
* **Lekcja 13: Akrobacje Kontrolowane i Zarządzanie Energią.** Kiedy dron może wykonać obrót (`flip`), dlaczego akrobacja zużywa dużo prądu i zablokowana jest przy niskim napięciu baterii (symulacja rezerwy paliwa).
* **Lekcja 14: Egzamin Praktyczny II Kwartału – „Misja Ratunkowa w Górach”.** Dostarczenie „pakietu medycznego” (przelot nad przeszkodą, ominięcie strefy zakazanej, lądowanie na małym lądowisku i powrót do bazy).

---

## 🐍 KWARTAŁ III: Przejście na Kod Tekstowy – Python i Telemetria (Lekcje 15–21)
*Cel: Porzucenie klocków na rzecz prawdziwego języka Python (`djitellopy`), odczyt czujników pokładowych i logowanie parametrów lotu.*

* **Lekcja 15: Pierwszy Skrypt w Pythonie – Sterowanie z Konsoli.** Instalacja i struktura biblioteki `djitellopy`. Różnica między blokami Scratcha a czystym kodem tekstowym (`tello.takeoff()`, `tello.move_forward(100)`).
* **Lekcja 16: Telemetria Pokładowa (Czarna Skrzynka Drona).** Odczyt na żywo stanu baterii (`get_battery()`), temperatury płyty głównej, wysokości barometrycznej oraz czasu lotu.
* **Lekcja 17: Bezpieczeństwo Programowe (Instrukcje Warunkowe `if / else`).** Programowanie własnego systemu zabezpieczeń: *„Jeśli bateria < 25% lub temperatura > 80°C – przerwij misję i wykonaj natychmiastowe lądowanie”*.
* **Lekcja 18: Sterowanie Klawiaturą w Czasie Rzeczywistym (Własny Kokpit).** Budowa własnego programu w Pythonie zamieniającego klawiaturę laptopa (`W, S, A, D`, strzałki, `Spacja`) w konsolę sterowania dronem (zdarzenia klawiatury).
* **Lekcja 19: Funkcje i Modułowość Kodu (`def patroluj_strefe():`).** Zamykanie powtarzalnych manewrów (np. startu, procedury skanowania pokoju, lądowania) w czyste funkcje w Pythonie.
* **Lekcja 20: Zwiadowca Powietrzny – Obsługa Kamery i Zapis Zdjęć.** Uruchomienie strumienia wideo z kamery drona w Pythonie (`OpenCV`), wykonanie zdjęcia z powietrza i zapis na dysku z datą i godziną.
* **Lekcja 21: Misja „Tajny Kod QR z Powietrza”.** Dron startuje, dolatuje do ukrytej na wysokości 1,8 m tablicy, robi zdjęcie i wraca na lądowisko; zadaniem zespołu jest odczytanie ukrytej wiadomości ze zdjęcia.

---

## 🛰️ KWARTAŁ IV: Zaawansowane Algorytmy, Eskadra i Finałowy Pokaz (Lekcje 22–28)
*Cel: Rozpoznawanie znaczników wizyjnych (Mission Pads), loty synchroniczne w eskadrze i wielki pokaz przed rodzicami.*

* **Lekcja 22: Nawigacja Względem Znaczników (Mission Pads / ArUco).** Jak dron rozpoznaje specjalne maty nawigacyjne pod sobą za pomocą dolnej kamery i sam koryguje swoją pozycję nad celem.
* **Lekcja 23: Autonomiczne Śledzenie Trasy po Matach.** Zaprogramowanie drona tak, aby sam „skakał” od maty nr 1 do maty nr 4, niezależnie od drobnych podmuchów powietrza w sali.
* **Lekcja 24: Wstęp do Wizji Komputerowej (Detekcja Koloru / Twarzy).** Prosty algorytm w Pythonie analizujący obraz z kamery drona (np. obrót drona w stronę czerwonego obiektu lub reakcja na ruch).
* **Lekcja 25: Synchronizacja Czasu i Lot w Formacji (Eskadra 2–3 Dronów).** Praca zespołowa: podział ról (Lider Eskadry, Skrzydłowy Lewy, Skrzydłowy Prawy), wspólna oś czasu i synchronizacja startu.
* **Lekcja 26: Próba Generalna Pokazu Finałowego (Debugowanie i Szlifowanie).** Testy pełnego scenariusza pokazu zespołowego, eliminacja błędów w skryptach, przygotowanie prezentacji i repozytorium na GitHubie.
* **Lekcja 27: Dokumentacja Inżynierska i Wideo z Misji.** Zgranie nagrań z kamery drona i kamery 4K z sali, montaż krótkiego filmu z przebiegu misji (CapCut) oraz publikacja kodu na własnym profilu GitHub.
* **Lekcja 28: Wielki Finał – Pokaz Lotniczy przed Rodzicami i Wręczenie Licencji.** Prezentacja kodu przez młodych inżynierów, synchroniczny lot finałowy na żywo oraz wręczenie imiennych licencji **„Młodego Pilota i Programisty UAV Akademii APEX”**.

---

### 📌 Lekcje Buforowe / Warsztaty Specjalne (3 dodatkowe sloty w roku)
* **Bufor 1:** *Budowa i druk 3D własnego lądowiska / uchwytu na kamerę lub osłony czujnika* (integracja z drukarką 3D Bambu Lab P1S).
* **Bufor 2:** *Symulator lotów (FPV / RC Simulator na laptopach)* – trening odruchów pilotażowych w gorszą pogodę.
* **Bufor 3:** *Hackathon Lotniczy* – otwarte wyzwanie zespołowe na koniec roku szkolnego.
