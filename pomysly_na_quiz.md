# 🧠 Baza Formatów Treningowych i Interaktywnych Aplikacji Edukacyjnych (`pomysly_na_quiz.md`)

Wszystkie poniższe formaty działają w czystym stosie front-endowym (**HTML + CSS + JS**, jeden plik bez serwera i bazy danych), co pozwala uczniom Akademii APEX budować je i wdrażać bezpośrednio na własnych domenach GitHub Pages.

## ⭐ Złoty Standard APEX: Quiz ABCD z Natychmiastowym Wyjaśnieniem (Instant Feedback)
* **Mechanika:** Pytania wielokrotnego wyboru z losową kolejnością odpowiedzi. Po każdym kliknięciu wyświetla się krótkie wyjaśnienie merytoryczne (dlaczego odpowiedź jest poprawna lub na czym polegał błąd).
* **Za:** Uczeń nie zgaduje na ślepo, tylko od razu rozumie swój błąd i przyswaja wiedzę w trakcie gry. Bardzo łatwy do wygenerowania na podstawie zdjęć podręcznika.
* **Przeciw:** Przy bardzo długich listach (powyżej 30 pytań) może powodować znużenie u młodszych uczniów.

---

## 1. Cyfrowe Fiszki z Lektorem (Web Speech API)
* **Mechanika:** Wykorzystanie wbudowanego w przeglądarkę darmowego syntezatora mowy (`speechSynthesis`). Aplikacja wyświetla pojęcie lub słówko, czyta je na głos, a uczeń klika **„Umiem”** (karta wypada z talii) lub **„Powtórz”** (karta wraca na koniec kolejki).
* **Za:** Idealne do języków obcych, symboli chemicznych i krótkich definicji. Wbudowany lektor uczy poprawnej wymowy bez nagrywania plików audio.
* **Przeciw:** Słabo sprawdza się przy długich procesach i złożonych tematach, takich jak budowa komórki czy przyczyny wojen.

## 2. Interaktywna „Ślepa Mapa” (Kliknij i nazwij)
* **Mechanika:** Na ekranie wyświetla się schemat z podręcznika (np. budowa komórki, mapa Polski lub układ pokarmowy) z ponumerowanymi punktami. Uczeń klika numer na obrazku i wybiera jego nazwę z listy.
* **Za:** Świetnie przygotowuje do typowych zadań ze sprawdzianów, gdzie trzeba podpisać rysunek ze strzałkami. Bardzo wysoki efekt wizualny dla dziecka.
* **Przeciw:** Wymaga wgrania czystego pliku graficznego do repozytorium i ręcznego ustawienia współrzędnych punktów na obrazku.

## 3. „Detektyw Błędów” (Znajdź fałsz w notatce)
* **Mechanika:** Aplikacja pokazuje krótki tekst przypominający notatkę z zeszytu, w którym ukryto 5 błędów rzeczowych. Zadaniem ucznia jest kliknięcie błędnego słowa i wybranie poprawnej wersji.
* **Za:** Uczy uważnego czytania ze zrozumieniem i wyłapywania pułapek nauczycieli. Świetnie działa na historii, biologii i języku polskim.
* **Przeciw:** Wymaga nieco więcej pracy przy układaniu spójnego tekstu z wiarygodnymi zmyłkami.

## 4. Sortowanie Kroków i Oś Czasu
* **Mechanika:** Uczeń dostaje rozsypane kafelki (np. wydarzenia historyczne, etapy fotosyntezy lub kolejność wykonywania działań) i musi ułożyć je w odpowiedniej kolejności od góry do dołu.
* **Za:** Doskonale utrwala chronologię oraz procesy przyczynowo-skutkowe. Bardzo prosta logika w JavaScript (zamiana kolejności elementów na liście).
* **Przeciw:** Nadaje się tylko do tematów, w których występuje ścisła kolejność lub daty.

## 5. Tryb „Milionerzy” (Ten sam silnik, nowa otoczka)
* **Mechanika:** Wykorzystanie istniejącej bazy pytań z quizu, ale z dodaniem **3 kół ratunkowych** (np. odrzucenie dwóch błędnych odpowiedzi 50/50, podpowiedź z podręcznika oraz zmianę pytania) i progów gwarantowanych.
* **Za:** Zerowy koszt przygotowania nowej treści, bo działa na istniejących pytaniach. Element ryzyka i kół ratunkowych mocno podkręca emocje u uczniów.
* **Przeciw:** Nie wprowadza nowej formy nauki, a jedynie zmienia zasady gry wokół znanych już pytań.

---

## 🎯 Rekomendacja Wdrożeniowa (APEX & Nauka Domowa)
* **Zestaw podstawowy:** Połączenie **Quizu z objaśnieniami** (zrozumienie materiału ze zdjęć podręcznika) oraz **Fiszek z lektorem** (szybkie powtórki słówek i dat w 3 minuty przed lekcją).

