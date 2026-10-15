# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.16.3] - 2025-10-15
### Added
- Game of K.W.A.D: Undo button (removes last penalty letter, anti-cheat: only last, cleared on new trick/success)
- Game of K.W.A.D: Sound effects – penalty (fail), new trick (ready), game over (loser)

### Fixed
- KWAD undo button disabled when no action to undo

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