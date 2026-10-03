import { test, expect } from "@playwright/test"

test('handle new tab', async ({ browser }) => {

    const context = await browser.newContext()

    const page = await context.newPage()

    page.goto('https://sdetqa.vercel.app/autoplay')


    const [newTab] = await Promise.all([

        context.waitForEvent('page'),
        page.locator('button', { hasText: 'New Tab' }).click()

    ])
    console.log(await newTab.title())
    await expect(newTab).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright')
    await expect(newTab).toHaveURL('https://playwright.dev/')

})


test('handle new popup window in same browsercontext', async ({ browser }) => {

    const context = await browser.newContext()

    const page = await context.newPage()

    page.goto('https://sdetqa.vercel.app/autoplay')


    const [newTab] = await Promise.all([

        context.waitForEvent('page'),
        page.locator('button', { hasText: 'New Window' }).click()

    ])
    console.log(await newTab.title())
    await expect(newTab).toHaveTitle(/Playwright/)
    await expect(newTab).toHaveURL('https://playwright.dev/')
    


})


