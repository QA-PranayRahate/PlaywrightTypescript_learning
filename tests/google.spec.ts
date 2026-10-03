
import { test, expect } from "@playwright/test"

test('Ok Google', async ({ page }) => {


    await page.goto('https://www.google.com')
    await expect(page).toHaveTitle('Google')
})




