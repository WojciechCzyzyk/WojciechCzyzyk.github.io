## 🛠️ Konfiguracja eWUŚ + MFA w mMedica (Dolnośląski OW NFZ `01`)

### 🔑 Kluczowe odkrycie architektoniczne (Dwa osobne konta NFZ)
* **`gczyzyk1948`** — konto z **Portalu Personelu** (dane lekarza, e-recepty/ZLA; NIE służy do komunikacji gabinetowej `Typ: świadczeniodawca`).
* **`3404289`** — konto **Świadczeniodawcy (Praktyki Stomatologicznej)** w Portalu Świadczeniodawcy OW NFZ `01`. To **ten login, jego hasło i jego klucz MFA (`Secret`)** muszą być wpisane w `mMedica`!

---

### 📋 Checklista wdrożenia krok po kroku (na spokojnie)

1. **Pobranie i zatwierdzenie klucza `MFA(Secret)` dla konta `3404289`:**
   * Zaloguj się na **[Portal Świadczeniodawcy Dolnośląskiego OW NFZ](https://nfz-wroclaw.pl)** używając loginu **`3404289`**.
   * Wejdź w: **`Administracja i opcje` ➔ `Uwierzytelnianie wieloskładnikowe (MFA)` ➔ `Nowa konfiguracja`**.
   * Kliknij **`Dodaj konto ręcznie`** i skopiuj jawny ciąg tekstowy **`Secret`** (16 lub 32 znaki — bez spacji).
   * Zeskanuj kod QR w Google Authenticatorze (utworzy się nowy wpis na dole listy dla `3404289`).
   * **Obowiązkowo:** Wpisz wygenerowany 6-cyfrowy kod w pole potwierdzenia na dole strony NFZ i kliknij **`Zatwierdź` / `Powiąż`** (aż pojawi się komunikat *„Zweryfikowano pozytywnie”*).
   * *(Opcjonalnie: po potwierdzeniu usuń z Google Authenticatora stare, nieaktywne wpisy, zostawiając tylko świeży dla `3404289` oraz właściwy dla `gczyzyk1948`)*.

2. **Synchronizacja zegara systemowego na Dellu Latitude 7430 (Windows 11):**
   * Prawy klik na zegar na pasku zadań ➔ **`Dostosuj datę i godzinę`** ➔ kliknij **`Synchronizuj teraz`** (kody TOTP wymagają dokładności co do 30 sekund).

3. **Wpisanie danych konta `3404289` w `mMedica`:**
   * Otwórz: **`Zarządzanie` ➔ `Konfiguracja` ➔ `Użytkownicy systemu` ➔ konto Mamy ➔ zakładka `2. eRejestracja / Systemy NFZ`**.
   * **Górna sekcja (`Usługa OW NFZ`):**
     * `Użytkownik:` wpisz **`3404289`** ➔ kliknij **`Zmień hasło`** i podaj aktualne hasło dla `3404289`.
   * **Dolna ramka (`AP-KOLCE, DILO, eWUŚ, eZWM, usługa OW NFZ`):**
     * `Login:` wpisz **`3404289`**.
     * Kliknij **`Zmień hasło`** ➔ podaj aktualne hasło dla `3404289`.
     * `Typ:` zaznacz **`świadczeniodawca`**.
     * Zaznacz checkbox **`Uwierzytelnianie dwuskładnikowe`**.
     * **Odznacz** checkbox **`Nie aktualizuj danych na serwerze`**.
     * `Klucz MFA(Secret):` wklej skopiowany wcześniej 16/32-znakowy klucz dla `3404289` *(uwaga: po zapisie `mMedica` celowo maskuje go stałą liczbą 11 gwiazdek — to normalne)*.
   * Kliknij **niebieską dyskietkę (Zapisz)** w lewym górnym rogu `mMedica`.

4. **Restart usługi `mmService` i test:**
   * Na Dellu: `Win + R` ➔ `services.msc` ➔ **`mmService`** ➔ **`Uruchom ponownie`**.
   * W `mMedica`: kliknij jeden raz **`Sprawdź połączenie`** (w razie potrzeby odczekaj ~15 min na replikację między Portalem Świadczeniodawcy a centralnym eWUŚ).
   * Na starym Samsungu RF710: `services.msc` ➔ **`mmService`** ➔ **`Zatrzymaj`** + Typ uruchomienia: **`Wyłączony`**.
