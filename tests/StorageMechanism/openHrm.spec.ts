
import { test, expect } from "@playwright/test"
import fs from 'fs'


// Both tests use this file to pass the authenticated browser cookies between contexts.
const OrangeHRMCookiePath = './storageData/orangeHrm.cookies.json'
// OrangeHRM page used for logging in and verifying the restored session.
const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

// The second test depends on the cookie file written by the first test.
test.describe.configure({ mode: 'serial' }) //sequential execution recommended. 
test('orange HRM', async ({ browser }) => {

    // A new context isolates this test's cookies from other browser tests.
    const context = await browser.newContext()
    const page = await context.newPage()

    // Log in through the UI to obtain a valid authenticated session.
    await page.goto(baseURL)
    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.getByText('Login').nth(1).click()

    // Confirm the login succeeded before saving the context's cookies.
    await expect(page.locator('h6').nth(0)).toHaveText('Dashboard')

    // Read all cookies available to this browser context after login.
    const savedCookies = await context.cookies()
    console.log(savedCookies)

    // Write the cookies as formatted JSON so the next test can load them.
    fs.writeFileSync(OrangeHRMCookiePath, JSON.stringify(savedCookies, null, 2))
    console.log('Cookie File Updated')
})


test('orange HRM login with stored cookies', async ({ browser }) => {

    // Start with a separate context to prove the saved cookies restore the session.
    const context = await browser.newContext()
    // Parse the cookie objects previously saved by the first test.
    const savedCookies = JSON.parse(fs.readFileSync(OrangeHRMCookiePath, 'utf8'))
    // Add cookies before navigation so the browser can send them with the request.
    context.addCookies(savedCookies)
    const page = await context.newPage()

    // Verify the saved session grants access without entering credentials again.
    await page.goto(baseURL)
    await expect(page.locator('h6').nth(0)).toHaveText('Dashboard')

    console.log('Logged in successful with saved cookies')

})
