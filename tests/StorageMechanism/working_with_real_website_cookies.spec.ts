/* 

Test 1:
Open browser -> Login -> Save Cookies

Test 2:
Open new browser -> Load Cookies -> Verify automatic login

| Part              | Purpose                                                 |
| ----------------- | ------------------------------------------------------- |
| fs                | Node.js File System module                              |
| writeFileSync()   | Writes data to a file synchronously                     |
| cookieFile        | File path where cookies are saved                       |
| cookies           | JavaScript object/array containing cookie data          |
| JSON.stringify()  | Converts the object to a JSON string                    |
| null              | Includes all object properties (no custom filtering)    |
| 2                 | Formats the JSON with 2-space indentation for readability |
*/

import { test, expect } from "@playwright/test"
import fs from 'fs'


const coookieFile = './storageData/cookie.data.json'
const baseURL = 'https://sdetqa.vercel.app/login_app'

test.describe.configure({mode:'serial'}) //enforces serial execution (sequential)

test('Website Cookie Handle> Login and Save Cookies', async ({ browser }) => {


    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto(baseURL)
    await page.locator('#username').fill('admin')
    await page.locator('#password').fill('admin123')
    await page.locator('[value="cookie"]').check()
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText('Dashboard Welcome', { exact: true })).toBeVisible()

    //Get all the cookies
    const savedCookies = await context.cookies()
    console.log(savedCookies)

    fs.writeFileSync(coookieFile, JSON.stringify(savedCookies, null, 2)) // 
    console.log('Cookie file updated')
})

test('Login to app using existing cookies', async ({ browser }) => {


    const context = await browser.newContext()
    const existingCookies = JSON.parse(fs.readFileSync(coookieFile, 'utf8'))
    context.addCookies(existingCookies)

    const page = await context.newPage()

    await page.goto(baseURL)

    await expect(page.getByText('Dashboard Welcome', { exact: true })).toBeVisible()

    //Get all the cookies
    await page.waitForTimeout(3000)

    console.log('Login sucessf')
})