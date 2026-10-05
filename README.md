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

This repository is a hands-on Playwright + TypeScript practice project focused on learning browser automation, end-to-end testing, API validation, and real-world web testing patterns.

## What this project contains

This project includes practical test cases covering:

- Browser interactions and UI testing
- Forms, inputs, radio buttons, dropdowns, and date pickers
- Locators and page object style automation patterns
- API testing with HTTP GET/POST requests
- File upload and download workflows
- Storage state and session reuse
- LocalStorage handling
- Data-driven tests using arrays, JSON, CSV, and Excel-like data
- Table handling, sorting, filtering, and pagination
- Dialog handling, tabs/windows, screenshots, traces, and videos

## Project structure

```text
Playwright_Typescript/
├── e2e/
│   └── example.spec.ts
├── tests/
│   ├── apiTests/
│   ├── ArrayMethods/
│   ├── DatePicker/
│   ├── dialog_handler/
│   ├── dropdowns/
│   ├── fileDownload/
│   ├── filters/
│   ├── handle_windows/
│   ├── InputBox_RadioBtn/
│   ├── KeyboardControls/
│   ├── localStorage/
│   ├── locatorsStratey/
│   ├── screenshots,tracing,videos/
│   ├── scrollingTechniques/
│   ├── sortingAssignment/
│   ├── StorageMechanism/
│   ├── Test_Parametrization/
│   ├── uploadfile.spec.ts/
│   └── webtables/
├── storageData/
│   └── saved_state.json
├── testData/
│   └── data.json
├── playwright.config.ts
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## Technologies used

- Playwright Test
- TypeScript
- Node.js
- Faker for test data generation
- CSV parsing utilities
- Excel/worksheet support via xlsx

## Prerequisites

Make sure you have the following installed:

- Node.js (v18 or newer recommended)
- npm

## Installation

```bash
npm install
```

## Running tests

Run the full suite:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/apiTests/getreq.spec.ts
```

Run with UI mode:

```bash
npx playwright test --ui
```

Open the HTML report:

```bash
npx playwright show-report
```

## Notes

- The project is designed for learning and experimentation.
- Most tests are written to demonstrate different Playwright capabilities in a practical way.
- Some examples use public demo websites and browser automation flows for training purposes.

## Learning goals

This repository is useful for understanding:

- how to write Playwright tests in TypeScript
- how to locate and interact with web elements
- how to handle dynamic pages and common UI interactions
- how to validate API responses
- how to manage authentication and state reuse
- how to structure automation tests for maintainability

## License

This project is intended for learning and demo purposes.

---

Built as a Playwright TypeScript learning playground for practicing modern browser automation and test automation concepts.
