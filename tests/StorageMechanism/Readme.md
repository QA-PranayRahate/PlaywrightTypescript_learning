# Cookies and browser storage

This folder demonstrates browser cookies and how a browser context can reuse cookies between visits. For Playwright's reusable storage-state file (cookies plus local storage), see the companion [localStorage topic](../localStorage/README.md).

## Files in this topic

- `cookies.spec.ts` creates a browser context, navigates to a site, adds a cookie, inspects cookies, and clears them.
- `working_with_real_website_cookies.spec.ts` logs into a demo app, writes cookies to JSON, and loads them in a fresh context.
- `openHrm.spec.ts` saves cookies from an OrangeHRM login and checks the restored session in another test.

## Browser storage at a glance

| Feature | Scope and lifetime | Automatically sent to server? | Common use |
| --- | --- | --- | --- |
| Cookies | Host/path and cookie attributes; session or configured expiry | Yes, when matching cookie rules apply | Server-managed sessions and preferences needed by the server |
| `localStorage` | One origin; persists until removed or cleared | No | Persistent client-side preferences |
| `sessionStorage` | One origin and browsing tab; normally cleared when the tab closes | No | Temporary tab-specific state |

Treat browser data as untrusted input. Do not store sensitive credentials or tokens in client-readable storage. Configure server-managed authentication cookies with suitable `HttpOnly`, `Secure`, and `SameSite` attributes.

## Simple Playwright cookie example

```ts
await page.goto('https://example.test')
await page.context().addCookies([{
  name: 'theme',
  value: 'dark',
  domain: 'example.test',
  path: '/',
  secure: true,
  httpOnly: false,
  sameSite: 'Lax',
}])

const cookies = await page.context().cookies('https://example.test')
expect(cookies.some(cookie => cookie.name === 'theme')).toBe(true)
```

Cookie domain, path, and security attributes must match the target host and environment. A JavaScript-created cookie cannot be `HttpOnly`; that flag is set by the server.

## Save and restore cookies

```ts
const cookies = await page.context().cookies()
await fs.promises.writeFile(cookiePath, JSON.stringify(cookies, null, 2))

const savedCookies = JSON.parse(await fs.promises.readFile(cookiePath, 'utf8'))
const context = await browser.newContext()
await context.addCookies(savedCookies)
```

Restore cookies into a new context before navigating to the authenticated page. If cookies are committed or shared, they can grant account access: keep authentication state out of source control, use a test-only account, and restrict file permissions. Tests that use a file produced by another test are order-dependent; prefer Playwright `storageState` setup projects or create the state in a dedicated setup step.

## Inspect or clear state

```ts
const currentCookies = await page.context().cookies()
await page.context().clearCookies()

const theme = await page.evaluate(() => localStorage.getItem('theme'))
await page.evaluate(() => {
  localStorage.clear()
  sessionStorage.clear()
})
```

Web Storage operations must run on the target origin. Clearing storage in a page affects that origin's storage in the current browser context.

## Running the examples

```bash
npx playwright test tests/StorageMechanism/cookies.spec.ts
npx playwright test tests/StorageMechanism/working_with_real_website_cookies.spec.ts
```

The paired login examples rely on live demo sites and write files under `storageData/`; ensure the output location exists and keep generated session files private.
