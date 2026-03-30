# MK24 Home Assistant Custom Cards

Minimal starter repository for creating Home Assistant custom cards and distributing them with HACS.

## What is included

- HACS metadata in `hacs.json`
- TypeScript source file in `src/mk24-hello-card.ts`
- Build output in `dist/mk24-hello-card.js`
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

4. Optional direct deploy over SSH:

```bash
npm run deploy
```

Notes:

- This script builds and uploads `dist/mk24-hello-card.js` using `scp`.
- Default SSH host alias: `raspi` (from your `~/.ssh/config`)
- Default destination: `/homeassistant/www/mk24/`
- Override with env vars when needed:

```bash
HA_DEPLOY_HOST=raspi HA_DEPLOY_PATH=/homeassistant/www/mk24/ npm run deploy
```

5. Add the test card to a dashboard:

```yaml
type: custom:mk24-hello-card
title: Hello from custom card
entity: sensor.temperature
```

6. Hard refresh browser cache after updates:

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

4. GitHub Actions builds the card and attaches `dist/mk24-hello-card.js` to the GitHub release.
5. In HACS, install/update this card repository.
6. Add resource in Home Assistant:
   - URL: `/hacsfiles/<your-repo-name>/mk24-hello-card.js`
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

## First card behavior

`mk24-hello-card` renders:

- A title (from `title`)
- A basic confirmation text
- Optional entity state (from `entity`)

If no entity is configured, it shows `No entity selected`.

## Next cards

When adding more cards, repeat this pattern:

- Create source file in `src/`
- Add another entry point in `esbuild.config.mjs`
- Update `hacs.json` and release assets if needed
