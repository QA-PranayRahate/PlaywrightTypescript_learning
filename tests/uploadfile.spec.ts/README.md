# File uploads

`upload.spec.ts` demonstrates selecting one file and multiple files using `locator.setInputFiles()`.

## Simple upload example

```ts
const input = page.locator('input[type="file"]')
await input.setInputFiles('testData/sample.pdf')
await page.getByRole('button', { name: 'Upload' }).click()
await expect(page.getByText('sample.pdf')).toBeVisible()
```

For multiple files, pass an array of paths:

```ts
await page.locator('input[type="file"]').setInputFiles([
  'testData/first.txt',
  'testData/second.txt',
])
```

The file input can be visually hidden; Playwright can set files directly without opening the native chooser. If the page opens a file chooser through a button, listen first:

```ts
const [chooser] = await Promise.all([
  page.waitForEvent('filechooser'),
  page.getByRole('button', { name: 'Choose file' }).click(),
])
await chooser.setFiles('testData/sample.pdf')
```

## Current example prerequisites

The existing spec uses absolute paths under one developer's Downloads and Documents folders. Those paths are machine-specific, so the tests will fail elsewhere unless the files exist at those exact locations. Prefer small fixtures checked into `testData/` when licensing and size permit, or construct test files in a temporary directory during setup.

Assert observable upload success (filename, response, or completed status), not only that a message contains a vague phrase. Run:

```bash
npx playwright test tests/uploadfile.spec.ts/upload.spec.ts
```
