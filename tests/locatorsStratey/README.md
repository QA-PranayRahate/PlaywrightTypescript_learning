# Locator strategies

The folder name is kept as it appears in the repository (`locatorsStratey`). Its specs cover role, text, label, placeholder, title, and CSS locators.

## Recommended order

Prefer locators that reflect how users and assistive technologies identify controls:

1. `getByRole(role, { name })` for buttons, links, headings, and form controls.
2. `getByLabel(name)` for labeled form fields.
3. `getByPlaceholder(text)` when placeholder text is the meaningful identifier.
4. `getByText(text)` for visible non-interactive text.
5. `getByAltText(text)` for images.
6. `getByTitle(text)` for elements with a title attribute.
7. `getByTestId(id)` for a stable test contract.
8. CSS/XPath only when semantic locators are not suitable.

## Simple examples

```ts
await page.getByRole('button', { name: 'Submit' }).click()
await page.getByLabel('Email address').fill('person@example.test')
await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible()
```

CSS locators are useful for structure or attributes:

```ts
const saveButton = page.locator('button[data-action="save"]')
await expect(saveButton).toHaveCount(1)
```

Use exact names when multiple controls have similar text. If a locator matches multiple elements, narrow it by a parent/container or a meaningful filter rather than silently choosing the first result.

## What the specs demonstrate

- `locators-assignment.spec.ts` practices role, text, label, link, checkbox, and locator chaining against a demo page.
- `locators_strategy.spec.ts` demonstrates a broad set of locator types. Many examples are marked `test.skip`; the `getByTitle` example is active.

The assignment page can change. The test demonstrates locator syntax rather than asserting a permanent application contract.

```bash
npx playwright test tests/locatorsStratey
```
