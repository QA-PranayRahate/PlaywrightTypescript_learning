# Playwright TypeScript Learning Lab

<div align="center">
  <img src="https://playwright.dev/assets/img/playwright-logo.svg" alt="Playwright Logo" width="220" />
</div>

<p align="center">
  <strong>Automation learning project built with Playwright + TypeScript</strong>
</p>

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Playwright" src="https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
</p>

This repository is a hands-on Playwright Test and TypeScript learning project. It contains examples of browser automation, UI and API testing, test data handling, and reporting.

## Topics covered

- Locators, assertions, forms, inputs, radio buttons, and dropdowns
- Date pickers, dialogs, keyboard input, scrolling, and browser tabs
- API requests, file uploads/downloads, and web tables
- Cookies, storage state, and local storage
- Data-driven tests using arrays, JSON, CSV, and XLSX
- Test grouping, tags, annotations, hooks, and retries
- Screenshots, masking, video recording, and tracing
- Allure reporting

## Project structure

```text
Playwright_Typescript/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── e2e/
│   └── example.spec.ts
├── html-report/                # Previously generated report output
├── storageData/
│   └── saved_state.json
├── testData/
│   ├── data.csv
│   ├── data.json
│   └── data.xlsx
├── tests/
│   ├── google.spec.ts
│   ├── test-1.spec.ts
│   ├── apiTests/
│   ├── ArrayMethods/
│   ├── codegen_testrunner/
│   ├── DatePicker/
│   ├── dialog_handler/
│   ├── dropdowns/
│   ├── fileDownload/
│   ├── filters/
│   ├── Grouping_Tagging_Annotations_Hooks/
│   ├── handle_windows/
│   ├── InputBox_RadioBtn/
│   ├── KeyboardControls/
│   ├── localStorage/
│   ├── locatorsStratey/
│   ├── reports/
│   ├── screenshots,tracing,videos/
│   ├── scrollingTechniques/
│   ├── sortingAssignment/
│   ├── StorageMechanism/
│   ├── Svg-elements/
│   ├── Test_Parametrization/
│   ├── uploadfile.spec.ts/
│   └── webtables/
│       └── pagination/
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

Test runs currently write Allure result files to `allure-results/`; generated output folders such as `allure-results/`, `test-results/`, `playwright-report/`, `traces/`, `videos/`, and `screenshot/` are ignored by Git. The `html-report/` directory shown above contains previously generated report output.

## Requirements

- Node.js and npm

## Install

Install the dependencies and the Chromium browser used by the configured Playwright project:

```bash
npm ci
npx playwright install chromium
```

## Run tests

Run all tests:

```bash
npx playwright test
```

Run one test file:

```bash
npx playwright test tests/apiTests/getreq.spec.ts
```

Run tests matching a title:

```bash
npx playwright test --grep "title or tag"
```

Open Playwright UI mode:

```bash
npx playwright test --ui
```

## Test reports

The configured reporter is `allure-playwright`. After a test run, raw Allure results are written to `allure-results/`. To build and view an HTML Allure report, install the Allure Commandline separately, then run:

```bash
allure generate allure-results --clean -o allure-report
allure open allure-report
```

The Playwright HTML reporter is not enabled in the current configuration. To use it instead, configure the `html` reporter in `playwright.config.ts`, then run `npx playwright show-report`.

## Notes

- This is a learning project; tests demonstrate Playwright features against public demo websites.
- Some tests rely on the availability and behavior of external websites and may need updates if those sites change.
- Authentication examples may depend on local storage-state files under `storageData/`.
- The GitHub Actions workflow in `.github/workflows/playwright.yml` runs the Playwright test command on pushes and pull requests to `main` and `master`.
