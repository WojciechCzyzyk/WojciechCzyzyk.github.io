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

* ### 📼 RETRO INSPEKCJA: Jak zapach kalafonii ukształtował inżyniera

### Rozdział 1: Pierwsze starcie z kwasem i markerem (Klasa 2 Technikum)

Moja prawdziwa pasja do inżynierii cyfrowej eksplodowała w drugiej klasie technikum elektronicznego. Zachwycony przedmiotem *Technika Cyfrowa* – bramkami logicznymi, licznikami i rejestrami – postanowiłem natychmiast sprawdzić tę teorię w praktyce. Bez żadnych ułatwień, frameworków czy gotowych modułów. 

Kupiłem w lokalnym sklepie elektronicznym garść podstawowych scalaków (bramki, liczniki, dekoder wyświetlacza siedmiosegmentowego, generator oparty o układ z kwarcem) oraz surowy laminat miedziowy i zestaw do trawienia. Schemat narodził się na zwykłej kartce papieru, a ścieżki na płytce odręcznie odrysowałem zwykłym flamastrem. Trawienie odbywało się w kuwecie z nadsiarczanem sodu, którą podgrzewałem i bezustannie ruszałem, żeby przyspieszyć proces. Ścieżki wyszły trochę koślawo, niektóre podtrawiły się i pękły, ale naprawiłem je mostkami z cyny. 

Kiedy podłączyłem zasilanie i prosty stoper oparty na czystej logice cyfrowej ruszył, poczułem niesamowitą, czystą satysfakcję. Kwarc z czasem trochę się rozjeżdżał, ale układ działał. Do dziś leży gdzieś w moich rupieciach i czeka, aż pokażę go mojemu synowi Bartkowi, żeby zobaczył, jak budowało się komputery z pojedynczych bramek. 

### Rozdział 2: Zagadka morderczego akumulatora (Rok Później)

Bogatszy o tamto doświadczenie, rok później podjąłem się ambitniejszego projektu: budowy profesjonalnego zegara do pomiaru czasu w zawodach sportowych. Układ miał więcej funkcji, sygnały dźwiękowe i potężną matrycę wyświetlaczy LED. Z założenia miał pracować w terenie – albo z zasilacza sieciowego 12V, albo prosto z akumulatora samochodowego, bo na zawodach rzadko bywa gniazdko. 

I wtedy zderzyłem się z technologicznym „duchem w maszynie”. Układ testowany w pokoju na zasilaczu sieciowym działał stabilnie przez długie godziny. Jednak po wyjeździe w teren i podpięciu pod sprawny akumulator 12V z samochodu, zegar po kilku minutach bezlitośnie gasł. Po odczekaniu chwili i ostygnięciu – znowu ruszał, po czym po czasie znowu się wyłączał. 

**Rozwiązanie zagadki (Lekcja z fizyki półprzewodników i rezystancji wewnętrznej):**
Pod maską układu siedział kultowy stabilizator liniowy LM7805, który zbijał napięcie zasilania do sztywnych 5V wymaganych przez logikę cyfrową. Kluczem do zrozumienia anomalii była... wada fabrycznego zasilacza sieciowego. Zasilacz miał niską wydajność prądową i wysoką rezystancję wewnętrzną. Pod obciążeniem prądożernych wyświetlaczy LED jego napięcie drastycznie „siadało” z 12V do optymalnych 8-9V. Stabilizator miał więc minimalną nadwyżkę napięcia (tzw. dropout voltage) – stabilizował 5V, a sam wydzielał minimalne ilości ciepła. 

Akumulator samochodowy był jednak źródłem idealnym o niemal zerowej rezystancji wewnętrznej. Podpięcie zegara nie zrobiło na nim wrażenia i twardo trzymał ponad 12,6V. Stabilizator LM7805 został zmuszony do odłożenia na sobie w postaci czystego ciepła dwukrotnie większej mocy. Bez odpowiedniego odprowadzania ciepła struktura krzemowa błyskawicznie osiągała temperaturę krytyczną, co odpalało wewnętrzne zabezpieczenie termiczne (*Thermal Shutdown*). 

Problem rozwiązałem wtedy po inżyniersku: dokręciłem potężny radiator i wentylator. Układ przetrwał zawody, a ta historia dała mi bezcenną intuicję dotyczącą bilansu energetycznego i fizyki prądu, która do dziś chroni moje projekty embedded przed przegrzaniem.
