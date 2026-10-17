# Date pickers

Date-picker tests cover entering dates directly and navigating a calendar widget to choose a date. Date input controls differ: some accept a machine-formatted value, while custom calendars require user-like interaction.

## Files in this topic

- `dateRange.spec.ts` fills start and end date fields on the SDET QA playground and checks the result text.
- `jquery.datepicker.spec.ts` opens a jQuery UI calendar, advances to May 2028, and selects day 13.

## Simple example: fill a date input

```ts
const start = page.locator('#start-date')
await start.fill('2026-10-01')
await expect(start).toHaveValue('2026-10-01')
```

For `<input type="date">`, use the browser's expected ISO form (`YYYY-MM-DD`). Confirm the control type and app behavior; a text input may instead expect a locale-specific display format.

## Example: navigate a calendar

```ts
const calendar = page.locator('.ui-datepicker')
await page.locator('#datepicker').click()

while (
  await calendar.locator('.ui-datepicker-month').innerText() !== 'May' ||
  await calendar.locator('.ui-datepicker-year').innerText() !== '2028'
) {
  await calendar.getByTitle('Next').click()
}

await calendar.getByRole('link', { name: '13', exact: true }).click()
```

In production tests, constrain navigation with a maximum iteration count or calculate the number of month steps. That prevents an infinite loop if the widget's month/year text or navigation stops changing. Prefer assertions after each meaningful action over `waitForTimeout`.

## Reliable date-picker workflow

1. Locate and open the date input.
2. Wait for the calendar to become visible.
3. Read its displayed month and year.
4. Navigate to the target month, with a bounded loop.
5. Select the exact day (avoid matching `13` inside `130`).
6. Assert the input value or the resulting application state.

The specs rely on a live external playground. Run one file at a time when investigating changes in the calendar markup:

```bash
npx playwright test tests/DatePicker/dateRange.spec.ts
```
