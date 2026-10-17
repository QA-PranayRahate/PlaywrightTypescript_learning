# Downloads, PDF tabs, and frames

`download.spec.ts` demonstrates catching a download event and saving a file. It also opens a PDF in a new page and interacts with an element inside an iframe.

## Simple download example

Register the download waiter before clicking the download control:

```ts
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.getByRole('button', { name: 'Download file' }).click(),
])

expect(download.suggestedFilename()).toBe('sample.txt')
await download.saveAs('downloads/sample.txt')
```

Playwright browser contexts may store downloads in temporary locations. Use `saveAs()` to copy the file to a known location before verifying its contents or existence. Create the destination directory first when it may not exist, and clean up only the specific file created by the test.

## New page and frame examples

```ts
const [pdfPage] = await Promise.all([
  page.context().waitForEvent('page'),
  page.getByRole('button', { name: 'Open PDF' }).click(),
])
await expect(pdfPage).toHaveURL(/\.pdf$/)

const frame = page.frameLocator('.demo-frame')
await frame.locator('#datepicker').click()
```

## Current spec notes

The file includes two download demonstrations, a PDF-in-new-page check, and a jQuery UI date-picker interaction inside a frame. One download snippet refers to `suggestedFilename` without invoking it; the documented pattern above uses the Playwright API's `suggestedFilename()` method. The tests are tied to the SDET QA and jQuery UI sites.

Run:

```bash
npx playwright test tests/fileDownload/download.spec.ts
```
