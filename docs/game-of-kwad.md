# Game of K.W.A.D — Konzept & Pflichtenheft

> Status: **v1 umgesetzt** (rein manuell/lokal, siehe § 12 Phase 1), Rest **Konzept**.
> Diese Datei beschreibt weiterhin, was das Spiel werden soll und in welchen Scheiben
> die Ausbaustufen umgesetzt werden. Die v1 ändert **nichts** am bestehenden Timer, an
> der Erkennung oder an den Einstellungen — sie ist ein eigener, lokaler Modus.

## 1. Idee in einem Satz

„Game of K.W.A.D" ist **Game of SKATE für FPV-Freestyle**: Eine Runde zieht einen zufälligen
Freestyle-Trick, der aktive Pilot versucht ihn am Tor, ein **Fehlversuch kostet einen
Strafbuchstaben** — wer zuerst **K, W, A und D** beisammen hat, verliert.

## 2. Warum das passt

- Die App **sieht** schon zu, ob das Tor durchflogen wurde (bestehende Erkennung, `armed`).
- Sie kann **sprechen** (Sprachansage der Rundenzeiten ist vorhanden) — also auch den Trick ansagen.
- Sie kennt **Piloten mit Farben** — die Buchstaben-Tafel kann die Farben direkt wiederverwenden.
- Der Homescreen ist seit dem Aufräumen wieder luftig → eine dritte Kachel hat Platz.

## 3. Rollen und Begriffe

