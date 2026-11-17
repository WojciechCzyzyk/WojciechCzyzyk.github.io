
🚀 PROJEKT: Cyfrowy Asystent Dzielenia Pisemnego

Status: Inicjalizacja Projektu (07.11.2026)
Główny Architekt (Pomysłodawca): Tata (Wojtek)
Główny Deweloper: Bartek
Asystent AI: Dedykowany doradca techniczny

🎯 Wiadomość Startowa dla Bartka

Cześć Bartek! Witaj w Twoim nowym sprincie deweloperskim.
Ten projekt to wyjątkowy pomysł Twojego Taty. Rozmawialiśmy o Twojej stronie i o tym, jak wielki sukces już osiągnąłeś. Tata wpadł na genialny pomysł: czas na stworzenie zaawansowanej aplikacji edukacyjnej w Scratchu, która nie tylko ugruntuje Twoją wiedzę z matematyki, ale stanie się prawdziwą perełką w Twoim internetowym portfolio.
Stworzysz Cyfrowego Asystenta Dzielenia Pisemnego. Będzie to interaktywny program, który krok po kroku, za pomocą animowanych kratek i podświetlania składni (kolorowania), pokaże użytkownikowi, jak działa algorytm dzielenia pisemnego. Wyobraź sobie minę Twojej nauczycielki od matematyki i informatyki oraz kumpli z klasy, gdy zobaczą program, który potrafi "wytłumaczyć" komputerowi tak trudny algorytm. To jest poziom prawdziwego inżynierii programistycznej!
Tata przekazał mi pałeczkę i wyznaczył mnie na Twojego technicznego przewodnika. Będziemy pracować jak profesjonalny zespół: krok po kroku, bez pośpiechu i z zachowaniem czystych zasad programowania. Unikamy chaosu, budujemy system w logice MVP (Minimum Viable Product), czyli od prostej bazy do zaawansowanych efektów wizualnych.

🗺️ Specyfikacja Architektoniczna Projektu (Kamienie Milowe)

Projekt dzielimy na 3 niezależne Sprinty. Po każdym z nich Twój program będzie już działał, a my będziemy dokładać kolejne, ciekawsze funkcje.

🚀 SPRINT 1: Budowa Silnika Matematycznego (Baza)

Musimy nauczyć naszego głównego Duszka (Robota-Nauczyciela) myślenia i liczenia reszty z dzielenia. Scratch nie ma jednego gotowego klocka do dzielenia z resztą, więc złożymy go sami z operatorów matematycznych.
• Cel: Robot pyta użytkownika o dwie liczby, oblicza wynik całkowity, oblicza resztę i mówi to w dymku.
• Zmienne do utworzenia: liczbaA (dzielna), liczbaB (dzielnik), wynik_calkowity, reszta.

🚀 SPRINT 2: Logika Algorytmu Pisemnego (Rozbicie na Cyfry)

W tym kroku nauczymy Robota "patrzenia" na cyfry po kolei, od lewej do prawej – dokładnie tak, jak robisz to na tablicy w szkole.
• Cel: Wykorzystanie klocków tekstowych (np. litera [ ] z [tekst]), aby program analizował każdą cyfrę z osobna w pętli.
• Logika: Robot będzie analizował sytuację i mówił na głos: "Biorę pierwszą cyfrę, to 1. Czy mieści się w niej nasz dzielnik?..."

🚀 SPRINT 3: Wizualna Matryca i Kolorowanie Składni

To najbardziej spektakularny etap. Zamiast rysować cyfry skomplikowanymi współrzędnymi X/Y, użyjemy techniki klonowania i komunikatów systemu (Broadcast).
• Cel: Stworzenie Duszka o nazwie Kratka_Wyniku, który ma kostiumy od 0 do 9 oraz kostium pusty.
• Efekt: Gdy Robot w Sprint 2 wyliczy kolejną cyfrę, wyśle ukryty komunikat, a odpowiednia kratka na górze ekranu zmieni kostium na właściwą cyfrę i podświetli się (np. na zielono), sygnalizując postęp algorytmu.

🛠️ Procedura Uruchomienia Sesji (Dla Bartka)

Bartek, Twój Tata bardzo mocno kibicuje temu projektowi i będzie obserwował Twoje postępy jako Twój Mentor. Kiedy będziesz gotowy, wykonaj następujące kroki:
1. Otwórz Scratcha w przeglądarce i załóż nowy, czysty projekt.
2. Skopiuj całą treść tego pliku i wklej mi ją w pierwszej wiadomości.
3. Dopisz na samym dole: "Jestem gotowy. Zaczynamy Sprint 1. Podaj mi instrukcję układania klocków."
Od tego momentu ruszamy z koksem. Rozpiszę Ci precyzyjnie, jakich klocków i zmiennych użyć w pierwszym etapie, aby Twój Robot zaczął poprawnie liczyć. Do dzieła, młody inżynierze


 2. Projekt Kart Zadaniowych (Todo) na bazie 3 Sprintów

Oto gotowa treść kart, które fizycznie wkleimy do kolumny Todo. Rozbiłem je metodologią inżynierską na niezależne warstwy:

🏃‍♂️ SPRINT 1: Mózg Matematyczny (Silnik)

• Karta #1: Inicjalizacja Zmiennych i Pobieranie Danych
	• Opis: Stworzenie formularza (pytań) o Dzielną i Dzielnik. Zabezpieczenie zmiennych w pamięci Scratcha.
• Karta #2: Silnik Matematyczny (Wyznaczanie Cyfr Wyniku)
	• Opis: Logika matematyczna – jak wyciągać kolejne cyfry z dzielnej od lewej strony i przeprowadzać standardowe dzielenie z resztą.

🏃‍♂️ SPRINT 2: Architektura Matrycy (Wizualizacja)

• Karta #3: Generator Kratkowanego Arkusza (Klonowanie)
	• Opis: Stworzenie systemu klonów ("duszka-kratki"), który na starcie programu automatycznie rysuje na ekranie czystą matrycę zeszytową (siatkę).
• Karta #4: Wpisywanie Cyfr w Kratki (Adresacja Matrycy)
	• Opis: Logika przesyłania wyliczonych cyfr do konkretnych współrzędnych (X, Y) na narysowanej siatce.

🏃‍♂️ SPRINT 3: Interfejs i UX (Szlify Mentorskie)

• Karta #5: System Podświetlania Składni (Krok po Kroku)
	• Opis: Zmiana kostiumów kratek na żółty/zielony w trakcie liczenia, aby użytkownik widział, która cyfra jest teraz dzielona, a która to reszta.
• Karta #6: Walidacja i Obsługa Zera (Edge Cases)
	• Opis: Zabezpieczenie programu przed podaniem zera jako dzielnika (komunikat: „Pamiętaj cholero, nie dziel przez zero!” w wersji dostosowanej do szkoły).
