# WOJCIECH CZYŻYK
**Embedded Systems Architect & Full-Stack Engineer**

* **Adres:** ul. Gajowa 9A, 58-521 Jeżów Sudecki, Polska

📍 Jeżów Sudecki / Jelenia Góra (Dolny Śląsk)

📞 +48 608 102 990
✉️ wojciechczyzyk@gmail.com
✉️ wczyzyk@o2.pl (zapasowy)


* **Profil Zawodowy:** Inżynier systemów oprogramowania o unikalnym, ponad 15-letnim doświadczeniu na styku hardware'u i software'u. Specjalista w obszarze systemów wbudowanych (Embedded, Bare-Metal ARM), systemów czasu rzeczywistego (Hard Real-Time), automatyzacji przemysłowej (BMS, protokoły Nice TTBus) oraz nowoczesnej architektury aplikacji (C++20, Perl, NodeJS, SQL). Łączy głębokie kompetencje niskopoziomowe z zaawansowaną znajomością systemów bazodanowych, mechanizmów współbieżności, analityki e-commerce (SEO/Google Ads) oraz zarządzania projektami (Agile/Scrum). Posiada licencję pilota szybowcowego III klasy (zrozumienie awioniki i systemów awaryjnych/Aerospace).

---

## 🛠️ KLUCZOWE KOMPETENCJE (TECH STACK)

* **Embedded & Hardware:** Bare-Metal ARM (Cortex-M, ARM7TDMI), programowanie układów FPGA (VHDL), mikrokontrolery 8051 (Assembler), przetwarzanie i konwersja sygnałów (ADC/DAC), odbiorniki i demodulatory IR (seria TSOP), projektowanie i symulacja układów analogowych/wzmacniaczy (pSpice), **tworzenie i czytanie dokumentacji technicznej oraz rysunku technicznego (CAD / integracja ECAD–MCAD)**.
* **Niezawodność i Systemy Krytyczne:** Projektowanie systemów redundantnych z arbitrażem i blokiem większościowego głosowania (TMR - Triple Modular Redundancy) zgodnych ze standardami Mission-Critical (SIL/Aerospace/Automotive).
* **Protokoły & Komunikacja:** Przemysłowa inżynieria wsteczna (Reverse Engineering) protokołów bezprzewodowych i przewodowych (Nice TTBus, RC5, NEC, Sony, VoiceXML). Praktyczna znajomość problematyki wielkich częstotliwości (RF) i linii długich na poziomie dopasowania impedancji na płytkach PCB.
* **E-commerce & Growth Analytics:** Pozycjonowanie stron (SEO), zaawansowana analityka ruchu i konwersji (Google Analytics), planowanie i optymalizacja płatnych kampanii reklamowych (Google AdWords / Ads).
* **Software Development & Backend:** C++20, C, Perl, NodeJS, HTML/CSS.
* **Bazy Danych & Współbieżność:** MySQL, SQLite – zaawansowane mechanizmy transakcyjne (ACID), blokowanie struktur (Table/Row Locking) optymalizowane pod wysoki ruch i systemy czasu rzeczywistego (High Concurrency / Multi-threading).
* **Zarządzanie & Narzędzia:** GitHub Enterprise, GitHub Projects (zaawansowane techniki bazodanowe, architektura Kanban/Tabela, automatyzacja procesów), UML (generowanie klas, Clean Architecture/MVC), ActiveNow, iFirma.

---

## 💼 DOŚWIADCZENIE ZAWODOWE I PROJEKTY INŻYNIERSKIE