| Begriff | Bedeutung |
| --- | --- |
| **Session** | Ein komplettes Spiel von „Setup" bis „Ergebnis" (mehrere Runden) |
| **Runde** | Eine Trick-Ansage + der Versuch **eines** Piloten |
| **Trick** | Eine Freestyle-Figur, die die App ansagt (z. B. „Power Loop") |
| **Versuch** | Der Flugversuch des aktiven Piloten innerhalb des Zeitfensters |
| **Strafbuchstabe** | K, W, A oder D — pro Fehlversuch einer, maximal vier |
| **Tor-Durchflug** | Das Signal der bestehenden Erkennung: Mindestanzahl veränderter Pixel (Enter) fällt danach unter Exit |

## 4. Regeln

### 4.1 Grundregeln (Hauptmodus „Zufall")

1. **2–6 Piloten** treten reihum an. Reihenfolge = Reihenfolge in der Pilotenliste.
2. Zu Beginn jeder Runde zieht das System **zufällig einen Trick** aus dem aktiven Trick-Pool.
   Der Trick wird **angesagt** (Text groß im Spiel-Screen, zusätzlich optional per Sprachansage).
3. Der aktive Pilot erhält ein **Zeitfenster** (Standard: 30 s, einstellbar 10–120 s).
4. **Erfolg:** Der Pilot fliegt den Trick und **durchfliegt das Tor** innerhalb des Zeitfensters.
   → kein Buchstabe, der nächste Pilot ist dran.
5. **Fehlversuch:** Das Zeitfenster läuft ab, der Pilot bricht ab, stürzt, oder er drückt selbst
   „Fehlversuch". → **ein Strafbuchstabe** in Reihenfolge **K → W → A → D**.
6. **Spielende:** Wer **zuerst alle vier Buchstaben** hat, **verliert** sofort.
   - Bei genau 2 Piloten ist damit der andere Sieger.
   - Bei 3+ Piloten wird weiter gespielt, bis nur noch **ein Pilot ohne volle Buchstabenreihe**
     übrig ist (Eliminierung). Optional Einstellung „Spiel endet beim ersten Verlierer".
7. **Buchstaben-Tafel:** Jeder Pilot zeigt seine vier Stellen `K W A D`; noch nicht verdiente
   Buchstaben grau, verdiente in der Pilotenfarbe und deutlich hervorgehoben.

### 4.2 Optionale Zusatzregeln (konfigurierbar, jeweils Standard = aus)

| Regel | Wirkung | Standard |
| --- | --- | --- |
| **Trick neu ziehen** | Der aktive Pilot darf einen unpassenden Trick **1× pro Runde** tauschen (zu eng, zu viel Wind, Akku knapp) | aus |
| **Pause ohne Buchstabe** | „Pause" unterbricht die Runde (Akkuwechsel). Kein Buchstabe, Runde startet neu | an |
| **Nur erster Durchflug zählt** | Weitere Durchflüge im selben Versuch ändern nichts (Mehrfach-Durchflug ist kein Extra-Erfolg) | an |
| **Richtungs-Trick** | Manche Tricks verlangen eine Flugrichtung (z. B. „Dive" nur von oben nach unten) → nutzt die vorhandene Richtungsprüfung | aus |
| **Fairness-Ansage** | Vor dem Trickstart erscheint ein Hinweis, dass die **Trick-Bewertung in der Gruppe** liegt (siehe 5.) | an |

### 4.3 Modus B „Vorgeben" (SKATE-klassisch, spätere Ausbaustufe)

Statt einer Zufallsansage gibt **der erste Pilot den Trick selbst vor**; alle anderen müssen ihn
nachfliegen. Wer scheitert, bekommt einen Buchstaben; alle scheitern → der Vorflieger bekommt keinen.
Wird als **zweiter Spielmodus** vorgesehen, aber erst in einer späteren Phase gebaut.

## 5. Was die App wirklich prüfen kann (ehrliche Grenze)

Die App **kann** zuverlässig erkennen: *„Das Tor wurde im Zeitfenster durchflogen."*

Die App **kann nicht** (und soll in v1 auch nicht) erkennen, ob wirklich ein Power Loop,
ein Split-S oder ein Matty Flip geflogen wurde. Deshalb:

- **Erfolg** ist zweistufig: **Tor-Durchflug** (automatisch) **plus** Bestätigung des Piloten
  („Trick war sauber" — automatische Bestätigung per Einstellung abschaltbar).
- **Fehlversuch** ist immer auch **manuell** auslösbar (Crash, Abbruch, „war kein Trick").
- Für Tricks, die gar kein Tor brauchen (z. B. „Wall Scrape"), gilt **Selbstauskunft** ohne
  Durchflug-Prüfung — die App nimmt hier nur die Zeitmessung ab.
- Fazit: **Die App ist Schiedsrichter-Assistent und Ansager, nicht Schiedsrichter.** Das steht als
  Fairness-Hinweis auch im Spiel-Screen.

## 6. Trick-Pool (Vorschlag)

„Durchflug" = kann die App automatisch am Tor prüfen. „Selbst" = nur per Bestätigung.

| Trick | Beschreibung (Ansagetext) | Schwierigkeit | Prüfung |
| --- | --- | --- | --- |
| Punch Out | Steil nach oben durch das Tor aussteigen | 1 | Durchflug |
| Yaw Spin | Eine schnelle flache Drehung um die Hochachse, direkt nach dem Tor | 1 | Selbst |
| Dive | Spitzwinklig von oben kommend durch das Tor stürzen | 2 | Durchflug (Richtung sinnvoll) |
| Gate Roll | Eine Rolle genau im Moment des Tordurchflugs | 2 | Durchflug |
| Orbit | Das Tor eng umkreisen (mind. 1 voller Kreis) und dann durchfliegen | 2 | Durchflug |
| Juicy Flick / Flick | Kurzer, harter Yaw-Flick knapp über dem Tor, durchfliegen | 2 | Durchflug |
| Wall Scrape | Knapp an einer Wand/einem Hindernis entlang, ohne Berührung | 2 | Selbst |
| Power Loop | Loop über oder durch das Tor, danach sauber weiterfliegen | 3 | Durchflug |
| Split-S | Rolle mit halber Rolle: Richtung umkehren und durch das Tor | 3 | Durchflug |
| Matty Flip | Rückwärts-Loop über das Tor, durchfliegen | 4 | Durchflug |
| Trippy Spin / Rubik's Cube | Orbit mit dauerhaftem Yaw um das Tor | 4 | Durchflug |
| Inverted Pass | Invertiert (auf dem Kopf) durch das Tor | 4 | Durchflug |
| Backwards Pass | Rückwärts durch das Tor | 4 | Durchflug |

Zum Pool:

- **Schwierigkeit 1–4** steuert die Ziehung: Einstellung „Leicht / Gemischt / Hart" gewichtet
  leichte bzw. schwere Tricks stärker.
- **Trick-Pool-Auswahl im Setup:** pro Trick an/aus (Häkchen), damit jeder Platz nur fliegt, was
  machbar ist (z. B. kein Matty Flip in einer kleinen Halle).
- **Namentliche Kurzform** für die Ansage (z. B. „Power Loop" statt der ganzen Beschreibung).
- Neue Tricks lassen sich als reine Datenliste ergänzen (Name, Text, Schwierigkeit, Prüfart) —
  ohne Logikänderung.

## 7. Spielablauf (Zustandsmodell)

```
Setup ──► Runde starten ──► Trick ansagen ──► Freigabe-Countdown (3-2-1-GO)
                                                    │
                              ┌─────────────────────┴─────────────────────┐
                              ▼                                           ▼
                        Tor-Durchflug                               Zeitfenster endet
                              │                                           │
                     Bestätigung „Trick ok"?                     (oder Abbruch/Abbruch-Button)
                              │                                           │
                    ┌─────────┴─────────┐                                 │
                    ▼                   ▼                                 ▼
              ERFOLG (kein          „war kein Trick":              FEHLVERSUCH
              Buchstabe)            kein Buchstabe,
                    │               nächster Pilot?
                    └──────────► nächster Pilot ◄───────────────────────┘
                                     │
                                     ▼
                     Alle vier Buchstaben vergeben? ──► Ergebnis-Screen
```

Details:

- **Freigabe-Countdown:** nutzt den vorhandenen Countdown-Mechanismus (0–15 s) — der Pilot hat
  so viel Zeit, sich zu positionieren. Der Countdown tickt **einmal pro Versuch**.
- **Während des Versuchs** zeigt die App: aktiven Piloten (Name + Farbe), Trick-Namen,
  Restzeit als Balken **und** Zahl, sowie die Buchstaben-Tafel aller Piloten.
- **Zeitfenster** läuft auch dann weiter, wenn die Kamera kurz stockt. Wird die Kamera
  getrennt, pausiert das Spiel und weist darauf hin (Zustand „Verbindung verloren").
- **Pause** ist jederzeit möglich; sie beendet den laufenden Versuch **ohne** Buchstabe.

## 8. Bedienung / Oberfläche

### 8.1 Homescreen-Kachel

- Neue Kachel **„Game of K.W.A.D"** mit eigenem Kopter-Logo (`icon-kwad.svg`) und Kurzbeschreibung
  „Freestyle-Tricks, Strafbuchstaben".
- Umsetzung analog zur vorhandenen Kachel-Mechanik (Klick → Modus öffnen, ← führt zurück).

### 8.2 Setup-Screen (vor Spielbeginn)

- **Piloten:** Auswahl aus den vorhandenen Piloten (Name + Farbe); neu anlegen wie im Timer.
- **Zeitfenster:** 10–120 s, Standard 30 s.
- **Trick-Pool:** Häkchenliste, Schwierigkeitsmischung (Leicht/Gemischt/Hart).
- **Zusatzregeln:** Trick neu ziehen, Pause ohne Buchstabe, Richtungs-Trick (aus § 4.2).
- **Reihenfolge:** per Tippen sortierbar (einfach: Reihenfolge der Auswahl).
- Zusammenfassung („3 Piloten · 30 s · 9 Tricks aktiv") + großer Start-Button.

### 8.3 Spiel-Screen

- Kopfzeile: Runde Nr., aktiver Pilot (Name + Farbfarbe), Trick-Name groß.
- Mitte: Restzeit (Balken + Sekunden), deutliches **GO/Geschafft/Fehlversuch**-Feedback.
- Unten: Buchstaben-Tafel aller Piloten (`K W A D`), verdiente Buchstaben farbig, Rest grau.
- Aktionen: **Versuch starten**, **Geschafft** (falls Auto-Bestätigung aus),
  **Fehlversuch**, **Trick neu ziehen** (falls aktiviert), **Pause**, **Spiel beenden**.
- Auto-Verhalten (Standard): Nach Durchflug erscheint 2 s ein „Geschafft?"-Hinweis;
  passiert nichts, gilt der Trick als geschafft (einstellbar).

### 8.4 Ergebnis-Screen

- Klare Aussage: „**Max verliert** — Buchstaben K W A D" bzw. „Sieger: Lea".
- Tabelle pro Pilot: erledigte Tricks, Fehlversuche, Buchstabenreihe, längste Serie.
- **Revanche** (gleiches Setup, Buchstaben zurückgesetzt), **Neues Setup**, **Zum Homescreen**.
- Optional (Phase 3): CSV-Export der Session, passend zum vorhandenen CSV-Export-Muster.

### 8.5 K.W.A.D-Einstellungen

- Zahnrad **in der K.W.A.D-Karte** öffnet ein eigenes Overlay — **gleiches Muster** wie die
  Timer-Einstellungen aus v0.13.6 (Kontext-Zahnrad statt globales Menü).
- Inhalt: Standard-Zeitfenster, Bestätigung nach Durchflug (an/aus/2 s), Sprachansage der
  Tricks (an/aus), Toneffekte (nutzt bestehende Beeps), Trick-Pool-Voreinstellung.

## 9. Wiederverwendung im vorhandenen Code (geplant, nicht gebaut)

| Baustein | Besteht schon | Wird wiederverwendet für |
| --- | --- | --- |
| Tor-Erkennung (`armed`, Enter/Exit, Cooldown) | ja | „Tor wurde durchflogen" im Versuch |
| Richtungsprüfung (`direction`) | ja | Richtungs-Tricks (optional) |
| Countdown (Vorbereitungszeit) | ja | Freigabe 3-2-1-GO pro Versuch |
| Sprachnachricht (`speak`, Stimme/Sprechtempo) | ja | Ansage des Tricks und der Buchstaben |
| Beeps (`beep`, Audio-Sperre/Unlock) | ja | Countdown, Geschafft, Fehlversuch |
| Piloten + Farben (`pilots`, `pilotColors`) | ja | Teilnehmer und Buchstaben-Tafel |
| Akzentfarbe, i18n de/en | ja | Aussehen und Sprache des Modus |
| Einstellungs-Muster (Kontext-Zahnrad, 2 Overlays) | ja (v0.13.6) | K.W.A.D-Einstellungen |
| Speicherschutz (`MAX_SETS`, Quota-Trim, Toast) | ja | Session-Speicherung, falls sie wächst |
| CSV-Export-Muster | ja | Ergebnis-Export (Phase 3) |

**Wichtig:** Es soll **nichts am bestehenden Timer geändert** werden. K.W.A.D ist ein eigener
Modus mit eigenem Bildschirm und eigenen Daten; die Erkennung wird nur *mitbenutzt*.

## 10. Datenmodell (Planung)

```text
kwadSession = {
  id, startedAt, endedAt, mode: 'zufall' | 'vorgeben',
  settings: { windowMs, shuffleOnce, pauseFree, directionTricks, confirmAfterPass },
  pool: [ trickId, ... ],
  pilots: [ { name, color, letters: 'KW..', done: 0, fails: 0, bestStreak: 0 } ],
  round: 0, currentPilotIdx: 0, currentTrickId: null,
  log: [ { round, pilot, trickId, at, result: 'ok'|'fail'|'skip', ms } ]
}
```

- **Speicherort:** eigener localStorage-Schlüssel (z. B. `fpv-kwad`), **getrennt** von
  `settings` und den Sätzen, damit ein Fehler im Spiel die Timer-Daten nicht berührt.
- **Speicherschutz:** Schreiben mit `try/catch` + Trimmen (dasselbe Muster wie beim Speicherschutz
  aus v0.13.1), begrenzte Log-Länge (z. B. letzte 500 Einträge).
- **Laufende Session:** Die zuletzt laufende Session wird gespeichert, damit ein versehentliches
  Neuladen (Handy gesperrt, Browser aufgeräumt) das Spiel nicht killt.

## 11. Sonderfälle

| Fall | Verhalten |
| --- | --- |
| Absturz im Versuch | Pilot drückt „Fehlversuch" (oder App bleibt neutral, wenn niemand drückt → Zeit läuft ab) |
| Akkuwechsel | „Pause" → kein Buchstabe, Versuch wird neu gestartet |
| Kamera getrennt / Tab im Hintergrund | Runde pausiert automatisch, Hinweis; nach Rückkehr weiter |
| Doppelter Tor-Durchflug | nur der erste zählt (Standardregel an) |
| Trick am Platz unmöglich | „Trick neu ziehen" (1× pro Runde, falls aktiviert) |
| Trick ohne Tor (Wall Scrape) | nur Selbstauskunft + Zeitmessung |
| Alle Piloten verlieren gleichzeitig? | Kann nicht passieren: bewertet wird immer nur der aktive Pilot |
| Nur 1 Pilot übrig, andere eliminiert | Ergebnis-Screen (Sieger), Revanche anbieten |
| App-Neustart mitten im Spiel | Session wird wiederhergestellt (siehe § 10) |
| Streit um „war das ein Trick?" | Fairness-Hinweis, Gruppenentscheid; Buttons bleiben sichtbar |

## 12. Umsetzung in Scheiben (Vorschlag)

| Phase | Inhalt | Ohne | Ergebnis |
| --- | --- | --- | --- |
| **0** | Dieses Konzept | Code | gemeinsame Grundlage |
| **1** | Setup-Screen, Runden-Ablauf **rein manuell** (Buttons), Buchstaben-Logik, Ergebnis-Screen, Session-Speicherung, i18n | Tor-Erkennung, Sprache | spielbar am Tisch, komplett testbar |
| **2** | Anbindung an die Tor-Erkennung (automatischer Erfolg), Trick-Ansage per Sprachausgabe, Beeps, Restzeit | Richtungs-Tricks | spielbar am Platz |
| **3** | Richtungs-Tricks, Trick-Pools/Gewichtung, Modus „Vorgeben", CSV-Export, Statistik-Feinheiten | — | Feinschliff |

Jede Phase ist **eine eigene Kachel-Funktion** und wird wie bisher in kleinen, einzeln
verifizierten Schritten gebaut (Version-Bump, Prüfskripte, Live-Check, Commit).

## 13. Offene Fragen (bitte entscheiden)

1. **Zeitfenster-Start:** 30 s Standard? Oder lieber 20 s für Hallenrunden?
2. **Trick nach Fehlversuch:** Immer neu ziehen (wie hier beschrieben) oder bleibt der Trick
   stehen, bis er einmal geschafft wurde?
3. **Spielende:** Sofort beim ersten Piloten mit 4 Buchstaben — oder weiterspielen, bis nur noch
   einer übrig ist (nur bei 3+ Piloten relevant)?
4. **Trick-Bewertung:** Soll „Geschafft" automatisch nach Tor-Durchflug gelten (schnell, ungenau)
   oder immer per Tippen bestätigt werden (genauer, mehr Bedienung)?
5. **Bedeutung der Buchstaben:** K.W.A.D sind bisher **reine Strafbuchstaben**. Soll es zusätzlich
   eine Bedeutung/Eselsbrücke geben (z. B. eine Merkhilfe für die vier Phasen eines Freestyle-Flugs)?
6. **Name der Kachel:** „Game of K.W.A.D" oder kürzer „K.W.A.D"?

## 14. Nicht-Ziele (v1)

- **Keine** automatische Trick-Erkennung per Bildanalyse/ML (die App sieht nur „Tor durchflogen").
- **Kein** Netzwerk-/Mehrgeräte-Betrieb (mehrere Handys, Live-Tabelle im Netz).
- **Keine** Änderung am bestehenden Runden-Timer, an der Erkennung oder an den Einstellungen.
- **Kein** Ranglisten-System über mehrere Sessions (denkbar als eigene spätere Ausbaustufe).
