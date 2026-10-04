import {test,expect} from  "@playwright/test"
import fs from "fs"


const filePath='./testData/data.json';
const loginData=JSON.parse(fs.readFileSync(filePath,'utf8')); //Reading data from data.json



for (const { email, password, validity } of loginData) {


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