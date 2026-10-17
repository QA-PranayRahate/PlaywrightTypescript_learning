# Tests learning guide

This folder is a collection of Playwright Test and TypeScript learning examples. Each topic folder has its own guide with a short explanation, a simple example, and notes on the specs in that folder.

## Run tests

From the repository root:

```bash
npx playwright test
npx playwright test tests/locatorsStratey
npx playwright test tests/KeyboardControls/keyboardKeyhandle.spec.ts
npx playwright test --grep "keyboard"
```

The project configuration sets `tests/` as the test directory, uses the Chromium project by default, retries failed tests once, and writes Allure results to `allure-results/`. Tests may visit public third-party sites or the demo site at `https://sdetqa.vercel.app`; those tests require network access and can be affected by changes to those services.

## Topics

| Topic | Guide |
| --- | --- |
| Array methods and locator concepts | [ArrayMethods](./ArrayMethods/README.md) |
| Date pickers | [DatePicker](./DatePicker/README.md) |
| Grouping, tags, annotations, and hooks | [Grouping_Tagging_Annotations_Hooks](./Grouping_Tagging_Annotations_Hooks/README.md) |
| Input boxes and radio buttons | [InputBox_RadioBtn](./InputBox_RadioBtn/README.md) |
| Keyboard controls | [KeyboardControls](./KeyboardControls/README.md) |
| Cookies and browser storage | [StorageMechanism](./StorageMechanism/Readme.md) |
| SVG elements | [Svg-elements](./Svg-elements/README.md) |
| Test parametrization | [Test_Parametrization](./Test_Parametrization/README.md) |
| API testing | [apiTests](./apiTests/README.md) |
| Code generation | [codegen_testrunner](./codegen_testrunner/README.md) |
| JavaScript dialogs | [dialog_handler](./dialog_handler/README.md) |
| Dropdowns | [dropdowns](./dropdowns/README.md) |
| Downloads and frames | [fileDownload](./fileDownload/README.md) |
| Locator filters | [filters](./filters/README.md) |
| Browser windows and tabs | [handle_windows](./handle_windows/README.md) |
| Local storage and storage state | [localStorage](./localStorage/README.md) |
| Locator strategies | [locatorsStratey](./locatorsStratey/README.md) |
| Reports | [reports](./reports/README.md) |
| Screenshots, traces, videos, and retries | [screenshots,tracing,videos](./screenshots,tracing,videos/README.md) |
| Scrolling | [scrollingTechniques](./scrollingTechniques/README.md) |
| Sorting | [sortingAssignment](./sortingAssignment/README.md) |
| File uploads | [uploadfile.spec.ts](./uploadfile.spec.ts/README.md) |
| Web tables and pagination | [webtables](./webtables/README.md) |

## Standalone specs

- [google.spec.ts](./google.spec.ts) demonstrates a Flipkart navigation and product-search flow.
- [test-1.spec.ts](./test-1.spec.ts) is a minimal example that opens Google and checks its title.

## General practices

- Prefer role-, label-, and placeholder-based locators when they express the UI intent. Use CSS selectors when needed, and keep selectors close to the component they identify.
- Use Playwright's retrying web-first assertions, such as `await expect(locator).toBeVisible()`, instead of fixed sleeps.
- Keep test data and machine-specific files outside the test logic where practical. Never place real passwords, tokens, or personal data in checked-in examples.
- Use `Promise.all` when registering an event waiter and triggering the event, for example downloads, popups, and dialogs.
- Use `npx playwright test --list` to inspect the tests Playwright discovers without running them.
- For focused debugging, run one spec with `--headed` or `--debug`. See `npx playwright test --help` for supported options.
