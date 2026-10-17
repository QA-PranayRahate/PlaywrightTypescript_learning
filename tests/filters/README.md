# Locator filters

The filter examples use `Locator.filter()` to narrow a set of elements by contained text or a nested locator. They also demonstrate `getByTestId()` and combining locator matches.

## Simple example

```ts
const product = page.getByRole('listitem').filter({ hasText: 'Product 2' })
await product.getByRole('button', { name: 'Add to cart' }).click()
```

You can filter by another locator:

```ts
const cards = page.locator('.card')
const appleCard = cards.filter({ has: page.getByTestId('apple') })
await expect(appleCard).toHaveCount(1)
```

`has` and `hasNot` locators are evaluated relative to each candidate element. Keep them in the same page/frame and use a selector that describes the desired content.

## More filter patterns

```ts
const inStock = page.getByRole('listitem').filter({ hasText: 'In stock' })
const johnRow = page.getByRole('listitem').filter({ hasText: 'John' })
const goodbye = johnRow.getByRole('button', { name: 'Say goodbye' })

const matchingButtons = page.getByRole('button')
  .and(page.getByText('Subscribe'))
```

The specs cover adding a specific product to cart, counting matching entries, selecting a `data-testid`, locating a button within a person/task row, and checking a combined locator. `filters-assignment.spec.ts` is currently mostly a disabled (`test.skip`) set of locator practice examples, with a `getByTitle` test active.

Prefer `await expect(locator).toHaveCount(n)` over reading `.count()` once when waiting for the page to finish rendering. Run:

```bash
npx playwright test tests/filters
```
