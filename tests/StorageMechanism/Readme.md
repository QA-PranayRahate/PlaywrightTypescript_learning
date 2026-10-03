# Cookies, Local Storage, and Session Storage

Web applications can store small amounts of data in the browser in several ways. The right choice depends on who needs the data, how long it should last, and whether it needs to be sent to a server.

## At a Glance

| Feature | Cookies | `localStorage` | `sessionStorage` |
| --- | --- | --- | --- |
| Lifetime | Until the configured expiration; session cookies usually end with the browser session | Persists until cleared by the user or application | Usually ends when its tab or window is closed |
| Scope | Domain and path; options can include subdomains | Same origin (scheme, host, and port) | Same origin and top-level browsing context (typically one tab) |
| Sent with HTTP requests | Yes, when domain, path, security, and `SameSite` rules match | No | No |
| Typical capacity | Small, around 4 KB per cookie | Several MB per origin; browser limits vary | Several MB per origin; browser limits vary |
| JavaScript access | Usually, unless marked `HttpOnly` | Yes | Yes |
| Common uses | Server sessions, preferences that the server needs, request authentication | Persistent client-side preferences and cached UI state | Temporary state for one tab or workflow |

## Cookies

Cookies are small name/value pairs stored by the browser. The browser can attach matching cookies to requests automatically, which makes them useful when a server needs to recognize a user or receive a preference on each request.

Cookies have attributes that control their behavior:

- `Expires` or `Max-Age` controls how long a persistent cookie lasts. Without either, it is generally a session cookie.
- `Domain` and `Path` control which hosts and routes receive the cookie.
- `Secure` restricts the cookie to HTTPS requests.
- `HttpOnly` prevents page JavaScript from reading the cookie, which helps protect session cookies from theft through cross-site scripting (XSS).
- `SameSite` limits when cookies are sent in cross-site contexts and helps reduce cross-site request forgery (CSRF).

Cookies are sent automatically when their rules match, so they add data to requests. Keep them small and configure security attributes carefully. A JavaScript-created cookie cannot be marked `HttpOnly`; that attribute must be set by the server.

## `localStorage`

`localStorage` stores string key/value pairs for an origin. Data remains after page reloads and browser restarts until the application or user clears it. The browser does not automatically attach this data to HTTP requests; application code must read and send it if needed.

```js
localStorage.setItem('theme', 'dark')
const theme = localStorage.getItem('theme')
localStorage.removeItem('theme')
```

It is useful for non-sensitive preferences and persistent UI state. Because page JavaScript can read it, do not store session identifiers, passwords, or other sensitive secrets in `localStorage`.

## `sessionStorage`

`sessionStorage` also stores string key/value pairs, but it is scoped to both the origin and the current tab's browsing context. It survives reloads in that tab, but is normally cleared when the tab or window closes. Separate tabs generally have separate session storage.

```js
sessionStorage.setItem('checkoutStep', 'shipping')
const step = sessionStorage.getItem('checkoutStep')
sessionStorage.removeItem('checkoutStep')
```

Use it for temporary, tab-specific state, such as progress through a multi-step form. Like `localStorage`, it is readable by page JavaScript and is not automatically sent to the server.

## Choosing One

- Use a cookie when the server needs the value on matching requests. For authentication, prefer server-managed cookies with appropriate `HttpOnly`, `Secure`, and `SameSite` settings.
- Use `localStorage` when client-side state should persist across browser restarts and does not need to be sent automatically with requests.
- Use `sessionStorage` when client-side state should survive reloads but remain limited to a single tab session.

Storage quotas and some lifetime details vary by browser. All three mechanisms are client-side storage and should be treated as untrusted input by the server.

## Checking Storage with Playwright

Cookies are managed by the browser context, while Web Storage is accessed from the page:

```ts
const cookies = await page.context().cookies()
const localValue = await page.evaluate(() => localStorage.getItem('theme'))
const sessionValue = await page.evaluate(() => sessionStorage.getItem('checkoutStep'))
```

Clear them during test setup when a test needs a clean state:

```ts
await page.context().clearCookies()
await page.evaluate(() => {
	localStorage.clear()
	sessionStorage.clear()
})
```

Run the Web Storage code after navigating to the target origin, since storage is origin-scoped.
