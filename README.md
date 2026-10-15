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

## Bedienung
1. Kamera starten (Button toggelt: läuft die Kamera, stoppt derselbe Button sie wieder).
2. Mit der Maus/Touch einen Rahmen über die Start/Ziel-Zone zeichnen.
3. Der Hintergrund wird automatisch nach dem Kamerastart kalibriert (manuell über „Hintergrund kalibrieren“).
4. „Start“ beginnt einen Countdown (Standard 5 s, einstellbar). Danach startet das Rennen automatisch.
5. Eine Runde wird gezählt, sobald die Bewegung im Rahmen die Enter-Schwelle
   überschreitet und danach unter die Exit-Schwelle fällt (plus Cooldown).

## Features
- **Home-Bildschirm:** Beim Start landet man auf dem Homescreen „KTR FPV APP“ (großes Logo, App-Name). Dort wählt man das Feature – z. B. **Timer** – und ist dann in der jeweiligen Unter-App. Der Zurück-Button (←) links oben führt jederzeit wieder zum Homescreen; spätere Features (z. B. Telemetrie) kommen dort als weitere Kacheln dazu
- **Logo/Name „KTR FPV APP“:** oben steht nur das quadratische Logo – die drei Kürzel K, T, R untereinander in einem 3×3-Raster; der Name „KTR FPV APP“ erscheint groß auf dem Homescreen
- Live-Visualisierung der Erkennung (gelbe Pixel = erkannte Bewegung, grüner Rahmen/Punkt = Bereich/Schwerpunkt)
- Auto-Start: Die erste Tor-Durchfahrt startet die Zeitmessung (zählt nicht als Runde) – kein Laufen zum Handy nötig
- Runden pro Satz: Nach der eingestellten Rundenzahl stoppt der Timer automatisch; der Satz wird gespeichert und die nächste Durchfahrt startet den nächsten Satz
- Sätze (Vergleich): Alle abgeschlossenen Sätze werden gespeichert (Runden, beste Zeit, Ø, Gesamt) und lassen sich aufklappen, **einzeln als CSV exportieren (⬇, Dateiname mit Pilot, z. B. `fpv-set-Max-1.csv`)**, einzeln löschen oder gesammelt als CSV exportieren
- Satz-Nummern gelten **pro Pilot**: jeder Pilot hat sein eigenes „Satz 1, 2, 3 …“, so lassen sich die Sätze desselben Piloten direkt vergleichen
- Bei aktivem Pilotenfilter exportiert der Button **„Gefilterte exportieren"** nur diesen Piloten (Dateiname `fpv-sets-<Pilot>.csv`)
- Piloten-Auswahl im Vergleich: Sätze nach Pilot filtern (Dropdown) und **Piloten-Vergleichstabelle** (Sätze, Runden, beste Zeit, Ø, Gesamt) bei mehreren Piloten
- Vergleichs-Graph: Rundenzeiten aller Sätze als Linien-Diagramm (beste Runde als grüne Referenzlinie), automatisch Querformat-tauglich
- Akzentfarbe frei wählbar (Einstellungen → „Aussehen“): Presets oder eigene Farbe per Farbwähler
- Einklappbare Hauptbereiche: Kamera, Timer, Rundenlog und Sätze lassen sich am Titel antippen ein-/ausklappen (Zustand wird gespeichert; Timer zeigt im eingeklappten Kopf die laufende Zeit)
- Auto-Start auch direkt in der Timer-Karte (Schnellschalter; das Badge daneben antippen → Stepper/Presets für die Rundenzahl pro Satz)
- Erkennung ein/aus („Auto Lap Detection“) wird gespeichert und beim nächsten Start wiederhergestellt
- Countdown direkt in der Timer-Karte einstellbar (Badge antippen → Stepper/Presets)
- Pilotfarben: beim Anlegen eines Piloten eine Farbe wählen – der Pilot wird im Chart und in der Vergleichstabelle in seiner Farbe dargestellt (Legende im Chart)
- Querformat/Landscape: kompakter Zwei-Spalten-Layout, damit Vorschau, Bedienung und Scrollen im horizontalen Modus funktionieren
- Countdown mit Audio-Signal vor dem Rennstart, Runden-Sound, Best-Lap-Sound
- Sprachansage der Rundenzeiten (Text-to-Speech, „jede Runde“ oder „nur beste Runde“)
- Richtungsprüfung: Button mit Pfeil (↔ aus → → ← ↓ ↑) zeichnet die erwartete Durchflugrichtung ins Tor; nur Durchflüge in dieser Richtung zählen als Runde
- Autofokus-/Belichtungs-Schutz: Der Hintergrund passt sich dauerhaft an Drift an (selbstheilend) und globale Bildänderungen über das gesamte Bild werden ignoriert. Ein Watchdog verhindert, dass das Tor als "belegt" hängen bleibt und dadurch Runden übersieht. Optional (Standard aus) lässt sich die Kamera per „Kamera fixieren“ auf manuellen Fokus/Belichtung stellen
- Zweisprachig (Deutsch/Englisch): Umschalten in den Einstellungen unter „Sprache & Stimme“; Aussprache von Ansagen passt sich an. Zusätzlich kann eine konkrete Sprachstimme gewählt werden
- Timer mit Einfrieren bei „Stop“ (Rennen-Zeit und Runde bleiben stehen)
- Optionale Audio-Ausgabe (ausschaltbar), Pilotenverwaltung, CSV-Export
- Einklappbare Einstellungen (Zahnrad-Symbol oben rechts), Untergruppen standardmäßig zugeklappt

## Als Android-App (optional)
Diese Web-App ist eine installierbare PWA. Für eine native Android-APK kann das Projekt
mit [Capacitor](https://capacitorjs.com/) in ein Android-Projekt gewrappt werden:
`npm i @capacitor/core @capacitor/cli @capacitor/android && npx cap init && npx cap add android && npx cap sync`.

## Einstellungen
- Diff-Schwelle: Pixel-Differenz (0–255) zum Hintergrund
- Enter (px): Mindestanzahl veränderter Pixel für „belegt“
- Exit (px): Schwellwert für „frei“
- Cooldown: Mindestabstand zwischen zwei Runden
- Auflösung: Verarbeitungsauflösung (niedriger = schneller)
- Auto-Start direkt in der Timer-Karte: Schalter „Auto-Start“ und das Badge daneben (Rundenzahl pro Satz, 0 = unbegrenzt)
- Countdown (Vorbereitungszeit) direkt in der Timer-Karte: Badge antippen → 0–15 s (nicht mehr im Zahnrad-Menü)
- Piloten: Name + Farbe anlegen/ändern (Farbe wird im Chart und in der Vergleichstabelle verwendet)
- Aussehen: Akzentfarbe der App (Presets oder eigene Farbe)

## Roadmap für native Kotlin-App
- CameraX-Vorschau + Analyse-Thread
- ML Kit / TFLite-Objekterkennung für Drone-Tracking
- Multi-Pilot / Multi-Lane
- Bluetooth-Lautsprecher-Ausgabe
- Persistente Sessions (Room DB)
