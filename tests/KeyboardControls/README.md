# Keyboard controls

`keyboardKeyhandle.spec.ts` demonstrates the page keyboard API and keyboard methods on individual locators.

## Simple example

```ts
const name = page.getByLabel('Name')
await name.focus()
await page.keyboard.type('Ada')
await expect(name).toHaveValue('Ada')

await page.keyboard.press('Control+A')
await page.keyboard.press('Backspace')
await expect(name).toHaveValue('')
```

## Common keyboard operations

- `page.keyboard.press('Enter')` sends a key or shortcut.
- `page.keyboard.type('text')` types into the currently focused element.
- `locator.press('Enter')` focuses/targets one control and presses a key.
- `locator.pressSequentially('text')` types into the locator one key at a time.
- `keyboard.down('Shift')` and `keyboard.up('Shift')` hold/release modifier keys.
- `keyboard.insertText('text')` inserts text without simulating individual key events.

Use `ControlOrMeta` for a shortcut that should map to Control on Windows/Linux and Command on macOS, for example `ControlOrMeta+A`.

## What the spec demonstrates

The tests fill a name and email, use select-all/backspace, move the cursor with Home and Arrow keys, replace selected text, navigate between fields with Tab and Shift+Tab, operate radio buttons and checkboxes with Space/arrow keys, and submit with Enter.

For platform-sensitive shortcuts, choose the key combination deliberately. Keyboard focus and radio-group behavior depend on the page's DOM and accessibility semantics, so assert focus and selected state after each action:

```ts
await page.keyboard.press('Tab')
await expect(email).toBeFocused()
```

Run:

```bash
npx playwright test tests/KeyboardControls/keyboardKeyhandle.spec.ts
```
