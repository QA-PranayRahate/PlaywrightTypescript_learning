# JavaScript dialogs

`normal_dialog.ok.spec.ts` demonstrates handling JavaScript `alert`, `confirm`, and `prompt` dialogs triggered by page actions. `str.ts` is a small standalone TypeScript example that takes a three-character month prefix and lowercases it.

## Simple alert example

Register the listener before the action that opens the dialog:

```ts
page.once('dialog', async dialog => {
  expect(dialog.type()).toBe('alert')
  await dialog.accept()
})

await page.getByRole('button', { name: 'Show alert' }).click()
```

For a confirmation dialog, call `accept()` to choose OK or `dismiss()` to choose Cancel. For a prompt, pass the text to `accept('value')`. Dialogs block page interaction until handled, so a test that triggers one without a handler can hang or fail.

## What the spec demonstrates

- Reading `dialog.type()` and `dialog.message()`.
- Accepting a simple alert.
- Accepting confirmation dialogs.
- Supplying text to a prompt.
- Attaching a dialog handler before clicking the trigger.

Use `page.once('dialog', ...)` when the action is expected to trigger exactly one dialog. Use `page.on` for multiple dialogs and remove listeners when they are no longer needed. Await all asynchronous work in the listener; don't call both `accept()` and `dismiss()` for the same dialog.

The source also includes commented-out and unfinished snippets. The complete demonstrations are the named alert, confirm, and prompt tests. Run the file against the live playground with:

```bash
npx playwright test tests/dialog_handler/normal_dialog.ok.spec.ts
```
