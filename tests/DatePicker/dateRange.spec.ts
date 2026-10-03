import { test, expect } from "@playwright/test"

test('date range picker direct with fill', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay')
    await page.locator('#start-date').fill('2020-02-02')
    await page.locator('#end-date').fill('2020-03-02')
    await page.locator('.btn btn-primary').nth(1).click()
    const textContent=await page.locator('#result').innerText()
    expect(textContent).toContain('a range')

    await page.waitForTimeout(4000)
    await page.close()


})