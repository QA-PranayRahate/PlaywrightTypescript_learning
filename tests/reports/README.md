# Test reports

This topic introduces test titles, tags, `test.step()` report structure, and the Allure reporter configured for the project.

## Files in this topic

- `reports.spec.ts` groups demo-shop tests, adds priority/category text to titles, and divides login flows into named steps.
- `allure-report.spec.ts` contains UI scenarios that are recorded by the configured Allure reporter. It does not add Allure-specific annotations in the test source.

## Simple test steps

```ts
test('user can sign in', async ({ page }) => {
  await test.step('Open sign-in page', async () => {
    await page.goto('https://example.test/login')
  })

  await test.step('Check the form is ready', async () => {
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()
  })
})
```

Steps make reports easier to scan and help identify which phase failed. Keep step names focused on user-visible actions or verification, not implementation noise.

## Allure workflow

1. Run one or more tests with the configured reporter:

   ```bash
   npx playwright test
   ```

2. Inspect the generated raw result files in `allure-results/`.
3. If Allure Commandline is installed, generate and open a report:

   ```bash
   allure generate allure-results --clean -o allure-report
   allure open allure-report
   ```

The Allure Commandline is a separate tool; it is not listed in this project's `package.json`. Raw results are not the same as the browsable HTML report. Generated report folders can become stale, so regenerate them from current results.

## Tags and metadata

Playwright can select tests using tags in titles or the test `tag` option:

```bash
npx playwright test --grep "@P1"
```

Don't put sensitive values in test titles, step names, attachments, or report metadata. Reports may be published or retained as CI artifacts. The specs visit third-party demo websites and may be affected by service availability.
