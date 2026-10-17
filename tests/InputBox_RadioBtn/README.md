# Input boxes, radio buttons, and checkboxes

`PlaywrightActions_InputBox_Radiobutton.spec.ts` exercises text fields, input constraints, radio groups, checkboxes, and form validation on the SDET QA playground.

## Simple form example

```ts
const name = page.getByLabel('Name')
const email = page.getByLabel('Email')

await name.fill('Ada Lovelace')
await email.fill('ada@example.test')
await expect(name).toHaveValue('Ada Lovelace')
await expect(email).toHaveValue('ada@example.test')
```

Use `fill()` for setting a field's complete value. Use `pressSequentially()` when the test needs to exercise per-key behavior, such as input masks or type-ahead suggestions.

## Radio buttons and checkboxes

```ts
const male = page.getByRole('radio', { name: 'Male' })
await male.check()
await expect(male).toBeChecked()

const monday = page.getByRole('checkbox', { name: 'Monday' })
await monday.check()
await expect(monday).toBeChecked()
await monday.uncheck()
await expect(monday).not.toBeChecked()
```

Radio buttons in the same group are mutually exclusive. Checkboxes can be selected independently. Prefer `.check()` and `.uncheck()` over `.click()` because they express the requested state and are safe to repeat.

## What the spec demonstrates

- Selecting fields by label or placeholder.
- Checking that inputs are editable, enabled, attached, and constrained by attributes such as `maxlength`.
- Filling radio buttons and weekday checkboxes.
- Submitting an empty or malformed form and checking validation feedback.
- Iterating through a known list of checkbox labels.

For changing UI state, use web-first assertions (`await expect(...)`) rather than checking state immediately with a non-retrying read. Keep values valid for the app under test and avoid using personal information in test data.

Run the focused spec with:

```bash
npx playwright test tests/InputBox_RadioBtn/PlaywrightActions_InputBox_Radiobutton.spec.ts
```
