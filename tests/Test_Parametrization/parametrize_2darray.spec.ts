
import { test, expect } from "@playwright/test"

const loginData: string[][] = [
    ['laurataylor12@gmail.com', 'test1', 'invalid'],
    ['laura.taylor1234@gmail.com', 'test123', 'valid'],
    ['lauratay4@gmail.com', 't1est123', 'invalid'],
    ['laurataylor1234@gmail.com', '', 'invalid'],

];

for (const [email, password, validity] of loginData) {


    test.describe('login with multiple datasets', () => {

        test(`login with ${email} and ${password}`, async ({ page }) => {

            await page.goto('https://demowebshop.tricentis.com/login')
            await page.locator('#Email').fill(email)
            await page.locator('#Password').fill(password)
            await page.locator('[value="Log in"]').click()

            if (validity.toLowerCase() === 'valid') {
                const logoutLink = page.locator('a[href="/logout"]')
                await expect(logoutLink).toBeVisible({ timeout: 100000 })
            }
            else {
                const errorMsg = page.locator('.validation-summary-errors')
                await expect(errorMsg).toBeVisible({ timeout: 100000 })

            }

        })
    })


}