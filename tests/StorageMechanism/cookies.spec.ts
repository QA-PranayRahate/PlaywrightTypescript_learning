/*
In real-world applications, cookies are commonly used for:

Remembering login sessions
Saving user preferences (language, theme, currency)
Authentication (JWT -JSON Web Token/Session ID)
Tracking user activities
Personalizing the application

Browser > Context > Page

1. Create Browser Context    browser.newContext()
2. Create New Page           context.newPage()
3. Add Cookies                context.addCookies()
4. Get Cookies                context.cookies()
5. Clear Cookies              context.clearCookies()
*/


import { test, chromium } from "@playwright/test"

test('cookies example', async () => {

    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://sdetqa.vercel.app/autoplay')

    //add cookies
    await context.addCookies([
        {
            "name": "username",
            "value": "pranay",
            "domain": "playwright.dev",
            "path": "/",
            "httpOnly": true,
            "secure": true

        }
    ])

    const  cookie=await context.cookies()
    console.log(cookie)

    //clear Cookies
    const cookieClear=await context.clearCookies()
    console.log('After Clearing cookies',cookieClear)
    await context.close()
})