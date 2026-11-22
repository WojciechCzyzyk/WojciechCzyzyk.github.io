## 📤 Awaryjna wysyłka rozliczenia NFZ plikiem (z pominięciem transmisji z mMedica)

Jeśli automatyczna transmisja z programu `mMedica` jest chwilowo nieaktywna, rozliczenie miesięczne (komunikat **`SWX`**) można wyeksportować jako plik na dysk i wgrać ręcznie w przeglądarce — daje to dokładnie taki sam efekt prawny i rozliczeniowy.

---

### 1️⃣ Eksport pliku rozliczeniowego `SWX` z `mMedica`
1. Otwórz **`Rozliczenia` ➔ `Komunikacja z NFZ`** (lub **`Sprawozdawczość` ➔ `Generowanie komunikatów SWX`**).
2. Wygeneruj paczkę rozliczeniową (komunikat **`SWX`**) za bieżący okres sprawozdawczy.
3. Gdy wygenerowany komunikat pojawi się na liście, **nie klikaj `Wyślij`** — kliknij go prawym przyciskiem myszy (lub użyj przycisku na pasku narzędzi) i wybierz **`Zapisz do pliku`** / **`Eksportuj komunikat`**.
4. Zapisz plik (`.xml` lub `.zip`) w widocznym miejscu, np. na Pulpicie w folderze `NFZ_wysylka`.

---

### 2️⃣ Ręczne wgranie pliku w Portalu Świadczeniodawcy NFZ
1. Zaloguj się w przeglądarce na **[Portal Świadczeniodawcy Dolnośląskiego OW NFZ](https://nfz-wroclaw.pl)** (konto świadczeniodawcy **`3404289`**).
2. W menu bocznym wejdź w **`Umowy` ➔ `Przekazywanie sprawozdawczości`** (lub **`Komunikaty SWX` ➔ `Prześlij plik`**).
3. Kliknij **`Wybierz plik`**, wskaż zapisany z `mMedica` plik `.xml` / `.zip` i kliknij **`Wyślij` / `Importuj`**.
4. Odśwież listę po kilku minutach i upewnij się, że pojawiło się potwierdzenie przetworzenia (**`P-SWX`**) bez błędów walidacji.

---

### 💡 Weryfikacja ubezpieczenia pacjenta (`eWUŚ`) w trybie awaryjnym
* W razie potrzeby pojedynczego pacjenta można sprawdzić w 10 sekund bezpośrednio w przeglądarce po zalogowaniu na **`https://nfz.gov.pl`** (oddział `01` Dolnośląski).
