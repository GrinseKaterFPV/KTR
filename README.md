# FPV Racing Timer (Web/PWA MVP)

MVP-Rundentimer für Android-Geräte. Die Runden werden anhand von Bewegung (Frame-Differenz)
in einer vom Nutzer definierten Zone über Start/Ziel erkannt.

## Starten (lokal)
1. In diesem Ordner einen kleinen Server starten (Kamera braucht sicheren Kontext):
   - Python: `python -m http.server 8080`
   - Node: `npx http-server -p 8080`
2. Im Browser öffnen: `http://localhost:8080` (oder die IP des PCs im LAN).
3. Auf Android: Chrome öffnen, URL aufrufen, Menü → „Zum Startbildschirm hinzufügen“.

## Bedienung
1. Kamera starten, ggf. Kamera auswählen.
2. Mit der Maus/Touch einen Rahmen über die Start/Ziel-Zone zeichnen.
3. Bei leerem Tor „Hintergrund kalibrieren“ drücken.
4. „Start“ drückt das Rennen, „Erkennung aktiv“ einschalten.
5. Eine Runde wird gezählt, sobald die Bewegung im Rahmen die Enter-Schwelle
   überschreitet und danach unter die Exit-Schwelle fällt (plus Cooldown).

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

## Roadmap für native Kotlin-App
- CameraX-Vorschau + Analyse-Thread
- ML Kit / TFLite-Objekterkennung für Drone-Tracking
- Multi-Pilot / Multi-Lane
- Bluetooth-Lautsprecher-Ausgabe
- Persistente Sessions (Room DB)
