# KTR FPV APP (Web/PWA)

FPV Racing Toolkit als Web/PWA: Rundentimer für Android-Geräte mit Hauptmenü,
durch das alle Funktionen erreichbar sind. Die Runden werden anhand von Bewegung
(Frame-Differenz) in einer vom Nutzer definierten Zone über Start/Ziel erkannt.

## Starten (lokal)
1. In diesem Ordner einen kleinen Server starten (Kamera braucht sicheren Kontext):
   - Python: `python -m http.server 8080`
   - Node: `npx http-server -p 8080`
2. Im Browser öffnen: `http://localhost:8080` (oder die IP des PCs im LAN).
3. Auf Android: Chrome öffnen, URL aufrufen, Menü → „Zum Startbildschirm hinzufügen“.

## Öffentliche URL (`/KTR`)
Veröffentlicht wird über GitHub Pages (Branch `main`). Der öffentliche Titel ist **KTR**;
die URL lautet **`https://grinsekaterfpv.github.io/KTR/`**.

Das Repository heißt dafür `KTR` (früher `Timer`). Alle Pfade in der App sind
relativ (`index.html`, `app.js`, `styles.css`, `manifest.webmanifest`, `icon-ktr.svg`,
`icon-kwad.svg`, `icon-timer.svg`, `icon-pilots.svg`, `icon-settings.svg`, `sw.js`),
deshalb funktioniert die App unter dem neuen Pfad unverändert.

> **Reset-Hinweis:** Die alte URL `…/Timer/` antwortet inzwischen mit 404.
> Bereits installierte PWA-Kurzbefehle und Lesezeichen müssen einmal neu angelegt werden
> (Chrome → Menü → „Zum Startbildschirm hinzufügen“). In der App hilft zusätzlich
> *Einstellungen → App → „App aktualisieren (Cache leeren)“*, damit der neue
> Service-Worker-Cache greift.

*Optional:* Für eine eigene Domain (`CNAME`) einfach eine Datei `CNAME` mit dem
Domainnamen ins Repo legen und die DNS-Einträge beim Anbieter setzen.

## Bedienung
1. Kamera starten (Button toggelt: läuft die Kamera, stoppt derselbe Button sie wieder).
2. Mit der Maus/Touch einen Rahmen über die Start/Ziel-Zone zeichnen.
3. Der Hintergrund wird automatisch nach dem Kamerastart kalibriert (manuell über „Hintergrund kalibrieren“).
4. „Start“ beginnt einen Countdown (Standard 5 s, einstellbar). Danach startet das Rennen automatisch.
5. Eine Runde wird gezählt, sobald die Bewegung im Rahmen die Enter-Schwelle
   überschreitet und danach unter die Exit-Schwelle fällt (plus Cooldown).

## Features
- **Home-Bildschirm:** Beim Start landet man auf dem Homescreen mit großem Logo und dem Namen **„Katers FPV Toolkit“**. Dort wählt man das Feature – **Timer**, **Game of K.W.A.D**, **Piloten** – oder die **Einstellungen** und ist dann in der jeweiligen Unter-App. Jeder Unter-Screen (Timer, Game of K.W.A.D, Piloten) hat oben links einen **Zurück-Pfeil** zum Homescreen; der zuletzt genutzte Menüpunkt wird beim Neustart hervorgehoben (Fallback: Timer). Spätere Features (z. B. Telemetrie) kommen dort als weitere Kacheln dazu
- **Kachel-Icons:** alle Home-Kacheln teilen sich denselben Icon-Stil – ein abgerundetes, dunkles Quadrat mit oranger Akzentgrafik (`icon-timer.svg`, `icon-kwad.svg`, `icon-pilots.svg`, `icon-settings.svg`), gleiche Größe, Rundung und Farbe. Die Timer-Kachel zeigt wieder die **original „Katzenkopf-Stoppuhr“** (Ohren, Schnurrhaare, Zifferblatt)
- **Logo:** oben steht nur das quadratische Logo – die neun Buchstaben **K T R / F P V / A P P** in einem 3×3-Raster, von oben links nach unten rechts gelesen
  - *Hinweis:* Nach einem Logo-Wechsel zeigt der Startbildschirm bei installierten PWAs oft noch das alte Symbol – App dort entfernen und erneut hinzufügen, um das neue zu sehen
