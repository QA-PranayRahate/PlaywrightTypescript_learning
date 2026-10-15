import { chromium } from "@playwright/test";

async function saveStorage() {
    const browser = await chromium.launch()
    try {
        const context = await browser.newContext()
        const page = await context.newPage()
        const storagePath = "./storageData/saved_state.json"

        // application Login

        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

        await page.getByPlaceholder('Username').fill('Admin')
        await page.getByPlaceholder('Password').fill('admin123')
        await page.getByText('Login').nth(1).click()

        await page.waitForTimeout(3000)

        // Generates the storage state file as JSON.
        await context.storageState({ path: storagePath })
    } finally {
        await browser.close()
    }
}

// Calling the function directly.
saveStorage()