### **Główny Inżynier Systemów Embedded – Komercyjne Urządzenia Pomiarowe**
*Zleceniodawca:* ZacharPLC (Karpacz)  
*Okres:* 2010 – 2020 (10 lat ciągłego rozwoju produktu)
* **Projekt i architektura ekosystemu „Chrono Zachar”:** Zaprojektowanie, oprogramowanie i rozwój autonomicznego chronometru sędziowskiego dedykowanego do ultra-precyzyjnego pomiaru czasu w masowych i ekstremalnych zawodach sportowych (np. maraton górski „3xŚnieżka = Mount Blanc”, wyścigi samochodowe na 1/4 mili, slalomy narciarskie w ujemnych temperaturach, turnieje strażackie TFA).
* **Architektura Bare-Metal ARM & Determinizm (Input Capture):** Opracowanie niskopoziomowego oprogramowania układowego (C/Assembler) dla 32-bitowych procesorów **NXP z serii LPC2140 / LPC2148** (rdzeń ARM7TDMI-S) bez warstw abstrakcji (HAL). Wykorzystanie sprzętowej funkcji *Input Capture* do mikrosekundowego zatrzaskiwania znaczników czasu w rejestrach krzemowych (CR), całkowicie eliminując błąd programowy *interrupt latency*.
* **Autorski Alokator Pamięci i Refaktoryzacja C++:** Przeprowadzenie 2-miesięcznej migracji systemu z języka C na obiektowy C++. Z powodu ograniczeń toolchainu GCC/Eclipse i ryzyka fragmentacji sterty, przeładowano globalny operator `new`. Zaimplementowano deterministyczną strukturę *Memory Pooling* oraz sortowanie oparte na szybkich tablicach wskaźników adresowych.
* **Bezpieczeństwo Fail-Safe & Autozapis:** Opracowanie systemu natychmiastowego odzyskiwania stanu urządzenia po zaniku zasilania. Ciągła struktura pamięci pozwalała na bezpośredni, niskopoziomowy zrzut binarny zawartości klas na kartę pamięci MMC przez SPI (stos *miniFAT*) i natychmiastowy rollback systemu.
* **Debugowanie Low-Level i Architektura Przerwań:** Zlokalizowanie i usunięcie trzymiesięcznego, losowego błędu zawieszania systemu związanego z naruszeniem ramki stosu IRQ po wymianie wyświetlacza LCD. Zaimplementowano architekturę *Top-Half / Bottom-Half*, izolując wektory przerwaniowe za pomocą elastycznych wskaźników na funkcje (*Function Pointers*).
* **Telemetria Radiowa i RFID:** Wdrożenie wielokanałowego systemu akwizycji danych. Oprogramowano niskopoziomową konfigurację rejestrów odbiornika RFID (filtry antykolizyjne, progi RSSI) i zaprojektowano algorytm parowania w locie dynamicznych paczek RFID z precyzyjnymi impulsami z fotokomórek (przewodowych oraz radiowych).
* **Systemy HMI i Ekwipunek Graficzny:** Opracowanie nieblokującego procesu jednoczesnej obsługi klawiatury matrycowej (programowy debouncing), lokalnego interfejsu (ewolucja: alfanumeryczne -> LCD -> OLED) oraz sterowania zewnętrzną, wielką tablicą LED dla kibiców. Napisanie autorskiego algorytmu skalowania i rasteryzacji czcionek bitmapowych w locie.
* **Integracja Desktop & API B2B (C++/MFC):** Zaprojektowanie stacji bazowej PC w Visual Studio (**C++/MFC**) w architekturze *Document/View*. Oprogramowanie autorskiego protokołu synchronizacji czasu (kompensacja *Clock Drift* i *Round-Trip Time*) oraz dedykowanego parsera obiektów tekstowych **JSON** do dwukierunkowej, automatycznej wymiany danych z ogólnopolskim portalem zapisów sportowych (*DoSportu*).

### **Główny Architekt E-commerce & Analityk Growth Hacking**
*Firma:* Sarenka (Sprzedaż Internetowa)  
*Okres:* 2015 – 2025 (10 lat)
* **Zarządzanie strukturą i ruchem e-commerce:** Kompleksowe projektowanie, optymalizacja i pozycjonowanie (SEO) architektury sklepu internetowego w celu maksymalizacji widoczności w wyszukiwarkach globalnych.
* **Analityka i Optymalizacja Konwersji:** Budowanie zaawansowanych lejków zakupowych i analiza zachowań użytkowników z wykorzystaniem **Google Analytics**. Implementacja zmian UX/UI na bazie twardych danych analitycznych.
* **Zarządzanie kampaniami Performance:** Planowanie, wdrażanie i bieżąca optymalizacja rentowności płatnych budżetów reklamowych w sieci **Google AdWords (Ads)**, skutkujące trwałym i stabilnym wzrostem współczynnika zwrotu z inwestycji (ROAS).

### **Niezależny Architekt Systemów Embedded & Automatyki Smart Home**
*Okres:* 2016 – Obecnie
* **Reverse Engineering magistrali rolet:** Przeprowadzenie pełnej inżynierii wstecznej zamkniętego, przemysłowego protokołu komunikacyjnego **Nice TTBus** na poziomie warstwy fizycznej i pakietowej sygnału.
* **R&D sterownika ARM:** Zaprojektowanie od zera i oprogramowanie fizycznego sterownika na mikrokontrolerze ARM, integrującego magistralę Nice TTBus z nowoczesnymi systemami zarządzania budynkiem (BMS), co zoptymalizowało koszty inwestycji poprzez eliminację wymiany napędów silnikowych.

