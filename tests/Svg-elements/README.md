# SVG elements

`handle_svg_element.spec.ts` demonstrates locating SVG descendants, checking an attribute, counting chart shapes, and correlating bar labels with their heights.

## Simple example

SVG elements can be located with CSS selectors and normal Playwright locators:

```ts
const circle = page.locator('svg circle')
await expect(circle).toBeVisible()
await expect(circle).toHaveAttribute('fill', 'DeepSkyBlue')
```

To inspect a chart:

```ts
const bars = page.locator('svg').nth(1).locator('rect')
const labels = page.locator('svg').nth(1).locator('text')

await expect(bars).toHaveCount(5)
await expect(labels).toHaveCount(5)
```

SVG nodes do not always expose accessible roles the same way as HTML controls; CSS selectors and attributes such as `aria-label`, `title`, and `fill` can be useful. Prefer an accessible locator if the SVG is labeled for assistive technology.

## What the spec demonstrates

- Visibility assertions for `svg circle`.
- Reading the circle's `fill` attribute.
- Counting `.shape` elements and SVG chart `rect`/`text` nodes.
- Iterating over matching locators with `nth(index)` to log each label and numeric height.
- Taking an element screenshot with `locator.screenshot()`.

Avoid using console output as the only verification. Assert the expected value, count, or relationship so the test fails when the chart changes unexpectedly.

```bash
npx playwright test tests/Svg-elements/handle_svg_element.spec.ts
```
