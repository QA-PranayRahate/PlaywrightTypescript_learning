# Screenshots, traces, videos, and retries

This folder demonstrates manual screenshots, tracing, video capture, and retry-related behavior. The project-wide defaults are defined in `playwright.config.ts`.

## Files in this topic

- `screenshot.spec.ts` captures viewport, full-page, element, masked, and animation-adjusted screenshots.
- `tracing.spec.ts` records a trace and video for a login flow.
- `video_recording.spec.ts` saves a recorded video after closing a custom context.
- `retries_on_failure.spec.ts` demonstrates a test suite with normal Playwright test assertions and tags; it does not itself configure retry count.
- `playwright-config_configuration.spec.ts` demonstrates a browser flow suitable for configured artifacts.

## Simple screenshot example

```ts
await page.goto('https://example.test')
await expect(page.getByRole('heading', { name: 'Example' })).toBeVisible()
await page.screenshot({ path: 'artifacts/example.png', fullPage: true })
```

For a single element, use `locator.screenshot()`. The screenshot directory must exist when writing to a path; create it with `fs.mkdirSync(path, { recursive: true })`. To hide sensitive areas, use `mask: [locator]` and a deliberate `maskColor`. Masking is a visual privacy aid, not a replacement for removing sensitive data from test artifacts.

## Trace and video

```ts
await context.tracing.start({ screenshots: true, snapshots: true, sources: true })
// Perform the test actions.
await context.tracing.stop({ path: 'traces/test-trace.zip' })
```

```ts
const context = await browser.newContext({ recordVideo: { dir: 'videos/' } })
const page = await context.newPage()
// Perform the test actions.
await context.close() // finalizes the video file
```

Traces can contain DOM snapshots, source snippets, screenshots, and network information. Videos and traces may expose account data; store them as private artifacts and avoid real credentials.

## Retries and configuration

The root `playwright.config.ts` currently sets `retries: 1`, uses Chromium, and writes Allure results to `allure-results`. `trace`, `screenshot`, and `video` config options are shown commented out under `use`; they are not active global artifact settings. Per-test context recording in the specs is separate from those global settings.

Use retries to collect diagnostics for intermittent failures, not to hide flaky behavior. Inspect retry results and fix the underlying race or state dependency. Prefer event waits and web-first assertions over fixed sleeps.

```bash
npx playwright test tests/screenshots,tracing,videos
```
