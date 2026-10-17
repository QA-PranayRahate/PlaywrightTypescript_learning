# Scrolling techniques

`pixelByPixelScrolling.spec.ts` demonstrates automatic scrolling, scrolling an element into view, scrolling by coordinates, using keyboard navigation, and inspecting content while scrolling.

## Simple examples

Playwright scrolls elements into view before most interactions. For explicit scrolling:

```ts
await page.getByAltText('Target image').scrollIntoViewIfNeeded()
```

Scroll by pixels or to the document end using the browser DOM:

```ts
await page.evaluate(() => window.scrollBy(0, 500))
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
```

For keyboard-driven pages:

```ts
await page.keyboard.press('End')
await page.keyboard.press('Home')
```

## Infinite/lazy loading

Lazy-loaded content may only appear after the page is scrolled. A robust test should repeatedly scroll, wait for a meaningful change in loaded content, and stop when the page reports no more results or the document height/content count stops increasing:

```ts
let previousCount = -1
for (let attempt = 0; attempt < 10; attempt++) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  const currentCount = await page.locator('article').count()
  if (currentCount === previousCount) break
  previousCount = currentCount
}
```

Always bound loops. The source's lazy-scroll sample uses a locator list collected before scrolling and a fixed sleep; depending on site behavior, that can miss newly rendered content or run longer than needed. Re-query locators and wait for a relevant state change.

The examples depend on external websites. Run one test by title or path when debugging:

```bash
npx playwright test tests/scrollingTechniques/pixelByPixelScrolling.spec.ts --grep "Scroll by pixel"
```
