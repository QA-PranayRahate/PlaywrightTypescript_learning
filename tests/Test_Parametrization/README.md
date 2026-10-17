# Test parametrization

Parametrization creates multiple Playwright tests from a set of input records. This folder shows data defined in TypeScript and loaded from CSV, JSON, and XLSX files.

## Files in this topic

- `parametrize.spec.ts` loops over a string array of products.
- `parametrize_2darray.spec.ts` destructures rows from a two-dimensional array.
- `parametrize_with_csv.spec.ts` reads records using `csv-parse/sync`.
- `parametrize_with_json.spec.ts` reads JSON records.
- `parametrize_xlsx.spec.ts` uses the `xlsx` package to load a worksheet.
- Input files are in the repository's `testData/` directory.

## Simple array example

```ts
const products = ['laptop', 'monitor']

for (const product of products) {
  test(`searches for ${product}`, async ({ page }) => {
    await page.goto('https://example.test')
    await page.getByRole('searchbox').fill(product)
    await page.keyboard.press('Enter')
    await expect(page.getByRole('heading', { name: new RegExp(product, 'i') })).toBeVisible()
  })
}
```

Tests are declared while the spec file is being loaded, so read and validate external data before defining tests. Use unique, descriptive test names and do not put passwords or other secrets in titles; titles appear in reports and logs.

## Type and validate records

```ts
type LoginCase = {
  email: string
  password: string
  validity: 'valid' | 'invalid'
}

const cases: LoginCase[] = [
  { email: 'user@example.test', password: 'test-only', validity: 'invalid' },
]

for (const data of cases) {
  test(`login outcome: ${data.validity}`, async ({ page }) => {
    // Exercise the login form with data.email and data.password.
  })
}
```

For CSV or spreadsheet inputs, validate required columns and value types before generating test cases. Treat input files as test data, not a secure secret store.

## Data formats in this folder

- **CSV:** headers are read as object keys; `skip_empty_lines` avoids blank records.
- **JSON:** use `JSON.parse` and give the resulting data an explicit TypeScript type.
- **XLSX:** convert a selected worksheet to records with `XLSX.utils.sheet_to_json`.
- **Inline arrays:** best for small, stable matrices where inputs belong next to the test logic.

The CSV parser and XLSX library are declared dependencies in `package.json`. Paths in the examples are relative to the repository and should continue to work when tests run from the project root. The examples use a remote demo shop and may be affected by account state or website changes.

```bash
npx playwright test tests/Test_Parametrization/parametrize.spec.ts
npx playwright test tests/Test_Parametrization/parametrize_with_csv.spec.ts
```