- Live-Visualisierung der Erkennung (gelbe Pixel = erkannte Bewegung, grüner Rahmen/Punkt = Bereich/Schwerpunkt)
- Erkennungs-Bereich (ROI) per Fingermalerei ins Bild ziehen; die Bildschirm-/Bildzuordnung funktioniert korrekt in Hoch- und Querformat und bei jedem Wechsel der Verarbeitungs-Auflösung (320×240 ↔ 480×360) – der Rahmen bleibt auf demselben Bildausschnitt liegen
- Auto-Start: Die erste Tor-Durchfahrt startet die Zeitmessung (zählt nicht als Runde) – kein Laufen zum Handy nötig
- Runden pro Satz: Nach der eingestellten Rundenzahl stoppt der Timer automatisch; der Satz wird gespeichert und die nächste Durchfahrt startet den nächsten Satz
- Sätze (Vergleich): Alle abgeschlossenen Sätze werden gespeichert (Runden, beste Zeit, Ø, Gesamt) und lassen sich aufklappen, **einzeln als CSV exportieren (⬇, Dateiname mit Pilot, z. B. `fpv-set-Max-1.csv`)**, einzeln löschen oder gesammelt als CSV exportieren
- Satz-Nummern gelten **pro Pilot**: jeder Pilot hat sein eigenes „Satz 1, 2, 3 …“, so lassen sich die Sätze desselben Piloten direkt vergleichen
- Speicherschutz: Die Satz-Historie ist auf 400 Sätze begrenzt. Bei vollem Browser-Speicher werden automatisch die ältesten Sätze entfernt – immer mit Hinweis am unteren Bildrand – damit neue Runden gespeichert werden und die App nicht abstürzt
- Bei aktivem Pilotenfilter exportiert der Button **„Gefilterte exportieren"** nur diesen Piloten (Dateiname `fpv-sets-<Pilot>.csv`)
- Piloten-Auswahl im Vergleich: Sätze nach Pilot filtern (Dropdown) und **Piloten-Vergleichstabelle** (Sätze, Runden, beste Zeit, Ø, Gesamt) bei mehreren Piloten
- Vergleichs-Graph: Rundenzeiten aller Sätze als Linien-Diagramm (beste Runde als grüne Referenzlinie), automatisch Querformat-tauglich
- Akzentfarbe frei wählbar (Einstellungen → „Aussehen“): Presets oder eigene Farbe per Farbwähler
- Einklappbare Hauptbereiche: Kamera, Timer, Rundenlog und Sätze lassen sich am Titel antippen ein-/ausklappen (Zustand wird gespeichert; Timer zeigt im eingeklappten Kopf die laufende Zeit; die Zahnräder für Kamera-/Timer-Einstellungen bleiben auch eingeklappt sichtbar und bedienbar). Der Ausklapp-Pfeil ▾/▴ und die Bedienelemente sitzen rechtsbündig in der Kopfzeile, der Titel bleibt links
- Auto-Start auch direkt in der Timer-Karte (Schnellschalter; das Badge daneben antippen → Stepper/Presets für die Rundenzahl pro Satz)
- Erkennung ein/aus („Auto Lap Detection“) wird gespeichert und beim nächsten Start wiederhergestellt; der Text der Checkbox wird wie bei „Auto-start on 1st pass“ in der Akzentfarbe hervorgehoben, sobald sie gesetzt ist
- Countdown direkt in der Timer-Karte einstellbar (Badge antippen → Stepper/Presets)
- Pilotfarben: beim Anlegen eines Piloten eine Farbe wählen – der Pilot wird im Chart und in der Vergleichstabelle in seiner Farbe dargestellt (Legende im Chart)
- Querformat/Landscape: kompakter Zwei-Spalten-Layout, damit Vorschau, Bedienung und Scrollen im horizontalen Modus funktionieren
- Countdown mit Audio-Signal vor dem Rennstart, Runden-Sound, Best-Lap-Sound (WebAudio wird beim ersten Antippen automatisch freigeschaltet – funktioniert so auch in Edge/Safari)
- Sprachansage der Rundenzeiten (Text-to-Speech, „jede Runde“ oder „nur beste Runde“)
- Richtungsprüfung: Button mit Pfeil (↔ aus → → ← ↓ ↑) zeichnet die erwartete Durchflugrichtung ins Tor; nur Durchflüge in dieser Richtung zählen als Runde
- Autofokus-/Belichtungs-Schutz: Der Hintergrund passt sich dauerhaft an Drift an (selbstheilend) und globale Bildänderungen über das gesamte Bild werden ignoriert. Ein Watchdog verhindert, dass das Tor als "belegt" hängen bleibt und dadurch Runden übersieht. Optional (Standard aus) lässt sich die Kamera per „Kamera fixieren“ auf manuellen Fokus/Belichtung stellen
- Zweisprachig (Deutsch/Englisch): App-Sprache in den App-Einstellungen, Sprachstimme in den Timer-Einstellungen („Rennen & Audio“); Aussprache von Ansagen passt sich an. Zusätzlich kann eine konkrete Sprachstimme gewählt werden
- Timer mit Einfrieren bei „Stop“ (Rennen-Zeit und Runde bleiben stehen)
- Optionale Audio-Ausgabe (ausschaltbar), Pilotenverwaltung, CSV-Export
- Einklappbare Einstellungen mit drei getrennten Zahnrädern: oben rechts am Homescreen → App-Einstellungen, in der Kamera-Karte → Kamera-Einstellungen, in der Timer-Karte → Timer-Einstellungen (bleiben auch bei eingeklappter Karte erreichbar); Untergruppen standardmäßig zugeklappt
- **Game of K.W.A.D** (eigener Modus, komplett lokal ohne Server): Game of SKATE für FPV-Freestyle. Eigene Spielerliste (bleibt gespeichert), Trick aus einem Pool, der aktive Spieler wird reihum hervorgehoben. **Geschafft** gibt keinen Buchstaben, **Nicht geschafft** kostet einen Strafbuchstaben in der Reihenfolge **K → W → A → D**; wer zuerst alle vier hat, **verliert** (Buchstaben werden zurückgesetzt für eine Revanche). Sobald alle aktiven Spieler einen Trick versucht haben, kommt automatisch ein neuer. **Rückgängig** nimmt den zuletzt verteilten Buchstaben zurück (Anti-Cheat: nur der letzte, verschwindet beim nächsten Trick oder Erfolg). Trick-Pool mit **5 Kategorien** (Basics 🟢, Intermediate 🟡, Advanced 🟠, Pro 🔴, Custom ⭐) inkl. Schwierigkeit, Kurzbeschreibung und **Prüfart** (Freiflug, Tor/Gate, Hindernis), **eigene Tricks** (Name + Beschreibung + Prüfart), **3 Zieh-Modi** (Random gewichtet nach Schwierigkeit, Sequential, Kategorie-Round-Robin), **Trick-Statistik** (versucht/geschafft/Quote) und ein **eigenes Einstellungs-Overlay** (Zahnrad im KWAD-Screen). Ist der gezogene Trick ein **Hindernis-Trick**, blendet die App den Hinweis „die Gruppe bestimmt das Hindernis" und einen **Hindernisauswähler** ein — ein noch aktiver Spieler wird benannt und legt das Hindernis fest (bleibt gespeichert). Die Bewertung liegt bei der Gruppe – die App ist Ansager, kein Schiedsrichter. Als Logo dient `icon-kwad.svg` im selben Stil wie das App-Icon: die vier Buchstaben **K W / A D** in einem 2×2-Raster, von oben links nach unten rechts gelesen
- **Piloten** (eigene Kachel): vollständiger Profil-Workflow – Piloten mit **Name + Farbe** anlegen, auswählen (aktiver Pilot) und löschen, inklusive **Piloten-Vergleichstabelle** und **CSV-Export** der Piloten (Name, Farbe, Sätze, Runden, beste/Ø/Gesamt). Die schnelle Pilotenauswahl in der Timer-Karte bleibt erhalten

