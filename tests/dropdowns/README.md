# Dropdowns

This folder demonstrates native `<select>` controls, multi-selects, custom autocomplete suggestions, and application-styled dropdown menus.

## Files in this topic

- `handleDropdown.spec.ts` selects countries and colors in native select controls and checks option counts.
- `dropdown.flipkart.spec.ts` types into a search box and inspects suggestions.
- `bootstrap_dropdown.orangeHRM.spec.ts` opens custom job-title and sub-unit dropdowns after logging into a demo HR application.

## Native select: simplest example

```ts
const country = page.getByLabel('Country')
await country.selectOption({ label: 'France' })
await expect(country).toHaveValue('france')
```

`selectOption` can select by `value`, `label`, or option `index`. For a multi-select:

```ts
const colors = page.locator('#colors')
await colors.selectOption(['red', 'blue'])
```

## Custom dropdown

Custom dropdowns are ordinary DOM elements, not `<select>` controls. Open the widget, wait for its options, and select by role/name:

```ts
await page.getByRole('combobox', { name: 'Job title' }).click()
await page.getByRole('option', { name: 'QA Lead' }).click()
```

If options are exposed as a listbox, inspect the actual roles and accessible names. Avoid relying on an index unless the ordering is part of the behavior being tested.

## Autocomplete suggestions

```ts
const search = page.getByRole('textbox', { name: 'Search' })
await search.fill('smart')
const suggestion = page.getByRole('option', { name: 'smartphone', exact: true })
await expect(suggestion).toBeVisible()
await suggestion.click()
```

The site-specific locators in the Flipkart and OrangeHRM examples may change. Prefer assertions to `waitForTimeout`, and await actions inside loops (for example `await option.click()`) so the test doesn't proceed before selection completes.

```bash
npx playwright test tests/dropdowns/handleDropdown.spec.ts
```
