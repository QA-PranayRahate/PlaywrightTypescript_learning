# Sorting

`sort.spec.ts` selects the low-to-high ordering option on BrowserStack Demo and checks the displayed product names and prices.

## Simple sorting assertion

```ts
const prices = [99, 20, 45]
const sorted = [...prices].sort((a, b) => a - b)
expect(sorted).toEqual([20, 45, 99])
```

For UI sorting, choose the sort option and verify the rendered values are in order. Do not rely only on the first/last item unless you also establish that the full list is sorted.

## Verify a UI list is ascending

```ts
await page.getByRole('combobox').selectOption({ label: 'Lowest to highest' })

const displayed = await page.locator('.price').allTextContents()
const prices = displayed.map(text => Number(text.replace(/[^\d.]/g, '')))
expect(prices.length).toBeGreaterThan(0)
expect(prices).toEqual([...prices].sort((a, b) => a - b))
```

In the repository example, product names and price strings are collected separately and paired by index. If the application can reorder or independently render either list, locate each product's price within its card instead. Parse currency carefully (decimal separators and currency symbols can vary).

```bash
npx playwright test tests/sortingAssignment/sort.spec.ts
```
