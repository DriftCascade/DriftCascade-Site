---
title: "Salvage Wars Version 0.2.1"
slug: salvage-wars-version-0-2-1
date: 2026-03-12T21:45:00.000-07:00
author: Michael (Mwalk10)
description: Salvage Wars v0.2.1 adds the new itch.io page for playtest distribution, Unity Analytics with player consent controls, and a round of bug fixes and jank cleanup.
tags:
  - Salvage Wars
  - Devlog
related_game: salvage-wars
unlisted: false
---
***Salvage Wars*** now has a home on itch.io for private playtest distribution and mirrored devlogs going forward.

### Itch Page

The new restricted itch.io page for the game is live here:

<https://driftcascade.itch.io/salvage-wars>

It is password protected for the private playtest, and if you're in the playtest I’ll send the password via DM.

It will be the main place I use to distribute future playtest builds and mirror development updates.

### Unity Analytics

This build adds Unity Analytics integration, along with a consent prompt on first launch and a Settings toggle you can change later.

Analytics is important for capturing automated playtest data that helps with balance updates and bug fixes, so if you're participating in testing, please allow it.

### Bugfixes / Jank Fixes

- **Custom cursor fix on Windows:** Fixed a bug preventing the custom cursor from working correctly on Windows.
- **Pause menu cursor in TDS mode:** The cursor now appears on the pause menu when using top-down shooter controls.
- **Save/load readability:** Fixed the save/load screen display so save game names are actually readable.
- **Auto-Loot resume behavior:** Re-enabling the Auto-Loot toggle now automatically resumes looting.
- **Battlefield transfer window sync fix:** Fixed a bug where the Auto-Loot toggle could look out of sync with the real gameplay state.
- **Campaign startup timing fix:** Fixed timing issues during campaign startup that could intermittently fail when entering the overworld.
- **Save system locking fix:** Fixed a save system error that could sometimes cause save failures related to temporary file locking.
