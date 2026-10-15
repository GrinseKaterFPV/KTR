# KTR Racing Timer (Web/PWA)

Rundentimer für Android-Geräte. Die Runden werden anhand von Bewegung (Frame-Differenz)
in einer vom Nutzer definierten Zone über Start/Ziel erkannt.

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
- Live-Visualisierung der Erkennung (gelbe Pixel = erkannte Bewegung, grüner Rahmen/Punkt = Bereich/Schwerpunkt)
- Auto-Start: Die erste Tor-Durchfahrt startet die Zeitmessung (zählt nicht als Runde) – kein Laufen zum Handy nötig
- Runden pro Satz: Nach der eingestellten Rundenzahl stoppt der Timer automatisch; der Satz wird gespeichert und die nächste Durchfahrt startet den nächsten Satz
- Sätze (Vergleich): Alle abgeschlossenen Sätze werden gespeichert (Runden, beste Zeit, Ø, Gesamt) und lassen sich aufklappen, **einzeln als CSV exportieren (⬇)**, einzeln löschen oder gesammelt als CSV exportieren
- Piloten-Auswahl im Vergleich: Sätze nach Pilot filtern (Dropdown) und **Piloten-Vergleichstabelle** (Sätze, Runden, beste Zeit, Ø, Gesamt) bei mehreren Piloten
- Vergleichs-Graph: Rundenzeiten aller Sätze als Linien-Diagramm (beste Runde als grüne Referenzlinie), automatisch Querformat-tauglich
- Akzentfarbe frei wählbar (Einstellungen → „Aussehen“): Presets oder eigene Farbe per Farbwähler
- Einklappbare Hauptbereiche: Kamera, Timer, Rundenlog und Sätze lassen sich am Titel antippen ein-/ausklappen (Zustand wird gespeichert; Timer zeigt im eingeklappten Kopf die laufende Zeit)
- Auto-Start auch direkt in der Timer-Karte (Schnellschalter; das Badge daneben antippen → Stepper/Presets für die Rundenzahl pro Satz)
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
- Auto-Start & Sätze: automatischer Start beim ersten Durchflug und Rundenzahl pro Satz (0 = unbegrenzt)

## Roadmap für native Kotlin-App
- CameraX-Vorschau + Analyse-Thread
- ML Kit / TFLite-Objekterkennung für Drone-Tracking
- Multi-Pilot / Multi-Lane
- Bluetooth-Lautsprecher-Ausgabe
- Persistente Sessions (Room DB)
