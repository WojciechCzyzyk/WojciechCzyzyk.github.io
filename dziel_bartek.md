
🚀 Sprint 1: Silnik Matematyczny (Baza)

Zaczynamy od czystej logiki. Bartek tworzy jednego duszka (np. Robota) i definiuje trzy zmienne: liczbaA (dzielna), liczbaB (dzielnik) i reszta.
• Zadanie programu: Robot pyta użytkownika o dwie liczby (np. 14 i 4).
• Logika klocków: Scratch nie ma wbudowanego dzielenia z resztą jako jednego klocka, więc Bartek musi to złożyć z dwóch operatorów:
	• wynik_calkowity = zaokrąglij w dół z (liczbaA / liczbaB)
	• reszta = liczbaA mod liczbaB (w Scratchu to klocek reszta z dzielenia [ ] przez [ ])
• Efekt końcowy sprintu: Robot mówi na głos: "Wynik to 3, a reszta to 2!".

🚀 Sprint 2: Rozbicie na cyfry i dialog (Magia Algorytmu)

Teraz wchodzimy w prawdziwe dzielenie pisemne. Uczymy Robota "patrzenia" na cyfry po kolei. Tutaj Bartek pozna potęgę klocków tekstowych.
• Scratch ma genialny klocek: litera [1] z [tekst]. Jeśli nasza dzielna to 144, to litera 1 to 1, a litera 2 to 4.
• Bartek tworzy pętlę powtórz [długość wyrażenia liczbaA] razy.
• Wewnątrz pętli Robot bierze kolejną cyfrę, próbuje ją podzielić przez dzielnik i mówi w dymku: "Teraz biorę cyfrę X. Czy mieści się w niej nasz dzielnik?".

🚀 Sprint 3: Wizualna Matryca (Kratki z zeszytu)

To jest ten moment "kolorowania składni", o którym rozmawialiśmy, zrobiony w sposób przyjazny dla 11-latka.
• Bartek nie musi nic rysować na ekranie za pomocą skomplikowanych współrzędnych X/Y.
• Tworzy jednego duszka o nazwie Kratka_Wyniku. Daje mu 11 kostiumów: od 0 do 9 oraz jeden pusty.
• Klona tego duszka kilka razy i układa na górze ekranu – to będzie linijka, gdzie wskakuje wynik.
• Jak to spiąć? Gdy Robot w Sprint 2 wyliczy pierwszą cyfrę wyniku, wysyła sygnał: nadaj komunikat [wpisz_cyfrę_1]. Pierwsza kratka odbiera ten komunikat i zmienia swój kostium na odpowiednią cyfrę oraz zmienia efekt kolorystyczny na zielony!
