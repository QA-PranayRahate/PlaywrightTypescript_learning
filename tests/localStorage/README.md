# Local storage and storage state

This folder demonstrates browser `localStorage`, saving a Playwright storage-state file, and reusing that state in another context. Storage state can contain cookies and local storage; it is not just a local-storage snapshot.

## Files in this topic

- `wiki_localStorage.spec.ts` signs into a Wikipedia account and saves the context state to `storageData/wiki_localStorage.json`.
- `use_save_storage_wiki.spec.ts` loads that file in a new context and checks the logged-in user.
- `saveStorage.setup.ts` signs into a demo HR app and writes `storageData/saved_state.json`.
- `using_existing_state.spec.ts` creates a new context using that saved state.

## Simple localStorage example

```ts
await page.goto('https://example.test')
await page.evaluate(() => localStorage.setItem('theme', 'dark'))
await expect.poll(() => page.evaluate(() => localStorage.getItem('theme')))
  .toBe('dark')
```

Local storage is origin-scoped. Navigate to the site before reading or writing it. `localStorage` is accessible to page JavaScript, so do not use it as a secure location for passwords or session secrets.

## Save and restore a context

```ts
await context.storageState({ path: 'storageData/state.json' })

const authenticatedContext = await browser.newContext({
  storageState: 'storageData/state.json',
})
const authenticatedPage = await authenticatedContext.newPage()
await authenticatedPage.goto('https://example.test/account')
```

Generate state with a dedicated setup project or setup test, then make dependent tests explicitly depend on it. Do not rely on Playwright's default parallel test order. Keep state files containing session credentials out of source control, rotate test accounts, and regenerate expired state.

## Current examples and prerequisites

The Wikipedia example requires a working account and live-site access. The OrangeHRM example relies on demo login behavior. The setup script `saveStorage.setup.ts` invokes its function directly, so running it as a Playwright spec is not the same as using a configured Playwright setup project. Confirm generated state files are present and valid before running dependent specs.

```bash
npx playwright test tests/localStorage/use_save_storage_wiki.spec.ts
```
