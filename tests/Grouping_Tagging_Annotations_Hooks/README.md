# Grouping, tags, annotations, and hooks

This topic organizes tests, prepares and cleans up test state, selects tests from the command line, and records intentional test outcomes.

## Files in this topic

- `grouping_describe.spec.ts` demonstrates nested `test.describe` blocks and serial execution.
- `tagging.spec.ts` demonstrates tags in test titles and Playwright's `tag` option.
- `Hooks.spec.ts` logs suite and test lifecycle events and signs in/out around tests.
- `annotations.spec.ts` demonstrates `skip`, runtime `skip`, expected `fail`, `fixme`, `slow`, and `only`.
- `annotations_test_step.spec.ts` compares a flow with and without named `test.step` blocks.

## Simple grouping and hooks

```ts
test.describe('Account page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account')
  })

  test('shows the account heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Account' })).toBeVisible()
  })
})
```

`beforeEach` and `afterEach` run for each test in their scope. `beforeAll` and `afterAll` run once per worker for that scope; they should not be used as a shared mutable browser page between tests. Use isolated fixtures or explicit setup for independent test cases.

## Tags and selection

```ts
test('profile loads', { tag: ['@sanity', '@profile'] }, async ({ page }) => {
  await page.goto('/profile')
  await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible()
})
```

Run matching tests:

```bash
npx playwright test --grep "@sanity"
npx playwright test --grep "@sanity|@profile"
npx playwright test --grep "@sanity" --grep-invert "@profile"
```

The `--grep` option matches test titles, including tags embedded in the title. Playwright also supports the `tag` option in current versions, which is shown in this folder.

## Annotations

| Annotation | Meaning |
| --- | --- |
| `test.skip()` | Do not run a test (optionally conditionally). |
| `test.fixme()` | Mark a known unfinished or broken test as not ready. |
| `test.fail()` | Declare that a test is expected to fail; an unexpected pass is reported as a failure. |
| `test.slow()` | Give a test a longer timeout (three times the default). |
| `test.only()` | Run only the focused test; remove it before sharing changes. |

Avoid committing `test.only()`. The repository config currently comments out `forbidOnly`; enabling that option in CI can catch accidental focus markers.

## Steps and serial mode

Named `test.step('description', async () => { ... })` blocks make reports easier to read and can return values. Use serial mode only when tests genuinely depend on state or ordered side effects; independent tests should remain isolated and parallel.

Examples:

```bash
npx playwright test tests/Grouping_Tagging_Annotations_Hooks/grouping_describe.spec.ts --grep "Group 2"
npx playwright test tests/Grouping_Tagging_Annotations_Hooks/tagging.spec.ts --grep "@sanity"
```

These samples target public demo websites and may require updates if the sites change.
