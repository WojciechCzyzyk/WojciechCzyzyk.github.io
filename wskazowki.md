### 🧠 Ściągawka Gita: Zarządzanie Poligonem i Produkcją w Przeglądarce (Web GitHub)

Procedura pozwala na bezpieczną pracę na odizolowanej gałęzi testowej (test) oraz sterowanie tym, co widzi serwer produkcyjny (main / GitHub Pages) za pomocą arytmetyki wskaźników. 

### 🔄 FAZA 1: Łączenie Gałęzi (Wrzucanie zmian na Produkcję)

*Stan początkowy:* Napisałeś kod na gałęzi test. Chcesz, aby wskaźnik main przeskoczył na ten sam commit, żeby zaktualizować stronę w internecie. 

1. Wejdź na stronę główną repozytorium na GitHubie.
2. W górnym menu kliknij zakładkę **Pull requests** (ikona dwóch strzałek).
3. Kliknij zielony przycisk **New pull request** po prawej stronie.
4. Ustaw wskaźniki kierunku: 

  * po lewej (**base**): main
  * po prawej (**compare**): test
5. Kliknij zielony przycisk **Create pull request**.
6. Wpisz tytuł (np. *Aktualizacja z poligonu*) i kliknij ponownie zielony przycisk **Create pull request** pod polem tekstowym.
7. Zjedź na dół i kliknij zielony przycisk **Merge pull request**, a następnie potwierdź klikając **Confirm merge**.

*Efekt:* Wskaźnik main zrównał się ze wskaźnikiem test. Strona internetowa aktualizuje się o nowe funkcje. 

### ↩️ FAZA 2: Rozłączanie Gałęzi (Awaryjne wycofanie z Produkcji / Rollback)

*Stan początkowy:* Zmiany z test weszły na main, ale chcesz je cofnąć na produkcji, zachowując je jednocześnie na poligonie test do dalszych prac. 

1. W górnym menu kliknij zakładkę **Pull requests**.
2. Tuż pod menu kliknij w pod zakładkę **Closed** (zamknięte), aby zobaczyć historię scaleń.
3. Kliknij w Twój ostatni, przed chwilą scalony Pull Request.
4. Zjedź na sam dół do fioletowej sekcji sukcesu i kliknij przycisk ↩️ **Revert**.
5. GitHub automatycznie utworzy gałąź ratunkową i wrzuci Cię do nowego ekranu – kliknij zielony przycisk **Create pull request**.
6. System przeniesie Cię do widoku zatwierdzenia – kliknij zielony przycisk **Merge pull request**, a na końcu fioletowy/zielony **Confirm merge**.

*Efekt:* Wskaźnik main idzie o krok do przodu, wykonując "lustrzane odbicie" (usunięcie testu). Produkcja jest znowu czysta. Wskaźnik test zostaje na swoim miejscu – Twój poligon żyje dalej i ma w sobie wszystkie testowe linijki kodu.


### ⛓️ Git jako DAG (Graf Acykliczny) i Arytmetyka Wskaźników

Pamiętaj: Commity są **ŚWIĘTE i NIEZMIENNE (Immutable)**. Każdy commit patrzy tylko w tył (zna adres swojego rodzica przez parent). Gałęzie i HEAD to wyłącznie **luźne naklejki (zmienne wskaźnikowe)** przechowujące hashe commitów. Wizualny graf na ekranie to po prostu ścieżka odczytywana wstecz od miejsca, w które aktualnie celuje dany wskaźnik. 



🛠️ Ściąga Operacji Wskaźnikowych


Komenda	Co fizycznie ruszam w pamięci?	Analogia z C++ / Elektroniki	Kiedy używać?
git checkout <cel>
	Przesuwa tylko wskaźnik HEAD. Commity i gałęzie stoją w miejscu.	HEAD = &cel; (Przełączenie punktu pomiarowego multimetru)	Gdy chcesz tylko podejrzeć kod na innej gałęzi lub konkretnym commicie.
git commit
	Tworzy nowy commit. Automatycznie przesuwa HEAD oraz aktualna gałąź o +1 do przodu.	Dokładanie nowego ogniwa do łańcucha, które ciągnie za sobą wskaźnik końca.	Gdy zatwierdzasz kolejną partię działającego kodu.
git branch <nazwa>
	Tworzy nową etykietę w miejscu, gdzie stoi HEAD. Nie przełącza Cię tam.	Commit* nowa = HEAD; (Deklaracja nowego wskaźnika)	Gdy chcesz zaznaczyć punkt startowy dla nowej funkcji, ale jeszcze na nią nie wchodzisz.
git branch -f <gałąź> <cel>
	Brutalnie teleportuje obcą gałąź na wskazany cel. HEAD się nie rusza.	galez = &cel; (Wymuszone nadpisanie adresu wskaźnika z poziomu Boga)	Gdy gałąź testowa poszła w złym kierunku i chcesz ją brutalnie zresetować do stanu main bez przełączania się na nią.
git reset <cel>
	Przesuwa aktualną gałąź ORAZ wskaźnik HEAD wstecz.	HEAD = galez = &cel; (Cofnięcie całego frontu robót)	Gdy napisałeś coś źle na gałęzi, na której aktualnie stoisz, i chcesz bezpiecznie cofnąć czas.



### 💡 Złote zasady szybkiego wyboru:

1. Chcesz zmienić to, co widzisz na monitorze? ➡️ **checkout**
2. Chcesz przestawić gałąź, na której **NIE** stoisz? ➡️ **branch -f**
3. Chcesz cofnąć historię na gałęzi, na której **AKTUALNIE** stoisz? ➡️ **reset**
