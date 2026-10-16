# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.20.0] - 2026-10-16
### Added
- Piloten: **jedes Profil ist eine aufklappbare Karte** — in der eingeklappten Zeile stehen bereits Versuche und Quote, ausgeklappt zeigt die Karte die kompletten Trick-Statistiken dieses Spielers (Versucht / Geschafft / Quote plus eine Zeile pro Trick)
- Piloten: **Profilverwaltung direkt in der Karte** — aktiven Piloten wählen (★), Profil umbenennen, dessen Trick-Statistiken zurücksetzen oder das Profil löschen (die beiden letzten Aktionen fragen vorher nach)

### Changed
- Game of K.W.A.D: die Prüfart **„Tor / Gate" heißt jetzt „Gap"** (`gap`), weil beim Freestyle meist Gaps statt Tore fliegen; der alte Schlüssel `gate` in bestehenden Spielständen wird automatisch auf `gap` abgebildet, eigene Tricks behalten also ihre Prüfart
- Piloten: Löschen eines Profils entfernt auch dessen Statistiken und fragt vorher nach; die „Gesamt"-Summe verliert genau diese Versuche, damit die Panels weiter aufgehen
- Piloten: Umbenennen zieht alles mit — Farbe, aktiver Pilot, offene Profilkarte, Statistiken und ein laufendes K.W.A.D.-Spiel (Spieler, „schon versucht"-Liste, Hindernisauswähler)

## [0.19.0] - 2026-10-16
### Added
- Game of K.W.A.D: **Trickliste & Pool** in the settings — every trick of every group with its short description, difficulty (★), Prüfart and a switch that keeps it in (or out of) the draw pool (`localStorage: kwad_trick_pool`). Unchecked tricks stay listed but are never drawn; a trick of a switched-off category is dimmed
- Game of K.W.A.D: the custom-trick form now also takes the **difficulty** (1–5 ★) and the **category** — a custom trick can be filed into Basics/Intermediate/Advanced/Pro, and then plays along with that group (and only while the group is on)
- Game of K.W.A.D: the drawn trick shows a **meta line** with its group, difficulty, Prüfart and short description right under the trick name
- Game of K.W.A.D: **per-player trick statistics** at the bottom of the KWAD screen — one block per player (attempted / succeeded / rate, plus a row per trick) next to a **„Gesamt"** block, so the group can compare directly (`localStorage: kwad_player_stats`). Player blocks also survive after a player leaves the game; the global `kwad_stats` total is kept as the "Gesamt" panel

### Changed
- Game of K.W.A.D: the random draw now weights by each **trick's own** difficulty (custom tricks fall back to their group's difficulty, then to the middle) instead of only the category's
- Game of K.W.A.D: the trick statistics moved out of the settings overlay to the bottom of the game screen
- Game of K.W.A.D: `Rückgängig` also takes the attempt out of the player's own statistics block
- Backup/Restore carries the per-player statistics and the pool switches

### Fixed
- Game of K.W.A.D: `renderKwadCustomTricks()` shadowed the i18n helper `t()` with its loop variable and threw as soon as one custom trick existed — custom tricks never showed up in the list
- Game of K.W.A.D: `kwadLoad()` built the trick pool twice in a row (leftover); the duplicate is gone

## [0.18.2] - 2026-10-16
### Changed
- Section headers: the ▾/▴ collapse caret and the context gear (plus the CSV/„Alle exportieren“ buttons) are now right-aligned inside the summary row, while the title stays on the left. The row is full width, so the caret ends up flush in the cell's right corner — same look as the settings groups

## [0.18.1] - 2026-10-16
### Fixed
- The context gear buttons (camera/timer settings) stayed hidden once a section was collapsed. They now live inside the `<summary>` — like the CSV/„Alle exportieren" buttons — so they remain reachable while the card is closed; the existing click guard keeps them from toggling the card
- The collapsed timer card lost its live time: `applyLanguage()` sets `textContent` on every `[data-i18n]` element and the timer label sat on the `<summary>`, which wiped the `#timerSummary` span on every load. The label is now a child `<span>`, so the running time survives (new regression guard in `tests/ui_test.js`)
- `tests/kwad_test.js`: the obstacle-picker checks leaked state from earlier random trick draws (the flake showed up in ~2 of 10 runs); each game setup now resets the picker

