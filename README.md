# MK24 Home Assistant Custom Cards

Minimal starter repository for creating Home Assistant custom cards and distributing them with HACS.

## What is included

- HACS metadata in `hacs.json`
- Main entry file in `src/main.js`
- Card modules in `src/cards/`
- Build output in `dist/ha-mk24.js`
- GitHub Actions workflow that creates a release asset on tags (`v*`)

## Requirements

- Node.js 20+
- npm 10+
- A running Home Assistant instance

## Local development setup

1. Install dependencies:

```bash
npm install
```

2. Build once:

```bash
npm run build
```

3. Start watch mode while developing:

```bash
npm run dev
```

4. Add the test card to a dashboard:

```yaml
type: custom:mk24-hello-card
title: Hello from custom card
entity: sensor.temperature
```

5. Hard refresh browser cache after updates:

- Browser hard refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`)
- If needed, clear Home Assistant frontend cache

## HACS-first workflow (recommended)

1. Push this repository to GitHub (public repo recommended for easiest setup).
2. In Home Assistant, open HACS and add this repo as a **Custom repository**:
   - Type: `Dashboard`
3. Create and push a release tag:

```bash
git tag v0.1.0
git push origin v0.1.0
```

4. GitHub Actions builds the card bundle and attaches `dist/ha-mk24.js` to the GitHub release.
5. In HACS, install/update this card repository.
6. Add resource in Home Assistant:
   - URL: `/hacsfiles/<your-repo-name>/ha-mk24.js`
   - Type: `JavaScript Module`
7. Add test card YAML:

```yaml
type: custom:mk24-hello-card
title: Hello from custom card
entity: sensor.temperature
```

Important:

- If HACS offers to add resources automatically, accept it.
- Resource path under `/hacsfiles/...` depends on your repository name in GitHub.
- After updates, hard refresh browser (`Ctrl+Shift+R`).

## Development workflow with HACS

For normal development, use two modes:

1. Fast local iteration (no tag/release each change):
   - Keep `npm run dev` running locally.
   - Copy `dist/ha-mk24.js` into your HA config at:
     - `/homeassistant/www/community/ha-mk24/ha-mk24.js`
   - Helper command (hardcoded to `ssh raspi`):

```bash
npm run deploy
```

   - This command also removes stale `ha-mk24.js.gz` and `ha-mk24.js.map`
     on Home Assistant so the updated `.js` is served.

   - Hard refresh browser.

2. Real distribution test:
   - Create a new tag/release e.g. `git tag v0.1.2` and push to origin `git push origin v0.1.2`
   - Update through HACS to verify install/upgrade behavior.

So: you do **not** need a new tag/release for every small change while developing.

## First card behavior

`mk24-hello-card` renders:

- A title (from `title`)
- A basic confirmation text
- Optional entity state (from `entity`)

If no entity is configured, it shows `No entity selected`.

## Next cards

When adding more cards, repeat this pattern:

- Create a new card module in `src/cards/`
- Import the module in `src/main.js`
- Keep `hacs.json` and release asset pointing to `dist/ha-mk24.js`
