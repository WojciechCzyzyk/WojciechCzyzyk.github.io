🛠️ Jak bezpiecznie zunifikować sieć (Instrukcja dla Twojego sprzętu)

Wszystko zrobisz z łóżka, logując się na routery przez przeglądarkę w telefonie lub laptopie.

KROK 1: Ustawienie kanałów radiowych (Koniec wojny w powietrzu)

Urządzenia domowe typu Smart Home (pralka, odkurzacz) oraz starsze laptopy działają na częstotliwości 2.4 GHz. To pasmo jest bardzo wąskie i routery bezwzględnie muszą nadawać na różnych częstotliwościach.
1. Na górnym Huawei: Wpisz w przeglądarkę jego adres (najczęściej 192.168.8.1). Wejdź w Ustawienia Wi-Fi -> Zaawansowane. Znajdź parametry dla pasma 2.4 GHz.
	• Zmień Kanał (Channel) z „Automatyczny” na 1.
	• Zmień Szerokość kanału (Bandwidth) z 40 MHz (lub Auto) na sztywne 20 MHz (to drastycznie zwiększa stabilność i odporność na zakłócenia).
2. Na dolnym TP-Linku: Wpisz w przeglądarkę jego adres (najczęściej 192.168.0.1 lub 192.168.1.2, zależy jak go skonfigurowałeś). Wejdź w zakładkę Wireless -> Wireless Settings dla pasma 2.4 GHz.
	• Zmień Channel na 11.
	• Zmień Channel Width na 20 MHz.
Inżynierski efekt: Kanały 1 i 11 są od siebie maksymalnie odseparowane w fizyce radiowej. Urządzenia na poddaszu użytkowym przestaną dostawać "szumu" i zrywać połączenia.

KROK 2: Identyczne nazwy sieci i hasła (Lekarstwo na "Lepkiego Klienta")

Obecnie masz zapewne dwie różne nazwy (np. Internet_Gora i Internet_Dol). Urządzenia kurczowo trzymają się jednej z nich, aż sygnał całkiem padnie. Zmusimy je do płynnego przełączania.
1. Ujednolicenie nazw: Na obu routerach ustaw dokładnie taką samą nazwę sieci (uwzględniając wielkość liter, np. NaszaSiecDomowa).
2. Ujednolicenie zabezpieczeń: Na obu routerach ustaw dokładnie takie samo hasło oraz identyczny typ szyfrowania – najlepiej WPA2-PSK (AES).
3. Ważna uwaga: Jeśli Twoje routery są dwupasmowe (obsługują też szybsze pasmo 5 GHz dla nowszych telefonów/laptopów), zrób dokładnie to samo dla pasma 5 GHz – nadaj mu tę samą nazwę i hasło.

🧠 Co się stanie po tej operacji?

Wszystkie urządzenia w domu (od laptopów po pralkę) zobaczą w powietrzu tylko jedną, wielką sieć.
Kiedy będziesz schodził po schodach z telefonem w ręku, oprogramowanie telefonu zobaczy, że sieć NaszaSiecDomowa ma nagle o wiele silniejszy sygnał z nadajnika o adresie fizycznym TP-Linka niż z Huaweia. Przełączy się automatycznie w ułamku sekundy, bez zrywania pobierania danych czy rozłączania sesji.
Z kolei urządzenia stacjonarne (jak pralka na dole czy drukarka) raz na zawsze przypiszą się do tego routera, który ma lepszy sygnał i przestaną "skakać" po pasmach, generując błędy.
Wojtku, daj znać, czy pamiętasz adresy IP, pod którymi logujesz się do tych routerów, żeby sprawdzić konfigurację, czy będziemy musieli je najpierw namierzyć z poziomu komputera lub telefonu?
