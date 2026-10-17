# Web tables and pagination

This topic covers static and dynamic HTML tables, data extraction, aggregation, search/filtering, sorting-related tasks, and pagination.

## Files in this topic

- `staticWebTables.spec.ts` counts headers/rows and extracts product data from static and dynamic tables.
- `assignment.webtable.spec.ts` reads prices and computes totals, minimum/maximum items, and a price threshold.
- `assignment2.spec.ts` exercises a CRUD table: add, search, delete with a confirmation dialog, and add a dynamic row.
- `blazedemo.spec.ts` selects a flight from a results table and completes a demo booking flow.
- `pagination/pagination.spec.ts` extracts records across pages, changes page length, and searches table rows.
- `pagination/extractedData.txt` is output written by the pagination extraction example.

## Simple row/column example

```ts
const table = page.getByRole('table')
const rows = table.getByRole('row')

await expect(rows).toHaveCount(5) // includes header if the table has one
const cells = await rows.nth(1).getByRole('cell').allTextContents()
expect(cells[0]).toBe('Laptop')
```

For tables without useful accessible roles, CSS locators are fine:

```ts
const rows = page.locator('#example tbody tr')
const values = await rows.nth(0).locator('td').allTextContents()
```

## Extracting and aggregating data

```ts
const rowCount = await rows.count()
const records: string[][] = []
for (let index = 0; index < rowCount; index++) {
  records.push(await rows.nth(index).locator('td').allInnerTexts())
}

const total = records.reduce((sum, row) => {
  return sum + Number(row[2].replace('$', ''))
}, 0)
expect(total).toBeGreaterThan(0)
```

Prefer parsing prices into numbers once and associating fields by column header rather than relying on unexplained numeric indexes. Validate that the expected table and headers are present before aggregation.

## Pagination and dynamic tables

On a client-side paginated table, extract the current page, click Next, and verify the page changed. Continue until Next is disabled or hidden. Bound the loop to prevent infinite extraction. Write output under a test-specific artifact path; avoid deleting or overwriting user data.

For a CRUD table, locate a row first and then its row-specific action:

```ts
const bob = page.getByRole('row').filter({ hasText: 'Bob' })
page.once('dialog', dialog => dialog.accept())
await bob.getByRole('button', { name: 'Delete' }).click()
await expect(bob).toHaveCount(0)
```

The pagination and flight-booking examples use live third-party sites; the static/dynamic product-table examples use the SDET QA playground. Assertions should focus on rendered state rather than console output.

```bash
npx playwright test tests/webtables
npx playwright test tests/webtables/pagination/pagination.spec.ts
```
