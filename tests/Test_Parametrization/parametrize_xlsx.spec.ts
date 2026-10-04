import { expect, test } from "@playwright/test"
import { log } from "console"
import fs from "fs"
import * as XLSX from "xlsx"

const excelPath = './testData/data.xlsx'
const workbook = XLSX.readFile(excelPath)
const sheetName = workbook.SheetNames[0]
const worksheet = workbook.Sheets[sheetName]

//convert sheet into json

const loginData: any = XLSX.utils.sheet_to_json(worksheet)
console.log(loginData)

for (const { email, password, validity } of loginData) {
    test(`login with ${email} and ${password}`, async ({ page }) => {
        await page.goto("https://demowebshop.tricentis.com/login")
        await page.locator("#Email").fill(email)
        await page.locator("#Password").fill(password)
        await page.locator("input[value='Log in']").click()

        if (validity.toLowerCase() === 'valid') {
            const logoutLink = page.locator('a[href="/logout"]')
            await expect(logoutLink).toBeVisible()

        }
        else {
            const errorMsg = page.locator('.validation-summary-errors')
            await expect(errorMsg).toBeVisible({timeout:4000}) 
}

    })

}