# Browser windows and tabs

The specs demonstrate observing a newly opened tab or popup in the same browser context, then validating its URL and title.

## Simple example

```ts
const [newPage] = await Promise.all([
  page.context().waitForEvent('page'),
  page.getByRole('link', { name: 'Open help' }).click(),
])

await expect(newPage).toHaveURL('https://example.test/help')
await expect(newPage).toHaveTitle(/Help/)
```

Start waiting before triggering the new page. This avoids a race where the popup opens before Playwright begins listening. For a popup specifically created by a page, `page.waitForEvent('popup')` is also available.

## Browser contexts

A `BrowserContext` isolates cookies and other browser state. Pages opened from the same context share that context's state:

```ts
const context = await browser.newContext()
const firstPage = await context.newPage()
const [popup] = await Promise.all([
  context.waitForEvent('page'),
  firstPage.getByRole('button', { name: 'New window' }).click(),
])
```

The topic specs open a new tab and a new window from the SDET QA playground and expect the destination to be Playwright's website. Use explicit navigation waits/assertions when a site performs redirects.

## Lifecycle and reliability

Close manually created contexts in a `finally` block or after all pages are finished. The built-in `page` fixture is normally closed by Playwright automatically; custom contexts should be closed by the test to release resources.

```bash
npx playwright test tests/handle_windows
```