## Als Android-App (optional)
Diese Web-App ist eine installierbare PWA. Für eine native Android-APK kann das Projekt
mit [Capacitor](https://capacitorjs.com/) in ein Android-Projekt gewrappt werden:
`npm i @capacitor/core @capacitor/cli @capacitor/android && npx cap init && npx cap add android && npx cap sync`.

## Tests
`npm test` führt die Prüfskripte aus `tests/` aus (reines Node, keine Abhängigkeiten):
- `tests/autostart_test.js` – Auto-Start-Erstlauf: der erste Durchflug startet das Rennen, zählt aber keine Runde; erst der zweite Durchflug ergibt Runde 1
- `tests/roi_math_test.js` – ROI-Mathematik: eine gezeichnete Bildschirmfläche bleibt beim Wechsel der Verarbeitungsauflösung, bei unterschiedlichen Seitenverhältnissen (Hoch-/Querformat) und vor dem ersten verarbeiteten Frame an derselben Stelle
- `tests/kwad_test.js` – Game of K.W.A.D: Strafbuchstaben laufen **K → W → A → D** und stoppen danach, der erste Spieler mit vier Buchstaben verliert, ein Trick wiederholt sich nie direkt, die Buchstaben-Tafel wird korrekt gerendert (mit einem minimalen DOM-Stub) und **Rückgängig** nimmt genau den letzten Buchstaben zurück (Turn kehrt zurück, zweimal geht nicht, Erfolg/neuer Trick löscht den Verlauf)
- `tests/persist_test.js` – Auto-Lap-Persistenz: `state.armed` wird von `saveSettings` geschrieben, beim Start wiederhergestellt und beim Umschalten sofort gespeichert (Regressionsschutz)
- `tests/ui_test.js` – UI-Struktur & Pilotenprofile: Kamera-Einstellungen liegen im eigenen Overlay, das Timer-Menü enthält nur noch Runden/Satz, Countdown und Rennen & Audio, die Checkbox-Texte werden bei gesetztem Haken farbig, Piloten-Kachel/-Screen samt CSV-Export existieren, alle Home-Kacheln nutzen dasselbe Icon-Raster, das K.W.A.D-Logo ist ein 2×2-Buchstabenraster (K W / A D), Game of K.W.A.D und Piloten haben einen eigenen Zurück-Pfeil (inline-SVG, optisch zentriert), die zuletzt genutzte Kachel wird über `lastHomeTile` hervorgehoben (Timer als Fallback), die Timer-Kachel zeigt die Katzenkopf-Stoppuhr, die einklappbaren Karten haben ein echtes `<summary>` als erstes `<details>`-Kind (kein „Details“-Fallback), die Kontext-Zahnräder sitzen **im** `<summary>` und bleiben beim Einklappen sichtbar sowie rechtsbündig (Pfeil ▾/▴ und Zahnrad am rechten Rand, Titel links), und kein `[data-i18n]`-Element umschließt Markup (sonst würde `applyLanguage` die Timer-Anzeige im eingeklappten Kopf löschen), der KWAD-Undo-Button ist verdrahtet, die **Prüfart** (Freiflug/Tor/Hindernis) inklusive **Hindernisauswähler** ist im Spiel- und Einstellungs-Screen vorhanden, Backup/Restore hat seine Element-Referenzen, und `addPilot`/`removePilot` verhalten sich wie erwartet (Version + SW-Cache + package.json inklusive)

Die Skripte extrahieren den echten Code aus `app.js` und prüfen ihn – sie testen also das ausgelieferte Verhalten, keine Nachbildung.

## Einstellungen
Drei getrennte Menüs, jeweils oben rechts als Zahnrad:
- **App-Einstellungen** (Zahnrad oben rechts am Homescreen bzw. Kachel „Einstellungen“): Sprache (App-Sprache), Aussehen (Akzentfarbe), App (Update/Cache leeren)
- **Kamera-Einstellungen** (Zahnrad in der Kamera-Karte): Diff-Schwelle (Pixel-Differenz 0–255 zum Hintergrund), Enter (px), Exit (px), Cooldown (Mindestabstand), Verarbeitungsauflösung (niedriger = schneller), erwartete Richtung, Driftausgleich, Kamera fixieren
- **Timer-Einstellungen** (Zahnrad in der Timer-Karte): **Rennen & Audio** – Runden pro Satz (0 = unbegrenzt), Countdown/Vorbereitungszeit (0–15 s), Audio-Feedback (Countdown, Runden), Sprachstimme, Sprachansage (aus/jede/beste), Sprechtempo, Stimme testen
- Die Erkennung (Schwelle, Enter/Exit, Cooldown, Richtung, Drift/Cam-Lock) liegt damit bei der Kamera statt im Timer-Menü; die frühere Sektion „Auto-Start & Rennen“ ist entfallen, weil Auto-Start bereits als Schnellschalter in der Timer-Karte sitzt
- Die Schnellregler in der Timer-Karte bleiben erhalten (Auto-Start-Schalter, Badge „Runden/Satz“, Countdown-Badge) und sind mit den Feldern im Timer-Menü synchron
- Piloten: eigene Kachel „Piloten“ für den vollständigen Profil-Workflow (Name + Farbe anlegen/auswählen/löschen, Vergleichstabelle, CSV-Export); die Farben werden im Chart und in der Vergleichstabelle verwendet
- Aussehen: Akzentfarbe der App (Presets oder eigene Farbe)

## Game of K.W.A.D
- **Umgesetzt (v0.18.x, rein manuell/lokal):** eigene Kachel auf dem Homescreen, Spielerliste (`localStorage: kwad_players`), Trick-Pool mit Kategorien/Schwierigkeit/Beschreibung/**Prüfart** und eigenen Tricks, drei Zieh-Modi (Random gewichtet, Sequential, Kategorie-Round-Robin), reihum der aktive Spieler, **Geschafft** / **Nicht geschafft**, Strafbuchstaben **K → W → A → D**, **Rückgängig** für den letzten Buchstaben, **Hindernis-Tricks** mit Hinweis und **Hindernisauswähler** (`localStorage: kwad_obstacle_picker`), Trick-Statistik, eigenes Einstellungs-Overlay, Verlierer-Ansage, Revanche. Die Gruppe bewertet – die App erkennt (noch) nicht automatisch, ob ein Trick wirklich geflogen wurde
- **Konzept/Pflichtenheft für die Ausbaustufen** (Zeitfenster, Tor-Erkennung als automatischer Erfolg, Sprachansage der Tricks, Richtungs-Tricks, Modus „Vorgeben“, CSV-Export): [`docs/game-of-kwad.md`](docs/game-of-kwad.md)

## Roadmap für native Kotlin-App
- CameraX-Vorschau + Analyse-Thread
- ML Kit / TFLite-Objekterkennung für Drone-Tracking
- Multi-Pilot / Multi-Lane
- Bluetooth-Lautsprecher-Ausgabe
- Persistente Sessions (Room DB)

## GitHub „About“ (Beschreibung + Topics)
Für das Repository **`GrinseKaterFPV/KTR`** (About rechts oben auf der Repo-Seite).
Vorbereitete Werte:

- **Description:**
  `FPV Racing Toolkit als Web-/PWA-App: Rundentimer mit Bewegungserkennung, Game of K.W.A.D und Pilotenverwaltung.`
- **Website:** `https://grinsekaterfpv.github.io/KTR/`
- **Topics:**
  `fpv`, `drone`, `racing`, `timer`, `pwa`, `web-app`, `javascript`, `camera`, `freestyle`, `game-of-skate`, `game-of-kwad`, `pilot-management`, `github-pages`

\"\"  
\"\"  
