import { chromium } from "@playwright/test";

async function saveStorage() {

    let browser = await chromium.launch()
    let context = await browser.newContext()
    let page = await context.newPage()
    const storagePath= "./storageData/saved_state.json"

    //application Login

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.getByText('Login').nth(1).click()

    await page.waitForTimeout(3000)

    // generates Storage state file in form of json in specified path
    await context.storageState({path:storagePath})
}

//Calling the function directly
saveStorage()