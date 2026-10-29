### Projekt Story: System Sterowania Roletami Smart Blinds (Nice TTBus + ESP32)

### 🌟 Geneza i Wyzwanie Inżynierskie

Projekt narodził się z realnej potrzeby domowej oraz chęci okiełznania zamkniętego, kapryśnego protokołu Nice TTBus. Zamiast kupować drogie, gotowe i ograniczone ekosystemy, podjąłem decyzję o zbudowaniu autonomicznego sterownika opartego na ESP32. Wyzwanie było potrójne: fizyczne bezpieczeństwo instalacji elektrycznej, stabilność zasilania mikrokontrolera przy uderzeniach prądowych silników oraz asynchroniczna komunikacja bez blokowania pętli głównej. 

### 🛠️ Architektura Systemu i Decyzje Projektowe

### 1. Hardware-Enforced Safety (Bezpieczeństwo na Poziomie Warstwy Fizycznej)

W projektowaniu urządzeń wykonawczych (Actuators) sterujących silnikami AC, błędy oprogramowania mogą doprowadzić do jednoczesnego podania fazy na uzwojenie otwierania i zamykania, co skutkuje spaleniem silnika lub pożarem. 

* **Rozwiązanie:** Zaprojektowałem układ z podwójnym systemem przekaźników (Interlocking Relays). Pierwszy przekaźnik decyduje o odcięciu/podaniu zasilania głównego, a drugi (przełączny) kieruje fazę ALBO na uzwojenie górne, ALBO dolne. Fizycznie niemożliwe jest podanie napięcia na oba uzwojenia naraz, niezależnie od błędów w kodzie czy zawieszenia mikrokontrolera.

### 2. Optymalizacja Energetyczna i Stabilność Logiki (FIFO Task Sequencer)

Rozruch silników rolet generował potężne szpilki prądowe, które potrafiły zbić napięcie na szynie zasilającej ESP32, doprowadzając do restartów (Brownout). 

* **Rozwiązanie:** Zaimplementowałem programowy sekwencer zadań oparty na kolejce FIFO (First-In, First-Out). Zadania wykonawcze są izolowane czasowo. Układ płynnie zarządza rozruchem, co pozwoliło ściąć pik prądowy do bezpiecznych 410mA. Cała logika ESP32 działa stabilnie nawet przy zasilaniu z portu USB.

### 3. Modelowanie Stanu bez Enkoderów (Dead Reckoning)

Rolety starszego typu nie raportują swojej dokładnej pozycji – znają tylko stan "otwarta/zamknięta" na podstawie fizycznych krańcówek. 

* **Rozwiązanie:** Wprowadziłem zmiennoprzecinkowy mechanizm estymacji pozycji bazujący na czasie (Dead Reckoning Algorithm). System mierzy realny czas wykonania pętli programu (Delta Time) i na tej podstawie precyzyjnie wylicza procentowe otwarcie rolety podczas ruchu, zapisując stan w pamięci nieulotnej (NVS) na wypadek zaniku zasilania.

### 4. Zero-Blocking Execution (Asynchroniczny Parser Szeregowy)

Komunikacja z magistralą Nice TTBus wymaga wysyłania i odbierania ramion danych. Klasyczne podejście z funkcjami typu delay() zamrażało działanie całego ESP32, uniemożliwiając poprawną pracę serwera HTTP i obsługę sieci. 

* **Rozwiązanie:** Cały parser UART / TTBus został przepisany na maszynę stanów (Finite State Machine) działającą asynchronicznie. Dane z bufora są konsumowane bajt po bajcie bez blokowania głównej pętli loop(), gwarantując natychmiastową reakcję na zapytania API i pingi sieciowe.

### 5. Odporność Sieciowa (Fallback Access Point)

Urządzenie IoT zamurowane w puszce elektrycznej po utracie połączenia z domowym Wi-Fi staje się bezużyteczną "cegłą". 

* **Rozwiązanie:** Autorski menedżer połączeń Wi-Fi wykrywa utratę sygnału. Po określonym czasie bezskutecznych prób ponownego połączenia, ESP32 automatycznie podnosi własną, bezpieczną sieć bezprzewodową (Fallback AP) z panelem konfiguracyjnym HTML, umożliwiając ratunkowe sterowanie i zmianę poświadczeń routera.

### 👨‍👦 Ekosystem Mentorski (Projekt Bartek)

Projekt Smart Blinds stał się również platformą edukacyjną dla mojego 11-letniego syna Bartka. Jako Technical Leader w tym dwuosobowym zespole, postawiłem sobie za cel wdrożenie go w świat IT zgodnie z najlepszymi praktykami inżynierii oprogramowania. 

* **Git i GitHub Desktop:** Bartek został całkowicie odcięty od barier czarnej konsoli tekstowej. Pracuje na narzędziach graficznych, ucząc się logicznego podziału zmian na commity oraz pracy na gałęziach.
* **Przełamywanie barier algorytmicznych:** Gdy Bartek zmagał się z logicznym zrozumieniem trudniejszych zagadnień matematycznych w szkole, przenieśliśmy ten problem do świata kodu. Rozbiliśmy algorytm dzielenia z resztą na logiczne bloczki w Scratchu, tworząc interaktywny kalkulator. Efekt? Pełne zrozumienie tematu, ocena celująca i potężny skok pewności siebie przed rówieśnikami.
* **Duma i Sukces:** Bartek samodzielnie wdrożył i opublikował swoją stronę internetową. Poczucie sprawczości, że jego praca jest widoczna globalnie pod własną domeną, odpaliło w nim prawdziwą inżynierską pasję.

### 🚀 Metodologia Pracy (Human-AI Hybrid Team)

Cały system powstaje w nowoczesnym paradygmacie **AI-Pair Programming**. Wykorzystuję zaawansowane modele językowe nie jako bezmyślne generatory kodu, ale jako partnerów architektonicznych. 

* **Zarządzanie kontekstem:** Za pomocą dedykowanych matryc pamięci (AI_context.md), agent AI doskonale zna ograniczenia sprzętowe, historię decyzji oraz aktualny stan projektu.
* **Pętle zwrotne:** Przed każdą sesją projektową stan kodu jest weryfikowany przez skanery automatyczne, co eliminuje halucynacje AI i gwarantuje, że generowane poprawki są idealnie dopasowane do fizycznego hardware'u.