## [0.18.0] - 2026-10-16
### Added
- Game of K.W.A.D: **Prüfart** per trick – Free flight (`free`), Gate (`gate`) or **Obstacle** (`obstacle`); every built-in trick ships with a sensible default
- Game of K.W.A.D: **Obstacle picker** – when an obstacle trick is drawn, the game shows "the group decides the obstacle" and lets you nominate one of the active players; the choice is remembered (`kwad_obstacle_picker`)
- Game of K.W.A.D: the custom-trick form now takes the Prüfart, and the trick list shows it as a badge
- Game of K.W.A.D: obstacle tricks are drawn from the same weighted pool, so no separate mode is needed

### Changed
- Game of K.W.A.D: old/custom tricks without a Prüfart fall back to free flight, so existing saved tricks keep working

## [0.17.1] - 2026-10-16
### Fixed
- Collapsible cards: the `<summary>` is now a real first child of `<details>`, so the browser's "Details" fallback text is gone for good
- The gear button is pinned to the card corner again (the summary spans the full width)
- Removed five duplicate pseudo-element "nuclear" hacks that had also killed the ▾/▴ collapse caret
- Backup/Restore was dead on arrival: the three element references were missing from the `els` map
- Removed stray closing tags (`</div></div></main>`) after the main layout

### Added
- Game of K.W.A.D: the undo button is now really in the UI (takes back only the last penalty letter, cleared on a new trick or a success)

## [0.17.0] - 2025-10-16
### Added
- Game of K.W.A.D: 5 trick categories (Basics 🟢, Intermediate 🟡, Advanced 🟠, Pro 🔴, Custom ⭐) with difficulty levels
- Game of K.W.A.D: Custom tricks – add/remove own tricks with name + description
- Game of K.W.A.D: 3 draw modes – Random (difficulty-weighted), Sequential, Category Round-Robin
- Game of K.W.A.D: Trick statistics – attempted/succeeded/rate per trick
- Game of K.W.A.D: Dedicated settings overlay (gear icon in KWAD screen) for categories, mode, custom tricks, stats
- Game of K.W.A.D: Sound effects – penalty (fail), new trick (ready), game over (loser)

### Changed
- KWAD draw logic now uses weighted random by difficulty (easier tricks more frequent)
- KWAD trick pool dynamically built from enabled categories

## [0.16.2] - 2025-10-15
### Added
- Game of K.W.A.D: Trick name is now centered
- Game of K.W.A.D: Import pilots from main app (with their colors) via dropdown
- App ID changed to `com.ktr.fpvtools` (removed personal references)

### Fixed
- KWAD player list now shows pilot color dots

## [0.16.0] - 2025-10-15
### Added
- Home screen with feature tiles (Timer, Game of K.W.A.D, Pilots, Settings)
- Game of K.W.A.D (local party mode, penalty letters K→W→A→D)
- Pilots management (name + color, comparison table, CSV export)
- Collapsible main sections (Camera, Timer, Lap log, Sets)
- Three separate settings overlays (App, Camera, Timer)
- Direction detection for lap counting (LR, RL, TB, BT)
- Drift compensation for autofocus/exposure
- Auto-start on first crossing (quick toggle in timer card)
- Laps per set with auto-stop and next-set-on-crossing
- Sets comparison chart (line chart, best lap reference)
- Pilot comparison table
- Text-to-speech lap announcements (every/best, configurable voice/rate)
- WebAudio feedback (countdown, lap, best lap)
- Bilingual DE/EN (app language + announcement voice separate)
- CSV exports (per set, filtered, all, pilots)
- Storage protection (max 400 sets, auto-trim oldest)
- Landscape layout optimization
- PWA with Service Worker (network-first caching)
- Capacitor config for native Android wrapper

### Changed
- Unified home tile icons (rounded dark squares with orange accent)
- KTR logo: 3×3 letter grid (K T R / F P V / A P P)
- K.W.A.D logo: 2×2 letter grid (K W / A D)
- Timer tile shows original cat-head stopwatch icon
- Settings reorganized: detection in Camera, race/audio in Timer
- ROI drawing works across resolution/orientation changes

### Fixed
- Service worker cache version bumped
- Storage quota errors handled gracefully