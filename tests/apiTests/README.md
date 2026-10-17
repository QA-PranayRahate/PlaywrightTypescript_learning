# API testing

Playwright's `request` fixture sends HTTP requests without opening a browser page. These specs demonstrate health-check and product `GET` requests, plus an example `POST` request.

## Simple GET example

```ts
test('returns products', async ({ request }) => {
  const response = await request.get('https://simple-grocery-store-api.glitch.me/products')

  expect(response.status()).toBe(200)
  const products = await response.json()
  expect(Array.isArray(products)).toBe(true)
})
```

## Simple POST example

```ts
test('creates a user', async ({ request }) => {
  const response = await request.post('http://localhost:8080/api/users', {
    data: {
      email: 'sample@example.test',
      firstName: 'Alex',
      lastName: 'Tester',
    },
  })

  expect(response.status()).toBe(201)
  const createdUser = await response.json()
  expect(createdUser.email).toBe('sample@example.test')
})
```

Use `data` for JSON payloads; Playwright serializes objects as JSON. Add headers for authentication or content types when the service requires them. Assert the response status and meaningful response fields, and avoid logging authorization headers or tokens.

## Current examples and caveats

- `getreq.spec.ts` calls the Simple Grocery Store API status and product endpoints, checking response status and whether response JSON is an array.
- `post_req.spec.ts` uses Faker to create a payload for a local service at port 8080; that service must be running. The same file also contains a token-sharing sketch with placeholder URLs and incomplete request examples. Treat it as a learning draft, not a ready-to-run API flow.

For a real authentication flow, obtain the token in a setup or in the same test, then pass it as a bearer authorization header. Do not share mutable module-level token variables across tests: workers may run tests in parallel and in separate processes.

Run the network-backed test file with:

```bash
npx playwright test tests/apiTests/getreq.spec.ts
```