### **Akademia Sarenka Software Kids (APEX System)**
*Rola:* Główny Architekt Systemu & Założyciel  
*Okres:* 2026 – Obecnie
* **Architektura Franczyzowa (SaaS/MaaS):** Zaprojektowanie i budowa kompletnego, bezobsługowego silnika biznesowego "All-in-One" dla ogólnokrajowej sieci szkół programowania dla dzieci.
* **Automatyzacja procesów (Data Flow):** Integracja Landing Page'a z systemami subskrypcyjnymi ActiveNow oraz systemem księgowym iFirma, skutkująca bezobsługowym przepływem danych i automatycznym fakturowaniem przy zerowych kosztach stałych infrastruktury.
* **Innowacja dydaktyczna (Pre-Project Agile):** Opracowanie unikalnego programu nauczania (31 lekcji) opartego o zaawansowaną topologię tablic Kanban/Tabel w GitHub Projects (grupowanie poziome Swimlanes pod kątem szkolnych organizerów zadań), uczącego dzieci nawyków Junior Project Managera przed wejściem w naukę czystego kodu.

---

## 🎓 WYKSZTAŁCENIE, PROJEKTY DYPLOMOWE I CERTYFIKATY

### **Certyfikat Językowy TELC English B2**
*Instytucja:* Centrum Nauki W&W Jelenia Góra | *Data wydania:* 06/2014  
* **Zakres:** Potwierdzenie biegłości językowej na poziomie wyższym średniozaawansowanym (CEFR B2), swobodna komunikacja techniczna i biznesowa.

### **Magister Inżynier Elektroniki i Telekomunikacji**
*Uczelnia:* Politechnika Wrocławska – **Kampus Główny we Wrocławiu**  
*Tryb studiów:* Wyższe II stopnia (Uzupełniające Magisterskie – Zaoczne) | *Okres:* 09/2003 – 06/2005  
*Specjalność:* **Systemy Informatyczne**  
* **Praca Magisterska (Wyróżnienie Rektorskie, Ocena Celująca):** *„Projekt i wdrożenie interaktywnego systemu Call Center czasu rzeczywistego”*. Zaprojektowanie i pełna implementacja systemu opartego o wczesną technologię Voice-AI (VoiceXML) z pełną głosową obsługą klienta. Budowa zaawansowanego silnika backendowego w języku Perl połączonego z relacyjną bazą danych MySQL. Wdrożenie transakcyjności (ACID) oraz precyzyjnych blokad tabel (*Table/Row Locking*) w celu uodpornienia systemu na zakleszczenia (*Deadlocks*) pod wysokim ruchem współbieżnym.

### **Inżynier Elektroniki i Telekomunikacji**
*Uczelnia:* Politechnika Wrocławska – **Filia w Jeleniej Górze**  
*Tryb studiów:* Wyższe I stopnia (Inżynierskie – Dzienne) | *Okres:* 09/1999 – 06/2003  
*Specjalność:* **Sieci Telekomunikacyjne**  
* **Praca Inżynierska:** *„Autonomiczny dekoder bezprzewodowych standardów transmisji podczerwieni”*. Projekt i pełna implementacja niskopoziomowego analizatora sygnałów IR (protokoły RC5, RC6, NEC, Sony) napisanego w surowym **Assemblerze** na mikrokontrolerze **8051**. 
* **Kompetencje Hardware (Rapid Prototyping):** Samodzielne zaprojektowanie struktury PCB dla urządzenia oraz realizacja pełnego, laboratoryjnego procesu produkcji obwodów drukowanych metodą fotochemiczną (przygotowanie klisz transparentnych, naświetlanie emulsji promieniami UV, chemiczne wywoływanie oraz precyzyjne trawienie miedzi). Praca obejmowała sprzętowe debugowanie sygnałów z układów odbiorczych serii TSOP z wykorzystaniem analizatorów stanów logicznych w celu eliminacji jitteru falowego.

### **Technik Elektronik**
*Szkoła:* Zespół Szkół Elektronicznych w Jeleniej Górze  
*Okres:* 09/1994 – 06/1999  
*Specjalność:* **Elektronika Ogólna**  
* **Praca Dyplomowa / Specjalistyczna:** Dogłębna analiza teoretyczna, laboratoryjna i diagnostyczna układów konwersji sygnałów – przetworników Analogowo-Cyfrowych (ADC) oraz Cyfrowo-Analogowych (DAC). Opanowanie problematyki błędów kwantyzacji, częstotliwości próbkowania (kryterium Nyquista) oraz integralności sygnałów analogowych w układach cyfrowych.
* **Zakres ogólny:** Uzyskanie żelaznych podstaw analogowo-cyfrowych, praktyka w amatorskim i akademickim projektowaniu oraz produkcji płytek PCB (trawienie chemiczne), czytanie i tworzenie schematów ideowych oraz rysunku technicznego, a także uruchamianie sprzętowe systemów elektronicznych.

