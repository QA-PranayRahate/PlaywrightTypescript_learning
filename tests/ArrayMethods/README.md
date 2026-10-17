# Array methods and locator concepts

This folder introduces basic TypeScript arrays and the distinction between a selector string and a Playwright `Locator`.

## Files in this topic

- `arra.ts` demonstrates typed arrays and methods such as `reduce`, `every`, `some`, `indexOf`, and `at`.
- `selectorlocator.spec.ts` creates a locator from a CSS selector on Playwright's website. It is a concept example; `#id` is a placeholder selector, not an assertion that the site contains that ID.

## Simple TypeScript example

```ts
const prices: number[] = [10, 20, 30]
const total = prices.reduce((sum, price) => sum + price, 0)
const hasDiscountEligibleItem = prices.some(price => price >= 20)

console.log(total) // 60
console.log(hasDiscountEligibleItem) // true
```

Always give `reduce` an initial accumulator value when an empty array is possible. It makes the result type and empty-input behavior explicit.

## Selector versus locator

A selector is a query description (for example, `'#save'`). A locator is Playwright's lazy, retryable object that uses that selector to find elements and perform actions:

```ts
const selector = '#save'
const saveButton = page.locator(selector)
await saveButton.click()
await expect(saveButton).toBeVisible()
```

Prefer accessible locators where possible:

```ts
await page.getByRole('button', { name: 'Save' }).click()
```

## Useful array operations

| Method | Purpose | Example |
| --- | --- | --- |
| `map` | Transform every item | `names.map(name => name.toUpperCase())` |
| `filter` | Keep matching items | `prices.filter(price => price > 10)` |
| `reduce` | Combine items into one result | `prices.reduce((sum, price) => sum + price, 0)` |
| `every` | Check whether all items match | `prices.every(price => price > 0)` |
| `some` | Check whether any item matches | `prices.some(price => price > 100)` |
| `indexOf` | Find a primitive value's position | `prices.indexOf(20)` |
| `at` | Read by positive or negative index | `prices.at(-1)` |

`every` returns `true` for an empty array (vacuous truth); `some` returns `false`. Consider whether that behavior suits the test before using either method as an assertion.

## Playwright locator collections

`locator.count()` is asynchronous and returns the number of matches at the time it is called. Use `nth(index)` to address one match, noting that indexes start at zero:

```ts
const rows = page.getByRole('row')
await expect(rows).toHaveCount(4)
const firstDataRow = rows.nth(1) // row 0 may be the header
await expect(firstDataRow).toContainText('Laptop')
```

Use `allTextContents()` for a snapshot of text values. For assertions that should wait for the page to update, prefer locator assertions such as `toHaveText` or `toContainText`.
